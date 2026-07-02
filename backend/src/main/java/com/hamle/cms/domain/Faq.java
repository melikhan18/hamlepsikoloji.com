package com.hamle.cms.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

/** Soru/cevap çifti (hizmet SSS'i — jsonb içinde saklanır). */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Faq {
    private String q;
    private String a;
}
