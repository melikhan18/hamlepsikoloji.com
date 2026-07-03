package com.hamle.cms.web;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class ExpertDtos {

    /** Genel API yanıtı — frontend Expert tipiyle birebir. */
    public record ExpertResponse(
            Long id,
            String slug,
            String name,
            String title,
            String credentials,
            String photo,
            String approach,
            List<String> specialties,
            List<String> methods,
            List<String> serviceSlugs,
            List<String> education,
            List<String> bio,
            Integer sortOrder,
            String seoTitle,
            String seoDescription
    ) {}

    /** Admin oluşturma/güncelleme isteği. */
    public record ExpertRequest(
            @NotBlank String slug,
            @NotBlank String name,
            String title,
            String credentials,
            String photo,
            String approach,
            List<String> specialties,
            List<String> methods,
            List<String> serviceSlugs,
            List<String> education,
            List<String> bio,
            Integer sortOrder,
            String seoTitle,
            String seoDescription
    ) {}
}
