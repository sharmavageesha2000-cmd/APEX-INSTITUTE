'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Sparkles, CheckCircle2, Calendar, Clock } from 'lucide-react';
import { Domain } from '@/lib/types';

interface CounsellingModalProps {
  isOpen: boolean;
  onClose: () => void;
  domains?: Domain[];
}

export const CounsellingModal: React.FC<CounsellingModalProps> = ({
  isOpen,
  onClose,
  domains = [],
}) => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    domain: 'Information Technology',
    preferredDate: '',
    preferredTime: '11:00 AM - 12:00 PM',
    message: '',
    preferredContact: 'Call',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setLoading(true);

    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          domain: formData.domain,
          type: 'FREE_COUNSELLING',
          preferredContact: formData.preferredContact,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          message: formData.message || `Booked Free Career Counselling session for ${formData.domain}`,
        }),
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      alert('Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
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
        className="relative w-full max-w-lg bg-white border border-purple-100 rounded-3xl shadow-2xl my-auto overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinned Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-full bg-slate-100/90 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition-all shadow-sm group focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 group-hover:rotate-90 duration-200" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="max-h-[84vh] overflow-y-auto p-5 sm:p-8 pt-6 sm:pt-8 space-y-6">
          <div className="space-y-1 pr-12">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-on-1 Senior Mentor Session</span>
            </span>
            <h2 className="text-xl font-bold text-slate-900">Book a Free Career Counselling Session</h2>
            <p className="text-xs text-slate-500">
              Get personalized guidance on domain roadmap, salary expectations, and course selection.
            </p>
          </div>

        {success ? (
          <div className="py-8 text-center space-y-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Counselling Session Reserved!</h3>
            <p className="text-xs text-slate-600">
              Our senior career advisor will contact you shortly via {formData.preferredContact}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Malhotra"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Interested Career Domain</label>
                <select
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500"
                >
                  <option value="Information Technology">Information Technology</option>
                  <option value="Artificial Intelligence & Machine Learning">AI & Machine Learning</option>
                  <option value="Data & Analytics">Data & Analytics</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="UI/UX & Design">UI/UX & Design</option>
                  <option value="Management & Business">Management & Business</option>
                  <option value="Finance & Accounting">Finance & Accounting</option>
                  <option value="Career Switch Track">Career Switch Track</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Preferred Contact Method</label>
                <select
                  value={formData.preferredContact}
                  onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500"
                >
                  <option value="Phone Call">Direct Phone Call</option>
                  <option value="WhatsApp">WhatsApp Chat</option>
                  <option value="Zoom Meeting">Zoom Video Call</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Preferred Time Slot</label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500"
                >
                  <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                  <option value="02:00 PM - 05:00 PM">Afternoon (02:00 PM - 05:00 PM)</option>
                  <option value="06:00 PM - 09:00 PM">Evening (06:00 PM - 09:00 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Specific Questions / Notes</label>
              <textarea
                rows={2}
                placeholder="Tell us about your background or target role..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl p-3 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bright-btn-primary font-bold py-3.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Reserving Session...' : 'Book Free Career Counselling Session'}</span>
            </button>
          </form>
        )}
        </div>
      </div>
    </div>,
    document.body
  );
};
