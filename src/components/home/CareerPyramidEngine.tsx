'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Play,
  Pause,
  RotateCw,
  Compass,
  Code2,
  Briefcase,
  ShieldCheck,
  Eye,
} from 'lucide-react';

interface TierData {
  id: number;
  tierNumber: string;
  title: string;
  tagline: string;
  shortDescription: string;
  badgeText: string;
  statBadge: string;
  icon: React.ElementType;
  ctaText: string;
  ctaLink: string;
  highlights: {
    title: string;
    description: string;
  }[];
}

const PYRAMID_TIERS: TierData[] = [
  {
    id: 1,
    tierNumber: '01',
    title: 'Skill Up & Stand Out',
    tagline: 'Foundations & In-Demand Tech Stacks',
    badgeText: 'Stage 1 • Foundation',
    statBadge: '50+ Tech Modules',
    icon: Compass,
    ctaText: 'Explore Foundation Courses',
    ctaLink: '/courses',
    shortDescription:
      'Master high-demand tech stacks with structured curricula designed by senior software architects. Gain solid conceptual clarity, hands-on tool fluency, and recognized credentials that distinguish your profile to recruiters.',
    highlights: [
      {
        title: 'Mentor-Led Live Classes',
        description: 'Interactive daily sessions with working engineers for real-time guidance & instant doubt clearing.',
      },
      {
        title: 'Modern 2026 Tech Stacks',
        description: 'Updated tracks covering Full Stack, Cloud, DevOps, Data Science & AI engineering.',
      },
      {
        title: 'Verifiable Credentials',
        description: 'Recognized certificates and skill badges trusted across 500+ tech enterprises.',
      },
    ],
  },
  {
    id: 2,
    tierNumber: '02',
    title: 'Build What Matters',
    tagline: 'Practical Labs & Production Engineering',
    badgeText: 'Stage 2 • Practical Labs',
    statBadge: '100% Live Cloud Labs',
    icon: Code2,
    ctaText: 'View Practical Labs & Projects',
    ctaLink: '/courses',
    shortDescription:
      'Shift from passive tutorials to engineering scalable systems. Work in dedicated live cloud sandboxes, build end-to-end full-stack applications, and compile a verified GitHub portfolio proving day-one job readiness.',
    highlights: [
      {
        title: '100% Practical Live Labs',
        description: 'Zero-config cloud developer sandboxes replicating production infrastructure.',
      },
      {
        title: '5+ Capstone Projects',
        description: 'Architect microservices, REST APIs, database schemas, and deploy live web applications.',
      },
      {
        title: 'Verified GitHub Portfolio',
        description: 'Active repositories, clean git commit histories, and peer-reviewed production code.',
      },
    ],
  },
  {
    id: 3,
    tierNumber: '03',
    title: 'Progress With Confidence',
    tagline: 'Placement Support & Career Launch',
    badgeText: 'Stage 3 • Placement',
    statBadge: '15 LPA Highest • 500+ Placed',
    icon: Briefcase,
    ctaText: 'Explore Placement Pathways',
    ctaLink: '/career-finder',
    shortDescription:
      'Bridge the final mile to your dream tech offer. Our dedicated placement cell provides 1-on-1 resume optimization, intensive technical mock interviews with tech leaders, and direct access to top MNC & startup hiring drives.',
    highlights: [
      {
        title: '1-on-1 Mock Tech Interviews',
        description: 'Rigorous coding simulations, system design reviews, and behavioral rounds with experts.',
      },
      {
        title: '500+ Partner Fast-Track',
        description: 'Direct recruitment drives, verified referrals, and exclusive daily openings.',
      },
      {
        title: 'Salary Negotiation Mentorship',
        description: 'Personalized guidance until offer letter signing to help you secure peak market compensation.',
      },
    ],
  },
];

