'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export const ARVRMotionGraphicsEffect: React.FC = () => {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // If on home page, do nothing
    if (pathname === '/') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse between -1 and 1
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ── 3D Icosahedron Vertex & Edge Construction ──────────
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    // Normalize vertices
    const icoVertices = rawVertices.map(v => {
      const len = Math.hypot(v[0], v[1], v[2]);
      return [v[0] / len, v[1] / len, v[2] / len];
    });

    // Generate edges by distance between vertices
    const icoEdges: [number, number][] = [];
    for (let i = 0; i < icoVertices.length; i++) {
      for (let j = i + 1; j < icoVertices.length; j++) {
        const dx = icoVertices[i][0] - icoVertices[j][0];
        const dy = icoVertices[i][1] - icoVertices[j][1];
        const dz = icoVertices[i][2] - icoVertices[j][2];
        const dist = Math.hypot(dx, dy, dz);
        if (Math.abs(dist - 1.05) < 0.15) {
          icoEdges.push([i, j]);
        }
      }
    }

    // ── 3D Matrix Background Floating Nodes ────────────────
    const PARTICLE_COUNT = 32;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 1200,
      y: (Math.random() - 0.5) * 900,
      z: (Math.random() - 0.5) * 600,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: (Math.random() - 0.5) * 0.4,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Animation Variables
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;
    let gyroAngle1 = 0;
    let gyroAngle2 = 0;
    let gyroAngle3 = 0;
    let scanY = 0;
    let scanDirection = 1;

    const render = () => {
      // Eased mouse parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // LiDAR Scanning Laser Beam
      scanY += 1.8 * scanDirection;
      if (scanY > height) {
        scanY = height;
        scanDirection = -1;
      } else if (scanY < 0) {
        scanY = 0;
        scanDirection = 1;
      }

      // Draw faint LiDAR horizontal line and ambient laser sweep
      const laserGrad = ctx.createLinearGradient(0, scanY - 35 * scanDirection, 0, scanY);
      laserGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
      laserGrad.addColorStop(0.7, 'rgba(139, 92, 246, 0.03)');
      laserGrad.addColorStop(1, 'rgba(6, 182, 212, 0.12)');
      ctx.fillStyle = laserGrad;
      ctx.fillRect(0, scanDirection > 0 ? scanY - 35 : scanY, width, 35);

      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 12]);
      ctx.stroke();
      ctx.setLineDash([]);

      // ── 1. Render Floating 3D Spatial Particles ──────────
      const fov = 650;
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.pulse += 0.03;

        if (p.x < -600 || p.x > 600) p.vx *= -1;
        if (p.y < -450 || p.y > 450) p.vy *= -1;
        if (p.z < -300 || p.z > 300) p.vz *= -1;

        // Apply mouse tilt to particles
        const px = p.x + mouseRef.current.x * 40;
        const py = p.y + mouseRef.current.y * 30;
        const pz = p.z + 400;

        const scale = fov / (fov + pz);
        const sx = width / 2 + px * scale;
        const sy = height / 2 + py * scale;

        if (scale > 0 && sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          const alpha = Math.max(0.08, Math.min(0.28, scale * 0.25 + Math.sin(p.pulse) * 0.08));
          ctx.fillStyle = idx % 2 === 0 ? `rgba(6, 182, 212, ${alpha})` : `rgba(168, 85, 247, ${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 2 * scale, 0, Math.PI * 2);
          ctx.fill();

          // Interconnect close particles (spatial AR mesh)
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const d = Math.hypot(p.x - p2.x, p.y - p2.y, p.z - p2.z);
            if (d < 160) {
              const lineAlpha = (1 - d / 160) * 0.12;
              const p2z = p2.z + 400;
              const scale2 = fov / (fov + p2z);
              const s2x = width / 2 + (p2.x + mouseRef.current.x * 40) * scale2;
              const s2y = height / 2 + (p2.y + mouseRef.current.y * 30) * scale2;
              ctx.beginPath();
              ctx.moveTo(sx, sy);
              ctx.lineTo(s2x, s2y);
              ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      });

      // ── 2. Render 3D Holographic Wireframe Icosahedron ──
      // Positioned gracefully in top-right ambient quadrant
      const icoRadius = Math.min(width, height) * 0.16;
      const icoCenterX = width * 0.84;
      const icoCenterY = Math.max(160, height * 0.26);

      angleX += 0.006;
      angleY += 0.009;
      angleZ += 0.004;

      const totalRotX = angleX + mouseRef.current.y * 0.4;
      const totalRotY = angleY + mouseRef.current.x * 0.5;
      const totalRotZ = angleZ;

      // 3D Rotation helper
      const rotate3D = (x: number, y: number, z: number, rx: number, ry: number, rz: number) => {
        // Rotate Z
        let x1 = x * Math.cos(rz) - y * Math.sin(rz);
        let y1 = x * Math.sin(rz) + y * Math.cos(rz);
        let z1 = z;
        // Rotate Y
        let x2 = x1 * Math.cos(ry) + z1 * Math.sin(ry);
        let y2 = y1;
        let z2 = -x1 * Math.sin(ry) + z1 * Math.cos(ry);
        // Rotate X
        let x3 = x2;
        let y3 = y2 * Math.cos(rx) - z2 * Math.sin(rx);
        let z3 = y2 * Math.sin(rx) + z2 * Math.cos(rx);
        return [x3, y3, z3];
      };

      const projectedIco = icoVertices.map(v => {
        const [rx, ry, rz] = rotate3D(v[0] * icoRadius, v[1] * icoRadius, v[2] * icoRadius, totalRotX, totalRotY, totalRotZ);
        const zDist = fov + rz;
        const scale = fov / zDist;
        return {
          x: icoCenterX + rx * scale,
          y: icoCenterY + ry * scale,
          z: rz,
          scale,
        };
      });

      // Draw Icosahedron Edges with depth and LiDAR reaction
      icoEdges.forEach(([startIdx, endIdx]) => {
        const p1 = projectedIco[startIdx];
        const p2 = projectedIco[endIdx];
        const avgZ = (p1.z + p2.z) / 2;
        const avgY = (p1.y + p2.y) / 2;

        // Is scanline near this edge?
        const scanDist = Math.abs(avgY - scanY);
        const scanBoost = scanDist < 60 ? (1 - scanDist / 60) * 0.4 : 0;

        const baseAlpha = Math.max(0.08, 0.22 + (avgZ / icoRadius) * 0.12) + scanBoost;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = scanBoost > 0.15 ? `rgba(6, 182, 212, ${baseAlpha})` : `rgba(139, 92, 246, ${baseAlpha})`;
        ctx.lineWidth = scanBoost > 0.15 ? 1.5 : 1;
        ctx.stroke();
      });

      // Draw Icosahedron Vertex Nodes
      projectedIco.forEach(p => {
        const alpha = Math.max(0.15, 0.35 + (p.z / icoRadius) * 0.2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
        ctx.fill();
      });

      // ── 3. Render 3D Spatial Gyroscope / IMU Orbital Rings ──
      // Positioned gracefully in bottom-left ambient quadrant
      const gyroRadius = Math.min(width, height) * 0.15;
      const gyroCenterX = width * 0.14;
      const gyroCenterY = Math.min(height - 180, height * 0.76);

      gyroAngle1 += 0.007;
      gyroAngle2 += 0.005;
      gyroAngle3 += 0.009;

      const drawGyroRing = (radius: number, rx: number, ry: number, rz: number, color: string, alphaBase: number) => {
        const STEPS = 48;
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= STEPS; i++) {
          const theta = (i / STEPS) * Math.PI * 2;
          const x = Math.cos(theta) * radius;
          const y = Math.sin(theta) * radius;
          const z = 0;
          const [rotX, rotY, rotZ] = rotate3D(x, y, z, rx, ry, rz);
          const scale = fov / (fov + rotZ);
          const px = gyroCenterX + rotX * scale;
          const py = gyroCenterY + rotY * scale;

          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.strokeStyle = color.replace('ALPHA', alphaBase.toString());
        ctx.lineWidth = 1.2;
        ctx.stroke();
      };

      // 3 Gimbal rings
      drawGyroRing(gyroRadius, gyroAngle1 + mouseRef.current.y * 0.3, gyroAngle2, 0, 'rgba(6, 182, 212, ALPHA)', 0.28);
      drawGyroRing(gyroRadius * 0.82, gyroAngle2, 0, gyroAngle3 + mouseRef.current.x * 0.3, 'rgba(168, 85, 247, ALPHA)', 0.24);
      drawGyroRing(gyroRadius * 0.65, 0, gyroAngle3, gyroAngle1, 'rgba(59, 130, 246, ALPHA)', 0.2);

      // Gyro Core Node
      ctx.beginPath();
      ctx.arc(gyroCenterX, gyroCenterY, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
      ctx.fill();

      // Gyro spatial crosshair ticks
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(gyroCenterX - gyroRadius * 1.15, gyroCenterY);
      ctx.lineTo(gyroCenterX + gyroRadius * 1.15, gyroCenterY);
      ctx.moveTo(gyroCenterX, gyroCenterY - gyroRadius * 1.15);
      ctx.lineTo(gyroCenterX, gyroCenterY + gyroRadius * 1.15);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [pathname]);

  // If on home page or not mounted yet, render null
  if (!mounted || pathname === '/') {
    return null;
  }

  return (
    <>
      {/* 1. Background 3D Spatial Canvas Layer (Behind content: z-0) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
        />
        {/* Ambient subtle spatial grid */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* 2. Foreground AR HUD & LiDAR Visor Layer (Above background, below modals: z-20, pointer-events-none) */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none">
        {/* Holographic LiDAR Scanning Wave Beam */}
        <div 
          className="absolute left-0 right-0 h-24 pointer-events-none opacity-60"
          style={{
            animation: 'arLidarScan 9s ease-in-out infinite alternate',
            background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.04) 70%, rgba(139, 92, 246, 0.1) 98%, rgba(6, 182, 212, 0.5) 100%)',
            borderBottom: '1px solid rgba(6, 182, 212, 0.65)',
            boxShadow: '0 2px 14px rgba(6, 182, 212, 0.25)',
          }}
        />

        {/* Top Left AR Reticle */}
        <div className="absolute top-24 left-6 hidden md:flex flex-col gap-1 text-[10px] font-mono text-cyan-800/80 uppercase tracking-widest bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-cyan-300/40 shadow-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-xs border-t-2 border-l-2 border-cyan-500" />
            <span className="font-bold text-cyan-700">AR_SPATIAL // LIVE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
          </div>
          <div className="text-[9px] text-slate-500 font-semibold pl-3 tracking-normal">
            SYS: 60FPS • FOV 110° • MESH_ACTIVE
          </div>
        </div>

        {/* Top Right AR HUD Coordinate Tag */}
        <div className="absolute top-24 right-6 hidden md:flex items-center gap-2 text-[10px] font-mono text-purple-800/80 uppercase tracking-wider bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-purple-300/40 shadow-xs">
          <span className="text-[9px] text-slate-500 font-semibold">
            GRID: X+42.8 Y-19.4 Z+104
          </span>
          <span className="w-2 h-2 rounded-xs border-t-2 border-r-2 border-purple-500" />
        </div>

        {/* Bottom Left AR Corner Bracket */}
        <div className="absolute bottom-6 left-6 hidden md:flex items-center gap-2 text-[10px] font-mono text-cyan-800/80 bg-white/60 backdrop-blur-xs px-2 py-1 rounded-md border border-cyan-200/50 shadow-xs">
          <span className="w-2 h-2 rounded-xs border-b-2 border-l-2 border-cyan-500" />
          <span className="text-[9px] text-slate-500 tracking-wider font-semibold">APEX_VR_MATRIX // V2.4</span>
        </div>

        {/* Bottom Right AR Crosshair Reticle */}
        <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 text-[10px] font-mono text-purple-800/80 bg-white/60 backdrop-blur-xs px-2 py-1 rounded-md border border-purple-200/50 shadow-xs">
          <span className="text-[9px] text-slate-500 tracking-wider font-semibold">[ TRACKING: ACTIVE ]</span>
          <span className="w-2 h-2 rounded-xs border-b-2 border-r-2 border-purple-500" />
        </div>
      </div>
    </>
  );
};
