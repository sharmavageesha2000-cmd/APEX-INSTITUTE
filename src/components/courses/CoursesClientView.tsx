'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, BookOpen, Layers, Sparkles } from 'lucide-react';
import { Course, Domain } from '@/lib/types';
import { CourseCard } from '../ui/CourseCard';
import { EnquiryModal } from '../ui/EnquiryModal';
import Link from 'next/link';

interface CoursesClientViewProps {
  initialCourses: Course[];
  domains: Domain[];
  initialDomain?: string;
  initialSearch?: string;
}

export const CoursesClientView: React.FC<CoursesClientViewProps> = ({
  initialCourses,
  domains,
  initialDomain = '',
  initialSearch = '',
}) => {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [selectedDomain, setSelectedDomain] = useState(initialDomain);
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [sortBy, setSortBy] = useState<'rating' | 'price-low' | 'price-high' | 'students'>('rating');

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [activeCourseForEnquiry, setActiveCourseForEnquiry] = useState<Course | null>(null);
  const [comparedCourseIds, setComparedCourseIds] = useState<string[]>([]);

  // Normalizing search and identifying matching domains
  const q = search.toLowerCase().trim();
  const tokens = q ? q.split(/\s+/).filter(Boolean) : [];

  const matchingDomains = q
    ? domains.filter((d) => {
        const dName = d.name.toLowerCase();
        const dSlug = d.slug.toLowerCase();
        return (
          dName.includes(q) ||
          q.includes(dName) ||
          dSlug.includes(q) ||
          d.subcategories.some((sub) => sub.toLowerCase().includes(q) || q.includes(sub.toLowerCase()))
        );
      })
    : [];

  const matchedDomainSlugs = new Set(matchingDomains.map((d) => d.slug));
  const matchedDomainNames = new Set(matchingDomains.map((d) => d.name.toLowerCase()));

  // Filtering
  let displayedCourses = [...initialCourses];

  if (selectedDomain) {
    displayedCourses = displayedCourses.filter((c) => c.domainSlug === selectedDomain);
  }

  if (q) {
    displayedCourses = displayedCourses.filter((c) => {
      const title = c.title.toLowerCase();
      const domainName = (c.domainName || '').toLowerCase();
      const domainSlug = (c.domainSlug || '').toLowerCase();
      const headline = (c.headline || '').toLowerCase();
      const desc = (c.description || '').toLowerCase();
      const tools = (c.toolsCovered || []).map((t) => t.toLowerCase());
      const roles = (c.careerRoles || []).map((r) => r.title.toLowerCase());

      const matchesDomain =
        domainName.includes(q) ||
        domainSlug.includes(q) ||
        matchedDomainSlugs.has(domainSlug) ||
        matchedDomainNames.has(domainName);

      const matchesText =
        title.includes(q) ||
        headline.includes(q) ||
        desc.includes(q) ||
        tools.some((t) => t.includes(q) || q.includes(t)) ||
        roles.some((r) => r.includes(q));

      const matchesTokens =
        tokens.length > 1 &&
        tokens.every(
          (tok) =>
            title.includes(tok) ||
            domainName.includes(tok) ||
            headline.includes(tok) ||
            tools.some((t) => t.includes(tok))
        );

      return matchesDomain || matchesText || matchesTokens;
    });
  }

  if (selectedLevel !== 'ALL') {
    displayedCourses = displayedCourses.filter((c) =>
      c.level.toLowerCase().includes(selectedLevel.toLowerCase())
    );
  }

  // Reliability & Relevance Scoring for search queries
  const getRelevanceScore = (c: Course): number => {
    let score = 0;
    const title = c.title.toLowerCase();
    const dName = (c.domainName || '').toLowerCase();
    const headline = (c.headline || '').toLowerCase();
    const tools = (c.toolsCovered || []).map((t) => t.toLowerCase());

    // 1. Direct Title Match
    if (title === q) score += 100;
    else if (title.startsWith(q)) score += 80;
    else if (title.includes(q)) score += 60;

    // 2. Direct Domain Match (e.g. student searched "AI", "Cloud", "Data", "Full Stack", etc.)
    if (dName === q) score += 95;
    else if (dName.startsWith(q)) score += 85;
    else if (dName.includes(q)) score += 75;
    else if (c.domainSlug && matchedDomainSlugs.has(c.domainSlug)) score += 70;
    else if (dName && matchedDomainNames.has(dName)) score += 70;

    // 3. Tech Stack / Tools Covered Match
    if (tools.some((t) => t === q)) score += 50;
    else if (tools.some((t) => t.includes(q))) score += 35;

    // 4. Headline Match
    if (headline.includes(q)) score += 25;

    // 5. Reliability & Quality Boost (Catch Most Reliable Course)
    // Rating boost (e.g. 4.9 * 12 = 58.8 pts)
    score += (c.rating || 0) * 12;
    // Featured / Flagship Course Priority
    if (c.featured) score += 30;
    if (c.badge) score += 15;
    // Proven Enrollment Numbers (popularity & proven reliability)
    score += Math.min((c.totalStudents || 0) / 100, 25);
    // Placement Assistance
    if (c.placementAssistance) score += 15;

    return score;
  };

  // Sorting
  displayedCourses.sort((a, b) => {
    if (sortBy === 'price-low') return (a.discountFee || a.fee) - (b.discountFee || b.fee);
    if (sortBy === 'price-high') return (b.discountFee || b.fee) - (a.discountFee || a.fee);
    if (sortBy === 'students') return b.totalStudents - a.totalStudents;

    // Default 'rating': if search query exists, prioritize relevance and reliability!
    if (q) {
      const scoreDiff = getRelevanceScore(b) - getRelevanceScore(a);
      if (scoreDiff !== 0) return scoreDiff;
    }
    return b.rating - a.rating;
  });

  const handleEnquire = (course: Course) => {
    setActiveCourseForEnquiry(course);
    setEnquiryModalOpen(true);
  };

  const handleCompareToggle = (course: Course) => {
    setComparedCourseIds((prev) =>
      prev.includes(course.id)
        ? prev.filter((id) => id !== course.id)
        : prev.length < 3
        ? [...prev, course.id]
        : prev
    );
  };

  return (
    <div className="space-y-8">
      {/* Search & Filters Bar */}
      <div className="bg-white border border-purple-200 shadow-lg p-4 sm:p-6 rounded-2xl space-y-4">
        {q && matchingDomains.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-purple-800 bg-purple-50/80 border border-purple-200 px-3.5 py-2 rounded-xl font-bold animate-in fade-in">
            <Sparkles className="w-4 h-4 text-pink-600 shrink-0" />
            <span>
              Searching Domain: <strong>{matchingDomains.map((d) => d.name).join(', ')}</strong> &bull; Showing most reliable & highest-rated courses first
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              placeholder="Search by course name, domain (e.g. AI, Cloud, Full Stack), technology, skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-purple-200 text-sm text-black placeholder-slate-400 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-purple-500 focus:bg-slate-50"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Level Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-white border border-purple-200 text-xs text-black rounded-xl py-3 px-3 focus:outline-none focus:border-purple-500 font-semibold"
            >
              <option value="ALL">All Levels</option>
              <option value="Beginner">Beginner to Advanced</option>
              <option value="Intermediate">Intermediate</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-white border border-purple-200 text-xs text-black rounded-xl py-3 px-3 focus:outline-none focus:border-purple-500 font-semibold"
            >
              <option value="rating">Sort by: Highest Rating</option>
              <option value="students">Sort by: Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Domain Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedDomain('')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedDomain === ''
                ? 'bright-btn-primary shadow-md'
                : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200'
            }`}
          >
            All Domains
          </button>
          {domains.map((dom) => (
            <button
              key={dom.id}
              onClick={() => setSelectedDomain(dom.slug)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDomain === dom.slug
                  ? 'bright-btn-primary shadow-md'
                  : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200'
              }`}
            >
              {dom.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
        <div>
          Showing <span className="text-slate-900 font-extrabold">{displayedCourses.length}</span> programs
        </div>
        {comparedCourseIds.length > 0 && (
          <Link href={`/compare?ids=${comparedCourseIds.join(',')}`} className="text-purple-700 hover:underline font-bold">
            Compare {comparedCourseIds.length} Selected Courses &rarr;
          </Link>
        )}
      </div>

      {/* Courses Grid */}
      {displayedCourses.length === 0 ? (
        <div className="text-center py-16 bg-white border border-purple-100 rounded-2xl space-y-4 shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No courses match your filter</h3>
          <p className="text-xs text-slate-500 font-medium">Try adjusting your search query or domain selection.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedDomain('');
              setSelectedLevel('ALL');
            }}
            className="text-xs text-purple-700 font-extrabold underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnquireClick={handleEnquire}
              onCompareToggle={handleCompareToggle}
              isCompared={comparedCourseIds.includes(course.id)}
            />
          ))}
        </div>
      )}

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        selectedCourse={activeCourseForEnquiry}
        courses={initialCourses}
      />
    </div>
  );
};
