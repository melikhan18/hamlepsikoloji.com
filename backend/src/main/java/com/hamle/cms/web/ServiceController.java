package com.hamle.cms.web;

import com.hamle.cms.repo.ServiceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Genel (salt-okunur) hizmet uçları — Next.js site bunları tüketir. */
@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceRepository repo;
    private final ServiceMapper mapper;

    public ServiceController(ServiceRepository repo, ServiceMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @GetMapping
    public List<ServiceDtos.ServiceResponse> list() {
        return repo.findAllByOrderBySortOrderAscIdAsc().stream().map(mapper::toResponse).toList();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ServiceDtos.ServiceResponse> bySlug(@PathVariable String slug) {
        return repo.findBySlug(slug)
                .map(mapper::toResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
