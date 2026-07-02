"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/data/posts";
import { u } from "@/lib/images";

const dateFmt = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" });

function readMinutes(post: Post) {
  const text =
    post.content.map((b) => `${b.p ?? ""} ${b.h2 ?? ""} ${b.ul?.join(" ") ?? ""}`).join(" ") +
    " " +
    post.excerpt;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 180));
}

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
    <svg viewBox="0 0 40 40" className="h-10 w-10 text-teal" aria-hidden="true">
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function NavBtn({ onClick, dir, label }: { onClick: () => void; dir: 1 | -1; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-teal text-cream transition-colors hover:bg-teal-dark"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir === 1 ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
      </svg>
    </button>
  );
}

export function FeaturedPosts({ posts }: { posts: Post[] }) {
  const [i, setI] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, startX: 0, dx: 0, width: 1, moved: false });
  const trackRef = useRef<HTMLDivElement>(null);
  const n = posts.length;
  if (!n) return null;
  const go = (d: number) => setI((prev) => (prev + d + n) % n);

  const onDown = (e: React.PointerEvent) => {
    if (n <= 1) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      dx: 0,
      width: trackRef.current?.offsetWidth || 1,
      moved: false,
    };
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.dx = dx;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    setDragX(dx);
  };
  const onUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    const { dx, width } = drag.current;
    const threshold = Math.max(40, width * 0.15);
    if (dx <= -threshold) go(1);
    else if (dx >= threshold) go(-1);
    setDragX(0);
  };
  // Sürükleme sonrası karta tıklayıp gezinmeyi engelle
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Kaydırmalı / sürüklenebilir şerit */}
      <div className="overflow-hidden rounded-[2rem] card-soft">
        <div
          ref={trackRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
          className={`flex ${
            n > 1 ? "cursor-grab touch-pan-y select-none active:cursor-grabbing" : ""
          } ${dragging ? "" : "transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"}`}
          style={{ transform: `translateX(calc(-${i * 100}% + ${dragX}px))` }}
        >
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              draggable={false}
              className="group grid w-full shrink-0 bg-white md:grid-cols-2"
            >
              {/* Sol panel */}
              <div className="flex flex-col items-center justify-center px-8 py-12 text-center sm:px-12 sm:py-16">
                <Starburst />
                <time className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  {dateFmt.format(new Date(post.date)).toLocaleUpperCase("tr-TR")}
                </time>
                <h3 className="mt-3 font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-teal sm:text-3xl">
                  {post.title}
                </h3>
                <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-teal" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 6.5C10.5 5.3 8.3 5 6 5 4.9 5 4 5.9 4 7v10c0 1.1.9 2 2 2 2.3 0 4.5.3 6 1.5 1.5-1.2 3.7-1.5 6-1.5 1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2-2.3 0-4.5.3-6 1.5z" />
                    <path d="M12 6.5V20.5" />
                  </svg>
                  Okuma: {readMinutes(post)} dk
                </p>
              </div>

              {/* Sağ görsel */}
              <div className="relative min-h-[18rem] md:min-h-[26rem]">
                <Image
                  src={u(post.cover, 800)}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
                <div className="absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-white to-transparent md:block" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {n > 1 && (
        <div className="mt-8 flex items-center justify-center gap-5">
          <NavBtn onClick={() => go(-1)} dir={-1} label="Önceki" />
          <span className="text-sm tracking-wide text-muted">
            {i + 1} / {n}
          </span>
          <NavBtn onClick={() => go(1)} dir={1} label="Sonraki" />
        </div>
      )}
    </div>
  );
}
