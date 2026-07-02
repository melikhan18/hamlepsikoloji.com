import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPosts, getServices, getExperts } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const posts = await getPosts();
  const services = await getServices();
  const team = await getExperts();
  const staticRoutes = [
    "",
    "/hizmetler",
    "/ekibimiz",
    "/blog",
    "/hakkimizda",
    "/sss",
    "/iletisim",
    "/kvkk",
    "/gizlilik",
    "/cerez-politikasi",
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/hizmetler/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const teamRoutes = team.map((e) => ({
    url: `${base}/ekibimiz/${e.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...teamRoutes, ...postRoutes];
}
