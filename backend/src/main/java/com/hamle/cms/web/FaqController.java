package com.hamle.cms.web;

import com.hamle.cms.repo.FaqGroupRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Genel (salt-okunur) S.S.S. uçları — Next.js site bunları tüketir. */
@RestController
@RequestMapping("/api/faq-groups")
public class FaqController {

    private final FaqGroupRepository repo;
    private final FaqMapper mapper;

    public FaqController(FaqGroupRepository repo, FaqMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @GetMapping
    public List<FaqDtos.FaqGroupResponse> list() {
        return repo.findAllByOrderBySortOrderAscIdAsc().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<FaqDtos.FaqGroupResponse> bySlug(@PathVariable String slug) {
        return repo.findBySlug(slug)
                .map(mapper::toResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
