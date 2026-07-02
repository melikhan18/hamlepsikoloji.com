import type { Metadata } from "next";
import { Container, Breadcrumbs } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { whatsappLink } from "@/lib/site";
import { getSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "İletişim & Randevu",
  description:
    "Hamle Psikoloji ile iletişime geçin. İstanbul'daki merkezimizden yüz yüze ya da online randevu için form, telefon veya WhatsApp.",
  alternates: { canonical: "/iletisim" },
};

function MethodIcon({ d, extra }: { d: string; extra?: React.ReactNode }) {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-soft text-teal">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
        {extra}
      </svg>
    </span>
  );
}

export default async function ContactPage() {
  const s = await getSettings();
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapsQuery)}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(s.mapsQuery)}&output=embed`;

  const methods = [
    {
      label: "Telefon",
      value: s.phoneDisplay,
      href: `tel:${s.phone}`,
      icon: <MethodIcon d="M2 4.5C2 3.7 2.7 3 3.5 3H6l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v2.5c0 .8-.7 1.5-1.5 1.5A14.5 14.5 0 0 1 2 4.5z" />,
    },
    {
      label: "WhatsApp",
      value: "Hemen yazın",
      href: whatsappLink(undefined, s.whatsapp),
      external: true,
      icon: (
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-soft text-teal">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.52 11.94c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
          </svg>
        </span>
      ),
    },
    {
      label: "E-posta",
      value: s.email,
      href: `mailto:${s.email}`,
      icon: <MethodIcon d="M3 6h18v12H3z" extra={<path d="M3 7l9 6 9-6" />} />,
    },
    {
      label: "Adres",
      value: `${s.address.district}, İstanbul`,
      href: mapsLink,
      external: true,
      icon: <MethodIcon d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" extra={<circle cx="12" cy="10" r="2.5" />} />,
    },
  ];

  return (
    <>
      <Container className="py-10">
        <Breadcrumbs items={[{ name: "Ana Sayfa", url: "/" }, { name: "İletişim", url: "/iletisim" }]} />
      </Container>

      {/* Başlık */}
      <Container className="pb-2">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl text-ink sm:text-5xl">İletişim</h1>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Size yardımcı olmak için buradayız.
          </p>
        </div>
      </Container>

      {/* İletişim yöntemleri */}
      <Container className="pt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map((m) => (
            <a
              key={m.label}
              href={m.href}
              {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center gap-4 rounded-3xl bg-white p-5 transition-all card-soft hover:-translate-y-0.5"
            >
              {m.icon}
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted">{m.label}</span>
                <span className="block truncate text-sm font-medium text-ink transition-colors group-hover:text-teal">
                  {m.value}
                </span>
              </span>
            </a>
          ))}
        </div>
      </Container>

      {/* Form + saatler + harita */}
      <Container className="grid items-start gap-8 pb-20 pt-12 lg:grid-cols-2 lg:gap-12">
        {/* Form */}
        <div className="rounded-3xl bg-white p-7 card-soft sm:p-9">
          <h2 className="font-serif text-2xl text-ink">Randevu talebi oluşturun</h2>
          <p className="mt-2 text-sm text-muted">
            Formu doldurun; size en kısa sürede dönüş yapıp uygun uzman ve saati birlikte belirleyelim.
          </p>
          <div className="mt-6">
            <ContactForm phoneDisplay={s.phoneDisplay} />
          </div>
        </div>

        {/* Saatler + harita */}
        <div className="space-y-8">
          <div className="rounded-3xl bg-white p-7 card-soft sm:p-9">
            <h3 className="font-serif text-xl text-ink">Çalışma saatleri &amp; adres</h3>
            <ul className="mt-5 space-y-3 text-sm text-ink/90">
              <li className="flex items-start gap-3">
                <MethodIcon d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" extra={<circle cx="12" cy="10" r="2.5" />} />
                <span>{s.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <MethodIcon d="M12 7v5l3 2" extra={<circle cx="12" cy="12" r="9" />} />
                <span>{s.hours}</span>
              </li>
            </ul>
            <p className="mt-5 text-xs text-muted">
              Acil durumlarda lütfen 112'yi veya en yakın sağlık kuruluşunu arayın.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl card-soft">
            <iframe
              title="Hamle Psikoloji konum"
              src={mapSrc}
              className="h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", url: "/" },
          { name: "İletişim", url: "/iletisim" },
        ])}
      />
    </>
  );
}
