import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Geliştirmede backend localhost:8081'deki yüklenen görselleri optimize edebilmek için.
    // Üretimde KAPALI (görseller public api.hamlepsikoloji.com'dan gelir; SSRF koruması açık kalır).
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      // Unsplash görselleri
      { protocol: "https", hostname: "images.unsplash.com" },
      // CMS'e (Spring Boot) yüklenen görseller — üretim
      { protocol: "https", hostname: "api.hamlepsikoloji.com" },
      // Yerel geliştirme
      { protocol: "http", hostname: "localhost", port: "8081" },
    ],
  },
};

export default nextConfig;
