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

    @Column(name = "updated_at")
    private Instant updatedAt;

    @PrePersist
    @PreUpdate
    void touch() {
        updatedAt = Instant.now();
    }
}
