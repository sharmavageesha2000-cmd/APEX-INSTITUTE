'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, Mail, Lock, ShieldCheck, GraduationCap, Key, Sparkles } from 'lucide-react';

interface LoginClientViewProps {
  redirectUrl?: string;
}

export const LoginClientView: React.FC<LoginClientViewProps> = ({ redirectUrl }) => {
  const router = useRouter();
  const [roleTab, setRoleTab] = useState<'STUDENT' | 'ADMIN'>('STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fillDemoAccount = (role: 'STUDENT' | 'ADMIN') => {
    setRoleTab(role);
    if (role === 'STUDENT') {
      setEmail('student@example.com');
      setPassword('student123');
    } else {
      setEmail('admin@apexinstitute.com');
      setPassword('admin123');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (data.user?.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mx-auto border border-purple-200">
          <LogIn className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Welcome Back</h1>
        <p className="text-xs text-slate-500 font-medium">Access your institute account portal</p>
      </div>

      {/* Role Tabs */}
      <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
        <button
          onClick={() => setRoleTab('STUDENT')}
          className={`py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            roleTab === 'STUDENT'
              ? 'bright-btn-primary'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Student Login</span>
        </button>
        <button
          onClick={() => setRoleTab('ADMIN')}
          className={`py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            roleTab === 'ADMIN'
              ? 'bright-btn-primary'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin Portal</span>
        </button>
      </div>

      {/* Demo Credentials Helper */}
      <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-slate-700 flex items-center gap-1">
            <Key className="w-3 h-3 text-purple-600" />
            <span>Quick Test Account Loader:</span>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => fillDemoAccount('STUDENT')}
            className="text-[11px] font-bold bg-white hover:bg-purple-50 text-purple-700 py-1.5 rounded-lg border border-purple-200 transition-colors"
          >
            Load Student Demo
          </button>
          <button
            type="button"
            onClick={() => fillDemoAccount('ADMIN')}
            className="text-[11px] font-bold bg-white hover:bg-pink-50 text-pink-700 py-1.5 rounded-lg border border-pink-200 transition-colors"
          >
            Load Admin Demo
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="text-xs bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:border-purple-500 font-medium"
            />
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          {submitting ? 'Authenticating...' : roleTab === 'ADMIN' ? 'Login as Admin' : 'Login as Student'}
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-slate-500 font-medium">
        Don&apos;t have a student account?{' '}
        <Link href="/register" className="text-purple-700 hover:underline font-bold">
          Register Here
        </Link>
      </div>
    </div>
  );
};
