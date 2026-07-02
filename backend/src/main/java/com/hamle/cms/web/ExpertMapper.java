package com.hamle.cms.web;

import com.hamle.cms.domain.Expert;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ExpertMapper {

    private static <T> List<T> nn(List<T> l) {
        return l != null ? l : new ArrayList<>();
    }

    public ExpertDtos.ExpertResponse toResponse(Expert e) {
        return new ExpertDtos.ExpertResponse(
                e.getId(), e.getSlug(), e.getName(), e.getTitle(), e.getCredentials(),
                e.getPhoto(), e.getApproach(),
                nn(e.getSpecialties()), nn(e.getMethods()), nn(e.getServiceSlugs()),
                nn(e.getEducation()), nn(e.getBio()), e.getSortOrder()
        );
    }

    public void apply(ExpertDtos.ExpertRequest r, Expert e) {
        e.setSlug(r.slug());
        e.setName(r.name());
        e.setTitle(r.title());
        e.setCredentials(r.credentials());
        e.setPhoto(r.photo());
        e.setApproach(r.approach());
        e.setSpecialties(nn(r.specialties()));
        e.setMethods(nn(r.methods()));
        e.setServiceSlugs(nn(r.serviceSlugs()));
        e.setEducation(nn(r.education()));
        e.setBio(nn(r.bio()));
        e.setSortOrder(r.sortOrder() != null ? r.sortOrder() : 0);
    }
}
