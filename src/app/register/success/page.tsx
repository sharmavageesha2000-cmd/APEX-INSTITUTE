import React, { Suspense } from 'react';
import { RegisterSuccessClient } from '@/components/auth/RegisterSuccessClient';
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Enrollment Confirmed | Apex Tech Institute',
  description: 'Your course registration payment via Stripe has been verified successfully.',
};

export default function RegisterSuccessPage() {
  return (
    <div className="py-12 max-w-2xl mx-auto px-4 sm:px-6 min-h-[70vh] flex flex-col justify-center">
      <Suspense
        fallback={
          <div className="text-center p-8 bg-white rounded-3xl border border-purple-200 shadow-xl max-w-md mx-auto">
            <Loader2 className="w-10 h-10 text-purple-600 animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-600 font-bold">Loading payment confirmation...</p>
          </div>
        }
      >
        <RegisterSuccessClient />
      </Suspense>
    </div>
  );
}
