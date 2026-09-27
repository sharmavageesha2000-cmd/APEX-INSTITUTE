'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  GraduationCap,
  ChevronDown,
  Search,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  UserPlus,
} from 'lucide-react';


import { Domain, User, Course } from '@/lib/types';
import { DynamicIcon } from '../ui/IconHelper';
import { ApexLogo } from '../ui/ApexLogo';

interface NavbarProps {
  domains?: Domain[];
  featuredCourses?: Course[];
}

export const Navbar: React.FC<NavbarProps> = ({ domains = [], featuredCourses = [] }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [domainDropdown, setDomainDropdown] = useState(false);
  const [courseDropdown, setCourseDropdown] = useState(false);
  const [moreDropdown, setMoreDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const fallbackCourses = [
    { id: 'fc-1', title: 'Full Stack Web Development', slug: 'full-stack-web-development', duration: '4 Months', level: 'Beginner' },
    { id: 'fc-2', title: 'Cloud DevOps Engineering (AWS/Azure)', slug: 'cloud-devops-mastery', duration: '4 Months', level: 'All Levels' },
    { id: 'fc-3', title: 'Data Science & Machine Learning', slug: 'data-science-machine-learning', duration: '6 Months', level: 'Intermediate' },
    { id: 'fc-4', title: 'Cybersecurity & Ethical Hacking', slug: 'cybersecurity-ethical-hacking', duration: '5 Months', level: 'Intermediate' },
    { id: 'fc-5', title: 'UI/UX Design & Prototyping', slug: 'ui-ux-design-prototyping', duration: '3 Months', level: 'Beginner' },
    { id: 'fc-6', title: 'Artificial Intelligence & GenAI', slug: 'artificial-intelligence-generative-ai', duration: '4 Months', level: 'Advanced' },
  ];

  const displayCourses = (featuredCourses && featuredCourses.length > 0)
    ? featuredCourses.slice(0, 6)
    : fallbackCourses;

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.user || null);
      })
      .catch(() => {});
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setCurrentUser(null);
    router.push('/login');
    router.refresh();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 bg-gradient-to-r from-[#f8c5df]/95 via-[#e6d0f8]/95 to-[#d4c2f4]/95 backdrop-blur-2xl border-b border-purple-300/70 transition-all duration-300 ${
          isScrolled ? 'shadow-md shadow-purple-900/10' : 'shadow-xs'
        }`}
      >
        {/* Bright Gradient Top Notice Banner */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-violet-600 text-white text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 text-center font-bold flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 animate-spin shrink-0" />
          <span className="hidden sm:inline">⚡ Learn Today. Build Skills. Shape Your Future &mdash;</span>
          <span>Up to 35% Scholarship Discount</span>
          <Link href="/contact" className="underline font-black text-amber-300 hover:text-white ml-1 sm:ml-2 whitespace-nowrap">
            Claim Now &rarr;
          </Link>
        </div>

        <div className="max-w-[1536px] w-full mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <ApexLogo size="md" showSubtitle={true} />
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3 text-xs font-bold text-slate-700">
              <Link
                href="/"
                className={`px-2.5 py-1.5 rounded-xl transition-all ${
                  pathname === '/'
                    ? 'text-purple-700 font-extrabold bg-white/90 shadow-sm border border-purple-200/60'
                    : 'hover:text-purple-700 hover:bg-white/60'
                }`}
              >
                Home
              </Link>

              {/* Courses Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCourseDropdown(true)}
                onMouseLeave={() => setCourseDropdown(false)}
              >
                <Link
                  href="/courses"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl transition-all ${
                    pathname === '/courses' || pathname.startsWith('/courses/')
                      ? 'text-purple-700 font-extrabold bg-white/90 shadow-sm border border-purple-200/60'
                      : 'hover:text-purple-700 hover:bg-white/60'
                  }`}
                >
                  <span>Courses</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      courseDropdown ? 'rotate-180 text-pink-600' : ''
                    }`}
                  />
                </Link>

                {courseDropdown && (
                  <div className="absolute left-0 top-full pt-2 w-[480px] sm:w-[540px] rounded-3xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-4 space-y-3 bg-white/95 backdrop-blur-xl border border-pink-100 rounded-3xl shadow-2xl">
                      <div className="flex items-center justify-between px-2 pt-1 border-b border-purple-100/70 pb-2">
                        <div className="text-[11px] font-extrabold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                          <span>Flagship Bootcamps &amp; Programs</span>
                        </div>
                        <Link
                          href="/courses"
                          className="text-[11px] font-bold text-pink-600 hover:text-purple-700 flex items-center gap-0.5 transition-colors"
                        >
                          <span>View All Courses</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      {/* Course items grid */}
                      <div className="grid grid-cols-2 gap-1.5">
                        {displayCourses.map((c) => (
                          <Link
                            key={c.id}
                            href={`/courses/${c.slug}`}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all group border border-transparent hover:border-pink-200/50"
                          >
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 text-purple-700 flex items-center justify-center shrink-0 border border-pink-200/50 text-xs font-black shadow-xs group-hover:scale-105 transition-transform">
                              <GraduationCap className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-slate-800 group-hover:text-purple-700 truncate leading-snug">
                                {c.title}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-500 font-semibold">
                                <span className="text-purple-700 font-bold">{c.duration || '3-6 Mos'}</span>
                                <span>•</span>
                                <span className="text-emerald-700 font-bold bg-emerald-50 px-1 rounded">{c.level || 'All Levels'}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Bottom Quick Action Banner */}
                      <Link
                        href="/courses"
                        className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-pink-50 via-purple-50 to-violet-50 border border-purple-200/60 hover:border-pink-300 transition-all text-xs font-extrabold text-purple-800 group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                          <span>Explore All Certified Training Programs</span>
                        </div>
                        <span className="text-[11px] text-pink-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-black">
                          Browse Catalog &rarr;
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Domains Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setDomainDropdown(true)}
                onMouseLeave={() => setDomainDropdown(false)}
              >
                <Link
                  href="/domains"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl transition-all ${
                    pathname.startsWith('/domains')
                      ? 'text-purple-700 font-extrabold bg-white/90 shadow-sm border border-purple-200/60'
                      : 'hover:text-purple-700 hover:bg-white/60'
                  }`}
                >
                  <span>Domains</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>

                {domainDropdown && (
                  <div className="absolute left-0 top-full pt-2 w-[420px] rounded-3xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-4 space-y-1 bg-white/95 backdrop-blur-xl border border-pink-100 rounded-3xl shadow-2xl">
                      <div className="text-[11px] font-extrabold text-purple-700 uppercase tracking-wider px-3 py-1 mb-2">
                        10 Major Career Domains
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {domains.map((dom) => (
                          <Link
                            key={dom.id}
                            href={`/domains/${dom.slug}`}
                            className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all text-xs font-bold text-slate-800 hover:text-purple-700"
                          >
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 text-purple-600 flex items-center justify-center shrink-0 border border-pink-200/50">
                              <DynamicIcon name={dom.iconName} className="w-4 h-4" />
                            </div>
                            <span className="truncate">{dom.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/career-finder"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl transition-all ${
                  pathname === '/career-finder'
                    ? 'text-purple-700 font-extrabold bg-white/90 shadow-sm border border-purple-200/60'
                    : 'hover:text-purple-700 hover:bg-white/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
                <span>Career Path</span>
              </Link>


              <Link
                href="/placements"
                className={`px-2.5 py-1.5 rounded-xl transition-all ${
                  pathname === '/placements'
                    ? 'text-purple-700 font-extrabold bg-white/90 shadow-sm border border-purple-200/60'
                    : 'hover:text-purple-700 hover:bg-white/60'
                }`}
              >
                Placements
              </Link>

              <Link
                href="/skill-passport"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all ${
                  pathname === '/skill-passport'
                    ? 'text-purple-700 font-extrabold bg-white/90 shadow-sm border border-purple-200/60'
                    : 'hover:text-purple-700 hover:bg-white/60'
                }`}
              >
                <span>Skill Passport</span>
                <span className="text-[9px] font-black uppercase tracking-wider text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded-full border border-pink-200">
                  NEW
                </span>
              </Link>

              {/* Always Keep Clean "More" Dropdown on Desktop */}
              <div
                className="relative"
                onMouseEnter={() => setMoreDropdown(true)}
                onMouseLeave={() => setMoreDropdown(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl transition-all ${
                    ['/blog', '/events', '/about', '/contact'].includes(pathname)
                      ? 'text-purple-700 font-extrabold bg-white/90 shadow-sm border border-purple-200/60'
                      : 'hover:text-purple-700 hover:bg-white/60'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {moreDropdown && (
                  <div className="absolute left-0 top-full pt-2 w-48 rounded-2xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-2 space-y-1 bg-white/95 backdrop-blur-xl border border-pink-100 rounded-2xl shadow-xl">
                      <Link
                        href="/blog"
                        className="flex items-center px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 text-xs font-bold text-slate-800 hover:text-purple-700 transition-colors"
                      >
                        Blog &amp; Insights
                      </Link>
                      <Link
                        href="/events"
                        className="flex items-center px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 text-xs font-bold text-slate-800 hover:text-purple-700 transition-colors"
                      >
                        Workshops &amp; Events
                      </Link>
                      <Link
                        href="/about"
                        className="flex items-center px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 text-xs font-bold text-slate-800 hover:text-purple-700 transition-colors"
                      >
                        About Us
                      </Link>
                      <Link
                        href="/contact"
                        className="flex items-center px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 text-xs font-bold text-slate-800 hover:text-purple-700 transition-colors"
                      >
                        Contact Support
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Search Input */}
              <form onSubmit={handleSearchSubmit} className="hidden 2xl:flex items-center relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/80 border border-pink-200/80 text-[11px] text-slate-800 placeholder-purple-400/80 rounded-full py-1.5 pl-8 pr-3 w-28 xl:w-36 focus:w-44 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-pink-200/50 transition-all font-medium shadow-xs"
                />
                <Search className="w-3.5 h-3.5 text-purple-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </form>

              {/* Auth Buttons */}
              {currentUser ? (
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/register"
                    className="bg-white/90 hover:bg-white border border-purple-200 text-purple-700 hover:text-purple-900 font-extrabold text-xs px-3 sm:px-4 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-purple-600" />
                    <span>Registration</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50/80 rounded-full transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <Link
                    href="/login"
                    className="text-xs font-extrabold text-purple-900 hover:text-pink-600 px-2 sm:px-2.5 py-1.5 transition-colors hidden sm:block"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bright-btn-secondary px-3 py-1.5 text-xs hidden sm:flex items-center gap-1.5 font-bold bg-white/90 border-pink-200 hover:bg-white hover:border-purple-400 text-purple-900 shadow-xs rounded-full"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-purple-600" />
                    <span>Registration</span>
                  </Link>
                </div>
              )}

              {/* Main CTA */}
              <Link
                href="/courses"
                className="hidden sm:inline-flex bright-btn-primary px-3.5 lg:px-5 py-2 sm:py-2.5 text-xs font-extrabold shadow-md shadow-pink-500/20 items-center gap-1.5 shrink-0 whitespace-nowrap shine-sweep cursor-pointer"
              >
                <span>Explore Courses 🚀</span>
              </Link>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-purple-900 hover:text-purple-950 rounded-xl bg-white/80 hover:bg-white border border-pink-200/80 shrink-0 flex items-center justify-center transition-colors shadow-xs"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-gradient-to-b from-[#f8c5df]/98 via-[#e6d0f8]/98 to-[#d4c2f4]/98 backdrop-blur-2xl border-b border-purple-300 p-4 sm:p-6 space-y-4 text-sm font-bold text-slate-800 shadow-2xl w-full max-w-full overflow-x-hidden max-h-[calc(100vh-5rem)] overflow-y-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/90 border border-pink-200/80 text-xs text-slate-800 rounded-2xl py-3 pl-10 pr-4 focus:outline-none focus:border-purple-500 focus:bg-white shadow-xs"
              />
              <Search className="w-4 h-4 text-purple-600 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            {/* Mobile Auth Row */}
            <div className="p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-pink-200/70 shadow-xs">
              {currentUser ? (
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-black text-slate-900">{currentUser.name}</div>
                    <div className="text-[10px] text-purple-700 font-bold">{currentUser.role === 'ADMIN' ? 'Administrator' : currentUser.role === 'FACULTY' ? 'Faculty Instructor' : 'Student Account'}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="bright-btn-primary px-3 py-1.5 text-xs font-bold flex items-center gap-1 shadow-xs"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Registration</span>
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-600 bg-white border border-pink-200 rounded-xl"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center bg-white border border-pink-200 text-purple-900 font-extrabold text-xs py-2 rounded-xl shadow-xs"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center bright-btn-primary text-xs py-2 rounded-xl font-extrabold flex items-center justify-center gap-1 shadow-xs"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Registration</span>
                  </Link>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 pt-1">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 transition-colors">
                Home
              </Link>
              {/* Mobile Courses Section with Dropdown Toggle */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Link
                    href="/courses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-purple-600 transition-colors font-bold"
                  >
                    Courses &amp; Bootcamps
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                    className="p-1.5 text-purple-700 hover:text-purple-900 rounded-lg hover:bg-purple-100/50 transition-all"
                    aria-label="Toggle courses list"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileCoursesOpen ? 'rotate-180 text-pink-600' : ''
                      }`}
                    />
                  </button>
                </div>
                {mobileCoursesOpen && (
                  <div className="pl-3 pr-1 py-2 space-y-2 border-l-2 border-pink-200 ml-1 bg-white/70 rounded-r-xl">
                    <Link
                      href="/courses"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-extrabold text-pink-600 hover:text-purple-700 transition-colors"
                    >
                      ✦ View All Certified Training Programs &rarr;
                    </Link>
                    {displayCourses.map((c) => (
                      <Link
                        key={c.id}
                        href={`/courses/${c.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs font-medium text-slate-700 hover:text-purple-700 truncate transition-colors"
                      >
                        • {c.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/domains" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 transition-colors">
                10 Career Domains
              </Link>
              <Link href="/career-finder" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 flex items-center gap-1.5 text-purple-600 font-extrabold transition-colors">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span>Career Path Finder</span>
              </Link>

              <Link href="/placements" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 transition-colors">
                Placements &amp; Success Stories
              </Link>
              <Link href="/skill-passport" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 flex items-center justify-between text-purple-700 font-extrabold transition-colors">
                <span>Student Skill Passport</span>
                <span className="text-[9px] font-black uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
                  Digital Profile
                </span>
              </Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 transition-colors">
                Blog &amp; Resources
              </Link>
              <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 transition-colors">
                Workshops &amp; Events
              </Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 transition-colors">
                About Us
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Static Spacer to maintain exact document flow and eliminate any content overlap */}
      <div className="h-[92px] sm:h-[112px] w-full shrink-0 pointer-events-none" aria-hidden="true" />
    </>
  );
};
