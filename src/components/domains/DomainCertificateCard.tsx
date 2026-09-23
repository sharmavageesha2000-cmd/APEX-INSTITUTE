'use client';

import React from 'react';
import { Award, ShieldCheck, QrCode, Sparkles, Check } from 'lucide-react';
import { DomainCertificate } from '@/lib/domain-certificates';

interface DomainCertificateCardProps {
  cert: DomainCertificate;
  domainName: string;
}

/* ─────────────────────────────────────────────────────────── */
/* SIMPLE & AUTHENTIC VISUAL CERTIFICATE DOCUMENT PREVIEW      */
/* ─────────────────────────────────────────────────────────── */
function VisualCertificatePreview({ cert, domainName }: { cert: DomainCertificate; domainName: string }) {
  return (
    <div className="relative bg-[#fffdf9] p-5 sm:p-6 rounded-2xl border-4 border-amber-400/90 shadow-lg flex flex-col justify-between min-h-[290px] text-slate-900 overflow-hidden font-serif select-none">
      {/* Decorative Ornate Double Border */}
      <div className="absolute inset-2 border border-amber-500/40 rounded-xl pointer-events-none" />
      <div className="absolute inset-3.5 border border-dashed border-amber-300/60 rounded-lg pointer-events-none" />

      {/* ── TOP AND CENTRE: "CERTIFICATE" IN CAPSLOCK ──────────── */}
      <div className="text-center relative z-10 pt-1 space-y-1">
        {/* Subtle Government & AICTE Trust Crests */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-2xs">
            <Award className="w-2.5 h-2.5" />
          </div>
          <span className="text-[8px] font-sans font-black tracking-widest text-amber-950 uppercase">
            GOVT. OF INDIA • AICTE • NSDC ACCREDITED
          </span>
          <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xs">
            <ShieldCheck className="w-2.5 h-2.5" />
          </div>
        </div>

        {/* Top & Centre CAPSLOCK CERTIFICATE Headline */}
        <h3 className="text-lg sm:text-xl font-black tracking-[0.25em] text-slate-900 uppercase font-serif">
          CERTIFICATE
        </h3>
        <p className="text-[9px] font-sans font-bold tracking-wider text-amber-900 uppercase">
          OF COMPLETION & PROFESSIONAL MASTERY
        </p>
      </div>

      {/* ── SIMPLE & CLEAN BODY (NO OVERSIZED TEXT) ───────────── */}
      <div className="text-center my-3 relative z-10 space-y-1">
        <p className="text-[10px] font-sans text-slate-500 italic">
          This is to officially certify that
        </p>
        <div className="text-xs sm:text-sm font-serif font-black text-purple-950 tracking-wide border-b border-slate-300 pb-0.5 inline-block px-6">
          Candidate Name
        </div>
        <p className="text-[9px] font-sans text-slate-500 italic pt-0.5">
          has successfully fulfilled all qualification benchmarks in
        </p>
        <div className="text-xs sm:text-sm font-sans font-bold text-slate-900 bg-amber-50/80 px-3 py-1 rounded-md border border-amber-200 inline-block mt-0.5">
          {domainName}
        </div>
      </div>

      {/* ── BOTTOM SIGNATURES, GOLD SEAL & QR VERIFICATION ──── */}
      <div className="flex items-end justify-between pt-2 border-t border-amber-200/80 text-[8px] font-sans relative z-10">
        {/* Left: Authorized Director Signature */}
        <div className="text-center space-y-0.5">
          <div className="font-serif italic text-[10px] text-slate-800 font-bold">
            Dr. R. K. Deshmukh
          </div>
          <div className="w-16 h-0.5 bg-slate-400 mx-auto" />
          <div className="text-[7px] font-bold text-slate-500 uppercase">Authorized Signatory</div>
        </div>

        {/* Center: Clean Official Gold Seal */}
        <div className="relative flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-amber-950 font-black text-[7px] flex flex-col items-center justify-center text-center leading-tight shadow-md border-2 border-white ring-2 ring-amber-400/50">
            <Sparkles className="w-3 h-3 text-amber-900 mb-0.5" />
            <span className="font-sans font-extrabold uppercase text-[6px]">OFFICIAL</span>
            <span className="font-sans font-black text-[5px]">SEAL</span>
          </div>
        </div>

        {/* Right: QR Code & ID */}
        <div className="text-center space-y-0.5">
          <div className="p-1 bg-white border border-slate-300 rounded shadow-2xs inline-block mx-auto">
            <QrCode className="w-3.5 h-3.5 text-slate-900" />
          </div>
          <div className="text-[7px] font-mono font-bold text-purple-900">{cert.credentialId}</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* MAIN CERTIFICATE CARD WITH DETAILS ON SIDE                  */
/* ─────────────────────────────────────────────────────────── */
export const DomainCertificateCard: React.FC<DomainCertificateCardProps> = ({ cert, domainName }) => {
  return (
    <div className="group playful-card bg-white p-5 sm:p-6 rounded-[2rem] border border-amber-200/90 shadow-md hover:shadow-xl hover:border-amber-400 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      {/* Left: Certificate Visual Document Mockup (7 cols) */}
      <div className="md:col-span-7">
        <VisualCertificatePreview cert={cert} domainName={domainName} />
      </div>

      {/* Right: Concise Details On Side (5 cols) */}
      <div className="md:col-span-5 space-y-3.5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              ✓ Verified Official Certificate
            </span>
          </div>
          <h4 className="text-base font-black text-slate-900 leading-snug group-hover:text-purple-700 transition-colors">
            {cert.title}
          </h4>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {cert.subtitle}
          </p>
        </div>

        {/* Accreditations Pills */}
        <div className="flex flex-wrap gap-1.5">
          {cert.accreditations.map((acc, idx) => (
            <span
              key={idx}
              className={`text-[10px] font-black px-2.5 py-0.5 rounded-md border ${acc.bg} ${acc.text} ${acc.border}`}
            >
              {acc.tag}
            </span>
          ))}
        </div>

        {/* Credential Code & Verification Details Box */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-500 font-medium">
            <span>Credential ID:</span>
            <strong className="text-purple-700 font-mono font-bold">{cert.credentialId}</strong>
          </div>
          <div className="flex items-center justify-between text-slate-500 font-medium">
            <span>Issuing Authority:</span>
            <strong className="text-slate-800 font-semibold">{cert.issuingAuthority}</strong>
          </div>
          <div className="flex items-center justify-between text-slate-500 font-medium">
            <span>Validity:</span>
            <strong className="text-emerald-700 font-bold">{cert.validity}</strong>
          </div>
          <div className="flex items-center justify-between text-slate-500 font-medium pt-1 border-t border-slate-200/60">
            <span>Verification:</span>
            <span className="text-slate-800 font-bold">QR & Govt Registry</span>
          </div>
        </div>

        {/* Action Badge */}
        <div className="text-xs font-extrabold text-purple-700 bg-purple-50 px-3.5 py-2 rounded-xl border border-purple-200 flex items-center justify-between shadow-xs">
          <span>Include in ATS Resume & LinkedIn</span>
          <Check className="w-4 h-4 text-purple-600" />
        </div>
      </div>
    </div>
  );
};
