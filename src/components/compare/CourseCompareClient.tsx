'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Course } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import {
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Star,
  Award,
  Layers,
  Briefcase,
  BookOpen,
  Code2,
  Building2,
} from 'lucide-react';
import { EnquiryModal } from '../ui/EnquiryModal';

interface CourseCompareClientProps {
  allCourses: Course[];
  preselectedIds: string[];
}

export const CourseCompareClient: React.FC<CourseCompareClientProps> = ({
  allCourses,
  preselectedIds,
}) => {
  const initialSelected = preselectedIds
    .map((id) => allCourses.find((c) => c.id === id))
    .filter((c): c is Course => c !== undefined)
    .slice(0, 3);

  if (initialSelected.length === 0 && allCourses.length >= 2) {
    initialSelected.push(allCourses[0], allCourses[1]);
  }

  const [selectedCourses, setSelectedCourses] = useState<Course[]>(initialSelected);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [activeCourseForEnquiry, setActiveCourseForEnquiry] = useState<Course | null>(null);

  const addCourseSlot = (courseId: string, slotIndex: number) => {
    const course = allCourses.find((c) => c.id === courseId);
    if (!course) return;

    const newArr = [...selectedCourses];
    newArr[slotIndex] = course;
    setSelectedCourses(newArr);
  };

  const removeCourseSlot = (slotIndex: number) => {
    setSelectedCourses(selectedCourses.filter((_, idx) => idx !== slotIndex));
  };

  const handleEnquire = (course: Course) => {
    setActiveCourseForEnquiry(course);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Selectors Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((slotIdx) => {
          const course = selectedCourses[slotIdx];
          return (
            <div
              key={slotIdx}
              className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm space-y-4 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700">
                  Comparison Slot #{slotIdx + 1}
                </span>
                {course && (
                  <button
                    onClick={() => removeCourseSlot(slotIdx)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <select
                value={course?.id || ''}
                onChange={(e) => addCourseSlot(e.target.value, slotIdx)}
                className="w-full bg-white border border-slate-200 text-xs text-slate-900 rounded-xl py-2.5 px-3 focus:outline-none focus:border-purple-500 font-medium"
              >
                <option value="">Select course to compare...</option>
                {allCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>

              {course ? (
                <div className="space-y-2 pt-1">
                  <div className="font-extrabold text-slate-900 text-sm line-clamp-2">{course.title}</div>
                  <div className="text-xs text-purple-700 font-semibold">{course.domainName}</div>
                  <div className="text-lg font-black gradient-text-bright">
                    {formatCurrency(course.discountFee || course.fee)}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs flex flex-col items-center gap-2 font-medium">
                  <Plus className="w-6 h-6 text-slate-300" />
                  <span>Select course from dropdown</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Side-by-Side Comparison Matrix */}
      {selectedCourses.length > 0 && (
        <div className="bg-white rounded-3xl border border-purple-100 overflow-hidden shadow-lg">
          <div className="p-6 bg-purple-50/50 border-b border-purple-100 font-extrabold text-slate-900 text-lg flex items-center justify-between">
            <span>Side-by-Side Comparison Matrix</span>
            <span className="text-xs text-slate-500 font-medium">Comparing {selectedCourses.length} Courses</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="p-4 font-bold text-slate-700 w-1/4">Feature / Metric</th>
                  {selectedCourses.map((crs, i) => (
                    <th key={i} className="p-4 font-extrabold text-slate-900 w-1/4 border-l border-slate-200">
                      {crs.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* 1. Duration */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>Duration</span>
                  </td>
                  {selectedCourses.map((crs, i) => (
                    <td key={i} className="p-4 border-l border-slate-100 font-extrabold text-slate-900">
                      {crs.duration}
                    </td>
                  ))}
                </tr>

                {/* 2. Fees & Discount */}
                <tr>
                  <td className="p-4 font-bold text-slate-600">Total Program Fee</td>
                  {selectedCourses.map((crs, i) => (
                    <td key={i} className="p-4 border-l border-slate-100">
                      <span className="text-sm font-black text-slate-900">
                        {formatCurrency(crs.discountFee || crs.fee)}
                      </span>
                      {crs.discountFee && (
                        <span className="ml-2 text-slate-400 line-through font-normal">
                          {formatCurrency(crs.fee)}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 3. Skill Level */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-pink-600" />
                    <span>Skill Level</span>
                  </td>
                  {selectedCourses.map((crs, i) => (
                    <td key={i} className="p-4 border-l border-slate-100">
                      <span className="bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded text-[11px]">
                        {crs.level}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 4. Curriculum Depth */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <span>Curriculum & Modules</span>
                  </td>
                  {selectedCourses.map((crs, i) => (
                    <td key={i} className="p-4 border-l border-slate-100">
                      <div className="font-extrabold text-slate-900">{crs.syllabus.length} Intensive Modules</div>
                      <div className="text-[11px] text-slate-500 font-medium line-clamp-2 mt-1">
                        {crs.syllabus.map((m) => m.title).join(' • ')}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 5. Real-World Projects */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-600" />
                    <span>Real-World Projects</span>
                  </td>
                  {selectedCourses.map((crs, i) => (
                    <td key={i} className="p-4 border-l border-slate-100">
                      <div className="font-extrabold text-pink-600">
                        {crs.projects ? crs.projects.length : 3}+ Industry Projects
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium line-clamp-2 mt-0.5">
                        {crs.projects ? crs.projects.map((p) => p.title).join(', ') : 'E-Commerce & SaaS Apps'}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 6. Certification */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Certification</span>
                  </td>
                  {selectedCourses.map((crs, i) => (
                    <td key={i} className="p-4 border-l border-slate-100">
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 font-extrabold text-[11px] border border-amber-200">
                        ISO 9001:2026 Verified
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 7. Placement Support */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-purple-600" />
                    <span>Placement Support</span>
                  </td>
                  {selectedCourses.map((crs, i) => (
                    <td key={i} className="p-4 border-l border-slate-100">
                      {crs.placementAssistance ? (
                        <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 font-extrabold text-[11px] flex items-center gap-1 w-fit border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>100% Placement Call</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 font-medium">Career Guidance Included</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 8. Mode & Format */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-600" />
                    <span>Mode & Learning Format</span>
                  </td>
                  {selectedCourses.map((crs, i) => (
                    <td key={i} className="p-4 border-l border-slate-100">
                      <div className="font-extrabold text-slate-900">{crs.mode}</div>
                      <div className="text-[11px] text-slate-500 font-medium">Live Zoom + Recorded LMS Access</div>
                    </td>
                  ))}
                </tr>

                {/* Action CTA Row */}
                <tr className="bg-purple-50/30">
                  <td className="p-4 font-bold text-slate-600">Actions</td>
                  {selectedCourses.map((crs, i) => (
                    <td key={i} className="p-4 border-l border-slate-100">
                      <div className="space-y-2">
                        <Link
                          href={`/courses/${crs.slug}`}
                          className="w-full block text-center bright-btn-primary py-2 text-xs"
                        >
                          View Full Details
                        </Link>
                        <button
                          onClick={() => handleEnquire(crs)}
                          className="w-full block text-center bright-btn-secondary py-2 text-xs"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        selectedCourse={activeCourseForEnquiry}
        courses={allCourses}
      />
    </div>
  );
};
