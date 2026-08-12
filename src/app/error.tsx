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
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-rose-600/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
          RUNTIME ERROR
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Something Went Wrong
        </h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          We encountered an unexpected issue while loading this page. Please try again or return home.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-glow-brand transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-6 py-3.5 rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Go to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