export const CareerPyramidEngine: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3); // 1, 2, or 3
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(0.55); // Front-isometric angle (~31 deg)

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartAngleRef = useRef<number>(0.55);

  const STEP_DURATION_MS = 2800; // 2.8s per step (within 2-3 sec requirement)

  // 1. 2-3s Auto-cycle between Step 1 -> 2 -> 3 -> 1
  useEffect(() => {
    if (isPaused) return;

    startTimeRef.current = Date.now();
    setProgress(0);

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / STEP_DURATION_MS) * 100);
      setProgress(pct);

      if (elapsed >= STEP_DURATION_MS) {
        setActiveStep((prev) => (prev % 3) + 1);
        startTimeRef.current = Date.now();
        setProgress(0);
      }
    }, 40);

    return () => clearInterval(progressInterval);
  }, [activeStep, isPaused]);

  // 2. Smooth Continuous 3D Rotation Animation
  useEffect(() => {
    let lastTime = performance.now();

    const renderLoop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Auto-revolve smoothly when not dragging
      if (!isDraggingRef.current) {
        setRotationAngle((prev) => (prev + delta * 0.42) % (Math.PI * 2));
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // 3. Render 3D Stepped Pyramid to Canvas (FRONT-FACING VIEW, LOOKING SLIGHTLY DOWN)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2 + 10;
    const pitch = 0.38; // Looking down from above (~22 degrees elevation) for clean front-look

    // Helper: 3D to 2D projection
    const project = (x: number, yCenter: number, yOffset: number, z: number) => {
      const rx = x * Math.cos(rotationAngle) + z * Math.sin(rotationAngle);
      const rz = -x * Math.sin(rotationAngle) + z * Math.cos(rotationAngle);
      const wy = yCenter + yOffset;

      const px = cx + rx;
      const py = cy + wy * Math.cos(pitch) + rz * Math.sin(pitch);
      return { x: px, y: py, rx, rz };
    };

    // Helper: 2D Face visibility test (backface culling)
    const isFaceVisible = (v0: { x: number; y: number }, v1: { x: number; y: number }, v2: { x: number; y: number }) => {
      const cross = (v1.x - v0.x) * (v2.y - v1.y) - (v1.y - v0.y) * (v2.x - v1.x);
      return cross > 0;
    };

    // Draw a quad face
    const drawQuad = (
      points: { x: number; y: number }[],
      fillColor: string,
      strokeColor: string,
      lineWidth = 1.5
    ) => {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    // A. Soft Diffused Pink Glow Shadow Underneath Base Plinth
    const shadowGradient = ctx.createRadialGradient(cx, cy + 76, 15, cx, cy + 76, 120);
    shadowGradient.addColorStop(0, 'rgba(244, 63, 94, 0.42)');
    shadowGradient.addColorStop(0.5, 'rgba(244, 63, 94, 0.16)');
    shadowGradient.addColorStop(1, 'rgba(244, 63, 94, 0)');

    ctx.save();
    ctx.scale(1, 0.42);
    ctx.beginPath();
    ctx.arc(cx, (cy + 76) / 0.42, 120, 0, Math.PI * 2);
    ctx.fillStyle = shadowGradient;
    ctx.fill();
    ctx.restore();

    // B. Reusable Function to Draw a Solid 3D Box
    const drawBox = (
      yCenter: number,
      w: number,
      h: number,
      d: number,
      isActive: boolean,
      labelNumber?: string,
      isBase = false
    ) => {
      const hw = w / 2;
      const hh = h / 2;
      const hd = d / 2;

      // 8 Vertices
      const vTopLB = project(-hw, yCenter, -hh, -hd);
      const vTopRB = project(hw, yCenter, -hh, -hd);
      const vTopRF = project(hw, yCenter, -hh, hd);
      const vTopLF = project(-hw, yCenter, -hh, hd);

      const vBotLB = project(-hw, yCenter, hh, -hd);
      const vBotRB = project(hw, yCenter, hh, -hd);
      const vBotRF = project(hw, yCenter, hh, hd);
      const vBotLF = project(-hw, yCenter, hh, hd);

      let topFill: string;
      let topStroke: string;
      let frontFill: string;
      let frontStroke: string;
      let rightFill: string;
      let rightStroke: string;
      let backFill: string;
      let leftFill: string;
      let textColor: string;

      if (isBase) {
        topFill = '#272a30';
        topStroke = '#374151';
        frontFill = '#1c2027';
        frontStroke = '#374151';
        rightFill = '#15181e';
        rightStroke = '#374151';
        backFill = '#0f1115';
        leftFill = '#14171d';
        textColor = 'transparent';
      } else if (isActive) {
        topFill = '#e11438';
        topStroke = '#ffffff';
        frontFill = '#e11438';
        frontStroke = '#fda4af';
        rightFill = '#be123c';
        rightStroke = '#fda4af';
        backFill = '#9f1239';
        leftFill = '#be123c';
        textColor = '#ffffff';
      } else {
        topFill = '#ffffff';
        topStroke = '#cbd5e1';
        frontFill = '#ffffff';
        frontStroke = '#cbd5e1';
        rightFill = '#f1f5f9';
        rightStroke = '#cbd5e1';
        backFill = '#e2e8f0';
        leftFill = '#f8fafc';
        textColor = '#94a3b8';
      }

      if (isActive && !isBase) {
        ctx.save();
        ctx.shadowColor = 'rgba(225, 20, 56, 0.6)';
        ctx.shadowBlur = 28;
      }

      // 1. Front Face
      if (isFaceVisible(vTopLF, vTopRF, vBotRF)) {
        drawQuad([vTopLF, vTopRF, vBotRF, vBotLF], frontFill, frontStroke);
        if (labelNumber) {
          ctx.save();
          ctx.font = '900 24px Inter, sans-serif';
          ctx.fillStyle = textColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const midX = (vTopLF.x + vTopRF.x + vBotRF.x + vBotLF.x) / 4;
          const midY = (vTopLF.y + vTopRF.y + vBotRF.y + vBotLF.y) / 4;
          ctx.fillText(labelNumber, midX, midY);
          ctx.restore();
        }
      }

      // 2. Right Face
      if (isFaceVisible(vTopRF, vTopRB, vBotRB)) {
        drawQuad([vTopRF, vTopRB, vBotRB, vBotRF], rightFill, rightStroke);
        if (labelNumber) {
          ctx.save();
          ctx.font = '900 24px Inter, sans-serif';
          ctx.fillStyle = textColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const midX = (vTopRF.x + vTopRB.x + vBotRB.x + vBotRF.x) / 4;
          const midY = (vTopRF.y + vTopRB.y + vBotRB.y + vBotRF.y) / 4;
          ctx.fillText(labelNumber, midX, midY);
          ctx.restore();
        }
      }

      // 3. Back Face
      if (isFaceVisible(vTopRB, vTopLB, vBotLB)) {
        drawQuad([vTopRB, vTopLB, vBotLB, vBotRB], backFill, frontStroke);
      }

      // 4. Left Face
      if (isFaceVisible(vTopLB, vTopLF, vBotLF)) {
        drawQuad([vTopLB, vTopLF, vBotLF, vBotLB], leftFill, frontStroke);
      }

      // 5. Top Face
      if (isFaceVisible(vTopLB, vTopRB, vTopRF)) {
        drawQuad([vTopLB, vTopRB, vTopRF, vTopLF], topFill, topStroke, isActive ? 2 : 1.5);

        // Crosshair Grid Lines on Top Face
        ctx.beginPath();
        const midTopBack = { x: (vTopLB.x + vTopRB.x) / 2, y: (vTopLB.y + vTopRB.y) / 2 };
        const midTopFront = { x: (vTopLF.x + vTopRF.x) / 2, y: (vTopLF.y + vTopRF.y) / 2 };
        ctx.moveTo(midTopBack.x, midTopBack.y);
        ctx.lineTo(midTopFront.x, midTopFront.y);

        const midTopLeft = { x: (vTopLB.x + vTopLF.x) / 2, y: (vTopLB.y + vTopLF.y) / 2 };
        const midTopRight = { x: (vTopRB.x + vTopRF.x) / 2, y: (vTopRB.y + vTopRF.y) / 2 };
        ctx.moveTo(midTopLeft.x, midTopLeft.y);
        ctx.lineTo(midTopRight.x, midTopRight.y);

        ctx.strokeStyle = isActive ? 'rgba(255, 255, 255, 0.65)' : 'rgba(203, 213, 225, 0.6)';
        ctx.lineWidth = isActive ? 1.5 : 1;
        ctx.stroke();
      }

      if (isActive && !isBase) {
        ctx.restore();
      }
    };

    // C. Render Pyramid Stack (Proportionally scaled to remove irrelevant empty space)
    // 1. Base Pedestal
    drawBox(56, 205, 24, 205, false, undefined, true);

    // 2. Tier 03 (Bottom Box — Widest)
    drawBox(20, 172, 42, 172, activeStep === 3, '03');

    // 3. Tier 02 (Middle Box — Medium)
    drawBox(-22, 126, 40, 126, activeStep === 2, '02');

    // 4. Tier 01 (Top Box — Cube)
    drawBox(-64, 82, 40, 82, activeStep === 1, '01');

  }, [rotationAngle, activeStep]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = rotationAngle;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    setRotationAngle((dragStartAngleRef.current + deltaX * 0.012) % (Math.PI * 2));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      isDraggingRef.current = true;
      dragStartXRef.current = e.touches[0].clientX;
      dragStartAngleRef.current = rotationAngle;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - dragStartXRef.current;
    setRotationAngle((dragStartAngleRef.current + deltaX * 0.012) % (Math.PI * 2));
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const handleSelectStep = (stepNumber: number) => {
    setActiveStep(stepNumber);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const currentTier = PYRAMID_TIERS.find((t) => t.id === activeStep) || PYRAMID_TIERS[0];

  return (
    <section className="bg-gradient-to-b from-white via-[#fcf8ff] to-[#f4ebfd] py-8 sm:py-12 border-b border-purple-200/80 relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-6 left-10 w-72 h-72 bg-pink-300/15 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-6 right-10 w-72 h-72 bg-purple-400/15 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        {/* Compact Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-600 animate-spin" />
            <span>Interactive 3-Tier Career Framework</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            The 3-Tier Career <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">Mastery Engine</span>
          </h2>

          <p className="text-xs sm:text-[13px] text-slate-600 font-semibold max-w-xl mx-auto leading-relaxed">
            A structured three-phase methodology taking you from core fundamentals to practical engineering and confident placements.
          </p>

          {/* Quick Header Controls */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {[1, 2, 3].map((step) => {
              const isActive = activeStep === step;
              return (
                <button
                  key={step}
                  onClick={() => handleSelectStep(step)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition-all ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25 scale-105'
                      : 'bg-white/90 text-slate-700 border border-purple-200 hover:border-rose-300 hover:text-rose-600'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white animate-ping' : 'bg-slate-300'}`} />
                  <span>Phase 0{step}</span>
                </button>
              );
            })}

            {/* Play / Pause button beside 1, 2, 3 */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Resume auto-cycle' : 'Pause auto-cycle'}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition-all shadow-xs border cursor-pointer ${
                isPaused
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/25'
                  : 'bg-white text-slate-700 border-purple-200 hover:border-rose-300 hover:text-rose-600'
              }`}
            >
              {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current text-rose-600" />}
              <span>{isPaused ? 'Play' : 'Pause'}</span>
            </button>

            <button
              onClick={() => setRotationAngle(0.55)}
              title="Reset to Front Isometric Angle"
              className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-white border border-purple-200 hover:text-rose-600 hover:border-rose-300 px-2.5 py-1 rounded-full shadow-xs transition-all"
            >
              <Eye className="w-3 h-3 text-rose-500" />
              <span>Front View</span>
            </button>
          </div>
        </div>

        {/* 2-Column Balanced Ergonomic Layout (Height ~380px) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ══════════════════════════════════════════════════════════════ */}
          {/* LEFT: 3D Front-Look Stepped Pyramid Diagram                  */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div
              className="relative w-full max-w-[420px] h-[370px] rounded-[2rem] bg-gradient-to-b from-white/95 via-rose-50/20 to-purple-50/40 border border-purple-200/90 shadow-xl overflow-hidden flex flex-col items-center justify-center select-none cursor-grab active:cursor-grabbing group"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
                <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-purple-100 shadow-xs">
                  <RotateCw className="w-2.5 h-2.5 text-rose-600 animate-spin" />
                  <span>3D ROLLING • DRAG TO ROTATE</span>
                </span>

                <span className="text-[9px] font-black text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  {activeStep === 1 ? 'Box 01 Active' : activeStep === 2 ? 'Box 02 Active' : 'Box 03 Active'}
                </span>
              </div>

              {/* Floating Annotation Pointers (Snugly Framed Around Pyramid) */}
              
              {/* Pointer 01: Top-Right */}
              <div
                onClick={() => handleSelectStep(1)}
                className={`absolute top-7 right-3 z-20 cursor-pointer transition-all duration-300 flex items-center gap-1.5 ${
                  activeStep === 1 ? 'scale-105 opacity-100' : 'opacity-75 hover:opacity-100'
                }`}
              >
                <div className="hidden sm:flex items-center">
                  <div className={`h-[1px] w-6 transition-colors ${activeStep === 1 ? 'bg-rose-500' : 'bg-slate-300'}`} />
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${activeStep === 1 ? 'bg-rose-500 shadow-md shadow-rose-500/50' : 'bg-slate-400'}`} />
                </div>
                <div
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-black transition-all shadow-xs ${
                    activeStep === 1
                      ? 'bg-rose-600 text-white border-rose-600 shadow-rose-500/30'
                      : 'bg-white/90 text-slate-800 border-slate-200'
                  }`}
                >
                  <span className="text-[10px] opacity-75 mr-1 font-bold">01</span>
                  Skill Up &amp; Stand Out
                </div>
              </div>

              {/* Pointer 02: Middle-Left */}
              <div
                onClick={() => handleSelectStep(2)}
                className={`absolute top-[48%] -translate-y-1/2 left-3 z-20 cursor-pointer transition-all duration-300 flex items-center gap-1.5 ${
                  activeStep === 2 ? 'scale-105 opacity-100' : 'opacity-75 hover:opacity-100'
                }`}
              >
                <div
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-black transition-all shadow-xs ${
                    activeStep === 2
                      ? 'bg-rose-600 text-white border-rose-600 shadow-rose-500/30'
                      : 'bg-white/90 text-slate-800 border-slate-200'
                  }`}
                >
                  <span className="text-[10px] opacity-75 mr-1 font-bold">02</span>
                  Build What Matters
                </div>
                <div className="hidden sm:flex items-center">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${activeStep === 2 ? 'bg-rose-500 shadow-md shadow-rose-500/50' : 'bg-slate-400'}`} />
                  <div className={`h-[1px] w-6 transition-colors ${activeStep === 2 ? 'bg-rose-500' : 'bg-slate-300'}`} />
                </div>
              </div>

              {/* Pointer 03: Bottom-Right */}
              <div
                onClick={() => handleSelectStep(3)}
                className={`absolute bottom-8 right-3 z-20 cursor-pointer transition-all duration-300 flex items-center gap-1.5 ${
                  activeStep === 3 ? 'scale-105 opacity-100' : 'opacity-75 hover:opacity-100'
                }`}
              >
                <div className="hidden sm:flex items-center">
                  <div className={`h-[1px] w-6 transition-colors ${activeStep === 3 ? 'bg-rose-500' : 'bg-slate-300'}`} />
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${activeStep === 3 ? 'bg-rose-500 shadow-md shadow-rose-500/50' : 'bg-slate-400'}`} />
                </div>
                <div
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-black transition-all shadow-xs ${
                    activeStep === 3
                      ? 'bg-rose-600 text-white border-rose-600 shadow-rose-500/30'
                      : 'bg-white/90 text-slate-800 border-slate-200'
                  }`}
                >
                  <span className="text-[10px] opacity-75 mr-1 font-bold">03</span>
                  Progress With Confidence
                </div>
              </div>

              {/* 3D Canvas */}
              <canvas
                ref={canvasRef}
                width={420}
                height={370}
                className="w-full h-full max-w-[420px] max-h-[370px] pointer-events-none"
              />

              {/* Bottom Instructions Badge */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <span className="text-[10px] font-bold text-slate-400 bg-white/75 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-purple-100 shadow-2xs">
                  Auto-cycle every 2.8s • Drag to rotate
                </span>
              </div>
            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* RIGHT: Unified Synchronized Dynamic Content Card             */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div
              key={currentTier.id}
              className="playful-card p-5 sm:p-6 border-rose-200 bg-white/95 shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[370px] animate-fadeIn"
            >
              {/* Integrated Top Live Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="space-y-4">
                
                {/* Header Row: Stage badge, Stat pill, and Play/Pause control */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    <currentTier.icon className="w-3.5 h-3.5 text-rose-600" />
                    <span>{currentTier.badgeText}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {currentTier.statBadge}
                    </span>

                    {/* Integrated Play/Pause button */}
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      title={isPaused ? "Resume auto-cycle" : "Pause auto-cycle"}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black transition-all shadow-xs border cursor-pointer ${
                        isPaused
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/25'
                          : 'bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 border-purple-200'
                      }`}
                    >
                      {isPaused ? (
                        <>
                          <Play className="w-3 h-3 fill-current text-white" />
                          <span>Resume</span>
                        </>
                      ) : (
                        <>
                          <Pause className="w-3 h-3 fill-current text-rose-600" />
                          <span>Pause</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl sm:text-3xl font-black text-rose-600">
                      {currentTier.tierNumber}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                      {currentTier.title}
                    </h3>
                  </div>
                  <p className="text-[11px] font-extrabold text-purple-700 uppercase tracking-wider">
                    {currentTier.tagline}
                  </p>
                </div>

                {/* Short, Precise & Meaningful Description */}
                <p className="text-xs sm:text-[13px] text-slate-600 font-semibold leading-relaxed">
                  {currentTier.shortDescription}
                </p>

                {/* 3 Core Highlights in Compact Eye-Comfortable Cards */}
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Core Advantages &amp; Deliverables:
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {currentTier.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="p-2 sm:p-2.5 rounded-xl bg-rose-50/40 border border-rose-100 flex items-start gap-2.5 hover:bg-rose-50/70 transition-colors"
                      >
                        <div className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                        <div className="leading-snug">
                          <span className="text-xs font-black text-slate-900 mr-1.5">{h.title}:</span>
                          <span className="text-[11px] text-slate-600 font-medium">{h.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action CTA & Verification Footer */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 mt-3">
                <Link
                  href={currentTier.ctaLink}
                  className="w-full sm:w-auto bright-btn-primary px-5 py-2.5 text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/25"
                >
                  <span>{currentTier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ISO 9001:2026 Certified • Live Live Labs</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
