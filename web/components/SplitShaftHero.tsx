"use client";

import React from "react";
import {
  ArrowUpRight,
  AlertTriangle,
  PhoneCall,
  MessageCircle,
} from "lucide-react";

const PHONE_NUMBER = (
  process.env.NEXT_PUBLIC_PHONE_NUMBER || "+2348000000000"
).trim();

const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2340000000000"
).replace(/\D/g, "");

interface SplitShaftHeroProps {
  onOpenEmergency: () => void;
  onOpenVoice: () => void;
}

export function SplitShaftHero({
  onOpenEmergency,
  onOpenVoice,
}: SplitShaftHeroProps) {
  const whatsappQuickUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Ohiagwu International, I would like to get a quote or make an enquiry."
  )}`;

  return (
    <section className="relative w-full min-h-[90vh] lg:h-[90vh] bg-black text-white flex flex-col justify-between overflow-hidden">
      {/* LAYER 4 (z-50): Fixed Top Dispatch Bar + Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-black text-neutral-300 border-b border-neutral-800 px-4 md:px-10 py-1 text-center font-mono text-[10px] tracking-[0.16em] uppercase">
          24/7 SUPPORT ACTIVE{" "}
          <span className="text-[#A61C1C] mx-1">//</span> INSTALLATION, AMC &amp;
          EMERGENCY REPAIR
        </div>

        <div className="bg-black/85 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-5 md:px-10 h-14 flex items-center justify-between">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-[#A61C1C] inline-block" />
              <span className="font-mono font-bold tracking-[0.18em] text-xs uppercase text-white">
                OHIAGWU{" "}
                <span className="text-neutral-400 font-normal">
                  // ELEVATOR X
                </span>
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-300">
              <a href="#systems" className="hover:text-white transition-colors">
                Our Lifts
              </a>
              <a href="#rigor" className="hover:text-white transition-colors">
                How We Install
              </a>
              <a
                href="#services"
                className="hover:text-white transition-colors"
              >
                AMC &amp; Repair
              </a>
              <a href="#bridge" className="hover:text-white transition-colors">
                Direct Supply
              </a>
              <a
                href="#floor-56"
                className="hover:text-white transition-colors"
              >
                Founder
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="hidden sm:inline-flex items-center gap-1.5 border border-[#A61C1C] bg-[#A61C1C]/15 hover:bg-[#A61C1C] text-white px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors"
              >
                <PhoneCall size={12} className="text-[#E63939]" />
                Call 24/7 Support
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 bg-white hover:bg-[#A61C1C] text-black hover:text-white px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors"
              >
                Get Your Quote <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* LAYER 1 (z-0): Full-Bleed Background Image */}
      <img
        src="/shaft-hero.jpeg"
        alt="Ohiagwu International engineering crew installing elevator guide rails transitioning to a finished passenger lift"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center pointer-events-none select-none"
      />

      {/* LAYER 2 (z-10): Dark Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-black/[0.797] pointer-events-none"
      />

      {/* LAYER 3 (z-20): Hero Write-Up + Compact Dual CTA Boxes */}
      <div className="relative z-20 max-w-6xl mx-auto w-full px-5 md:px-10 pt-24 pb-6 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#E63939] mb-2 font-bold">
            OHIAGWU INTERNATIONAL // LAGOS &amp; NATIONWIDE
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-5xl font-extrabold tracking-tight leading-[1.08] text-white uppercase">
            Elevators &amp; Escalators That Work. No Excuses.
          </h1>
          <p className="mt-3 text-xs sm:text-sm lg:text-[15px] text-neutral-200 max-w-xl leading-relaxed">
            Direct factory supply, millimeter-accurate installation, and 24/7
            support. No middlemen, no guesswork—just solid engineering built
            for Nigerian buildings.
          </p>
        </div>

        {/* Two Compact CTA Blocks */}
        <div className="mt-6 lg:mt-7 grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-4xl">
          {/* CTA 01: Supply & Installation */}
          <div className="bg-white text-black p-4 lg:p-5 border-t-[3px] border-neutral-900 shadow-2xl flex flex-col justify-between">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-[#A61C1C]">
                01 // INSTALLATION &amp; SUPPLY
              </p>
              <h2 className="text-base lg:text-lg font-extrabold mt-1">
                Get Your Quote or Make Enquiries
              </h2>
              <p className="text-xs text-neutral-600 mt-1 leading-snug">
                Passenger lifts, escalators, and travelators for new buildings,
                malls, hotels, and renovations.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 bg-black hover:bg-[#A61C1C] text-white px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                Get Your Quote <ArrowUpRight size={14} />
              </a>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-1.5 border border-neutral-300 hover:border-black text-black px-3.5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                <PhoneCall size={13} /> Call Now
              </a>
              <a
                href={whatsappQuickUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-3.5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                <MessageCircle size={13} /> WhatsApp
              </a>
              <button
                type="button"
                onClick={onOpenVoice}
                className="inline-flex items-center gap-1.5 border border-neutral-300 hover:border-black text-black px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Voice Desk
              </button>
            </div>
          </div>

          {/* CTA 02: 24/7 Emergency & Maintenance */}
          <div className="bg-[#A61C1C] text-white p-4 lg:p-5 border-t-[3px] border-white shadow-2xl flex flex-col justify-between">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-white/90 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                02 // 24/7 EMERGENCY &amp; AMC
              </p>
              <h2 className="text-base lg:text-lg font-extrabold mt-1">
                Lift Fault or Monthly Servicing?
              </h2>
              <p className="text-xs text-white/90 mt-1 leading-snug">
                Fast breakdown repair with genuine parts and dependable monthly
                AMC maintenance.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-black text-[#A61C1C] hover:text-white px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                <PhoneCall size={14} /> Call 24/7 Support
              </a>
              <button
                type="button"
                onClick={onOpenEmergency}
                className="inline-flex items-center gap-1.5 border border-white/50 hover:border-white text-white px-3.5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <AlertTriangle size={13} /> Make Enquiries
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Proof Strip */}
      <div className="relative z-20 w-full bg-black/90 border-t border-neutral-800 py-2.5 px-5 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400">
          <div>
            COVERAGE: <span className="text-white">LAGOS &amp; NATIONWIDE</span>
          </div>
          <div>
            EXPERIENCE: <span className="text-white">20+ YEARS ON SITE</span>
          </div>
          <div>
            ALIGNMENT: <span className="text-white">±0.5MM LASER PLUMB</span>
          </div>
          <div>
            SUPPORT:{" "}
            <span className="text-[#E63939] font-bold">24/7 STANDBY</span>
          </div>
        </div>
      </div>
    </section>
  );
}