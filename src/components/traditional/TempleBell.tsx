"use client";

import React from "react";

interface TempleBellProps {
  className?: string;
  size?: number;
  chainLength?: number;
}

export const TempleBell: React.FC<TempleBellProps> = ({
  className = "",
  size = 40,
  chainLength = 40,
}) => {
  return (
    <div
      className={`inline-flex flex-col items-center sway-animation select-none pointer-events-none ${className}`}
      style={{ width: size }}
      role="img"
      aria-label="Traditional South Indian Temple Bell"
    >
      <svg
        width={size}
        height={chainLength + size}
        viewBox={`0 0 50 ${chainLength + 50}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="bellGold" x1="10" y1="0" x2="40" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#9A7730" />
            <stop offset="100%" stopColor="#5E3E07" />
          </linearGradient>
        </defs>

        {/* Hanging Chain Links */}
        {Array.from({ length: Math.floor(chainLength / 8) }).map((_, i) => (
          <ellipse
            key={i}
            cx="25"
            cy={i * 8 + 4}
            rx="2.5"
            ry="4"
            fill="none"
            stroke="#C9A45C"
            strokeWidth="1.2"
          />
        ))}

        {/* Bell Top Loop */}
        <circle cx="25" cy={chainLength + 4} r="4" fill="none" stroke="#D4AF37" strokeWidth="1.5" />

        {/* Bell Body */}
        <path
          d={`M25 ${chainLength + 8}
             C21 ${chainLength + 14} 16 ${chainLength + 24} 10 ${chainLength + 36}
             C10 ${chainLength + 40} 40 ${chainLength + 40} 40 ${chainLength + 36}
             C34 ${chainLength + 24} 29 ${chainLength + 14} 25 ${chainLength + 8} Z`}
          fill="url(#bellGold)"
          stroke="#754E0B"
          strokeWidth="1.2"
        />

        {/* Bell Rim */}
        <ellipse
          cx="25"
          cy={chainLength + 38}
          rx="16"
          ry="3.5"
          fill="url(#bellGold)"
          stroke="#5E3E07"
          strokeWidth="1.2"
        />

        {/* Bell Clapper (tongue) */}
        <line
          x1="25"
          y1={chainLength + 38}
          x2="25"
          y2={chainLength + 44}
          stroke="#754E0B"
          strokeWidth="2"
        />
        <circle cx="25" cy={chainLength + 45} r="2.5" fill="#D4AF37" />
      </svg>
    </div>
  );
};
