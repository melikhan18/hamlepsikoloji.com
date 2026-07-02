package com.hamle.cms.repo;

import com.hamle.cms.domain.FaqGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FaqGroupRepository extends JpaRepository<FaqGroup, Long> {
    List<FaqGroup> findAllByOrderBySortOrderAscIdAsc();
    Optional<FaqGroup> findBySlug(String slug);
}
