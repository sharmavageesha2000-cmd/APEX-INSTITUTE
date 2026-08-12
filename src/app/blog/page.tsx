import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, Clock, User, ArrowRight } from 'lucide-react';
import { getBlogs } from '@/lib/store';

export default async function BlogIndexPage() {
  const blogs = await getBlogs();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100 px-3.5 py-1.5 rounded-full border border-purple-200">
          <BookOpen className="w-4 h-4 text-purple-600" />
          <span>Knowledge & Tech Articles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Apex Tech & Career Insights Blog
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          Read expert career roadmaps, system design guides, LLM agent blueprints, and tech interview tips.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 justify-center flex-wrap text-xs font-bold">
        {[
          'All Articles',
          'AI & GenAI',
          'Technology',
          'Interview Preparation',
          'Career Advice',
          'UI/UX Design',
          'Digital Marketing',
        ].map((cat, i) => (
          <span
            key={i}
            className={`px-4 py-2 rounded-xl cursor-pointer border transition-all ${
              i === 0
                ? 'bright-btn-primary'
                : 'bg-white border-slate-200 text-slate-700 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-md flex flex-col justify-between group hover:border-purple-300 transition-all">
            <div className="space-y-4">
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 text-[11px] font-extrabold text-purple-800 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-purple-200 shadow-sm">
                  {blog.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-600" />
                    <span>{blog.readTime}</span>
                  </div>
                  <span>•</span>
                  <span>{blog.createdAt}</span>
                </div>

                <Link href={`/blog/${blog.slug}`}>
                  <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                </Link>

                <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed">
                  {blog.summary}
                </p>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={blog.authorPhoto}
                      alt={blog.authorName}
                      className="w-8 h-8 rounded-full object-cover border border-purple-200"
                    />
                    <div>
                      <div className="font-extrabold text-slate-900 text-[11px]">{blog.authorName}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{blog.authorTitle}</div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-purple-700 hover:underline font-bold flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
