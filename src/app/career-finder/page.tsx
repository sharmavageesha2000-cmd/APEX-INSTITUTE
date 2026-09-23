import React from 'react';
import { getCourses, getDomains } from '@/lib/store';
import { CareerFinderWizard } from '@/components/career-finder/CareerFinderWizard';

export default async function CareerFinderPage() {
  const domains = await getDomains();
  const courses = await getCourses();

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-3.5 py-1.5 rounded-full border border-purple-200 shadow-xs">
          Interactive Career Advisor
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
          Find The Right Career Path For You
        </h1>
        <p className="text-sm text-slate-600 font-medium leading-relaxed">
          Answer 5 quick questions about your interest, coding preference, and career goals to get personalized course & domain recommendations.
        </p>
      </div>

      <CareerFinderWizard domains={domains} courses={courses} />
    </div>
  );
}
