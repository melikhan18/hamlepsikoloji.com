// Merkezi site yapılandırması. Kuruma özel iletişim bilgileri CMS üzerinden yönetilir.
export const site = {
  name: "Hamle Psikoloji",
  shortName: "Hamle",
  legalName: "Hamle Psikoloji Danışmanlık Merkezi",
  domain: "hamlepsikoloji.com",
  url: "https://hamlepsikoloji.com",
  tagline: "İyi oluşa doğru ilk hamle",
  description:
    "Hamle Psikoloji; bireysel terapi, çift ve aile terapisi, çocuk ve ergen danışmanlığı ile online terapi alanlarında psikolojik destek sunar.",

  phoneDisplay: "",
  phone: "",
  whatsapp: "",
  email: "info@hamlepsikoloji.com",

  address: {
    street: "",
    district: "",
    city: "İstanbul",
    postalCode: "",
    country: "TR",
    get full() {
      return `${this.street}, ${this.district}/${this.city}`;
    },
  },
  geo: { lat: 0, lng: 0 },
  mapsQuery: "",
  hours: "Pazartesi–Cumartesi 09:00–20:00",

  social: {
    instagram: "https://instagram.com/hamlepsikoloji",
    linkedin: "https://www.linkedin.com/company/hamlepsikoloji",
    youtube: "",
  },

  // SEO & Analytics varsayılanları — SEO panelinden geçersiz kılınabilir
  areaServed: "İstanbul",
  seoTitle: "Hamle Psikoloji — Psikolog & Psikolojik Danışmanlık",
  keywords:
    "psikolog istanbul, psikolojik danışmanlık, online terapi, çift terapisi, bireysel terapi, çocuk psikoloğu, Hamle Psikoloji",
  googleVerification: "",
  ga4Id: "",
  gtmId: "",
  googleAdsId: "",
};

export const nav = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "Ekibimiz", href: "/ekibimiz" },
  { label: "Blog", href: "/blog" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "S.S.S.", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
];

export function whatsappLink(
  message = "Merhaba, randevu hakkında bilgi almak istiyorum.",
  number: string = site.whatsapp,
) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
