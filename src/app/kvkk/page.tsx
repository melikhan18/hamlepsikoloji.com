import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getLegalDoc, getSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Hamle Psikoloji'de kişisel verileriniz 6698 sayılı KVKK kapsamında nasıl işlenir ve korunur? İşlenen veriler, işleme amaçları ve KVKK madde 11 kapsamındaki haklarınız hakkında aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
  robots: { index: true, follow: true },
};

export default async function Page() {
  const [doc, settings] = await Promise.all([getLegalDoc("kvkk"), getSettings()]);
  return <LegalPage title={doc.title} slug={doc.slug} intro={doc.intro} sections={doc.sections} contact={{ legalName: settings.legalName, email: settings.email, address: settings.address.full }} />;
}
