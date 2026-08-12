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

  // Filtering
  let displayedCourses = [...initialCourses];

  if (selectedDomain) {
    displayedCourses = displayedCourses.filter((c) => c.domainSlug === selectedDomain);
  }
  if (search.trim()) {
    const term = search.toLowerCase();
    displayedCourses = displayedCourses.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        c.headline.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term)
    );
  }
  if (selectedLevel !== 'ALL') {
    displayedCourses = displayedCourses.filter((c) =>
      c.level.toLowerCase().includes(selectedLevel.toLowerCase())
    );
  }

  // Sorting
  displayedCourses.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'students') return b.totalStudents - a.totalStudents;
    if (sortBy === 'price-low') return (a.discountFee || a.fee) - (b.discountFee || b.fee);
    if (sortBy === 'price-high') return (b.discountFee || b.fee) - (a.discountFee || a.fee);
    return 0;
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              placeholder="Search by course name, technology, skill..."
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
