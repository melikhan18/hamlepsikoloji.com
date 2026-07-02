package com.hamle.cms.web;

import com.hamle.cms.config.AppProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

/**
 * Next.js on-demand ISR webhook'unu tetikler.
 * Bir yazı oluşturulduğunda/güncellendiğinde/silindiğinde ön yüz cache'i anında
 * tazelenir. Ateşle-unut (async): revalidation hatası kayıt işlemini ASLA bloke
 * etmez veya başarısız kılmaz.
 */
@Component
public class RevalidationClient {

    private static final Logger log = LoggerFactory.getLogger(RevalidationClient.class);

    private final AppProperties props;
    private final HttpClient http = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_1_1) // Next dev sunucusu HTTP/2 upgrade'de takılabiliyor
            .connectTimeout(Duration.ofSeconds(3))
            .build();

    public RevalidationClient(AppProperties props) {
        this.props = props;
    }

    /** İçerik (blog/ekip/hizmet) değişince ön yüz sayfalarını tazeler. */
    public void revalidateSite() {
        String base = props.getRevalidate().getUrl();
        if (base == null || base.isBlank()) return; // özellik kapalı

        String secret = props.getRevalidate().getSecret() == null ? "" : props.getRevalidate().getSecret();
        String url = base + (base.contains("?") ? "&" : "?")
                + "secret=" + URLEncoder.encode(secret, StandardCharsets.UTF_8);

        HttpRequest req = HttpRequest.newBuilder(URI.create(url))
                .timeout(Duration.ofSeconds(5))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.noBody())
                .build();

        http.sendAsync(req, HttpResponse.BodyHandlers.ofString())
                .thenAccept(res -> {
                    if (res.statusCode() >= 200 && res.statusCode() < 300) {
                        log.info("Revalidation OK ({})", res.statusCode());
                    } else {
                        log.warn("Revalidation beklenmedik yanıt: {} — {}", res.statusCode(), res.body());
                    }
                })
                .exceptionally(e -> {
                    log.warn("Revalidation webhook başarısız (ön yüz kapalı olabilir): {}", e.getMessage());
                    return null;
                });
    }
}
