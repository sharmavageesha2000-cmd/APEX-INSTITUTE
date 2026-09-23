'use client';

import React, { useState } from 'react';
import { Building2, Sparkles, Award, ShieldCheck, ArrowRight, Briefcase } from 'lucide-react';
import Link from 'next/link';

export const TOP_HIRING_PARTNERS = [
  { name: 'Google', category: 'Tech Giant', color: 'from-red-500 via-amber-500 to-blue-600', roles: 'AI & Full Stack', hiringType: 'Product Engineering' },
  { name: 'Amazon', category: 'Cloud & E-Com', color: 'from-amber-500 to-orange-600', roles: 'AWS & Backend', hiringType: 'SDE-1 & Cloud Ops' },
  { name: 'Microsoft', category: 'Enterprise AI', color: 'from-blue-600 to-cyan-500', roles: 'Azure & GenAI', hiringType: 'Cloud Architect' },
  { name: 'Accenture', category: 'IT Services', color: 'from-purple-600 to-pink-600', roles: 'Cloud & DevOps', hiringType: 'Associate Engineer' },
  { name: 'JPMorgan Chase', category: 'Global FinTech', color: 'from-blue-800 to-indigo-900', roles: 'Full Stack & Data', hiringType: 'FinTech Developer' },
  { name: 'HCL Technologies', category: 'MNC Enterprise', color: 'from-indigo-600 to-blue-600', roles: 'DevOps & Cyber', hiringType: 'Cloud Engineer' },
  { name: 'Capgemini', category: 'Digital Tech', color: 'from-cyan-600 to-blue-700', roles: 'Software & QA', hiringType: 'Associate SDE' },
  { name: 'Deloitte', category: 'Strategy & Audit', color: 'from-emerald-600 to-teal-700', roles: 'Analytics & Finance', hiringType: 'Data Analyst' },
  { name: 'TCS', category: 'Tata Consultancy', color: 'from-blue-700 to-sky-600', roles: 'Full Stack & System', hiringType: 'Systems Engineer' },
  { name: 'Infosys', category: 'Global Services', color: 'from-blue-600 to-indigo-700', roles: 'Java & Cloud', hiringType: 'Power Programmer' },
  { name: 'Wipro', category: 'Digital Solutions', color: 'from-violet-600 to-purple-600', roles: 'DevOps & Testing', hiringType: 'Project Engineer' },
  { name: 'Swiggy', category: 'Unicorn Consumer', color: 'from-orange-500 to-amber-600', roles: 'Product & Full Stack', hiringType: 'Backend Engineer' },
  { name: 'Zomato', category: 'FoodTech Unicorn', color: 'from-red-600 to-rose-600', roles: 'UI/UX & Mobile', hiringType: 'Product Designer' },
  { name: 'Razorpay', category: 'FinTech Unicorn', color: 'from-blue-600 to-indigo-600', roles: 'Design & Engineering', hiringType: 'Design Systems Lead' },
  { name: 'Flipkart', category: 'E-Commerce Tech', color: 'from-blue-500 to-amber-500', roles: 'Backend & Data', hiringType: 'Software Engineer' },
  { name: 'Cognizant', category: 'IT Engineering', color: 'from-blue-700 to-cyan-600', roles: 'Full Stack & Cloud', hiringType: 'Programmer Analyst' },
  { name: 'IBM', category: 'Enterprise Cloud', color: 'from-blue-600 to-slate-800', roles: 'AI & Cloud Infrastructure', hiringType: 'AI Developer' },
  { name: 'Oracle', category: 'Database & Cloud', color: 'from-red-600 to-amber-700', roles: 'SQL & Database', hiringType: 'Database Analyst' },
  { name: 'Zoho', category: 'SaaS Giant', color: 'from-green-600 to-teal-600', roles: 'Full Stack & SEO', hiringType: 'Software Developer' },
  { name: 'Cisco', category: 'Networking Tech', color: 'from-sky-600 to-blue-700', roles: 'Cyber & Networks', hiringType: 'Security Analyst' },
  { name: 'Intel', category: 'Hardware & AI', color: 'from-blue-600 to-sky-500', roles: 'AI & Python', hiringType: 'AI Systems Engineer' },
  { name: 'Tech Mahindra', category: 'Telecom & IT', color: 'from-rose-600 to-pink-600', roles: 'Cloud & QA', hiringType: 'Software Associate' },
];

// Duplicate for continuous marquee loops
const ROW1 = [...TOP_HIRING_PARTNERS.slice(0, 11), ...TOP_HIRING_PARTNERS.slice(0, 11)];
const ROW2 = [...TOP_HIRING_PARTNERS.slice(11), ...TOP_HIRING_PARTNERS.slice(11)];

