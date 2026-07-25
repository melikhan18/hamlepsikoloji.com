import type { Metadata } from "next";
import Image from "next/image";
import { Container, SectionHeading, Breadcrumbs, CTABanner, Button } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getServices, getSiteImages } from "@/lib/cms";
import { u } from "@/lib/images";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Hamle Psikoloji; İstanbul'da bireysel, çift, aile ve çocuk-ergen alanlarında uzman psikologlarla güvenli ve gizli danışmanlık sunan bir psikoloji merkezidir.",
  alternates: { canonical: "/hakkimizda" },
};

const principles = [
  { title: "İnsan odaklılık", desc: "Her danışanı yargılamadan, kendi hikâyesiyle birlikte ele alırız." },
  { title: "Bilimsellik", desc: "Kanıta dayalı, etkinliği gösterilmiş terapi yöntemlerini kullanırız." },
  { title: "Gizlilik", desc: "Görüşmeler meslek etiği ve gizlilik ilkeleriyle korunur." },
  { title: "Erişilebilirlik", desc: "Yüz yüze ve online seçeneklerle desteği herkes için ulaşılabilir kılarız." },
];

const methods = [
  "Bilişsel Davranışçı Terapi (BDT)",
  "EMDR Terapisi",
  "Şema Terapi",
  "Oyun Terapisi",
  "Aile & Çift Danışmanlığı",
];

const values = [
  {
    title: "Size olan sözümüz",
    text: "İlk görüşmede ihtiyaçlarınızı ve beklentilerinizi anlamaya odaklanırız. Uygun çalışma alanına sahip bir uzmanla görüşebilmeniz için güncel uzmanlık ve randevu bilgilerini açıkça paylaşırız. Sürece ilişkin sorularınızı görüşme öncesinde iletebilirsiniz.",
  },
  {
    title: "Vizyonumuz",
    text: "Vizyonumuz; erişilebilir, şefkatli ve etkili psikolojik desteğin önde gelen sağlayıcısı olmaktır. Kanıta dayalı hizmetlerle desteğin önündeki engelleri kaldırmayı; kişiye özel ve düşünceli bir yaklaşımla bireyleri en yüksek potansiyellerine ulaştırmayı, dayanıklılık kazandırmayı ve günlük yaşamda denge, anlam ve neşeyi yeniden keşfettirmeyi hedefliyoruz.",
  },
  {
    title: "Misyonumuz",
    text: "Misyonumuz; istisnai ve erişilebilir terapiyle ruhsal dayanıklılığı güçlendirmek ve kişisel güçlenmeyi desteklemektir. Lisanslı ve şefkatli uzmanlarımız, yaşamın zorlukları boyunca istikrarlı bir rehberlik sunar; iç gücünüzle yeniden bağ kurmanıza ve netlik, amaç ve yenilenmiş bir neşeyle ileriye gitmenize yardımcı olur.",
  },
];

function Starburst() {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return { x1: 20 + Math.cos(a) * 5, y1: 20 + Math.sin(a) * 5, x2: 20 + Math.cos(a) * 17, y2: 20 + Math.sin(a) * 17 };
  });
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 text-white/90" aria-hidden="true">
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export default async function AboutPage() {
  const services = await getServices();
  const siteImg = await getSiteImages();
  return (
    <>
      <Container className="py-10">
        <Breadcrumbs items={[{ name: "Ana Sayfa", url: "/" }, { name: "Hakkımızda", url: "/hakkimizda" }]} />
      </Container>

      <section className="bg-gradient-to-b from-cream to-teal-soft/40">
      <Container className="pb-2 pt-2">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl text-ink sm:text-5xl">Hakkımızda</h1>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            İstanbul&apos;da psikolojik danışmanlık merkeziniz.
          </p>
        </div>
      </Container>

      {/* İki sütun: sol içerik + sağ görsel kartı */}
      <Container className="grid items-start gap-12 pb-16 pt-12 lg:grid-cols-2 lg:gap-20">
        {/* Sol */}
        <div>
          <h2 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
            Tanışın, <em>Hamle</em> Psikoloji
          </h2>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            Bütüncül ve kanıta dayalı psikolojik destek
          </p>

          <div className="mt-7 space-y-4 leading-relaxed text-muted">
            <p>
              Hamle Psikoloji, ruh sağlığına ulaşmanın ilk adımını kolaylaştırmak için kuruldu.
              İsmimizdeki “hamle”, kişinin kendi iyiliği için attığı o ilk, cesur adımı temsil eder.
            </p>
            <p>
              İstanbul&apos;daki merkezimizde ve online olarak; bireysel terapi, çift &amp; aile terapisi,
              çocuk &amp; ergen danışmanlığı alanlarında, alanında deneyimli ve lisanslı psikologlarla
              hizmet veriyoruz. Amacımız; her danışanın kendini güvende hissettiği, yargılanmadığı ve
              kalıcı değişim yaratabildiği bir alan oluşturmaktır.
            </p>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <h3 className="font-serif text-xl text-[#8a7563]">Çalışma alanlarımız</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-ink/85">
              {services.map((s) => (
                <li key={s.slug}>{s.title}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 border-t border-line pt-6">
            <h3 className="font-serif text-xl text-[#8a7563]">Yöntem ve yaklaşımımız</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-ink/85">
              {methods.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sağ: görsel kartı */}
        <div>
          <div className="relative mx-auto max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] [mask-image:linear-gradient(to_top,transparent_0%,#000_22%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,#000_22%)]">
              <Image
                src={u(siteImg.aboutTop, 1000)}
                alt="Hamle Psikoloji — danışmanlık ortamı"
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover"
              />
              <span className="absolute left-5 top-5">
                <Starburst />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-5 flex justify-center">
              <Button href="/iletisim">İlk Seansınızı Planlayın</Button>
            </div>
          </div>
        </div>
      </Container>
      </section>

      <section className="bg-cream">
        <Container className="py-16">
          <SectionHeading eyebrow="İlkelerimiz" title="Çalışma yaklaşımımız" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white p-6">
                <h3 className="text-base font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Sabit görsel + kayan metinler */}
      <section className="bg-cream">
        <Container className="grid items-start gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20">
          {/* Sol: sticky görsel — yazılardan kısa tutulur ki scroll'da sabit kalsın */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.5rem] lg:max-w-md">
              <Image
                src={u(siteImg.aboutSecond, 900)}
                alt="Birlikte — Hamle Psikoloji"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-5xl italic text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.35)] sm:text-6xl">
                  birlikte
                </span>
              </span>
            </div>
          </div>

          {/* Sağ: kayan metin blokları */}
          <div className="space-y-14">
            {values.map((v, i) => (
              <div key={v.title}>
                <h2 className="font-serif text-3xl text-ink sm:text-4xl">{v.title}</h2>
                <p className="mt-5 leading-relaxed text-muted">{v.text}</p>
                {i < values.length - 1 && <div className="mt-14 border-t border-line" />}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", url: "/" },
          { name: "Hakkımızda", url: "/hakkimizda" },
        ])}
      />
    </>
  );
}
