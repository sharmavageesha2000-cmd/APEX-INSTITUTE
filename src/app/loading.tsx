import React from 'react';

export default function Loading() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
      <div className="h-10 bg-slate-900 rounded-2xl w-1/3 mx-auto" />
      <div className="h-6 bg-slate-900 rounded-xl w-1/2 mx-auto" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-72 bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-4">
            <div className="h-6 bg-slate-800 rounded-xl w-3/4" />
            <div className="h-4 bg-slate-800 rounded-lg w-full" />
            <div className="h-4 bg-slate-800 rounded-lg w-5/6" />
            <div className="h-10 bg-slate-800 rounded-xl w-full mt-6" />
          </div>
        ))}
      </div>
    </div>
  );
}
