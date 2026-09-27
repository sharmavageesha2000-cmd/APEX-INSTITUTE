'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Loader2,
  AlertCircle,
  Download,
  Calendar,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const RegisterSuccessClient: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [receipt, setReceipt] = useState<any>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!sessionId) {
      setErrorMsg('No payment session found. Please complete the registration process.');
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch('/api/stripe/verify-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Payment verification failed');

        setReceipt(data);
      } catch (err: any) {
        setErrorMsg(err.message || 'Payment verification failed');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  useEffect(() => {
    if (receipt && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (receipt && countdown === 0) {
      router.push('/dashboard');
      router.refresh();
    }
  }, [receipt, countdown, router]);

  if (loading) {
    return (
      <div className="bg-white p-10 rounded-3xl border border-purple-200 shadow-2xl text-center space-y-4 max-w-lg mx-auto">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto" />
        <h2 className="text-xl font-black text-slate-900">Verifying Stripe Payment...</h2>
        <p className="text-xs text-slate-500 font-medium">
          Confirming your transaction with Stripe and initializing your student account.
        </p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-rose-200 shadow-2xl text-center space-y-4 max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-black text-slate-900">Payment Verification Issue</h2>
        <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>
        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 bright-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold"
        >
          <span>Return to Registration</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const enr = receipt?.enrollment || {};
  const isFull = receipt?.paymentChoice === 'FULL_PAYMENT';

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-emerald-300 shadow-2xl space-y-6 max-w-xl mx-auto animate-in fade-in zoom-in duration-300">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md border border-emerald-200">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>
        <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-black uppercase px-3 py-1 rounded-full border border-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Stripe Payment Confirmed • Instant Enrollment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Welcome to Apex Tech Institute!
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto">
          Congratulations <strong className="text-slate-900">{receipt?.user?.name}</strong>! Your seat has been successfully booked via Stripe and your Student Portal LMS account is active.
        </p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-indigo-50/60 p-6 rounded-2xl border border-purple-200 space-y-3 text-xs">
        <div className="flex justify-between items-center border-b border-purple-200/60 pb-2.5">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Enrolled Course</span>
          <span className="font-extrabold text-slate-900 text-sm">{enr.courseTitle}</span>
        </div>
        <div className="flex justify-between items-center border-b border-purple-200/60 pb-2.5">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Stripe Transaction Ref</span>
          <span className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
            {receipt?.transactionId}
          </span>
        </div>
        <div className="flex justify-between items-center border-b border-purple-200/60 pb-2.5">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Total Course Fee</span>
          <span className="font-extrabold text-slate-900">{formatCurrency(enr.totalFee || 25000)}</span>
        </div>
        <div className="flex justify-between items-center border-b border-purple-200/60 pb-2.5">
          <span className="text-emerald-700 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Amount Paid via Stripe
          </span>
          <span className="font-extrabold text-emerald-700 text-sm">
            {formatCurrency(enr.registrationFeePaid || 2000)}
          </span>
        </div>
        <div className="flex justify-between items-center pt-1 text-sm">
          <span className="text-slate-800 font-black">Remaining Balance</span>
          <span className={`font-black text-base ${isFull ? 'text-emerald-700' : 'text-purple-700'}`}>
            {isFull ? '₹0 (Fully Paid)' : formatCurrency(enr.remainingFee)}
          </span>
        </div>
      </div>

      <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-[11px] text-purple-900 font-semibold flex items-center justify-between">
        <span>Auto-redirecting to Student Dashboard in <strong>{countdown}s</strong>...</span>
        <Link
          href="/dashboard"
          className="text-purple-700 hover:text-purple-900 font-black underline flex items-center gap-1"
        >
          <span>Open Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <Link
        href="/dashboard"
        className="w-full bright-btn-primary font-bold py-3.5 rounded-xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
      >
        <span>Access My Student LMS Dashboard</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
