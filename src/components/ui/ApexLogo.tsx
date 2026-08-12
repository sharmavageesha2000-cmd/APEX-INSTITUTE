'use client';

import React from 'react';

interface ApexLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const ApexLogo: React.FC<ApexLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const iconSizeClasses = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-11 h-11 rounded-2xl',
    lg: 'w-15 h-15 rounded-2xl',
  };

  const svgSizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };

  const titleSizeClasses = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  const subtitleSizeClasses = {
    sm: 'text-[8.5px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  return (
    <div className={`flex items-center gap-3.5 group shrink-0 ${className}`}>
      {/* Minimal Abstract Education + Technology Symbol Logo Icon */}
      <div className="relative flex items-center justify-center">
        {/* Glow Halo matching Theme */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-60 blur-md group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"></div>

        {/* Minimal Icon Base Frame */}
        <div
          className={`relative ${iconSizeClasses[size]} bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 p-[1.5px] shadow-lg shadow-purple-500/25 flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300`}
        >
          <div className="w-full h-full rounded-[inherit] bg-slate-950 flex items-center justify-center relative overflow-hidden">
            {/* Subtle Sheen Overlay */}
            <div className="absolute -top-5 -left-5 w-10 h-10 bg-white/20 rounded-full blur-sm"></div>

            {/* Custom SVG: Open Book Base + Upward Arrow + Digital 'A' + Learning Spark */}
            <svg
              className={`${svgSizeClasses[size]} text-white filter drop-shadow-md`}
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Open Book Base Curves */}
              <path
                d="M4 25.5C8.5 22.5 15.5 22.5 18 24.5C20.5 22.5 27.5 22.5 32 25.5V28.5C27.5 25.5 20.5 25.5 18 27.5C15.5 25.5 8.5 25.5 4 28.5V25.5Z"
                fill="url(#apex-symbol-gradient)"
                opacity="0.85"
              />

              {/* Digital 'A' Chevron & Upward Growth Arrow */}
              <path
                d="M18 3.5L6.5 21H12.5L18 12.5L23.5 21H29.5L18 3.5Z"
                fill="url(#apex-symbol-gradient)"
              />

              {/* Arrow Bar / Book Spine Connector */}
              <path
                d="M14 18.5H22"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Learning Spark Star at Top Peak */}
              <path
                d="M18 1.5L19 3.5L21 4.5L19 5.5L18 7.5L17 5.5L15 4.5L17 3.5L18 1.5Z"
                fill="#FFE500"
              />

              <defs>
                <linearGradient
                  id="apex-symbol-gradient"
                  x1="4"
                  y1="3.5"
                  x2="32"
                  y2="28.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#EC4899" />
                  <stop offset="0.5" stopColor="#8B5CF6" />
                  <stop offset="1" stopColor="#4F46E5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Brand Name Typography (Space Grotesk Futuristic Geometric Sans) */}
      <div>
        <div className={`font-[family-name:var(--font-heading)] font-black tracking-[0.14em] sm:tracking-[0.18em] ${titleSizeClasses[size]} flex items-center gap-1.5 leading-none`}>
          <span className="text-slate-900 font-black">
            APEX
          </span>
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent font-black">
            INSTITUTE
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1 mt-1">
            <span className="inline-flex items-center gap-1 bg-purple-50 border border-purple-200/80 px-2 py-0.5 rounded-full text-purple-700 font-extrabold tracking-[0.2em] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></span>
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
