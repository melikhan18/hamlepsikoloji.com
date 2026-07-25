"use client";

import { useState } from "react";
import { PostCard } from "./Cards";
import type { Post } from "@/data/posts";

function Pill({ value, active, onSelect }: { value: string; active: string; onSelect: (value: string) => void }) {
  const on = active === value;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        on ? "bg-teal text-cream" : "bg-white text-ink/80 card-soft hover:text-teal"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-peach" : "bg-terracotta"}`} />
      {value}
    </button>
  );
}

export function BlogExplorer({ posts }: { posts: Post[] }) {
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  const [active, setActive] = useState("Tümü");
  const shown = active === "Tümü" ? categories : [active];

  return (
    <div>
      {/* Filtre pill'leri */}
      <div className="flex flex-wrap gap-3">
        <Pill value="Tümü" active={active} onSelect={setActive} />
        {categories.map((c) => (
          <Pill key={c} value={c} active={active} onSelect={setActive} />
        ))}
      </div>

      {/* Kategoriye göre gruplar */}
      <div className="mt-12 space-y-16">
        {shown.map((cat) => {
          const items = posts.filter((p) => p.category === cat);
          return (
            <section key={cat}>
              <h2 className="border-b border-line pb-4 font-serif text-2xl text-ink sm:text-3xl">{cat}</h2>
              <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
