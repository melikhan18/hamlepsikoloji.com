package com.hamle.cms.web;

import com.hamle.cms.domain.ContentBlock;
import com.hamle.cms.domain.Post;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class PostMapper {

    public PostDtos.PostResponse toResponse(Post p) {
        return new PostDtos.PostResponse(
                p.getId(),
                p.getSlug(),
                p.getTitle(),
                p.getExcerpt(),
                p.getDate() != null ? p.getDate().toString() : null,
                p.getCategory(),
                p.getIcon(),
                p.getCoverUrl(),
                p.getAuthorSlug(),
                p.getContent() != null ? p.getContent() : new ArrayList<>()
        );
    }

    /** Request alanlarını entity'ye uygular (oluşturma/güncelleme ortak). */
    public void apply(PostDtos.PostRequest req, Post p) {
        p.setSlug(req.slug());
        p.setTitle(req.title());
        p.setExcerpt(req.excerpt());
        p.setDate(req.date() != null && !req.date().isBlank() ? LocalDate.parse(req.date()) : null);
        p.setCategory(req.category());
        p.setIcon(req.icon());
        p.setCoverUrl(req.cover());
        p.setAuthorSlug(req.authorSlug());
        List<ContentBlock> content = req.content() != null ? req.content() : new ArrayList<>();
        p.setContent(content);
    }
}
