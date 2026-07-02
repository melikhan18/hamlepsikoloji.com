package com.hamle.cms.web;

import com.hamle.cms.domain.SiteSettings;
import com.hamle.cms.repo.SiteSettingsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/** Admin — tekil site ayarları (id=1 upsert). JWT korumalı. */
@RestController
@RequestMapping("/api/admin/settings")
public class AdminSettingsController {

    private static final long SINGLETON_ID = 1L;

    private final SiteSettingsRepository repo;
    private final SettingsMapper mapper;
    private final RevalidationClient revalidation;

    public AdminSettingsController(SiteSettingsRepository repo, SettingsMapper mapper, RevalidationClient revalidation) {
        this.repo = repo;
        this.mapper = mapper;
        this.revalidation = revalidation;
    }

    @GetMapping
    public SettingsDtos.SettingsPayload get() {
        return repo.findById(SINGLETON_ID)
                .map(mapper::toResponse)
                .orElseGet(() -> mapper.toResponse(new SiteSettings()));
    }

    @PutMapping
    public SettingsDtos.SettingsPayload update(@RequestBody SettingsDtos.SettingsPayload req) {
        SiteSettings s = repo.findById(SINGLETON_ID).orElseGet(() -> {
            SiteSettings ns = new SiteSettings();
            ns.setId(SINGLETON_ID);
            return ns;
        });
        mapper.apply(req, s);
        SettingsDtos.SettingsPayload res = mapper.toResponse(repo.save(s));
        revalidation.revalidateSite();
        return res;
    }
}
