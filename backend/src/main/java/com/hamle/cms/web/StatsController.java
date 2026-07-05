package com.hamle.cms.web;

import com.hamle.cms.repo.ExpertRepository;
import com.hamle.cms.repo.LeadRepository;
import com.hamle.cms.repo.PostRepository;
import com.hamle.cms.repo.ServiceRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Admin dashboard — panel içi istatistikler (talepler + içerik). JWT korumalı. */
@RestController
@RequestMapping("/api/admin/stats")
public class StatsController {

    private static final ZoneId TZ = ZoneId.of("Europe/Istanbul");

    private final LeadRepository leads;
    private final PostRepository posts;
    private final ExpertRepository experts;
    private final ServiceRepository services;
    private final LeadMapper leadMapper;

    public StatsController(LeadRepository leads, PostRepository posts, ExpertRepository experts,
                           ServiceRepository services, LeadMapper leadMapper) {
        this.leads = leads;
        this.posts = posts;
        this.experts = experts;
        this.services = services;
        this.leadMapper = leadMapper;
    }

    @GetMapping
    public Map<String, Object> get() {
        var all = leads.findAllByOrderByCreatedAtDesc();

        LocalDate today = LocalDate.now(TZ);
        LocalDate start = today.minusDays(29);
        Map<LocalDate, Long> byDay = new HashMap<>();
        for (var l : all) {
            if (l.getCreatedAt() == null) continue;
            LocalDate d = l.getCreatedAt().atZone(TZ).toLocalDate();
            if (!d.isBefore(start)) byDay.merge(d, 1L, Long::sum);
        }
        List<Map<String, Object>> daily = new ArrayList<>();
        long last30 = 0;
        for (LocalDate d = start; !d.isAfter(today); d = d.plusDays(1)) {
            long c = byDay.getOrDefault(d, 0L);
            last30 += c;
            daily.add(Map.of("date", d.toString(), "count", c));
        }

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("leadsNew", leads.countByStatus("new"));
        out.put("leadsTotal", all.size());
        out.put("leads30", last30);
        out.put("leadsDaily", daily);
        out.put("posts", posts.count());
        out.put("experts", experts.count());
        out.put("services", services.count());
        out.put("recentLeads", all.stream().limit(5).map(leadMapper::toResponse).toList());
        return out;
    }
}
