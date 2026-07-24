import { getSortedPostsData } from "@/lib/posts";
import BlogIndexClient from "@/components/BlogIndexClient";
import JsonLd from "@/components/JsonLd";
import { blogIndexJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";

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

  return (
    <>
      <JsonLd
        data={[
          blogIndexJsonLd(
            posts.map(({ slug, title, date }) => ({ slug, title, date }))
          ),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <BlogIndexClient posts={posts} />
    </>
  );
}
