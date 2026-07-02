"use client";

import { useRef } from "react";
import { testimonials } from "@/data/home";

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, scroll: 0 });

  const onDown = (e: React.PointerEvent) => {
    // Yalnızca fare için sürükleme; dokunmatikte native (parmakla) kaydırma çalışsın.
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, scroll: el.scrollLeft };
  };
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.scroll - (e.clientX - drag.current.startX);
  };
  const onUp = () => {
    drag.current.down = false;
  };

  const scrollByDir = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : 300;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const Arrow = ({ dir }: { dir: 1 | -1 }) => (
    <button
      type="button"
      onClick={() => scrollByDir(dir)}
      aria-label={dir === 1 ? "Sonraki" : "Önceki"}
      className={`absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-teal/90 text-cream shadow-lg backdrop-blur transition-colors hover:bg-teal sm:flex ${
        dir === 1 ? "right-3 lg:right-6" : "left-3 lg:left-6"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir === 1 ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
      </svg>
    </button>
  );

  return (
    <div className="relative">
      <Arrow dir={-1} />
      <Arrow dir={1} />

      <div
        ref={ref}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        className="carousel-edge no-scrollbar flex cursor-grab select-none snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 active:cursor-grabbing"
      >
        {testimonials.map((t) => (
          <figure
            key={t.name + t.role}
            data-card
            className="flex w-[19rem] shrink-0 snap-start flex-col rounded-[1.75rem] bg-white/80 p-8 ring-1 ring-line/60 backdrop-blur-sm sm:w-[21rem]"
          >
            <div className="text-center">
              <span className="font-serif text-5xl leading-none text-teal/80">“</span>
              <h3 className="mt-1 font-serif text-lg text-ink">
                {t.name} <span className="text-muted">–</span> {t.role}
              </h3>
              <div className="mx-auto mt-4 h-px w-full max-w-[12rem] bg-line" />
            </div>
            <blockquote className="mt-6 text-[0.95rem] leading-relaxed text-ink/80">{t.quote}</blockquote>
          </figure>
        ))}
      </div>
    </div>
  );
}
