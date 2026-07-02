import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { img, u } from "@/lib/images";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-14 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
      <span className="h-px w-6 bg-terracotta" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  desc,
  center = false,
  titleAs = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  desc?: string;
  center?: boolean;
  titleAs?: "h1" | "h2";
}) {
  const Title = titleAs;
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Title className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{title}</Title>
      {desc && <p className="mt-4 text-base leading-relaxed text-muted">{desc}</p>}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "soft";
  external?: boolean;
  arrow?: boolean;
  className?: string;
};

const buttonStyles = {
  primary: { wrap: "bg-teal text-cream hover:bg-teal-dark shadow-sm", icon: "bg-teal-soft text-teal" },
  outline: {
    wrap: "border border-teal/40 text-teal hover:bg-teal hover:text-cream",
    icon: "bg-teal text-cream group-hover:bg-cream group-hover:text-teal",
  },
  soft: { wrap: "bg-peach text-ink hover:bg-terracotta hover:text-white", icon: "bg-teal text-cream" },
};

export function Button({
  href,
  children,
  variant = "primary",
  external,
  arrow = true,
  className = "",
}: ButtonProps) {
  const s = buttonStyles[variant];
  const cls = `group inline-flex items-center justify-center gap-3 rounded-pill py-2 pl-6 pr-2 text-sm font-semibold transition-all ${s.wrap} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5 ${s.icon}`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.url} className="flex items-center gap-1.5">
            {i < items.length - 1 ? (
              <>
                <Link href={it.url} className="hover:text-teal">{it.name}</Link>
                <span aria-hidden>/</span>
              </>
            ) : (
              <span className="text-ink/80">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CTABanner({
  title = (
    <>
      Hemen arayın ya da <em>ön görüşme</em> planlayın
    </>
  ),
}: {
  title?: React.ReactNode;
}) {
  return (
    <section className="bg-cream px-3 py-6 sm:px-4 sm:py-10">
      <div className="relative h-[26rem] w-full overflow-hidden rounded-[2rem] sm:h-[28rem]">
        <Image src={u(img.about, 1600)} alt="" fill sizes="100vw" className="object-cover" />
        {/* yumuşak krem geçişleri — metin okunurluğu + kenarlarda silikleşme */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cream/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-cream/60 to-transparent" />

        <div className="relative flex h-full items-center">
          <div className="max-w-lg px-6 sm:px-12 lg:px-16">
            <h2 className="text-3xl leading-tight text-ink sm:text-4xl">{title}</h2>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/iletisim">Randevu Al</Button>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-2.5 rounded-pill bg-cream/90 px-5 py-3 text-sm font-semibold text-ink shadow-sm backdrop-blur transition-colors hover:bg-cream"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-soft text-teal">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 4.5C2 3.7 2.7 3 3.5 3H6l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v2.5c0 .8-.7 1.5-1.5 1.5A14.5 14.5 0 0 1 2 4.5z" />
                  </svg>
                </span>
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
