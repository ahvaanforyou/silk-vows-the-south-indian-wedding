"use client";

import React from "react";

interface ToranHeaderProps {
  className?: string;
  leafCount?: number;
  expanded?: boolean;
}

export const ToranHeader: React.FC<ToranHeaderProps> = ({
  className = "",
  leafCount = 9,
  expanded = false,
}) => {
  return (
    <div className={`w-full ${expanded ? "h-20" : "overflow-hidden"} select-none pointer-events-none ${className}`}>
      {/* Top sacred rope garland */}
      <div className={`relative w-full ${expanded ? "h-20" : "h-8"} flex items-start justify-center`}>
        {/* Yellow-Orange marigold rope */}
        <div className="absolute top-1 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#D97706] shadow-sm rounded-full" />

        {/* Distributed mango leaves and marigold balls */}
        <div className="relative w-full flex justify-around items-start max-w-5xl mx-auto px-2">
          {Array.from({ length: leafCount }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center -mt-1 transform hover:rotate-3 transition-transform duration-300"
            >
              {/* Marigold flower top bead */}
              <div
                className={`w-3.5 h-3.5 rounded-full shadow-sm border border-amber-600/30 ${
                  index % 2 === 0
                    ? "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600"
                    : "bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600"
                }`}
              />

              {/* Mango Leaf SVG */}
              <svg
                width="34"
                height="56"
                viewBox="0 0 34 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-sm -mt-0.5"
              >
                {/* Leaf Body */}
                <path
                  d="M17 0C17 0 2 14 2 32C2 46 17 56 17 56C17 56 32 46 32 32C32 14 17 0 17 0Z"
                  fill="url(#mangoLeafGrad)"
                  stroke="#1B432E"
                  strokeWidth="0.8"
                />
                {/* Center Leaf Vein */}
                <path
                  d="M17 2V52"
                  stroke="#4ADE80"
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity="0.75"
                />
                {/* Side Leaf Veins */}
                <path
                  d="M17 12L7 20M17 22L6 31M17 32L8 41M17 12L27 20M17 22L28 31M17 32L26 41"
                  stroke="#86EFAC"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                {/* Haldi / Kumkum Tilak dot on central leaf */}
                {index === Math.floor(leafCount / 2) && (
                  <circle cx="17" cy="24" r="2.5" fill="#8B1E2D" />
                )}
                <defs>
                  <linearGradient
                    id="mangoLeafGrad"
                    x1="2"
                    y1="0"
                    x2="32"
                    y2="56"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#1E4D34" />
                    <stop offset="0.5" stopColor="#2D6A4F" />
                    <stop offset="1" stopColor="#163824" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Hanging white jasmine flower bud */}
              <div className="w-1.5 h-2 -mt-1 bg-amber-50 rounded-full border border-amber-200/50 shadow-inner" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
