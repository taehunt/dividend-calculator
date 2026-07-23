import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

export default function BlogIndex() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SiteHeader active="blog" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/tools"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Investment Blog
          </h1>
          <p className="text-lg text-slate-600">
            Daily insights on dividend investing, compound interest, and financial
            independence.
          </p>
        </div>

        <div className="space-y-8">
          {allPostsData.map(({ slug, date, title, excerpt }) => (
            <article
              key={slug}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <p className="text-sm text-slate-500 mb-2">{date}</p>
              <Link href={`/blog/${slug}`}>
                <h2 className="text-2xl font-bold text-slate-900 hover:text-indigo-600 transition-colors mb-3">
                  {title}
                </h2>
              </Link>
              <p className="text-slate-600 leading-relaxed mb-4">{excerpt}</p>
              <Link
                href={`/blog/${slug}`}
                className="text-indigo-600 font-semibold text-sm hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
