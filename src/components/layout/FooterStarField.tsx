'use client';

import React from 'react';

interface SilverStar {
  id: number;
  top: string;
  left: string;
  size: number;
  type: 'sparkle' | 'dot';
  duration: string;
  delay: string;
}

// Exactly 14 very small, delicate silver shining stars elegantly dispersed
const SILVER_STARS: SilverStar[] = [
  // Upper lavender zone
  { id: 1, top: '8%', left: '12%', size: 5, type: 'sparkle', duration: '3.2s', delay: '-0.8s' },
  { id: 2, top: '6%', left: '48%', size: 4, type: 'dot', duration: '2.6s', delay: '-1.5s' },
  { id: 3, top: '10%', left: '88%', size: 5, type: 'sparkle', duration: '3.8s', delay: '-2.1s' },

  // Mid-upper transition zone
  { id: 4, top: '22%', left: '28%', size: 4, type: 'dot', duration: '3.0s', delay: '-0.4s' },
  { id: 5, top: '25%', left: '72%', size: 6, type: 'sparkle', duration: '4.1s', delay: '-2.9s' },
  { id: 6, top: '35%', left: '6%', size: 4, type: 'dot', duration: '2.8s', delay: '-1.2s' },
  { id: 7, top: '38%', left: '94%', size: 5, type: 'sparkle', duration: '3.5s', delay: '-1.8s' },

  // Mid-lower transition zone
  { id: 8, top: '48%', left: '38%', size: 6, type: 'sparkle', duration: '3.6s', delay: '-0.6s' },
  { id: 9, top: '55%', left: '82%', size: 4, type: 'dot', duration: '2.5s', delay: '-2.3s' },
  { id: 10, top: '58%', left: '18%', size: 5, type: 'sparkle', duration: '4.0s', delay: '-3.1s' },

  // Lower dark lavender zone
  { id: 11, top: '72%', left: '52%', size: 5, type: 'sparkle', duration: '3.4s', delay: '-1.0s' },
  { id: 12, top: '76%', left: '92%', size: 4, type: 'dot', duration: '2.9s', delay: '-2.5s' },
  { id: 13, top: '88%', left: '10%', size: 5, type: 'sparkle', duration: '3.7s', delay: '-0.3s' },
  { id: 14, top: '91%', left: '68%', size: 4, type: 'dot', duration: '3.1s', delay: '-1.9s' },
];

export const FooterStarField: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
      {SILVER_STARS.map((star) => (
        <div
          key={star.id}
          className="absolute flex items-center justify-center pointer-events-none"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `silverStarTwinkle ${star.duration} ease-in-out infinite`,
            animationDelay: star.delay,
          }}
        >
          {star.type === 'sparkle' ? (
            // Small silver 4-point diamond sparkle star
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.9)]"
            >
              <path
                d="M12 0 C12 6.63 17.37 12 24 12 C17.37 12 12 17.37 12 24 C12 17.37 6.63 12 0 12 C6.63 12 12 6.63 12 0 Z"
                fill="#FFFFFF"
              />
            </svg>
          ) : (
            // Very small silver starlight dot
            <div
              className="rounded-full w-full h-full bg-white drop-shadow-[0_0_3px_rgba(255,255,255,0.95)]"
              style={{
                boxShadow: '0 0 3px 1px rgba(241, 245, 249, 0.85)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
