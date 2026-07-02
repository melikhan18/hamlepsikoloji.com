import Image from "next/image";
import Link from "next/link";
import { Container, Button, Eyebrow } from "@/components/ui";
import { ServiceCard, FeaturedExpertCard } from "@/components/Cards";
import { PostCarousel } from "@/components/PostCarousel";
import { Illustration } from "@/components/Illustrations";
import { Testimonials } from "@/components/Testimonials";
import { getPosts, getServices, getExperts } from "@/lib/cms";
import { benefits, focusGroups, expectations, aboutIntro, aboutAccordion } from "@/data/home";
import { Icon } from "@/components/Icon";
import { Accordion } from "@/components/Accordion";
import { img, u } from "@/lib/images";

export default async function HomePage() {
  const recentPosts = (await getPosts()).slice(0, 8);
  const services = await getServices();
  const team = await getExperts();
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative -mt-[88px] min-h-screen overflow-hidden bg-cream pt-[88px] lg:-mt-[96px] lg:pt-[96px]">
        {/* Tam-bleed görsel — mobilde tüm arka plan, masaüstünde sağ yarı */}
        <div className="pointer-events-none absolute inset-0 lg:left-auto lg:right-0 lg:w-[55%]">
          <Image
            src={u(img.heroMain, 1600)}
            alt="Hamle Psikoloji — uzman psikolojik danışmanlık"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          {/* mobil: dikey krem örtü (metin okunurluğu) */}
          <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/85 to-cream/10 lg:hidden" />
          {/* masaüstü: yatay krem geçişi */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-cream via-cream/35 to-transparent lg:block" />
          <div className="absolute inset-x-0 bottom-0 hidden h-28 bg-gradient-to-t from-cream to-transparent lg:block" />
          <div className="absolute inset-x-0 top-0 hidden h-20 bg-gradient-to-b from-cream/70 to-transparent lg:block" />
        </div>

        <Container className="relative">
          <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-xl flex-col justify-center text-center lg:mx-0 lg:min-h-[calc(100vh-96px)] lg:w-[46%]">
            <p className="font-serif text-2xl text-ink sm:text-[1.7rem]">
              İstanbul'da uzman psikoloji <em>merkeziniz.</em>
            </p>

            <div className="mx-auto mt-5 flex items-center gap-4">
              <span className="h-px w-10 bg-ink/25" />
              <span className="text-sm text-muted">
                <strong className="font-semibold text-ink">Online</strong> ve{" "}
                <strong className="font-semibold text-ink">yüz yüze</strong> görüşmeler.
              </span>
              <span className="h-px w-10 bg-ink/25" />
            </div>

            <h1 className="h-display mt-5 text-ink">
              Bu adımı <em>yalnız</em> atmayın.
            </h1>

            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted">
              Kaygı, travma ve ilişkilerde lisanslı uzmanlardan güvenli ve gizli destek.
            </p>

            <div className="mt-9 flex justify-center">
              <Link
                href="/iletisim"
                className="group inline-flex items-center gap-3 rounded-pill bg-teal py-2 pl-7 pr-2 text-cream transition-colors hover:bg-teal-dark"
              >
                <span className="text-sm font-semibold">Ücretsiz Ön Görüşme</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-teal transition-transform group-hover:translate-x-0.5">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== KAZANIMLAR ===== */}
      <section className="bg-cream">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl text-ink sm:text-4xl">
              Terapiyle neyi <em>değiştirebilirsiniz?</em>
            </h2>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Zaman içinde bir uzman, hayatınızı dönüştürebilir.
            </p>
          </div>
          <div className="mt-14 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
            {benefits.map((b) => (
              <div key={b.em} className="px-6 text-center">
                <div className="mx-auto flex h-32 w-32 items-center justify-center">
                  <Illustration name={b.illo} />
                </div>
                <h3 className="mt-4 text-xl text-ink">
                  {b.pre} <em>{b.em}</em>
                </h3>
                <p className="mx-auto mt-3 max-w-[15rem] text-sm leading-relaxed text-muted">{b.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== HİZMETLER ===== */}
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-ink sm:text-4xl">
            Size nasıl <em>destek</em> oluruz
          </h2>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            İhtiyacınıza özel, kapsayıcı bir destek.
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/hizmetler" variant="outline">Tüm hizmetler</Button>
        </div>
      </Container>

      {/* ===== ÇALIŞILAN ALANLAR ===== */}
      <section className="bg-cream px-3 py-6 sm:px-4 sm:py-10">
        <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[2.5rem] bg-forest text-cream">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-light/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-terracotta/10 blur-3xl" />
          <div className="relative grid gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:px-14">
          {/* Sol: başlık */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Çalıştığımız alanlar</Eyebrow>
            <h2 className="mt-4 text-3xl text-cream sm:text-4xl">
              Birlikte üzerinde <em>çalışabileceğimiz</em> konular
            </h2>
            <p className="mt-5 leading-relaxed text-cream/70">
              Aşağıdaki başlıklardan biri size tanıdık geliyorsa, yalnız değilsiniz. Doğru destekle
              her biri üzerinde çalışmak mümkün.
            </p>
            <div className="mt-8">
              <Button href="/iletisim" variant="soft">Size uygun mu, konuşalım</Button>
            </div>
          </div>

          {/* Sağ: temalı kategori kartları */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {focusGroups.map((g) => (
              <div
                key={g.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/20 hover:bg-white/[0.08]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-soft text-teal">
                    <Icon name={g.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="text-base font-semibold text-cream">{g.title}</h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-center gap-2.5 text-sm text-cream/75">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* ===== HAKKIMIZDA ===== */}
      <section className="relative bg-cream">
        <div className="lg:grid lg:grid-cols-2 lg:items-start">
          {/* Sol: görsel — sabit yükseklik + sticky → akordeon açılınca oynamaz */}
          <div className="relative h-72 w-full overflow-hidden sm:h-96 lg:sticky lg:top-0 lg:h-screen">
            <Image
              src={u(img.about, 1400)}
              alt="Hamle Psikoloji — güvenli ve sıcak danışmanlık ortamı"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* içerikle yumuşak harman */}
            <div className="absolute inset-y-0 right-0 hidden w-28 bg-gradient-to-l from-cream to-transparent lg:block" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream to-transparent lg:hidden" />
          </div>

          {/* Sağ: içerik */}
          <div className="px-5 py-16 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
            <div className="mx-auto max-w-xl lg:mx-0">
              <Eyebrow>Biz kimiz?</Eyebrow>
              <h2 className="mt-4 text-3xl text-ink sm:text-4xl">
                İyi oluşa giden yolda <em>yanınızda</em>
              </h2>
              {aboutIntro.map((p, i) => (
                <p key={i} className={`leading-relaxed text-muted ${i === 0 ? "mt-5" : "mt-4"}`}>
                  {p}
                </p>
              ))}

              <div className="mt-8">
                <Accordion items={aboutAccordion} />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link
                  href="/hakkimizda"
                  className="group inline-flex items-center gap-3 rounded-pill bg-teal py-2 pl-6 pr-2 text-cream transition-colors hover:bg-teal-dark"
                >
                  <span className="text-sm font-semibold">Yaklaşımımızı keşfedin</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-soft text-teal transition-transform group-hover:translate-x-0.5">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
                <Link href="/ekibimiz" className="group inline-flex items-center gap-2.5 text-sm font-semibold text-ink">
                  Uzmanlarımızla tanışın
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal text-cream transition-transform group-hover:translate-x-0.5">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SÜREÇ ===== */}
      <section className="bg-cream">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl text-ink sm:text-4xl">
              Dört adımda <em>terapi</em> süreci
            </h2>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Sade ve şeffaf; ilk temastan kalıcı değişime.
            </p>
          </div>
          <div className="mt-14 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
            {expectations.map((s) => (
              <div key={s.n} className="px-6 text-center">
                <div className="mx-auto flex h-32 w-32 items-center justify-center">
                  <Illustration name={s.illo} className="h-full w-full" />
                </div>
                <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
                  Adım {s.n}
                </span>
                <h3 className="mt-1 text-xl text-ink">
                  {s.pre} <em>{s.em}</em>
                </h3>
                <p className="mx-auto mt-3 max-w-[15rem] text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== EKİP ===== */}
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-ink sm:text-4xl">
            Sizi dinleyecek <em>uzmanlar</em>
          </h2>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Doğru uzmanla başlamak, iyileşmenin ilk adımı.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-6xl gap-8">
          {team.map((e, i) => (
            <FeaturedExpertCard key={e.slug} expert={e} reverse={i % 2 === 1} />
          ))}
        </div>
      </Container>

      {/* ===== DANIŞAN HİKAYELERİ ===== */}
      <section className="bg-cream py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl text-ink sm:text-4xl">
              Danışanlarımız <em>anlatıyor</em>
            </h2>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Dönüşüm hikâyeleri.
            </p>
          </div>
        </Container>
        {/* tam genişlik carousel */}
        <div className="mt-14">
          <Testimonials />
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl text-ink sm:text-4xl">
              Psikoloji üzerine <em>yazılar</em>
            </h2>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Ruh sağlığı ve ilişkiler üzerine güncel içerikler.
            </p>
          </div>
        </Container>
        {/* yan yana, sürüklenebilir şerit */}
        <div className="mt-14">
          <PostCarousel posts={recentPosts} />
        </div>
        <Container>
          <div className="mt-12 flex justify-center">
            <Button href="/blog" variant="outline">Tüm yazılar</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
