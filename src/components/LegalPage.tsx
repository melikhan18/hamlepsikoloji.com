import { Container, Breadcrumbs } from "@/components/ui";

export function LegalPage({
  title,
  slug,
  intro,
  sections,
}: {
  title: string;
  slug: string;
  intro: string;
  sections: { h: string; p: string }[];
}) {
  return (
    <>
      <Container className="py-10">
        <Breadcrumbs items={[{ name: "Ana Sayfa", url: "/" }, { name: title, url: `/${slug}` }]} />
      </Container>
      <article className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
        <p className="mt-4 text-sm italic text-muted">
          [PLACEHOLDER] Bu metin örnek/şablon niteliğindedir. Yayına almadan önce bir hukuk
          danışmanı tarafından kuruma uygun şekilde düzenlenmelidir.
        </p>
        <p className="mt-6 leading-relaxed text-ink/90">{intro}</p>
        <div className="prose-hamle mt-6">
          {sections.map((s) => (
            <div key={s.h}>
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
