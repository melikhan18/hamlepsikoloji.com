package com.hamle.cms.web;

import com.hamle.cms.domain.FaqGroup;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FaqMapper {

    private static <T> List<T> nn(List<T> l) {
        return l != null ? l : new ArrayList<>();
    }

    public FaqDtos.FaqGroupResponse toResponse(FaqGroup g) {
        return new FaqDtos.FaqGroupResponse(g.getId(), g.getSlug(), g.getTitle(), nn(g.getItems()), g.getSortOrder());
    }

    public void apply(FaqDtos.FaqGroupRequest r, FaqGroup g) {
        g.setSlug(r.slug());
        g.setTitle(r.title());
        g.setItems(nn(r.items()));
        g.setSortOrder(r.sortOrder() != null ? r.sortOrder() : 0);
    }
}
