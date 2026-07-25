import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getLegalDoc, getSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description:
    "Hamle Psikoloji web sitesinde hangi çerezleri neden kullanıyoruz? Zorunlu ve analitik çerezler, çerezlerin işlevi ve tarayıcınızdan çerez tercihlerini yönetme hakkında bilgi.",
  alternates: { canonical: "/cerez-politikasi" },
};

export default async function Page() {
  const [doc, settings] = await Promise.all([getLegalDoc("cerez-politikasi"), getSettings()]);
  return <LegalPage title={doc.title} slug={doc.slug} intro={doc.intro} sections={doc.sections} contact={{ legalName: settings.legalName, email: settings.email, address: settings.address.full }} />;
}
