'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Building2, Award, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Users, GraduationCap, Eye } from 'lucide-react';
import { ApexLogo } from '../ui/ApexLogo';

export const AboutSplitPanel: React.FC = () => {
  const [isUnveiled, setIsUnveiled] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Reveal when section is scrolled down into the main viewport area
      // Collapse back when scrolled back up towards top of page
      if (rect.top < viewportHeight * 0.7 && rect.bottom > 150) {
        setIsUnveiled(true);
      } else if (rect.top >= viewportHeight * 0.7) {
        setIsUnveiled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on load

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div
        className="group relative playful-card p-5 sm:p-10 bg-gradient-to-br from-white via-purple-50/70 to-pink-50/50 border border-purple-200/90 shadow-2xl rounded-3xl sm:rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-700"
        onMouseEnter={() => setIsUnveiled(true)}
        onClick={() => setIsUnveiled(!isUnveiled)}
      >
        {/* Background Ambient Glowing Mesh */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] mesh-orb-purple pointer-events-none rounded-full animate-pulse-glow" />
        <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] mesh-orb-pink pointer-events-none rounded-full animate-float" />

        {/* Top Header Badge */}
        <div className="text-center mb-6 relative z-40 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-3 sm:px-4 py-1.5 rounded-full border border-purple-200 shadow-sm animate-float">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-600 animate-spin shrink-0" />
            <span className="sm:hidden">Discover Apex Institute</span>
            <span className="hidden sm:inline">Discover Apex Institute of Technology</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-purple-600 font-extrabold tracking-widest uppercase flex items-center justify-center gap-1">
            <Eye className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            <span>
              {isUnveiled
                ? '✦ Scroll Reveal Active • Mock Interview & Classroom Separated ✦'
                : 'Scroll down to separate images & reveal about us'}
            </span>
          </p>
        </div>

        {/* Interactive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-20 min-h-[380px]">
          {/* Left Image: Real Corporate Job Interview Session */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 ease-out transform ${
              isUnveiled
                ? 'lg:translate-x-0 lg:-rotate-3 scale-100 z-20 opacity-100'
                : 'lg:translate-x-[120%] lg:rotate-3 scale-105 z-30 shadow-2xl opacity-100'
            }`}
          >
            <div className="relative rounded-[2.2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group/img">
              {/* Top Banner with Apex Logo & Badge */}
              <div className="absolute top-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-purple-200 shadow-lg flex items-center justify-between z-30">
                <ApexLogo size="sm" showSubtitle={false} />
                <span className="text-[8px] font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200 uppercase tracking-widest">
                  PLACEMENT CELL
                </span>
              </div>

              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="1-on-1 Corporate Tech Interview & Placement Prep at Apex Institute"
                className="w-full h-72 sm:h-84 lg:h-[380px] object-cover group-hover/img:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-pink-300 uppercase tracking-widest">
                  <Award className="w-3.5 h-3.5 text-pink-400" />
                  <span>Mock Interview Prep</span>
                </div>
                <div className="text-base font-black text-white leading-tight">1-on-1 Tech Interview</div>
                <div className="text-xs text-slate-300 font-semibold">Real Corporate Interview Simulation</div>
              </div>
            </div>
          </div>

          {/* Center Content: About Us Text emerging in between */}
          <div
            className={`lg:col-span-6 text-center space-y-6 transition-all duration-1000 ease-out ${
              isUnveiled
                ? 'opacity-100 scale-100 translate-y-0 blur-none z-30 delay-100'
                : 'opacity-100 scale-100 translate-y-0 lg:opacity-0 lg:scale-90 lg:translate-y-6 lg:blur-sm lg:pointer-events-none'
            }`}
          >
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                Empowering Next-Gen <br />
                <span className="gradient-text-bright">Tech Pioneers & Industry Leaders</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-lg mx-auto leading-relaxed">
                Apex Institute is a premier career mastery academy dedicated to transforming ambitious learners into job-ready software architects, AI engineers, and cloud specialists through 100% practical live projects.
              </p>
            </div>

            {/* Eye-Catchy Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-xl mx-auto">
              <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-purple-100 shadow-md space-y-1 hover:border-pink-300 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-purple-700">
                  <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                  <span>100% Live Labs</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-normal">
                  Hands-on real-world production projects & cloud sandbox environment.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-purple-100 shadow-md space-y-1 hover:border-pink-300 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-purple-700">
                  <Users className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Expert Mentors</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-normal">
                  Taught by ex-Google, Amazon & Fortune 500 senior tech leads.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-purple-100 shadow-md space-y-1 hover:border-pink-300 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-purple-700">
                  <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Placement Call</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-normal">
                  100+ hiring corporate partners with dedicated interview prep.
                </p>
              </div>
            </div>

            {/* Key Metrics Pills */}
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap text-[11px] sm:text-xs font-bold pt-1">
              <span className="bg-purple-100 text-purple-800 border border-purple-200 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
                <span>10+ Years Excellence</span>
              </span>
              <span className="bg-pink-100 text-pink-800 border border-pink-200 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-600" />
                <span>ISO 9001 Certified</span>
              </span>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                <span>1000+ Placed Students</span>
              </span>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/about"
                className="bright-btn-primary px-8 py-3.5 text-xs sm:text-sm font-black inline-flex items-center gap-2 shadow-xl shadow-pink-500/25 shine-sweep"
              >
                <span>Learn More About Apex Institute</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Image: Smart Classroom with Expert Teaching */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 ease-out transform ${
              isUnveiled
                ? 'lg:translate-x-0 lg:rotate-3 scale-100 z-20 opacity-100'
                : 'lg:-translate-x-[120%] lg:-rotate-3 scale-95 z-20 shadow-xl opacity-90'
            }`}
          >
            <div className="relative rounded-[2.2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group/img">
              <img
                src="/images/apex_smart_classroom.png"
                alt="Apex Smart Classroom with Expert Tech Mentor Teaching"
                className="w-full h-72 sm:h-84 lg:h-[380px] object-cover group-hover/img:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-pink-300 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>Smart Classroom</span>
                </div>
                <div className="text-base font-black text-white leading-tight">Live Interactive Studio</div>
                <div className="text-xs text-slate-300 font-semibold">Expert Mentor Live Session</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

