'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Course, Domain, BlogPost, EventItem } from '@/lib/types';
import { Search, BookOpen, Layers, FileText, Calendar, ArrowRight, User } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface GlobalSearchClientProps {
  courses: Course[];
  domains: Domain[];
  blogs: BlogPost[];
  events: EventItem[];
}

export const GlobalSearchClient: React.FC<GlobalSearchClientProps> = ({
  courses,
  domains,
  blogs,
  events,
}) => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('search') || '';

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'ALL' | 'COURSES' | 'DOMAINS' | 'BLOGS' | 'EVENTS'>('ALL');

  const q = query.toLowerCase().trim();

  // Matched arrays
  const matchedCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.headline.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.instructor && c.instructor.name.toLowerCase().includes(q))
  );

  const matchedDomains = domains.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.headline.toLowerCase().includes(q) ||
      d.subcategories.some((sub) => sub.toLowerCase().includes(q))
  );

  const matchedBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      b.summary.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
  );

  const matchedEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.speakerName.toLowerCase().includes(q)
  );

  const totalMatches =
    matchedCourses.length + matchedDomains.length + matchedBlogs.length + matchedEvents.length;

  return (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <div className="bg-white border border-purple-100 p-6 rounded-3xl space-y-4 shadow-lg">
        <div className="relative">
          <input
            type="text"
            placeholder="Search across 50+ courses, 10 domains, tech blogs, events & instructors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border border-purple-200 text-sm text-slate-900 placeholder-slate-400 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-purple-500"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Tab Badges */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
          {[
            { id: 'ALL', label: `All Results (${totalMatches})` },
            { id: 'COURSES', label: `Courses (${matchedCourses.length})` },
            { id: 'DOMAINS', label: `Domains (${matchedDomains.length})` },
            { id: 'BLOGS', label: `Blogs & Resources (${matchedBlogs.length})` },
            { id: 'EVENTS', label: `Events (${matchedEvents.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bright-btn-primary'
                  : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-purple-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Listings */}
      {/* 1. COURSES MATCHES */}
      {(activeTab === 'ALL' || activeTab === 'COURSES') && matchedCourses.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span>Matching Courses ({matchedCourses.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedCourses.map((crs) => (
              <Link
                key={crs.id}
                href={`/courses/${crs.slug}`}
                className="bg-white border border-purple-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex justify-between items-start space-y-2 block group"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                    {crs.domainName}
                  </span>
                  <h3 className="font-bold text-slate-900 group-hover:text-purple-700 text-sm">{crs.title}</h3>
                  <div className="text-xs text-slate-600 line-clamp-1">{crs.headline}</div>
                  <div className="text-xs font-black text-pink-600">
                    {formatCurrency(crs.discountFee || crs.fee)}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 shrink-0 mt-2" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 2. DOMAINS MATCHES */}
      {(activeTab === 'ALL' || activeTab === 'DOMAINS') && matchedDomains.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            <span>Matching Domains ({matchedDomains.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedDomains.map((dom) => (
              <Link
                key={dom.id}
                href={`/domains/${dom.slug}`}
                className="bg-white border border-purple-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-300 transition-all space-y-2 block group"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-purple-700 text-sm">{dom.name}</h3>
                <div className="text-xs text-slate-600 line-clamp-2">{dom.headline}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 3. BLOG MATCHES */}
      {(activeTab === 'ALL' || activeTab === 'BLOGS') && matchedBlogs.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>Matching Blogs & Articles ({matchedBlogs.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedBlogs.map((b) => (
              <Link
                key={b.id}
                href={`/blog/${b.slug}`}
                className="bg-white border border-purple-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-300 transition-all space-y-2 block group"
              >
                <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                  {b.category}
                </span>
                <h3 className="font-bold text-slate-900 group-hover:text-purple-700 text-sm">{b.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{b.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 4. EVENTS MATCHES */}
      {(activeTab === 'ALL' || activeTab === 'EVENTS') && matchedEvents.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            <span>Matching Events & Workshops ({matchedEvents.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedEvents.map((evt) => (
              <Link
                key={evt.id}
                href={`/events/${evt.slug}`}
                className="bg-white border border-purple-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-300 transition-all space-y-2 block group"
              >
                <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                  {evt.category} • {evt.date}
                </span>
                <h3 className="font-bold text-slate-900 group-hover:text-purple-700 text-sm">{evt.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{evt.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {totalMatches === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-purple-100 shadow-sm space-y-3">
          <Search className="w-12 h-12 text-slate-400 mx-auto" />
          <div className="text-base font-bold text-slate-900">No results found for &ldquo;{query}&rdquo;</div>
          <p className="text-xs text-slate-500">Try searching for keywords like Next.js, Python, Power BI, AI, or Web Development.</p>
        </div>
      )}
    </div>
  );
};
