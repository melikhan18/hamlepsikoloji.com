import { site } from "./site";

// Site geneli kuruluş şeması (MedicalBusiness / Psychologist)
export function organizationSchema(s: typeof site = site) {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "Psychologist"],
    "@id": `${s.url}#organization`,
    name: s.name,
    legalName: s.legalName,
    url: s.url,
    description: s.description,
    ...(s.phone ? { telephone: s.phone } : {}),
    email: s.email,
    image: `${s.url}/icon.svg`,
    logo: {
      "@type": "ImageObject",
      url: `${s.url}/icon.svg`,
      width: 256,
      height: 256,
    },
    priceRange: "₺₺",
    currenciesAccepted: "TRY",
    ...(s.address.street ? { address: {
      "@type": "PostalAddress",
      streetAddress: s.address.street,
      addressLocality: s.address.district,
      addressRegion: s.address.city,
      postalCode: s.address.postalCode,
      addressCountry: s.address.country,
    }} : {}),
    ...(s.geo.lat && s.geo.lng ? { geo: {
      "@type": "GeoCoordinates",
      latitude: s.geo.lat,
      longitude: s.geo.lng,
    }} : {}),
    areaServed: [
      ...(s.areaServed ? [{ "@type": "AdministrativeArea", name: s.areaServed }] : []),
      { "@type": "City", name: s.address.city },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      ...(s.phone ? { telephone: s.phone } : {}),
      email: s.email,
      availableLanguage: ["Turkish"],
    },
    sameAs: [s.social.instagram, s.social.linkedin, s.social.youtube].filter(Boolean),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  };
}

// WebSite şeması — Organization ile birlikte kök için (JsonLd, layout).
export function websiteSchema(s: typeof site = site) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${s.url}#website`,
    name: s.name,
    url: s.url,
    inLanguage: "tr-TR",
    publisher: { "@id": `${s.url}#organization` },
  };
}

// Hizmet detay sayfaları için Service şeması.
export function serviceSchema(
  service: { title: string; slug: string; summary: string },
  s: typeof site = site,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${s.url}/hizmetler/${service.slug}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    url: `${s.url}/hizmetler/${service.slug}`,
    provider: { "@id": `${s.url}#organization` },
    areaServed: { "@type": "City", name: "İstanbul" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${s.url}/iletisim`,
      availableLanguage: ["Turkish"],
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.url}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
