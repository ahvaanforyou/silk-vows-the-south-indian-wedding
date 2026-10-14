"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { weddingConfig } from "@/data/wedding-data";

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

// Carnatic Raga Mohanam & Kalyani Auspicious Wedding Frequencies (Sa, Ri, Ga, Pa, Dha, Sa)
// C major pentatonic base with micro-tonal warmth
const RAGA_NOTES = [
  261.63, // Sa (C4)
  293.66, // Ri2 (D4)
  329.63, // Ga3 (E4)
  392.00, // Pa (G4)
  440.00, // Dha2 (A4)
  523.25, // Sa' (C5)
  587.33, // Ri' (D5)
  659.25, // Ga' (E5)
];

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  autoPlayTrigger = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const playFluteNote = useCallback((freq: number, duration: number) => {
    if (!audioContextRef.current || !masterGainRef.current) return;
    const ctx = audioContextRef.current;

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    // Warm flute tone (mix of sine with gentle second harmonic)
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Attack, Decay, Sustain, Release
    const now = ctx.currentTime;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.14, now + 0.15); // gentle swell
    noteGain.gain.exponentialRampToValueAtTime(0.09, now + duration * 0.7);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(masterGainRef.current);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }, []);

  const startCarnaticMelody = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }

      const ctx = audioContextRef.current;

      // Master Gain
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.5, ctx.currentTime);
      master.connect(ctx.destination);
      masterGainRef.current = master;

      // Auspicious Tanpura Drone (Sa & Pa continuous warm harmony)
      const droneBassFreqs = [130.81, 196.00, 261.63]; // C3, G3, C4
      droneBassFreqs.forEach((f) => {
        const droneOsc = ctx.createOscillator();
        const droneGain = ctx.createGain();
        droneOsc.type = "triangle";
        droneOsc.frequency.setValueAtTime(f, ctx.currentTime);
        droneGain.gain.setValueAtTime(0.03, ctx.currentTime);
        droneOsc.connect(droneGain);
        droneGain.connect(master);
        droneOsc.start();
      });

      // Melodic sequence generator (Traditional Auspicious Wedding Phrases)
      const melodySequence = [
        0, 1, 2, 3, 4, 3, 2, 1, // Ascending & descending
        2, 3, 4, 5, 4, 3, 2, 0, // Higher register celebration
        3, 4, 5, 7, 5, 4, 3, 2, // Mangalya dharana crescendo
        4, 3, 2, 1, 0, 0        // Gentle resolution
      ];

      let noteIdx = 0;
      synthIntervalRef.current = setInterval(() => {
        if (!audioContextRef.current || audioContextRef.current.state !== "running") return;
        const noteIndex = melodySequence[noteIdx % melodySequence.length];
        const freq = RAGA_NOTES[noteIndex];
        playFluteNote(freq, 0.9);
        noteIdx++;
      }, 750);

      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio initialization skipped:", e);
    }
  }, [playFluteNote]);

  const stopMusic = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.suspend();
    }
    setIsPlaying(false);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startCarnaticMelody();
    }
  };

  useEffect(() => {
    if (weddingConfig.audio.enabled && autoPlayTrigger && !isPlaying) {
      const timer = setTimeout(() => {
        startCarnaticMelody();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoPlayTrigger, isPlaying, startCarnaticMelody]);

  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  if (!weddingConfig.audio.enabled) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center space-x-2">
      {/* Title Tooltip */}
      <div
        className={`px-3 py-1.5 rounded-full bg-[#6D1429]/95 text-[#FFF8E9] text-xs font-serif-royal border border-[#C9A45C] shadow-lg transition-all duration-300 pointer-events-none hidden sm:block ${
          showTooltip || isPlaying ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
      >
        <span className="text-[#E3C98A] font-semibold">{weddingConfig.audio.title}</span>
        <span className="opacity-80 ml-1.5">({isPlaying ? "Playing" : "Muted"})</span>
      </div>

      {/* Circular Player Button */}
      <button
        onClick={toggleMusic}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-2 border-[#E3C98A] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A45C] cursor-pointer ${
          isPlaying
            ? "bg-[#6D1429] text-[#E3C98A] shadow-[#D4AF37]/40 ring-2 ring-[#C9A45C]/50"
            : "bg-[#FFF8E9] text-[#6D1429] hover:bg-[#F5EBD8]"
        }`}
        title={isPlaying ? "Mute Traditional Wedding Music" : "Play Traditional Wedding Music"}
        aria-label={isPlaying ? "Mute Traditional Wedding Music" : "Play Traditional Wedding Music"}
      >
        {isPlaying ? (
          <div className="relative">
            <Volume2 className="w-5 h-5 text-[#E3C98A]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E3C98A] animate-ping" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5 opacity-70 text-[#6D1429]" />
        )}
      </button>
    </div>
  );
};

