package com.hamle.cms.web;

import com.hamle.cms.repo.SiteImageRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** Genel (salt-okunur) site görselleri — Next.js site tüketir. */
@RestController
@RequestMapping("/api/site-images")
public class SiteImageController {

    private final SiteImageRepository repo;

    public SiteImageController(SiteImageRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<SiteImageDtos.SiteImageResponse> list() {
        return repo.findAllByOrderByIdAsc().stream()
                .map(i -> new SiteImageDtos.SiteImageResponse(i.getId(), i.getKey(), i.getLabel(), i.getDescription(), i.getUrl()))
                .toList();
    }
}
