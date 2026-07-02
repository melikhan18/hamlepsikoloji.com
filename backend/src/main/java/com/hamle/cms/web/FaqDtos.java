package com.hamle.cms.web;

import com.hamle.cms.domain.Faq;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class FaqDtos {

    /** Genel API yanıtı — frontend FaqGroup tipiyle uyumlu (slug = anchor id). */
    public record FaqGroupResponse(
            Long id,
            String slug,
            String title,
            List<Faq> items,
            Integer sortOrder
    ) {}

    /** Admin oluşturma/güncelleme isteği. */
    public record FaqGroupRequest(
            @NotBlank String slug,
            @NotBlank String title,
            List<Faq> items,
            Integer sortOrder
    ) {}
}
