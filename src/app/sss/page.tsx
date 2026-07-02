import type { Metadata } from "next";
import { Container, Breadcrumbs } from "@/components/ui";
import { Accordion } from "@/components/Accordion";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { getFaqGroups } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular",
  description:
    "Terapi süreci, gizlilik, ücret, seans süresi, online terapi ve randevu hakkında en sık sorulan soruların yanıtları.",
  alternates: { canonical: "/sss" },
};

export default async function FaqPage() {
  const faqGroups = await getFaqGroups();
  const allFaqs = faqGroups.flatMap((g) => g.items);
  return (
    <>
      <Container className="py-10">
        <Breadcrumbs items={[{ name: "Ana Sayfa", url: "/" }, { name: "S.S.S.", url: "/sss" }]} />
      </Container>

      {/* Başlık */}
      <Container className="pb-2">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-5xl text-ink sm:text-6xl">S.S.S.</h1>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Sıkça sorulan sorular
          </p>
        </div>
      </Container>

      {/* Kategori pill'leri */}
      <Container className="pt-8">
        <div className="flex flex-wrap justify-center gap-3">
          {faqGroups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink/80 transition-colors card-soft hover:text-teal"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
              {g.title}
            </a>
          ))}
        </div>
        <div className="mt-8 border-t border-line" />
      </Container>

      {/* Kategori bölümleri */}
      <Container className="pb-20">
        <div className="divide-y divide-line">
          {faqGroups.map((g) => (
            <section
              key={g.id}
              id={g.id}
              className="grid scroll-mt-28 gap-8 py-14 lg:grid-cols-[1fr_1.5fr] lg:gap-16"
            >
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="font-serif text-3xl text-ink sm:text-4xl">{g.title}</h2>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                  En çok sorulan sorular
                </p>
              </div>
              <div>
                <Accordion items={g.items} />
              </div>
            </section>
          ))}
        </div>
      </Container>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Ana Sayfa", url: "/" },
            { name: "S.S.S.", url: "/sss" },
          ]),
          faqSchema(allFaqs),
        ]}
      />
    </>
  );
}
