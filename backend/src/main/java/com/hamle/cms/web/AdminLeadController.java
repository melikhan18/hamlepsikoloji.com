package com.hamle.cms.web;

import com.hamle.cms.repo.LeadRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/** Admin — talep kutusu. JWT korumalı (/api/admin/**). */
@RestController
@RequestMapping("/api/admin/leads")
public class AdminLeadController {

    private final LeadRepository repo;
    private final LeadMapper mapper;

    public AdminLeadController(LeadRepository repo, LeadMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @GetMapping
    public List<LeadDtos.LeadResponse> list() {
        return repo.findAllByOrderByCreatedAtDesc().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/count")
    public Map<String, Long> count() {
        return Map.of("new", repo.countByStatus("new"));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<LeadDtos.LeadResponse> update(@PathVariable Long id,
                                                        @RequestBody LeadDtos.LeadUpdateRequest req) {
        return repo.findById(id).map(l -> {
            if (req.status() != null && !req.status().isBlank()) l.setStatus(req.status());
            if (req.note() != null) l.setNote(req.note().isBlank() ? null : req.note());
            return ResponseEntity.ok(mapper.toResponse(repo.save(l)));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
