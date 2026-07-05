package com.hamle.cms.web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hamle.cms.config.AppProperties;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;

/**
 * Google Analytics Data API (GA4) istemcisi — servis hesabı JWT'si ile.
 * Google SDK'sı eklemeden: jjwt (RS256) + java.net.http ile REST çağrısı.
 */
@Component
public class GaClient {

    private final AppProperties props;
    private final ObjectMapper om = new ObjectMapper();
    private final HttpClient http = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_1_1)
            .connectTimeout(Duration.ofSeconds(5))
            .build();

    private volatile String token;
    private volatile Instant tokenExp = Instant.EPOCH;

    public GaClient(AppProperties props) {
        this.props = props;
    }

    public boolean isConfigured() {
        String id = props.getGa().getPropertyId();
        String key = props.getGa().getSaKeyPath();
        return id != null && !id.isBlank() && key != null && !key.isBlank() && Files.exists(Path.of(key));
    }

    /** Tek HTTP çağrısıyla en fazla 5 rapor (batchRunReports). */
    public JsonNode batchRunReports(String requestsJson) throws Exception {
        String url = "https://analyticsdata.googleapis.com/v1beta/properties/"
                + props.getGa().getPropertyId().trim() + ":batchRunReports";
        HttpRequest req = HttpRequest.newBuilder(URI.create(url))
                .header("Authorization", "Bearer " + accessToken())
                .header("Content-Type", "application/json")
                .timeout(Duration.ofSeconds(20))
                .POST(HttpRequest.BodyPublishers.ofString(requestsJson, StandardCharsets.UTF_8))
                .build();
        HttpResponse<String> res = http.send(req, HttpResponse.BodyHandlers.ofString());
        if (res.statusCode() != 200) {
            throw new IllegalStateException("GA raporu alınamadı (" + res.statusCode() + "): " + oneLine(res.body()));
        }
        return om.readTree(res.body());
    }

    private synchronized String accessToken() throws Exception {
        if (token != null && Instant.now().isBefore(tokenExp.minusSeconds(60))) return token;

        JsonNode sa = om.readTree(Files.readAllBytes(Path.of(props.getGa().getSaKeyPath())));
        String email = sa.get("client_email").asText();
        PrivateKey key = parsePem(sa.get("private_key").asText());

        Instant now = Instant.now();
        String assertion = Jwts.builder()
                .issuer(email)
                // Google, aud'u dizi değil düz metin bekler — single() şart.
                .audience().single("https://oauth2.googleapis.com/token")
                .claim("scope", "https://www.googleapis.com/auth/analytics.readonly")
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(3600)))
                .signWith(key, Jwts.SIG.RS256)
                .compact();

        String body = "grant_type=" + URLEncoder.encode("urn:ietf:params:oauth:grant-type:jwt-bearer", StandardCharsets.UTF_8)
                + "&assertion=" + assertion;
        HttpRequest req = HttpRequest.newBuilder(URI.create("https://oauth2.googleapis.com/token"))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .timeout(Duration.ofSeconds(10))
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();
        HttpResponse<String> res = http.send(req, HttpResponse.BodyHandlers.ofString());
        if (res.statusCode() != 200) {
            throw new IllegalStateException("GA erişim jetonu alınamadı: " + oneLine(res.body()));
        }
        JsonNode tok = om.readTree(res.body());
        token = tok.get("access_token").asText();
        tokenExp = now.plusSeconds(tok.path("expires_in").asLong(3600));
        return token;
    }

    /** Hata gövdesini log'da kesilmemesi için tek satıra indirir. */
    private static String oneLine(String s) {
        String t = (s == null ? "" : s).replaceAll("\\s+", " ").trim();
        return t.substring(0, Math.min(400, t.length()));
    }

    private static PrivateKey parsePem(String pem) throws Exception {
        String clean = pem
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replaceAll("\\s", "");
        byte[] der = Base64.getDecoder().decode(clean);
        return KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(der));
    }
}
