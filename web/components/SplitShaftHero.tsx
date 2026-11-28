"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  AlertTriangle,
  PhoneCall,
  Siren,
} from "lucide-react";

const LOGO_SRC = "/unnamed-removebg-preview.png";

const MARQUEE_BRAND = "OHIAGWU INTERNATIONAL";
const MARQUEE_COPY =
  "Direct factory supply • Millimeter-accurate installation • 24/7 emergency & AMC support";

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

  const renderMarqueeItem = (hidden = false) => (
    <span
      aria-hidden={hidden || undefined}
      className="flex items-center gap-3 pr-10 text-[11px] sm:text-xs whitespace-nowrap"
    >
      <span className="font-mono font-bold uppercase tracking-[0.18em] text-[#F27D2C]">
        {MARQUEE_BRAND}
      </span>
      <span className="text-white/30 font-mono">—</span>
      <span className="font-normal text-neutral-200">{MARQUEE_COPY}</span>
      <span className="text-[#C94F16] font-mono">///</span>
    </span>
  );

  return (
    <section className="relative w-full min-h-[100svh] bg-black text-white flex flex-col justify-between overflow-hidden pt-16 md:pt-20">
      {/* Clean Single Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-full flex items-center justify-between">
          <a href="#top" className="flex items-center shrink-0">
            <div className="relative h-10 w-32 sm:h-12 sm:w-40 md:h-14 md:w-44 shrink-0">
              <Image
                src={LOGO_SRC}
                alt="Ohiagwu International — Elevator X"
                fill
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 176px"
                priority
                className="object-contain object-left"
              />
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-neutral-300">
            <a href="#systems" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#showcase" className="hover:text-white transition-colors">
              Our Lifts
            </a>
            <a href="#rigor" className="hover:text-white transition-colors">
              Installation
            </a>
            <a href="#floor-56" className="hover:text-white transition-colors">
              Founder
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenVoice}
              className="hidden sm:inline-flex items-center gap-1.5 text-neutral-200 hover:text-white px-3 py-2 text-xs font-medium transition-colors cursor-pointer"
            >
              <PhoneCall size={13} className="text-[#F27D2C]" />
              24/7 Support
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 bg-[#C94F16] hover:bg-white text-white hover:text-black px-4 py-2 text-xs font-semibold transition-colors"
            >
              Get a quote <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* Background Image */}
      <img
        src="/shaft-hero.jpeg"
        alt="Engineering crew installing elevator guide rails"
        className="absolute inset-0 z-0 w-full h-full object-cover object-top md:object-center pointer-events-none select-none"
      />

      {/* Dark Overlay (0.6 opacity) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-black/60 pointer-events-none"
      />

      {/* Flush Marquee Directly Below Navbar (0.71 Opacity) */}
      <div className="relative z-20 w-full overflow-hidden bg-black/[0.71] backdrop-blur-sm border-b border-white/10 py-2">
        <motion.div
          className="flex w-max whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 24, repeat: Infinity }}
        >
          {renderMarqueeItem(false)}
          {renderMarqueeItem(true)}
        </motion.div>
      </div>

      {/* Main Hero Area */}
      <div className="relative z-20 max-w-6xl mx-auto w-full px-5 md:px-10 pt-16 sm:pt-20 md:pt-12 pb-8 flex-1 flex flex-col justify-end md:justify-center">
        <div className="max-w-2xl text-left mb-6 md:mb-8">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-[-0.025em] leading-[1.08] text-white">
            Elevators &amp; Escalators Built to Work.{" "}
            <span className="text-[#F27D2C]">No Excuses.</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-200 max-w-lg leading-relaxed font-normal">
            Factory-direct supply, precision installation, and 24/7 maintenance
            backed by in-house engineers.
          </p>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="grid grid-cols-2 md:hidden mb-2.5 bg-black/75 backdrop-blur-md p-1 border border-white/15">
          <button
            type="button"
            onClick={() => setActiveTab("emergency")}
            className={`py-2.5 px-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "emergency"
                ? "bg-white text-black"
                : "text-neutral-300"
            }`}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
            </span>
            <span>🚨 Fault &amp; AMC</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("install")}
            className={`py-2.5 px-2 text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
              activeTab === "install"
                ? "bg-[#C94F16] text-white"
                : "text-neutral-300"
            }`}
          >
            Install &amp; Quote
          </button>
        </div>

        {/* Two Equal-Size Cards (Tabbed on Mobile, Side-by-Side on Desktop) */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr gap-4">
          {/* BOX 01 (White): Red Alarm Only */}
          <div
            className={`${
              activeTab === "emergency" ? "flex" : "hidden md:flex"
            } h-full bg-white text-neutral-950 p-5 sm:p-6 shadow-2xl flex-col justify-between text-left`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-neutral-500 flex items-center gap-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-80" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                  </span>
                  <span role="img" aria-label="Emergency alarm">
                    🚨
                  </span>
                  <span>24/7 Quick Response</span>
                </p>

                <Siren
                  size={16}
                  className="text-red-600 animate-pulse shrink-0"
                />
              </div>

              <h2 className="font-heading font-bold text-lg sm:text-xl mt-2.5 text-neutral-950 tracking-tight">
                Emergency, Fault &amp; Maintenance
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 leading-relaxed">
                Immediate rapid response for stuck lifts, drive faults, urgent
                breakdown repairs with genuine parts, and reliable monthly AMC
                servicing.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={onOpenVoice}
                className="inline-flex items-center gap-1.5 bg-neutral-950 hover:bg-[#C94F16] text-white px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer"
              >
                <PhoneCall size={13} /> Call Dispatch
              </button>
              <button
                type="button"
                onClick={onOpenEmergency}
                className="inline-flex items-center gap-1.5 border border-neutral-300 hover:border-neutral-950 text-neutral-900 px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer"
              >
                <AlertTriangle size={13} /> Report Fault
              </button>
            </div>
          </div>

          {/* BOX 02 (Orange): Installation & Supply */}
          <div
            className={`${
              activeTab === "install" ? "flex" : "hidden md:flex"
            } h-full bg-[#C94F16] text-white p-5 sm:p-6 shadow-2xl flex-col justify-between text-left`}
          >
            <div>
              <p className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-white/80">
                Installation &amp; Supply
              </p>
              <h2 className="font-heading font-bold text-lg sm:text-xl mt-2.5 text-white tracking-tight">
                New Lifts &amp; Project Quotes
              </h2>
              <p className="text-xs sm:text-sm text-white/90 mt-1.5 leading-relaxed">
                Passenger lifts, escalators, and travelators for new buildings,
                malls, hotels, and renovations—supplied direct from factory.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 bg-white hover:bg-neutral-950 text-neutral-950 hover:text-white px-4 py-2.5 text-xs font-semibold transition-colors"
              >
                Get a Quote <ArrowUpRight size={14} />
              </a>
              <button
                type="button"
                onClick={onOpenVoice}
                className="inline-flex items-center gap-1.5 border border-white/45 hover:bg-white hover:text-neutral-950 text-white px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer"
              >
                <PhoneCall size={13} /> Speak to Engineer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Bottom Proof Strip (Cleared Above Sticky Mobile Bar) */}
      <div className="relative z-20 w-full bg-black/90 border-t border-white/10 pt-3 pb-16 md:pb-3 px-5 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-1.5 gap-x-4 font-mono text-[10px] tracking-[0.14em] uppercase text-neutral-400">
          <div>
            EXPERIENCE: <span className="text-white">20+ YEARS</span>
          </div>
          <div>
            ALIGNMENT: <span className="text-white">±0.5MM LASER</span>
          </div>
          <div>
            SUPPLY: <span className="text-white">FACTORY DIRECT</span>
          </div>
          <div>
            DISPATCH: <span className="text-[#F27D2C]">24/7 ACTIVE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
