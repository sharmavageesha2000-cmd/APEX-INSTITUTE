import React from 'react';
import { getCourses } from '@/lib/store';
import { CourseCompareClient } from '@/components/compare/CourseCompareClient';

interface ComparePageProps {
  searchParams: {
    ids?: string;
  };
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const allCourses = await getCourses();
  const preselectedIds = searchParams.ids ? searchParams.ids.split(',') : [];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent-400 bg-accent-500/10 px-3 py-1 rounded-full border border-accent-500/20">
          Smart Comparison Tool
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Compare Training Courses Side-by-Side
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Analyze duration, syllabus depth, fees, career opportunities, and placement assistance to choose the right program.
        </p>
      </div>

      <CourseCompareClient allCourses={allCourses} preselectedIds={preselectedIds} />
    </div>
  );
}
