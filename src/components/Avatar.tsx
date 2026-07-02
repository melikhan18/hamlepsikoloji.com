import Image from "next/image";
import type { Expert } from "@/data/team";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

// Fotoğraf varsa next/image, yoksa baş harf placeholder'ı gösterir.
export function Avatar({
  expert,
  className = "h-full w-full",
  sizes = "(max-width: 768px) 100vw, 400px",
}: {
  expert: Expert;
  className?: string;
  sizes?: string;
}) {
  if (expert.photo && expert.photo.startsWith("http")) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={expert.photo}
          alt={`${expert.name} — ${expert.title}`}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center bg-teal-soft text-teal-dark ${className}`}
      aria-hidden="true"
    >
      <span className="font-serif text-2xl font-semibold sm:text-3xl">{initials(expert.name)}</span>
    </div>
  );
}
