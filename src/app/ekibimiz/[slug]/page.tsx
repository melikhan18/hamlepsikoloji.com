import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Breadcrumbs, Button, Eyebrow } from "@/components/ui";
import { Avatar } from "@/components/Avatar";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getExperts, getExpert, getServices } from "@/lib/cms";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const team = await getExperts();
  return team.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const expert = await getExpert(slug);
  if (!expert) return {};
  const metaTitle = expert.seoTitle || `${expert.name} — ${expert.title}`;
  const metaDesc =
    expert.seoDescription ||
    `${expert.name}, ${expert.credentials}. Uzmanlık: ${expert.specialties.slice(0, 3).join(", ")}. İstanbul'da yüz yüze ve online danışmanlık.`;
  return {
    title: metaTitle,
    description: metaDesc,
    alternates: { canonical: `/ekibimiz/${expert.slug}` },
    openGraph: {
      type: "profile",
      url: `/ekibimiz/${expert.slug}`,
      title: metaTitle,
      description: metaDesc,
      ...(expert.photo ? { images: [{ url: expert.photo, alt: expert.name }] } : {}),
    },
  };
}

export default async function ExpertDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const expert = await getExpert(slug);
  if (!expert) notFound();
  const services = await getServices();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/ekibimiz/${expert.slug}#person`,
    name: expert.name,
    jobTitle: expert.title,
    ...(expert.photo ? { image: expert.photo } : {}),
    worksFor: { "@type": "Organization", name: site.name, url: site.url },
    knowsAbout: expert.specialties,
    url: `${site.url}/ekibimiz/${expert.slug}`,
  };

  return (
    <>
      <Container className="py-10">
        <Breadcrumbs
          items={[
            { name: "Ana Sayfa", url: "/" },
            { name: "Ekibimiz", url: "/ekibimiz" },
            { name: expert.name, url: `/ekibimiz/${expert.slug}` },
          ]}
        />
      </Container>

      <Container className="grid gap-12 pb-16 lg:grid-cols-3">
        {/* Sol: kimlik kartı */}
        <aside className="lg:col-span-1">
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <div className="aspect-square w-full">
              <Avatar expert={expert} />
            </div>
            <div className="p-6">
              <h1 className="text-xl font-semibold text-ink">{expert.name}</h1>
              <p className="mt-1 text-sm text-teal">{expert.title}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted">{expert.credentials}</p>
              <div className="mt-5">
                <Button href="/iletisim" className="w-full">Randevu Al</Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Sağ: detay */}
        <div className="lg:col-span-2">
          <Eyebrow>Uzman</Eyebrow>
          <h2 className="mt-2 text-2xl font-semibold text-ink">Hakkında</h2>
          {expert.bio.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-ink/90">{p}</p>
          ))}

          <h2 className="mt-8 text-2xl font-semibold text-ink">Çalışma alanları</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {expert.specialties.map((s) => (
              <li key={s} className="rounded-full bg-teal-soft px-3 py-1.5 text-sm text-teal-dark">{s}</li>
            ))}
          </ul>

          <h2 className="mt-8 text-2xl font-semibold text-ink">Kullandığı yöntemler</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {expert.methods.map((m) => (
              <li key={m} className="rounded-full bg-peach-soft px-3 py-1.5 text-sm text-peach-dark">{m}</li>
            ))}
          </ul>

          <h2 className="mt-8 text-2xl font-semibold text-ink">Eğitim &amp; sertifikalar</h2>
          <ul className="mt-4 space-y-2">
            {expert.education.map((e) => (
              <li key={e} className="flex gap-3 text-sm text-ink/90">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                {e}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-2xl font-semibold text-ink">İlgili hizmetler</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {expert.serviceSlugs.map((slug) => {
              const s = services.find((x) => x.slug === slug);
              if (!s) return null;
              return (
                <Link
                  key={slug}
                  href={`/hizmetler/${slug}`}
                  className="rounded-full border border-teal px-4 py-1.5 text-sm text-teal hover:bg-teal-soft"
                >
                  {s.shortTitle}
                </Link>
              );
            })}
          </div>
        </div>
      </Container>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Ana Sayfa", url: "/" },
            { name: "Ekibimiz", url: "/ekibimiz" },
            { name: expert.name, url: `/ekibimiz/${expert.slug}` },
          ]),
          personSchema,
        ]}
      />
    </>
  );
}
