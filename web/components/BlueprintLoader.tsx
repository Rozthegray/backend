"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_SRC = "/Ohiagwu-Logo.png_a01c1e54-removebg-preview.png";

export function BlueprintLoader() {
  const [phase, setPhase] = useState<"sketch" | "open" | "done">("sketch");

  useEffect(() => {
    const openTimer = setTimeout(() => setPhase("open"), 1100);
    const doneTimer = setTimeout(() => setPhase("done"), 1850);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          aria-label="Loading Elevator X"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[120] flex overflow-hidden pointer-events-none"
        >
          {/* Left Elevator Sketch Door */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: phase === "open" ? "-100%" : "0%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as const }}
            className="relative w-1/2 h-full bg-black border-r border-[#C94F16]/70"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* Right Elevator Sketch Door */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: phase === "open" ? "100%" : "0%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as const }}
            className="relative w-1/2 h-full bg-black border-l border-[#C94F16]/70"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* Center Architectural Elevator Sketch Frame + Brand Logo */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: phase === "open" ? 0 : 1,
              scale: phase === "open" ? 0.94 : 1,
            }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            <div className="relative w-52 h-64 sm:w-60 sm:h-72 flex items-center justify-center">
              {/* Architectural Pencil-Sketch Elevator Shaft & Cabin SVG */}
              <svg
                viewBox="0 0 220 260"
                className="absolute inset-0 w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Guide rails */}
                <motion.line
                  x1="28"
                  y1="10"
                  x2="28"
                  y2="250"
                  stroke="#525252"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7 }}
                />
                <motion.line
                  x1="192"
                  y1="10"
                  x2="192"
                  y2="250"
                  stroke="#525252"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7 }}
                />
                {/* Hoist cables */}
                <motion.line
                  x1="104"
                  y1="6"
                  x2="104"
                  y2="48"
                  stroke="#C94F16"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.line
                  x1="116"
                  y1="6"
                  x2="116"
                  y2="48"
                  stroke="#C94F16"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
                {/* Elevator Cabin Outer Frame */}
                <motion.rect
                  x="42"
                  y="48"
                  width="136"
                  height="168"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.85, ease: "easeInOut" }}
                />
                {/* Inner Door Split Line */}
                <motion.line
                  x1="110"
                  y1="56"
                  x2="110"
                  y2="208"
                  stroke="#C94F16"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                />
                {/* Corner drafting ticks */}
                <path
                  d="M36 48H42V42M178 42V48H184M36 216H42V222M178 222V216H184"
                  stroke="#C94F16"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Center Logo Inside Elevator Sketch */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 bg-black/85 border border-white/15 p-3 flex items-center justify-center shadow-2xl"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={LOGO_SRC}
                    alt="Ohiagwu International — Elevator X"
                    fill
                    sizes="112px"
                    priority
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>

            <div className="mt-4 text-center">
              <p className="font-mono text-[11px] font-bold tracking-[0.28em] uppercase text-white">
                OHIAGWU INTERNATIONAL
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F27D2C] mt-1">
                ELEVATOR X // ±0.5MM PRECISION
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}