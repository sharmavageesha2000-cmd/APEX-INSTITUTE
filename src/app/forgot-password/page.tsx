'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KeyRound, ArrowRight, CheckCircle2, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="py-16 max-w-md mx-auto px-4">
      <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mx-auto border border-purple-200">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Forgot Password?</h1>
          <p className="text-xs text-slate-500 font-medium">
            Enter your registered email address to receive password reset instructions.
          </p>
        </div>

        {submitted ? (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center space-y-3 font-medium">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <div className="font-extrabold text-slate-900 text-sm">Reset Link Dispatched</div>
            <div>
              Password reset link has been sent to <strong className="text-slate-900">{email}</strong>. Please check your inbox and spam folder.
            </div>
            <Link
              href="/login"
              className="inline-block bright-btn-secondary font-bold px-4 py-2 rounded-xl text-xs mt-2"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Registered Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 pl-10 focus:outline-none focus:border-purple-500 font-medium"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bright-btn-primary font-bold py-3.5 text-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Send Reset Instructions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-500 font-medium pt-2 border-t border-slate-100">
          Remember password?{' '}
          <Link href="/login" className="text-purple-700 hover:underline font-bold">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
