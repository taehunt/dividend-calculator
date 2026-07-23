import { getPostData, getSortedPostsData } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import SiteHeader from "@/components/SiteHeader";
import BlogBackLink from "@/components/BlogBackLink";

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
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader
        active="blog"
        showLocaleControls
        showCurrencyControls={false}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogBackLink />
        <article className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
          <header className="mb-10 text-center border-b border-slate-100 pb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {postData.title}
            </h1>
            <p className="text-slate-500">{postData.date}</p>
          </header>
          <div className="prose prose-slate prose-indigo max-w-none">
            <ReactMarkdown>{postData.content}</ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
}
