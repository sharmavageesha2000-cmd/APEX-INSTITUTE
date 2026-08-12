'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Clock,
  Star,
  Award,
  CheckCircle2,
  ChevronDown,
  Layers,
  Sparkles,
  Send,
  Briefcase,
  BookOpen,
  Calendar,
  ShieldCheck,
  Building2,
  FileText,
  User as UserIcon,
  Check,
  Download,
  Linkedin,
  HelpCircle,
  Code2,
  Target,
  GraduationCap,
} from 'lucide-react';
import { Course, Review } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { EnquiryModal } from '../ui/EnquiryModal';

interface CourseDetailsClientProps {
  course: Course;
  allCourses: Course[];
  reviews: Review[];
}

export const CourseDetailsClient: React.FC<CourseDetailsClientProps> = ({
  course,
  allCourses,
  reviews,
}) => {
  const router = useRouter();
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedBatch, setSelectedBatch] = useState('Mon-Fri (7:30 PM - 9:30 PM)');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMsg, setEnrollMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeModuleFilter, setActiveModuleFilter] = useState<string>('ALL');

  const courseReviews = reviews.filter((r) => r.courseId === course.id);

  // Extract unique modules list from syllabus for filtering
  const modulesList = Array.from(
    new Set(course.syllabus.map((m) => `Module ${m.moduleNumber}`))
  );

  const filteredSyllabus =
    activeModuleFilter === 'ALL'
      ? course.syllabus
      : course.syllabus.filter(
          (m) => `Module ${m.moduleNumber}` === activeModuleFilter
        );

  const handleEnrollNow = async () => {
    setEnrolling(true);
    setEnrollMsg(null);
    try {
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.id,
          preferredBatch: selectedBatch,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          router.push(`/login?redirect=/courses/${course.slug}`);
          return;
        }
        throw new Error(data.error || 'Enrollment failed');
      }

      setEnrollMsg({ type: 'success', text: 'Enrollment successful! Redirecting to student dashboard...' });
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err: any) {
      setEnrollMsg({ type: 'error', text: err.message || 'Something went wrong.' });
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <>
      {/* 8. COURSE HERO */}
      <div className="bg-gradient-to-b from-purple-50/80 via-pink-50/50 to-slate-50 border-b border-purple-100 pt-10 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <Link href="/courses" className="text-xs text-slate-500 hover:text-purple-700 font-semibold">
                  Courses
                </Link>
                <span className="text-slate-400 text-xs">/</span>
                <span className="text-xs text-purple-700 font-extrabold">{course.domainName}</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {course.badge && (
                  <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full border border-purple-200 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>{course.badge}</span>
                  </span>
                )}
                <span className="bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full border border-pink-200">
                  ISO Verified Certificate
                </span>
              </div>

              {/* Course Title Header with Image beside Title */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pt-1">
                {/* Course Cover Image */}
                <div className="relative shrink-0 group">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 p-1 shadow-xl shadow-purple-500/20">
                    <img
                      src={course.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'}
                      alt={course.title}
                      className="w-full h-full object-cover rounded-[22px] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-2 bg-purple-700 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md border-2 border-white flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                    <span>CERTIFIED</span>
                  </span>
                </div>

                <div className="space-y-2 flex-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                    {course.title}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                    {course.headline}
                  </p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-700 font-semibold">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-extrabold text-slate-900 text-sm">{course.rating}</span>
                  <span className="text-slate-500">({course.totalStudents} enrolled)</span>
                </div>

                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>Duration: <strong className="text-slate-900">{course.duration}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                  <Layers className="w-4 h-4 text-pink-600" />
                  <span>Level: <strong className="text-slate-900">{course.level}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Mode: <strong className="text-slate-900">{course.mode}</strong></span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={handleEnrollNow}
                  className="bright-btn-primary font-bold text-xs px-6 py-3.5 transition-all flex items-center gap-1.5"
                >
                  <span>Enroll Now 🚀</span>
                </button>
                <button
                  onClick={() => setEnquiryModalOpen(true)}
                  className="bright-btn-secondary text-xs px-6 py-3.5 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-purple-600" />
                  <span>Download Brochure & Syllabus PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content & Sticky Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Main Details */}
          <div className="lg:col-span-8 space-y-12">
            {/* What You Will Learn & Course Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-md space-y-6">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span>What You Will Learn (Course Overview)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                {course.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{hl}</span>
                  </div>
                ))}
              </div>

              {/* Prerequisites & Who Should Take */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>Prerequisites</span>
                  </h3>
                  <ul className="space-y-1.5 text-slate-600 font-medium">
                    {course.prerequisites ? (
                      course.prerequisites.map((p, i) => <li key={i}>• {p}</li>)
                    ) : (
                      <li>• No prior coding required; starts from scratch.</li>
                    )}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-pink-600" />
                    <span>Who Should Take This Course?</span>
                  </h3>
                  <ul className="space-y-1.5 text-slate-600 font-medium">
                    {course.whoShouldTake ? (
                      course.whoShouldTake.map((w, i) => <li key={i}>• {w}</li>)
                    ) : (
                      <li>• College students, freshers, and career switchers seeking tech roles.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Complete Module-Wise Syllabus Curriculum */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-md space-y-6">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                      <span>Module-Wise Course Curriculum</span>
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      {course.syllabus.length} Structured Modules • Hands-on Labs &amp; Production Capstones
                    </p>
                  </div>

                  <span className="bg-purple-100 text-purple-800 text-xs font-black px-3 py-1.5 rounded-full border border-purple-200 shrink-0">
                    Course Duration: {course.duration}
                  </span>
                </div>

                {/* Module-Wise Filter Buttons */}
                <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none text-xs">
                  <button
                    onClick={() => setActiveModuleFilter('ALL')}
                    className={`px-4 py-2 rounded-xl font-bold transition-all shrink-0 ${
                      activeModuleFilter === 'ALL'
                        ? 'bg-purple-700 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700 border border-slate-200'
                    }`}
                  >
                    All Modules ({course.syllabus.length})
                  </button>

                  {modulesList.map((m, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveModuleFilter(m)}
                      className={`px-4 py-2 rounded-xl font-bold transition-all shrink-0 ${
                        activeModuleFilter === m
                          ? 'bg-purple-700 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700 border border-slate-200'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modules List */}
              <div className="space-y-4">
                {filteredSyllabus.map((mod, idx) => {
                  const isOpen = openModuleIndex === idx || activeModuleFilter !== 'ALL';
                  const moduleBadgeText = `Module ${mod.moduleNumber}`;

                  return (
                    <div
                      key={idx}
                      className="border border-purple-100 rounded-2xl overflow-hidden bg-slate-50/50 shadow-xs"
                    >
                      <button
                        onClick={() => setOpenModuleIndex(openModuleIndex === idx ? null : idx)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-purple-50/70 transition-colors gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-xs shrink-0">
                            {moduleBadgeText}
                          </span>
                          <div>
                            <div className="text-sm sm:text-base font-extrabold text-slate-900">
                              {mod.title}
                            </div>
                            <div className="text-xs text-purple-700 font-bold mt-0.5">
                              {mod.duration} • {mod.topics.length} Key Topics Covered
                            </div>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                            isOpen ? 'rotate-180 text-purple-600' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="p-5 border-t border-purple-100 bg-white space-y-4">
                          <div className="space-y-2">
                            <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                              Core Topics &amp; Learning Outcomes:
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                              {mod.topics.map((t, i) => (
                                <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 font-medium">
                                  <span className="w-2 h-2 rounded-full bg-purple-600 mt-1 shrink-0" />
                                  <span>{t}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Practical Hands-on Lab Deliverable Box */}
                          {mod.practicalLab && (
                            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border border-purple-200 p-4 rounded-xl text-xs space-y-1">
                              <div className="font-extrabold text-purple-900 flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-pink-600" />
                                <span>Module Practical Deliverable Lab:</span>
                              </div>
                              <div className="text-slate-800 font-bold">
                                {mod.practicalLab}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Course Benefits 7 Pillars */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-md space-y-6">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-pink-600" />
                <span>Program Benefits & Support Pillars</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                {[
                  { title: 'Practical Projects', desc: 'Build 3+ production apps hosted live' },
                  { title: 'Industry Curriculum', desc: 'Designed with tier-1 engineering leads' },
                  { title: 'ISO Certification', desc: 'ISO 9001:2026 verified completion credential' },
                  { title: 'Interview Prep', desc: 'Mock technical & HR interview drills' },
                  { title: 'Resume Building', desc: 'ATS-optimized resume & LinkedIn overhaul' },
                  { title: 'Portfolio Dev', desc: 'GitHub & Behance portfolio creation' },
                ].map((b, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-extrabold text-slate-900">{b.title}</div>
                    <div className="text-slate-500 text-[11px] font-medium">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-World Projects Showcase */}
            {course.projects && course.projects.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-md space-y-6">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-600" />
                  <span>Real-World Projects You Will Build</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.projects.map((proj, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <h3 className="font-extrabold text-slate-900 text-sm">{proj.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 pt-2">
                        {proj.techStack.map((t, idx) => (
                          <span key={idx} className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools & Technologies */}
            {course.toolsCovered && (
              <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-md space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900">Tools & Technologies Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {course.toolsCovered.map((tool, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Instructor Section */}
            {course.instructor && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-md space-y-4">
                <h2 className="text-xl font-extrabold text-slate-900">Meet Your Industry Lead Instructor</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <img
                    src={course.instructor.photo}
                    alt={course.instructor.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-300 shadow-md"
                  />
                  <div className="space-y-1.5 text-xs">
                    <div className="font-extrabold text-slate-900 text-lg">{course.instructor.name}</div>
                    <div className="text-purple-700 font-extrabold">{course.instructor.title}</div>
                    <div className="text-slate-500 font-medium">{course.instructor.experience}</div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.instructor.expertise.map((exp, i) => (
                        <span key={i} className="bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded text-[10px] font-bold">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Course FAQs */}
            {course.faqs && course.faqs.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-md space-y-4">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-500" />
                  <span>Frequently Asked Questions (FAQs)</span>
                </h2>

                <div className="space-y-3">
                  {course.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full p-4 flex items-center justify-between text-left font-bold text-slate-900 text-xs hover:bg-purple-50/50"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-purple-600' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="p-4 border-t border-slate-200 text-xs text-slate-600 leading-relaxed bg-white font-medium">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Enrollment Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-xl space-y-6">
              <div>
                <div className="text-xs text-slate-500 font-bold mb-1">Total Course Fee</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black gradient-text-bright">
                    {formatCurrency(course.discountFee || course.fee)}
                  </span>
                  {course.discountFee && (
                    <span className="text-sm text-slate-400 line-through font-normal">
                      {formatCurrency(course.fee)}
                    </span>
                  )}
                </div>
                {course.discountFee && (
                  <div className="text-[11px] font-extrabold text-emerald-700 mt-1 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-block">
                    Save {formatCurrency(course.fee - course.discountFee)} (Scholarship Applied)
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Preferred Batch Timing
                </label>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-xs text-slate-900 rounded-xl py-2.5 px-3 focus:outline-none focus:border-purple-500 font-medium"
                >
                  <option value="Mon-Fri (7:30 PM - 9:30 PM)">Mon-Fri Evening (7:30 PM - 9:30 PM)</option>
                  <option value="Sat-Sun (10:00 AM - 2:00 PM)">Sat-Sun Weekend (10:00 AM - 2:00 PM)</option>
                </select>
              </div>

              {enrollMsg && (
                <div
                  className={`text-xs p-3 rounded-xl border font-semibold ${
                    enrollMsg.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  {enrollMsg.text}
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleEnrollNow}
                  disabled={enrolling}
                  className="w-full bright-btn-primary font-bold py-3.5 rounded-xl text-sm transition-all"
                >
                  {enrolling ? 'Processing Enrollment...' : 'Enroll Now 🚀'}
                </button>

                <button
                  onClick={() => setEnquiryModalOpen(true)}
                  className="w-full bright-btn-secondary text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-purple-600" />
                  <span>Download Syllabus & Callback</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        selectedCourse={course}
        courses={allCourses}
      />
    </>
  );
};
