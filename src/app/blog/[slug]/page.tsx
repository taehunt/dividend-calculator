import { getPostData, getSortedPostsData } from "@/lib/posts";
import BlogPostClient from "@/components/BlogPostClient";

export function generateStaticParams() {
  return getSortedPostsData().map((post) => ({
    slug: post.slug,
  }));
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
