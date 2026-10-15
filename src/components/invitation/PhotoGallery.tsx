"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { weddingConfig } from "@/data/wedding-data";
import { FloralDivider } from "../traditional/OrnamentalBorders";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export const PhotoGallery: React.FC = () => {
  const { gallery } = weddingConfig;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLButtonElement | null)[]>([]);

  const goToPhoto = useCallback((index: number) => {
    const slide = slidesRef.current[index];
    const carousel = carouselRef.current;
    if (!slide || !carousel) return;

    carousel.scrollTo({
      left: slide.offsetLeft - (carousel.clientWidth - slide.clientWidth) / 2,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    setActiveIndex(index);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (isHovered || isInteracting || hasFocus || prefersReducedMotion || lightboxIndex !== null || gallery.length < 2) return;

    const interval = window.setInterval(() => {
      goToPhoto((activeIndex + 1) % gallery.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [activeIndex, gallery.length, goToPhoto, hasFocus, isHovered, isInteracting, lightboxIndex, prefersReducedMotion]);

  const handleCarouselScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const center = carousel.scrollLeft + carousel.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slidesRef.current.forEach((slide, index) => {
      if (!slide) return;
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(center - slideCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    setActiveIndex(closestIndex);
  };

  const handleOpenLightbox = (index: number) => setLightboxIndex(index);
  const handleCloseLightbox = () => setLightboxIndex(null);

  const handleNextPhoto = useCallback(() => {
    if (lightboxIndex === null || gallery.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % gallery.length);
  }, [lightboxIndex, gallery.length]);

  const handlePrevPhoto = useCallback(() => {
    if (lightboxIndex === null || gallery.length === 0) return;
    setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
  }, [lightboxIndex, gallery.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (event.key === "Escape") handleCloseLightbox();
      if (event.key === "ArrowRight") handleNextPhoto();
      if (event.key === "ArrowLeft") handlePrevPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleNextPhoto, handlePrevPhoto]);

  const handleCarouselKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToPhoto(Math.min(activeIndex + 1, gallery.length - 1));
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPhoto(Math.max(activeIndex - 1, 0));
    }
  };

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#F5EBD8] px-4 pt-24 pb-12 text-[#4A0B1A] sm:px-6 sm:py-24"
    >
      <div className={`mx-auto max-w-4xl text-center ${gallery.length > 0 ? "mb-12" : ""}`}>
        <span className="font-telugu mb-1 block text-lg font-bold text-[#8B1E2D]">
          మధుర క్షణాలు
        </span>
        <h2 className="font-serif-royal text-3xl font-bold tracking-wide text-[#6D1429] sm:text-4xl md:text-5xl">
          Cherished Moments
        </h2>
        <p className="font-serif-elegant mx-auto mt-2 max-w-xl text-lg italic text-[#8B1E2D] sm:text-xl">
          Glimpses into our journey of love, laughter, and sacred traditions.
        </p>
        <FloralDivider theme="maroon" />
      </div>

      {gallery.length > 0 && <div
        className="mx-auto max-w-6xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={() => setIsInteracting(true)}
        onPointerUp={() => setIsInteracting(false)}
        onPointerCancel={() => setIsInteracting(false)}
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHasFocus(false);
        }}
      >
        <div className="relative">
          <div
            ref={carouselRef}
            role="region"
            aria-label="Wedding photo carousel"
            tabIndex={0}
            onKeyDown={handleCarouselKeyDown}
            onScroll={handleCarouselScroll}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-[6%] py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-5 md:px-[12.5%] lg:px-[15%] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1E2D] focus-visible:ring-offset-4"
          >
            {gallery.map((photo, index) => (
              <motion.button
                key={photo.id}
                ref={(node) => {
                  slidesRef.current[index] = node;
                }}
                type="button"
                onClick={() => handleOpenLightbox(index)}
                aria-label={`Open photo ${index + 1}: ${photo.caption}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className="group relative aspect-[4/3] w-[88%] max-w-[860px] shrink-0 snap-center overflow-hidden rounded-2xl border-2 border-[#C9A45C]/70 bg-[#E8D3B9] text-left shadow-xl transition-shadow duration-300 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D1429] md:w-[75%] lg:w-[70%]"
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: activeIndex === index ? 1 : 0.78, scale: activeIndex === index ? 1 : 0.97 }}
                transition={{ duration: 0.35 }}
              >
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 768px) 88vw, (max-width: 1024px) 75vw, 70vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </motion.button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goToPhoto(Math.max(activeIndex - 1, 0))}
            disabled={activeIndex === 0}
            aria-label="Previous gallery photo"
            className="absolute left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#C9A45C] bg-[#FFF8E9]/95 text-[#6D1429] shadow-lg transition hover:bg-[#6D1429] hover:text-[#FFF8E9] disabled:cursor-not-allowed disabled:opacity-45 sm:left-5 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            type="button"
            onClick={() => goToPhoto(Math.min(activeIndex + 1, gallery.length - 1))}
            disabled={activeIndex === gallery.length - 1}
            aria-label="Next gallery photo"
            className="absolute right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#C9A45C] bg-[#FFF8E9]/95 text-[#6D1429] shadow-lg transition hover:bg-[#6D1429] hover:text-[#FFF8E9] disabled:cursor-not-allowed disabled:opacity-45 sm:right-5 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div className="-mx-1 mt-2 flex items-center justify-center gap-[5px] sm:mx-0 sm:mt-6" role="group" aria-label="Choose a gallery photo">
          {gallery.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => goToPhoto(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className="flex h-11 w-[13px] !min-w-[13px] shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D1429] focus-visible:ring-offset-1"
            >
              <span
                aria-hidden="true"
                className={`block h-2 w-2 rounded-full transition-colors duration-300 ${
                  activeIndex === index ? "bg-[#6D1429]" : "bg-[#C9A45C]/70 hover:bg-[#8B1E2D]"
                }`}
              />
            </button>
          ))}
        </div>
        <p className="mt-0 text-center font-serif-royal text-xs tracking-wider text-[#8B1E2D] sm:mt-3" aria-live="polite">
          {activeIndex + 1} / {gallery.length}
        </p>
      </div>}

      <AnimatePresence>
        {gallery.length > 0 && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex select-none items-center justify-center bg-[#1F030A]/95 p-4 backdrop-blur-md"
            onClick={handleCloseLightbox}
          >
            <button
              onClick={handleCloseLightbox}
              className="absolute right-6 top-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A45C] bg-[#6D1429] text-[#FFF8E9] shadow-lg transition-colors hover:bg-[#8B1E2D]"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={(event) => {
                event.stopPropagation();
                handlePrevPhoto();
              }}
              className="absolute left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#C9A45C] bg-[#6D1429]/80 text-[#FFF8E9] shadow-xl transition-colors hover:bg-[#6D1429] sm:left-8"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleNextPhoto();
              }}
              className="absolute right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#C9A45C] bg-[#6D1429]/80 text-[#FFF8E9] shadow-xl transition-colors hover:bg-[#6D1429] sm:right-8"
              aria-label="Next Photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={gallery[lightboxIndex].id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex max-h-[85vh] w-full max-w-4xl flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative h-[65vh] w-full overflow-hidden rounded-2xl border-2 border-[#C9A45C] bg-black shadow-2xl">
                <Image
                  src={gallery[lightboxIndex].src}
                  alt={gallery[lightboxIndex].caption}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="mt-4 max-w-xl rounded-full border border-[#C9A45C] bg-[#6D1429]/90 px-6 py-3 text-center shadow-lg">
                <p className="font-serif-royal text-sm font-medium text-[#FFF8E9] sm:text-base">
                  {gallery[lightboxIndex].caption}
                </p>
                <p className="mt-0.5 text-xs text-[#E3C98A]">
                  Photo {lightboxIndex + 1} of {gallery.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
