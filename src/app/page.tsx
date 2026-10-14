"use client";

import React, { useRef, useState } from "react";
import { InvitationCover } from "@/components/invitation/InvitationCover";
import { Navbar } from "@/components/navigation/Navbar";
import { WeddingHero } from "@/components/invitation/WeddingHero";
import { CoupleSection } from "@/components/invitation/CoupleSection";
import { CountdownSection } from "@/components/invitation/CountdownSection";
import { EventsTimeline } from "@/components/invitation/EventsTimeline";
import { PhotoGallery } from "@/components/invitation/PhotoGallery";
import { VenueSection } from "@/components/invitation/VenueSection";
import { RSVPSection } from "@/components/invitation/RSVPSection";
import { WeddingFooter } from "@/components/invitation/WeddingFooter";
import { MusicPlayer, type MusicPlayerHandle } from "@/components/invitation/MusicPlayer";
import { PetalShower } from "@/components/traditional/PetalShower";

export default function WeddingPage() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
  };

  const handleStartMusic = () => musicPlayerRef.current?.play();

  return (
    <main className="relative min-h-screen bg-[#FFF8E9] overflow-x-hidden">
      {/* Tap-to-Open Fullscreen Royal Invitation Card */}
      <InvitationCover
        isOpen={isInvitationOpen}
        onOpen={handleOpenInvitation}
        onStartMusic={handleStartMusic}
      />

      {/* Floating flower petal atmosphere */}
      <PetalShower active={isInvitationOpen} count={16} />

      {/* Navigation Bar */}
      {isInvitationOpen && <Navbar />}

      {/* Main Wedding Sections */}
      <WeddingHero />
      <CoupleSection />
      <CountdownSection />
      <EventsTimeline />
      <PhotoGallery />
      <VenueSection />
      <RSVPSection />
      <WeddingFooter />

      {/* Traditional Nadaswaram Music Player */}
      <MusicPlayer ref={musicPlayerRef} />
    </main>
  );
}
