import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Hamle Psikoloji'de kişisel verileriniz 6698 sayılı KVKK kapsamında nasıl işlenir ve korunur? İşlenen veriler, işleme amaçları ve KVKK madde 11 kapsamındaki haklarınız hakkında aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage
      title="KVKK Aydınlatma Metni"
      slug="kvkk"
      intro="6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, veri sorumlusu sıfatıyla kişisel verilerinizin işlenmesine ilişkin sizi bilgilendirmek isteriz."
      sections={[
        { h: "İşlenen veriler", p: "Ad-soyad, iletişim bilgileri ve randevu talebinizle paylaştığınız bilgiler, yalnızca hizmet sunumu amacıyla işlenir." },
        { h: "İşleme amaçları", p: "Verileriniz; randevu oluşturma, iletişim kurma ve hizmetin yürütülmesi amaçlarıyla işlenir." },
        { h: "Haklarınız", p: "KVKK madde 11 kapsamında verilerinize erişme, düzeltme, silme ve işlenmesine itiraz etme haklarına sahipsiniz." },
      ]}
    />
  );
}
