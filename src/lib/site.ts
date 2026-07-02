// Merkezi site yapılandırması. [PLACEHOLDER] etiketli alanları gerçek bilgilerle güncelleyin.
export const site = {
  name: "Hamle Psikoloji",
  shortName: "Hamle",
  legalName: "Hamle Psikoloji Danışmanlık Merkezi",
  domain: "hamlepsikoloji.com",
  url: "https://hamlepsikoloji.com",
  tagline: "İyi oluşa doğru ilk hamle",
  description:
    "Hamle Psikoloji, İstanbul'da bireysel terapi, çift & aile terapisi, çocuk & ergen danışmanlığı ve online terapi hizmetleri sunan uzman psikoloji merkezidir.",

  // İletişim — [PLACEHOLDER]
  phoneDisplay: "+90 (212) 000 00 00",
  phone: "+902120000000",
  whatsapp: "905000000000", // ülke kodu + numara, başında + ve boşluk olmadan
  email: "info@hamlepsikoloji.com",

  // Adres — [PLACEHOLDER]
  address: {
    street: "Caferağa Mah. Örnek Cad. No: 1, Kat 3",
    district: "Kadıköy",
    city: "İstanbul",
    postalCode: "34710",
    country: "TR",
    get full() {
      return `${this.street}, ${this.district}/${this.city}`;
    },
  },
  geo: { lat: 40.9901, lng: 29.0277 }, // [PLACEHOLDER] gerçek konum
  mapsQuery: "Hamle Psikoloji Kadıköy İstanbul",
  hours: "Pazartesi–Cumartesi 09:00–20:00",

  // Sosyal medya — [PLACEHOLDER]
  social: {
    instagram: "https://instagram.com/hamlepsikoloji",
    linkedin: "https://www.linkedin.com/company/hamlepsikoloji",
    youtube: "",
  },
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
