package com.hamle.cms.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

/** İletişim/randevu formu talebi. İçerik değil — revalidation tetiklemez. */
@Entity
@Table(name = "leads")
@Getter
@Setter
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    private String email;

    private String service;

    @Column(columnDefinition = "text")
    private String message;

    /** new | contacted | closed */
    @Column(nullable = false)
    private String status = "new";

    @Column(columnDefinition = "text")
    private String note;

    private String source = "form";

    @Column(name = "created_at")
    private Instant createdAt;

    @PrePersist
    void onCreate() {
        if (createdAt == null) createdAt = Instant.now();
        if (status == null || status.isBlank()) status = "new";
    }
}
