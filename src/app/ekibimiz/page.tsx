import type { Metadata } from "next";
import { Container, Breadcrumbs, CTABanner } from "@/components/ui";
import { ExpertCard } from "@/components/Cards";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getExperts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Ekibimiz — Uzman Psikologlarımız",
  description:
    "Hamle Psikoloji'nin alanında deneyimli, lisanslı uzman psikolog kadrosuyla tanışın. İstanbul'da yüz yüze ve online danışmanlık.",
  alternates: { canonical: "/ekibimiz" },
};

export default async function TeamPage() {
  const team = await getExperts();
  return (
    <>
      <Container className="py-10">
        <Breadcrumbs items={[{ name: "Ana Sayfa", url: "/" }, { name: "Ekibimiz", url: "/ekibimiz" }]} />
      </Container>
      <Container className="pb-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl text-ink sm:text-5xl">
            Deneyimli <em>uzman</em> kadromuz
          </h1>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Uzmanlarımızla tanışın.
          </p>
        </div>
      </Container>
      <Container className="pb-16 pt-10">
        {team.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-12">
            {team.map((e) => (
              <div key={e.slug} className="w-full max-w-xs">
                <ExpertCard expert={e} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-white/70 p-8 text-center">
            <h2 className="text-2xl text-ink">Size uygun desteği birlikte belirleyelim</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Uzman yönlendirmesi ve güncel randevu bilgisi için bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        )}
      </Container>
      <CTABanner />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", url: "/" },
          { name: "Ekibimiz", url: "/ekibimiz" },
        ])}
      />
    </>
  );
}
