'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (error?.digest?.startsWith('NEXT_REDIRECT') || error?.message === 'NEXT_REDIRECT') {
    throw error;
  }

  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="py-16 sm:py-20 max-w-xl mx-auto px-4 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200 shadow-sm">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          RUNTIME NOTIFICATION
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Something Went Wrong
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
          We encountered an unexpected issue while loading this page. Please try again or return home.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="w-full sm:w-auto bright-btn-primary text-xs px-6 py-3.5 flex items-center justify-center gap-2 font-bold shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto bright-btn-secondary text-xs px-6 py-3.5 flex items-center justify-center gap-2 font-bold"
        >
          <Home className="w-4 h-4 text-purple-600" />
          <span>Go to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
