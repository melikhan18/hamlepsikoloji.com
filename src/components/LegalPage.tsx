import { Container, Breadcrumbs } from "@/components/ui";

export function LegalPage({
  title,
  slug,
  intro,
  sections,
  contact,
}: {
  title: string;
  slug: string;
  intro: string;
  sections: { h: string; p: string }[];
  contact: { legalName: string; email: string; address: string };
}) {
  return (
    <>
      <Container className="py-10">
        <Breadcrumbs items={[{ name: "Ana Sayfa", url: "/" }, { name: title, url: `/${slug}` }]} />
      </Container>
      <article className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
        <p className="mt-6 leading-relaxed text-ink/90">{intro}</p>
        <div className="prose-hamle mt-6">
          {sections.map((s) => (
            <div key={s.h}>
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-line bg-white/70 p-5 text-sm leading-relaxed text-muted">
          <strong className="text-ink">İletişim ve başvuru:</strong>{" "}
          {contact.legalName}{contact.address ? `, ${contact.address}` : ""}.{" "}
          <a className="font-semibold text-teal underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>
      </article>
    </>
  );
}
