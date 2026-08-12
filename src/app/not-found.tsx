import React from 'react';
import Link from 'next/link';
import { GraduationCap, Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-20 max-w-2xl mx-auto px-4 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto border border-purple-200 shadow-md">
        <GraduationCap className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-extrabold text-pink-700 bg-pink-100 px-3.5 py-1.5 rounded-full border border-pink-200 uppercase tracking-wider">
          PAGE NOT FOUND &bull; 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Oops! Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto">
          The course, domain, or article URL might have been moved or updated. Browse our course catalog below.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          href="/"
          className="w-full sm:w-auto bright-btn-primary px-6 py-3.5 text-xs shadow-md shadow-pink-500/20 flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>

        <Link
          href="/courses"
          className="w-full sm:w-auto bright-btn-secondary px-6 py-3.5 text-xs flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4 text-purple-600" />
          <span>Browse All Courses</span>
        </Link>
      </div>
    </div>
  );
}
