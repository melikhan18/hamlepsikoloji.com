package com.hamle.cms.repo;

import com.hamle.cms.domain.SiteImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SiteImageRepository extends JpaRepository<SiteImage, Long> {
    List<SiteImage> findAllByOrderByIdAsc();
}
