package com.hamle.cms.repo;

import com.hamle.cms.domain.Expert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpertRepository extends JpaRepository<Expert, Long> {
    List<Expert> findAllByOrderBySortOrderAscIdAsc();
    Optional<Expert> findBySlug(String slug);
}
