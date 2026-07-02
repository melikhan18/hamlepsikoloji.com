package com.hamle.cms.web;

import com.hamle.cms.domain.Lead;
import com.hamle.cms.repo.LeadRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/** Herkese açık — iletişim formu talep gönderimi. */
@RestController
@RequestMapping("/api/leads")
public class LeadController {

    private final LeadRepository repo;

    public LeadController(LeadRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody LeadDtos.LeadCreateRequest req) {
        // Honeypot: gizli alan doluysa bot kabul et — sessizce başarı dön, kaydetme.
        if (req.website() != null && !req.website().isBlank()) {
            return ResponseEntity.ok(Map.of("ok", true));
        }
        if (req.kvkkConsent() == null || !req.kvkkConsent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "KVKK onayı gerekli."));
        }

        Lead l = new Lead();
        l.setName(req.name().trim());
        l.setPhone(req.phone().trim());
        l.setEmail(blankToNull(req.email()));
        l.setService(blankToNull(req.service()));
        l.setMessage(blankToNull(req.message()));
        l.setSource("form");
        repo.save(l);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("ok", true));
    }

    private static String blankToNull(String s) {
        return (s == null || s.isBlank()) ? null : s.trim();
    }
}
