"use client";

import React from "react";

interface KalashIconProps {
  className?: string;
  size?: number;
}

export const KalashIcon: React.FC<KalashIconProps> = ({
  className = "",
  size = 60,
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size * 1.15 }}
      role="img"
      aria-label="Traditional Sacred Kalash"
    >
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="kalashGold" x1="10" y1="30" x2="90" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#9A7730" />
            <stop offset="100%" stopColor="#694C10" />
          </linearGradient>

          <linearGradient id="coconutGrad" x1="30" y1="5" x2="70" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8D5524" />
            <stop offset="50%" stopColor="#6F3F19" />
            <stop offset="100%" stopColor="#4A260C" />
          </linearGradient>

          <linearGradient id="leafGrad" x1="0" y1="0" x2="30" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E4D34" />
            <stop offset="100%" stopColor="#2D6A4F" />
          </linearGradient>
        </defs>

        {/* 5 Mango Leaves radiating outwards */}
        {/* Left leaf 1 */}
        <path
          d="M32 36 C16 28 8 18 10 6 C20 12 30 22 36 34 Z"
          fill="url(#leafGrad)"
          stroke="#163824"
          strokeWidth="1"
        />
        {/* Left leaf 2 */}
        <path
          d="M38 34 C28 20 25 10 32 0 C38 8 42 20 42 32 Z"
          fill="url(#leafGrad)"
          stroke="#163824"
          strokeWidth="1"
        />
        {/* Center top leaf */}
        <path
          d="M45 32 C45 15 48 2 50 0 C52 2 55 15 55 32 Z"
          fill="url(#leafGrad)"
          stroke="#163824"
          strokeWidth="1"
        />
        {/* Right leaf 2 */}
        <path
          d="M58 32 C58 20 62 8 68 0 C75 10 72 20 62 34 Z"
          fill="url(#leafGrad)"
          stroke="#163824"
          strokeWidth="1"
        />
        {/* Right leaf 1 */}
        <path
          d="M64 34 C70 22 80 12 90 6 C92 18 84 28 68 36 Z"
          fill="url(#leafGrad)"
          stroke="#163824"
          strokeWidth="1"
        />

        {/* Sacred Coconut with pointed top */}
        <path
          d="M34 32 C34 16 43 6 50 4 C57 6 66 16 66 32 C66 38 34 38 34 32 Z"
          fill="url(#coconutGrad)"
          stroke="#3B1E08"
          strokeWidth="1.2"
        />
        {/* Tilak / Kumkum on coconut */}
        <circle cx="50" cy="20" r="3" fill="#DC2626" />
        <circle cx="50" cy="20" r="1.2" fill="#FEF08A" />

        {/* Kalash Neck Ring (Mauli / Sacred Red Thread) */}
        <rect x="33" y="38" width="34" height="6" rx="2" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
        {/* Gold ring around neck */}
        <line x1="33" y1="41" x2="67" y2="41" stroke="#FEF08A" strokeWidth="1.5" />

        {/* Kalash Pot Body */}
        <path
          d="M34 44 C20 54 18 78 28 92 C36 102 64 102 72 92 C82 78 80 54 66 44 Z"
          fill="url(#kalashGold)"
          stroke="#754E0B"
          strokeWidth="1.5"
        />

        {/* Traditional Swastika or Sacred Symbol on Pot */}
        <g stroke="#8B1E2D" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
          <line x1="50" y1="62" x2="50" y2="78" />
          <line x1="42" y1="70" x2="58" y2="70" />
          {/* Swastika arms */}
          <line x1="50" y1="62" x2="56" y2="62" />
          <line x1="58" y1="70" x2="58" y2="76" />
          <line x1="50" y1="78" x2="44" y2="78" />
          <line x1="42" y1="70" x2="42" y2="64" />
        </g>
        {/* 4 dots */}
        <circle cx="46" cy="66" r="1.2" fill="#8B1E2D" />
        <circle cx="54" cy="66" r="1.2" fill="#8B1E2D" />
        <circle cx="46" cy="74" r="1.2" fill="#8B1E2D" />
        <circle cx="54" cy="74" r="1.2" fill="#8B1E2D" />

        {/* Kalash Base Pedestal */}
        <path
          d="M38 98 H62 L66 105 H34 Z"
          fill="url(#kalashGold)"
          stroke="#754E0B"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
};
