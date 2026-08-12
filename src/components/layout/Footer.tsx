import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Sparkles,
} from 'lucide-react';
import { ApexLogo } from '../ui/ApexLogo';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-purple-100 pt-16 pb-12 text-xs text-slate-600 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/">
              <ApexLogo size="md" showSubtitle={true} />
            </Link>

            <p className="text-slate-600 leading-relaxed max-w-sm font-medium">
              Apex Tech Institute is India&apos;s premier job-oriented career accelerator. We empower students and young working professionals through hands-on bootcamps, live cloud labs, senior 1-on-1 mentorship, and corporate placement support.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-3 py-1 rounded-full border border-purple-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>ISO 9001:2026 Certified Institute</span>
              </span>
            </div>

            {/* Social Icons with Authentic Brand Colors */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                {
                  name: 'LinkedIn',
                  icon: Linkedin,
                  href: 'https://linkedin.com',
                  bg: 'bg-[#0A66C2]/10 hover:bg-[#0A66C2]',
                  border: 'border-[#0A66C2]/30',
                  color: 'text-[#0A66C2] hover:text-white',
                },
                {
                  name: 'Twitter',
                  icon: Twitter,
                  href: 'https://twitter.com',
                  bg: 'bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]',
                  border: 'border-[#1DA1F2]/30',
                  color: 'text-[#1DA1F2] hover:text-white',
                },
                {
                  name: 'Facebook',
                  icon: Facebook,
                  href: 'https://facebook.com',
                  bg: 'bg-[#1877F2]/10 hover:bg-[#1877F2]',
                  border: 'border-[#1877F2]/30',
                  color: 'text-[#1877F2] hover:text-white',
                },
                {
                  name: 'YouTube',
                  icon: Youtube,
                  href: 'https://youtube.com',
                  bg: 'bg-[#FF0000]/10 hover:bg-[#FF0000]',
                  border: 'border-[#FF0000]/30',
                  color: 'text-[#FF0000] hover:text-white',
                },
              ].map((soc, i) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={i}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    title={soc.name}
                    aria-label={soc.name}
                    className={`p-2.5 rounded-xl border transition-all duration-300 shadow-xs flex items-center justify-center ${soc.bg} ${soc.border} ${soc.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 font-bold text-slate-600">
              <li>
                <Link href="/" className="hover:text-purple-700 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-purple-700 transition-colors">Explore All Courses</Link>
              </li>
              <li>
                <Link href="/domains" className="hover:text-purple-700 transition-colors">10 Career Domains</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-purple-700 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/placements" className="hover:text-purple-700 transition-colors">Placement Record</Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-purple-700 transition-colors">Success Stories</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-purple-700 transition-colors">Blog & Resources</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-purple-700 transition-colors">Workshops & Events</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-700 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Domains */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Popular Domains</h3>
            <ul className="space-y-2 font-bold text-slate-600">
              <li>
                <Link href="/domains/information-technology" className="hover:text-purple-700 transition-colors">Information Technology</Link>
              </li>
              <li>
                <Link href="/domains/ai-machine-learning" className="hover:text-purple-700 transition-colors">AI & Machine Learning</Link>
              </li>
              <li>
                <Link href="/domains/data-analytics" className="hover:text-purple-700 transition-colors">Data & Analytics</Link>
              </li>
              <li>
                <Link href="/domains/digital-marketing" className="hover:text-purple-700 transition-colors">Digital Marketing</Link>
              </li>
              <li>
                <Link href="/domains/ui-ux-design" className="hover:text-purple-700 transition-colors">UI/UX & Product Design</Link>
              </li>
              <li>
                <Link href="/domains/management-business" className="hover:text-purple-700 transition-colors">Management & Business</Link>
              </li>
              <li>
                <Link href="/domains/finance-accounting" className="hover:text-purple-700 transition-colors">Finance & Accounting</Link>
              </li>
              <li>
                <Link href="/domains/career-professional-programs" className="hover:text-purple-700 transition-colors">Career Switch Bootcamps</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Student & Contact Links */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Student Portal</h3>
            <ul className="space-y-2 font-bold text-slate-600">
              <li>
                <Link href="/login" className="hover:text-purple-700 transition-colors">Student Login</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-purple-700 transition-colors">Student Registration</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-purple-700 transition-colors">Student Dashboard</Link>
              </li>
              <li>
                <Link href="/career-finder" className="hover:text-purple-700 transition-colors flex items-center gap-1 text-purple-700 font-extrabold">
                  <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                  <span>Career Path Finder</span>
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-purple-700 transition-colors">Course Comparison</Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-purple-700 transition-colors">Global Search</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-700 transition-colors">Admin Portal</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-700 font-bold">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
            <span>Apex Tower, Outer Ring Road, HSR Layout, Bangalore 560102</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Hotline: +91 9876543210 • Mon-Sat 9 AM - 8 PM</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-pink-600 shrink-0" />
            <span>Support: contact@apexinstitute.com</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} Apex Tech Institute. All rights reserved. ISO 9001:2026 Certified Educational Provider.
          </div>
          <div className="flex gap-4 font-bold">
            <Link href="/sitemap.xml" className="hover:underline">XML Sitemap</Link>
            <Link href="/robots.txt" className="hover:underline">Robots.txt</Link>
            <Link href="/contact" className="hover:underline">Privacy Policy</Link>
            <Link href="/contact" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
