package com.hamle.cms.web;

import com.hamle.cms.repo.LegalDocRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Genel (salt-okunur) hukuki metin uçları — Next.js site tüketir. */
@RestController
@RequestMapping("/api/legal-docs")
public class LegalController {

    private final LegalDocRepository repo;
    private final LegalMapper mapper;

    public LegalController(LegalDocRepository repo, LegalMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @GetMapping
    public List<LegalDtos.LegalDocResponse> list() {
        return repo.findAllByOrderByIdAsc().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<LegalDtos.LegalDocResponse> bySlug(@PathVariable String slug) {
        return repo.findBySlug(slug)
                .map(mapper::toResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
