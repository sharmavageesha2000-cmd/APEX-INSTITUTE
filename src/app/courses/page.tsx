import React from 'react';
import { getCourses, getDomains } from '@/lib/store';
import { CoursesClientView } from '@/components/courses/CoursesClientView';

interface CoursesPageProps {
  searchParams: {
    domain?: string;
    search?: string;
    level?: string;
    mode?: string;
  };
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const domains = await getDomains();
  const courses = await getCourses({
    domainSlug: searchParams.domain,
    search: searchParams.search,
    level: searchParams.level,
    mode: searchParams.mode,
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-400">
          Course Directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black">
          Explore All Training Programs & Certifications
        </h1>
        <p className="text-sm text-black max-w-2xl font-medium">
          Filter by your preferred domain, skill level, or learning mode to find the perfect career track.
        </p>
      </div>

      {/* Interactive Courses View */}
      <CoursesClientView
        initialCourses={courses}
        domains={domains}
        initialDomain={searchParams.domain}
        initialSearch={searchParams.search}
      />
    </div>
  );
}
