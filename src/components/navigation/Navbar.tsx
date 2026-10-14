"use client";

import React, { useState, useEffect, useMemo } from "react";
import { weddingConfig } from "@/data/wedding-data";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = useMemo(
    () => [
      { id: "hero", label: "Home", telugu: "ముకురం" },
      { id: "couple", label: "Our Story", telugu: "వధూవరులు" },
      { id: "countdown", label: "Countdown", telugu: "శుభవేళ" },
      { id: "events", label: "Events", telugu: "వేడుకలు" },
      { id: "gallery", label: "Gallery", telugu: "చిత్రమాలిక" },
      { id: "venue", label: "Venue", telugu: "వేదిక" },
      ...(weddingConfig.rsvp.enabled ? [{ id: "rsvp", label: "RSVP", telugu: "ఆహ్వానం" }] : []),
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Detect active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none ${
        isScrolled
          ? "bg-[#FFF8E9]/95 backdrop-blur-md shadow-md border-b border-[#C9A45C]/40 py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo / Couple Monogram */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center space-x-2 text-left cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full border border-[#C9A45C] bg-[#6D1429] text-[#E3C98A] flex items-center justify-center font-serif-royal font-bold text-xs shadow-sm">
            S&K
          </div>
          <div>
            <span className="font-serif-royal text-sm sm:text-base font-bold text-[#6D1429] tracking-wider block">
              Sravya & Karthik
            </span>
            <span className="font-telugu text-[10px] text-[#8B1E2D] block -mt-0.5">
              కల్యాణ వైభోగమే
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-serif-royal font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#6D1429] text-[#FFF8E9] shadow-sm"
                    : "text-[#6D1429] hover:text-[#8B1E2D] hover:bg-[#F5EBD8]/70"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-full border border-[#C9A45C] bg-[#FFF8E9] text-[#6D1429] flex items-center justify-center shadow-sm cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF8E9] border-b-2 border-[#C9A45C] px-5 py-4 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`py-2.5 px-4 rounded-xl text-left font-serif-royal text-sm font-semibold flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-[#6D1429] text-[#FFF8E9]"
                      : "text-[#6D1429] hover:bg-[#F5EBD8]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-telugu opacity-80">{item.telugu}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
