"use client";

import React, { useEffect, useState } from "react";

const FLOORS = [
  { id: "top", code: "01", label: "HOME" },
  { id: "systems", code: "02", label: "WHAT WE DO" },
  { id: "rigor", code: "03", label: "THE PROCESS" },
  { id: "services", code: "04", label: "AMC & REPAIR" },
  { id: "bridge", code: "05", label: "DIRECT SUPPLY" },
  { id: "floor-56", code: "56", label: "FOUNDER" },
];

export function ShaftRailNav() {
  const [activeId, setActiveId] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -35% 0px" }
    );

    FLOORS.forEach((floor) => {
      const el = document.getElementById(floor.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label="Floor navigation"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3.5"
    >
      <div className="w-[1px] h-10 bg-neutral-300 mr-1.5" />
      {FLOORS.map((f) => {
        const active = activeId === f.id;
        return (
          <a
            key={f.id}
            href={`#${f.id}`}
            className="group flex items-center gap-2.5 font-mono text-[10px] tracking-[0.16em]"
          >
            <span
              className={`transition-all px-2.5 py-1 shadow-sm ${
                active
                  ? "bg-[#A61C1C] text-white font-bold"
                  : "bg-white text-neutral-700 border border-neutral-200 opacity-0 group-hover:opacity-100"
              }`}
            >
              {f.code} // {f.label}
            </span>
            <span
              className={`w-3 h-3 border transition-all ${
                active
                  ? "bg-[#A61C1C] border-[#A61C1C] scale-110"
                  : "bg-white border-neutral-400 group-hover:border-[#A61C1C]"
              }`}
            />
          </a>
        );
      })}
      <div className="w-[1px] h-10 bg-neutral-300 mr-1.5" />
    </aside>
  );
}