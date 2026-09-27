'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, AlertCircle, ArrowLeft, KeyRound, Eye, EyeOff, Loader2 } from 'lucide-react';

export const AdminLoginClientView: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMsg('Please enter the administrative password');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          requiredRole: 'ADMIN',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid administrator password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-200 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md border border-purple-300">
          <KeyRound className="w-7 h-7" />
        </div>
        <div className="inline-block bg-purple-100 text-purple-900 font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-purple-200">
          Password-Only Access
        </div>
        <h1 className="text-2xl font-black text-slate-900">Admin Control Panel</h1>
        <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
          Enter master administrator password to unlock the management portal
        </p>
      </div>

      {errorMsg && (
        <div className="text-xs bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleAdminLogin} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Administrative Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              autoFocus
              placeholder="Enter admin password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-3 pl-10 pr-11 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 font-medium transition-all"
            />
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-lg focus:outline-none"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bright-btn-primary font-bold py-3.5 rounded-xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying Password...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Portal</span>
            </>
          )}
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-slate-500 font-medium border-t border-slate-100">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-purple-700 hover:text-purple-900 font-bold hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Apex Tech Institute Website</span>
        </Link>
      </div>
    </div>
  );
};

