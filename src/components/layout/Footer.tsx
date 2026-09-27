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
  Instagram,
  Youtube,
  Sparkles,
} from 'lucide-react';
import { ApexLogo } from '../ui/ApexLogo';
import { FooterStarField } from './FooterStarField';

export const Footer = () => {
  return (
    <footer 
      className="relative overflow-hidden border-t border-purple-300/40 pt-16 pb-12 text-xs shadow-inner"
      style={{
        background: 'linear-gradient(to top, #130728 0%, #200c40 18%, #391768 38%, #5d2b99 60%, #8956c8 78%, #baa0e8 92%, #e5d7f8 100%)',
      }}
    >
      {/* Background Animated Small Silver Shining Stars */}
      <FooterStarField />

      {/* Main Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <ApexLogo size="md" showSubtitle={true} theme="dark" />
            </Link>

            <p className="text-white/95 leading-relaxed max-w-sm font-medium drop-shadow-xs">
              Apex Tech Institute is India&apos;s premier job-oriented career accelerator. We empower students and young working professionals through hands-on bootcamps, live cloud labs, senior 1-on-1 mentorship, and corporate placement support.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="bg-white/15 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/25 flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-200 shrink-0" />
                <span>ISO 9001:2026 Certified Institute</span>
              </span>
            </div>

            {/* Social Icons with Authentic Original Brand Colors */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                {
                  name: 'LinkedIn',
                  icon: Linkedin,
                  href: 'https://linkedin.com',
                  bg: 'bg-white',
                  border: 'border-white/80',
                  color: 'text-[#0A66C2]',
                  hoverBg: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]',
                },
                {
                  name: 'Twitter',
                  icon: Twitter,
                  href: 'https://twitter.com',
                  bg: 'bg-white',
                  border: 'border-white/80',
                  color: 'text-[#1DA1F2]',
                  hoverBg: 'hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]',
                },
                {
                  name: 'Facebook',
                  icon: Facebook,
                  href: 'https://facebook.com',
                  bg: 'bg-white',
                  border: 'border-white/80',
                  color: 'text-[#1877F2]',
                  hoverBg: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
                },
                {
                  name: 'Instagram',
                  icon: Instagram,
                  href: 'https://instagram.com',
                  bg: 'bg-white',
                  border: 'border-white/80',
                  color: 'text-[#E1306C]',
                  hoverBg: 'hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white hover:border-transparent',
                  isInstagram: true,
                },
                {
                  name: 'YouTube',
                  icon: Youtube,
                  href: 'https://youtube.com',
                  bg: 'bg-white',
                  border: 'border-white/80',
                  color: 'text-[#FF0000]',
                  hoverBg: 'hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]',
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
                    className={`p-2.5 rounded-xl border ${soc.bg} ${soc.border} ${soc.color} ${soc.hoverBg} transition-all duration-300 shadow-md flex items-center justify-center hover:scale-110 group`}
                  >
                    {soc.isInstagram ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 transition-colors"
                      >
                        <defs>
                          <linearGradient id={`igGrad-${i}`} x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f09433" />
                            <stop offset="25%" stopColor="#e6683c" />
                            <stop offset="50%" stopColor="#dc2743" />
                            <stop offset="75%" stopColor="#cc2366" />
                            <stop offset="100%" stopColor="#bc1888" />
                          </linearGradient>
                        </defs>
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                          stroke={`url(#igGrad-${i})`}
                          className="group-hover:stroke-white transition-colors"
                        />
                        <path
                          d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                          stroke={`url(#igGrad-${i})`}
                          className="group-hover:stroke-white transition-colors"
                        />
                        <line
                          x1="17.5"
                          x2="17.51"
                          y1="6.5"
                          y2="6.5"
                          stroke={`url(#igGrad-${i})`}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          className="group-hover:stroke-white transition-colors"
                        />
                      </svg>
                    ) : (
                      <Icon className="w-4 h-4 transition-colors" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm uppercase tracking-wider drop-shadow-xs">Quick Links</h3>
            <ul className="space-y-2 font-medium text-purple-100/95">
              <li>
                <Link href="/" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Home</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Explore All Courses</Link>
              </li>
              <li>
                <Link href="/domains" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">10 Career Domains</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">About Us</Link>
              </li>
              <li>
                <Link href="/placements" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Placement Record</Link>
              </li>
              <li>
                <Link href="/skill-passport" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 text-purple-100">
                  <span>Student Skill Passport</span>
                  <span className="text-[9px] bg-pink-500 text-white px-1.5 py-0.2 rounded-full border border-pink-400/50 font-bold shadow-xs">NEW</span>
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Success Stories</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Blog & Resources</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Workshops & Events</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Domains */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm uppercase tracking-wider drop-shadow-xs">Popular Domains</h3>
            <ul className="space-y-2 font-medium text-purple-100/95">
              <li>
                <Link href="/domains/information-technology" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Information Technology</Link>
              </li>
              <li>
                <Link href="/domains/ai-machine-learning" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">AI & Machine Learning</Link>
              </li>
              <li>
                <Link href="/domains/data-analytics" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Data & Analytics</Link>
              </li>
              <li>
                <Link href="/domains/digital-marketing" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Digital Marketing</Link>
              </li>
              <li>
                <Link href="/domains/ui-ux-design" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">UI/UX & Product Design</Link>
              </li>
              <li>
                <Link href="/domains/management-business" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Management & Business</Link>
              </li>
              <li>
                <Link href="/domains/finance-accounting" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Finance & Accounting</Link>
              </li>
              <li>
                <Link href="/domains/career-professional-programs" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Career Switch Bootcamps</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Student & Contact Links */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm uppercase tracking-wider drop-shadow-xs">Student Portal</h3>
            <ul className="space-y-2 font-medium text-purple-100/95">
              <li>
                <Link href="/login" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Portal Login (Student & Faculty)</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Student Registration</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Student Dashboard</Link>
              </li>
              <li>
                <Link href="/career-finder" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1 text-pink-300 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                  <span>Career Path Finder</span>
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Course Comparison</Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Global Search</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="pt-8 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-4 text-white font-medium">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-purple-200 shrink-0" />
            </div>
            <span className="text-white drop-shadow-xs">Apex Tower, Outer Ring Road, HSR Layout, Bangalore 560102</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-emerald-300 shrink-0" />
            </div>
            <span className="text-white drop-shadow-xs">Hotline: +91 9876543210 • Mon-Sat 9 AM - 8 PM</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-pink-300 shrink-0" />
            </div>
            <span className="text-white drop-shadow-xs">Support: contact@apexinstitute.com</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-purple-200/90 font-medium text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Apex Tech Institute. All rights reserved. ISO 9001:2026 Certified Educational Provider.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2 font-semibold text-center sm:text-right">
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">XML Sitemap</Link>
            <Link href="/robots.txt" className="hover:text-white transition-colors">Robots.txt</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};


