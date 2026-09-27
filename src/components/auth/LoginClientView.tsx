'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Lock,
  GraduationCap,
  BookOpen,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Info,
} from 'lucide-react';

interface LoginClientViewProps {
  redirectUrl?: string;
  defaultTab?: 'STUDENT' | 'FACULTY';
}

export const LoginClientView: React.FC<LoginClientViewProps> = ({
  redirectUrl,
  defaultTab = 'STUDENT',
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'STUDENT' | 'FACULTY'>(defaultTab);

  // Student login state
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [showStudentPassword, setShowStudentPassword] = useState(false);

  // Faculty login state
  const [facultyEmail, setFacultyEmail] = useState('');
  const [facultyPassword, setFacultyPassword] = useState('');
  const [showFacultyPassword, setShowFacultyPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: studentEmail.trim(),
          password: studentPassword,
          requiredRole: 'STUDENT',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      if (redirectUrl) {
        router.push(redirectUrl);
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

  const handleFacultyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: facultyEmail.trim(),
          password: facultyPassword,
          requiredRole: 'FACULTY',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');

      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push('/dashboard');
      }
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid faculty email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-200 shadow-2xl space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md border border-purple-300">
          {activeTab === 'STUDENT' ? (
            <GraduationCap className="w-7 h-7" />
          ) : (
            <BookOpen className="w-7 h-7" />
          )}
        </div>
        <div className="inline-block bg-purple-100 text-purple-900 font-extrabold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full border border-purple-200">
          Apex Institute Portal
        </div>
        <h1 className="text-2xl font-black text-slate-900">
          {activeTab === 'STUDENT' ? 'Student Portal Sign In' : 'Faculty & Instructor Sign In'}
        </h1>
        <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
          {activeTab === 'STUDENT'
            ? 'Sign in to access your course lectures, LMS dashboard & fee status'
            : 'Sign in to access academic batches, syllabus resources & class schedules'}
        </p>
      </div>

      {/* STUDENT & FACULTY TAB SWITCHER */}
      <div className="grid grid-cols-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200 text-xs font-bold">
        <button
          type="button"
          onClick={() => {
            setActiveTab('STUDENT');
            setErrorMsg('');
          }}
          className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'STUDENT'
              ? 'bg-white text-purple-900 shadow-sm border border-purple-100 font-black'
              : 'text-slate-600 hover:text-slate-900 font-semibold'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-purple-600" />
          <span>Student Login</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('FACULTY');
            setErrorMsg('');
          }}
          className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'FACULTY'
              ? 'bg-white text-purple-900 shadow-sm border border-purple-100 font-black'
              : 'text-slate-600 hover:text-slate-900 font-semibold'
          }`}
        >
          <BookOpen className="w-4 h-4 text-purple-600" />
          <span>Faculty Login</span>
        </button>
      </div>

      {errorMsg && (
        <div className="text-xs bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 1. STUDENT LOGIN FORM */}
      {activeTab === 'STUDENT' && (
        <form onSubmit={handleStudentLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Registered Student Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:border-purple-500 font-medium"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Account Password
            </label>
            <div className="relative">
              <input
                type={showStudentPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2.5 pl-10 pr-10 focus:outline-none focus:border-purple-500 font-medium"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowStudentPassword(!showStudentPassword)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                {showStudentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="bg-purple-50/60 border border-purple-100 p-2.5 rounded-xl text-[11px] text-purple-900 font-medium flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
            <span>
              <strong>Demo Student Credentials:</strong> student@example.com / student123 (or use any email registered during enrollment)
            </span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bright-btn-primary font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md disabled:opacity-70 cursor-pointer"
          >
            <span>{submitting ? 'Verifying Student Account...' : 'Sign In to Student Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* 2. FACULTY LOGIN FORM */}
      {activeTab === 'FACULTY' && (
        <form onSubmit={handleFacultyLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Faculty / Instructor Official Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="faculty@apexinstitute.com"
                value={facultyEmail}
                onChange={(e) => setFacultyEmail(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:border-purple-500 font-medium"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Faculty Password
            </label>
            <div className="relative">
              <input
                type={showFacultyPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={facultyPassword}
                onChange={(e) => setFacultyPassword(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 rounded-xl py-2.5 pl-10 pr-10 focus:outline-none focus:border-purple-500 font-medium"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowFacultyPassword(!showFacultyPassword)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                {showFacultyPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="bg-purple-50/60 border border-purple-100 p-2.5 rounded-xl text-[11px] text-purple-900 font-medium flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
            <span>
              <strong>Demo Faculty Credentials:</strong> faculty@apexinstitute.com / faculty123
            </span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bright-btn-primary font-bold py-3.5 rounded-xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>{submitting ? 'Verifying Faculty Credentials...' : 'Sign In to Faculty Portal'}</span>
          </button>
        </form>
      )}

      {/* Footer Navigation */}
      <div className="pt-2 text-center text-xs text-slate-500 font-medium border-t border-slate-100 space-y-1.5">
        <div>
          {activeTab === 'STUDENT' ? (
            <>
              New student?{' '}
              <Link href="/register" className="text-purple-700 hover:underline font-bold">
                Enroll & Book Seat with ₹2,000 Fee
              </Link>
            </>
          ) : (
            <span className="text-[11px] text-slate-500 font-medium">
              Academic instructors & mentors portal • Apex Tech Institute
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
