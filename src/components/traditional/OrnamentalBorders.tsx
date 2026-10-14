"use client";

import React from "react";

export const FloralDivider: React.FC<{
  className?: string;
  theme?: "gold" | "maroon";
}> = ({ className = "", theme = "gold" }) => {
  const isMaroon = theme === "maroon";
  const color1 = isMaroon ? "#8B1E2D" : "#C9A45C";
  const color2 = isMaroon ? "#C9A45C" : "#E3C98A";

  return (
    <div className={`flex items-center justify-center my-6 space-x-3 select-none ${className}`}>
      {/* Left gold decorative hairline */}
      <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#C9A45C] to-[#8B1E2D]" />

      {/* Central Floral Paisley Motif */}
      <svg
        width="44"
        height="24"
        viewBox="0 0 44 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="22" cy="12" r="3.5" fill={color1} />
        <circle cx="22" cy="12" r="1.5" fill="#FFF8E9" />
        {/* Petals */}
        <ellipse cx="22" cy="5" rx="2" ry="3" fill={color2} />
        <ellipse cx="22" cy="19" rx="2" ry="3" fill={color2} />
        <ellipse cx="15" cy="12" rx="3" ry="2" fill={color2} />
        <ellipse cx="29" cy="12" rx="3" ry="2" fill={color2} />
        {/* Curled flourishes */}
        <path
          d="M10 12 C6 12 4 8 2 12"
          stroke={color1}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M34 12 C38 12 40 8 42 12"
          stroke={color1}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      {/* Right gold decorative hairline */}
      <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#C9A45C] to-[#8B1E2D]" />
    </div>
  );
};

export const CornerOrnament: React.FC<{
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  color?: string;
}> = ({ position, size = 48, color = "#C9A45C" }) => {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scaleX(-1)";
      case "bottom-left":
        return "scaleY(-1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "none";
    }
  };

  return (
    <div
      className="absolute pointer-events-none select-none z-10"
      style={{
        width: size,
        height: size,
        top: position.includes("top") ? 0 : "auto",
        bottom: position.includes("bottom") ? 0 : "auto",
        left: position.includes("left") ? 0 : "auto",
        right: position.includes("right") ? 0 : "auto",
        transform: getTransform(),
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer border lines */}
        <path d="M4 56 V12 C4 7.57 7.57 4 12 4 H56" stroke={color} strokeWidth="2.5" />
        <path d="M10 56 V16 C10 12.68 12.68 10 16 10 H56" stroke="#E3C98A" strokeWidth="1" strokeDasharray="3 2" />
        {/* Traditional Paisley / Mango curve corner */}
        <path
          d="M16 26 C16 18 24 16 26 16 C32 16 34 22 28 26 C22 30 18 36 18 42"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="3" fill="#8B1E2D" />
        <circle cx="12" cy="12" r="2.5" fill={color} />
      </svg>
    </div>
  );
};

export const RangoliMugguBackground: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      className={`absolute inset-0 opacity-[0.035] pointer-events-none select-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(#8B1E2D 1px, transparent 1px), radial-gradient(#C9A45C 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        backgroundPosition: "0 0, 20px 20px",
      }}
    />
  );
};
