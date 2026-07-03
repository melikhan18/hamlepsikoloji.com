package com.hamle.cms.web;

import com.hamle.cms.domain.Faq;
import com.hamle.cms.domain.ProcessStep;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class ServiceDtos {

    /** Genel API yanıtı — frontend Service tipiyle birebir. */
    public record ServiceResponse(
            Long id,
            String slug,
            String title,
            String shortTitle,
            String tagline,
            String summary,
            String pitch,
            String icon,
            String illo,
            List<String> forWho,
            List<ProcessStep> process,
            List<Faq> faqs,
            Integer sortOrder,
            String seoTitle,
            String seoDescription
    ) {}

    /** Admin oluşturma/güncelleme isteği. */
    public record ServiceRequest(
            @NotBlank String slug,
            @NotBlank String title,
            String shortTitle,
            String tagline,
            String summary,
            String pitch,
            String icon,
            String illo,
            List<String> forWho,
            List<ProcessStep> process,
            List<Faq> faqs,
            Integer sortOrder,
            String seoTitle,
            String seoDescription
    ) {}
}
