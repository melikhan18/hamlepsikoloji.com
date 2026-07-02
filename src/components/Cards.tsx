import Link from "next/link";
import Image from "next/image";
import { Avatar } from "./Avatar";
import { Illustration } from "./Illustrations";
import type { Service } from "@/data/services";
import type { Expert } from "@/data/team";
import type { Post } from "@/data/posts";
import { u } from "@/lib/images";

export function ServiceCard({ service }: { service: Service }) {
  const words = service.title.split(" ");
  const em = words.pop();
  const pre = words.join(" ");
  return (
    <div className="group flex flex-col items-center gap-6 rounded-3xl bg-white p-7 text-center transition-all hover:-translate-y-1 card-soft sm:p-8 lg:flex-row lg:items-center lg:gap-8 lg:text-left">
      <div className="flex h-40 w-44 shrink-0 items-center justify-center lg:h-44 lg:w-48">
        <Illustration name={service.illo} className="h-full w-full" />
      </div>

      <div className="flex-1">
        <h3 className="text-2xl leading-snug text-ink">
          {pre} <em>{em}</em>
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">{service.pitch}</p>

        <ul className="mt-3.5 space-y-1.5 text-sm text-ink/80">
          {service.forWho.slice(0, 3).map((b) => (
            <li key={b}>
              <span className="text-terracotta">•</span> {b}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center lg:justify-start">
          <Link
            href={`/hizmetler/${service.slug}`}
            className="inline-flex items-center gap-3 rounded-pill bg-teal py-2 pl-6 pr-2 text-cream transition-colors hover:bg-teal-dark"
          >
            <span className="text-sm font-semibold">Detaylı bilgi</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-soft text-teal transition-transform group-hover:translate-x-0.5">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Link href={`/ekibimiz/${expert.slug}`} className="group block w-full text-center">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl [mask-image:linear-gradient(to_top,transparent_0%,#000_30%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,#000_30%)]">
        <Avatar
          expert={expert}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 360px"
        />
      </div>
      <h3 className="mt-5 font-serif text-xl text-ink transition-colors group-hover:text-teal">{expert.name}</h3>
      <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{expert.title}</p>
    </Link>
  );
}

// Ana sayfa için editöryel, alternatif yerleşimli uzman kartı
export function FeaturedExpertCard({ expert, reverse = false }: { expert: Expert; reverse?: boolean }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[2rem] bg-white card-soft md:flex-row md:items-stretch">
      {/* Foto */}
      <div className={`relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] md:aspect-auto md:w-2/5 ${reverse ? "md:order-last" : ""}`}>
        <Avatar
          expert={expert}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 420px"
        />
        <span className="absolute left-4 top-4 rounded-full bg-cream/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal-dark backdrop-blur">
          {expert.title}
        </span>
      </div>

      {/* İçerik */}
      <div className="flex flex-1 flex-col p-8 sm:p-10">
        <h3 className="font-serif text-2xl text-ink sm:text-3xl">{expert.name}</h3>
        <p className="mt-1 text-sm font-medium text-teal">{expert.credentials}</p>

        <p className="mt-5 border-l-2 border-terracotta/50 pl-4 font-serif text-lg italic leading-relaxed text-ink/80">
          “{expert.approach}”
        </p>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">Çalışma alanları</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {expert.specialties.slice(0, 4).map((s) => (
            <li key={s} className="rounded-full bg-teal-soft px-3 py-1 text-xs text-teal-dark">
              {s}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs text-muted">
          Yöntemler: <span className="text-ink/70">{expert.methods.join(" · ")}</span>
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
          <Link
            href="/iletisim"
            className="group/btn inline-flex items-center gap-3 rounded-pill bg-teal py-2 pl-6 pr-2 text-cream transition-colors hover:bg-teal-dark"
          >
            <span className="text-sm font-semibold">Randevu al</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-soft text-teal transition-transform group-hover/btn:translate-x-0.5">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
          <Link href={`/ekibimiz/${expert.slug}`} className="text-sm font-semibold text-teal hover:underline">
            Profili görüntüle →
          </Link>
        </div>
      </div>
    </article>
  );
}

const dateFmt = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" });

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block w-full text-center">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
        <Image
          src={u(post.cover, 600)}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, 360px"
          className="object-cover transition-transform duration-500 group-hover:scale-105 [mask-image:linear-gradient(to_top,transparent_0%,#000_34%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,#000_34%)]"
        />
        {/* hover'da beliren sabit kitap ikonu */}
        <span className="absolute bottom-6 left-1/2 flex -translate-x-1/2 translate-y-2 items-center justify-center text-teal opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 6.5C10.5 5.3 8.3 5 6 5 4.9 5 4 5.9 4 7v10c0 1.1.9 2 2 2 2.3 0 4.5.3 6 1.5 1.5-1.2 3.7-1.5 6-1.5 1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2-2.3 0-4.5.3-6 1.5z" />
            <path d="M12 6.5V20.5" />
          </svg>
        </span>
      </div>
      <time dateTime={post.date} className="mt-5 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {dateFmt.format(new Date(post.date)).toLocaleUpperCase("tr-TR")}
      </time>
      <h3 className="mx-auto mt-2 max-w-xs font-serif text-xl leading-snug text-ink transition-colors group-hover:text-teal">
        {post.title}
      </h3>
    </Link>
  );
}
