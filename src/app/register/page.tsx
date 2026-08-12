'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, ArrowRight, UserCheck, ShieldCheck, Sparkles, MapPin, BookOpen, Calendar, Phone } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    city: '',
    education: 'B.Tech / BE',
    graduationYear: '2025',
    careerInterest: 'Information Technology',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 max-w-xl mx-auto px-4 sm:px-6">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-purple-100 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bright-btn-primary flex items-center justify-center text-white mx-auto shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Student Registration</h1>
          <p className="text-xs text-slate-500 font-medium">
            Create your Apex Institute account to access live classes & LMS
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
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
          </div>

          {/* Phone & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Mobile Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Password *</label>
              <input
                type="password"
                required
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
              />
            </div>
          </div>

          {/* City & Education */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Current City</label>
              <input
                type="text"
                placeholder="e.g. Bangalore / Mumbai"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Highest Qualification</label>
              <select
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
              >
                <option value="B.Tech / BE">B.Tech / BE</option>
                <option value="BCA / MCA">BCA / MCA</option>
                <option value="B.Sc / M.Sc">B.Sc / M.Sc</option>
                <option value="B.Com / M.Com">B.Com / M.Com</option>
                <option value="BBA / MBA">BBA / MBA</option>
                <option value="Working Professional">Working Professional</option>
                <option value="Other">Other Degree</option>
              </select>
            </div>
          </div>

          {/* Graduation Year & Career Interest */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Graduation Year</label>
              <select
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
              >
                <option value="2027">2027 (Final Year Student)</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023 or Earlier">2023 or Earlier</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Primary Career Interest</label>
              <select
                value={formData.careerInterest}
                onChange={(e) => setFormData({ ...formData, careerInterest: e.target.value })}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bright-btn-primary font-bold py-3.5 text-sm transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 font-medium pt-2 border-t border-slate-100">
          Already registered?{' '}
          <Link href="/login" className="text-purple-700 hover:underline font-bold">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}
