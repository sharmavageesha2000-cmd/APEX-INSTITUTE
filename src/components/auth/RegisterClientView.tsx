'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, GraduationCap, CheckCircle2 } from 'lucide-react';

export const RegisterClientView: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);

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
      setErrorMsg(err.message || 'Something went wrong during registration.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mx-auto border border-purple-200">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Create Student Account</h1>
        <p className="text-xs text-slate-500 font-medium">Join Apex Tech Academy learning portal</p>
      </div>

      {errorMsg && (
        <div className="text-xs bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="e.g. Vikram Malhotra"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:border-purple-500 font-medium"
            />
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
          <div className="relative">
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:border-purple-500 font-medium"
            />
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
          <div className="relative">
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:border-purple-500 font-medium"
            />
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Create Password *</label>
          <div className="relative">
            <input
              type="password"
              required
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:border-purple-500 font-medium"
            />
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bright-btn-primary font-bold py-3 rounded-xl transition-all text-sm"
        >
          {submitting ? 'Creating Account...' : 'Register & Access Portal'}
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-slate-500 font-medium">
        Already have an account?{' '}
        <Link href="/login" className="text-purple-700 hover:underline font-bold">
          Login Here
        </Link>
      </div>
    </div>
  );
};
