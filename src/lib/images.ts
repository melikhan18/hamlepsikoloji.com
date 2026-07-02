// Merkezi görsel kaynağı. [PLACEHOLDER] — şu an Unsplash kullanılıyor.
// Gerçek fotoğraflar eklenince yalnızca buradaki URL'leri değiştirmeniz yeterli.
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
  heroSecondary: "photo-1518495973542-4542c06a5843", // doğa, ışık
  about: "photo-1551836022-deb4988cc6c0", // terapi/danışmanlık seansı — destekleyici görüşme
  cta: "photo-1469571486292-0ba58a3f068b", // destek / huzur
  service: {
    "bireysel-terapi": "photo-1559757148-5c350d0d3c56",
    "cift-ve-aile-terapisi": "photo-1516589178581-6cd7833ae3b2",
    "cocuk-ve-ergen-terapisi": "photo-1503454537195-1dcabb73ffb9",
    "online-terapi": "photo-1488521787991-ed7bbaae773c",
  } as Record<string, string>,
  testimonial: [
    "photo-1545205597-3d9d02c29597",
    "photo-1542596768-5d1d21f1cf98",
    "photo-1529693662653-9d480530a697",
  ],
};
