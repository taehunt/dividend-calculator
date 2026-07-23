import { getSortedPostsData } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildBlogRssXml(): string {
  const posts = getSortedPostsData();
  const lastBuild = posts[0]?.date
    ? new Date(`${posts[0].date}T00:00:00.000Z`).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(`${post.date}T00:00:00.000Z`).toUTCString();
      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(link)}</link>`,
        `<guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `<pubDate>${pubDate}</pubDate>`,
        `<description>${escapeXml(post.excerpt || post.title)}</description>`,
        "</item>",
      ].join("");
    })
    .join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    "<title>YieldGrower Blog</title>",
    `<link>${SITE_URL}/blog</link>`,
    "<description>Daily insights on dividend investing, DRIP, compound interest, and financial independence.</description>",
    "<language>en</language>",
    `<lastBuildDate>${lastBuild}</lastBuildDate>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");
}
