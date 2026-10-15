"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/data/wedding-data";
import { FloralDivider, CornerOrnament } from "../traditional/OrnamentalBorders";
import { MapPin, Navigation, Calendar, Car, Compass, ExternalLink } from "lucide-react";

export const VenueSection: React.FC = () => {
  const { venue, weddingDateTime } = weddingConfig;
  const mapsUrl = venue.googleMapsUrl?.trim();
  const mapEmbedUrl = venue.googleMapsEmbedUrl?.trim();
  const hasMap = Boolean(mapsUrl || mapEmbedUrl);
  const showMapEmbed = venue.showMapEmbed && Boolean(mapEmbedUrl);

  const getGoogleCalendarUrl = () => {
    const text = encodeURIComponent("Wedding Ceremony: Sravya & Karthik (Sumuhurtham)");
    const details = encodeURIComponent(
      `Join us for the sacred wedding ceremony.\\nMuhurtham: ${weddingDateTime.muhurthamTime}\\nVenue: ${venue.name}\\n${venue.address}`
    );
    const location = encodeURIComponent(`${venue.name}, ${venue.address}`);
    // Format YYYYMMDDTHHmmssZ
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=20261218T050800Z/20261218T090000Z&details=${details}&location=${location}`;
  };

  return (
    <section
      id="venue"
      className="relative py-24 px-4 sm:px-6 bg-[#FFF8E9] text-[#4A0B1A] overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="font-telugu text-lg text-[#8B1E2D] font-bold block mb-1">
          కళ్యాణ వేదిక & మార్గదర్శి
        </span>
        <h2 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#6D1429] tracking-wide">
          Wedding Venue & Directions
        </h2>
        <p className="font-serif-elegant italic text-lg sm:text-xl text-[#8B1E2D] mt-2 max-w-xl mx-auto">
          We eagerly look forward to welcoming you with folded hands and warm hearts.
        </p>
        <FloralDivider theme="maroon" />
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Venue Information Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`${hasMap ? "lg:col-span-6" : "lg:col-span-12"} relative bg-gradient-to-b from-[#6D1429] via-[#5A0F21] to-[#420A17] text-[#FFF8E9] rounded-2xl p-7 sm:p-9 border-2 border-[#C9A45C] shadow-2xl flex flex-col justify-between overflow-hidden`}
        >
          <CornerOrnament position="top-left" size={44} color="#E3C98A" />
          <CornerOrnament position="top-right" size={44} color="#E3C98A" />
          <CornerOrnament position="bottom-left" size={44} color="#E3C98A" />
          <CornerOrnament position="bottom-right" size={44} color="#E3C98A" />

          <div className="relative z-10">
            {/* Tag */}
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#E3C98A]/20 border border-[#E3C98A]/40 text-[#E3C98A] text-xs font-serif-royal font-semibold tracking-wider uppercase mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Sacred Kalyana Mandapam</span>
            </span>

            {/* Venue Names */}
            <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#FFF8E9] tracking-wide">
              {venue.name}
            </h3>
            {venue.teluguName?.trim() && (
              <span className="font-telugu text-base text-[#E3C98A] font-semibold block mt-1">
                {venue.teluguName}
              </span>
            )}

            {/* Address */}
            <div className="my-5 p-4 rounded-xl bg-[#2B050E]/60 border border-[#C9A45C]/30 text-sm space-y-2">
              <p className="font-medium text-[#FFF8E9] leading-relaxed">
                {venue.address}
              </p>
              <p className="text-[#E3C98A]">
                {venue.city}, {venue.state} — {venue.pincode}
              </p>
            </div>

            {/* Date & Muhurtham Reminder */}
            <div className="space-y-3 text-xs sm:text-sm text-[#FFF8E9]/90 border-t border-[#C9A45C]/30 pt-4">
              <div className="flex items-center space-x-2.5">
                <Calendar className="w-4 h-4 text-[#E3C98A]" />
                <span className="font-serif-royal font-semibold text-[#FFF8E9]">
                  {weddingDateTime.dateFormatted}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Navigation className="w-4 h-4 text-[#E3C98A]" />
                <span>
                  <strong>Sumuhurtham:</strong> {weddingDateTime.muhurthamTime} ({weddingDateTime.muhurthamTelugu})
                </span>
              </div>
              {venue.landmarks?.trim() && (
                <div className="flex items-start space-x-2.5">
                  <Compass className="w-4 h-4 text-[#E3C98A] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Landmark:</strong> {venue.landmarks}
                  </span>
                </div>
              )}
              {venue.parkingNotes?.trim() && (
                <div className="flex items-start space-x-2.5">
                  <Car className="w-4 h-4 text-[#E3C98A] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Parking:</strong> {venue.parkingNotes}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Direction & Calendar Buttons */}
          <div className="relative z-10 pt-6 mt-6 border-t border-[#C9A45C]/40 flex flex-wrap gap-3">
            {/* Get Directions Button */}
            {mapsUrl && <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-[#C9A45C] text-[#3B0713] font-serif-royal font-bold text-xs sm:text-sm tracking-wide uppercase hover:bg-[#E3C98A] transition-all duration-200 shadow-md cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>}

            {/* Google Calendar Link */}
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border border-[#E3C98A] text-[#E3C98A] font-serif-royal font-semibold text-xs sm:text-sm hover:bg-[#E3C98A]/20 transition-all duration-200 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Google Cal</span>
            </a>

          </div>
        </motion.div>

        {/* Embedded Interactive Map Card */}
        {hasMap && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 relative rounded-2xl overflow-hidden border-2 border-[#C9A45C] shadow-2xl bg-[#F5EBD8] min-h-[360px] flex flex-col"
        >
          {showMapEmbed ? (
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "360px", flexGrow: 1 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Venue Map"
              className="w-full h-full"
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#FFFDF8]">
              <MapPin className="w-12 h-12 text-[#8B1E2D] mb-3" />
              <h4 className="font-serif-royal text-lg font-bold text-[#6D1429]">
                {venue.name}
              </h4>
              <p className="text-sm text-[#4A0B1A]/80 mt-1 max-w-sm">
                {venue.address}
              </p>
              {mapsUrl && <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-5 py-2.5 rounded-full bg-[#8B1E2D] text-[#FFF8E9] text-xs font-serif-royal font-semibold uppercase tracking-wider hover:bg-[#6D1429] transition-colors"
              >
                Open in Google Maps
              </a>}
            </div>
          )}
        </motion.div>
        )}
      </div>
    </section>
  );
};
