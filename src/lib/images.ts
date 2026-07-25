// Merkezi görsel kaynağı. CMS görselleri yoksa lisanslı Unsplash görselleri kullanılır.
const base = "https://images.unsplash.com";
const opt = "auto=format&fit=crop&q=80";

export const u = (id: string, w = 1200, h?: number) => {
  // Tam URL ise (API'den gelen kapak/görsel) olduğu gibi döndür.
  if (!id) return "";
  if (id.startsWith("http")) return id;
  return `${base}/${id}?${opt}&w=${w}${h ? `&h=${h}` : ""}`;
};

export const img = {
  heroMain: "photo-1506126613408-eca07ce68773", // sakinlik / nefes
  about: "photo-1551836022-deb4988cc6c0", // terapi/danışmanlık seansı — destekleyici görüşme
};

// Site geneli görsel noktaları — API (panel > Görseller) kapalıysa fallback.
// Anahtarlar backend site_images.img_key ile birebir.
export const siteImageDefaults: Record<string, string> = {
  homeHero: img.heroMain,
  homeAbout: img.about,
  aboutTop: img.about,
  aboutSecond: "photo-1521791136064-7986c2920216",
  ctaBanner: img.about,
};
