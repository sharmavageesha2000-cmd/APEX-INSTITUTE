import React from 'react';
import Link from 'next/link';
import { getDomains } from '@/lib/store';
import { DynamicIcon } from '@/components/ui/IconHelper';
import { Layers, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export default async function DomainsIndexPage() {
  const domains = await getDomains();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100 px-3.5 py-1.5 rounded-full border border-purple-200">
          <Layers className="w-4 h-4 text-purple-600" />
          <span>Industry Sectors</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
          Explore Our 10 Major Career Domains
        </h1>
        <p className="text-sm text-slate-600 font-medium leading-relaxed">
          Select a specialized technology or business domain to explore sub-categories, curriculum roadmaps, salary trends, and active certification courses.
        </p>
      </div>

      {/* 10 Domains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((dom) => (
          <Link
            key={dom.id}
            href={`/domains/${dom.slug}`}
            className="group bg-white rounded-2xl p-6 border border-purple-100 shadow-md flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-purple-300"
          >
            <div>
              {/* Header Icon & Count */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center border border-purple-200 group-hover:scale-110 transition-transform">
                  <DynamicIcon name={dom.iconName} className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-extrabold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-200">
                  {dom.courseCount || 2}+ Courses
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">
                {dom.name}
              </h2>

              <p className="text-xs text-slate-600 font-medium line-clamp-2 mb-4 leading-relaxed">
                {dom.headline}
              </p>

              {/* Subcategories Pills */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {dom.subcategories.slice(0, 5).map((sub, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200"
                  >
                    {sub}
                  </span>
                ))}
                {dom.subcategories.length > 5 && (
                  <span className="text-[10px] text-purple-700 font-extrabold py-0.5">
                    +{dom.subcategories.length - 5} more
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-purple-700 group-hover:text-purple-900 transition-colors">
              <span>Explore Domain Roadmap</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
