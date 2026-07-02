package com.hamle.cms.web;

import com.hamle.cms.domain.FaqGroup;
import com.hamle.cms.repo.FaqGroupRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/** Admin CRUD uçları — JWT ile korunur (/api/admin/**). */
@RestController
@RequestMapping("/api/admin/faq-groups")
public class AdminFaqController {

    private final FaqGroupRepository repo;
    private final FaqMapper mapper;
    private final RevalidationClient revalidation;

    public AdminFaqController(FaqGroupRepository repo, FaqMapper mapper, RevalidationClient revalidation) {
        this.repo = repo;
        this.mapper = mapper;
        this.revalidation = revalidation;
    }

    @GetMapping
    public List<FaqDtos.FaqGroupResponse> list() {
        return repo.findAllByOrderBySortOrderAscIdAsc().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FaqDtos.FaqGroupResponse> get(@PathVariable Long id) {
        return repo.findById(id).map(mapper::toResponse).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FaqDtos.FaqGroupResponse> create(@Valid @RequestBody FaqDtos.FaqGroupRequest req) {
        FaqGroup g = new FaqGroup();
        mapper.apply(req, g);
        FaqGroup saved = repo.save(g);
        revalidation.revalidateSite();
        return ResponseEntity.created(URI.create("/api/admin/faq-groups/" + saved.getId()))
                .body(mapper.toResponse(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FaqDtos.FaqGroupResponse> update(@PathVariable Long id,
                                                           @Valid @RequestBody FaqDtos.FaqGroupRequest req) {
        return repo.findById(id).map(g -> {
            mapper.apply(req, g);
            FaqDtos.FaqGroupResponse res = mapper.toResponse(repo.save(g));
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
