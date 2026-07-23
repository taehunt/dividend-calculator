import { getSortedPostsData } from "@/lib/posts";
import BlogIndexClient from "@/components/BlogIndexClient";

export default function BlogIndex() {
  const posts = getSortedPostsData().map(
    ({ slug, date, title, titleKo, excerpt, excerptKo }) => ({
      slug,
      date,
      title,
      titleKo,
      excerpt,
      excerptKo,
    })
  );

  return <BlogIndexClient posts={posts} />;
}
