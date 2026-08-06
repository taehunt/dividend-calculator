import { MetadataRoute } from "next";
import { readFileSync, statSync } from "fs";
import path from "path";
import { getSortedPostsData } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

function pulseLastModified(): Date {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "income-pulse.json"
    );
    const raw = readFileSync(filePath, "utf-8");
    const json = JSON.parse(raw) as { updatedAt?: string };
    if (json.updatedAt) return new Date(json.updatedAt);
  } catch {
    // fall through
  }
  return new Date();
}

function calculatorLastModified(segment: string): Date {
  try {
    return statSync(
      path.join(process.cwd(), "src", "app", segment, "page.tsx")
    ).mtime;
  } catch {
    return new Date();
  }
}

function latestPostDate(): Date {
  const posts = getSortedPostsData();
  if (!posts.length) return new Date();
  return new Date(posts[0].date);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pulseDate = pulseLastModified();
  const blogDate = latestPostDate();
  const homeDate =
    pulseDate > blogDate ? pulseDate : blogDate;

  const posts = getSortedPostsData().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const calculators: {
    segment: string;
    priority: number;
  }[] = [
    { segment: "fire", priority: 0.9 },
    { segment: "average", priority: 0.9 },
    { segment: "tax", priority: 0.9 },
    { segment: "compound", priority: 0.9 },
    { segment: "goal", priority: 0.9 },
    { segment: "cagr", priority: 0.9 },
    { segment: "inflation", priority: 0.9 },
    { segment: "tools", priority: 0.8 },
    { segment: "about", priority: 0.4 },
    { segment: "editorial-policy", priority: 0.4 },
    { segment: "contact", priority: 0.4 },
    { segment: "privacy", priority: 0.3 },
  ];

  return [
    {
      url: SITE_URL,
      lastModified: homeDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/pulse`,
      lastModified: pulseDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: blogDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...calculators.map((c) => ({
      url: `${SITE_URL}/${c.segment}`,
      lastModified: calculatorLastModified(c.segment),
      changeFrequency:
        c.segment === "privacy" ||
        c.segment === "about" ||
        c.segment === "contact"
          ? ("yearly" as const)
          : ("weekly" as const),
      priority: c.priority,
    })),
    ...posts,
  ];
}
