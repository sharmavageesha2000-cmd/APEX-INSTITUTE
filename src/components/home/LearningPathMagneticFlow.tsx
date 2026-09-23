'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  ClipboardCheck,
  CalendarClock,
  Briefcase,
  UsersRound,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface PathStep {
  id: number;
  stepNumber: string;
  title: string;
  subtitle?: string;
  description: string;
  ringColor: string;
  ringGradient: string;
  accentBg: string;
  badgeColor: string;
  iconBg: string;
  iconColor: string;
  glowColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: PathStep[] = [
  {
    id: 1,
    stepNumber: '01',
    title: 'Get Trained',
    description: 'Live instructor-led bootcamps, architectural deep dives & code reviews.',
    ringColor: '#64748b',
    ringGradient: 'from-slate-400 via-slate-500 to-slate-700',
    accentBg: 'bg-slate-50 border-slate-200 text-slate-800',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
    iconBg: 'bg-slate-100/80',
    iconColor: 'text-slate-700',
    glowColor: 'rgba(100, 116, 139, 0.35)',
    icon: GraduationCap,
  },
  {
    id: 2,
    stepNumber: '02',
    title: 'Submit Assignments',
    description: 'Weekly production-grade coding labs with instant feedback & grading.',
    ringColor: '#0d9488',
    ringGradient: 'from-teal-400 via-cyan-500 to-teal-600',
    accentBg: 'bg-teal-50 border-teal-200 text-teal-900',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    glowColor: 'rgba(13, 148, 136, 0.4)',
    icon: ClipboardCheck,
  },
  {
    id: 3,
    stepNumber: '03',
    title: 'Work on Real Life Data Projects',
    description: 'Build enterprise pipelines, big datasets, and industry-grade capstones.',
    ringColor: '#be123c',
    ringGradient: 'from-rose-500 via-red-600 to-rose-700',
    accentBg: 'bg-rose-50 border-rose-200 text-rose-900',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    glowColor: 'rgba(190, 18, 60, 0.4)',
    icon: CalendarClock,
  },
  {
    id: 4,
    stepNumber: '04',
    title: 'Placement Support',
    subtitle: '(Resume preparation, Mock interviews)',
    description: 'ATS resume optimization, 1-on-1 mentor drills & salary negotiation.',
    ringColor: '#d97706',
    ringGradient: 'from-amber-400 via-yellow-500 to-amber-600',
    accentBg: 'bg-amber-50 border-amber-200 text-amber-900',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    glowColor: 'rgba(217, 119, 6, 0.4)',
    icon: Briefcase,
  },
  {
    id: 5,
    stepNumber: '05',
    title: 'Job Readiness',
    description: 'Final portfolio showcase, corporate recruitment drives & direct referrals.',
    ringColor: '#1e293b',
    ringGradient: 'from-slate-700 via-slate-800 to-slate-950',
    accentBg: 'bg-slate-50 border-slate-200 text-slate-900',
    badgeColor: 'bg-slate-900 text-white border-slate-800',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-900',
    glowColor: 'rgba(30, 41, 59, 0.45)',
    icon: UsersRound,
  },
];

export const LearningPathMagneticFlow: React.FC = () => {
  const [openedSteps, setOpenedSteps] = useState<number>(0);
  const [activeHoverId, setActiveHoverId] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const animationTimerRef = useRef<NodeJS.Timeout[]>([]);

  // Function to run slow, sequential magnetic pull-open animation
  const runMagneticPullAnimation = () => {
    // Clear any pending timers
    animationTimerRef.current.forEach(clearTimeout);
    animationTimerRef.current = [];

    // Reset to closed state
    setOpenedSteps(0);
    setIsAnimating(true);

    // Stagger opening briskly and smoothly (140ms gap between each step)
    STEPS.forEach((_, index) => {
      const timer = setTimeout(() => {
        setOpenedSteps(index + 1);
        if (index === STEPS.length - 1) {
          setIsAnimating(false);
        }
      }, (index + 1) * 140);
      animationTimerRef.current.push(timer);
    });
  };

  // Intersection Observer to trigger slow magnetic pull-open when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runMagneticPullAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      animationTimerRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-16 sm:py-24 bg-gradient-to-b from-purple-50/40 via-white to-white border-b border-purple-100/70 relative overflow-hidden"
    >
      {/* Ambient background soft glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-96 rounded-full pointer-events-none opacity-20 blur-3xl -z-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(147, 51, 234, 0.25) 0%, rgba(59, 130, 246, 0.15) 45%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header with Title */}
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100/70 px-3 py-1 rounded-full border border-purple-200/80 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            <span>Career Roadmap &amp; Methodology</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Learning Path
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl leading-relaxed">
            Our industry-calibrated sequence of mastery designed to transform ambitious learners into hiring-ready tech professionals.
          </p>
        </div>

        {/* ── Magnetic Stepped Circles Flow Container ──────────────── */}
        <div className="relative pt-4 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-3 relative items-start">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isOpened = openedSteps > index;
              const isHovered = activeHoverId === step.id;

              // Magnetic Offset Calculation:
              // Closed circles start magnetically compressed towards the previous circle
              // When opened, each slowly pulls apart into its natural place with elastic cubic-bezier
              const magneticClosedOffset = (index - 2) * -36; // compressed toward center
              const currentOffset = isOpened ? 0 : magneticClosedOffset;
              const currentScale = isOpened ? (isHovered ? 1.05 : 1) : 0.72;
              const currentOpacity = isOpened ? 1 : 0.15;
              const currentBlur = isOpened ? 0 : 5;

              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setActiveHoverId(step.id)}
                  onMouseLeave={() => setActiveHoverId(null)}
                  className="flex flex-col items-center text-center relative group"
                  style={{
                    // Snappy, energetic magnetic unfolding transition
                    transform: `translateX(${currentOffset}px) scale(${currentScale})`,
                    opacity: currentOpacity,
                    filter: `blur(${currentBlur}px)`,
                    transition: 'transform 0.42s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.32s ease-out, filter 0.32s ease-out',
                    willChange: 'transform, opacity, filter',
                  }}
                >
                  {/* Connecting Arrow between Circles (Visible on Large Screens) */}
                  {index < STEPS.length - 1 && (
                    <div 
                      className="hidden lg:flex absolute top-14 -right-5 z-20 items-center justify-center text-slate-300 pointer-events-none transition-all duration-300"
                      style={{
                        opacity: openedSteps > index + 1 ? 1 : 0.2,
                        transform: openedSteps > index + 1 ? 'translateX(0) scale(1)' : 'translateX(-6px) scale(0.85)',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.08s',
                      }}
                    >
                      <div className="w-7 h-7 rounded-full bg-white/90 border border-slate-200 shadow-xs flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  )}

                  {/* ── Magnetic Circle Unit ──────────────────────────── */}
                  <div className="relative mb-5 flex items-center justify-center">
                    {/* Outer Ambient Magnetic Glow Ring */}
                    <div
                      className="absolute -inset-2 rounded-full transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle, ${step.glowColor} 0%, transparent 70%)`,
                        filter: 'blur(10px)',
                      }}
                    />

                    {/* Step Number Tag Pill */}
                    <div className="absolute -top-2 z-20">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border shadow-xs tracking-wider transition-all duration-300 ${step.badgeColor}`}>
                        STEP {step.stepNumber}
                      </span>
                    </div>

                    {/* Main Concentric Circle Disc */}
                    <div 
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 flex items-center justify-center shadow-lg transition-all duration-500 relative"
                      style={{
                        background: `linear-gradient(135deg, ${step.ringColor}, #ffffff 60%, ${step.ringColor})`,
                        boxShadow: isHovered 
                          ? `0 15px 30px -5px ${step.glowColor}, 0 0 0 2px ${step.ringColor}` 
                          : `0 8px 20px -4px rgba(0, 0, 0, 0.1)`,
                      }}
                    >
                      {/* Inner Circular Well with 3D Bevel Edge */}
                      <div className="w-full h-full rounded-full bg-white border-2 border-white shadow-inner flex flex-col items-center justify-center relative p-3 group-hover:scale-98 transition-transform duration-300">
                        {/* Subtle inner decorative circular groove */}
                        <div 
                          className="absolute inset-1.5 rounded-full border border-dashed opacity-40 pointer-events-none"
                          style={{ borderColor: step.ringColor }}
                        />

                        {/* Central Icon */}
                        <div className={`p-3 rounded-full ${step.iconBg} ${step.iconColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-xs`}>
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                      </div>

                      {/* Small Orbital Indicator Dot on Ring (matching reference image) */}
                      <div
                        className="absolute w-2.5 h-2.5 rounded-full border-2 border-white shadow-xs"
                        style={{
                          backgroundColor: step.ringColor,
                          top: '12%',
                          right: '12%',
                        }}
                      />
                    </div>
                  </div>

                  {/* ── Text Content Layer ────────────────────────────── */}
                  <div className="space-y-1.5 max-w-[200px] flex flex-col items-center">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-purple-700 transition-colors">
                      {step.title}
                    </h3>

                    {step.subtitle && (
                      <p className="text-[11px] text-slate-500 font-bold italic leading-tight">
                        {step.subtitle}
                      </p>
                    )}

                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Bottom Bracket: Intensive Interview Preparation from Day 1 ── */}
          <div className="mt-10 pt-4 flex flex-col items-center">
            {/* Visual Bracket Line matching the Reference Image */}
            <div className="w-full max-w-4xl flex items-center px-4 sm:px-8">
              {/* Left bracket prong */}
              <div className="h-4 w-2 border-l-2 border-b-2 border-slate-900 rounded-bl-sm shrink-0" />
              {/* Left horizontal arm */}
              <div className="flex-1 h-0.5 bg-slate-900" />
              {/* Central Title Label */}
              <div className="mx-3 sm:mx-6 px-4 py-1.5 bg-slate-900 text-white rounded-xl shadow-md flex items-center gap-2 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-black text-xs sm:text-sm tracking-wide uppercase">
                  Intensive Interview Preparation from Day 1
                </span>
              </div>
              {/* Right horizontal arm */}
              <div className="flex-1 h-0.5 bg-slate-900" />
              {/* Right bracket prong */}
              <div className="h-4 w-2 border-r-2 border-b-2 border-slate-900 rounded-br-sm shrink-0" />
            </div>

            <p className="text-[11px] text-slate-500 font-bold mt-2 text-center">
              DSA problem sets, system design drills, behavioral stories &amp; live whiteboard coding every single week.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
