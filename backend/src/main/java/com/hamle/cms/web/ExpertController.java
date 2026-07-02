package com.hamle.cms.web;

import com.hamle.cms.repo.ExpertRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Genel (salt-okunur) ekip uçları — Next.js site bunları tüketir. */
@RestController
@RequestMapping("/api/experts")
public class ExpertController {

    private final ExpertRepository repo;
    private final ExpertMapper mapper;

    public ExpertController(ExpertRepository repo, ExpertMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @GetMapping
    public List<ExpertDtos.ExpertResponse> list() {
        return repo.findAllByOrderBySortOrderAscIdAsc().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ExpertDtos.ExpertResponse> bySlug(@PathVariable String slug) {
        return repo.findBySlug(slug)
                .map(mapper::toResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
