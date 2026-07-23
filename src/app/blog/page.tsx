import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { PieChart, ArrowLeft } from 'lucide-react';

export default function BlogIndex() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              YieldGrower
            </span>
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Calculator
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Investment Blog</h1>
          <p className="text-lg text-slate-600">Daily insights on dividend investing, compound interest, and financial independence.</p>
        </div>

        <div className="space-y-8">
          {allPostsData.map(({ slug, date, title, excerpt }) => (
            <article key={slug} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <p className="text-sm text-slate-500 mb-2">{date}</p>
              <Link href={`/blog/${slug}`}>
                <h2 className="text-2xl font-bold text-slate-900 hover:text-indigo-600 transition-colors mb-3">{title}</h2>
              </Link>
              <p className="text-slate-600 leading-relaxed mb-4">{excerpt}</p>
              <Link href={`/blog/${slug}`} className="text-indigo-600 font-semibold text-sm hover:underline">
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
