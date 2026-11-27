"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BlueprintLoaderProps {
  onComplete?: () => void;
}

export function BlueprintLoader({ onComplete }: BlueprintLoaderProps) {
  const [stage, setStage] = useState<"sketch" | "ascend" | "part" | "done">("sketch");
  const [year, setYear] = useState(2001);
  const [floor, setFloor] = useState("B2");

  useEffect(() => {
    // Stage 1 -> 2: Start ascent
    const t1 = setTimeout(() => setStage("ascend"), 750);

    // Tick year (2001 -> 2026) and floor indicator
    const floors = ["B2", "G", "08", "18", "32", "56"];
    const interval = setInterval(() => {
      setYear((prev) => {
        const next = prev + 1;
        if (next >= 2026) {
          clearInterval(interval);
          return 2026;
        }
        const idx = Math.min(
          floors.length - 1,
          Math.floor(((next - 2001) / 25) * floors.length)
        );
        setFloor(floors[idx]);
        return next;
      });
    }, 55);

    // Stage 3: Snap vectors & part elevator doors
    const t2 = setTimeout(() => {
      setFloor("56");
      setYear(2026);
      setStage("part");
    }, 2150);

    // Unmount
    const t3 = setTimeout(() => {
      setStage("done");
      onComplete?.();
    }, 2950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, [onComplete]);

  if (stage === "done") return null;

  const isSharp = stage === "part";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] pointer-events-none flex overflow-hidden">
        {/* Left Center-Opening Steel Door */}
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: stage === "part" ? "-100%" : "0%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="w-1/2 h-full bg-black border-r border-neutral-800 relative overflow-hidden"
        >
          {/* Subtle 4% Uli/Isi-Agu geometric blueprint grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 28px), repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 1px, transparent 28px)",
            }}
          />
        </motion.div>

        {/* Right Center-Opening Steel Door */}
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: stage === "part" ? "100%" : "0%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="w-1/2 h-full bg-black border-l border-neutral-800 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 28px), repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 1px, transparent 28px)",
            }}
          />
        </motion.div>

        {/* Center Pencil-Sketch Shaft SVG */}
        <motion.div
          animate={{ opacity: stage === "part" ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
        >
          <div className="flex items-center gap-6">
            <svg
              width="120"
              height="240"
              viewBox="0 0 120 240"
              fill="none"
              className="overflow-visible"
            >
              <defs>
                <filter id="pencil-grain" x="-10%" y="-10%" width="120%" height="120%">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.04"
                    numOctaves="3"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale={isSharp ? "0" : "2.2"}
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>

              <g filter="url(#pencil-grain)">
                {/* Left & Right Guide Rails */}
                <motion.line
                  x1="28"
                  y1="10"
                  x2="28"
                  y2="230"
                  stroke="#E5E2DC"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                />
                <motion.line
                  x1="92"
                  y1="10"
                  x2="92"
                  y2="230"
                  stroke="#E5E2DC"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                />

                {/* Hoistway Tension Cables */}
                <motion.line
                  x1="54"
                  y1="10"
                  x2="54"
                  y2={stage === "ascend" || isSharp ? "42" : "152"}
                  stroke="#8A8F98"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                  transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.line
                  x1="66"
                  y1="10"
                  x2="66"
                  y2={stage === "ascend" || isSharp ? "42" : "152"}
                  stroke="#8A8F98"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                  transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Moving Sketched Elevator Car */}
                <motion.g
                  initial={{ y: 150 }}
                  animate={{ y: stage === "ascend" || isSharp ? 40 : 150 }}
                  transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.rect
                    x="36"
                    y="0"
                    width="48"
                    height="64"
                    stroke="#F4F2EE"
                    strokeWidth="1.8"
                    fill="#000000"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                  />
                  {/* Center Door Seam */}
                  <line x1="60" y1="0" x2="60" y2="64" stroke="#8A8F98" strokeWidth="1" />
                  {/* Diagonal Drafting Cross-hatch */}
                  <line x1="36" y1="0" x2="84" y2="64" stroke="#333" strokeWidth="0.75" />
                </motion.g>

                {/* Crimson Arrival Beacon */}
                <motion.circle
                  cx="60"
                  cy="16"
                  r="4"
                  fill="#A61C1C"
                  initial={{ opacity: 0.25, scale: 0.8 }}
                  animate={{
                    opacity: stage === "ascend" ? [0.4, 1, 0.4] : 1,
                    scale: isSharp ? 1.5 : 1,
                  }}
                  transition={{ duration: 0.5, repeat: stage === "ascend" ? Infinity : 0 }}
                />
              </g>
            </svg>

            {/* Monospace Telemetry Counter */}
            <div className="font-mono text-left space-y-2 border-l border-neutral-800 pl-5">
              <p className="text-[10px] tracking-[0.25em] text-[#8A8F98] uppercase">
                OHIAGWU INT&apos;L
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#F4F2EE] tabular-nums">
                  {floor}
                </span>
                <span className="text-xs text-[#A61C1C] font-bold">▲</span>
              </div>
              <p className="text-xs text-[#8A8F98] tabular-nums">
                EST. {year} // ±0.5MM
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}