import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Hamle Psikoloji'de gizliliğiniz nasıl korunur? Web sitemizi kullanırken toplanan bilgiler, bunların kullanımı, analitik çerezler ve terapi görüşmelerinin gizliliği hakkında detaylı politika.",
  alternates: { canonical: "/gizlilik" },
};

export default function Page() {
  return (
    <LegalPage
      title="Gizlilik Politikası"
      slug="gizlilik"
      intro="Bu gizlilik politikası, web sitemizi kullanırken bilgilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar."
      sections={[
        { h: "Toplanan bilgiler", p: "İletişim formu aracılığıyla paylaştığınız bilgiler ve site kullanımına ilişkin anonim analitik veriler toplanabilir." },
        { h: "Bilgilerin kullanımı", p: "Bilgileriniz yalnızca size hizmet sunmak, taleplerinizi yanıtlamak ve siteyi iyileştirmek için kullanılır; üçüncü taraflarla pazarlama amacıyla paylaşılmaz." },
        { h: "Görüşme gizliliği", p: "Terapi görüşmelerinizin içeriği meslek etiği ve gizlilik ilkeleri kapsamında korunur." },
      ]}
    />
  );
}
