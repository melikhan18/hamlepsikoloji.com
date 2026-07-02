package com.hamle.cms.web;

import com.hamle.cms.domain.Service;
import com.hamle.cms.repo.ServiceRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/** Admin CRUD uçları — JWT ile korunur (/api/admin/**). */
@RestController
@RequestMapping("/api/admin/services")
public class AdminServiceController {

    private final ServiceRepository repo;
    private final ServiceMapper mapper;
    private final RevalidationClient revalidation;

    public AdminServiceController(ServiceRepository repo, ServiceMapper mapper, RevalidationClient revalidation) {
        this.repo = repo;
        this.mapper = mapper;
        this.revalidation = revalidation;
    }

    @GetMapping
    public List<ServiceDtos.ServiceResponse> list() {
        return repo.findAllByOrderBySortOrderAscIdAsc().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceDtos.ServiceResponse> get(@PathVariable Long id) {
        return repo.findById(id).map(mapper::toResponse).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ServiceDtos.ServiceResponse> create(@Valid @RequestBody ServiceDtos.ServiceRequest req) {
        Service s = new Service();
        mapper.apply(req, s);
        Service saved = repo.save(s);
        revalidation.revalidateSite();
        return ResponseEntity.created(URI.create("/api/admin/services/" + saved.getId()))
                .body(mapper.toResponse(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceDtos.ServiceResponse> update(@PathVariable Long id,
                                                              @Valid @RequestBody ServiceDtos.ServiceRequest req) {
        return repo.findById(id).map(s -> {
            mapper.apply(req, s);
            ServiceDtos.ServiceResponse res = mapper.toResponse(repo.save(s));
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
