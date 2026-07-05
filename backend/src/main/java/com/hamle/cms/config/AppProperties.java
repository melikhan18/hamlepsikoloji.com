package com.hamle.cms.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private Admin admin = new Admin();
    private Jwt jwt = new Jwt();
    private Cors cors = new Cors();
    private Uploads uploads = new Uploads();
    private Revalidate revalidate = new Revalidate();
    private Ga ga = new Ga();

    @Getter
    @Setter
    public static class Admin {
        private String username;
        private String password;
    }

    @Getter
    @Setter
    public static class Jwt {
        private String secret;
        private long expirationMinutes = 720;
    }

    @Getter
    @Setter
    public static class Cors {
        private String allowedOrigins = "http://localhost:3000";
    }

    @Getter
    @Setter
    public static class Uploads {
        private String dir = "uploads";
        private String publicBaseUrl = "http://localhost:8080/uploads";
    }

    @Getter
    @Setter
    public static class Revalidate {
        private String url = "";
        private String secret = "";
    }

    @Getter
    @Setter
    public static class Ga {
        /** GA4 mülk kimliği (sayısal, ör. 123456789 — ölçüm kimliği DEĞİL). */
        private String propertyId = "";
        /** Google servis hesabı JSON anahtarının dosya yolu. */
        private String saKeyPath = "";
    }
}
