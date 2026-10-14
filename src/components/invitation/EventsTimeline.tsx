"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig, WeddingEvent } from "@/data/wedding-data";
import { FloralDivider, CornerOrnament } from "../traditional/OrnamentalBorders";
import { Calendar, Clock, MapPin, ExternalLink, Sparkles } from "lucide-react";

export const EventsTimeline: React.FC = () => {
  const { events } = weddingConfig;

  const generateIcsCalendar = (event: WeddingEvent) => {
    const title = `${event.title} — Sravya & Karthik Wedding`;
    const description = `${event.description}\\nDress Code: ${event.dressCode}\\nVenue: ${event.venue}`;
    const location = `${event.venue}, ${event.address}`;

    // Simple standard ICS template
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Sravya and Karthik Wedding//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART;TZID=Asia/Kolkata:20261218T103000`,
      `DTEND;TZID=Asia/Kolkata:20261218T140000`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="events"
      className="relative py-24 px-4 sm:px-6 bg-[#FFF8E9] text-[#4A0B1A] overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="font-telugu text-lg text-[#8B1E2D] font-bold block mb-1">
          శుభకార్య వివరాలు
        </span>
        <h2 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#6D1429] tracking-wide">
          Wedding Ceremonies & Events
        </h2>
        <p className="font-serif-elegant italic text-lg sm:text-xl text-[#8B1E2D] mt-2 max-w-xl mx-auto">
          We invite you to join every auspicious celebration as our families unite.
        </p>
        <FloralDivider theme="maroon" />
      </div>

      {/* Events List / Timeline Container */}
      <div className="max-w-5xl mx-auto relative">
        {/* Vertical center connecting line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#C9A45C]/40 via-[#8B1E2D]/60 to-[#C9A45C]/40" />

        <div className="space-y-12 md:space-y-16">
          {events.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={event.id}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Center Timeline Node with Kalash on desktop */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#FFF8E9] border-2 border-[#C9A45C] shadow-md items-center justify-center z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    event.isMainEvent ? "bg-[#8B1E2D] text-[#FFF8E9]" : "bg-[#C9A45C]/20 text-[#8B1E2D]"
                  }`}>
                    <span className="font-serif-royal text-xs font-bold">{index + 1}</span>
                  </div>
                </div>

                {/* Event Card Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`w-full md:w-[46%] ${
                    isEven ? "md:pl-6" : "md:pr-6"
                  }`}
                >
                  <div
                    className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-xl overflow-hidden ${
                      event.isMainEvent
                        ? "bg-gradient-to-b from-[#6D1429] via-[#5A0F21] to-[#420A17] text-[#FFF8E9] border-2 border-[#C9A45C] ring-4 ring-[#C9A45C]/20"
                        : "bg-[#FFFDF8] text-[#4A0B1A] border-2 border-[#C9A45C]/50 hover:border-[#C9A45C]"
                    }`}
                  >
                    {/* Corner Ornaments on Main Ceremony */}
                    {event.isMainEvent ? (
                      <>
                        <CornerOrnament position="top-left" size={40} color="#E3C98A" />
                        <CornerOrnament position="top-right" size={40} color="#E3C98A" />
                      </>
                    ) : (
                      <>
                        <CornerOrnament position="top-left" size={32} color="#C9A45C" />
                        <CornerOrnament position="top-right" size={32} color="#C9A45C" />
                      </>
                    )}

                    {/* Primary Muhurtham Highlight Badge */}
                    {event.isMainEvent && (
                      <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#E3C98A] text-[#4A0B1A] text-xs font-serif-royal font-bold tracking-widest uppercase mb-3 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-[#6D1429]" />
                        <span>Auspicious Muhurtham Ceremony</span>
                      </div>
                    )}

                    {/* Event Titles */}
                    <div className="mb-4">
                      <span className={`font-telugu text-sm font-semibold block ${
                        event.isMainEvent ? "text-[#E3C98A]" : "text-[#8B1E2D]"
                      }`}>
                        {event.teluguTitle}
                      </span>
                      <h3 className={`font-serif-royal text-2xl sm:text-3xl font-bold tracking-wide mt-1 ${
                        event.isMainEvent ? "text-[#FFF8E9]" : "text-[#6D1429]"
                      }`}>
                        {event.title}
                      </h3>
                    </div>

                    {/* Date and Time */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center space-x-2.5">
                        <Calendar className={`w-4 h-4 flex-shrink-0 ${
                          event.isMainEvent ? "text-[#E3C98A]" : "text-[#8B1E2D]"
                        }`} />
                        <span className="font-semibold">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <Clock className={`w-4 h-4 flex-shrink-0 ${
                          event.isMainEvent ? "text-[#E3C98A]" : "text-[#8B1E2D]"
                        }`} />
                        <span className="font-medium">{event.time}</span>
                      </div>
                      <div className="flex items-start space-x-2.5">
                        <MapPin className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          event.isMainEvent ? "text-[#E3C98A]" : "text-[#8B1E2D]"
                        }`} />
                        <div>
                          <p className="font-semibold">{event.venue}</p>
                          <p className={`text-xs mt-0.5 ${
                            event.isMainEvent ? "text-[#FFF8E9]/75" : "text-[#4A0B1A]/70"
                          }`}>
                            {event.address}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      event.isMainEvent ? "text-[#FFF8E9]/85" : "text-[#4A0B1A]/80"
                    }`}>
                      {event.description}
                    </p>

                    {/* Dress Code Tag */}
                    <div className={`p-2.5 rounded-lg text-xs mb-5 border ${
                      event.isMainEvent
                        ? "bg-[#2B050E]/60 border-[#C9A45C]/30 text-[#E3C98A]"
                        : "bg-[#F5EBD8]/70 border-[#C9A45C]/40 text-[#6D1429]"
                    }`}>
                      <span className="font-bold uppercase tracking-wider text-[11px] block">
                        Dress Code:
                      </span>
                      <span className="mt-0.5 block">{event.dressCode}</span>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className="flex flex-wrap gap-2.5 pt-2 border-t border-[#C9A45C]/30">
                      {/* Get Directions Link */}
                      <a
                        href={event.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-serif-royal font-semibold transition-all duration-200 cursor-pointer ${
                          event.isMainEvent
                            ? "bg-[#C9A45C] text-[#3B0713] hover:bg-[#E3C98A]"
                            : "bg-[#8B1E2D] text-[#FFF8E9] hover:bg-[#6D1429]"
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Get Directions</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>

                      {/* Add to Calendar Button */}
                      <button
                        onClick={() => generateIcsCalendar(event)}
                        className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-serif-royal font-semibold transition-all duration-200 border cursor-pointer ${
                          event.isMainEvent
                            ? "border-[#E3C98A] text-[#E3C98A] hover:bg-[#E3C98A]/20"
                            : "border-[#C9A45C] text-[#8B1E2D] hover:bg-[#C9A45C]/15"
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Add to Calendar</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
