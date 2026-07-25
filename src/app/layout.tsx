import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { getSettings } from "@/lib/cms";
import { site } from "@/lib/site";

const googleAdsId = "AW-11280098753";

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
  const { ga4Id, gtmId } = settings;

  return (
    <html lang="tr" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
          strategy="beforeInteractive"
        />
        <Script id="google-ads" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAdsId}');`}
        </Script>
      </head>
      <body className="flex min-h-screen flex-col">
        {/* Google Tag Manager (noscript) */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <JsonLd data={[organizationSchema(settings), websiteSchema(settings)]} />
        <Header whatsapp={settings.whatsapp} />
        <main className="flex-1 pt-[88px] lg:pt-[96px]">{children}</main>
        <Footer settings={settings} />
        <WhatsAppButton whatsapp={settings.whatsapp} />

        {/* Google Tag Manager */}
        {gtmId && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}

        {/* Google Analytics 4 */}
        {ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4Id}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
