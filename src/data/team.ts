export type Expert = {
  slug: string;
  name: string;
  title: string; // unvan
  credentials: string; // kısa nitelik satırı
  photo: string;
  specialties: string[];
  methods: string[];
  serviceSlugs: string[]; // ilgili hizmetler
  education: string[];
  bio: string[]; // paragraflar
  approach: string; // kısa, kişisel yaklaşım cümlesi (kartta öne çıkar)
  seoTitle?: string;
  seoDescription?: string;
};

// Gerçek uzmanlar CMS üzerinden yayınlanır. CMS erişilemezse sahte kişi göstermeyiz.
export const team: Expert[] = [];

export const getExpert = (slug: string) => team.find((e) => e.slug === slug);
export const expertsForService = (serviceSlug: string) =>
  team.filter((e) => e.serviceSlugs.includes(serviceSlug));
