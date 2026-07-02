package com.hamle.cms.web;

import com.hamle.cms.domain.Post;
import com.hamle.cms.repo.PostRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/** Admin CRUD uçları — JWT ile korunur (/api/admin/**). */
@RestController
@RequestMapping("/api/admin/posts")
public class AdminPostController {

    private final PostRepository repo;
    private final PostMapper mapper;
    private final RevalidationClient revalidation;

    public AdminPostController(PostRepository repo, PostMapper mapper, RevalidationClient revalidation) {
        this.repo = repo;
        this.mapper = mapper;
        this.revalidation = revalidation;
    }

    @GetMapping
    public List<PostDtos.PostResponse> list() {
        return repo.findAllByOrderByDateDesc().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDtos.PostResponse> get(@PathVariable Long id) {
        return repo.findById(id).map(mapper::toResponse).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PostDtos.PostResponse> create(@Valid @RequestBody PostDtos.PostRequest req) {
        Post p = new Post();
        mapper.apply(req, p);
        Post saved = repo.save(p);
        revalidation.revalidateSite();
        return ResponseEntity.created(URI.create("/api/admin/posts/" + saved.getId()))
                .body(mapper.toResponse(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDtos.PostResponse> update(@PathVariable Long id,
                                                        @Valid @RequestBody PostDtos.PostRequest req) {
        return repo.findById(id).map(p -> {
            mapper.apply(req, p);
            PostDtos.PostResponse res = mapper.toResponse(repo.save(p));
            revalidation.revalidateSite();
            return ResponseEntity.ok(res);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        revalidation.revalidateSite();
        return ResponseEntity.noContent().build();
    }
}
