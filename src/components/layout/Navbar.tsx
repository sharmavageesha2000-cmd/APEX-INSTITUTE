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
  LayoutDashboard,
  Menu,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Domain, User } from '@/lib/types';
import { DynamicIcon } from '../ui/IconHelper';
import { ApexLogo } from '../ui/ApexLogo';

interface NavbarProps {
  domains?: Domain[];
}

export const Navbar: React.FC<NavbarProps> = ({ domains = [] }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [domainDropdown, setDomainDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setCurrentUser(data.user);
      })
      .catch(() => {});
  }, [pathname]);

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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-purple-100 transition-all shadow-sm">
      {/* Bright Gradient Top Notice Banner */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white text-xs py-2 px-4 text-center font-bold flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
        <span>⚡ Learn Today. Build Skills. Shape Your Future &mdash; Up to 35% Scholarship Discount</span>
        <Link href="/contact" className="underline font-black text-amber-300 hover:text-white ml-2">
          Claim Scholarship &rarr;
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <ApexLogo size="md" showSubtitle={true} />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-bold text-slate-700">
            <Link
              href="/"
              className={`transition-colors ${pathname === '/' ? 'text-purple-600 font-extrabold' : 'hover:text-purple-600'}`}
            >
              Home
            </Link>

            <Link
              href="/courses"
              className={`transition-colors ${pathname === '/courses' ? 'text-purple-600 font-extrabold' : 'hover:text-purple-600'}`}
            >
              Courses
            </Link>

            {/* Domains Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setDomainDropdown(true)}
              onMouseLeave={() => setDomainDropdown(false)}
            >
              <Link
                href="/domains"
                className={`flex items-center gap-1 transition-colors ${
                  pathname.startsWith('/domains') ? 'text-purple-600 font-extrabold' : 'hover:text-purple-600'
                }`}
              >
                <span>Domains</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </Link>

              {domainDropdown && (
                <div className="absolute left-0 top-full pt-2 w-[420px] rounded-3xl overflow-hidden shadow-2xl z-50">
                  <div className="p-4 space-y-1 bg-white border border-purple-100 rounded-3xl shadow-2xl">
                    <div className="text-[11px] font-extrabold text-purple-700 uppercase tracking-wider px-3 py-1 mb-2">
                      10 Major Career Domains
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {domains.map((dom) => (
                        <Link
                          key={dom.id}
                          href={`/domains/${dom.slug}`}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-purple-50 transition-all text-xs font-bold text-slate-800 hover:text-purple-700"
                        >
                          <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
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
              className={`flex items-center gap-1.5 transition-colors ${
                pathname === '/career-finder' ? 'text-purple-600 font-extrabold' : 'hover:text-purple-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
              <span>Career Path</span>
            </Link>

            <Link
              href="/placements"
              className={`transition-colors ${pathname === '/placements' ? 'text-purple-600 font-extrabold' : 'hover:text-purple-600'}`}
            >
              Placements
            </Link>

            <Link
              href="/blog"
              className={`transition-colors ${pathname === '/blog' ? 'text-purple-600 font-extrabold' : 'hover:text-purple-600'}`}
            >
              Blog
            </Link>

            <Link
              href="/events"
              className={`transition-colors ${pathname === '/events' ? 'text-purple-600 font-extrabold' : 'hover:text-purple-600'}`}
            >
              Events
            </Link>

            <Link
              href="/about"
              className={`transition-colors ${pathname === '/about' ? 'text-purple-600 font-extrabold' : 'hover:text-purple-600'}`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`transition-colors ${pathname === '/contact' ? 'text-purple-600 font-extrabold' : 'hover:text-purple-600'}`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-100 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 rounded-full py-2 pl-9 pr-4 w-44 focus:w-56 focus:outline-none focus:border-purple-500 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-purple-600 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            {/* Auth Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  href={currentUser.role === 'ADMIN' ? '/admin' : '/dashboard'}
                  className="bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-extrabold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 transition-all"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-purple-600" />
                  <span className="hidden sm:inline">
                    {currentUser.role === 'ADMIN' ? 'Admin CMS' : 'Dashboard'}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs font-extrabold text-slate-700 hover:text-purple-700 px-3 py-2 transition-colors hidden sm:block"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bright-btn-secondary px-4 py-2 text-xs hidden sm:block"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Main CTA */}
            <Link
              href="/courses"
              className="bright-btn-primary px-5 py-2.5 text-xs shadow-md shadow-pink-500/20 flex items-center gap-1.5"
            >
              <span>Explore Courses 🚀</span>
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-slate-900 rounded-xl bg-slate-100 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-purple-100 p-6 space-y-4 text-sm font-bold text-slate-800 shadow-xl">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 text-xs text-slate-800 rounded-2xl py-3 pl-10 pr-4"
            />
            <Search className="w-4 h-4 text-purple-600 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="flex flex-col gap-3 pt-2">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600">
              Home
            </Link>
            <Link href="/courses" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600">
              Explore All Courses
            </Link>
            <Link href="/domains" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600">
              10 Career Domains
            </Link>
            <Link href="/career-finder" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 flex items-center gap-1.5 text-purple-600 font-extrabold">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Career Path Finder</span>
            </Link>
            <Link href="/placements" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600">
              Placements & Success Stories
            </Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600">
              Blog & Resources
            </Link>
            <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600">
              Workshops & Events
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600">
              About Us
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600">
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
