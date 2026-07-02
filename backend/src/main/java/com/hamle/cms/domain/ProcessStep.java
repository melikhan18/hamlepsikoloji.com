package com.hamle.cms.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

/** Hizmet süreç adımı (jsonb içinde saklanır). */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProcessStep {
    private String title;
    private String desc;
}
