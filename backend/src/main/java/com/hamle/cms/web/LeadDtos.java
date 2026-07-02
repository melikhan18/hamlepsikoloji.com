package com.hamle.cms.web;

import jakarta.validation.constraints.NotBlank;

public class LeadDtos {

    /** Herkese açık form gönderimi. `website` = honeypot (bot tuzağı). */
    public record LeadCreateRequest(
            @NotBlank String name,
            @NotBlank String phone,
            String email,
            String service,
            String message,
            Boolean kvkkConsent,
            String website
    ) {}

    /** Admin liste yanıtı. */
    public record LeadResponse(
            Long id,
            String name,
            String phone,
            String email,
            String service,
            String message,
            String status,
            String note,
            String source,
            String createdAt
    ) {}

    /** Admin durum/not güncelleme. */
    public record LeadUpdateRequest(
            String status,
            String note
    ) {}
}
