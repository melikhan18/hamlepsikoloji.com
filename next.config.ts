import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Optimize edilmiş görseller CDN/tarayıcıda 31 gün cache'lenir (varsayılan 60 sn idi).
    minimumCacheTTL: 2678400,
    // Yüklenen görseller sunucu İÇİNDEN çekilir: dev'de localhost:8081, üretimde
    // /etc/hosts ile api.hamlepsikoloji.com→127.0.0.1 (hairpin/Cloudflare'e takılmamak için).
    // Güvenli: remotePatterns yalnızca kendi host'larımıza izin veriyor — optimizer
    // keyfi iç adresleri zaten çekemez.
    dangerouslyAllowLocalIP: true,
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