export const TopHiringPartnersPanel: React.FC = () => {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  return (
    <div className="space-y-10 overflow-hidden pt-4 pb-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Our Top Hiring Partners
        </h2>
      </div>

      {/* Dual Interactive Marquee Tracks */}
      <div className="relative w-full overflow-hidden space-y-4 py-2">
        {/* Left & Right Gradient Shadows */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 lg:w-32 bg-gradient-to-r from-[#e8d5f7] via-[#e8d5f7]/85 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 lg:w-32 bg-gradient-to-l from-[#e8d5f7] via-[#e8d5f7]/85 to-transparent z-20 pointer-events-none" />

        {/* Row 1 — Moving Left */}
        <div className="w-full">
          <div className="marquee-track gap-4">
            {ROW1.map((p, i) => (
              <div
                key={`r1-${i}`}
                onMouseEnter={() => setHoveredPartner(p.name)}
                onMouseLeave={() => setHoveredPartner(null)}
                className="shrink-0 group playful-card p-3.5 sm:p-4 px-4 sm:px-6 border-purple-100/80 bg-white hover:border-pink-400 hover:shadow-xl hover:shadow-pink-500/15 transition-all duration-300 rounded-[1.8rem] flex items-center gap-3.5 sm:gap-4 cursor-pointer hover:-translate-y-1"
              >
                {/* Badge Icon / Logo Initial */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-black text-sm sm:text-base shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                  {p.name.substring(0, 2).toUpperCase()}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm group-hover:text-purple-700 transition-colors">
                      {p.name}
                    </span>
                    <span className="text-[9px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                      {p.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-pink-500" />
                    <span>Hiring: <strong className="text-slate-800">{p.roles}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — Moving Right (Reverse) */}
        <div className="w-full">
          <div className="marquee-track-reverse gap-4">
            {ROW2.map((p, i) => (
              <div
                key={`r2-${i}`}
                onMouseEnter={() => setHoveredPartner(p.name)}
                onMouseLeave={() => setHoveredPartner(null)}
                className="shrink-0 group playful-card p-3.5 sm:p-4 px-4 sm:px-6 border-purple-100/80 bg-white hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/15 transition-all duration-300 rounded-[1.8rem] flex items-center gap-3.5 sm:gap-4 cursor-pointer hover:-translate-y-1"
              >
                {/* Badge Icon / Logo Initial */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-black text-sm sm:text-base shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                  {p.name.substring(0, 2).toUpperCase()}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm group-hover:text-purple-700 transition-colors">
                      {p.name}
                    </span>
                    <span className="text-[9px] font-black text-pink-700 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                      {p.hiringType}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-500" />
                    <span>Roles: <strong className="text-slate-800">{p.roles}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Trust Panel */}
      <div id="salary-metrics-panel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="playful-card p-6 sm:p-8 bg-white/95 rounded-3xl sm:rounded-[2.5rem] border-2 border-purple-200/90 shadow-xl relative overflow-hidden">
          {/* Subtle ambient decorative accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 blur-[90px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 blur-[90px] pointer-events-none rounded-full" />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center relative z-10">
            {/* Metric 1: Highest Salary */}
            <div className="space-y-1.5 p-3 rounded-2xl hover:bg-emerald-50/60 transition-colors">
              <div className="text-3xl sm:text-5xl font-black text-emerald-800 tracking-tight">
                ₹15 LPA
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                Highest Salary Package
              </div>
              <p className="text-[11px] font-bold text-slate-700">Top Tier Product &amp; AI Engineering Offers</p>
            </div>

            {/* Metric 2: Average Salary */}
            <div className="space-y-1.5 p-3 rounded-2xl hover:bg-amber-50/60 transition-colors border-t sm:border-t-0 sm:border-l border-purple-200 pt-4 sm:pt-3">
              <div className="text-3xl sm:text-5xl font-black text-amber-800 tracking-tight">
                ₹6.8 LPA
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                Average Salary Package
              </div>
              <p className="text-[11px] font-bold text-slate-700">Across Full-Stack, Data &amp; Cloud Batches</p>
            </div>

            {/* Metric 3: Placement Call Support */}
            <div className="space-y-1.5 p-3 rounded-2xl hover:bg-purple-50/60 transition-colors border-t sm:border-t-0 sm:border-l border-purple-200 pt-4 sm:pt-3">
              <div className="text-3xl sm:text-5xl font-black text-purple-900 tracking-tight">
                100%
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                Placement Call Support
              </div>
              <p className="text-[11px] font-bold text-slate-700">Guaranteed Mock Drives &amp; Referrals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
