package com.hamle.cms.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

/** Site geneli sabit görsel noktası (hero, CTA vb.). Sabit anahtarlar — yalnızca URL düzenlenir. */
@Entity
@Table(name = "site_images")
@Getter
@Setter
public class SiteImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "img_key", unique = true, nullable = false)
    private String key;

    @Column(nullable = false)
    private String label;

    @Column(columnDefinition = "text")
    private String description;

    @Column(columnDefinition = "text")
    private String url;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @PrePersist
    @PreUpdate
    void touch() {
        updatedAt = Instant.now();
    }
}
