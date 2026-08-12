'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Course, User } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import {
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Building2,
  Clock,
  Sparkles,
  Award,
} from 'lucide-react';

interface EnrollmentClientProps {
  course: Course;
  currentUser: User | null;
  allCourses: Course[];
}

export const EnrollmentClient: React.FC<EnrollmentClientProps> = ({
  course,
  currentUser,
}) => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    batchTiming: 'Mon-Fri (7:30 PM - 9:30 PM)',
    learningMode: 'Live Online',
    studentName: currentUser?.name || '',
    studentEmail: currentUser?.email || '',
    studentPhone: currentUser?.phone || '',
    studentCity: currentUser?.city || '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCompleteEnrollment = async () => {
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.id,
          batchTiming: formData.batchTiming,
          mode: formData.learningMode,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          router.push(`/login?redirect=/enroll/${course.slug}`);
          return;
        }
        throw new Error(data.error || 'Failed to submit enrollment');
      }

      setStep(5); // Confirmation step
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const netFee = course.discountFee || course.fee;

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-purple-100 shadow-2xl space-y-8">
      {/* Header & Step Indicator */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center border border-purple-200">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">Course Enrollment</h1>
              <p className="text-xs text-slate-500 font-medium">{course.title}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-pink-700 bg-pink-100 px-3 py-1 rounded-full border border-pink-200">
            Step {step} of 4
          </span>
        </div>

        {/* Progress Line */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-600 to-purple-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl font-medium">
          {error}
        </div>
      )}

      {/* Step 1: Select Batch Timing */}
      {step === 1 && (
        <div className="space-y-5">
          <h2 className="text-base font-bold text-slate-900">1. Select Preferred Batch Schedule</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: 'Mon-Fri (7:30 PM - 9:30 PM)',
                title: 'Mon-Fri Evening Batch',
                time: '7:30 PM - 9:30 PM IST',
                desc: 'Ideal for working professionals and college students',
              },
              {
                id: 'Sat-Sun (10:00 AM - 2:00 PM)',
                title: 'Sat-Sun Weekend Bootcamp',
                time: '10:00 AM - 2:00 PM IST',
                desc: 'Intensive weekend practical lab & doubt sessions',
              },
            ].map((batch) => (
              <div
                key={batch.id}
                onClick={() => setFormData({ ...formData, batchTiming: batch.id })}
                className={`cursor-pointer p-5 rounded-2xl border transition-all space-y-2 ${
                  formData.batchTiming === batch.id
                    ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-400'
                    : 'bg-slate-50 border-slate-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-slate-900 text-sm">{batch.title}</div>
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-xs font-bold text-purple-700">{batch.time}</div>
                <div className="text-xs text-slate-600 font-medium">{batch.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Student Information */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900">2. Student Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.studentEmail}
                onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Mobile Phone *</label>
              <input
                type="tel"
                required
                placeholder="+91 9876543210"
                value={formData.studentPhone}
                onChange={(e) => setFormData({ ...formData, studentPhone: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">City</label>
              <input
                type="text"
                placeholder="e.g. Bangalore"
                value={formData.studentCity}
                onChange={(e) => setFormData({ ...formData, studentCity: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Choose Learning Mode */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900">3. Choose Learning Mode</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: 'Live Online',
                title: 'Live Online Studio Class',
                desc: 'Interactive live Zoom classes + 1-on-1 mentor doubt resolution + LMS recordings',
              },
              {
                id: 'Hybrid Classroom',
                title: 'Hybrid Classroom Labs',
                desc: 'In-person institute lab practice + Weekend live mentor interaction',
              },
            ].map((mode) => (
              <div
                key={mode.id}
                onClick={() => setFormData({ ...formData, learningMode: mode.id })}
                className={`cursor-pointer p-5 rounded-2xl border transition-all space-y-2 ${
                  formData.learningMode === mode.id
                    ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-400'
                    : 'bg-slate-50 border-slate-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-slate-900 text-sm">{mode.title}</div>
                  <Building2 className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-xs text-slate-600 font-medium">{mode.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Review & Payment Integration Architecture */}
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-base font-bold text-slate-900">4. Review Order & Confirm Enrollment</h2>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Course Program:</span>
              <span className="font-extrabold text-slate-900">{course.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Batch Schedule:</span>
              <span className="font-extrabold text-purple-700">{formData.batchTiming}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Learning Mode:</span>
              <span className="font-extrabold text-slate-900">{formData.learningMode}</span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-slate-800 font-black">Net Total Amount:</span>
              <span className="text-2xl font-black gradient-text-bright">
                {formatCurrency(netFee)}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-purple-600" />
            <div>
              <div className="font-extrabold text-slate-900 mb-0.5">Payment Gateway Ready Architecture</div>
              <div className="font-medium text-slate-600">
                Payment integration payload configured. Clicking &quot;Submit Enrollment&quot; reserves your seat instantly in the batch database.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Confirmation Message */}
      {step === 5 && (
        <div className="py-8 text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
          <h2 className="text-2xl font-extrabold text-slate-900">Enrollment Confirmed!</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
            Your seat for <strong className="text-slate-900">{course.title}</strong> has been successfully registered. Redirecting to your Student LMS Dashboard...
          </p>
        </div>
      )}

      {/* Footer Nav Controls */}
      {step <= 4 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="bright-btn-secondary text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="bright-btn-primary font-bold text-xs px-6 py-2.5 rounded-xl flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCompleteEnrollment}
              disabled={submitting}
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-glow-brand transition-all flex items-center gap-1.5"
            >
              <span>{submitting ? 'Processing Enrollment...' : 'Submit Enrollment'}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
