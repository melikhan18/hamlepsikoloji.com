// İçerik katmanı: içeriği CMS API'sinden (Spring Boot) çeker.
// API ulaşılamazsa yerel veriye (src/data/*) düşer — böylece site her zaman derlenir.
import { posts as localPosts, type Post } from "@/data/posts";
import { team as localTeam, type Expert } from "@/data/team";
import { services as localServices, type Service } from "@/data/services";
import { faqGroups as localFaqGroups, type FaqGroup } from "@/data/faq";
import { site } from "@/lib/site";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
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
export async function getExperts(): Promise<Expert[]> {
  try {
    const res = await fetch(`${API}/api/experts`, OPTS);
    if (!res.ok) return localTeam;
    const data = (await res.json()) as Expert[];
    if (!Array.isArray(data) || data.length === 0) return localTeam;
    return data;
  } catch {
    return localTeam;
  }
}

export async function getExpert(slug: string): Promise<Expert | undefined> {
  try {
    const res = await fetch(`${API}/api/experts/${slug}`, OPTS);
    if (res.ok) return (await res.json()) as Expert;
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

/* ===== Site ayarları (tekil) ===== */
type SettingsApi = {
  phoneDisplay?: string; phone?: string; whatsapp?: string; email?: string;
  addressStreet?: string; addressDistrict?: string; addressCity?: string;
  addressPostalCode?: string; addressCountry?: string;
  hours?: string; mapsQuery?: string;
  socialInstagram?: string; socialLinkedin?: string; socialYoutube?: string;
};

function mergeSettings(d: SettingsApi): typeof site {
  const address = {
    street: d.addressStreet || site.address.street,
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
    phoneDisplay: d.phoneDisplay || site.phoneDisplay,
    phone: d.phone || site.phone,
    whatsapp: d.whatsapp || site.whatsapp,
    email: d.email || site.email,
    hours: d.hours || site.hours,
    mapsQuery: d.mapsQuery || site.mapsQuery,
    address,
    social: {
      instagram: d.socialInstagram ?? site.social.instagram,
      linkedin: d.socialLinkedin ?? site.social.linkedin,
      youtube: d.socialYoutube ?? site.social.youtube,
    },
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
