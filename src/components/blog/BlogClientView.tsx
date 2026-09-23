'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Search, Clock, User, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { BlogPost } from '@/lib/types';

interface BlogClientViewProps {
  initialBlogs: BlogPost[];
}

export const BlogClientView: React.FC<BlogClientViewProps> = ({ initialBlogs }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'AI & GenAI',
    'Technology',
    'Interview Preparation',
    'Career Advice',
    'Data & Analytics',
    'UI/UX Design',
    'Digital Marketing',
    'Cyber Security',
  ];

  const filteredBlogs = initialBlogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      blog.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'AI & GenAI' && blog.category === 'AI');

    const matchesSearch =
      search.trim() === '' ||
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.summary.toLowerCase().includes(search.toLowerCase()) ||
      blog.category.toLowerCase().includes(search.toLowerCase()) ||
      blog.authorName.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100 px-3.5 py-1.5 rounded-full border border-purple-200">
          <BookOpen className="w-4 h-4 text-purple-600" />
          <span>Knowledge & Tech Articles</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Apex Tech & Career Insights Blog
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
          Read expert career roadmaps, system design guides, LLM agent blueprints, and tech interview tips.
        </p>
      </div>

      {/* Search & Category Bar */}
      <div className="space-y-6">
        <div className="max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Search articles by title, topic, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-purple-200 text-sm text-slate-900 placeholder-slate-400 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-purple-500 shadow-md transition-all font-medium"
          />
          <Search className="w-5 h-5 text-purple-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 justify-center flex-wrap text-xs font-bold">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl border transition-all ${
                selectedCategory === cat
                  ? 'bright-btn-primary shadow-md'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Article Count */}
      <div className="flex items-center justify-between text-xs text-slate-600 font-medium border-b border-purple-100 pb-4">
        <div>
          Showing <span className="text-slate-900 font-extrabold">{filteredBlogs.length}</span> articles
        </div>
        {(selectedCategory !== 'All' || search) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearch('');
            }}
            className="text-purple-700 hover:underline font-bold"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-purple-100 space-y-3 shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No articles match your search</h3>
          <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
            Try adjusting your search terms or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearch('');
            }}
            className="bright-btn-primary px-5 py-2.5 text-xs font-bold inline-block"
          >
            Show All Articles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-md flex flex-col justify-between group hover:border-purple-300 hover:shadow-xl transition-all duration-300 playful-card"
            >
              <div className="space-y-4">
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  <span className="absolute top-4 left-4 text-[11px] font-extrabold text-purple-800 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-purple-200 shadow-sm">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                      <span>{blog.readTime}</span>
                    </div>
                    <span>•</span>
                    <span>{blog.createdAt}</span>
                  </div>

                  <Link href={`/blog/${blog.slug}`}>
                    <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed">
                    {blog.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                {/* Author Info */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={blog.authorPhoto}
                      alt={blog.authorName}
                      className="w-8 h-8 rounded-full object-cover border border-purple-200 shrink-0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop';
                      }}
                    />
                    <div>
                      <div className="font-extrabold text-slate-900 text-[11px]">{blog.authorName}</div>
                      <div className="text-[10px] text-slate-500 font-medium line-clamp-1">{blog.authorTitle}</div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-purple-700 hover:text-pink-600 font-bold flex items-center gap-1 shrink-0 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
