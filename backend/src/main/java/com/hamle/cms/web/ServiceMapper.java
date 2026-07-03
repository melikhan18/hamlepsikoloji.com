package com.hamle.cms.web;

import com.hamle.cms.domain.Service;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ServiceMapper {

    private static <T> List<T> nn(List<T> l) {
        return l != null ? l : new ArrayList<>();
    }

    public ServiceDtos.ServiceResponse toResponse(Service s) {
        return new ServiceDtos.ServiceResponse(
                s.getId(), s.getSlug(), s.getTitle(), s.getShortTitle(), s.getTagline(),
                s.getSummary(), s.getPitch(), s.getIcon(), s.getIllo(),
                nn(s.getForWho()), nn(s.getProcess()), nn(s.getFaqs()), s.getSortOrder(),
                s.getSeoTitle(), s.getSeoDescription()
        );
    }

    public void apply(ServiceDtos.ServiceRequest r, Service s) {
        s.setSlug(r.slug());
        s.setTitle(r.title());
        s.setShortTitle(r.shortTitle());
        s.setTagline(r.tagline());
        s.setSummary(r.summary());
        s.setPitch(r.pitch());
        s.setIcon(r.icon());
        s.setIllo(r.illo());
        s.setForWho(nn(r.forWho()));
        s.setProcess(nn(r.process()));
        s.setFaqs(nn(r.faqs()));
        s.setSortOrder(r.sortOrder() != null ? r.sortOrder() : 0);
        s.setSeoTitle(r.seoTitle());
        s.setSeoDescription(r.seoDescription());
    }
}
