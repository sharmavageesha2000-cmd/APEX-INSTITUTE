'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-purple-500/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30 font-bold text-xl">
            !
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white">Application Error</h1>
            <p className="text-xs text-slate-400">
              An unexpected error occurred. Click below to reload the application.
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-3.5 rounded-2xl shadow-lg transition-all"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
