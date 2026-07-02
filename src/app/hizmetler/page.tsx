import type { Metadata } from "next";
import { Container, SectionHeading, Breadcrumbs, CTABanner, Button } from "@/components/ui";
import { ServiceCard } from "@/components/Cards";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getServices } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Hizmetlerimiz — Terapi & Psikolojik Danışmanlık",
  description:
    "Bireysel terapi, çift & aile terapisi, çocuk & ergen danışmanlığı ve online terapi. İstanbul'da uzman psikologlarla kanıta dayalı destek.",
  alternates: { canonical: "/hizmetler" },
};

// Psikolojik test & değerlendirme başlıkları
const evaluations = [
  "Zeka & yetenek testleri (WISC / WAIS)",
  "Dikkat & DEHB değerlendirmesi",
  "Kişilik değerlendirmesi (MMPI, projektif testler)",
  "Gelişimsel & eğitsel değerlendirme",
  "Kurum, okul ve adli süreçler için raporlama",
];

function Starburst() {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return {
      x1: 20 + Math.cos(a) * 5,
      y1: 20 + Math.sin(a) * 5,
      x2: 20 + Math.cos(a) * 17,
      y2: 20 + Math.sin(a) * 17,
    };
  });
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 text-teal" aria-hidden="true">
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <Container className="py-10">
        <Breadcrumbs items={[{ name: "Ana Sayfa", url: "/" }, { name: "Hizmetlerimiz", url: "/hizmetler" }]} />
      </Container>
      <Container className="pb-8">
        <SectionHeading
          eyebrow="Hizmetlerimiz"
          title="Uzmanlık alanlarımız"
          titleAs="h1"
          desc="İhtiyacınıza en uygun destek biçimini seçin. Her alan, deneyimli psikologlarımız tarafından gizlilik içinde yürütülür."
        />
      </Container>
      <Container className="pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Container>

      {/* ===== TEST & DEĞERLENDİRMELER ===== */}
      <section className="bg-cream">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl text-ink sm:text-4xl">
              Psikolojik <em>test</em> &amp; değerlendirmeler
            </h2>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Çocuk, ergen ve yetişkinler için anlaşılır, destekleyici değerlendirmeler.
            </p>
          </div>

          <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_auto_1.15fr] lg:gap-12">
            {/* Sol: açıklama + buton */}
            <div>
              <p className="leading-relaxed text-muted">
                Çocuk, ergen ve yetişkinler için gelişimsel, eğitsel ve psikolojik pek çok konuda
                kapsamlı değerlendirmeler sunuyoruz. Uzman kadromuz, ihtiyaç alanlarını hızlıca
                belirleyip önceliklendirerek size net bir yol haritası sunar.
              </p>
              <div className="mt-8">
                <Button href="/iletisim">Ön Görüşme Planla</Button>
              </div>
            </div>

            {/* Orta: dekoratif starburst + dikey çizgi */}
            <div className="hidden flex-col items-center self-stretch lg:flex">
              <Starburst />
              <span className="mt-3 w-px flex-1 bg-line" />
            </div>

            {/* Sağ: değerlendirme listesi */}
            <ul className="grid gap-3 sm:grid-cols-2">
              {evaluations.map((e, i) => (
                <li
                  key={e}
                  className={`flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-medium text-ink card-soft ${
                    i === evaluations.length - 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTABanner />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", url: "/" },
          { name: "Hizmetlerimiz", url: "/hizmetler" },
        ])}
      />
    </>
  );
}
