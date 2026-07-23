import type { Metadata } from "next";

const SITE = "https://yieldgrower.com";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function pageMeta({
  title,
  description,
  path,
  keywords,
}: PageMetaInput): Metadata {
  const url = `${SITE}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "YieldGrower",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
