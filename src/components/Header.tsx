"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { nav, whatsappLink, site } from "@/lib/site";

export function Header({ whatsapp = site.whatsapp }: { whatsapp?: string }) {
  const waLink = whatsappLink(undefined, whatsapp);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Yüzen yuvarlak menü çubuğu */}
      <div className={`px-3 transition-all duration-300 ${scrolled ? "pt-2" : "pt-4"}`}>
        <div
          className={`mx-auto flex max-w-[96rem] items-center justify-between rounded-pill border px-4 py-2.5 pl-6 transition-all duration-300 ${
            scrolled
              ? "border-line bg-cream/90 shadow-lg backdrop-blur"
              : "border-transparent bg-cream/70 backdrop-blur-sm"
          }`}
        >
          <Link href="/" aria-label="Ana sayfa">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Ana menü">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors hover:text-teal ${
                  isActive(item.href) ? "font-semibold text-teal" : "text-ink/75"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill px-4 py-2.5 text-sm font-medium text-teal transition-colors hover:bg-teal-soft"
            >
              WhatsApp
            </a>
            <Link
              href="/iletisim"
              className="rounded-pill bg-teal px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-teal-dark"
            >
              Randevu Al
            </Link>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-teal text-cream lg:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      {open && (
        <div className="px-3 lg:hidden">
          <nav
            className="mx-auto mt-2 max-w-[96rem] rounded-3xl border border-line bg-cream p-3 shadow-lg"
            aria-label="Mobil menü"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-sm transition-colors ${
                  isActive(item.href) ? "bg-teal-soft font-semibold text-teal" : "text-ink/90 hover:bg-cream-dark"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 p-1">
              <Link
                href="/iletisim"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-pill bg-teal px-5 py-3 text-center text-sm font-semibold text-cream"
              >
                Randevu Al
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-pill border border-teal/30 px-5 py-3 text-center text-sm font-semibold text-teal"
              >
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
