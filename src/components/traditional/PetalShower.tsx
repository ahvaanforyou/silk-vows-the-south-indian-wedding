"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";

interface Petal {
  id: number;
  left: number; // percentage
  size: number;
  duration: number; // seconds
  delay: number; // seconds
  type: "marigold" | "jasmine";
  swayAmount: number;
}

const subscribeReducedMotion = (callback: () => void) => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getServerReducedMotionSnapshot = () => false;

export const PetalShower: React.FC<{ active?: boolean; count?: number }> = ({
  active = true,
  count = 18,
}) => {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  );

  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!active || prefersReducedMotion) {
      return;
    }

    const timer = setTimeout(() => {
      const generated: Petal[] = Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 96 + 2,
        size: Math.floor(Math.random() * 10) + 12,
        duration: Math.random() * 7 + 9,
        delay: Math.random() * 8,
        type: Math.random() > 0.4 ? "marigold" : "jasmine",
        swayAmount: (Math.random() - 0.5) * 80,
      }));
      setPetals(generated);
    }, 50);

    return () => clearTimeout(timer);
  }, [active, count, prefersReducedMotion]);

  if (!active || prefersReducedMotion || petals.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[1] select-none"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute -top-10 opacity-70 will-change-transform"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 1.4,
            animation: `fallDown ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        >
          <svg
            viewBox="0 0 20 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-sm"
            style={{
              transform: `rotate(${petal.swayAmount * 1.5}deg)`,
            }}
          >
            {petal.type === "marigold" ? (
              // Marigold Orange/Golden Petal
              <path
                d="M10 0 C3 8 0 16 3 23 C6 28 14 28 17 23 C20 16 17 8 10 0 Z"
                fill="url(#marigoldPetalGrad)"
                opacity="0.9"
              />
            ) : (
              // Jasmine White/Cream Petal
              <path
                d="M10 0 C4 7 2 15 5 22 C8 27 12 27 15 22 C18 15 16 7 10 0 Z"
                fill="url(#jasminePetalGrad)"
                opacity="0.8"
              />
            )}
            <defs>
              <linearGradient
                id="marigoldPetalGrad"
                x1="0"
                y1="0"
                x2="20"
                y2="28"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="60%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
              <linearGradient
                id="jasminePetalGrad"
                x1="0"
                y1="0"
                x2="20"
                y2="28"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#FFF8E9" />
                <stop offset="100%" stopColor="#FEF08A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}

      <style jsx>{`
        @keyframes fallDown {
          0% {
            transform: translateY(-10px) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.75;
          }
          90% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(40px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
