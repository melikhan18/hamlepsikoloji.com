package com.hamle.cms.web;

import com.hamle.cms.repo.LegalDocRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Admin — hukuki metinleri düzenleme (yalnızca güncelleme). JWT korumalı. */
@RestController
@RequestMapping("/api/admin/legal-docs")
public class AdminLegalController {

    private final LegalDocRepository repo;
    private final LegalMapper mapper;
    private final RevalidationClient revalidation;

    public AdminLegalController(LegalDocRepository repo, LegalMapper mapper, RevalidationClient revalidation) {
        this.repo = repo;
        this.mapper = mapper;
        this.revalidation = revalidation;
    }

    @GetMapping
    public List<LegalDtos.LegalDocResponse> list() {
        return repo.findAllByOrderByIdAsc().stream().map(mapper::toResponse).toList();
    }

    @PutMapping("/{id}")
    public ResponseEntity<LegalDtos.LegalDocResponse> update(@PathVariable Long id,
                                                             @Valid @RequestBody LegalDtos.LegalDocRequest req) {
        return repo.findById(id).map(d -> {
            mapper.apply(req, d);
            LegalDtos.LegalDocResponse res = mapper.toResponse(repo.save(d));
            revalidation.revalidateSite();
            return ResponseEntity.ok(res);
        }).orElse(ResponseEntity.notFound().build());
    }
}
