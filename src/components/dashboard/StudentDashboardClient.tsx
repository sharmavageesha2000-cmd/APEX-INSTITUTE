'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Enrollment, Enquiry, Course } from '@/lib/types';
import {
  GraduationCap,
  BookOpen,
  User as UserIcon,
  Award,
  Download,
  Bell,
  Settings,
  HelpCircle,
  Calendar,
  LogOut,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Bookmark,
  FileText,
  Edit,
  Save,
  CreditCard,
  QrCode,
  ShieldAlert,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface StudentDashboardClientProps {
  user: User;
  enrollments: Enrollment[];
  enquiries: Enquiry[];
  savedCourses?: Course[];
}

export const StudentDashboardClient: React.FC<StudentDashboardClientProps> = ({
  user,
  enrollments: initialEnrollments,
  enquiries,
  savedCourses = [],
}) => {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);
  const [activeTab, setActiveTab] = useState<
    | 'ENROLLED'
    | 'FEES'
    | 'PROFILE'
    | 'CLASSES'
    | 'ANNOUNCEMENTS'
    | 'CERTIFICATES'
    | 'DOWNLOADS'
    | 'SAVED'
    | 'ENQUIRIES'
    | 'SETTINGS'
  >('ENROLLED');

  const [payingFee, setPayingFee] = useState(false);
  const [paySuccessMsg, setPaySuccessMsg] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'LUMPSUM' | 'INSTALLMENTS_2' | 'INSTALLMENTS_3'>('LUMPSUM');


  const [editProfileMode, setEditProfileMode] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    phone: user.phone || '',
    city: user.city || '',
    education: user.education || 'B.Tech / BE',
    graduationYear: user.graduationYear || '2025',
    careerInterest: user.careerInterest || 'Information Technology',
  });

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const searchParams = useSearchParams();
  const paymentStatusParam = searchParams.get('payment');
  const sessionIdParam = searchParams.get('session_id');

  useEffect(() => {
    if (paymentStatusParam === 'success' && sessionIdParam) {
      setActiveTab('FEES');
      fetch('/api/stripe/verify-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionIdParam }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setPaySuccessMsg(
              `Stripe payment verified successfully! Transaction ref: ${data.transactionId}. All records updated.`
            );
            if (typeof data.remainingFee === 'number') {
              setEnrollments((prev) =>
                prev.map((item) => ({
                  ...item,
                  remainingFee: data.remainingFee,
                  paymentStatus: data.paymentStatus,
                }))
              );
            }
          }
        })
        .catch(() => {});
    }
  }, [paymentStatusParam, sessionIdParam]);

  const handlePayWithStripe = async (enr: Enrollment, amountToPay: number) => {
    setPayingFee(true);
    setPaySuccessMsg(null);
    try {
      const res = await fetch('/api/stripe/create-fee-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrollmentId: enr.id,
          amount: amountToPay,
          planChosen: selectedPlan,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to initialize Stripe fee checkout');

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned from Stripe');
      }
    } catch (err: any) {
      alert(err.message || 'Payment processing failed');
      setPayingFee(false);
    }
  };

  const handlePayRemaining = async (enr: Enrollment, amountToPay: number) => {
    setPayingFee(true);
    setPaySuccessMsg(null);
    try {
      const res = await fetch('/api/student/pay-fee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrollmentId: enr.id,
          amount: amountToPay,
          planChosen: selectedPlan,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payment failed');

      setEnrollments((prev) =>
        prev.map((item) =>
          item.id === enr.id
            ? {
                ...item,
                remainingFee: data.remainingFee,
                paymentStatus:
                  data.enrollment?.paymentStatus ||
                  (data.remainingFee === 0 ? 'FULLY_PAID' : 'PARTIALLY_PAID'),
              }
            : item
        )
      );

      setPaySuccessMsg(
        `Payment of ${formatCurrency(amountToPay)} confirmed successfully! Transaction ID: ${data.transactionId}`
      );
    } catch (err: any) {
      alert(err.message || 'Payment processing failed');
    } finally {
      setPayingFee(false);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setEditProfileMode(false);
    alert('Profile information updated successfully!');
  };

  return (
    <div className="space-y-8">
      {/* 12. WELCOME BANNER */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 p-6 sm:p-8 rounded-3xl border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-md shadow-pink-500/20 shrink-0">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">Welcome back, {user.name}!</h1>
              <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-purple-200 uppercase">
                {user.role === 'FACULTY' ? 'FACULTY INSTRUCTOR' : 'ACTIVE STUDENT'}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              {user.email} • {user.city || 'Bangalore'} • {user.role === 'FACULTY' ? 'Academic curriculum, batches & lecture schedules.' : 'Track your progress & live classes below.'}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* DASHBOARD TABS NAVIGATION */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-purple-100 shadow-sm overflow-x-auto scrollbar-none text-xs font-bold">
        {[
          { id: 'ENROLLED', label: 'My Courses', icon: BookOpen },
          { id: 'FEES', label: 'Fees & Payment Plans', icon: CreditCard },
          { id: 'CLASSES', label: 'Upcoming Classes', icon: Calendar },
          { id: 'CERTIFICATES', label: 'Certificates', icon: Award },
          { id: 'DOWNLOADS', label: 'Downloads', icon: Download },
          { id: 'SAVED', label: 'Saved Courses', icon: Bookmark },
          { id: 'ENQUIRIES', label: 'My Enquiries', icon: HelpCircle },
          { id: 'ANNOUNCEMENTS', label: 'Notices', icon: Bell },
          { id: 'PROFILE', label: 'My Profile', icon: UserIcon },
          { id: 'SETTINGS', label: 'Settings', icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'bright-btn-primary'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENTS */}
      {/* 1. ENROLLED COURSES WITH PROGRESS INDICATOR (e.g. Course Progress: 65%) */}
      {activeTab === 'ENROLLED' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">Active Program Enrollments</h2>
            <Link href="/courses" className="text-xs font-bold text-purple-700 hover:underline">
              + Enroll in New Course
            </Link>
          </div>

          {enrollments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrollments.map((enr) => {
                const total = enr.totalFee || enr.course?.discountFee || enr.course?.fee || 28000;
                const regPaid = enr.registrationFeePaid ?? 2000;
                const remFee = enr.remainingFee ?? Math.max(0, total - regPaid);

                return (
                  <div key={enr.id} className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                        {enr.status || 'ACTIVE'}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{enr.batchTiming || 'Mon-Fri (7:30 PM - 9:30 PM)'}</span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base">{enr.courseTitle || enr.course?.title || 'Certification Program'}</h3>

                    {/* SEAT & REGISTRATION FEE SUMMARY BADGE */}
                    <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200/80 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-extrabold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {remFee === 0 || enr.paymentStatus === 'FULLY_PAID'
                              ? `Full Fee Paid (${formatCurrency(regPaid)}) • 100% Cleared`
                              : '₹2,000 Registration Paid (Seat Booked)'}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {remFee === 0 || enr.paymentStatus === 'FULLY_PAID' ? (
                            <span className="text-emerald-700 font-bold">No Balance Due (Permanent Access)</span>
                          ) : (
                            <>Remaining Fee: <strong className="text-purple-900">{formatCurrency(remFee)}</strong></>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab('FEES')}
                        className="text-purple-700 hover:text-purple-900 font-bold text-[11px] underline shrink-0 ml-2"
                      >
                        {remFee === 0 || enr.paymentStatus === 'FULLY_PAID' ? 'Fee Receipt →' : 'Fee Plans →'}
                      </button>
                    </div>

                    {/* COURSE PROGRESS INDICATOR REQUIREMENT */}
                    <div className="space-y-2 pt-1 border-t border-slate-100">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-700">Course Progress</span>
                        <span className="text-purple-700">{enr.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                        <div
                          className="bg-gradient-to-r from-pink-600 to-purple-600 h-full rounded-full"
                          style={{ width: `${enr.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <Link
                        href={`/courses/${enr.courseSlug || 'full-stack-mern-nextjs-masterclass'}`}
                        className="bright-btn-primary font-bold text-xs px-4 py-2 flex items-center gap-1"
                      >
                        <span>Continue Learning</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Enrolled: {enr.enrolledAt ? enr.enrolledAt.slice(0, 10) : 'Active'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-purple-100 space-y-3 shadow-sm">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
              <div className="text-sm font-bold text-slate-900">No active course enrollments</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
                Explore our 50+ certification programs and enroll with ₹2,000 seat booking fee to start your learning journey.
              </p>
              <Link
                href="/courses"
                className="inline-block bright-btn-primary text-xs px-5 py-2.5 rounded-xl font-bold"
              >
                Browse All Courses
              </Link>
            </div>
          )}
        </div>
      )}

      {/* 2. FEES & PAYMENT SECTION (MANDATORY REGISTRATION DEDUCTED & CRITERIA EXPLAINED) */}
      {activeTab === 'FEES' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Fees Status & Payment Criteria</h2>
              <p className="text-xs text-slate-500 font-medium">
                Manage your course tuition fees, review deducted registration deposit, and choose your payment plan.
              </p>
            </div>
            <span className="bg-purple-100 text-purple-900 text-xs font-bold px-3 py-1 rounded-full border border-purple-200 self-start sm:self-auto">
              ₹2,000 Registration Paid
            </span>
          </div>

          {paySuccessMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{paySuccessMsg}</span>
            </div>
          )}

          {enrollments.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-purple-100 text-center space-y-3">
              <CreditCard className="w-10 h-10 text-slate-400 mx-auto" />
              <div className="text-sm font-bold text-slate-800">No active fee records found</div>
              <p className="text-xs text-slate-500">Enroll in a course to view payment schedules.</p>
            </div>
          ) : (
            enrollments.map((enr) => {
              const total = enr.totalFee || enr.course?.discountFee || enr.course?.fee || 28000;
              const regPaid = enr.registrationFeePaid ?? 2000;
              const remFee = enr.remainingFee ?? Math.max(0, total - regPaid);
              const isFullyPaid = remFee === 0;

              // Plan calculations
              const lumpsumDiscount = Math.round(remFee * 0.05);
              const lumpsumPayAmount = Math.max(0, remFee - lumpsumDiscount);
              const installment2Amount = Math.round(remFee / 2);
              const installment3Amount = Math.round(remFee * 0.35);

              return (
                <div key={enr.id} className="space-y-6">
                  {/* SUMMARY CARDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm space-y-1">
                      <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Total Program Fee</span>
                      <div className="text-xl font-black text-slate-900">{formatCurrency(total)}</div>
                      <div className="text-[11px] text-slate-400 font-medium">{enr.courseTitle || enr.course?.title}</div>
                    </div>

                    <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-1">
                      <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Registration Fee Paid
                      </span>
                      <div className="text-xl font-black text-emerald-800">{formatCurrency(regPaid)}</div>
                      <div className="text-[11px] text-emerald-700 font-medium">✓ Deducted from total fee</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-2xl border border-purple-200 shadow-sm space-y-1">
                      <span className="text-purple-700 font-bold uppercase tracking-wider text-[10px]">Remaining Balance</span>
                      <div className="text-xl font-black text-purple-950">
                        {isFullyPaid ? '₹0 (Fully Cleared)' : formatCurrency(remFee)}
                      </div>
                      <div className="text-[11px] text-purple-700 font-bold">
                        {isFullyPaid ? 'Status: All dues paid' : 'Status: Balance Pending'}
                      </div>
                    </div>
                  </div>

                  {/* CONDITIONAL CONTENT: FULLY PAID RECEIPT VS INSTALLMENT CRITERIA */}
                  {isFullyPaid ? (
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-lg space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200 shadow-xs">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-base font-extrabold text-slate-900">
                            Course Tuition Fee Fully Settled & Verified
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            Your program fee has been 100% cleared. You have zero remaining dues and no further installment payments are required.
                          </p>
                        </div>
                      </div>

                      <div className="p-5 bg-gradient-to-br from-emerald-50/80 to-teal-50/50 rounded-2xl border border-emerald-200 text-xs space-y-3 text-slate-700">
                        <div className="flex justify-between items-center border-b border-emerald-200/60 pb-2">
                          <span className="font-bold text-slate-600">Total Program Fee:</span>
                          <span className="font-extrabold text-slate-900">{formatCurrency(total)}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-emerald-200/60 pb-2">
                          <span className="font-bold text-emerald-800">Total Amount Paid:</span>
                          <span className="font-black text-emerald-700 text-sm">
                            {formatCurrency(regPaid)} (100% Cleared)
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="font-bold text-slate-800">Outstanding Balance Due:</span>
                          <span className="font-black text-emerald-700 text-sm">
                            ₹0 (Settled in Full)
                          </span>
                        </div>
                      </div>

                      <div className="p-4 bg-purple-50/80 border border-purple-200 rounded-2xl text-xs text-purple-900 flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
                        <span className="leading-relaxed">
                          Your full payment unlocks permanent access to high-definition recorded lectures, private mentor Telegram/Slack channels, capstone project reviews, and guaranteed hiring partner interview drives!
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-lg space-y-6">
                      <div className="space-y-1">
                        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                          <span>Balance Payment Criteria & Flexible Installment Plans</span>
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          At registration, your ₹2,000 seat booking deposit was deducted. You can clear the remaining balance of{' '}
                          <strong className="text-slate-900">{formatCurrency(remFee)}</strong> using any of the 3 criteria below:
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        {/* CRITERIA 1: LUMPSUM */}
                        <div
                          onClick={() => setSelectedPlan('LUMPSUM')}
                          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 relative ${
                            selectedPlan === 'LUMPSUM'
                              ? 'bg-purple-50/90 border-purple-600 ring-2 ring-purple-300'
                              : 'bg-slate-50/60 border-slate-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="inline-block bg-purple-600 text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase">
                            Recommended
                          </div>
                          <div className="font-black text-sm text-slate-900">Criteria A: Lump-Sum (1-Time)</div>
                          <p className="text-[11px] text-slate-600 font-medium">
                            Pay the remaining balance in full before batch start and receive an instant 5% fee concession.
                          </p>
                          <div className="pt-2 border-t border-purple-200/60 space-y-1">
                            <div className="flex justify-between text-slate-500">
                              <span>Balance Due:</span>
                              <span className="line-through">{formatCurrency(remFee)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-emerald-700">
                              <span>5% Early Concession:</span>
                              <span>- {formatCurrency(lumpsumDiscount)}</span>
                            </div>
                            <div className="flex justify-between font-black text-slate-900 text-sm pt-1">
                              <span>Pay in 1-Go:</span>
                              <span className="text-purple-700">{formatCurrency(lumpsumPayAmount)}</span>
                            </div>
                          </div>
                        </div>

                        {/* CRITERIA 2: 2 INSTALLMENTS */}
                        <div
                          onClick={() => setSelectedPlan('INSTALLMENTS_2')}
                          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
                            selectedPlan === 'INSTALLMENTS_2'
                              ? 'bg-purple-50/90 border-purple-600 ring-2 ring-purple-300'
                              : 'bg-slate-50/60 border-slate-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="inline-block bg-indigo-100 text-indigo-800 font-black text-[9px] px-2 py-0.5 rounded-full uppercase border border-indigo-200">
                            2 Equal Parts
                          </div>
                          <div className="font-black text-sm text-slate-900">Criteria B: 2 Installments</div>
                          <p className="text-[11px] text-slate-600 font-medium">
                            Split balance equally into 2 installments with 0% interest and 30-day interval.
                          </p>
                          <div className="pt-2 border-t border-purple-200/60 space-y-1.5 text-[11px]">
                            <div className="flex justify-between">
                              <span className="text-slate-600 font-medium">Installment 1 (50%):</span>
                              <strong className="text-slate-900">{formatCurrency(installment2Amount)}</strong>
                            </div>
                            <div className="text-[10px] text-slate-400">Due: On Batch Commencement Day</div>
                            <div className="flex justify-between pt-1 border-t border-slate-100">
                              <span className="text-slate-600 font-medium">Installment 2 (50%):</span>
                              <strong className="text-slate-900">{formatCurrency(remFee - installment2Amount)}</strong>
                            </div>
                            <div className="text-[10px] text-slate-400">Due: 30 days after course launch</div>
                          </div>
                        </div>

                        {/* CRITERIA 3: 3 INSTALLMENTS */}
                        <div
                          onClick={() => setSelectedPlan('INSTALLMENTS_3')}
                          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
                            selectedPlan === 'INSTALLMENTS_3'
                              ? 'bg-purple-50/90 border-purple-600 ring-2 ring-purple-300'
                              : 'bg-slate-50/60 border-slate-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="inline-block bg-pink-100 text-pink-800 font-black text-[9px] px-2 py-0.5 rounded-full uppercase border border-pink-200">
                            Maximum Flexibility
                          </div>
                          <div className="font-black text-sm text-slate-900">Criteria C: 3 Installments</div>
                          <p className="text-[11px] text-slate-600 font-medium">
                            Split into 3 monthly milestone payments spread across your training tenure.
                          </p>
                          <div className="pt-2 border-t border-purple-200/60 space-y-1 text-[11px]">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Part 1 (35%):</span>
                              <strong className="text-slate-900">{formatCurrency(installment3Amount)}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Part 2 (35%):</span>
                              <strong className="text-slate-900">{formatCurrency(installment3Amount)}</strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Part 3 (30%):</span>
                              <strong className="text-slate-900">
                                {formatCurrency(Math.max(0, remFee - 2 * installment3Amount))}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* PAYMENT SIMULATOR BUTTONS */}
                      <div className="p-5 bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 rounded-2xl border border-purple-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                            <span>Pay with Selected Plan: <strong className="text-purple-700">{selectedPlan}</strong></span>
                            <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-purple-200">
                              Stripe Enabled
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium mt-1">
                            {selectedPlan === 'LUMPSUM'
                              ? `Pay discounted balance of ${formatCurrency(lumpsumPayAmount)} in full.`
                              : selectedPlan === 'INSTALLMENTS_2'
                              ? `Pay Installment 1 of ${formatCurrency(installment2Amount)} now.`
                              : `Pay Milestone Part 1 of ${formatCurrency(installment3Amount)} now.`}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
                          {/* 1. STRIPE CHECKOUT BUTTON */}
                          <button
                            onClick={() => {
                              const payAmt =
                                selectedPlan === 'LUMPSUM'
                                  ? lumpsumPayAmount
                                  : selectedPlan === 'INSTALLMENTS_2'
                                  ? installment2Amount
                                  : installment3Amount;
                              handlePayWithStripe(enr, payAmt);
                            }}
                            disabled={payingFee}
                            className="w-full sm:w-auto bg-[#635BFF] hover:bg-[#5349e4] text-white font-black px-5 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer whitespace-nowrap disabled:opacity-70 transition-all hover:scale-[1.02]"
                          >
                            <CreditCard className="w-4 h-4" />
                            <span>
                              {payingFee
                                ? 'Connecting Stripe...'
                                : selectedPlan === 'LUMPSUM'
                                ? `Pay via Stripe (${formatCurrency(lumpsumPayAmount)})`
                                : selectedPlan === 'INSTALLMENTS_2'
                                ? `Pay via Stripe (${formatCurrency(installment2Amount)})`
                                : `Pay via Stripe (${formatCurrency(installment3Amount)})`}
                            </span>
                          </button>

                          {/* 2. DIRECT SETTLEMENT FALLBACK */}
                          <button
                            onClick={() => {
                              const payAmt =
                                selectedPlan === 'LUMPSUM'
                                  ? lumpsumPayAmount
                                  : selectedPlan === 'INSTALLMENTS_2'
                                  ? installment2Amount
                                  : installment3Amount;
                              handlePayRemaining(enr, payAmt);
                            }}
                            disabled={payingFee}
                            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold px-4 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs cursor-pointer whitespace-nowrap disabled:opacity-70 transition-all"
                            title="Instant Mock Settlement"
                          >
                            <span>Direct Settlement</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* 2. UPCOMING CLASSES */}
      {activeTab === 'CLASSES' && (
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span>Upcoming Live Zoom Batches & Labs</span>
          </h2>
          <div className="space-y-3">
            {[
              {
                title: 'Next.js 14 Server Actions & Microservices Live Lab',
                time: 'Today • 7:30 PM - 9:30 PM IST',
                instructor: 'Rohan Deshmukh (Ex-Amazon)',
                status: 'LIVE IN 2 HOURS',
              },
              {
                title: 'System Design & Database Query Tuning Session',
                time: 'Tomorrow • 7:30 PM - 9:30 PM IST',
                instructor: 'Rohan Deshmukh',
                status: 'SCHEDULED',
              },
            ].map((cls, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">{cls.title}</div>
                  <div className="text-slate-600 font-medium">{cls.time} • Mentored by {cls.instructor}</div>
                </div>
                <button
                  onClick={() => alert(`Launching Zoom classroom for: ${cls.title}`)}
                  className="bright-btn-primary font-bold text-xs px-4 py-2"
                >
                  Join Class Room
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. CERTIFICATES */}
      {activeTab === 'CERTIFICATES' && (
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>ISO Verified Certification Credentials</span>
          </h2>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 max-w-md">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                ISO 9001:2026 VERIFIED
              </span>
              <span className="text-xs text-slate-500 font-medium">Issued</span>
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Full Stack Web Engineering Certificate</h3>
            <p className="text-xs text-slate-500 font-medium">Credential ID: APEX-CERT-2026-9812</p>
            <button
              onClick={() => alert('Downloading official PDF certificate bundle!')}
              className="w-full bright-btn-secondary text-xs py-2.5 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-purple-600" />
              <span>Download Verified Certificate PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. DOWNLOADS */}
      {activeTab === 'DOWNLOADS' && (
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-600" />
            <span>My Downloadable Study Resources & Code Kits</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              { title: 'Full Stack Interview Prep Handbook (45 Pages)', size: '4.2 MB PDF' },
              { title: 'System Design Architecture Blueprints & Terraform Templates', size: '12.8 MB ZIP' },
              { title: 'ATS Optimized Software Engineer Resume Template', size: '1.1 MB DOCX' },
            ].map((d, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-slate-900">{d.title}</div>
                  <div className="text-slate-500 font-medium">{d.size}</div>
                </div>
                <button
                  onClick={() => alert(`Downloading ${d.title}`)}
                  className="p-2 text-purple-700 hover:text-purple-900 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. PROFILE (VIEW & EDIT PROFILE) */}
      {activeTab === 'PROFILE' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-purple-100 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">Student Profile Information</h2>
            <button
              onClick={() => setEditProfileMode(!editProfileMode)}
              className="bright-btn-secondary text-xs px-4 py-2 rounded-xl flex items-center gap-1.5"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>{editProfileMode ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>

          {editProfileMode ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Mobile Phone</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">City</label>
                  <input
                    type="text"
                    value={profileForm.city}
                    onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Qualification</label>
                  <input
                    type="text"
                    value={profileForm.education}
                    onChange={(e) => setProfileForm({ ...profileForm, education: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bright-btn-primary font-bold text-xs px-6 py-2.5 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-medium">Full Name:</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{user.name}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-medium">Email Address:</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{user.email}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-medium">Mobile Phone:</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{user.phone || '+91 9123456789'}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-medium">City / Location:</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{user.city || 'Bangalore'}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-medium">Qualification:</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{user.education || 'B.Tech / BE'}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-medium">Career Interest:</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{user.careerInterest || 'Information Technology'}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. MY ENQUIRIES */}
      {activeTab === 'ENQUIRIES' && (
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-600" />
            <span>Track Submitted Enquiries & Free Counselling Sessions</span>
          </h2>
          <div className="space-y-3 text-xs">
            {enquiries.length > 0 ? (
              enquiries.map((enq) => (
                <div key={enq.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900">{enq.courseTitle || enq.domain || 'General Inquiry'}</span>
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold border border-purple-200">
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium">{enq.message}</p>
                  {enq.notes && (
                    <div className="text-[11px] text-purple-800 bg-purple-50 p-2 rounded border border-purple-200 font-medium">
                      Counselor Note: {enq.notes}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-slate-500 text-center py-6 font-medium">No active enquiries submitted yet.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
