import { getSortedPostsData } from "@/lib/posts";
import BlogIndexClient from "@/components/BlogIndexClient";

export default function BlogIndex() {
  const posts = getSortedPostsData().map(({ slug, date, title, excerpt }) => ({
    slug,
    date,
    title,
    excerpt,
  }));

  return <BlogIndexClient posts={posts} />;
}
