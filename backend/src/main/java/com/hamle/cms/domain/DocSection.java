package com.hamle.cms.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

/** Hukuki metin bölümü: başlık (h) + paragraf (p). jsonb içinde saklanır. */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DocSection {
    private String h;
    private String p;
}
