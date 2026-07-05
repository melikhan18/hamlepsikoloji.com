package com.hamle.cms.web;

import com.hamle.cms.repo.SiteImageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Admin — site görselleri (yalnızca URL güncelleme). JWT korumalı. */
@RestController
@RequestMapping("/api/admin/site-images")
public class AdminSiteImageController {

    private final SiteImageRepository repo;
    private final RevalidationClient revalidation;

    public AdminSiteImageController(SiteImageRepository repo, RevalidationClient revalidation) {
        this.repo = repo;
        this.revalidation = revalidation;
    }

    @GetMapping
    public List<SiteImageDtos.SiteImageResponse> list() {
        return repo.findAllByOrderByIdAsc().stream()
                .map(i -> new SiteImageDtos.SiteImageResponse(i.getId(), i.getKey(), i.getLabel(), i.getDescription(), i.getUrl()))
                .toList();
    }

    @PutMapping("/{id}")
    public ResponseEntity<SiteImageDtos.SiteImageResponse> update(@PathVariable Long id,
                                                                  @RequestBody SiteImageDtos.SiteImageRequest req) {
        return repo.findById(id).map(i -> {
            i.setUrl(req.url() != null ? req.url().trim() : "");
            var saved = repo.save(i);
            revalidation.revalidateSite();
            return ResponseEntity.ok(new SiteImageDtos.SiteImageResponse(saved.getId(), saved.getKey(), saved.getLabel(), saved.getDescription(), saved.getUrl()));
        }).orElse(ResponseEntity.notFound().build());
    }
}
