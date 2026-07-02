package com.hamle.cms.web;

import com.hamle.cms.domain.LegalDoc;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class LegalMapper {

    public LegalDtos.LegalDocResponse toResponse(LegalDoc d) {
        return new LegalDtos.LegalDocResponse(
                d.getId(), d.getSlug(), d.getTitle(), d.getIntro(),
                d.getSections() != null ? d.getSections() : new ArrayList<>()
        );
    }

    public void apply(LegalDtos.LegalDocRequest r, LegalDoc d) {
        d.setTitle(r.title());
        d.setIntro(r.intro());
        d.setSections(r.sections() != null ? r.sections() : new ArrayList<>());
    }
}
