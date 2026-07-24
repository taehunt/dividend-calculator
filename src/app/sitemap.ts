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

function fileLastModified(relativePath: string): Date {
  try {
    return statSync(path.join(process.cwd(), relativePath)).mtime;
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
    path: string;
    file: string;
    priority: number;
  }[] = [
    { path: "/fire", file: "src/app/fire/page.tsx", priority: 0.9 },
    { path: "/average", file: "src/app/average/page.tsx", priority: 0.9 },
    { path: "/tax", file: "src/app/tax/page.tsx", priority: 0.9 },
    { path: "/compound", file: "src/app/compound/page.tsx", priority: 0.9 },
    { path: "/goal", file: "src/app/goal/page.tsx", priority: 0.9 },
    { path: "/cagr", file: "src/app/cagr/page.tsx", priority: 0.9 },
    { path: "/inflation", file: "src/app/inflation/page.tsx", priority: 0.9 },
    { path: "/tools", file: "src/app/tools/page.tsx", priority: 0.8 },
    { path: "/privacy", file: "src/app/privacy/page.tsx", priority: 0.3 },
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
    {
      url: `${SITE_URL}/feed.xml`,
      lastModified: blogDate,
      changeFrequency: "daily",
      priority: 0.5,
    },
    ...calculators.map((c) => ({
      url: `${SITE_URL}${c.path}`,
      lastModified: fileLastModified(c.file),
      changeFrequency:
        c.path === "/privacy"
          ? ("yearly" as const)
          : ("weekly" as const),
      priority: c.priority,
    })),
    ...posts,
  ];
}
