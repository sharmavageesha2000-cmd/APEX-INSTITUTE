import React from 'react';
import Link from 'next/link';
import { getDomains } from '@/lib/store';
import { getDomainCertificates } from '@/lib/domain-certificates';
import { DynamicIcon } from '@/components/ui/IconHelper';
import { DomainCertificateCard } from '@/components/domains/DomainCertificateCard';
import { Layers, ArrowRight, Award, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default async function DomainsIndexPage() {
  const domains = await getDomains();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-4 py-2 rounded-full border border-purple-200 shadow-xs">
          <Award className="w-4 h-4 text-pink-600" />
          <span>Govt., AICTE & NSDC Recognized Career Domains</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
          Explore Our 10 Major Career Domains & Official Certifications
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
          Every domain includes an <strong>Official Government & Industry Credential</strong> — fully recognized by the Government of India, AICTE certified, NSDC (Skill India) verified, and accredited by ISO 9001:2026.
        </p>

        {/* Global Accreditation Summary Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-bold">
          <span className="bg-amber-50 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-xs">
            <span>🏛️ Approved by Govt. of India</span>
          </span>
          <span className="bg-blue-50 text-blue-900 border border-blue-300 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-xs">
            <span>🎓 AICTE Certified</span>
          </span>
          <span className="bg-emerald-50 text-emerald-900 border border-emerald-300 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-xs">
            <span>🇮🇳 NSDC (Skill India) Certified</span>
          </span>
          <span className="bg-purple-50 text-purple-900 border border-purple-300 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-xs">
            <span>🌐 ISO 9001:2026 Quality Accredited</span>
          </span>
        </div>
      </div>

      {/* 10 Domains Sections with Official Certificate Under Each Domain Name */}
      <div className="space-y-16">
        {domains.map((dom, index) => {
          const certificates = getDomainCertificates(dom.slug, dom.name);

          return (
            <section
              key={dom.id}
              id={dom.slug}
              className="playful-card p-6 sm:p-8 rounded-[2.5rem] bg-white border border-purple-100/90 shadow-xl space-y-8 relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600" />

              {/* ── DOMAIN HEADER BAR ────────────────────────── */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/20 shrink-0">
                    <DynamicIcon name={dom.iconName} className="w-8 h-8" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-black text-purple-700 bg-purple-100 px-3 py-0.5 rounded-full border border-purple-200 uppercase tracking-wider">
                        Domain #{index + 1}
                      </span>
                      <span className="text-[11px] font-black text-pink-700 bg-pink-50 px-3 py-0.5 rounded-full border border-pink-200">
                        {dom.courseCount || 2}+ Active Courses
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                      {dom.name}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-1 max-w-3xl">
                      {dom.headline} — {dom.description}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/domains/${dom.slug}`}
                  className="bright-btn-primary px-5 py-3 text-xs flex items-center justify-center gap-2 shrink-0 self-start lg:self-center shine-sweep"
                >
                  <span>Explore Domain Roadmap & Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Subcategories Specializations Pills */}
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span>Specialization Tracks Included in {dom.name}:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dom.subcategories.map((sub, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200/80 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{sub}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* ── OFFICIAL CERTIFICATE UNDER THIS DOMAIN ──────────── */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                      <span>Official Domain Certification</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mt-1">
                      Official Certification Included in {dom.name}
                    </h3>
                  </div>

                  <span className="text-xs text-slate-500 font-semibold">
                    100% Verifiable via Government & QR Ledger
                  </span>
                </div>

                {/* Single Certificate Card */}
                <div>
                  {certificates.slice(0, 1).map((cert) => (
                    <DomainCertificateCard
                      key={cert.id}
                      cert={cert}
                      domainName={dom.name}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
