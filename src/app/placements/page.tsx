import React from 'react';
import Link from 'next/link';
import {
  Award,
  TrendingUp,
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Sparkles,
  FileCheck,
  MessageSquare,
  UserCheck,
  LineChart,
} from 'lucide-react';
import { getReviews } from '@/lib/store';

export default async function PlacementsPage() {
  const reviews = await getReviews();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-pink-700 bg-pink-100 px-3.5 py-1.5 rounded-full border border-pink-200">
          <Award className="w-4 h-4 text-pink-600" />
          <span>Dedicated Placement & Career Cell</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
          Real Skills. Proven Corporate Placements.
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
          Our placement acceleration model prepares you to crack technical interviews at tier-1 enterprise firms and high-growth tech unicorns.
        </p>
      </div>

      {/* Realistic Placement Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-black text-slate-900">40+</div>
          <div className="text-xs text-slate-500 font-bold">Corporate Hiring Partners</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-black text-purple-700">₹6.5 LPA</div>
          <div className="text-xs text-slate-500 font-bold">Average Salary CTC</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-black text-pink-600">₹18.0 LPA</div>
          <div className="text-xs text-slate-500 font-bold">Highest Package Secured</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md text-center space-y-1">
          <div className="text-3xl sm:text-4xl font-black text-emerald-600">94%</div>
          <div className="text-xs text-slate-500 font-bold">Career Transition Success</div>
        </div>
      </div>

      {/* 6-Step Placement Process */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Our 6-Step Placement Acceleration Process
          </h2>
          <p className="text-xs text-slate-500 max-w-xl mx-auto font-medium">
            From Day 1 to your job offer letter, our senior career coaches guide you through every milestone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Practical Project Assessment',
              desc: 'Build 4+ real-world microservices & SaaS applications hosted live on production cloud environments.',
              icon: FileCheck,
            },
            {
              step: '02',
              title: 'Portfolio & GitHub Overhaul',
              desc: 'Format your code repositories, clean commit history, and showcase high-impact architecture diagrams.',
              icon: Sparkles,
            },
            {
              step: '03',
              title: 'ATS-Optimized Resume Tuning',
              desc: 'Custom resume formatting designed to clear enterprise ATS screening bots at Amazon, Swiggy, and Razorpay.',
              icon: Briefcase,
            },
            {
              step: '04',
              title: 'Mock Technical Drills',
              desc: 'Rigorous 1-on-1 coding rounds, System Design whiteboarding, and HR interview practice sessions.',
              icon: UserCheck,
            },
            {
              step: '05',
              title: 'Direct Hiring Referrals',
              desc: 'Direct resume submissions to engineering hiring managers across our 40+ partner tech companies.',
              icon: Building2,
            },
            {
              step: '06',
              title: 'Salary Offer Negotiation',
              desc: 'Expert guidance on evaluating compensation packages, CTC breakdowns, and maximizing initial offers.',
              icon: LineChart,
            },
          ].map((proc, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-3 relative">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center border border-purple-200">
                  <proc.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-black text-slate-400">STEP {proc.step}</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{proc.title}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{proc.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hiring Partners Marquee */}
      <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-md space-y-6 text-center">
        <div className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
          Our Graduates Work At Industry Leaders
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Amazon */}
          <div className="px-4 py-2.5 rounded-xl bg-[#232F3E] text-white border border-slate-700 shadow-sm flex items-center gap-1.5 transition-transform hover:scale-105">
            <span className="font-bold text-sm tracking-tighter text-white">amazon</span>
            <svg className="w-4 h-3 text-[#FF9900]" viewBox="0 0 24 16" fill="currentColor">
              <path d="M1 9c6 6 16 6 22 0M18 6l5 3-3 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          {/* Microsoft */}
          <div className="px-4 py-2.5 rounded-xl bg-white text-slate-800 border border-slate-200 shadow-sm flex items-center gap-2 transition-transform hover:scale-105">
            <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 shrink-0">
              <div className="bg-[#F25022] w-1.5 h-1.5 rounded-[0.5px]"></div>
              <div className="bg-[#7FBA00] w-1.5 h-1.5 rounded-[0.5px]"></div>
              <div className="bg-[#00A4EF] w-1.5 h-1.5 rounded-[0.5px]"></div>
              <div className="bg-[#FFB900] w-1.5 h-1.5 rounded-[0.5px]"></div>
            </div>
            <span className="font-semibold text-sm text-slate-800">Microsoft</span>
          </div>

          {/* Swiggy */}
          <div className="px-4 py-2.5 rounded-xl bg-[#FC8019] text-white border border-orange-600 shadow-sm flex items-center gap-2 transition-transform hover:scale-105">
            <svg className="w-4 h-4 text-white fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
            </svg>
            <span className="font-black text-xs uppercase tracking-wider text-white">SWIGGY</span>
          </div>

          {/* Zomato */}
          <div className="px-4 py-2.5 rounded-xl bg-[#E23744] text-white border border-red-600 shadow-sm flex items-center gap-1.5 transition-transform hover:scale-105">
            <span className="font-black text-base italic tracking-tighter lowercase text-white">zomato</span>
          </div>

          {/* Deloitte */}
          <div className="px-4 py-2.5 rounded-xl bg-black text-white border border-slate-800 shadow-sm flex items-center gap-1 transition-transform hover:scale-105">
            <span className="font-bold text-sm tracking-tight text-white">Deloitte</span>
            <span className="w-2 h-2 rounded-full bg-[#86BC25] inline-block ml-0.5"></span>
          </div>

          {/* Razorpay */}
          <div className="px-4 py-2.5 rounded-xl bg-[#02042B] text-white border border-blue-900 shadow-sm flex items-center gap-1 transition-transform hover:scale-105">
            <svg className="w-4 h-4 text-[#3395FF] fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M13 2L3 14h7v8l10-12h-7z" />
            </svg>
            <span className="font-black text-sm text-white">Razor</span>
            <span className="font-black text-sm text-[#3395FF]">pay</span>
          </div>

          {/* CRED */}
          <div className="px-4 py-2.5 rounded-xl bg-[#121212] text-white border border-slate-800 shadow-sm flex items-center gap-2 transition-transform hover:scale-105">
            <div className="w-4 h-4 border-2 border-white rounded flex items-center justify-center text-[10px] font-black text-white">
              C
            </div>
            <span className="font-black text-xs tracking-[0.2em] text-white">CRED</span>
          </div>

          {/* Uber */}
          <div className="px-4 py-2.5 rounded-xl bg-black text-white border border-slate-800 shadow-sm flex items-center gap-2 transition-transform hover:scale-105">
            <span className="font-black text-sm tracking-wide text-white">Uber</span>
          </div>

          {/* Flipkart */}
          <div className="px-4 py-2.5 rounded-xl bg-[#2874F0] text-white border border-blue-700 shadow-sm flex items-center gap-1.5 transition-transform hover:scale-105">
            <span className="bg-[#FFE500] text-[#2874F0] font-black text-xs px-1.5 py-0.2 rounded italic">f</span>
            <span className="font-black text-sm italic text-white">Flipkart</span>
          </div>

          {/* Paytm */}
          <div className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-0.5 transition-transform hover:scale-105">
            <span className="text-[#002E6E] font-black text-sm">Pay</span>
            <span className="text-[#00BAF2] font-black text-sm">tm</span>
          </div>

          {/* KPMG */}
          <div className="px-4 py-2.5 rounded-xl bg-[#00338D] text-white border border-blue-900 shadow-sm flex items-center gap-2 transition-transform hover:scale-105">
            <span className="font-black text-sm tracking-widest text-white">KPMG</span>
          </div>

          {/* Accenture */}
          <div className="px-4 py-2.5 rounded-xl bg-white text-slate-900 border border-purple-200 shadow-sm flex items-center gap-1 transition-transform hover:scale-105">
            <span className="font-bold text-sm tracking-tight lowercase text-slate-900">accenture</span>
            <span className="text-[#A100FF] font-black text-base leading-none">&gt;</span>
          </div>
        </div>
      </div>

      {/* Student Success Testimonial Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-slate-900">Student Placement Success Stories</h2>
          <Link href="/success-stories" className="text-xs text-purple-700 hover:underline font-bold">
            View All Stories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Placed at {rev.company || 'Tech Unicorn'}
                </span>
                <span className="text-xs text-slate-500 font-medium">{rev.userRole}</span>
              </div>

              <p className="text-xs text-slate-700 font-medium italic leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="font-extrabold text-slate-900">{rev.userName}</div>
                <div className="text-purple-700 font-semibold">{rev.courseTitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border border-purple-200 p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Ready to Accelerate Your Tech Career?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
          Schedule a 1-on-1 career consultation with our senior placement director to map your target salary and job strategy.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bright-btn-primary font-bold px-8 py-3.5 text-xs transition-all"
        >
          <span>Talk to Placement Counselor</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
