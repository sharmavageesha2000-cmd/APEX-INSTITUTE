'use client';

import React, { useState } from 'react';
import { Phone, X, Send, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';

const WhatsAppLogo = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.94 9.94 0 0 0 1.339 4.991L2 22l5.164-1.354a9.946 9.946 0 0 0 4.846 1.258h.004c5.505 0 9.988-4.477 9.99-9.984A9.972 9.972 0 0 0 12.012 2zm.003 16.592h-.003a8.27 8.27 0 0 1-4.218-1.157l-.302-.18-3.134.821.836-3.053-.197-.314a8.275 8.275 0 0 1-1.272-4.437c0-4.566 3.717-8.28 8.288-8.28 2.213 0 4.292.863 5.857 2.43 1.564 1.566 2.425 3.647 2.424 5.86 0 4.567-3.718 8.28-8.277 8.28zm4.537-6.2c-.248-.124-1.468-.724-1.696-.807-.227-.083-.393-.124-.559.124-.165.248-.641.807-.786.972-.145.165-.29.186-.538.062-.248-.124-1.048-.386-1.996-1.231-.738-.659-1.236-1.472-1.381-1.72-.145-.248-.016-.382.108-.505.112-.111.248-.29.372-.435.124-.145.165-.248.248-.414.083-.165.041-.31-.021-.434-.062-.124-.559-1.346-.765-1.842-.2-.484-.403-.418-.559-.426-.145-.008-.31-.01-.475-.01-.165 0-.434.062-.661.31-.227.248-.868.848-.868 2.069 0 1.22.889 2.398 1.013 2.564.124.165 1.751 2.674 4.242 3.75.593.256 1.056.409 1.417.524.595.19 1.137.163 1.565.099.478-.071 1.468-.6 1.674-1.18.207-.579.207-1.075.145-1.18-.062-.104-.227-.166-.475-.29z" />
  </svg>
);

export const HomeFloatingWidgets: React.FC = () => {
  const [showCallModal, setShowCallModal] = useState(false);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const whatsappNumber = '919876543210';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Apex Tech Institute! I am visiting your website home page and would like to know more about your courses, fees, and placement assistance.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans animate-fadeIn">
      {/* WHATSAPP QUICK CHAT POPUP OVERLAY */}
      {showWhatsAppPopup && (
        <div className="w-80 sm:w-88 bg-white rounded-3xl border border-emerald-200 shadow-2xl overflow-hidden mb-2 animate-scaleUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-[#25D366] flex items-center justify-center font-bold text-lg shrink-0 relative shadow-sm">
                <WhatsAppLogo className="w-6 h-6 text-[#25D366]" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-emerald-700 rounded-full" />
              </div>
              <div>
                <div className="font-extrabold text-sm flex items-center gap-1.5">
                  <span>Apex WhatsApp Assistant</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                </div>
                <div className="text-[11px] text-emerald-100 font-medium">Online • Instant Support</div>
              </div>
            </div>
            <button
              onClick={() => setShowWhatsAppPopup(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3 text-xs">
            <div className="bg-white p-3 rounded-2xl border border-emerald-100 shadow-xs space-y-1 text-slate-800 font-medium">
              <p className="flex items-center gap-1.5 font-bold text-emerald-800">
                <WhatsAppLogo className="w-4 h-4 text-[#25D366]" />
                <span>Official WhatsApp Support</span>
              </p>
              <p className="text-slate-600 text-[11px]">Chat with our senior career counselor on WhatsApp to receive course brochures, batch schedules, and fee discount vouchers.</p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setShowWhatsAppPopup(false)}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-xs"
            >
              <WhatsAppLogo className="w-5 h-5 text-white" />
              <span>Start WhatsApp Chat Now</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* CALL US DIRECT MODAL OVERLAY */}
      {showCallModal && (
        <div className="w-80 sm:w-88 bg-white rounded-3xl border border-purple-200 shadow-2xl overflow-hidden mb-2 animate-scaleUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-extrabold text-sm">Instant Call Support</div>
                <div className="text-[11px] text-purple-200 font-medium">Speak with Admissions Team</div>
              </div>
            </div>
            <button
              onClick={() => setShowCallModal(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-white space-y-3 text-xs">
            <p className="text-slate-600 font-medium leading-relaxed text-[11px]">
              Call our official student support team directly for immediate assistance regarding batch timings, scholarship discounts, or syllabus details.
            </p>

            <div className="space-y-2 pt-1">
              <a
                href="tel:+919876543210"
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-pink-300" />
                  <span>Admissions Helpline</span>
                </div>
                <span className="bg-white/20 text-white text-[11px] px-2.5 py-1 rounded-lg font-mono">+91 9876543210</span>
              </a>

              <a
                href="tel:+919876543211"
                className="w-full bg-slate-100 hover:bg-purple-50 text-slate-800 hover:text-purple-800 font-bold py-2.5 px-4 rounded-xl border border-slate-200 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Career Counselor</span>
                </div>
                <span className="text-slate-600 text-[11px] font-mono">+91 9876543211</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING ACTION BUTTONS ROW */}
      <div className="flex items-center gap-3">
        {/* Close/Minimize Button */}
        <button
          onClick={() => setDismissed(true)}
          title="Dismiss Popups"
          className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center shadow-xs transition-all text-xs"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* CALL US FLOATING BUTTON */}
        <div className="relative group">
          <button
            onClick={() => {
              setShowCallModal(!showCallModal);
              setShowWhatsAppPopup(false);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs py-3 px-4 rounded-full shadow-xl shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all border border-white/20"
          >
            <div className="relative">
              <Phone className="w-4 h-4 text-white" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-ping" />
            </div>
            <span className="hidden sm:inline">Call Us</span>
          </button>
          
          {/* Hover Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap">
            Direct Phone Helpline
          </div>
        </div>

        {/* WHATSAPP FLOATING BUTTON */}
        <div className="relative group">
          <button
            onClick={() => {
              setShowWhatsAppPopup(!showWhatsAppPopup);
              setShowCallModal(false);
            }}
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs py-3 px-4.5 rounded-full shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all border border-white/30"
          >
            <div className="relative flex items-center">
              <WhatsAppLogo className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full border border-white animate-pulse" />
            </div>
            <span>WhatsApp Us</span>
          </button>

          {/* Hover Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap">
            Chat on WhatsApp
          </div>
        </div>
      </div>
    </div>
  );
};
