import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { getSettings } from "@/lib/cms";
import { site } from "@/lib/site";
import { ConsentManager } from "@/components/ConsentManager";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans-src",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-serif-src",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const keywords = (s.keywords || "").split(",").map((k) => k.trim()).filter(Boolean);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: s.seoTitle,
      template: `%s | ${site.name}`,
    },
    description: s.description,
    applicationName: site.name,
    keywords,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: site.url,
      siteName: site.name,
      title: s.seoTitle,
      description: s.description,
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description: s.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    manifest: "/manifest.webmanifest",
    verification: s.googleVerification ? { google: s.googleVerification } : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: "#352a44",
  colorScheme: "light",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const { ga4Id, gtmId, googleAdsId } = settings;

  return (
    <html lang="tr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={[organizationSchema(settings), websiteSchema(settings)]} />
        <Header whatsapp={settings.whatsapp} />
        <main className="flex-1 pt-[88px] lg:pt-[96px]">{children}</main>
        <Footer settings={settings} />
        <WhatsAppButton whatsapp={settings.whatsapp} />
        <ConsentManager googleAdsId={googleAdsId} ga4Id={ga4Id} gtmId={gtmId} />
      </body>
    </html>
  );
}
