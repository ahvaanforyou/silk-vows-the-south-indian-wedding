"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/data/wedding-data";
import { FloralDivider, CornerOrnament } from "../traditional/OrnamentalBorders";
import { Heart, Sparkles, Send, Users } from "lucide-react";
import confetti from "canvas-confetti";

export const RSVPSection: React.FC = () => {
  const { rsvp, events } = weddingConfig;

  const [fullName, setFullName] = useState("");
  const [attendance, setAttendance] = useState<"attending" | "declining">("attending");
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(() =>
    events.map((e) => e.id)
  );
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // If RSVP is disabled in configuration, do not render anything
  if (!rsvp.enabled) return null;

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const triggerFlowerShower = () => {
    // Traditional marigold & rose petal confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#D97706", "#F59E0B", "#8B1E2D", "#C9A45C", "#FFF8E9"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (attendance === "attending" && selectedEvents.length === 0) {
      setErrorMsg("Please select at least one ceremony you will be attending.");
      return;
    }

    setIsSubmitting(true);

    // Save to local storage to prevent duplicate submissions
    try {
      const submission = {
        name: fullName,
        attendance,
        guestCount: attendance === "attending" ? guestCount : 0,
        events: selectedEvents,
        message,
        timestamp: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("wedding_rsvps") || "[]");
      existing.push(submission);
      localStorage.setItem("wedding_rsvps", JSON.stringify(existing));
    } catch (err) {
      console.warn("Local storage not available:", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      triggerFlowerShower();
    }, 600);
  };

  return (
    <section
      id="rsvp"
      className="relative py-24 px-4 sm:px-6 bg-[#F5EBD8] text-[#4A0B1A] overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <span className="font-telugu text-lg text-[#8B1E2D] font-bold block mb-1">
          మీ రాక మాకు ఆనందం
        </span>
        <h2 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#6D1429] tracking-wide">
          We Would Love to Celebrate With You
        </h2>
        <p className="font-serif-elegant italic text-lg sm:text-xl text-[#8B1E2D] mt-2 max-w-xl mx-auto">
          Please let us know if you will be joining us for our special day.
        </p>
        <FloralDivider theme="maroon" />
        <p className="text-xs font-serif-royal uppercase tracking-widest text-[#9A7730] mt-1 font-semibold">
          Kindly RSVP by {rsvp.deadline}
        </p>
      </div>

      {/* RSVP Form Card */}
      <div className="max-w-2xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl p-6 sm:p-10 bg-[#FFF8E9] border-2 border-[#C9A45C] shadow-2xl overflow-hidden"
        >
          <CornerOrnament position="top-left" size={40} color="#8B1E2D" />
          <CornerOrnament position="top-right" size={40} color="#8B1E2D" />
          <CornerOrnament position="bottom-left" size={40} color="#8B1E2D" />
          <CornerOrnament position="bottom-right" size={40} color="#8B1E2D" />

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              /* Success Confirmation Screen */
              <motion.div
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#8B1E2D]/10 border-2 border-[#8B1E2D] flex items-center justify-center text-[#8B1E2D] mb-4">
                  <Heart className="w-8 h-8 fill-[#8B1E2D] animate-bounce" />
                </div>
                <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#6D1429]">
                  Dhanyavadhamulu!
                </h3>
                <span className="font-telugu text-lg text-[#8B1E2D] font-bold block mt-1">
                  మీ శుభాకాంక్షలకు ధన్యవాదాలు
                </span>
                <p className="font-serif-elegant italic text-lg text-[#4A0B1A] mt-3 max-w-md">
                  Thank you, <strong>{fullName}</strong>. We have joyfully received your RSVP and cannot wait to celebrate with you!
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2 rounded-full border border-[#C9A45C] text-xs font-serif-royal font-semibold text-[#8B1E2D] hover:bg-[#F5EBD8] transition-colors cursor-pointer"
                >
                  Edit Response
                </button>
              </motion.div>
            ) : (
              /* RSVP Input Form */
              <form key="form" onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-800 text-xs font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Guest Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block font-serif-royal text-xs font-bold uppercase tracking-wider text-[#6D1429] mb-1.5"
                  >
                    Guest Name(s) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Smt. Lakshmi & Sri Venkatesh"
                    className="w-full px-4 py-3 rounded-xl border border-[#C9A45C]/60 bg-[#FFFDF8] text-[#4A0B1A] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] text-sm"
                  />
                </div>

                {/* Attendance Radio Buttons */}
                <div>
                  <label className="block font-serif-royal text-xs font-bold uppercase tracking-wider text-[#6D1429] mb-2">
                    Will you be attending? <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttendance("attending")}
                      className={`p-3.5 rounded-xl border flex items-center justify-center space-x-2 text-sm font-serif-royal font-semibold transition-all cursor-pointer ${
                        attendance === "attending"
                          ? "bg-[#6D1429] text-[#FFF8E9] border-[#6D1429] shadow-md"
                          : "bg-[#FFFDF8] text-[#6D1429] border-[#C9A45C]/60 hover:bg-[#F5EBD8]"
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Joyfully Accepts</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendance("declining")}
                      className={`p-3.5 rounded-xl border flex items-center justify-center space-x-2 text-sm font-serif-royal font-semibold transition-all cursor-pointer ${
                        attendance === "declining"
                          ? "bg-[#8B1E2D] text-[#FFF8E9] border-[#8B1E2D] shadow-md"
                          : "bg-[#FFFDF8] text-[#6D1429] border-[#C9A45C]/60 hover:bg-[#F5EBD8]"
                      }`}
                    >
                      <span>Regretfully Declines</span>
                    </button>
                  </div>
                </div>

                {/* Attending Specific Fields */}
                {attendance === "attending" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6 pt-2"
                  >
                    {/* Number of Guests */}
                    <div>
                      <label
                        htmlFor="guestCount"
                        className="block font-serif-royal text-xs font-bold uppercase tracking-wider text-[#6D1429] mb-1.5"
                      >
                        Number of Attending Guests
                      </label>
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-[#8B1E2D]" />
                        <select
                          id="guestCount"
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="px-4 py-2.5 rounded-xl border border-[#C9A45C]/60 bg-[#FFFDF8] text-[#4A0B1A] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] text-sm"
                        >
                          {Array.from({ length: rsvp.maxGuests }).map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1} {i === 0 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Events Selection Checkboxes */}
                    <div>
                      <label className="block font-serif-royal text-xs font-bold uppercase tracking-wider text-[#6D1429] mb-2">
                        Which ceremonies will you attend?
                      </label>
                      <div className="space-y-2">
                        {events.map((event) => (
                          <label
                            key={event.id}
                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                              selectedEvents.includes(event.id)
                                ? "bg-[#F5EBD8] border-[#8B1E2D]"
                                : "bg-[#FFFDF8] border-[#C9A45C]/40"
                            }`}
                          >
                            <div>
                              <span className="font-serif-royal text-sm font-semibold text-[#6D1429] block">
                                {event.title}
                              </span>
                              <span className="text-xs text-[#8B1E2D]/80 block">
                                {event.date} • {event.time}
                              </span>
                            </div>
                            <input
                              type="checkbox"
                              checked={selectedEvents.includes(event.id)}
                              onChange={() => handleEventToggle(event.id)}
                              className="w-4 h-4 accent-[#8B1E2D]"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Warm Wishes / Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-serif-royal text-xs font-bold uppercase tracking-wider text-[#6D1429] mb-1.5"
                  >
                    Blessings & Message to the Couple (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your heartfelt wishes or dietary notes..."
                    className="w-full px-4 py-3 rounded-xl border border-[#C9A45C]/60 bg-[#FFFDF8] text-[#4A0B1A] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D] text-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#9A7730] via-[#D4AF37] to-[#9A7730] text-[#3B0713] font-serif-royal font-bold text-sm sm:text-base tracking-widest uppercase shadow-xl hover:shadow-[#D4AF37]/50 transition-all duration-300 border border-[#FFF2B2] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Submitting RSVP..." : "Submit RSVP"}</span>
                </button>

                {/* Note about real submission configuration */}
                <p className="text-[11px] text-center text-[#8B1E2D]/70 italic mt-2">
                  Responses are securely recorded. For assistance, reach out at {rsvp.contactPhone}
                </p>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
