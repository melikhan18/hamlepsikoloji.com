"use client";

import { useRef } from "react";
import { PostCard } from "./Cards";
import type { Post } from "@/data/posts";

export function PostCarousel({ posts }: { posts: Post[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, scroll: 0, moved: false });

  const onDown = (e: React.PointerEvent) => {
    // Yalnızca fare için sürükleme; dokunmatikte native (parmakla) kaydırma çalışsın.
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, scroll: el.scrollLeft, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.scroll - dx;
  };
  const onUp = () => {
    drag.current.down = false;
  };
  // Sürükleme sonrası karta tıklayıp gezinmeyi engelle
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={ref}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      onClickCapture={onClickCapture}
      onDragStart={(e) => e.preventDefault()}
      className="carousel-edge no-scrollbar flex cursor-grab select-none snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-3 active:cursor-grabbing"
    >
      {posts.map((p) => (
        <div key={p.slug} className="w-[18rem] shrink-0 snap-start select-none sm:w-[20rem]">
          <PostCard post={p} />
        </div>
      ))}
    </div>
  );
}
