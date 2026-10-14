"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/data/wedding-data";
import { ToranHeader } from "../traditional/ToranHeader";
import { BrassDiya } from "../traditional/BrassDiya";
import { CornerOrnament } from "../traditional/OrnamentalBorders";
import { TempleBell } from "../traditional/TempleBell";
import { Sparkles } from "lucide-react";

interface InvitationCoverProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const InvitationCover: React.FC<InvitationCoverProps> = ({
  isOpen,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Allow smooth animation to begin, then inform parent
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B050E]/90 backdrop-blur-md p-3 sm:p-6 overflow-hidden perspective-2000"
        >
          {/* Subtle Ambient Glow behind card */}
          <div className="absolute w-[80vw] h-[80vh] max-w-2xl max-h-[800px] bg-[#8B1E2D]/40 rounded-full blur-3xl pointer-events-none" />

          {/* Traditional Card Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{
              scale: 1.08,
              opacity: 0,
              rotateX: 10,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full max-w-xl max-h-[92vh] sm:max-h-[88vh] flex flex-col justify-between rounded-2xl shadow-2xl overflow-hidden border-2 border-[#C9A45C] bg-gradient-to-b from-[#6D1429] via-[#520C1C] to-[#3B0713] text-[#FFF8E9] select-none"
          >
            {/* Silk cloth texture effect & border inlays */}
            <div className="absolute inset-2 sm:inset-3 border border-[#E3C98A]/50 rounded-xl pointer-events-none" />
            <div className="absolute inset-3 sm:inset-4 border border-dashed border-[#C9A45C]/30 rounded-lg pointer-events-none" />

            {/* Antique Gold Corner Ornaments */}
            <CornerOrnament position="top-left" size={54} color="#C9A45C" />
            <CornerOrnament position="top-right" size={54} color="#C9A45C" />
            <CornerOrnament position="bottom-left" size={54} color="#C9A45C" />
            <CornerOrnament position="bottom-right" size={54} color="#C9A45C" />

            {/* Hanging South Indian Temple Bells on Corners */}
            <div className="absolute top-0 left-12 hidden sm:block z-20">
              <TempleBell size={28} chainLength={25} />
            </div>
            <div className="absolute top-0 right-12 hidden sm:block z-20">
              <TempleBell size={28} chainLength={25} />
            </div>

            {/* Top Mango Leaf Toran */}
            <div className="relative z-20 w-full pt-1">
              <ToranHeader leafCount={7} />
            </div>

            {/* Central Invitation Card Body */}
            <div className="relative z-10 px-5 sm:px-10 py-3 sm:py-6 flex flex-col items-center text-center my-auto">
              {/* Sacred Sanskrit / Telugu Ganesha Invocation */}
              <div className="mb-2">
                <p className="font-serif-royal text-base sm:text-lg tracking-widest text-[#E3C98A] font-semibold drop-shadow-sm">
                  {weddingConfig.shlokas.sanskritGanesha}
                </p>
                <p className="font-telugu text-sm sm:text-base text-[#FFE5A3] mt-0.5 opacity-90">
                  {weddingConfig.shlokas.teluguGanesha}
                </p>
              </div>

              {/* Blessings line */}
              <p className="text-xs sm:text-sm tracking-wider uppercase text-[#E3C98A]/90 font-light mt-1 mb-2">
                With the blessings of our families
              </p>

              {/* Decorative separator line */}
              <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent my-1" />

              <p className="text-[11px] sm:text-xs tracking-widest uppercase text-[#FFF8E9]/80 font-medium my-1">
                You are cordially invited to celebrate the wedding of
              </p>

              {/* Couple Names - Strongest visual elements */}
              <div className="my-2 sm:my-3">
                <h1 className="font-serif-royal text-3xl sm:text-4.5xl md:text-5xl font-bold tracking-wide gold-gradient-text drop-shadow-md leading-tight">
                  {weddingConfig.couple.bride.name}
                </h1>

                {/* Telugu Wedding '&' / 'weds' flourish */}
                <div className="flex items-center justify-center space-x-3 my-1">
                  <span className="w-8 h-[1px] bg-[#E3C98A]/40" />
                  <span className="font-serif-elegant italic text-2xl sm:text-3xl text-[#E3C98A]">
                    &
                  </span>
                  <span className="w-8 h-[1px] bg-[#E3C98A]/40" />
                </div>

                <h1 className="font-serif-royal text-3xl sm:text-4.5xl md:text-5xl font-bold tracking-wide gold-gradient-text drop-shadow-md leading-tight">
                  {weddingConfig.couple.groom.name}
                </h1>
              </div>

              {/* Wedding Date & Muhurtham Highlights */}
              <div className="mt-2 mb-1 p-2 sm:p-2.5 rounded-lg bg-[#3B0713]/60 border border-[#C9A45C]/40 max-w-sm w-full">
                <p className="font-serif-royal text-sm sm:text-base text-[#FFF8E9] font-medium tracking-wide">
                  {weddingConfig.weddingDateTime.dateFormatted}
                </p>
                <p className="font-telugu text-xs sm:text-sm text-[#E3C98A] mt-0.5">
                  {weddingConfig.weddingDateTime.muhurthamTelugu}
                </p>
              </div>

              {/* Brass Diya illustration */}
              <div className="mt-2 mb-1">
                <BrassDiya size={50} />
              </div>
            </div>

            {/* Bottom Tap to Open Interactive Button */}
            <div className="relative z-20 pb-5 sm:pb-7 pt-2 flex flex-col items-center">
              <motion.button
                onClick={handleOpenClick}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group relative px-7 sm:px-9 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#9A7730] via-[#D4AF37] to-[#9A7730] text-[#3B0713] font-serif-royal font-bold text-sm sm:text-base tracking-widest uppercase shadow-xl hover:shadow-[#D4AF37]/50 transition-all duration-300 border border-[#FFF2B2] overflow-hidden cursor-pointer"
              >
                {/* Button Shimmer Beam */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />

                <span className="relative flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#3B0713] animate-spin" style={{ animationDuration: "6s" }} />
                  <span>✦ Tap to Open ✦</span>
                  <Sparkles className="w-4 h-4 text-[#3B0713] animate-spin" style={{ animationDuration: "6s" }} />
                </span>
              </motion.button>

              <p className="text-[10px] sm:text-xs text-[#E3C98A]/75 mt-2 tracking-wider">
                Touch to open the royal invitation card
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
