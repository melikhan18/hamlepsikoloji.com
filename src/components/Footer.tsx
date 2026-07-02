import Link from "next/link";
import { site } from "@/lib/site";

const quickLinks = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "S.S.S.", href: "/sss" },
  { label: "Ekibimiz", href: "/ekibimiz" },
  { label: "Blog", href: "/blog" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "İletişim", href: "/iletisim" },
];

const arcs = [70, 108, 146, 184, 222];

export function Footer({ settings = site }: { settings?: typeof site }) {
  const year = 2026;
  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="overflow-hidden rounded-[2rem] bg-forest px-6 py-14 text-cream/75 sm:px-12 sm:py-16">
        {/* Üst: dekoratif kemerler + logo + isim + slogan */}
        <div className="relative mx-auto max-w-3xl pt-12 text-center">
          <svg
            viewBox="0 0 600 230"
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 w-[520px] max-w-full -translate-x-1/2"
          >
            {arcs.map((r, i) => (
              <path
                key={r}
                d={`M ${300 - r} 228 A ${r} ${r} 0 0 1 ${300 + r} 228`}
                fill="none"
                stroke="#f6f2ea"
                strokeWidth="10"
                opacity={0.13 - i * 0.022}
              />
            ))}
          </svg>

          <div className="relative flex flex-col items-center pt-4">
            <h2 className="font-serif text-3xl text-cream sm:text-4xl">
              Hamle <em>Psikoloji</em>
            </h2>
            <span className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-cream/55">
              Merkezi
            </span>
            <div className="mt-5 h-px w-full max-w-md bg-white/10" />
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/55 sm:text-xs">
              Erişilebilir, profesyonel ve şefkatli psikolojik destek.
            </p>
            <div className="mt-5 h-px w-full max-w-md bg-white/10" />
          </div>
        </div>

        {/* Orta: 3 sütun */}
        <div className="mx-auto mt-14 grid max-w-6xl gap-10 md:grid-cols-3">
          {/* İletişim */}
          <div>
            <h3 className="font-serif text-lg text-cream">İletişime geçin</h3>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li className="flex items-center gap-3">
                <Glyph d="M2 4.5C2 3.7 2.7 3 3.5 3H6l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v2.5c0 .8-.7 1.5-1.5 1.5A14.5 14.5 0 0 1 2 4.5z" />
                <a href={`tel:${settings.phone}`} className="transition-colors hover:text-cream">{settings.phoneDisplay}</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5"><Glyph d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" extra={<circle cx="12" cy="10" r="2.5" />} /></span>
                <span>{settings.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Glyph d="M3 6h18v12H3z" extra={<path d="M3 7l9 6 9-6" />} />
                <a href={`mailto:${settings.email}`} className="transition-colors hover:text-cream">{settings.email}</a>
              </li>
            </ul>
          </div>

          {/* CTA + sosyal */}
          <div className="flex flex-col items-center gap-7">
            <Link
              href="/iletisim"
              className="group inline-flex items-center gap-3 rounded-pill bg-teal-soft py-2 pl-6 pr-2 text-teal-dark transition-colors hover:bg-cream"
            >
              <span className="text-sm font-semibold">Randevu Al</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-cream transition-transform group-hover:translate-x-0.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
            <div className="flex gap-3">
              {settings.social.instagram && (
                <Social href={settings.social.instagram} label="Instagram">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
                  </svg>
                </Social>
              )}
              {settings.social.linkedin && (
                <Social href={settings.social.linkedin} label="LinkedIn">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M6.94 8.5H4V20h2.94V8.5zM5.47 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM20 13.6c0-2.9-1.55-4.25-3.62-4.25-1.67 0-2.42.92-2.84 1.57V8.5H10.6V20h2.94v-6.4c0-.34.02-.68.12-.92.27-.68.9-1.38 1.95-1.38 1.37 0 1.92 1.05 1.92 2.58V20H20v-6.4z" />
                  </svg>
                </Social>
              )}
            </div>
          </div>

          {/* Hızlı bağlantılar */}
          <div className="md:text-right">
            <h3 className="font-serif text-lg text-cream">Hızlı bağlantılar</h3>
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:justify-items-end">
              {quickLinks.map((l) => (
                <Link key={l.href} href={l.href} className="transition-colors hover:text-cream">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Alt satır */}
        <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{year} © {settings.legalName}. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <Link href="/kvkk" className="transition-colors hover:text-cream">KVKK</Link>
            <span aria-hidden>·</span>
            <Link href="/gizlilik" className="transition-colors hover:text-cream">Gizlilik</Link>
            <span aria-hidden>·</span>
            <Link href="/cerez-politikasi" className="transition-colors hover:text-cream">Çerez</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Glyph({ d, extra }: { d: string; extra?: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-teal-soft" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
      {extra}
    </svg>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream transition-colors hover:bg-white/20"
    >
      {children}
    </a>
  );
}
