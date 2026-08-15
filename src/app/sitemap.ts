import { MetadataRoute } from "next";
import { readFileSync } from "fs";
import path from "path";
import { getSortedPostsData } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

const CONTENT_REVIEW_DATE = new Date("2026-08-16T00:00:00+09:00");

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

function latestPostDate(): Date | null {
  const posts = getSortedPostsData();
  if (!posts.length) return null;
  return posts.reduce((latest, post) => {
    const modified = new Date(post.updated || post.date);
    return modified > latest ? modified : latest;
  }, new Date(posts[0].updated || posts[0].date));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pulseDate = pulseLastModified();
  const blogDate = latestPostDate();
  const homeDate =
    pulseDate > CONTENT_REVIEW_DATE ? pulseDate : CONTENT_REVIEW_DATE;

  const posts = getSortedPostsData().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated || post.date),
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
    ...(blogDate
      ? [{
          url: `${SITE_URL}/blog`,
          lastModified: blogDate,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }]
      : []),
    ...calculators.map((c) => ({
      url: `${SITE_URL}/${c.segment}`,
      lastModified: CONTENT_REVIEW_DATE,
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
