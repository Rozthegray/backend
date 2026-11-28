"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  AlertTriangle,
  PhoneCall,
  MessageCircle,
  Siren,
} from "lucide-react";

const LOGO_SRC = "/unnamed-removebg-preview.png";

const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2340000000000"
).replace(/\D/g, "");

const MARQUEE_BRAND = "OHIAGWU INTERNATIONAL // LAGOS & NATIONWIDE";
const MARQUEE_COPY =
  "24/7 Support Active — Direct factory supply, millimeter-accurate installation & emergency repair for Nigerian buildings.";

interface SplitShaftHeroProps {
  onOpenEmergency: () => void;
  onOpenVoice: () => void;
}

export function SplitShaftHero({
  onOpenEmergency,
  onOpenVoice,
}: SplitShaftHeroProps) {
  const [activeTab, setActiveTab] = useState<"emergency" | "install">(
    "emergency"
  );

  const whatsappQuickUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Ohiagwu International, I would like to get a quote or make an enquiry."
  )}`;

  const renderMarqueeItem = (hidden = false) => (
    <span
      aria-hidden={hidden || undefined}
      className="flex items-center gap-3 pr-10 text-[11px] sm:text-xs whitespace-nowrap"
    >
      <span className="font-mono font-bold uppercase tracking-[0.18em] text-[#F27D2C]">
        {MARQUEE_BRAND}
      </span>
      <span className="text-white/35 font-mono">•</span>
      <span className="font-medium text-neutral-100">{MARQUEE_COPY}</span>
      <span className="text-[#C94F16] font-mono font-bold">///</span>
    </span>
  );

  return (
    <section className="relative w-full min-h-[100svh] bg-black text-white flex flex-col justify-between overflow-hidden pt-16 md:pt-20">
      {/* LAYER 4 (z-50): Single Clean Fixed Navbar (No Extra Stacked Top Strip) */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-10 h-full flex items-center justify-between">
          <a href="#top" className="flex items-center shrink-0">
            <div className="relative h-11 w-32 sm:h-12 sm:w-40 md:h-16 md:w-52 shrink-0">
              <Image
                src={LOGO_SRC}
                alt="Ohiagwu International — Elevator X"
                fill
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 208px"
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
            <a href="#services" className="hover:text-white transition-colors">
              AMC &amp; Repair
            </a>
            <a href="#bridge" className="hover:text-white transition-colors">
              Direct Supply
            </a>
            <a href="#floor-56" className="hover:text-white transition-colors">
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
              className="inline-flex items-center gap-1 bg-white hover:bg-[#C94F16] text-black hover:text-white px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors"
            >
              Get Quote <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </header>

      {/* Fixed Desktop Left Side Logo Rail */}
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
        className="absolute inset-0 z-0 w-full h-full object-cover object-top md:object-center pointer-events-none select-none"
      />

      {/* LAYER 2 (z-10): Directional Gradient (Lets Top Photo Breathe, Anchors Bottom Cards) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/45 via-black/55 to-black/90 pointer-events-none"
      />

      {/* FIRST CONTENT: Flush Marquee Directly Below Navbar (0.71 Opacity) */}
      <div className="relative z-20 w-full overflow-hidden bg-black/[0.71] backdrop-blur-sm border-b border-white/15 py-2">
        <motion.div
          className="flex w-max whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 24, repeat: Infinity }}
        >
          {renderMarqueeItem(false)}
          {renderMarqueeItem(true)}
        </motion.div>
      </div>

      {/* LAYER 3 (z-20): Breathing Space + Clear Headline + Clean Action System */}
      <div className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-12 pb-6 flex-1 flex flex-col justify-end md:justify-center">
        {/* Headline Visible on Mobile AND Desktop */}
        <div className="max-w-2xl text-left mb-5 md:mb-7">
          <h1 className="text-[26px] sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.06] text-white uppercase drop-shadow-md">
            Elevators &amp; Escalators That Work.{" "}
            <span className="text-[#F27D2C]">No Excuses.</span>
          </h1>
        </div>

        {/* MOBILE ONLY: Sleek 2-Tab Intent Switcher (Zero Clutter) */}
        <div className="grid grid-cols-2 md:hidden mb-2.5 bg-black/75 backdrop-blur-md p-1 border border-white/15">
          <button
            type="button"
            onClick={() => setActiveTab("emergency")}
            className={`py-2.5 px-2 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "emergency"
                ? "bg-white text-black shadow"
                : "text-neutral-300 hover:text-white"
            }`}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
            </span>
            <span>🚨 Fault / AMC</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("install")}
            className={`py-2.5 px-2 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "install"
                ? "bg-[#C94F16] text-white shadow"
                : "text-neutral-300 hover:text-white"
            }`}
          >
            <span>02 // Install &amp; Quote</span>
          </button>
        </div>

        {/* CARDS: 1 Focused Card at a Time on Mobile | Equal-Size Side-by-Side on Desktop */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr gap-3.5">
          {/* BOX 01 (White): Emergency, Fault & Maintenance — Red Alarm Only */}
          <div
            className={`${
              activeTab === "emergency" ? "flex" : "hidden md:flex"
            } h-full bg-white text-black p-4 sm:p-5 border-t-[3px] border-black shadow-2xl flex-col justify-between text-left`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.16em] uppercase text-neutral-600 flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-80" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
                  </span>
                  <span role="img" aria-label="Emergency alarm">
                    🚨
                  </span>
                  <span>01 // QUICK RESPONSE • 24/7</span>
                </p>

                <Siren
                  size={16}
                  className="text-red-600 animate-pulse shrink-0"
                />
              </div>

              <h2 className="text-base sm:text-lg font-extrabold mt-2 text-black uppercase tracking-tight">
                Emergency, Fault &amp; Maintenance
              </h2>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                Immediate rapid response for stuck lifts, drive faults, urgent
                breakdown repairs with genuine parts, and reliable monthly AMC
                servicing.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onOpenVoice}
                className="inline-flex items-center gap-1.5 bg-black hover:bg-[#C94F16] text-white px-4 py-2.5 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <PhoneCall size={13} /> Quick Emergency Call
              </button>
              <button
                type="button"
                onClick={onOpenEmergency}
                className="inline-flex items-center gap-1.5 border border-neutral-300 hover:border-black text-black px-3.5 py-2.5 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <AlertTriangle size={13} /> Report Fault
              </button>
            </div>
          </div>

          {/* BOX 02 (Orange): Installation & Supply */}
          <div
            className={`${
              activeTab === "install" ? "flex" : "hidden md:flex"
            } h-full bg-[#C94F16] text-white p-4 sm:p-5 border-t-[3px] border-white shadow-2xl flex-col justify-between text-left`}
          >
            <div>
              <p className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.16em] uppercase text-white/90">
                02 // INSTALLATION &amp; SUPPLY
              </p>
              <h2 className="text-base sm:text-lg font-extrabold mt-2 text-white uppercase tracking-tight">
                Get Your Quote or Make Enquiries
              </h2>
              <p className="text-xs text-white/90 mt-1.5 leading-relaxed">
                Passenger lifts, escalators, and travelators for new buildings,
                malls, hotels, and renovations.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 bg-white hover:bg-black text-black hover:text-white px-4 py-2.5 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                Get Your Quote <ArrowUpRight size={13} />
              </a>
              <button
                type="button"
                onClick={onOpenVoice}
                className="hidden sm:inline-flex items-center gap-1.5 border border-white/50 hover:bg-white hover:text-black text-white px-3.5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <PhoneCall size={13} /> Call Now
              </button>
              <a
                href={whatsappQuickUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-black/25 hover:bg-black border border-white/25 text-white px-3.5 py-2.5 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                <MessageCircle size={13} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Proof Strip — Extra Bottom Padding on Mobile So Sticky Bar Never Covers It */}
      <div className="relative z-20 w-full bg-black/95 border-t border-neutral-800 pt-2.5 pb-16 md:pb-2.5 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-1.5 font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase text-neutral-400">
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
