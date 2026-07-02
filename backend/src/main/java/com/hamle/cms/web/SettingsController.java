package com.hamle.cms.web;

import com.hamle.cms.repo.SiteSettingsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Genel (salt-okunur) site ayarları — Next.js site tüketir. */
@RestController
@RequestMapping("/api/settings")
public class SettingsController {

    private final SiteSettingsRepository repo;
    private final SettingsMapper mapper;

    public SettingsController(SiteSettingsRepository repo, SettingsMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity<SettingsDtos.SettingsPayload> get() {
        return repo.findById(1L)
                .map(mapper::toResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }
}
