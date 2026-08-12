'use client';

import React, { useState } from 'react';
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

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-purple-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-500 hover:text-slate-900 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Enquiry Submitted!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="text-slate-900 font-semibold">{formData.name}</span>. Our senior career counselor will call you at{' '}
              <span className="text-purple-700 font-semibold">{formData.phone}</span> within 2 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 bright-btn-primary px-6 py-2.5 text-sm transition-all"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
                Instant Career Counseling
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Book a Free Course Demo & Counseling
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Get detailed syllabus PDF, fee breakdown, batch timings & placement guidance.
            </p>

            {errorMsg && (
              <div className="mb-4 text-xs bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:border-purple-500"
                  />
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:border-purple-500"
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
                      className="w-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:border-purple-500"
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
                  className="w-full bg-white border border-slate-200 text-sm text-slate-900 rounded-xl py-2.5 px-3 focus:outline-none focus:border-purple-500"
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
                  rows={3}
                  placeholder="Ask about batch timings, placement stats, scholarship eligibility..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2.5 px-3 focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bright-btn-primary font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
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
  );
};
