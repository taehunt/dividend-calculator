import Link from 'next/link';
import { getPostData } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import { PieChart, ArrowLeft } from 'lucide-react';

export default function Post({ params }: { params: { slug: string } }) {
  const postData = getPostData(params.slug);

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
          <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
          <header className="mb-10 text-center border-b border-slate-100 pb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">{postData.title}</h1>
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
