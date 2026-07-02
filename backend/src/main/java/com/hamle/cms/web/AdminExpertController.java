package com.hamle.cms.web;

import com.hamle.cms.domain.Expert;
import com.hamle.cms.repo.ExpertRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/** Admin CRUD uçları — JWT ile korunur (/api/admin/**). */
@RestController
@RequestMapping("/api/admin/experts")
public class AdminExpertController {

    private final ExpertRepository repo;
    private final ExpertMapper mapper;
    private final RevalidationClient revalidation;

    public AdminExpertController(ExpertRepository repo, ExpertMapper mapper, RevalidationClient revalidation) {
        this.repo = repo;
        this.mapper = mapper;
        this.revalidation = revalidation;
    }

    @GetMapping
    public List<ExpertDtos.ExpertResponse> list() {
        return repo.findAllByOrderBySortOrderAscIdAsc().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpertDtos.ExpertResponse> get(@PathVariable Long id) {
        return repo.findById(id).map(mapper::toResponse).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ExpertDtos.ExpertResponse> create(@Valid @RequestBody ExpertDtos.ExpertRequest req) {
        Expert e = new Expert();
        mapper.apply(req, e);
        Expert saved = repo.save(e);
        revalidation.revalidateSite();
        return ResponseEntity.created(URI.create("/api/admin/experts/" + saved.getId()))
                .body(mapper.toResponse(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpertDtos.ExpertResponse> update(@PathVariable Long id,
                                                            @Valid @RequestBody ExpertDtos.ExpertRequest req) {
        return repo.findById(id).map(e -> {
            mapper.apply(req, e);
            ExpertDtos.ExpertResponse res = mapper.toResponse(repo.save(e));
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
