package com.hamle.cms.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

/** Blog içerik bloğu (jsonb içinde saklanır). Tek seferde biri kullanılır. */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ContentBlock {
    private String h2;       // ara başlık
    private String p;        // paragraf
    private List<String> ul; // madde listesi
    private String image;    // görsel URL
}
