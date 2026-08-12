'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Clock, Award, CheckCircle2, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Course } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  onEnquireClick?: (course: Course) => void;
  onCompareToggle?: (course: Course) => void;
  isCompared?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnquireClick,
  onCompareToggle,
  isCompared = false,
}) => {
  return (
    <div className="group playful-card p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300">
      {/* Course Cover Image Banner */}
      {course.image && (
        <div className="relative mb-4 h-40 rounded-2xl overflow-hidden shadow-sm border border-purple-100/60">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

          {course.badge && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{course.badge}</span>
            </div>
          )}
        </div>
      )}

      {!course.image && course.badge && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
          <span>{course.badge}</span>
        </div>
      )}

      <div>
        {/* Domain & Level Pills */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-extrabold text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
            {course.domainName || 'Tech Program'}
          </span>
          <span className="text-[11px] text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-bold">
            {course.level}
          </span>
        </div>

        {/* Course Title */}
        <Link href={`/courses/${course.slug}`} className="block group-hover:text-purple-700 transition-colors">
          <h3 className="text-xl font-extrabold text-slate-900 leading-snug mb-2 line-clamp-2">
            {course.title}
          </h3>
        </Link>

        {/* Headline */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed font-medium">
          {course.headline}
        </p>

        {/* Instructor Avatar Bar */}
        {course.instructor && (
          <div className="flex items-center gap-2.5 py-2.5 mb-4 border-y border-slate-100 text-xs">
            <img
              src={course.instructor.photo}
              alt={course.instructor.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-purple-400/60 shadow-sm"
            />
            <div>
              <div className="font-extrabold text-slate-900 text-[11px]">{course.instructor.name}</div>
              <div className="text-[10px] text-slate-500 font-medium line-clamp-1">{course.instructor.title}</div>
            </div>
          </div>
        )}

        {/* Quick Stats: Rating, Duration */}
        <div className="grid grid-cols-2 gap-2 text-xs py-2 text-slate-700 font-bold mb-4">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
            <Clock className="w-3.5 h-3.5 text-purple-600" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-black text-slate-900">{course.rating}</span>
            <span className="text-slate-500 text-[10px]">({course.totalStudents})</span>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="space-y-1.5 mb-6">
          {course.highlights.slice(0, 3).map((hl, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{hl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer & Pricing */}
      <div>
        {/* Pricing */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="text-[10px] text-slate-500 font-bold">Program Fee</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black gradient-text-bright">
                {formatCurrency(course.discountFee || course.fee)}
              </span>
              {course.discountFee && (
                <span className="text-xs text-slate-400 line-through font-normal">
                  {formatCurrency(course.fee)}
                </span>
              )}
            </div>
          </div>
          {course.placementAssistance && (
            <div className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Placement Call</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/courses/${course.slug}`}
            className="w-full text-center bright-btn-secondary py-2.5 text-xs flex items-center justify-center gap-1"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {onEnquireClick ? (
            <button
              onClick={() => onEnquireClick(course)}
              className="w-full bright-btn-primary py-2.5 text-xs"
            >
              Enroll Now 🚀
            </button>
          ) : (
            <Link
              href={`/courses/${course.slug}`}
              className="w-full text-center bright-btn-primary py-2.5 text-xs block"
            >
              Enroll Now 🚀
            </Link>
          )}
        </div>

        {onCompareToggle && (
          <div className="mt-3 text-center">
            <button
              onClick={() => onCompareToggle(course)}
              className={`text-[11px] font-bold transition-colors ${
                isCompared ? 'text-pink-600 font-black' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {isCompared ? '✓ Added to Compare' : '+ Compare with other courses'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
