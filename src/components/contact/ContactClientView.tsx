'use client';

import React, { useState } from 'react';
import { Course } from '@/lib/types';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, User, Sparkles } from 'lucide-react';

interface ContactClientViewProps {
  courses: Course[];
}

export const ContactClientView: React.FC<ContactClientViewProps> = ({ courses }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseId: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg('Please fill in your contact information.');
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

      if (!res.ok) throw new Error('Failed to submit message');
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Contact Info Sidebar */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-md space-y-6">
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span>Campus Headquarters</span>
          </h3>

          <div className="space-y-4 text-xs text-slate-700 font-medium">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <MapPin className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-extrabold text-slate-900 mb-0.5">Primary Noida Campus</div>
                <div className="text-slate-600">
                  Tech Park Hub, 4th Floor, Sector 62, Noida, Delhi NCR - 201309
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <Phone className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-extrabold text-slate-900 mb-0.5">Admissions Hotline</div>
                <div className="text-slate-600">+91 98765 43210 / +91 80000 12345</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <Mail className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-extrabold text-slate-900 mb-0.5">Email Support</div>
                <div className="text-slate-600">admissions@apexinstitute.com</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-extrabold text-slate-900 mb-0.5">Counseling Hours</div>
                <div className="text-slate-600">Monday to Sunday: 9:00 AM - 8:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Card Placeholder */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-md text-center space-y-2">
          <MapPin className="w-8 h-8 text-purple-600 mx-auto" />
          <h4 className="font-extrabold text-slate-900 text-sm">Visit Our State-of-the-Art Labs</h4>
          <p className="text-xs text-slate-600 font-medium">
            High-speed internet, workstation setups, and live mentor project rooms.
          </p>
        </div>
      </div>

      {/* Main Form */}
      <div className="lg:col-span-7">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-purple-100 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Message Received!</h3>
              <p className="text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
                Thank you for getting in touch, <span className="text-slate-900 font-extrabold">{formData.name}</span>. An admissions counselor will respond to your query shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 bright-btn-primary font-bold px-6 py-2.5 rounded-xl text-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xl font-extrabold text-slate-900 mb-4">Send Us a Direct Message</h3>

              {errorMsg && (
                <div className="text-xs bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anish Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-sm text-slate-900 rounded-xl py-3 px-4 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-sm text-slate-900 rounded-xl py-3 px-4 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-sm text-slate-900 rounded-xl py-3 px-4 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Course of Interest</label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-sm text-slate-900 rounded-xl py-3 px-4 focus:outline-none focus:border-purple-500 font-medium"
                >
                  <option value="">General Enquiry / Career Guidance</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you choose your career track?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-sm text-slate-900 rounded-xl py-3 px-4 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bright-btn-primary font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
