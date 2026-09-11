import type { RelatedTool } from "@/lib/related-tools";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "돈결",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description:
      "돈을 대하는 방식을 16가지 유형으로 살펴보는 비임상적 자기이해 서비스.",
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "돈결",
    url: SITE_URL,
    description:
      "20개의 생활 속 선택으로 돈의 목적, 관리 방식, 관계 기준과 시간 관점을 살펴보는 자기이해 서비스.",
    publisher: {
      "@type": "Organization",
      name: "돈결",
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

export function articleJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  category?: string;
  tags?: string[];
}) {
  const url = `${SITE_URL}/blog/${input.slug}`;
  const datePublished = input.date.includes("T")
    ? input.date
    : `${input.date}T00:00:00.000Z`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished,
    dateModified: input.updated
      ? input.updated.includes("T")
        ? input.updated
        : `${input.updated}T00:00:00.000Z`
      : datePublished,
    articleSection: input.category,
    keywords: input.tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Organization",
      name: "YieldGrower Editorial",
      url: `${SITE_URL}/editorial-policy`,
    },
    publisher: {
      "@type": "Organization",
      name: "YieldGrower",
      url: SITE_URL,
    },
    url,
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

export function blogIndexJsonLd(
  posts: { slug: string; title: string; date: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "YieldGrower Investment Blog",
    description:
      "Articles on dividend investing, DRIP, compound interest, and financial independence.",
    url: `${SITE_URL}/blog`,
    isPartOf: {
      "@type": "WebSite",
      name: "YieldGrower",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
        datePublished: post.date.includes("T")
          ? post.date
          : `${post.date}T00:00:00.000Z`,
      })),
    },
  };
}

export function toolsIndexJsonLd(tools: RelatedTool[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "YieldGrower Investment Tools",
    description:
      "Free dividend, FIRE, compound, tax, and income planning calculators.",
    url: `${SITE_URL}/tools`,
    isPartOf: {
      "@type": "WebSite",
      name: "YieldGrower",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: tool.href === "/" ? SITE_URL : `${SITE_URL}${tool.href}`,
        name: tool.title.en,
        description: tool.desc.en,
      })),
    },
  };
}
