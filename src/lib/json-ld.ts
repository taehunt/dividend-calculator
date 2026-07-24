import { SITE_URL } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YieldGrower",
    url: SITE_URL,
    email: "support@yieldgrower.com",
    description:
      "Free dividend, FIRE, and compound calculators plus a daily Income Pulse score.",
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "YieldGrower",
    url: SITE_URL,
    description:
      "Dividend reinvestment, FIRE, and income planning calculators with a daily Income Pulse.",
    publisher: {
      "@type": "Organization",
      name: "YieldGrower",
      url: SITE_URL,
    },
  };
}

export function webAppJsonLd(input: {
  name: string;
  path: string;
  description: string;
}) {
  const url =
    input.path === "/" ? SITE_URL : `${SITE_URL}${input.path}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: input.name,
    url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: input.description,
    provider: {
      "@type": "Organization",
      name: "YieldGrower",
      url: SITE_URL,
    },
  };
}
