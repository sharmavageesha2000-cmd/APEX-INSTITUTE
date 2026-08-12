'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    domain: 'Information Technology',
    preferredContact: 'Phone Call',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
          preferredContact: formData.preferredContact,
          message: formData.message || 'Contact enquiry submitted via Contact Us page.',
        }),
      });

      setSubmitted(true);
    } catch (err) {
      alert('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100 px-3.5 py-1.5 rounded-full border border-purple-200">
          <Phone className="w-4 h-4 text-purple-600" />
          <span>24/7 Student Advisory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Get in Touch With Apex Tech Institute
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          Have questions about course syllabus, batch timings, EMI payments, or corporate placements? Reach out to our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information & Map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-md space-y-6">
            <h2 className="text-xl font-extrabold text-slate-900">Campus & Contact Info</h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 shrink-0 border border-purple-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Headquarters & Tech Campus</div>
                  <div className="text-slate-600 font-medium leading-relaxed mt-0.5">
                    Apex Tower, Outer Ring Road, HSR Layout, Sector 1, Bangalore 560102
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-pink-100 text-pink-700 shrink-0 border border-pink-200">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Student Support Hotline</div>
                  <div className="text-slate-600 font-medium mt-0.5">+91 9876543210</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0 border border-emerald-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Official Email</div>
                  <div className="text-slate-600 font-medium mt-0.5">contact@apexinstitute.com</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0 border border-amber-200">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Working Hours</div>
                  <div className="text-slate-600 font-medium mt-0.5">Mon &ndash; Sat: 9:00 AM &ndash; 8:00 PM IST</div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <a
              href="https://wa.me/919876543210?text=Hi%20Apex%20Institute%2C%20I%20want%20to%20know%20more%20about%20your%20courses."
              target="_blank"
              rel="noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat via Official WhatsApp (+91 9876543210)</span>
            </a>

            {/* Social Media Links */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="text-xs font-bold text-slate-500">Connect with us:</div>
              <div className="flex gap-2">
                {[
                  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
                  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
                  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
                  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
                ].map((soc, i) => (
                  <a
                    key={i}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-purple-50 border border-purple-100 text-purple-700 hover:bg-purple-100 transition-all"
                  >
                    <soc.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Google Maps Embed Mockup */}
          <div className="bg-white p-4 rounded-3xl border border-purple-100 shadow-md overflow-hidden relative">
            <div className="w-full h-48 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-center p-4 border border-slate-200 space-y-2">
              <MapPin className="w-8 h-8 text-purple-600 animate-bounce" />
              <div className="font-extrabold text-slate-900 text-xs">Apex Institute Campus - HSR Layout, Bangalore</div>
              <div className="text-[11px] text-slate-500 font-medium">Google Maps Embed View • Click below to get directions</div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-extrabold text-purple-700 hover:underline"
              >
                Open in Google Maps &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-purple-100 shadow-2xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-500 font-medium">
                Fill out the form below and our career advisor will get back to you within 2 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-extrabold text-slate-900">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-600 font-medium">
                  Thank you for contacting Apex Tech Institute. Our team will get in touch via {formData.preferredContact}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Interested Domain</label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                    >
                      <option value="Information Technology">Information Technology</option>
                      <option value="Artificial Intelligence & Machine Learning">AI & Machine Learning</option>
                      <option value="Data & Analytics">Data & Analytics</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="UI/UX & Design">UI/UX & Design</option>
                      <option value="Management & Business">Management & Business</option>
                      <option value="Finance & Accounting">Finance & Accounting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Preferred Contact Method</label>
                  <select
                    value={formData.preferredContact}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                  >
                    <option value="Phone Call">Direct Phone Call</option>
                    <option value="WhatsApp">WhatsApp Message</option>
                    <option value="Email">Email Reply</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Your Message / Query *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ask us about upcoming batches, syllabus, fees, or placements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 resize-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bright-btn-primary font-bold py-3.5 text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending Message...' : 'Submit Contact Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
