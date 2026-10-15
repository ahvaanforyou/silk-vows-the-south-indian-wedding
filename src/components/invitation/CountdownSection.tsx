"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/data/wedding-data";
import { CornerOrnament, FloralDivider } from "../traditional/OrnamentalBorders";
import { Sparkles, Heart } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;
const scratchRevealThreshold = 0.3;
const scratchCheckInterval = 120;
const burstParticles = Array.from({ length: 22 }, (_, index) => {
  const angle = (index / 22) * Math.PI * 2 - Math.PI / 2;
  const distance = 72 + ((index * 17) % 48);
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: index % 5 === 0 ? 5 : 3,
    isConfetti: index % 7 === 0,
    rotation: (index * 47) % 180,
  };
});

export const CountdownSection: React.FC = () => {
  const hasMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const scratchCanvasRef = useRef<HTMLCanvasElement>(null);
  const scratchPointRef = useRef<{ x: number; y: number } | null>(null);
  const scratchPointerRef = useRef<number | null>(null);
  const scratchProgressTimeoutRef = useRef<number | null>(null);
  const revealTriggeredRef = useRef(false);
  const hasDrawnCoverRef = useRef(false);
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [scratchLayerRemoved, setScratchLayerRemoved] = useState(false);
  const [showScratchBlast, setShowScratchBlast] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetDate = new Date(weddingConfig.weddingDateTime.iso).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPassed: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!hasMounted || scratchLayerRemoved || scratchRevealed) return;

    const canvas = scratchCanvasRef.current;
    const area = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !area || !context || typeof ResizeObserver === "undefined") {
      setScratchRevealed(true);
      return;
    }

    const drawCover = () => {
      const bounds = area.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) return;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      const previousCover = hasDrawnCoverRef.current ? document.createElement("canvas") : null;
      if (previousCover) {
        previousCover.width = canvas.width;
        previousCover.height = canvas.height;
        previousCover.getContext("2d")?.drawImage(canvas, 0, 0);
      }
      canvas.width = Math.round(bounds.width * scale);
      canvas.height = Math.round(bounds.height * scale);
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);

      const gradient = context.createLinearGradient(0, 0, bounds.width, bounds.height);
      gradient.addColorStop(0, "#E9D39B");
      gradient.addColorStop(0.5, "#F4E6BD");
      gradient.addColorStop(1, "#D9BD78");
      context.globalCompositeOperation = "source-over";
      context.fillStyle = gradient;
      context.fillRect(0, 0, bounds.width, bounds.height);

      context.strokeStyle = "rgba(109, 20, 41, 0.16)";
      context.lineWidth = 1;
      for (let y = 24; y < bounds.height; y += 42) {
        for (let x = 24; x < bounds.width; x += 42) {
          context.beginPath();
          context.moveTo(x, y - 6);
          context.lineTo(x + 6, y);
          context.lineTo(x, y + 6);
          context.lineTo(x - 6, y);
          context.closePath();
          context.stroke();
          context.beginPath();
          context.arc(x, y, 1.5, 0, Math.PI * 2);
          context.fillStyle = "rgba(109, 20, 41, 0.22)";
          context.fill();
        }
      }

      context.strokeStyle = "rgba(109, 20, 41, 0.55)";
      context.lineWidth = 1.5;
      context.strokeRect(9, 9, bounds.width - 18, bounds.height - 18);
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "#6D1429";
      context.font = "600 16px Georgia, serif";
      context.fillText("Scratch to reveal our special day", bounds.width / 2, bounds.height / 2);
      context.font = "12px Georgia, serif";
      context.fillStyle = "rgba(74, 11, 26, 0.82)";
      context.fillText("Use your finger or mouse", bounds.width / 2, bounds.height / 2 + 24);
      if (previousCover) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.globalCompositeOperation = "destination-in";
        context.drawImage(previousCover, 0, 0, previousCover.width, previousCover.height, 0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = "source-over";
        context.setTransform(scale, 0, 0, scale, 0, 0);
      }
      hasDrawnCoverRef.current = true;
    };

    drawCover();
    const observer = new ResizeObserver(drawCover);
    observer.observe(area);
    return () => observer.disconnect();
  }, [hasMounted, scratchLayerRemoved, scratchRevealed]);

  useEffect(() => {
    if (!scratchRevealed) return;
    const timeout = window.setTimeout(() => setScratchLayerRemoved(true), prefersReducedMotion ? 220 : 980);
    return () => window.clearTimeout(timeout);
  }, [scratchRevealed, prefersReducedMotion]);

  useEffect(() => () => {
    if (scratchProgressTimeoutRef.current !== null) {
      window.clearTimeout(scratchProgressTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    if (!showScratchBlast) return;
    const timeout = window.setTimeout(() => setShowScratchBlast(false), prefersReducedMotion ? 220 : 1050);
    return () => window.clearTimeout(timeout);
  }, [showScratchBlast, prefersReducedMotion]);

  const scratchAt = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = scratchCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return null;
    const bounds = canvas.getBoundingClientRect();
    const point = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    context.globalCompositeOperation = "destination-out";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 34;
    const previous = scratchPointRef.current;
    context.beginPath();
    if (previous) {
      context.moveTo(previous.x, previous.y);
      context.lineTo(point.x, point.y);
    } else {
      context.arc(point.x, point.y, 17, 0, Math.PI * 2);
    }
    context.stroke();
    scratchPointRef.current = point;
    return point;
  };

  const revealCountdown = () => {
    if (revealTriggeredRef.current) return;
    revealTriggeredRef.current = true;
    setShowScratchBlast(true);
    setScratchRevealed(true);
  };

  const checkScratchProgress = () => {
    const canvas = scratchCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || canvas.width === 0 || canvas.height === 0 || revealTriggeredRef.current) return;
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let clearedArea = 0;
    for (let alphaIndex = 3; alphaIndex < pixels.length; alphaIndex += 4) {
      clearedArea += 255 - pixels[alphaIndex];
    }
    const totalArea = canvas.width * canvas.height * 255;
    if (totalArea > 0 && clearedArea / totalArea >= scratchRevealThreshold) revealCountdown();
  };

  const scheduleScratchProgressCheck = (force = false) => {
    if (revealTriggeredRef.current) return;
    if (scratchProgressTimeoutRef.current !== null) {
      if (!force) return;
      window.clearTimeout(scratchProgressTimeoutRef.current);
      scratchProgressTimeoutRef.current = null;
    }
    if (force) {
      checkScratchProgress();
      return;
    }
    scratchProgressTimeoutRef.current = window.setTimeout(() => {
      scratchProgressTimeoutRef.current = null;
      checkScratchProgress();
    }, scratchCheckInterval);
  };

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days, telugu: "రోజులు" },
    { label: "HOURS", value: timeLeft.hours, telugu: "గంటలు" },
    { label: "MINUTES", value: timeLeft.minutes, telugu: "నిమిషాలు" },
    { label: "SECONDS", value: timeLeft.seconds, telugu: "సెకన్లు" },
  ];

  return (
    <section
      id="countdown"
      className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#6D1429] via-[#520C1C] to-[#3B0713] text-[#FFF8E9] overflow-hidden"
    >
      {/* Background silk grain texture */}
      <div className="absolute inset-0 bg-kolam-pattern opacity-10 pointer-events-none" />

      {/* Decorative Corner Filigrees on section edges */}
      <CornerOrnament position="top-left" size={60} color="#C9A45C" />
      <CornerOrnament position="top-right" size={60} color="#C9A45C" />
      <CornerOrnament position="bottom-left" size={60} color="#C9A45C" />
      <CornerOrnament position="bottom-right" size={60} color="#C9A45C" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Sacred Telugu & English Headings */}
        <span className="font-telugu text-sm sm:text-base text-[#E3C98A] font-semibold tracking-wider block mb-1">
          మా కళ్యాణ శుభవేళకై వేచిచూస్తూ
        </span>
        <h2 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide gold-gradient-text drop-shadow-md">
          Counting Down to Our Forever
        </h2>
        <p className="font-serif-elegant italic text-xl sm:text-2xl text-[#E3C98A]/90 mt-2">
          Until We Tie the Sacred Knot
        </p>

        <FloralDivider theme="gold" className="my-6" />

        <div className="relative mx-auto mt-6 max-w-3xl">
          {/* Dynamic Countdown Grid or Celebration State */}
          {!hasMounted ? (
            <div className="flex h-32 items-center justify-center">
              <span className="font-serif-royal text-[#E3C98A] animate-pulse">
                Auspicious Muhurtham Loading...
              </span>
            </div>
          ) : timeLeft.isPassed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mx-auto max-w-lg rounded-2xl border-2 border-[#C9A45C] bg-[#FFF8E9]/10 p-8 backdrop-blur-md"
            >
              <div className="mb-3 flex justify-center">
                <Heart className="h-10 w-10 fill-[#E3C98A] text-[#E3C98A] animate-pulse" />
              </div>
              <h3 className="font-serif-royal text-2xl font-bold text-[#E3C98A] sm:text-3xl">
                The Celebration Has Begun!
              </h3>
              <p className="font-serif-elegant mt-2 text-lg italic text-[#FFF8E9]">
                Celebrating Our Forever with the blessings of our elders and friends.
              </p>
            </motion.div>
          ) : (
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {timeUnits.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-[#C9A45C]/60 bg-[#2B050E]/70 p-4 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-[#E3C98A] sm:p-6"
                >
                  <div className="pointer-events-none absolute inset-1.5 rounded-xl border border-dashed border-[#C9A45C]/30" />
                  <span className="font-serif-royal text-4xl font-extrabold tracking-wider text-[#FFF8E9] drop-shadow-md sm:text-5xl md:text-6xl">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="font-serif-royal mt-2 text-xs font-bold uppercase tracking-widest text-[#E3C98A] sm:text-sm">
                    {unit.label}
                  </span>
                  <span className="font-telugu mt-0.5 text-[11px] text-[#E3C98A]/75 sm:text-xs">
                    {unit.telugu}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          <div className="sr-only" aria-live="polite">
            Scratch the decorative surface with a finger or mouse to reveal the wedding countdown. The countdown remains available to assistive technology.
          </div>
          <noscript>
            <p className="mt-4 font-serif-elegant text-[#FFF8E9]">
              Wedding ceremony: {weddingConfig.weddingDateTime.dateFormatted} at {weddingConfig.weddingDateTime.muhurthamTime}.
            </p>
          </noscript>
          {hasMounted && !scratchLayerRemoved && (
            <canvas
              ref={scratchCanvasRef}
              aria-hidden="true"
              className={`absolute inset-0 z-20 h-full w-full touch-none cursor-crosshair rounded-2xl transition-opacity duration-[900ms] motion-reduce:duration-200 ${
                scratchRevealed ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
              onPointerDown={(event) => {
                if (scratchRevealed) return;
                event.preventDefault();
                event.currentTarget.setPointerCapture(event.pointerId);
                scratchPointerRef.current = event.pointerId;
                scratchPointRef.current = null;
                scratchAt(event);
                scheduleScratchProgressCheck();
              }}
              onPointerMove={(event) => {
                if (scratchPointerRef.current !== event.pointerId) return;
                scratchAt(event);
                scheduleScratchProgressCheck();
              }}
              onPointerUp={(event) => {
                if (scratchPointerRef.current !== event.pointerId) return;
                scratchAt(event);
                scratchPointerRef.current = null;
                scratchPointRef.current = null;
                scheduleScratchProgressCheck(true);
              }}
              onPointerCancel={() => {
                scratchPointerRef.current = null;
                scratchPointRef.current = null;
                scheduleScratchProgressCheck(true);
              }}
            />
          )}
          {hasMounted && showScratchBlast && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-2xl">
              {prefersReducedMotion ? (
                <motion.div
                  initial={{ opacity: 0.24 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="absolute inset-0 bg-[#E3C98A]"
                />
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0.08, opacity: 0.72 }}
                    animate={{ scale: 3.2, opacity: 0 }}
                    transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F5D98B] shadow-[0_0_34px_rgba(227,201,138,0.65)]"
                  />
                  <motion.div
                    initial={{ opacity: 0.34 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,236,180,0.48),rgba(255,236,180,0)_58%)]"
                  />
                  {burstParticles.map((particle, index) => (
                    <motion.span
                      key={index}
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0.35, rotate: 0 }}
                      animate={{ x: particle.x, y: particle.y, opacity: [0, 1, 0], scale: [0.35, 1, 0.25], rotate: particle.rotation }}
                      transition={{ duration: 0.9, delay: (index % 4) * 0.015, ease: "easeOut" }}
                      className={`absolute left-1/2 top-1/2 ${particle.isConfetti ? "rounded-[1px]" : "rounded-full"} ${index % 3 === 0 ? "bg-[#FFF1BD]" : "bg-[#D8B55B]"} shadow-[0_0_7px_rgba(245,217,139,0.8)]`}
                      style={{ width: particle.size, height: particle.isConfetti ? particle.size * 1.7 : particle.size }}
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Muhurtham Time Note */}
        <div className="mt-10 inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-[#FFF8E9]/10 border border-[#C9A45C]/50 text-xs sm:text-sm text-[#E3C98A]">
          <span className="font-serif-royal font-medium">
            Sumuhurtham: {weddingConfig.weddingDateTime.muhurthamTime} ({weddingConfig.weddingDateTime.timezone})
          </span>
        </div>
      </div>
    </section>
  );
};
