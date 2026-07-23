import type { Metadata } from "next";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import BlogPostClient from "@/components/BlogPostClient";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return getSortedPostsData().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);
  return pageMeta({
    title: post.title,
    description: post.excerpt || post.title,
    path: `/blog/${slug}`,
  });
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = getPostData(slug);

  return (
    <BlogPostClient
      title={postData.title}
      titleKo={postData.titleKo}
      date={postData.date}
      content={postData.content}
      contentKo={postData.contentKo}
    />
  );
}
