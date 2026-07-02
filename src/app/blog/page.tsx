import type { Metadata } from "next";
import Link from "next/link";
import { Container, Breadcrumbs } from "@/components/ui";
import { FeaturedPosts } from "@/components/FeaturedPosts";
import { BlogExplorer } from "@/components/BlogExplorer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getPosts, getServices } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Blog — Psikoloji Üzerine Yazılar",
  description:
    "Kaygı, depresyon, ilişkiler, ebeveynlik ve online terapi üzerine uzman psikologlarımızın kaleminden bilgilendirici yazılar.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const sorted = [...(await getPosts())].sort((a, b) => (a.date < b.date ? 1 : -1));
  const services = await getServices();

  return (
    <>
      <Container className="py-10">
        <Breadcrumbs items={[{ name: "Ana Sayfa", url: "/" }, { name: "Blog", url: "/blog" }]} />
      </Container>

      <Container className="pb-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl text-ink sm:text-5xl">Blog</h1>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Günlük yaşam için pratik psikoloji.
          </p>
        </div>
      </Container>

      {/* Öne çıkan yazı slider'ı */}
      <Container className="pt-8">
        <FeaturedPosts posts={sorted} />
      </Container>

      {/* Kategoriler */}
      <Container className="pb-20 pt-20">
        <BlogExplorer posts={sorted} />
      </Container>

      {/* Footer öncesi: Hizmet alanları */}
      <section className="bg-cream">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl text-ink sm:text-4xl">
              Hizmet <em>alanları</em>
            </h2>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Desteğe mi ihtiyacınız var? Buradayız.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => {
              const words = s.title.split(" ");
              const em = words.pop();
              const pre = words.join(" ");
              return (
                <Link
                  key={s.slug}
                  href={`/hizmetler/${s.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl bg-white px-6 py-5 card-soft transition-all hover:-translate-y-0.5"
                >
                  <span className="font-serif text-lg leading-tight text-ink">
                    {pre} <em>{em}</em>
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-soft text-teal transition-transform group-hover:translate-x-0.5">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />
    </>
  );
}
