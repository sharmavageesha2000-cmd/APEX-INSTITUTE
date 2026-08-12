import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  BookOpen,
  BadgeCheck,
  Laptop,
  Briefcase,
  Star,
  Target,
  Clock,
  Compass,
} from 'lucide-react';

export default function AboutPage() {
  const keyFeatures = [
    {
      title: '100% Practical & Lab-Driven',
      desc: 'No passive lectures. Every single module is accompanied by hands-on labs, real code repositories, and production capstones.',
      icon: Zap,
      color: 'bg-purple-100 text-purple-700 border-purple-200',
    },
    {
      title: '1-on-1 Mentorship & Doubt Clearance',
      desc: 'Direct daily access to senior engineering leads for code reviews, architecture discussions, and immediate doubt clearance.',
      icon: Users,
      color: 'bg-pink-100 text-pink-700 border-pink-200',
    },
    {
      title: 'Dedicated Placement Cell',
      desc: 'Resume ATS tuning, LinkedIn optimization, 10+ mock technical interviews, and referral access to 40+ top tier-1 hiring partners.',
      icon: Briefcase,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      title: 'Cloud Sandbox & AI Tools Access',
      desc: 'Free access to cloud GPU sandboxes, n8n workflows, AWS deployment servers, and enterprise AI developer tools.',
      icon: Laptop,
      color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    },
    {
      title: 'Flexible Live & Hybrid Batches',
      desc: 'Tailored batch schedules for working professionals and college students with weekend & live evening interactive options.',
      icon: Clock,
      color: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      title: 'Lifetime LMS Access & Course Updates',
      desc: 'Get lifetime access to recorded HD lectures, code repositories, interview question banks, and annual curriculum updates.',
      icon: BookOpen,
      color: 'bg-sky-100 text-sky-700 border-sky-200',
    },
  ];

  const facultyHighlights = [
    {
      name: 'Senior Tech Leads',
      org: 'Ex-Amazon, Microsoft, Google',
      desc: 'Mentors with 8+ years of core engineering experience building distributed microservices and scalable cloud platforms.',
    },
    {
      name: 'AI & Data Scientists',
      org: 'AI Research Labs & Unicorns',
      desc: 'Researchers who have trained LLMs, built RAG vector engines, and deployed high-performance neural networks in production.',
    },
    {
      name: 'Chartered Accountants & PMs',
      org: 'Deloitte, Swiggy, KPMG',
      desc: 'Chartered accountants and product leaders teaching real-world corporate tax returns, PRDs, and financial valuation models.',
    },
  ];

  const trainingPedagogy = [
    {
      step: '01',
      title: 'Module-Wise Progressive Learning',
      desc: 'Curriculum organized into focused 4-week modules starting from fundamentals to advanced enterprise architecture.',
    },
    {
      step: '02',
      title: 'Real World Industry Capstones',
      desc: 'Build production-ready applications like E-Commerce Microservices, AI Agents, Financial Models, and Analytics Control Towers.',
    },
    {
      step: '03',
      title: 'Agile Team & Code Review Standards',
      desc: 'Practice industry Git workflows, pull request reviews, Jira sprint planning, and automated CI/CD deployment pipelines.',
    },
    {
      step: '04',
      title: 'Mock Interview & Placement Drills',
      desc: 'Rigorous technical coding rounds, system design reviews, HR prep, and direct interview scheduling with corporate recruiters.',
    },
  ];

  const certificationDetails = [
    {
      title: 'ISO 9001:2015 Quality Certified',
      desc: 'Apex Institute is officially ISO certified for excellence in technical vocational education and career training standards.',
    },
    {
      title: 'Globally Verified QR Credential',
      desc: 'Every certificate features a unique QR code allowing recruiters anywhere in the world to instantly verify student credentials.',
    },
    {
      title: 'Industry Partner Badges',
      desc: 'Curriculum mapped with official Microsoft PL-300, AWS Certified Cloud Practitioner, Tally Prime, and Google Analytics certifications.',
    },
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100 px-3.5 py-1.5 rounded-full border border-purple-200 shadow-xs">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>About Apex Institute</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Empowering Ambitious Learners For Career Excellence
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
          Apex Tech Institute is India&apos;s premier career accelerator platform. We bridge the gap between academic theory and enterprise tech demands through immersive, hands-on training and world-class industry mentorship.
        </p>
      </div>

      {/* SECTION 1: Key Features in Apex Institute */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-purple-600" />
            <span>Key Features in Apex Institute</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Designed to provide unmatched learning infrastructure, personal attention, and real career outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyFeatures.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-md space-y-4 hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${feat.color}`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">{feat.title}</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Our Faculties */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-300 bg-pink-500/20 px-3 py-1 rounded-full border border-pink-500/30">
            <Users className="w-3.5 h-3.5" />
            <span>World-Class Mentors</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Learn Directly From Industry Pioneers
          </h2>
          <p className="text-xs sm:text-sm text-purple-200 font-medium leading-relaxed">
            Our faculty consists of veteran engineers, data scientists, product managers, and chartered accountants from tier-1 global brands including Amazon, Microsoft, Swiggy, Deloitte, Razorpay, Uber, CRED, KPMG, and Accenture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facultyHighlights.map((fac, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3">
              <div className="flex items-center gap-2 text-pink-400 font-extrabold text-xs">
                <Star className="w-4 h-4 fill-pink-400" />
                <span>{fac.org}</span>
              </div>
              <h3 className="text-base font-extrabold text-white">{fac.name}</h3>
              <p className="text-xs text-purple-100 font-medium leading-relaxed">{fac.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Our Trainings Pedagogy */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
            <BookOpen className="w-6 h-6 text-pink-600" />
            <span>Our Training &amp; Learning Methodology</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            A structured 4-step framework engineered to convert beginners into job-ready tech leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainingPedagogy.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-purple-100 shadow-md space-y-3 relative">
              <span className="text-2xl font-black text-purple-200 block">{t.step}</span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{t.title}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: Certification */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-purple-100 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <BadgeCheck className="w-6 h-6 text-purple-600" />
              <span>Globally Recognized Certification</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Earn employer-ready credentials recognized by leading corporate organizations worldwide.
            </p>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-4 py-2 rounded-full border border-emerald-200 shrink-0 self-start sm:self-auto">
            100% Verifiable Credentials
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {certificationDetails.map((c, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
              <h3 className="text-sm font-extrabold text-slate-900">{c.title}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL TAGLINE BANNER */}
      <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-700 text-white p-8 sm:p-14 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-pink-200 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            <Sparkles className="w-4 h-4 text-pink-300" />
            <span>Your Ultimate Career Accelerator</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight text-white">
            Get one stop solution for all the training needs required to fulfill your dream job.
          </h2>

          <p className="text-xs sm:text-base text-purple-100 font-medium max-w-2xl mx-auto">
            Join over 12,000+ graduates placed in top tier-1 tech firms. Explore our industry-accredited courses and launch your career today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/courses"
              className="w-full sm:w-auto bg-white text-purple-900 hover:bg-purple-50 font-black text-xs px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Explore All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/career-finder"
              className="w-full sm:w-auto bg-purple-900/60 hover:bg-purple-900 text-white font-bold text-xs px-8 py-3.5 rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-pink-300" />
              <span>Career Path Advisor</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

