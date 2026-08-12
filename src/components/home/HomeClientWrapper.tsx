'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Award,
  Layers,
  Search,
} from 'lucide-react';
import { Domain, Course, Review } from '@/lib/types';
import { CourseCard } from '../ui/CourseCard';
import { EnquiryModal } from '../ui/EnquiryModal';
import { DynamicIcon } from '../ui/IconHelper';
import { HomeFloatingWidgets } from './HomeFloatingWidgets';

/* ─────────────────────────────────────────────────────────── */
/* PLACEMENT DATA                                              */
/* ─────────────────────────────────────────────────────────── */
const PLACED_STUDENTS = [
  { name: 'Manikanta', role: 'AWS Cloud DevOps Engineer', pkg: '12 LPA', company: 'HCL Technologies', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-blue-600 to-indigo-600' },
  { name: 'Nandu Prasad', role: 'Azure Cloud Admin', pkg: '8 LPA', company: 'Wissen Technology', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-purple-600 to-pink-600' },
  { name: 'Sowmya R', role: 'Digital Marketing Expert', pkg: '4.5 LPA', company: 'Melissa EST', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-amber-500 to-orange-600' },
  { name: 'Vivek H', role: 'Digital Marketing Expert', pkg: '7 LPA', company: 'Suitematrix', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-rose-500 to-red-600' },
  { name: 'Poovarasan', role: 'Cloud Architect', pkg: '6 LPA', company: 'Altiostar', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-emerald-600 to-teal-600' },
  { name: 'Gokul Vinayagamoorthi', role: 'Cloud Operations Engineer', pkg: '6 LPA', company: 'IQnext', photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-cyan-600 to-blue-600' },
  { name: 'Praveen', role: 'Big Data Cloud Engineer', pkg: '4.5 LPA', company: 'Recode', photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-violet-600 to-indigo-600' },
  { name: 'Krithika Sonu', role: 'Alteryx Designer', pkg: '10 LPA', company: 'JPMorgan Chase', photo: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-pink-600 to-purple-600' },
  { name: 'Abhishek Mishra', role: 'Alteryx Designer', pkg: '10.5 LPA', company: 'JPMorgan Chase', photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-amber-600 to-red-600' },
  { name: 'Dhipli Kumar', role: 'Azure Cloud Security Engineer', pkg: '15 LPA', company: 'Accenture', photo: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-emerald-600 to-green-700' },
  { name: 'Madhes', role: 'Full Stack Developer', pkg: '6.5 LPA', company: 'Brigita', photo: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-blue-600 to-cyan-600' },
  { name: 'Vishnu', role: 'Associate Software Engineer', pkg: '8.5 LPA', company: 'Capgemini', photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-indigo-600 to-purple-600' },
  { name: 'Sanchaiy Dilip', role: 'DevOps Engineer', pkg: '10.5 LPA', company: 'Capgemini', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-pink-600 to-rose-600' },
  { name: 'Pechetti Lakshmi Sandeep', role: 'Associate Cloud Engineer', pkg: '5.5 LPA', company: 'SoftwareOne', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-teal-600 to-emerald-600' },
  { name: 'Sumanth Reddy', role: 'AWS DevOps Engineer', pkg: '10.5 LPA', company: 'Capgemini', photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-purple-600 to-indigo-600' },
  { name: 'Surya Sankar', role: 'Technical Lead', pkg: '10 LPA', company: 'HCL Technologies', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=faces&q=80', grad: 'from-blue-600 to-violet-600' },
];

// duplicate for seamless infinite loop
const MARQUEE_STUDENTS = [...PLACED_STUDENTS, ...PLACED_STUDENTS];

/* ─────────────────────────────────────────────────────────── */
/* STUDENT CARD                                                */
/* ─────────────────────────────────────────────────────────── */
function PlacementCard({ s }: { s: typeof PLACED_STUDENTS[0] }) {
  return (
    <div className="shrink-0 w-64 playful-card p-5 border-purple-100 hover:border-pink-400 hover:shadow-2xl hover:shadow-pink-500/15 transition-all duration-300 group rounded-[2rem] bg-white">
      {/* Photo */}
      <div className="relative mb-4">
        <img
          src={s.photo}
          alt={s.name}
          className="w-full h-44 object-cover object-top rounded-2xl shadow-md group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        {/* Salary badge over image */}
        <span className="absolute top-2.5 right-2.5 text-xs font-black text-emerald-900 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-full shadow-md">
          {s.pkg}
        </span>
        {/* Gradient overlay bottom */}
        <div className={`absolute bottom-0 left-0 right-0 h-14 rounded-b-2xl bg-gradient-to-t ${s.grad} opacity-30`} />
      </div>

      {/* Name & Role */}
      <div className="space-y-0.5 mb-3">
        <h3 className="font-black text-slate-900 text-sm leading-snug group-hover:text-purple-700 transition-colors">
          {s.name}
        </h3>
        <div className="text-[10px] font-extrabold text-purple-700 uppercase tracking-widest line-clamp-1">
          {s.role}
        </div>
      </div>

      {/* Company badge */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Placed at</span>
        <span className={`text-[10px] font-extrabold text-white bg-gradient-to-r ${s.grad} px-2.5 py-1 rounded-full shadow-sm`}>
          {s.company}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* MAIN COMPONENT                                              */
/* ─────────────────────────────────────────────────────────── */
interface HomeClientWrapperProps {
  domains: Domain[];
  featuredCourses: Course[];
  allCourses: Course[];
  reviews: Review[];
}

export const HomeClientWrapper: React.FC<HomeClientWrapperProps> = ({
  domains,
  featuredCourses,
  allCourses,
  reviews,
}) => {
  const [popularTab, setPopularTab] = useState<'TRENDING' | 'POPULAR' | 'NEW' | 'JOB_ORIENTED'>('TRENDING');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomainSlug, setSelectedDomainSlug] = useState<string>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [activeCourseForEnquiry, setActiveCourseForEnquiry] = useState<Course | null>(null);
  const [comparedCourseIds, setComparedCourseIds] = useState<string[]>([]);

  const popularCoursesList = allCourses.filter((c) => {
    if (popularTab === 'TRENDING') return c.categoryTag === 'TRENDING' || c.rating >= 4.9;
    if (popularTab === 'POPULAR') return c.totalStudents >= 900;
    if (popularTab === 'NEW') return c.categoryTag === 'NEW' || c.featured;
    if (popularTab === 'JOB_ORIENTED') return c.placementAssistance;
    return true;
  });

  let discoveredCourses = [...allCourses];
  if (selectedDomainSlug !== 'ALL') {
    discoveredCourses = discoveredCourses.filter((c) => c.domainSlug === selectedDomainSlug);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    discoveredCourses = discoveredCourses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.headline.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.domainName && c.domainName.toLowerCase().includes(q))
    );
  }
  if (selectedLevel !== 'ALL') {
    discoveredCourses = discoveredCourses.filter((c) =>
      c.level.toLowerCase().includes(selectedLevel.toLowerCase())
    );
  }

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
    <div className="space-y-24 py-8">

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-pink-400/20 via-purple-400/20 to-indigo-400/20 blur-[120px] pointer-events-none rounded-full animate-pulse-glow" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-4 py-2 rounded-full border border-purple-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-pink-600 animate-spin" />
                <span>#1 Job-Oriented EdTech & Career Mastery Platform</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-black tracking-tight leading-[1.1]">
                Learn Today. <br />
                <span className="gradient-text-bright">Build Skills.</span> <br />
                Shape Your Future.
              </h1>

              <p className="text-base sm:text-lg text-black leading-relaxed max-w-xl mx-auto lg:mx-0 font-semibold">
                Industry-focused training programs designed to help students build practical skills, gain confidence and prepare for real-world careers.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/courses" className="w-full sm:w-auto bright-btn-primary px-8 py-4 text-sm shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2">
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/career-finder" className="w-full sm:w-auto bright-btn-secondary px-8 py-4 text-sm flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Find Your Career Path</span>
                </Link>
              </div>

              <div className="pt-8 border-t border-purple-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left">
                <div className="playful-card p-4">
                  <div className="text-2xl sm:text-3xl font-black text-black">50+</div>
                  <div className="text-xs font-black text-black mt-0.5">Courses</div>
                </div>
                <div className="playful-card p-4">
                  <div className="text-2xl sm:text-3xl font-black text-black">10+</div>
                  <div className="text-xs font-black text-black mt-0.5">Domains</div>
                </div>
                <div className="playful-card p-4">
                  <div className="text-2xl sm:text-3xl font-black text-black">1000+</div>
                  <div className="text-xs font-black text-black mt-0.5">Students</div>
                </div>
                <div className="playful-card p-4">
                  <div className="text-2xl sm:text-3xl font-black text-black">Practical</div>
                  <div className="text-xs font-black text-black mt-0.5">Industry Experts</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative">
              <div className="playful-card p-4 relative z-10 shadow-2xl border-purple-200">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                  alt="Students learning technology in practical labs"
                  className="w-full h-80 sm:h-96 object-cover rounded-[1.5rem]"
                />
                <div className="absolute -bottom-4 -left-4 playful-card p-3.5 flex items-center gap-3 bg-white border-purple-200 shadow-2xl">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">ISO 9001:2026 Certified</div>
                    <div className="text-[10px] text-purple-700 font-extrabold">Practical Live Labs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10 DOMAINS SECTION ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-3.5 py-1.5 rounded-full border border-purple-200">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>Master Industry Domains</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Explore 10 High-Growth Career Domains</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">Choose your area of passion and get hands-on training tailored for real-world job roles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {domains.map((dom, idx) => {
            const gradients = [
              'from-blue-600 to-indigo-600',
              'from-pink-600 to-purple-600',
              'from-amber-500 to-orange-600',
              'from-rose-500 to-red-600',
              'from-fuchsia-600 to-pink-600',
              'from-purple-600 to-violet-700',
              'from-emerald-600 to-teal-600',
              'from-cyan-600 to-blue-600',
              'from-violet-600 to-indigo-700',
              'from-pink-600 via-purple-600 to-indigo-600',
            ];
            const g = gradients[idx % gradients.length];
            return (
              <Link
                key={dom.id}
                href={`/domains/${dom.slug}`}
                className="playful-card p-6 border-purple-100 hover:border-pink-400 group block space-y-4 shadow-lg hover:shadow-2xl hover:shadow-pink-500/15 transition-all duration-300 transform hover:-translate-y-2 rounded-[2rem]"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${g} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <DynamicIcon name={dom.iconName} className="w-7 h-7 stroke-[2.5]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-black text-slate-900 text-base leading-snug group-hover:text-purple-700 transition-colors">{dom.name}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 font-semibold leading-relaxed">{dom.headline}</p>
                </div>
                <div className="text-xs font-black text-purple-700 flex items-center gap-1.5 pt-2 group-hover:text-pink-600 group-hover:gap-2.5 transition-all">
                  <span>View Courses</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── COURSE DISCOVERY SUITE ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="playful-card p-6 sm:p-10 border-purple-200 shadow-glow-bright space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Course Discovery Engine</h2>
            <p className="text-xs text-slate-600 font-medium">Filter through 50+ programs by domain, experience level, or keyword.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="md:col-span-2 relative">
              <input
                type="text"
                placeholder="Search courses (e.g. Next.js, Python, Power BI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-purple-200 text-slate-900 placeholder-slate-400 rounded-2xl p-3.5 pl-10 focus:outline-none focus:border-purple-500 focus:bg-white transition-all font-medium"
              />
              <Search className="w-4 h-4 text-purple-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <select
              value={selectedDomainSlug}
              onChange={(e) => setSelectedDomainSlug(e.target.value)}
              className="w-full bg-slate-50 border border-purple-200 text-slate-900 rounded-2xl p-3.5 focus:outline-none focus:border-purple-500 font-bold"
            >
              <option value="ALL">All 10 Domains</option>
              {domains.map((d) => (
                <option key={d.id} value={d.slug}>{d.name}</option>
              ))}
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-slate-50 border border-purple-200 text-slate-900 rounded-2xl p-3.5 focus:outline-none focus:border-purple-500 font-bold"
            >
              <option value="ALL">All Levels</option>
              <option value="Beginner">Beginner Friendly</option>
              <option value="Advanced">Advanced / Executive</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {discoveredCourses.slice(0, 6).map((crs) => (
              <CourseCard
                key={crs.id}
                course={crs}
                onEnquireClick={handleEnquire}
                onCompareToggle={handleCompareToggle}
                isCompared={comparedCourseIds.includes(crs.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRENDING & POPULAR COURSES ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Trending & Popular Bootcamps</h2>
            <p className="text-xs text-slate-600 font-medium">Top-rated courses chosen by 1000+ young graduates.</p>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
            {([
              { id: 'TRENDING', label: 'Trending ⚡' },
              { id: 'POPULAR', label: 'Most Popular 🔥' },
              { id: 'NEW', label: 'New Courses ✨' },
              { id: 'JOB_ORIENTED', label: 'Job Oriented 💼' },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPopularTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  popularTab === tab.id ? 'bright-btn-primary shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCoursesList.map((crs) => (
            <CourseCard
              key={crs.id}
              course={crs}
              onEnquireClick={handleEnquire}
              onCompareToggle={handleCompareToggle}
              isCompared={comparedCourseIds.includes(crs.id)}
            />
          ))}
        </div>
      </section>

      {/* ── 500+ PLACED STUDENTS — INFINITE MARQUEE ──────────── */}
      <section className="space-y-8 overflow-hidden">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-4 py-2 rounded-full border border-purple-200 shadow-sm">
            <Award className="w-4 h-4 text-pink-600" />
            <span>100% Verified Placement Records</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900">
            Join 500+ Successfully Placed Students
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed max-w-2xl mx-auto">
            We are The Software Coaching Centres in Bangalore. Online & Offline Classes by Professionals. Regular Job Updates & 100% Placement Support.
          </p>
        </div>

        {/* Marquee track */}
        <div className="relative w-full overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling track — width must be max-content so the row overflows */}
          <div className="py-4 w-full">
            <div className="marquee-track gap-5">
              {MARQUEE_STUDENTS.map((s, i) => (
                <PlacementCard key={i} s={s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY LEARNERS — REVIEW PLATFORMS ───────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="playful-card p-8 sm:p-12 border-purple-100 shadow-xl rounded-[2.5rem] bg-white text-center space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-4 py-2 rounded-full border border-amber-200 shadow-sm">
              {/* 5 stars */}
              <span className="text-amber-500 text-sm tracking-tight">★★★★★</span>
              <span>Trusted By Learners</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              Trusted By Learners For Approach, Quality & Support
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              Avg rating from 3000+ reviews&nbsp;&nbsp;
              <span className="text-amber-600 font-black">(4.9 / 5)</span>
            </p>
          </div>

          {/* Platform Rating Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Google Reviews */}
            <div className="group playful-card p-6 border-slate-100 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1.5 rounded-[2rem] bg-gradient-to-br from-white to-blue-50/40 space-y-4 text-center">
              {/* Google Logo */}
              <div className="flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              </div>
              <div>
                <div className="font-black text-slate-900 text-base">Google Reviews</div>
                <div className="text-amber-500 text-lg tracking-tight my-1">★★★★★</div>
                <div className="text-2xl font-black text-slate-900">4.9 <span className="text-sm text-slate-500 font-semibold">/ 5</span></div>
              </div>
              <div className="text-[10px] font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block">
                1200+ Reviews
              </div>
            </div>

            {/* Justdial */}
            <div className="group playful-card p-6 border-slate-100 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1.5 rounded-[2rem] bg-gradient-to-br from-white to-orange-50/40 space-y-4 text-center">
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-black text-base leading-none">JD</span>
                </div>
              </div>
              <div>
                <div className="font-black text-slate-900 text-base">Justdial</div>
                <div className="text-amber-500 text-lg tracking-tight my-1">★★★★★</div>
                <div className="text-2xl font-black text-slate-900">5.0 <span className="text-sm text-slate-500 font-semibold">/ 5</span></div>
              </div>
              <div className="text-[10px] font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-100 inline-block">
                800+ Reviews
              </div>
            </div>

            {/* Sulekha */}
            <div className="group playful-card p-6 border-slate-100 hover:border-green-300 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1.5 rounded-[2rem] bg-gradient-to-br from-white to-green-50/40 space-y-4 text-center">
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center shadow-md">
                  <span className="text-white font-black text-sm leading-none">SU</span>
                </div>
              </div>
              <div>
                <div className="font-black text-slate-900 text-base">Sulekha</div>
                <div className="text-amber-500 text-lg tracking-tight my-1">★★★★★</div>
                <div className="text-2xl font-black text-slate-900">4.9 <span className="text-sm text-slate-500 font-semibold">/ 5</span></div>
              </div>
              <div className="text-[10px] font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100 inline-block">
                600+ Reviews
              </div>
            </div>

            {/* UrbanPro */}
            <div className="group playful-card p-6 border-slate-100 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1.5 rounded-[2rem] bg-gradient-to-br from-white to-purple-50/40 space-y-4 text-center">
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-black text-sm leading-none">UP</span>
                </div>
              </div>
              <div>
                <div className="font-black text-slate-900 text-base">Urbanpro</div>
                <div className="text-amber-500 text-lg tracking-tight my-1">★★★★★</div>
                <div className="text-2xl font-black text-slate-900">5.0 <span className="text-sm text-slate-500 font-semibold">/ 5</span></div>
              </div>
              <div className="text-[10px] font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 inline-block">
                400+ Reviews
              </div>
            </div>
          </div>

          {/* Bottom tagline */}
          <p className="text-xs text-slate-500 font-medium pt-2">
            ✅ All reviews are independently verified on their respective platforms
          </p>
        </div>
      </section>

      {/* ── ENQUIRE MODAL ─────────────────────────────────────── */}
      {enquiryModalOpen && (
        <EnquiryModal
          isOpen={enquiryModalOpen}
          selectedCourse={activeCourseForEnquiry}
          courses={allCourses}
          onClose={() => setEnquiryModalOpen(false)}
        />
      )}

      {/* ── CALL US & WHATSAPP FLOATING WIDGETS (HOMEPAGE ONLY) ── */}
      <HomeFloatingWidgets />
    </div>
  );
};
