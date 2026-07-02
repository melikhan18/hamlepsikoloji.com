import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description:
    "Hamle Psikoloji web sitesinde hangi çerezleri neden kullanıyoruz? Zorunlu ve analitik çerezler, çerezlerin işlevi ve tarayıcınızdan çerez tercihlerini yönetme hakkında bilgi.",
  alternates: { canonical: "/cerez-politikasi" },
};

export default function Page() {
  return (
    <LegalPage
      title="Çerez Politikası"
      slug="cerez-politikasi"
      intro="Web sitemiz, deneyiminizi iyileştirmek ve site kullanımını analiz etmek için çerezler kullanabilir."
      sections={[
        { h: "Çerez nedir?", p: "Çerezler, ziyaret ettiğiniz sitelerin cihazınıza kaydettiği küçük metin dosyalarıdır." },
        { h: "Kullandığımız çerezler", p: "Zorunlu çerezler sitenin çalışması için gereklidir; analitik çerezler ise ziyaretçi davranışını anonim olarak ölçmemize yardımcı olur." },
        { h: "Çerez tercihleri", p: "Tarayıcı ayarlarınızdan çerezleri her zaman yönetebilir veya silebilirsiniz." },
      ]}
    />
  );
}
