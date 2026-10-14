"use client";

import React from "react";

interface TempleArchProps {
  children: React.ReactNode;
  className?: string;
  theme?: "maroon" | "gold" | "ivory";
}

export const TempleArch: React.FC<TempleArchProps> = ({
  children,
  className = "",
  theme = "gold",
}) => {
  const isMaroon = theme === "maroon";
  const strokeColor = isMaroon ? "#C9A45C" : "#C9A45C";

  return (
    <div className={`relative p-6 md:p-10 ${className}`}>
      {/* Top Temple Gopuram Crown Arch SVG */}
      <div className="w-full flex justify-center -mb-3 pointer-events-none select-none">
        <svg
          width="240"
          height="54"
          viewBox="0 0 240 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-full drop-shadow-sm"
        >
          {/* Central Gopuram Kalasam Spire */}
          <path
            d="M120 2 L124 14 H116 Z M120 14 L127 24 H113 Z M120 24 L132 36 H108 Z"
            fill="#D4AF37"
            stroke="#9A7730"
            strokeWidth="0.8"
          />
          <circle cx="120" cy="4" r="2.5" fill="#FFEAA0" />
          <circle cx="120" cy="18" r="1.5" fill="#8B1E2D" />

          {/* Symmetrical Arch curves */}
          <path
            d="M12 50 C40 22 80 18 108 36 M228 50 C200 22 160 18 132 36"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 52 C50 30 85 26 108 42 M220 52 C190 30 155 26 132 42"
            stroke="#E3C98A"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Traditional decorative beads along curve */}
          <circle cx="50" cy="36" r="2.5" fill="#D4AF37" />
          <circle cx="75" cy="27" r="2.5" fill="#D4AF37" />
          <circle cx="165" cy="27" r="2.5" fill="#D4AF37" />
          <circle cx="190" cy="36" r="2.5" fill="#D4AF37" />

          {/* Left and Right end finials */}
          <path d="M10 50 Q6 40 14 38 Q18 46 10 50" fill="#D4AF37" />
          <path d="M230 50 Q234 40 226 38 Q222 46 230 50" fill="#D4AF37" />
        </svg>
      </div>

      {/* Main Container with Ornate Border */}
      <div className="relative border-2 border-[#C9A45C]/60 rounded-t-[48px] rounded-b-2xl p-6 md:p-8 bg-gradient-to-b from-[#FFFDF8]/90 via-[#FFF8E9]/95 to-[#F5EBD8]/90 shadow-lg backdrop-blur-sm">
        {/* Inner subtle gold dotted frame */}
        <div className="absolute inset-2 border border-dashed border-[#C9A45C]/40 rounded-t-[40px] rounded-b-xl pointer-events-none" />

        {/* Four Corner Ornaments */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#8B1E2D] rounded-tl-lg pointer-events-none" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#8B1E2D] rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#8B1E2D] rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#8B1E2D] rounded-br-lg pointer-events-none" />

        {children}
      </div>

      {/* Bottom Decorative Base Motif */}
      <div className="w-full flex justify-center -mt-2 pointer-events-none select-none">
        <svg
          width="160"
          height="24"
          viewBox="0 0 160 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4 H70 Q80 18 90 4 H150"
            stroke="#C9A45C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="80" cy="12" r="3" fill="#8B1E2D" />
          <circle cx="65" cy="8" r="2" fill="#D4AF37" />
          <circle cx="95" cy="8" r="2" fill="#D4AF37" />
        </svg>
      </div>
    </div>
  );
};
