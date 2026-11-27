"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  AlertTriangle,
  PhoneCall,
  MessageCircle,
} from "lucide-react";

const LOGO_SRC = "/unnamed-removebg-preview.png";

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
    <section className="relative w-full min-h-[100svh] lg:h-screen bg-black text-white flex flex-col justify-between overflow-hidden">
      {/* LAYER 4 (z-50): Fixed Top Dispatch Bar + Navbar with Logo */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-black text-neutral-300 border-b border-neutral-800 px-4 md:px-10 py-1 text-center font-mono text-[9px] sm:text-[10px] tracking-[0.16em] uppercase">
          24/7 SUPPORT ACTIVE{" "}
          <span className="text-[#C94F16] mx-1">//</span> INSTALLATION, AMC &amp;
          EMERGENCY REPAIR
        </div>

        <div className="bg-black/90 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
            <a href="#top" className="flex items-center shrink-0">
              <div className="relative h-12 w-36 sm:h-14 sm:w-44 md:h-16 md:w-52 shrink-0">
                <Image
                  src={LOGO_SRC}
                  alt="Ohiagwu International — Elevator X"
                  fill
                  sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
                  priority
                  className="object-contain object-left"
                />
              </div>
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
              <button
                type="button"
                onClick={onOpenVoice}
                className="hidden sm:inline-flex items-center gap-1.5 border border-[#C94F16] bg-[#C94F16]/15 hover:bg-[#C94F16] text-white px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <PhoneCall size={12} className="text-[#F27D2C]" />
                Call 24/7 Support
              </button>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 bg-white hover:bg-[#C94F16] text-black hover:text-white px-3 sm:px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors"
              >
                Get Your Quote <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Fixed Desktop Left Side Logo Rail (pairs with ShaftRailNav on the right) */}
      <aside
        aria-label="Ohiagwu Brand Rail"
        className="hidden xl:flex fixed left-3 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 py-3.5 px-2 bg-black/85 backdrop-blur-md border border-white/15"
      >
        <a
          href="#top"
          className="relative w-7 h-7 block"
          aria-label="Back to top"
        >
          <Image
            src={LOGO_SRC}
            alt="Elevator X Logo"
            fill
            sizes="28px"
            className="object-contain"
          />
        </a>
        <span className="w-[1px] h-8 bg-[#C94F16]" />
        <span className="font-mono text-[9px] tracking-[0.26em] uppercase text-neutral-400 [writing-mode:vertical-rl] rotate-180">
          ELEVATOR X
        </span>
      </aside>

      {/* LAYER 1 (z-0): Full-Bleed Background Image */}
      <img
        src="/shaft-hero.jpeg"
        alt="Ohiagwu International engineering crew installing elevator guide rails transitioning to a finished passenger lift"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center pointer-events-none select-none"
      />

      {/* LAYER 2 (z-10): Dark Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-black/[0.67] pointer-events-none"
      />

      {/* LAYER 3 (z-20): Left-Aligned Detail Box on Mobile / Full Hero on Desktop */}
      <div className="relative z-20 max-w-6xl mx-auto w-full px-5 md:px-10 pt-24 pb-8 md:pt-24 md:pb-6 flex-1 flex flex-col justify-center">
        <div className="w-full max-w-2xl text-left bg-black/0 backdrop-blur-sm border border-white/15 border-l-[3px] border-l-[#C94F16] p-4 shadow-xl md:bg-transparent md:backdrop-blur-none md:border-0 md:p-0 md:shadow-none">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F27D2C] mb-2 font-bold">
            OHIAGWU INTERNATIONAL // LAGOS &amp; NATIONWIDE
          </p>

          {/* Eliminated on mobile; full desktop headline preserved */}
          <h1 className="hidden md:block text-4xl lg:text-[42px] xl:text-5xl font-extrabold tracking-tight leading-[1.08] text-white uppercase">
            Elevators &amp; Escalators That Work. No Excuses.
          </h1>

          {/* Detailed Body Copy — Primary block on mobile, subtitle on desktop */}
          <p className="mt-1 md:mt-3 text-sm lg:text-[15px] text-neutral-100 md:text-neutral-200 max-w-xl leading-relaxed">
            Direct factory supply, millimeter-accurate installation, and 24/7
            support. No middlemen, no guesswork—just solid engineering built
            for Nigerian buildings.
          </p>
        </div>

        {/* Two Full CTA Boxes — Left-Aligned with Full Write-Ups on Mobile & Desktop */}
        <div className="mt-4 md:mt-7 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* CTA 01: Supply & Installation */}
          <div className="bg-white text-black p-4 lg:p-5 border-t-[3px] border-neutral-900 shadow-2xl flex flex-col justify-between text-left">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-[#C94F16]">
                01 // INSTALLATION &amp; SUPPLY
              </p>
              <h2 className="text-base lg:text-lg font-extrabold mt-1">
                Get Your Quote or Make Enquiries
              </h2>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                Passenger lifts, escalators, and travelators for new buildings,
                malls, hotels, and renovations.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 bg-black hover:bg-[#C94F16] text-white px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                Get Your Quote <ArrowUpRight size={14} />
              </a>
              <button
                type="button"
                onClick={onOpenVoice}
                className="inline-flex items-center gap-1.5 border border-neutral-300 hover:border-black text-black px-3.5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <PhoneCall size={13} /> Call Now
              </button>
              <a
                href={whatsappQuickUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-3.5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                <MessageCircle size={13} /> WhatsApp
              </a>
            </div>
          </div>

          {/* CTA 02: 24/7 Emergency & Maintenance */}
          <div className="bg-[#C94F16] text-white p-4 lg:p-5 border-t-[3px] border-white shadow-2xl flex flex-col justify-between text-left">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-white/90 flex items-center justify-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                02 // 24/7 EMERGENCY &amp; AMC
              </p>
              <h2 className="text-base lg:text-lg font-extrabold mt-1">
                Lift Fault or Monthly Servicing?
              </h2>
              <p className="text-xs text-white/90 mt-1.5 leading-relaxed">
                Fast breakdown repair with genuine parts and dependable monthly
                AMC maintenance.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
              <button
                type="button"
                onClick={onOpenVoice}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-black text-[#C94F16] hover:text-white px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <PhoneCall size={14} /> Call 24/7 Support
              </button>
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
            <span className="text-[#F27D2C] font-bold">24/7 STANDBY</span>
          </div>
        </div>
      </div>
    </section>
  );
}