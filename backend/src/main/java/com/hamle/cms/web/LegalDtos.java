package com.hamle.cms.web;

import com.hamle.cms.domain.DocSection;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class LegalDtos {

    /** Genel API yanıtı — frontend LegalPage ile uyumlu. */
    public record LegalDocResponse(
            Long id,
            String slug,
            String title,
            String intro,
            List<DocSection> sections
    ) {}

    /** Admin güncelleme isteği (slug sabit — değiştirilmez). */
    public record LegalDocRequest(
            @NotBlank String title,
            String intro,
            List<DocSection> sections
    ) {}
}
