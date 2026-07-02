package com.hamle.cms.web;

import com.hamle.cms.repo.PostRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Genel (salt-okunur) blog uçları — Next.js site bunları tüketir. */
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostRepository repo;
    private final PostMapper mapper;

    public PostController(PostRepository repo, PostMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @GetMapping
    public List<PostDtos.PostResponse> list() {
        return repo.findAllByOrderByDateDesc().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PostDtos.PostResponse> bySlug(@PathVariable String slug) {
        return repo.findBySlug(slug)
                .map(mapper::toResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
