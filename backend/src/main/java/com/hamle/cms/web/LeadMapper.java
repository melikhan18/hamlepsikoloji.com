package com.hamle.cms.web;

import com.hamle.cms.domain.Lead;
import org.springframework.stereotype.Component;

@Component
public class LeadMapper {

    public LeadDtos.LeadResponse toResponse(Lead l) {
        return new LeadDtos.LeadResponse(
                l.getId(), l.getName(), l.getPhone(), l.getEmail(), l.getService(),
                l.getMessage(), l.getStatus(), l.getNote(), l.getSource(),
                l.getCreatedAt() != null ? l.getCreatedAt().toString() : null
        );
    }
}
