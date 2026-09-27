import type { MetadataRoute } from "next";
import { MONEY_TYPES } from "@/lib/money-personality";
import { SITE_URL } from "@/lib/site";
import { GUIDES } from "@/lib/guides";

const LAUNCH_DATE = new Date("2026-09-11T00:00:00+09:00");
const CONTENT_UPDATE_DATE = new Date("2026-09-28T00:00:00+09:00");

export default function sitemap(): MetadataRoute.Sitemap {
  const core = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/test", priority: 1, changeFrequency: "monthly" as const },
    { path: "/types", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/compatibility", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/daily", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/guides", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/methodology", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/about", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/editorial-policy", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  return [
    ...core.map((entry) => ({
      url: `${SITE_URL}${entry.path}`,
      lastModified: entry.path === "/privacy" || entry.path === "/contact" ? LAUNCH_DATE : CONTENT_UPDATE_DATE,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
    ...MONEY_TYPES.map((type) => ({
      url: `${SITE_URL}/result/${type.slug}`,
      lastModified: CONTENT_UPDATE_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...GUIDES.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      lastModified: CONTENT_UPDATE_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
