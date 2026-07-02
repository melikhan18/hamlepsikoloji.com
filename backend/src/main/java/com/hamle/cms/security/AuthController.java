package com.hamle.cms.security;

import com.hamle.cms.config.AppProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AppProperties props;
    private final JwtService jwtService;

    public AuthController(AppProperties props, JwtService jwtService) {
        this.props = props;
        this.jwtService = jwtService;
    }

    public record LoginRequest(String username, String password) {}
    public record LoginResponse(String token, String username) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        boolean ok = props.getAdmin().getUsername().equals(req.username())
                && props.getAdmin().getPassword().equals(req.password());
        if (!ok) {
            return ResponseEntity.status(401).body(Map.of("error", "Geçersiz kullanıcı adı veya şifre"));
        }
        return ResponseEntity.ok(new LoginResponse(jwtService.generate(req.username()), req.username()));
    }
}
