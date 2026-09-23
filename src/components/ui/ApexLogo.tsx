'use client';

import React from 'react';

interface ApexLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
}

export const ApexLogo: React.FC<ApexLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const iconSizeClasses = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-9 h-9 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
  };

  const titleSizeClasses = {
    sm: 'text-base sm:text-lg',
    md: 'text-base sm:text-2xl',
    lg: 'text-xl sm:text-3xl',
  };

  const subtitleSizeClasses = {
    sm: 'text-[8.5px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-3.5 group shrink-0 ${className}`}>
      {/* Official Apex Institute Logo Symbol Icon */}
      <div className="relative flex items-center justify-center shrink-0">
        {/* Subtle Ambient Glow matching Theme */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-400 via-purple-600 to-indigo-600 opacity-25 blur-md group-hover:opacity-75 group-hover:scale-110 transition-all duration-300 pointer-events-none"></div>

        {/* Logo Image */}
        <div className={`relative ${iconSizeClasses[size]} flex items-center justify-center`}>
          <img
            src="/images/apex_logo_symbol.png"
            alt="Apex Institute Logo"
            className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Brand Name Typography (Space Grotesk Futuristic Geometric Sans) */}
      <div>
        <div className={`font-[family-name:var(--font-heading)] font-black tracking-[0.14em] sm:tracking-[0.18em] ${titleSizeClasses[size]} flex items-center gap-1.5 leading-none`}>
          <span className={isDark ? "text-white font-black drop-shadow-sm" : "text-slate-900 font-black"}>
            APEX
          </span>
          <span className={isDark ? "bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-100 bg-clip-text text-transparent font-black" : "bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent font-black"}>
            INSTITUTE
          </span>
        </div>

        {showSubtitle && (
          <div className="hidden sm:flex items-center gap-1 mt-1">
            <span className={isDark ? "inline-flex items-center gap-1 bg-white/10 border border-white/20 px-2 py-0.5 rounded-full text-purple-200 font-extrabold tracking-[0.2em] uppercase shadow-xs" : "inline-flex items-center gap-1 bg-purple-50 border border-purple-200/80 px-2 py-0.5 rounded-full text-purple-700 font-extrabold tracking-[0.2em] uppercase shadow-xs"}>
              <span className={isDark ? "w-1.5 h-1.5 rounded-full bg-purple-300 animate-pulse" : "w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"}></span>
              <span className={`font-[family-name:var(--font-heading)] ${subtitleSizeClasses[size]}`}>
                EdTech &amp; Career Mastery
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
