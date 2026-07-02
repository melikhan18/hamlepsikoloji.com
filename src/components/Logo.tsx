import { site } from "@/lib/site";

// Metin tabanlı wordmark logo. Grafik işaret kullanılmaz.
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`} aria-label={`${site.name}`}>
      <span className={`font-serif text-[1.4rem] font-medium tracking-tight ${light ? "text-cream" : "text-ink"}`}>
        {site.shortName}
        <span className="text-terracotta">.</span>
      </span>
      <span
        className={`mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.34em] ${
          light ? "text-cream/55" : "text-muted"
        }`}
      >
        Psikoloji
      </span>
    </span>
  );
}
