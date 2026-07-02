package com.hamle.cms.repo;

import com.hamle.cms.domain.LegalDoc;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LegalDocRepository extends JpaRepository<LegalDoc, Long> {
    List<LegalDoc> findAllByOrderByIdAsc();
    Optional<LegalDoc> findBySlug(String slug);
}
