'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, CheckCircle2, Phone, Mail, User as UserIcon, Sparkles } from 'lucide-react';
import { Course } from '@/lib/types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse?: Course | null;
  courses?: Course[];
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  selectedCourse,
  courses = [],
}) => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseId: selectedCourse?.id || '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg('Please fill in all required contact details.');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit enquiry');
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg('Something went wrong. Please try again or call support.');
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-950/70 backdrop-blur-md p-4 sm:p-8 flex min-h-screen items-center justify-center animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-lg bg-white border border-purple-200/90 rounded-3xl shadow-2xl my-auto overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinned Close Button - Always visible at top right */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 p-2 sm:p-2.5 rounded-full bg-slate-100/90 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200/80 hover:border-rose-200 transition-all shadow-sm group focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 group-hover:rotate-90 duration-200" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="max-h-[82vh] overflow-y-auto p-5 sm:p-7 pt-5 sm:pt-6">
          {/* Decorative Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <div className="text-center py-6 sm:py-8 space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Enquiry Submitted!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-slate-900 font-semibold">{formData.name}</span>. Our senior career counselor will call you at{' '}
                <span className="text-purple-700 font-semibold">{formData.phone}</span> within 2 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-3 bright-btn-primary px-6 py-2.5 text-xs sm:text-sm transition-all"
              >
                Done & Close
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-1.5 mb-1 pr-12">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">
                  Instant Career Counseling
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 pr-12">
                Book a Free Course Demo & Counseling
              </h3>
              <p className="text-xs text-slate-500 mb-4 pr-6">
                Get detailed syllabus PDF, fee breakdown, batch timings & placement guidance.
              </p>

              {errorMsg && (
                <div className="mb-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 p-2.5 rounded-xl">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2 pl-9 pr-3 focus:outline-none focus:border-purple-500"
                    />
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2 pl-9 pr-3 focus:outline-none focus:border-purple-500"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2 pl-9 pr-3 focus:outline-none focus:border-purple-500"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Interested Course</label>
                  <select
                    value={formData.courseId}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-sm text-slate-900 rounded-xl py-2 px-3 focus:outline-none focus:border-purple-500"
                  >
                    <option value="">General Career Consultation</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message or Questions</label>
                  <textarea
                    rows={2}
                    placeholder="Ask about batch timings, placement stats, scholarship eligibility..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2 px-3 focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bright-btn-primary font-bold py-2.5 sm:py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-1"
                >
                  {submitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Enquiry & Request Call</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
