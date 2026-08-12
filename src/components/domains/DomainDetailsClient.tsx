'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Domain, Course } from '@/lib/types';
import { DynamicIcon } from '../ui/IconHelper';
import { CourseCard } from '../ui/CourseCard';
import { EnquiryModal } from '../ui/EnquiryModal';
import { AIDomainAdvisorCard } from './AIDomainAdvisorCard';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Briefcase,
  Layers,
  ArrowRight,
  Send,
  Award,
} from 'lucide-react';

interface DomainDetailsClientProps {
  domain: Domain;
  domainCourses: Course[];
  allCourses: Course[];
}

export const DomainDetailsClient: React.FC<DomainDetailsClientProps> = ({
  domain,
  domainCourses,
  allCourses,
}) => {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [activeCourseForEnquiry, setActiveCourseForEnquiry] = useState<Course | null>(null);

  const handleEnquire = (course: Course) => {
    setActiveCourseForEnquiry(course);
    setEnquiryModalOpen(true);
  };

  return (
    <>
      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-purple-50/80 via-pink-50/50 to-slate-50 border-b border-purple-100 pt-10 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2">
            <Link href="/domains" className="text-xs text-slate-500 hover:text-purple-700 font-semibold">
              Domains
            </Link>
            <span className="text-slate-400 text-xs">/</span>
            <span className="text-xs text-purple-700 font-extrabold">{domain.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Domain Info Header Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-pink-500/20 shrink-0">
                  <DynamicIcon name={domain.iconName} className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                    Major Training Track
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-1">
                    {domain.name}
                  </h1>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                {domain.headline} &mdash; {domain.description}
              </p>

              {/* Quick Domain Highlights Pills */}
              <div className="flex flex-wrap gap-2 pt-2 text-xs">
                <span className="bg-white border border-purple-100 px-3 py-1.5 rounded-xl font-bold text-slate-800 shadow-xs flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>{domain.subcategories.length}+ Specializations</span>
                </span>
                <span className="bg-white border border-purple-100 px-3 py-1.5 rounded-xl font-bold text-slate-800 shadow-xs flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-pink-600" />
                  <span>100% Placement Referral</span>
                </span>
                <span className="bg-white border border-purple-100 px-3 py-1.5 rounded-xl font-bold text-slate-800 shadow-xs flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Live Mentor Bootcamps</span>
                </span>
              </div>
            </div>

            {/* AI Avatar Domain Advisor Beside Domain Name */}
            <div className="lg:col-span-5">
              <AIDomainAdvisorCard domain={domain} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Subcategories Specializations Grid */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-md space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-600" />
              <span>Specialized Sub-Categories Covered ({domain.subcategories.length})</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Our comprehensive curriculum in {domain.name} covers all industry-standard specializations:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {domain.subcategories.map((sub, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs font-bold text-slate-800 flex items-center gap-2 hover:border-purple-300 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                <span>{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Courses List Under This Domain */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
                Certification Programs
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Active Courses in {domain.name}
              </h2>
            </div>
            <Link href="/courses" className="text-xs font-bold text-purple-700 hover:underline">
              View All Courses &rarr;
            </Link>
          </div>

          {domainCourses.length === 0 ? (
            <div className="text-center py-12 bg-white border border-purple-100 rounded-2xl space-y-3 shadow-sm">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">Courses launching soon for this domain</h3>
              <p className="text-xs text-slate-500 font-medium">Book a consultation to get early-bird access to upcoming batches.</p>
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="bright-btn-primary text-xs px-4 py-2"
              >
                Request Batch Schedule
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {domainCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnquireClick={handleEnquire}
                />
              ))}
            </div>
          )}
        </div>

        {/* Lead Consultation CTA */}
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border border-purple-200 p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Need Guidance on {domain.name} Career Paths?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
            Speak with an industry mentor to select the exact sub-category track, batch timing, and fee installment plan.
          </p>
          <button
            onClick={() => setEnquiryModalOpen(true)}
            className="bright-btn-primary font-bold px-8 py-3.5 text-xs transition-all inline-flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Book Free Domain Counseling Call</span>
          </button>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        selectedCourse={activeCourseForEnquiry}
        courses={allCourses}
      />
    </>
  );
};
