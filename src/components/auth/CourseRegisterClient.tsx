'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Course } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { getCourseImage } from '@/lib/mock-data';
import {
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Calendar,
  Lock,
  Mail,
  User,
  Phone,
  MapPin,
  CreditCard,
  QrCode,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronDown,
  Info,
  Check,
} from 'lucide-react';

interface CourseRegisterClientProps {
  allCourses: Course[];
  initialCourseSlug?: string;
}

export const CourseRegisterClient: React.FC<CourseRegisterClientProps> = ({
  allCourses,
  initialCourseSlug,
}) => {
  const router = useRouter();

  // Find initial course from slug or default to first
  const defaultCourse =
    allCourses.find((c) => c.slug === initialCourseSlug) || allCourses[0] || null;

  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    defaultCourse?.id || ''
  );
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(defaultCourse);

  const [batchTiming, setBatchTiming] = useState<string>(
    'Mon-Fri (7:30 PM - 9:30 PM)'
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    city: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'STRIPE' | 'UPI' | 'CARD' | 'NETBANKING'>('STRIPE');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [paymentChoice, setPaymentChoice] = useState<'DEPOSIT_2000' | 'FULL_PAYMENT'>('DEPOSIT_2000');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedData, setConfirmedData] = useState<{
    userName: string;
    courseTitle: string;
    totalFee: number;
    regFeePaid: number;
    remainingFee: number;
    transactionId: string;
    isFullPayment: boolean;
  } | null>(null);

  // When initialCourseSlug or selectedCourseId changes, update selectedCourse
  useEffect(() => {
    if (selectedCourseId) {
      const match = allCourses.find((c) => c.id === selectedCourseId);
      if (match) setSelectedCourse(match);
    }
  }, [selectedCourseId, allCourses]);

  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
    const found = allCourses.find((c) => c.id === courseId);
    if (found) {
      setSelectedCourse(found);
    }
  };

  const totalCourseFee = selectedCourse
    ? selectedCourse.discountFee || selectedCourse.fee
    : 25000;
  const registrationDeposit = 2000;
  const fullPaymentDiscount = Math.round(totalCourseFee * 0.05);
  const fullDiscountedFee = totalCourseFee - fullPaymentDiscount;

  const isFullPayment = paymentChoice === 'FULL_PAYMENT';
  const amountToPayNow = isFullPayment ? fullDiscountedFee : registrationDeposit;
  const remainingFee = isFullPayment ? 0 : Math.max(0, totalCourseFee - registrationDeposit);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg('Please enter your email address');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your mobile phone number');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      return;
    }
    if (!selectedCourse) {
      setErrorMsg('Please select a course to enroll in');
      return;
    }

    setSubmitting(true);

    // 1. STRIPE CHECKOUT FLOW
    if (paymentMethod === 'STRIPE') {
      try {
        const stripeRes = await fetch('/api/stripe/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseId: selectedCourse.id,
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            city: formData.city.trim() || 'Bangalore',
            password: formData.password,
            batchTiming,
            paymentChoice,
            amountToPay: amountToPayNow,
          }),
        });

        const stripeData = await stripeRes.json();
        if (!stripeRes.ok) throw new Error(stripeData.error || 'Failed to initiate Stripe payment');

        if (stripeData.url) {
          window.location.href = stripeData.url;
          return;
        } else {
          throw new Error('No checkout URL returned from Stripe');
        }
      } catch (stripeErr: any) {
        setErrorMsg(stripeErr.message || 'Stripe payment initialization failed');
        setSubmitting(false);
        return;
      }
    }

    // 2. DIRECT / MOCK METHODS FLOW
    try {
      const mockTxn = `TXN-APEX-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
          city: formData.city.trim() || 'Bangalore',
          courseId: selectedCourse.id,
          batchTiming,
          paymentMethod,
          paymentChoice,
          amountPaidNow: amountToPayNow,
          transactionId: mockTxn,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setConfirmedData({
        userName: formData.name,
        courseTitle: selectedCourse.title,
        totalFee: totalCourseFee,
        regFeePaid: amountToPayNow,
        remainingFee,
        transactionId: data.transactionId || mockTxn,
        isFullPayment,
      });

      // Automatically redirect to student dashboard after 3.5 seconds
      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 3500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* SUCCESS CONFIRMATION RECEIPT MODAL / VIEW */}
      {confirmedData && (
        <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-emerald-300 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-black uppercase px-3 py-1 rounded-full border border-emerald-300">
              {confirmedData.isFullPayment ? 'Full Tuition Fee Paid & Enrolled' : 'Seat Registration Confirmed'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Welcome to Apex Tech Institute!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto">
              Congratulations <strong className="text-slate-900">{confirmedData.userName}</strong>! Your {confirmedData.isFullPayment ? 'course enrollment is 100% complete' : 'seat has been secured'} and your LMS Student Account is now active.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50/60 p-6 rounded-2xl border border-purple-200 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-purple-200/60 pb-3">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Enrolled Program</span>
              <span className="font-extrabold text-slate-900 text-sm">{confirmedData.courseTitle}</span>
            </div>
            <div className="flex justify-between items-center border-b border-purple-200/60 pb-3">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Batch Schedule</span>
              <span className="font-bold text-purple-700">{batchTiming}</span>
            </div>
            <div className="flex justify-between items-center border-b border-purple-200/60 pb-3">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Transaction ID</span>
              <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {confirmedData.transactionId}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-purple-200/60 pb-3">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Total Course Fee</span>
              <span className="font-extrabold text-slate-900">{formatCurrency(confirmedData.totalFee)}</span>
            </div>
            {confirmedData.isFullPayment && (
              <div className="flex justify-between items-center border-b border-purple-200/60 pb-3">
                <span className="text-emerald-700 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  5% Early Upfront Concession
                </span>
                <span className="font-extrabold text-emerald-700 text-sm">
                  - {formatCurrency(Math.round(confirmedData.totalFee * 0.05))}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center border-b border-purple-200/60 pb-3">
              <span className="text-emerald-700 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {confirmedData.isFullPayment ? 'Full Amount Paid Upfront' : 'Registration Fee Paid Now'}
              </span>
              <span className="font-extrabold text-emerald-700 text-sm">
                {formatCurrency(confirmedData.regFeePaid)} {confirmedData.isFullPayment ? '(Full)' : '(Deducted)'}
              </span>
            </div>
            <div className="flex justify-between items-center pt-1 text-sm">
              <span className="text-slate-800 font-black">Remaining Course Balance</span>
              <span className={`font-black text-base ${confirmedData.isFullPayment ? 'text-emerald-700' : 'text-purple-700'}`}>
                {confirmedData.isFullPayment ? '₹0 (All Dues Cleared)' : formatCurrency(confirmedData.remainingFee)}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200 text-xs text-slate-700 space-y-1">
            <div className="font-bold text-purple-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-purple-700" />
              <span>{confirmedData.isFullPayment ? 'Course Access Ready' : 'Next Step: Flexible Balance Payment'}</span>
            </div>
            <p className="text-[11px] text-slate-600">
              {confirmedData.isFullPayment
                ? 'Your tuition fee is 100% paid! All LMS study modules, lab environments, and mentor channels are unlocked.'
                : `The remaining balance of ${formatCurrency(confirmedData.remainingFee)} can be paid in Lump-Sum (with 5% early concession) or in 2 to 3 easy installments from the Fees & Payment section inside your Student Portal.`}
            </p>
          </div>

          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bright-btn-primary font-bold py-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] transition-all cursor-pointer"
          >
            <span>Proceed to Student LMS Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* MAIN REGISTRATION FORM */}
      {!confirmedData && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-purple-200 shadow-2xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md border border-purple-300">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div className="inline-block bg-purple-100 text-purple-900 font-extrabold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full border border-purple-200">
              Official Course Enrollment & Seat Booking
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Student Course Registration
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-lg mx-auto">
              Confirm your seat with mandatory ₹2,000 registration fee. Deducted from total course fee with flexible installment options.
            </p>
          </div>

          {errorMsg && (
            <div className="text-xs bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-xl font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* STEP 1: COURSE SELECTION DROPDOWN & DYNAMIC FEE PREVIEW */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-50/70 via-indigo-50/30 to-pink-50/40 border border-purple-200 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>1. Selected Course Program</span>
                </label>
                <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
                  Switch course anytime
                </span>
              </div>

              {/* Course Selection Dropdown */}
              <div className="relative">
                <select
                  value={selectedCourseId}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="w-full bg-white border-2 border-purple-300 text-slate-900 font-bold text-sm rounded-xl py-3 pl-4 pr-10 appearance-none focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all shadow-xs cursor-pointer"
                >
                  {allCourses.map((c) => {
                    const fee = c.discountFee || c.fee;
                    return (
                      <option key={c.id} value={c.id}>
                        {c.title} — {formatCurrency(fee)} ({c.duration})
                      </option>
                    );
                  })}
                </select>
                <ChevronDown className="w-5 h-5 text-purple-700 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Batch Timing Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Choose Preferred Batch Schedule
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    {
                      id: 'Mon-Fri (7:30 PM - 9:30 PM)',
                      title: 'Weekday Evening Batch',
                      time: 'Mon - Fri (7:30 PM - 9:30 PM IST)',
                    },
                    {
                      id: 'Sat-Sun (10:00 AM - 2:00 PM)',
                      title: 'Weekend Bootcamp',
                      time: 'Sat - Sun (10:00 AM - 2:00 PM IST)',
                    },
                  ].map((b) => (
                    <div
                      key={b.id}
                      onClick={() => setBatchTiming(b.id)}
                      className={`cursor-pointer p-3.5 rounded-xl border transition-all ${
                        batchTiming === b.id
                          ? 'bg-purple-100/70 border-purple-500 ring-2 ring-purple-300'
                          : 'bg-white border-slate-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
                        <span>{b.title}</span>
                        <Clock className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium mt-0.5">{b.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Course Thumbnail Preview */}
              {selectedCourse && (
                <div className="flex items-center gap-3.5 bg-gradient-to-r from-purple-50/90 to-indigo-50/70 p-3 rounded-2xl border border-purple-200 shadow-xs">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-purple-200 shadow-xs shrink-0">
                    <img
                      src={getCourseImage(selectedCourse.title, selectedCourse.slug, selectedCourse.domainName, selectedCourse.image)}
                      alt={selectedCourse.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getCourseImage(selectedCourse.title, selectedCourse.slug, selectedCourse.domainName);
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 overflow-hidden flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100/90 px-2 py-0.5 rounded-full border border-purple-200 uppercase tracking-wider">
                        {selectedCourse.domainName || 'Tech Program'}
                      </span>
                      <span className="text-[10px] text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200 font-bold">
                        {selectedCourse.level}
                      </span>
                    </div>
                    <div className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">
                      {selectedCourse.title}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Duration: {selectedCourse.duration} • Mode: {selectedCourse.mode}
                    </div>
                  </div>
                </div>
              )}

              {/* CHOOSE PAYMENT OPTION: ₹2,000 DEPOSIT OR FULL AMOUNT */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    Choose Payment Option at Registration:
                  </label>
                  <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                    Flexible Criteria
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* OPTION 1: ₹2,000 SEAT DEPOSIT */}
                  <div
                    onClick={() => setPaymentChoice('DEPOSIT_2000')}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-2 ${
                      paymentChoice === 'DEPOSIT_2000'
                        ? 'bg-purple-50/90 border-purple-600 ring-2 ring-purple-300 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 text-xs">Seat Booking Deposit</span>
                        <span className="bg-purple-100 text-purple-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-purple-200">
                          Min. ₹2,000
                        </span>
                      </div>
                      <div className="text-xl font-black text-purple-700">₹2,000</div>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                        Pay minimum ₹2,000 deposit to lock your batch seat. The balance of <strong>{formatCurrency(Math.max(0, totalCourseFee - 2000))}</strong> can be cleared later via Lump-sum or 2-3 installments in Student Portal.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-purple-100 flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        paymentChoice === 'DEPOSIT_2000' ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {paymentChoice === 'DEPOSIT_2000' && <Check className="w-2.5 h-2.5" />}
                      </div>
                      <span>Pay ₹2,000 Deposit Now</span>
                    </div>
                  </div>

                  {/* OPTION 2: PAY FULL COURSE FEE (WITH 5% DISCOUNT) */}
                  <div
                    onClick={() => setPaymentChoice('FULL_PAYMENT')}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-2 ${
                      paymentChoice === 'FULL_PAYMENT'
                        ? 'bg-emerald-50/90 border-emerald-600 ring-2 ring-emerald-300 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 text-xs">Pay Full Course Fee</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-emerald-300 animate-pulse">
                          Save 5% Instantly
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-emerald-700">{formatCurrency(fullDiscountedFee)}</span>
                        <span className="text-xs text-slate-400 line-through font-normal">{formatCurrency(totalCourseFee)}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                        Pay full amount upfront and get an instant <strong>5% concession (-{formatCurrency(fullPaymentDiscount)})</strong>. Zero balance due, permanent LMS & placement drive access unlocked immediately!
                      </p>
                    </div>

                    <div className="pt-2 border-t border-emerald-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        paymentChoice === 'FULL_PAYMENT' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {paymentChoice === 'FULL_PAYMENT' && <Check className="w-2.5 h-2.5" />}
                      </div>
                      <span>Pay Full Fee ({formatCurrency(fullDiscountedFee)})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DYNAMIC FEE BREAKDOWN DISPLAY */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-purple-200/80 shadow-xs space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-600 font-medium">
                  <span>Standard Program Tuition Fee:</span>
                  <div className="text-right">
                    {selectedCourse?.discountFee && (
                      <span className="text-slate-400 line-through text-[11px] mr-2">
                        {formatCurrency(selectedCourse.fee)}
                      </span>
                    )}
                    <span className="font-extrabold text-slate-900 text-sm">
                      {formatCurrency(totalCourseFee)}
                    </span>
                  </div>
                </div>

                {isFullPayment ? (
                  <>
                    <div className="flex justify-between items-center text-emerald-800 font-bold bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>5% Early Full-Payment Concession:</span>
                      </span>
                      <span className="font-black text-emerald-700 text-sm">
                        - {formatCurrency(fullPaymentDiscount)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-purple-950 font-bold bg-purple-50 p-2.5 rounded-xl border border-purple-200">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-purple-700" />
                        <span>Total Amount Payable Now (Full Settlement):</span>
                      </span>
                      <span className="font-black text-purple-700 text-base">
                        {formatCurrency(amountToPayNow)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-emerald-700 font-bold pt-1">
                      <span>Remaining Course Balance:</span>
                      <span className="font-black text-emerald-700 text-sm">
                        ₹0 (100% Cleared)
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center text-purple-950 font-bold bg-purple-50 p-2.5 rounded-xl border border-purple-200">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-purple-700" />
                        <span>Mandatory Seat Registration Deposit (Payable Now):</span>
                      </span>
                      <span className="font-black text-purple-700 text-base">
                        ₹2,000
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-700 font-medium pt-1">
                      <span>Remaining Balance Payable Later:</span>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {formatCurrency(remainingFee)}
                      </span>
                    </div>
                  </>
                )}

                <p className="text-[10px] text-slate-500 font-medium italic pt-2 border-t border-slate-100">
                  {isFullPayment
                    ? '* Note: Paying full tuition upfront waives all remaining fee liabilities and gives you an instant 5% concession. No future installments needed.'
                    : '* Note: The ₹2,000 seat deposit reserves your enrollment and is 100% deducted from your course fee. You can settle the remaining balance in Lump-sum or 2-3 installments via the Student LMS Portal.'}
                </p>
              </div>
            </div>

            {/* STEP 2: STUDENT DETAILS */}
            <div className="space-y-4">
              <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                2. Student Information & Login Setup
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50/70 border border-slate-200 text-sm text-slate-900 rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:border-purple-500 font-medium"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50/70 border border-slate-200 text-sm text-slate-900 rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:border-purple-500 font-medium"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mobile Phone *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50/70 border border-slate-200 text-sm text-slate-900 rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:border-purple-500 font-medium"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Current City
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Bangalore, Delhi, Pune"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-50/70 border border-slate-200 text-sm text-slate-900 rounded-xl py-2.5 pl-10 pr-3 focus:outline-none focus:border-purple-500 font-medium"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Create Portal Password * (used to log into Student Portal)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Minimum 6 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-slate-50/70 border border-slate-200 text-sm text-slate-900 rounded-xl py-2.5 pl-10 pr-11 focus:outline-none focus:border-purple-500 font-medium"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: MANDATORY ₹2,000 PAYMENT METHOD */}
            <div className="space-y-4 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-purple-600" />
                  <span>3. Mandatory Seat Fee Payment (₹2,000)</span>
                </div>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                  Instant Seat Confirmation
                </span>
              </div>

              {/* Payment Type Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'STRIPE', label: 'Stripe Gateway', badge: 'Official', icon: ShieldCheck },
                  { id: 'UPI', label: 'UPI / QR Code', icon: QrCode },
                  { id: 'CARD', label: 'Debit / Card', icon: CreditCard },
                  { id: 'NETBANKING', label: 'Net Banking', icon: ShieldCheck },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`py-2.5 px-2 rounded-xl border text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all relative cursor-pointer ${
                      paymentMethod === m.id
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <m.icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{m.label}</span>
                    {m.badge && (
                      <span className={`hidden sm:inline-block text-[8px] font-black uppercase px-1 py-0.2 rounded-full absolute -top-1.5 right-1.5 border shadow-xs ${
                        paymentMethod === m.id ? 'bg-amber-400 text-purple-950 border-amber-300' : 'bg-purple-100 text-purple-800 border-purple-200'
                      }`}>
                        {m.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* STRIPE Tab */}
              {paymentMethod === 'STRIPE' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-white border-2 border-purple-300 text-xs space-y-3.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#635BFF] text-white flex items-center justify-center font-black text-sm shadow-md">
                        S
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                          <span>Stripe Secure Payment Gateway</span>
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200">
                            LIVE
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          256-Bit SSL Encrypted • PCI-DSS Level 1 Certified
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>End-to-End Encrypted</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-purple-200/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Accepted Cards on Stripe:</span>
                      <span className="text-[10px] font-black text-purple-700">All Major Payment Methods</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 text-[10px] font-bold text-slate-600">
                      <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">Visa</span>
                      <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">MasterCard</span>
                      <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">American Express</span>
                      <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">RuPay</span>
                      <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">Apple Pay / Google Pay</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-100/70 border border-purple-200 text-xs">
                    <span className="text-purple-900 font-bold">Payable via Stripe:</span>
                    <span className="text-purple-950 font-black text-sm">
                      {formatCurrency(amountToPayNow)}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 font-medium">
                    ⚡ You will be securely redirected to the official Stripe Checkout page to complete your payment with 3D-Secure authentication.
                  </p>
                </div>
              )}

              {/* UPI Tab */}
              {paymentMethod === 'UPI' && (
                <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Scan & Pay via any UPI App</span>
                    <span className="text-[10px] bg-purple-200/80 text-purple-900 px-2 py-0.5 rounded font-extrabold">
                      GPay • PhonePe • Paytm • BHIM
                    </span>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-purple-200">
                    <div className="w-16 h-16 bg-slate-900 text-white rounded-lg flex flex-col items-center justify-center text-[10px] font-mono shrink-0">
                      <QrCode className="w-8 h-8 text-pink-400" />
                      <span>APEX UPI</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-extrabold text-slate-900">Institute Official UPI ID:</div>
                      <div className="font-mono text-purple-700 font-bold bg-purple-50 px-2 py-1 rounded inline-block text-xs border border-purple-200">
                        apexinstitute@icici
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Amount to pay: <strong>{formatCurrency(amountToPayNow)}</strong> (auto-verified upon clicking submit)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD Tab */}
              {paymentMethod === 'CARD' && (
                <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NETBANKING Tab */}
              {paymentMethod === 'NETBANKING' && (
                <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs space-y-2">
                  <div className="font-bold text-slate-800">Select Your Bank</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank'].map((bank, idx) => (
                      <div
                        key={bank}
                        className={`p-2 rounded-lg border text-center font-bold cursor-pointer ${
                          idx === 0 ? 'bg-purple-600 text-white' : 'bg-white text-slate-700'
                        }`}
                      >
                        {bank}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bright-btn-primary font-bold py-4 rounded-xl transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] cursor-pointer disabled:opacity-75"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>
                    {paymentMethod === 'STRIPE'
                      ? 'Connecting to Stripe Checkout...'
                      : isFullPayment
                      ? `Processing ${formatCurrency(amountToPayNow)} Full Fee Payment...`
                      : 'Processing ₹2,000 Seat Booking Deposit...'}
                  </span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>
                    {paymentMethod === 'STRIPE'
                      ? isFullPayment
                        ? `Pay Full Fee (${formatCurrency(amountToPayNow)}) with Stripe Checkout →`
                        : `Pay ₹2,000 Deposit with Stripe Checkout →`
                      : isFullPayment
                      ? `Pay Full Fee (${formatCurrency(amountToPayNow)}) & Confirm Enrollment 🚀`
                      : `Pay ₹2,000 Deposit & Confirm Enrollment 🚀`}
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-2 text-center text-xs text-slate-500 font-medium border-t border-slate-100">
            Already registered with your seat?{' '}
            <Link href="/login" className="text-purple-700 hover:underline font-bold">
              Sign In to Student Portal
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
