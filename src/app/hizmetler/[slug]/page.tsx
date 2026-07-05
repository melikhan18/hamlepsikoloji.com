import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Breadcrumbs, Button, Eyebrow, CTABanner } from "@/components/ui";
import { ExpertCard, PostCard } from "@/components/Cards";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { getServices, getService, getExpertsForService, getPosts, getSettings } from "@/lib/cms";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  const metaTitle = service.seoTitle || `${service.title} — ${service.tagline}`;
  const metaDesc = service.seoDescription || service.summary.slice(0, 155);
  return {
    title: metaTitle,
    description: metaDesc,
    alternates: { canonical: `/hizmetler/${service.slug}` },
    openGraph: {
      type: "website",
      url: `/hizmetler/${service.slug}`,
      title: service.seoTitle || `${service.title} | ${site.name}`,
      description: metaDesc,
    },
  };
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const experts = await getExpertsForService(service.slug);
  const posts = await getPosts();
  const settings = await getSettings();
  const relatedPosts = posts.filter((p) => p.category.toLowerCase().includes(service.shortTitle.split(" ")[0].toLowerCase())).slice(0, 2);

  return (
    <>
      <Container className="py-10">
        <Breadcrumbs
          items={[
            { name: "Ana Sayfa", url: "/" },
            { name: "Hizmetlerimiz", url: "/hizmetler" },
            { name: service.title, url: `/hizmetler/${service.slug}` },
          ]}
        />
      </Container>

      {/* Başlık */}
      <Container className="pb-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-soft text-teal">
            <Icon name={service.icon} className="h-7 w-7" />
          </span>
          <div>
            <Eyebrow>Hizmet</Eyebrow>
            <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">{service.title}</h1>
            <p className="mt-3 max-w-2xl text-lg text-muted">{service.tagline}</p>
          </div>
        </div>
      </Container>

      <Container className="grid gap-12 pb-16 lg:grid-cols-3">
        {/* Ana içerik */}
        <div className="lg:col-span-2">
          <p className="text-base leading-relaxed text-ink/90">{service.summary}</p>

          <h2 className="mt-10 text-2xl font-semibold text-ink">Kimler için uygun?</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {service.forWho.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl bg-white p-4 text-sm text-ink/90">
                <span className="mt-0.5 text-teal">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-2xl font-semibold text-ink">Süreç nasıl işler?</h2>
          <ol className="mt-5 space-y-4">
            {service.process.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-peach-soft font-serif text-sm font-semibold text-peach-dark">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{step.title}</h3>
                  <p className="text-sm text-muted">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* SSS */}
          <h2 className="mt-10 text-2xl font-semibold text-ink">Sık sorulan sorular</h2>
          <div className="mt-5 divide-y divide-line rounded-2xl border border-line bg-white">
            {service.faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none font-medium text-ink marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span className="text-teal transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Yan panel */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-line bg-teal p-6 text-cream">
            <h3 className="font-serif text-xl">Randevu alın</h3>
            <p className="mt-2 text-sm text-teal-soft">
              {service.title} için ücretsiz ön görüşme oluşturalım.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Button href="/iletisim" variant="soft">Randevu Al</Button>
            </div>
            <p className="mt-4 text-xs text-teal-soft">veya {settings.phoneDisplay}</p>
          </div>
        </aside>
      </Container>

      {/* İlgili uzmanlar */}
      {experts.length > 0 && (
        <Container className="pb-16">
          <h2 className="text-2xl font-semibold text-ink">Bu alanda çalışan uzmanlar</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experts.map((e) => (
              <ExpertCard key={e.slug} expert={e} />
            ))}
          </div>
        </Container>
      )}

      {/* İlgili yazılar */}
      {relatedPosts.length > 0 && (
        <Container className="pb-16">
          <h2 className="text-2xl font-semibold text-ink">İlgili yazılar</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {relatedPosts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      )}

      <CTABanner />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Ana Sayfa", url: "/" },
            { name: "Hizmetlerimiz", url: "/hizmetler" },
            { name: service.title, url: `/hizmetler/${service.slug}` },
          ]),
          serviceSchema(service),
          faqSchema(service.faqs),
        ]}
      />
    </>
  );
}
