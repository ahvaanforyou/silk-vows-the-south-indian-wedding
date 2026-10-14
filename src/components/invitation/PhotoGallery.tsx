"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig, GalleryPhoto } from "@/data/wedding-data";
import { FloralDivider } from "../traditional/OrnamentalBorders";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

export const PhotoGallery: React.FC = () => {
  const { gallery } = weddingConfig;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "traditional" | "pre-wedding" | "candid">("all");

  const filteredPhotos = filter === "all"
    ? gallery
    : gallery.filter((p) => p.category === filter);

  const handleOpenLightbox = (photo: GalleryPhoto) => {
    const index = gallery.findIndex((p) => p.id === photo.id);
    if (index !== -1) {
      setSelectedPhotoIndex(index);
    }
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handleNextPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! + 1) % gallery.length);
  }, [selectedPhotoIndex, gallery.length]);

  const handlePrevPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! - 1 + gallery.length) % gallery.length);
  }, [selectedPhotoIndex, gallery.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowRight") handleNextPhoto();
      if (e.key === "ArrowLeft") handlePrevPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, handleNextPhoto, handlePrevPhoto]);

  return (
    <section
      id="gallery"
      className="relative py-24 px-4 sm:px-6 bg-[#F5EBD8] text-[#4A0B1A] overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="font-telugu text-lg text-[#8B1E2D] font-bold block mb-1">
          మధుర క్షణాలు
        </span>
        <h2 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#6D1429] tracking-wide">
          Cherished Moments
        </h2>
        <p className="font-serif-elegant italic text-lg sm:text-xl text-[#8B1E2D] mt-2 max-w-xl mx-auto">
          Glimpses into our journey of love, laughter, and sacred traditions.
        </p>
        <FloralDivider theme="maroon" />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {(
            [
              { id: "all", label: "All Memories", telugu: "అన్నీ" },
              { id: "traditional", label: "Traditional", telugu: "సాంప్రదాయం" },
              { id: "pre-wedding", label: "Pre-Wedding", telugu: "ప్రేమయానం" },
              { id: "candid", label: "Candid Smiles", telugu: "చిరునవ్వులు" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-serif-royal font-semibold transition-all duration-300 border cursor-pointer ${
                filter === tab.id
                  ? "bg-[#6D1429] text-[#FFF8E9] border-[#6D1429] shadow-md"
                  : "bg-[#FFF8E9] text-[#6D1429] border-[#C9A45C]/50 hover:border-[#8B1E2D]"
              }`}
            >
              <span>{tab.label}</span>
              <span className="opacity-70 ml-1.5 text-[11px] font-telugu">({tab.telugu})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[260px]">
        {filteredPhotos.map((photo, index) => {
          const isSpanRow = photo.aspect === "portrait";
          const isSpanCol = photo.aspect === "landscape" && index % 3 === 0;

          return (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`group relative rounded-2xl overflow-hidden border-2 border-[#C9A45C]/60 shadow-lg cursor-pointer bg-[#E8D3B9] ${
                isSpanRow ? "sm:row-span-2" : ""
              } ${isSpanCol ? "lg:col-span-2" : ""}`}
              onClick={() => handleOpenLightbox(photo)}
            >
              {/* Image with Next.js optimized loading */}
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />

              {/* Hover Overlay with traditional gold frame effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B0713]/90 via-[#3B0713]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                <div className="absolute inset-3 border border-[#E3C98A]/70 rounded-xl pointer-events-none transform scale-95 group-hover:scale-100 transition-transform duration-300" />
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-full bg-[#E3C98A] text-[#3B0713] flex items-center justify-center mb-2 shadow-md">
                    <Eye className="w-4 h-4" />
                  </div>
                  <p className="font-serif-royal text-sm font-semibold text-[#FFF8E9] line-clamp-2">
                    {photo.caption}
                  </p>
                  <span className="text-[11px] font-serif-royal text-[#E3C98A] uppercase tracking-wider block mt-0.5">
                    {photo.category}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F030A]/95 backdrop-blur-md p-4 select-none"
            onClick={handleCloseLightbox}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[#6D1429] text-[#FFF8E9] border border-[#C9A45C] flex items-center justify-center hover:bg-[#8B1E2D] transition-colors z-50 cursor-pointer shadow-lg"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#6D1429]/80 text-[#FFF8E9] border border-[#C9A45C] flex items-center justify-center hover:bg-[#6D1429] transition-colors z-50 cursor-pointer shadow-xl"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#6D1429]/80 text-[#FFF8E9] border border-[#C9A45C] flex items-center justify-center hover:bg-[#6D1429] transition-colors z-50 cursor-pointer shadow-xl"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              key={gallery[selectedPhotoIndex].id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden border-2 border-[#C9A45C] shadow-2xl bg-black">
                <Image
                  src={gallery[selectedPhotoIndex].src}
                  alt={gallery[selectedPhotoIndex].caption}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Caption Bar */}
              <div className="mt-4 px-6 py-3 rounded-full bg-[#6D1429]/90 border border-[#C9A45C] text-center shadow-lg max-w-xl">
                <p className="font-serif-royal text-sm sm:text-base text-[#FFF8E9] font-medium">
                  {gallery[selectedPhotoIndex].caption}
                </p>
                <p className="text-xs text-[#E3C98A] mt-0.5">
                  Photo {selectedPhotoIndex + 1} of {gallery.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
