'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Animated background with patterns changing shapes and moving around - Made by SVGator
 * 
 * Features:
 * - Fluid vector SVG patterns that morph continuously between distinct geometric & organic shapes.
 * - Dynamic motion paths, orbital drifting, and multi-layered parallax.
 * - Shifting geometric tessellations, rotating isometric facets, pulsing dash-array rings.
 * - Non-intrusive (pointer-events-none, z-0) ensuring all website interactions & features work seamlessly.
 * - Only active on pages other than the home page (pathname !== '/').
 */
export const SVGatorAnimatedPatternBackground: React.FC = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only add mouse parallax on non-home pages
    if (pathname === '/') return;

    // Skip heavy mouse tracking on touch / mobile devices for maximum speed & battery efficiency
    const isTouchOrMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    if (isTouchOrMobile) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isRunning = false;

    const updateParallax = () => {
      if (document.hidden) {
        isRunning = false;
        return;
      }

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (parallaxLayerRef.current) {
        parallaxLayerRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }

      // If difference is tiny, pause loop until next mouse move to save CPU
      if (Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02) {
        rafId = requestAnimationFrame(updateParallax);
      } else {
        isRunning = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 28;
      targetY = (e.clientY / innerHeight - 0.5) * 28;

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && !isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  // Do not render on home page or before hydration
  if (!mounted || pathname === '/') {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
      data-made-by="SVGator"
      data-animation="patterns-changing-shapes-and-moving-around"
    >


      {/* ── Layer 1: Animated SVG Tessellation Grid Pattern ──────────────── */}
      <div 
        className="absolute inset-0 opacity-[0.038]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%236366f1' stroke-width='1.2'%3E%3Cpath d='M40 0 L80 20 L80 60 L40 80 L0 60 L0 20 Z' opacity='0.7'/%3E%3Cpath d='M40 0 L40 40 L80 60' opacity='0.5'/%3E%3Cpath d='M40 40 L0 60' opacity='0.5'/%3E%3Ccircle cx='40' cy='40' r='3.5' fill='%238b5cf6' opacity='0.6'/%3E%3Ccircle cx='0' cy='20' r='2' fill='%2306b6d4' opacity='0.8'/%3E%3Ccircle cx='80' cy='20' r='2' fill='%2306b6d4' opacity='0.8'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
          animation: 'svgatorTessellationShift 42s linear infinite',
        }}
      />

      {/* ── Layer 2: Main Dynamic Morphing Vector Shapes Canvas ────────────── */}
      <div
        ref={parallaxLayerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          willChange: 'transform',
        }}
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Soft Radial Gradients for Liquid Blobs */}
            <linearGradient id="svgator-grad-purple-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.14" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.16" />
            </linearGradient>

            <linearGradient id="svgator-grad-indigo-pink" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.12" />
              <stop offset="60%" stopColor="#ec4899" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
            </linearGradient>

            <linearGradient id="svgator-grad-cyan-emerald" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.10" />
            </linearGradient>

            <linearGradient id="svgator-stroke-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>

            {/* Subtle Filter for Smooth Glow */}
            <filter id="svgator-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="16" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ── Shape 1: Top-Right Morphing Gradient Fluid Vector ──────────────── */}
          <g transform="translate(1020, -50)" style={{ animation: 'svgatorDriftPath1 28s ease-in-out infinite' }}>
            <path
              fill="url(#svgator-grad-purple-cyan)"
              stroke="url(#svgator-stroke-glow)"
              strokeWidth="1.5"
              filter="url(#svgator-glow)"
              style={{
                transformOrigin: '150px 160px',
                animation: 'svgatorMorph1 18s ease-in-out infinite',
              }}
              d="M150,50 C220,40 270,110 260,180 C250,250 190,290 120,280 C50,270 20,210 30,140 C40,70 80,60 150,50 Z"
            />
          </g>

          {/* ── Shape 2: Bottom-Left Morphing Fluid Shape ────────────────────── */}
          <g transform="translate(-100, 520)" style={{ animation: 'svgatorDriftPath2 32s ease-in-out infinite' }}>
            <path
              fill="url(#svgator-grad-indigo-pink)"
              stroke="url(#svgator-stroke-glow)"
              strokeWidth="1.5"
              filter="url(#svgator-glow)"
              style={{
                transformOrigin: '200px 180px',
                animation: 'svgatorMorph2 22s ease-in-out infinite',
              }}
              d="M200,80 Q290,50 320,140 Q350,230 260,280 Q170,330 110,250 Q50,170 120,100 Q170,60 200,80 Z"
            />
          </g>

          {/* ── Shape 3: Mid-Right Floating Orbiting Geometric Polygon Cluster ─── */}
          <g transform="translate(1160, 480)" style={{ animation: 'svgatorConstellationFloat 16s ease-in-out infinite' }}>
            {/* Dynamic Morphing Geometric Hexagram / Octagram */}
            <polygon
              points="120,40 180,75 180,145 120,180 60,145 60,75"
              fill="url(#svgator-grad-cyan-emerald)"
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeDasharray="6,4"
              style={{
                transformOrigin: '120px 110px',
                animation: 'svgatorPolygonMorph 20s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
              }}
            />
            {/* Concentric Rotating Dash Ring */}
            <circle
              cx="120"
              cy="110"
              r="85"
              fill="none"
              stroke="url(#svgator-stroke-glow)"
              strokeWidth="1.2"
              strokeDasharray="18,12,6,12"
              style={{
                transformOrigin: '120px 110px',
                animation: 'svgatorPulseRing 14s linear infinite',
              }}
            />
          </g>

          {/* ── Shape 4: Top-Left Floating Geometry & Morphing Rhombus ────────── */}
          <g transform="translate(140, 60)" style={{ animation: 'svgatorConstellationFloat 20s ease-in-out infinite reverse' }}>
            <rect
              x="60"
              y="60"
              width="100"
              height="100"
              rx="24"
              fill="url(#svgator-grad-purple-cyan)"
              stroke="#8b5cf6"
              strokeWidth="1.5"
              style={{
                transformOrigin: '110px 110px',
                animation: 'svgatorPolygonMorph 24s ease-in-out infinite',
              }}
            />
            <circle
              cx="110"
              cy="110"
              r="68"
              fill="none"
              stroke="#6366f1"
              strokeWidth="1"
              strokeDasharray="8,6"
              style={{
                transformOrigin: '110px 110px',
                animation: 'svgatorPulseRing 18s linear infinite reverse',
              }}
            />
          </g>

          {/* ── Floating Constellation Motifs & Micro-Shapes Moving Around ───── */}
          <g className="opacity-60">
            {/* Floating Cross 1 */}
            <g transform="translate(420, 180)" style={{ animation: 'svgatorDriftPath1 15s ease-in-out infinite' }}>
              <path d="M-8,0 L8,0 M0,-8 L0,8" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Floating Diamond 1 */}
            <g transform="translate(860, 220)" style={{ animation: 'svgatorDriftPath2 19s ease-in-out infinite' }}>
              <polygon points="0,-10 10,0 0,10 -10,0" fill="none" stroke="#06b6d4" strokeWidth="2" />
            </g>

            {/* Floating Triangles in Orbital Motion */}
            <g transform="translate(340, 720)" style={{ animation: 'svgatorConstellationFloat 13s ease-in-out infinite' }}>
              <polygon points="0,-14 12,10 -12,10" fill="none" stroke="#6366f1" strokeWidth="1.8" />
            </g>

            {/* Floating Concentric Pulse Dots */}
            <g transform="translate(980, 780)" style={{ animation: 'svgatorDriftPath1 22s ease-in-out infinite reverse' }}>
              <circle cx="0" cy="0" r="5" fill="#ec4899" opacity="0.4" />
              <circle cx="0" cy="0" r="14" fill="none" stroke="#ec4899" strokeWidth="1" strokeDasharray="4,4" />
            </g>

            {/* Flowing Wave Motion Trail */}
            <path
              d="M-50,380 C200,320 400,450 700,390 C1000,330 1200,420 1500,360"
              fill="none"
              stroke="url(#svgator-stroke-glow)"
              strokeWidth="1.2"
              strokeDasharray="12,16"
              opacity="0.25"
              style={{
                animation: 'svgatorPulseRing 30s linear infinite',
              }}
            />
            <path
              d="M-50,440 C250,520 450,380 780,470 C1100,540 1250,430 1500,490"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1"
              strokeDasharray="8,14"
              opacity="0.2"
              style={{
                animation: 'svgatorPulseRing 25s linear infinite reverse',
              }}
            />
          </g>
        </svg>
      </div>

      {/* ── Subtitle / Engine Tag (Invisible to interaction, crisp DOM markup) ── */}
      <div className="sr-only">
        Animated background with patterns changing shapes and moving around - Made by SVGator
      </div>
    </div>
  );
};
