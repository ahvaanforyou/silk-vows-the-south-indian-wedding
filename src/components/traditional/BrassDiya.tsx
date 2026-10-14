"use client";

import React from "react";

interface BrassDiyaProps {
  className?: string;
  size?: number; // width in pixels
  hasGlow?: boolean;
}

export const BrassDiya: React.FC<BrassDiyaProps> = ({
  className = "",
  size = 64,
  hasGlow = true,
}) => {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center relative select-none ${className}`}
      style={{ width: size, height: size * 1.3 }}
      role="img"
      aria-label="Traditional South Indian Brass Diya (Deepam)"
    >
      {/* Radiant flame glow background */}
      {hasGlow && (
        <div
          className="absolute -top-3 w-10 h-10 rounded-full bg-amber-400/30 blur-md pointer-events-none flame-animation"
          style={{ width: size * 0.7, height: size * 0.7 }}
        />
      )}

      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 100 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Flame Gradient */}
          <linearGradient id="flameGrad" x1="50" y1="0" x2="50" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FDE047" />
            <stop offset="60%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>

          {/* Diya Brass Gold Gradient */}
          <linearGradient id="brassGold" x1="15" y1="40" x2="85" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="25%" stopColor="#D4AF37" />
            <stop offset="60%" stopColor="#AA7A1E" />
            <stop offset="100%" stopColor="#754E0B" />
          </linearGradient>

          {/* Pedestal Shadow */}
          <radialGradient id="diyaShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#754E0B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#754E0B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Flickering Flame */}
        <g className="flame-animation" style={{ transformOrigin: "50px 36px" }}>
          {/* Outer Flame */}
          <path
            d="M50 4 C50 4 38 18 38 27 C38 34 43 37 50 37 C57 37 62 34 62 27 C62 18 50 4 50 4 Z"
            fill="url(#flameGrad)"
            opacity="0.95"
          />
          {/* Inner Bright Core */}
          <path
            d="M50 14 C50 14 44 22 44 28 C44 32 46.5 35 50 35 C53.5 35 56 32 56 28 C56 22 50 14 50 14 Z"
            fill="#FEF08A"
          />
          {/* Blue base spark */}
          <ellipse cx="50" cy="34" rx="3.5" ry="2" fill="#60A5FA" opacity="0.8" />
        </g>

        {/* Wick */}
        <line x1="50" y1="33" x2="50" y2="39" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />

        {/* Diya Bowl Top Rim */}
        <ellipse cx="50" cy="42" rx="32" ry="7" fill="url(#brassGold)" stroke="#87580C" strokeWidth="1.2" />

        {/* Oil reservoir surface */}
        <ellipse cx="50" cy="41" rx="28" ry="4.5" fill="#8B4513" opacity="0.6" />

        {/* Diya Bowl Body */}
        <path
          d="M18 42 C18 64 34 72 50 72 C66 72 82 64 82 42 Z"
          fill="url(#brassGold)"
          stroke="#754E0B"
          strokeWidth="1.5"
        />

        {/* Traditional Engraved Patterns on Bowl */}
        <path
          d="M25 48 Q50 62 75 48"
          stroke="#FFEAA0"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="50" cy="58" r="2.5" fill="#FFEAA0" />
        <circle cx="36" cy="54" r="2" fill="#FFEAA0" />
        <circle cx="64" cy="54" r="2" fill="#FFEAA0" />

        {/* Diya Stem / Pillar */}
        <path
          d="M44 72 H56 V88 H44 Z"
          fill="url(#brassGold)"
          stroke="#754E0B"
          strokeWidth="1"
        />
        {/* Ring on stem */}
        <ellipse cx="50" cy="80" rx="9" ry="2.5" fill="url(#brassGold)" stroke="#754E0B" strokeWidth="1" />

        {/* Diya Base / Pedestal */}
        <path
          d="M34 88 H66 L74 104 H26 Z"
          fill="url(#brassGold)"
          stroke="#754E0B"
          strokeWidth="1.5"
        />
        {/* Bottom pedestal stepped rim */}
        <path
          d="M22 104 H78 L80 110 H20 Z"
          fill="url(#brassGold)"
          stroke="#754E0B"
          strokeWidth="1"
        />

        {/* Shadow base ellipse */}
        <ellipse cx="50" cy="116" rx="36" ry="6" fill="url(#diyaShadow)" />
      </svg>
    </div>
  );
};
