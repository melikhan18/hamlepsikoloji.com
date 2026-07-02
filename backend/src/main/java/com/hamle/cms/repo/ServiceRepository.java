package com.hamle.cms.repo;

import com.hamle.cms.domain.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findAllByOrderBySortOrderAscIdAsc();
    Optional<Service> findBySlug(String slug);
}
