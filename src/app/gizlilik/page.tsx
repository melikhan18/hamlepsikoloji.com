import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getLegalDoc } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Hamle Psikoloji'de gizliliğiniz nasıl korunur? Web sitemizi kullanırken toplanan bilgiler, bunların kullanımı, analitik çerezler ve terapi görüşmelerinin gizliliği hakkında detaylı politika.",
  alternates: { canonical: "/gizlilik" },
};

export default async function Page() {
  const doc = await getLegalDoc("gizlilik");
  return <LegalPage title={doc.title} slug={doc.slug} intro={doc.intro} sections={doc.sections} />;
}
