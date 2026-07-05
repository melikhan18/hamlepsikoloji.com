package com.hamle.cms.web;

public class SiteImageDtos {

    /** Genel + admin yanıtı. */
    public record SiteImageResponse(
            Long id,
            String key,
            String label,
            String description,
            String url
    ) {}

    /** Admin güncelleme — yalnızca URL değiştirilir (anahtar/etiket sabit). */
    public record SiteImageRequest(String url) {}
}
