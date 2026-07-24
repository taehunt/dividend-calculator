import { ImageResponse } from "next/og";
import { getPostData, getSortedPostsData } from "@/lib/posts";

export const alt = "YieldGrower blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getSortedPostsData().map((post) => ({
    slug: post.slug,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostData(slug);
  const title =
    post.title.length > 90 ? `${post.title.slice(0, 87)}...` : post.title;
  const excerpt = (post.excerpt || "").trim();
  const excerptShort =
    excerpt.length > 160 ? `${excerpt.slice(0, 157)}...` : excerpt;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background:
            "linear-gradient(145deg, #f8fafc 0%, #eef2ff 50%, #f8fafc 100%)",
          color: "#0f172a",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#4f46e5",
              letterSpacing: 1,
            }}
          >
            YieldGrower
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#64748b" }}>
            Blog
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 40,
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#0f172a",
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          {excerptShort ? (
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.4,
                color: "#475569",
                maxWidth: 980,
              }}
            >
              {excerptShort}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 24,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 600, color: "#64748b" }}>
            {post.date}
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#64748b" }}>
            yieldgrower.com/blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
