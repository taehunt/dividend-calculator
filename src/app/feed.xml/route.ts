import { buildBlogRssXml } from "@/lib/rss";

export const dynamic = "force-static";

export function GET() {
  const xml = buildBlogRssXml();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
