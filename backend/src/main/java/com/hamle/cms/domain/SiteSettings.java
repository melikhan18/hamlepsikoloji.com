package com.hamle.cms.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

/** Tekil site ayarları (iletişim, adres, sosyal). Her zaman tek satır (id=1). */
@Entity
@Table(name = "site_settings")
@Getter
@Setter
public class SiteSettings {

    @Id
    private Long id;

    private String phoneDisplay;
    private String phone;
    private String whatsapp;
    private String email;

    private String addressStreet;
    private String addressDistrict;
    private String addressCity;
    private String addressPostalCode;
    private String addressCountry;

    private String hours;
    private String mapsQuery;

    private String socialInstagram;
    private String socialLinkedin;
    private String socialYoutube;

    // Genel SEO
    @Column(name = "site_title")
    private String siteTitle;
    @Column(name = "meta_description", columnDefinition = "text")
    private String metaDescription;
    @Column(columnDefinition = "text")
    private String keywords;

    // Analytics & doğrulama
    @Column(name = "google_verification")
    private String googleVerification;
    @Column(name = "ga4_id")
    private String ga4Id;
    @Column(name = "gtm_id")
    private String gtmId;
    @Column(name = "google_ads_id")
    private String googleAdsId;

    // Yerel SEO (konum) — string olarak saklanır, şemada sayıya çevrilir
    @Column(name = "geo_lat")
    private String geoLat;
    @Column(name = "geo_lng")
    private String geoLng;
    @Column(name = "area_served")
    private String areaServed;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @PrePersist
    @PreUpdate
    void touch() {
        updatedAt = Instant.now();
    }
}
