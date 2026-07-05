package com.hamle.cms.web;

import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Admin dashboard — Google Analytics verileri (1 saat önbellekli). JWT korumalı. */
@RestController
@RequestMapping("/api/admin/analytics")
public class AnalyticsController {

    private static final Logger log = LoggerFactory.getLogger(AnalyticsController.class);
    private static final long CACHE_SECONDS = 3600;

    private final GaClient ga;
    private volatile Map<String, Object> cache;
    private volatile Instant cachedAt = Instant.EPOCH;

    public AnalyticsController(GaClient ga) {
        this.ga = ga;
    }

    @GetMapping
    public Map<String, Object> get() {
        if (!ga.isConfigured()) return Map.of("configured", false);
        if (cache != null && Instant.now().isBefore(cachedAt.plusSeconds(CACHE_SECONDS))) return cache;
        try {
            JsonNode res = ga.batchRunReports(BATCH_BODY);
            Map<String, Object> out = parse(res);
            out.put("configured", true);
            out.put("updatedAt", Instant.now().toString());
            cache = out;
            cachedAt = Instant.now();
            return out;
        } catch (Exception e) {
            log.warn("GA verisi alınamadı: {}", e.getMessage());
            if (cache != null) return cache; // bayat da olsa göster
            Map<String, Object> err = new LinkedHashMap<>();
            err.put("configured", false);
            err.put("error", "Google Analytics verisi alınamadı. Servis hesabı/mülk yetkisini kontrol edin.");
            return err;
        }
    }

    /** 5 rapor: günlük seri, en çok görüntülenen sayfalar, blog yazıları, kanallar, cihazlar. */
    private static final String BATCH_BODY = """
            {"requests":[
              {"dateRanges":[{"startDate":"27daysAgo","endDate":"today"}],
               "dimensions":[{"name":"date"}],
               "metrics":[{"name":"activeUsers"},{"name":"screenPageViews"}],
               "orderBys":[{"dimension":{"dimensionName":"date"}}],
               "metricAggregations":["TOTAL"],"limit":"28"},
              {"dateRanges":[{"startDate":"27daysAgo","endDate":"today"}],
               "dimensions":[{"name":"pagePath"}],
               "metrics":[{"name":"screenPageViews"}],
               "orderBys":[{"metric":{"metricName":"screenPageViews"},"desc":true}],"limit":"8"},
              {"dateRanges":[{"startDate":"27daysAgo","endDate":"today"}],
               "dimensions":[{"name":"pagePath"}],
               "dimensionFilter":{"filter":{"fieldName":"pagePath","stringFilter":{"matchType":"BEGINS_WITH","value":"/blog/"}}},
               "metrics":[{"name":"screenPageViews"}],
               "orderBys":[{"metric":{"metricName":"screenPageViews"},"desc":true}],"limit":"6"},
              {"dateRanges":[{"startDate":"27daysAgo","endDate":"today"}],
               "dimensions":[{"name":"sessionDefaultChannelGroup"}],
               "metrics":[{"name":"sessions"}],
               "orderBys":[{"metric":{"metricName":"sessions"},"desc":true}],"limit":"5"},
              {"dateRanges":[{"startDate":"27daysAgo","endDate":"today"}],
               "dimensions":[{"name":"deviceCategory"}],
               "metrics":[{"name":"activeUsers"}],
               "orderBys":[{"metric":{"metricName":"activeUsers"},"desc":true}],"limit":"4"}
            ]}""";

    private Map<String, Object> parse(JsonNode res) {
        JsonNode reports = res.path("reports");

        // 0: günlük seri + toplamlar
        List<Map<String, Object>> daily = new ArrayList<>();
        long users7 = 0;
        JsonNode dailyRows = reports.path(0).path("rows");
        int n = dailyRows.size();
        for (int i = 0; i < n; i++) {
            JsonNode r = dailyRows.get(i);
            String date = r.path("dimensionValues").path(0).path("value").asText(); // YYYYMMDD
            long u = r.path("metricValues").path(0).path("value").asLong(0);
            long v = r.path("metricValues").path(1).path("value").asLong(0);
            if (i >= n - 7) users7 += u;
            daily.add(Map.of("date", date, "users", u, "views", v));
        }
        long users28 = reports.path(0).path("totals").path(0).path("metricValues").path(0).path("value").asLong(0);
        long views28 = reports.path(0).path("totals").path(0).path("metricValues").path(1).path("value").asLong(0);

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("daily", daily);
        out.put("users28", users28);
        out.put("views28", views28);
        out.put("users7", users7);
        out.put("topPages", simpleRows(reports.path(1)));
        out.put("topPosts", simpleRows(reports.path(2)));
        out.put("channels", simpleRows(reports.path(3)));
        out.put("devices", simpleRows(reports.path(4)));
        return out;
    }

    /** [{name, value}] — tek boyut + tek metrikli raporlar için. */
    private List<Map<String, Object>> simpleRows(JsonNode report) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (JsonNode r : report.path("rows")) {
            list.add(Map.of(
                    "name", r.path("dimensionValues").path(0).path("value").asText(),
                    "value", r.path("metricValues").path(0).path("value").asLong(0)));
        }
        return list;
    }
}
