package com.hamle.cms.web;

import com.hamle.cms.domain.ContentBlock;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class PostDtos {

    /** Genel API yanıtı — frontend'in beklediği şekille birebir. */
    public record PostResponse(
            Long id,
            String slug,
            String title,
            String excerpt,
            String date,
            String category,
            String icon,
            String cover,
            String authorSlug,
            String seoTitle,
            String seoDescription,
            List<ContentBlock> content
    ) {}

    /** Admin oluşturma/güncelleme isteği. */
    public record PostRequest(
            @NotBlank String slug,
            @NotBlank String title,
            String excerpt,
            String date,
            String category,
            String icon,
            String cover,
            String authorSlug,
            String seoTitle,
            String seoDescription,
            List<ContentBlock> content
    ) {}
}
