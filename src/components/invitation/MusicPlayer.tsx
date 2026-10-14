"use client";

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { weddingConfig } from "@/data/wedding-data";

export interface MusicPlayerHandle {
  play: () => void;
}

export const MusicPlayer = forwardRef<MusicPlayerHandle>((_props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.ended) audio.currentTime = 0;
      await audio.play();
    } catch (error) {
      setIsPlaying(false);
      console.warn("Background music could not be started:", error);
    }
  }, []);

  useImperativeHandle(ref, () => ({ play: () => void startPlayback() }), [startPlayback]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncPlaybackState = () => setIsPlaying(!audio.paused && !audio.ended);
    const handleError = () => {
      setIsPlaying(false);
      console.warn("Background music could not be loaded:", audio.error?.message ?? "Unknown audio error.");
    };

    audio.addEventListener("play", syncPlaybackState);
    audio.addEventListener("playing", syncPlaybackState);
    audio.addEventListener("pause", syncPlaybackState);
    audio.addEventListener("ended", syncPlaybackState);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("play", syncPlaybackState);
      audio.removeEventListener("playing", syncPlaybackState);
      audio.removeEventListener("pause", syncPlaybackState);
      audio.removeEventListener("ended", syncPlaybackState);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused || audio.ended) void startPlayback();
    else audio.pause();
  };

  if (!weddingConfig.audio.enabled) return null;

  return (
    <>
      <audio ref={audioRef} src={weddingConfig.audio.src} preload="none" loop aria-hidden="true" className="hidden" />
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        aria-pressed={isPlaying}
        className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#E3C98A] shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A45C] cursor-pointer ${
          isPlaying
            ? "bg-[#6D1429] text-[#E3C98A] shadow-[#D4AF37]/40 ring-2 ring-[#C9A45C]/50"
            : "bg-[#FFF8E9] text-[#6D1429] hover:bg-[#F5EBD8]"
        }`}
      >
        {isPlaying ? <Volume2 aria-hidden="true" className="h-5 w-5 text-[#E3C98A]" /> : <VolumeX aria-hidden="true" className="h-5 w-5 text-[#6D1429]" />}
      </button>
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";
