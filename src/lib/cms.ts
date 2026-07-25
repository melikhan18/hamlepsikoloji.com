// İçerik katmanı: içeriği CMS API'sinden (Spring Boot) çeker.
// API ulaşılamazsa yerel veriye (src/data/*) düşer — böylece site her zaman derlenir.
import { posts as localPosts, type Post } from "@/data/posts";
import { team as localTeam, type Expert } from "@/data/team";
import { services as localServices, type Service } from "@/data/services";
import { faqGroups as localFaqGroups, type FaqGroup } from "@/data/faq";
import { legalDocs as localLegalDocs, type LegalDoc } from "@/data/legal";
import { siteImageDefaults } from "@/lib/images";
import { site } from "@/lib/site";

// Sunucu tarafı (build + SSR/ISR) istekleri için iç adres tercih edilir:
// üretimde API_URL_INTERNAL=http://localhost:8081 → Cloudflare/hairpin'e takılmaz, hızlıdır.
// Tarayıcı tarafı (ContactForm) NEXT_PUBLIC_API_URL kullanmaya devam eder.
const API = process.env.API_URL_INTERNAL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
// Yedek zaman aşımı. Anında tazeleme /api/revalidate webhook'u ile yapılır;
// bu değer yalnızca webhook çalışmazsa en fazla ne kadar beklendiğini belirler.
const REVALIDATE = 300;
const OPTS = { next: { revalidate: REVALIDATE } };

export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${API}/api/posts`, OPTS);
    if (!res.ok) return localPosts;
    const data = (await res.json()) as Post[];
    if (!Array.isArray(data) || data.length === 0) return localPosts;
    return data;
  } catch {
    return localPosts;
  }
}

export async function getPost(slug: string): Promise<Post | undefined> {
  try {
    const res = await fetch(`${API}/api/posts/${slug}`, OPTS);
    if (res.ok) return (await res.json()) as Post;
  } catch {
    /* fall through */
  }
  return (await getPosts()).find((p) => p.slug === slug);
}

/* ===== Ekip (uzmanlar) ===== */
function isPublishableExpert(expert: Expert): boolean {
  const content = [
    expert.name,
    expert.slug,
    ...(expert.education || []),
    ...(expert.bio || []),
  ].join(" ");
  return !/uzman isim|uzman-bir|uzman-iki|\[placeholder\]|örnek biyografi/i.test(content);
}

export async function getExperts(): Promise<Expert[]> {
  try {
    const res = await fetch(`${API}/api/experts`, OPTS);
    if (!res.ok) return localTeam;
    const data = (await res.json()) as Expert[];
    if (!Array.isArray(data) || data.length === 0) return localTeam;
    return data.filter(isPublishableExpert);
  } catch {
    return localTeam;
  }
}

export async function getExpert(slug: string): Promise<Expert | undefined> {
  try {
    const res = await fetch(`${API}/api/experts/${slug}`, OPTS);
    if (res.ok) {
      const expert = (await res.json()) as Expert;
      return isPublishableExpert(expert) ? expert : undefined;
    }
  } catch {
    /* fall through */
  }
  return (await getExperts()).find((e) => e.slug === slug);
}

export async function getExpertsForService(serviceSlug: string): Promise<Expert[]> {
  return (await getExperts()).filter((e) => e.serviceSlugs.includes(serviceSlug));
}

/* ===== Hizmetler ===== */
export async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${API}/api/services`, OPTS);
    if (!res.ok) return localServices;
    const data = (await res.json()) as Service[];
    if (!Array.isArray(data) || data.length === 0) return localServices;
    return data;
  } catch {
    return localServices;
  }
}

export async function getService(slug: string): Promise<Service | undefined> {
  try {
    const res = await fetch(`${API}/api/services/${slug}`, OPTS);
    if (res.ok) return (await res.json()) as Service;
  } catch {
    /* fall through */
  }
  return (await getServices()).find((s) => s.slug === slug);
}

/* ===== S.S.S. (FAQ) ===== */
type FaqGroupApi = { slug: string; title: string; items: { q: string; a: string }[] };

