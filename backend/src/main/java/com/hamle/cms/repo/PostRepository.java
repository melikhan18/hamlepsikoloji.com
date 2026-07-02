package com.hamle.cms.repo;

import com.hamle.cms.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByDateDesc();
    Optional<Post> findBySlug(String slug);
    boolean existsBySlug(String slug);
}
