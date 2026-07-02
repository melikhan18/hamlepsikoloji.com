import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
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
