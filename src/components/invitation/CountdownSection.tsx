"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
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

        {/* Dynamic Countdown Grid or Celebration State */}
        {!hasMounted ? (
          <div className="h-32 flex items-center justify-center">
            <span className="text-[#E3C98A] font-serif-royal animate-pulse">
              Auspicious Muhurtham Loading...
            </span>
          </div>
        ) : timeLeft.isPassed ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 max-w-lg mx-auto rounded-2xl bg-[#FFF8E9]/10 border-2 border-[#C9A45C] backdrop-blur-md"
          >
            <div className="flex justify-center mb-3">
              <Heart className="w-10 h-10 text-[#E3C98A] fill-[#E3C98A] animate-pulse" />
            </div>
            <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#E3C98A]">
              The Celebration Has Begun!
            </h3>
            <p className="font-serif-elegant text-lg text-[#FFF8E9] mt-2 italic">
              Celebrating Our Forever with the blessings of our elders and friends.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto mt-6">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-[#2B050E]/70 border-2 border-[#C9A45C]/60 shadow-xl backdrop-blur-sm group hover:border-[#E3C98A] transition-all duration-300"
              >
                {/* Gold Inner Hairline Frame */}
                <div className="absolute inset-1.5 border border-dashed border-[#C9A45C]/30 rounded-xl pointer-events-none" />

                {/* Number Value */}
                <span className="font-serif-royal text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#FFF8E9] tracking-wider drop-shadow-md">
                  {String(unit.value).padStart(2, "0")}
                </span>

                {/* English Unit Label */}
                <span className="font-serif-royal text-xs sm:text-sm font-bold tracking-widest text-[#E3C98A] mt-2 uppercase">
                  {unit.label}
                </span>

                {/* Telugu Unit Label */}
                <span className="font-telugu text-[11px] sm:text-xs text-[#E3C98A]/75 mt-0.5">
                  {unit.telugu}
                </span>
              </motion.div>
            ))}
          </div>
        )}

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