export async function getFaqGroups(): Promise<FaqGroup[]> {
  try {
    const res = await fetch(`${API}/api/faq-groups`, OPTS);
    if (res.ok) {
      const data = (await res.json()) as FaqGroupApi[];
      if (Array.isArray(data) && data.length > 0) {
        // API slug'ı, frontend'in beklediği anchor "id" alanına eşlenir.
        return data.map((g) => ({ id: g.slug, title: g.title, items: g.items || [] }));
      }
    }
  } catch {
    /* fall through */
  }
  return localFaqGroups;
}

/* ===== Hukuki metinler ===== */
export async function getLegalDoc(slug: string): Promise<LegalDoc> {
  try {
    const res = await fetch(`${API}/api/legal-docs/${slug}`, OPTS);
    if (res.ok) return (await res.json()) as LegalDoc;
  } catch {
    /* fall through */
  }
  return localLegalDocs.find((d) => d.slug === slug) ?? localLegalDocs[0];
}

/* ===== Site görselleri (hero, CTA vb. sabit noktalar) ===== */
type SiteImageApi = { key: string; url?: string };

export async function getSiteImages(): Promise<Record<string, string>> {
  const map = { ...siteImageDefaults };
  try {
    const res = await fetch(`${API}/api/site-images`, OPTS);
    if (res.ok) {
      const data = (await res.json()) as SiteImageApi[];
      if (Array.isArray(data)) {
        for (const it of data) {
          if (it.key && it.url) map[it.key] = it.url;
        }
      }
    }
  } catch {
    /* fallback: varsayılanlar */
  }
  return map;
}

/* ===== Site ayarları (tekil) ===== */
type SettingsApi = {
  phoneDisplay?: string; phone?: string; whatsapp?: string; email?: string;
  addressStreet?: string; addressDistrict?: string; addressCity?: string;
  addressPostalCode?: string; addressCountry?: string;
  hours?: string; mapsQuery?: string;
  socialInstagram?: string; socialLinkedin?: string; socialYoutube?: string;
  siteTitle?: string; metaDescription?: string; keywords?: string;
  googleVerification?: string; ga4Id?: string; gtmId?: string;
  geoLat?: string; geoLng?: string; areaServed?: string;
};

function mergeSettings(d: SettingsApi): typeof site {
  const clean = (value?: string) => {
    if (!value) return "";
    return /000 00 00|000000000|500000000|örnek cad/i.test(value) ? "" : value;
  };
  const address = {
    street: clean(d.addressStreet) || site.address.street,
    district: d.addressDistrict || site.address.district,
    city: d.addressCity || site.address.city,
    postalCode: d.addressPostalCode || site.address.postalCode,
    country: d.addressCountry || site.address.country,
    get full() {
      return `${this.street}, ${this.district}/${this.city}`;
    },
  };
  return {
    ...site,
    phoneDisplay: clean(d.phoneDisplay) || site.phoneDisplay,
    phone: clean(d.phone) || site.phone,
    whatsapp: clean(d.whatsapp) || site.whatsapp,
    email: d.email || site.email,
    hours: d.hours || site.hours,
    mapsQuery: d.mapsQuery || site.mapsQuery,
    address,
    social: {
      instagram: d.socialInstagram ?? site.social.instagram,
      linkedin: d.socialLinkedin ?? site.social.linkedin,
      youtube: d.socialYoutube ?? site.social.youtube,
    },
    // SEO & Analytics — boşsa site.ts varsayılanına düşer
    seoTitle: d.siteTitle || site.seoTitle,
    description: d.metaDescription || site.description,
    keywords: d.keywords || site.keywords,
    googleVerification: d.googleVerification || site.googleVerification,
    ga4Id: d.ga4Id || site.ga4Id,
    gtmId: d.gtmId || site.gtmId,
    // Yerel SEO — geo string olarak gelir, sayıya çevrilir
    geo: {
      lat: d.geoLat && !isNaN(Number(d.geoLat)) ? Number(d.geoLat) : site.geo.lat,
      lng: d.geoLng && !isNaN(Number(d.geoLng)) ? Number(d.geoLng) : site.geo.lng,
    },
    areaServed: d.areaServed || site.areaServed,
  };
}

export async function getSettings(): Promise<typeof site> {
  try {
    const res = await fetch(`${API}/api/settings`, OPTS);
    if (res.ok) return mergeSettings((await res.json()) as SettingsApi);
  } catch {
    /* fall through */
  }
  return site;
}
