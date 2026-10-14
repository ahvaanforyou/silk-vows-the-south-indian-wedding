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

export const CountdownSection: React.FC = () => {
  const hasMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const scratchCanvasRef = useRef<HTMLCanvasElement>(null);
  const scratchPointRef = useRef<{ x: number; y: number } | null>(null);
  const scratchPointerRef = useRef<number | null>(null);
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [scratchLayerRemoved, setScratchLayerRemoved] = useState(false);

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
    };

    drawCover();
    const observer = new ResizeObserver(drawCover);
    observer.observe(area);
    return () => observer.disconnect();
  }, [hasMounted, scratchLayerRemoved, scratchRevealed]);

  useEffect(() => {
    if (!scratchRevealed) return;
    const timeout = window.setTimeout(() => setScratchLayerRemoved(true), 450);
    return () => window.clearTimeout(timeout);
  }, [scratchRevealed]);

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

  const checkScratchProgress = () => {
    const canvas = scratchCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || canvas.width === 0 || canvas.height === 0) return;
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    let sampled = 0;
    for (let i = 3; i < pixels.length; i += 64) {
      sampled += 1;
      if (pixels[i] < 24) transparent += 1;
    }
    if (sampled > 0 && transparent / sampled >= 0.55) setScratchRevealed(true);
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
          {hasMounted && !scratchLayerRemoved && (
            <canvas
              ref={scratchCanvasRef}
              aria-hidden="true"
              className={`absolute inset-0 z-20 h-full w-full touch-none cursor-crosshair rounded-2xl transition-opacity duration-500 motion-reduce:transition-none ${
                scratchRevealed ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
              onPointerDown={(event) => {
                if (scratchRevealed) return;
                event.preventDefault();
                event.currentTarget.setPointerCapture(event.pointerId);
                scratchPointerRef.current = event.pointerId;
                scratchPointRef.current = null;
                scratchAt(event);
              }}
              onPointerMove={(event) => {
                if (scratchPointerRef.current !== event.pointerId) return;
                scratchAt(event);
              }}
              onPointerUp={(event) => {
                if (scratchPointerRef.current !== event.pointerId) return;
                scratchAt(event);
                scratchPointerRef.current = null;
                scratchPointRef.current = null;
                checkScratchProgress();
              }}
              onPointerCancel={() => {
                scratchPointerRef.current = null;
                scratchPointRef.current = null;
                checkScratchProgress();
              }}
            />
          )}
        </div>

        {/* Muhurtham Time Note */}
        <div className="mt-10 inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-[#FFF8E9]/10 border border-[#C9A45C]/50 text-xs sm:text-sm text-[#E3C98A]">
          <Sparkles className="w-4 h-4 text-[#C9A45C]" />
          <span className="font-serif-royal font-medium">
            Sumuhurtham: {weddingConfig.weddingDateTime.muhurthamTime} ({weddingConfig.weddingDateTime.timezone})
          </span>
          <Sparkles className="w-4 h-4 text-[#C9A45C]" />
        </div>
      </div>
    </section>
  );
};
