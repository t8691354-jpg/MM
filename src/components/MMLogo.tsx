import React from 'react';

interface MMLogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export default function MMLogo({ className = '', size = 50, glow = true }: MMLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-300 hover:scale-105 active:scale-95`}
    >
      {glow && (
        <defs>
          <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" /> {/* Amber 400 */}
            <stop offset="50%" stopColor="#F59E0B" /> {/* Amber 500 */}
            <stop offset="100%" stopColor="#D97706" /> {/* Amber 600 */}
          </linearGradient>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" /> {/* Sky 400 */}
            <stop offset="50%" stopColor="#0EA5E9" /> {/* Sky 500 */}
            <stop offset="100%" stopColor="#0369A1" /> {/* Sky 700 */}
          </linearGradient>
          <linearGradient id="royalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" /> {/* Blue 600 */}
            <stop offset="100%" stopColor="#1E3A8A" /> {/* Blue 900 */}
          </linearGradient>
        </defs>
      )}

      {/* BACKGROUND CIRCUIT PATHS (Light glow effect) */}
      <g strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
        {/* Left Circuit Tracks */}
        <path d="M 65 70 L 35 50" stroke="url(#goldGrad)" />
        <path d="M 35 50 L 20 65" stroke="url(#goldGrad)" />
        <circle cx="20" cy="65" r="4.5" fill="url(#goldGrad)" />

        <path d="M 55 100 L 25 100" stroke="url(#blueGrad)" />
        <circle cx="25" cy="100" r="4.5" fill="url(#blueGrad)" />

        <path d="M 65 130 L 35 150" stroke="url(#goldGrad)" />
        <path d="M 35 150 L 22 138" stroke="url(#goldGrad)" />
        <circle cx="22" cy="138" r="4.5" fill="url(#goldGrad)" />

        {/* Right Circuit Tracks */}
        <path d="M 135 70 L 165 50" stroke="url(#blueGrad)" />
        <path d="M 165 50 L 180 65" stroke="url(#blueGrad)" />
        <circle cx="180" cy="65" r="4.5" fill="url(#blueGrad)" />

        <path d="M 145 100 L 175 100" stroke="url(#goldGrad)" />
        <circle cx="175" cy="100" r="4.5" fill="url(#goldGrad)" />

        <path d="M 135 130 L 165 150" stroke="url(#blueGrad)" />
        <path d="M 165 150 L 178 138" stroke="url(#blueGrad)" />
        <circle cx="178" cy="138" r="4.5" fill="url(#blueGrad)" />
      </g>

      {/* GLOBE BACKGROUND AND GRID LINES */}
      <circle cx="100" cy="100" r="46" fill="#0F172A" stroke="url(#goldGrad)" strokeWidth="3.5" filter={glow ? "url(#logo-glow)" : undefined} />
      
      {/* Globe Latitudes */}
      <path d="M 54 100 Q 100 80 146 100" stroke="url(#blueGrad)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
      <path d="M 54 100 Q 100 120 146 100" stroke="url(#blueGrad)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
      <line x1="54" y1="100" x2="146" y2="100" stroke="url(#blueGrad)" strokeWidth="1.5" opacity="0.4" />

      {/* Globe Longitudes */}
      <path d="M 100 54 Q 85 100 100 146" stroke="url(#blueGrad)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
      <path d="M 100 54 Q 115 100 100 146" stroke="url(#blueGrad)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
      <line x1="100" y1="54" x2="100" y2="146" stroke="url(#blueGrad)" strokeWidth="1.5" opacity="0.4" />

      {/* ROTATING ORBIT ARROWS (Outer rings) */}
      <g transform="rotate(-15 100 100)">
        {/* Diagonal Ring 1 */}
        <ellipse cx="100" cy="100" rx="58" ry="16" stroke="url(#blueGrad)" strokeWidth="2.5" strokeDasharray="60 30 10 30" />
        {/* Arrowhead at top-right quadrant */}
        <path d="M 154 94 L 160 102 L 150 104 Z" fill="url(#blueGrad)" />
      </g>
      <g transform="rotate(45 100 100)">
        {/* Diagonal Ring 2 */}
        <ellipse cx="100" cy="100" rx="58" ry="16" stroke="url(#goldGrad)" strokeWidth="2" strokeDasharray="40 40 20 20" />
        {/* Arrowhead */}
        <path d="M 45 104 L 39 96 L 49 94 Z" fill="url(#goldGrad)" />
      </g>

      {/* CORE "MM" DESIGN */}
      <g filter={glow ? "url(#logo-glow)" : undefined}>
        {/* Drop shadow or backdrop to make MM pop */}
        <text 
          x="100" 
          y="117" 
          fill="#020617" 
          fontSize="48" 
          fontWeight="950" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          textAnchor="middle" 
          letterSpacing="-2.5"
          className="select-none"
        >
          MM
        </text>
        {/* Main Royal Blue / Cyan MM text */}
        <text 
          x="98" 
          y="115" 
          fill="url(#blueGrad)" 
          fontSize="48" 
          fontWeight="950" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          textAnchor="middle" 
          letterSpacing="-2.5"
          className="select-none"
        >
          MM
        </text>
      </g>
    </svg>
  );
}
