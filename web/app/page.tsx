"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  PhoneCall,
  ArrowUpRight,
  X,
  Mail,
  MessageCircle,
  Plus,
  Minus,
} from "lucide-react";
import {
  VoiceAgentModal,
  type PrefetchedVoiceToken,
} from "@/components/VoiceAgentModal";
import { BlueprintLoader } from "@/components/BlueprintLoader";
import { SplitShaftHero } from "@/components/SplitShaftHero";
import { ShaftRailNav } from "@/components/ShaftRailNav";

const PHONE_NUMBER = (
  process.env.NEXT_PUBLIC_PHONE_NUMBER || "+2348000000000"
).trim();

const CONTACT_EMAIL = (
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "enquiries@ohiagwuintl.com"
).trim();

const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2340000000000"
).replace(/\D/g, "");

const CORE_SERVICES = [
  {
    code: "01",
    title: "Passenger Lifts",
    specs: "630–1600KG • MRL & Traction",
    desc: "Quiet, balanced elevators built for daily residential, office, and hotel traffic.",
    icon: "/icons/lift.png",
  },
  {
    code: "02",
    title: "Commercial Escalators",
    specs: "30° / 35° • VVVF Energy Drive",
    desc: "Heavy-duty steel trusses engineered for malls, plazas, and high-footfall hubs.",
    icon: "/icons/escalator.png",
  },
  {
    code: "03",
    title: "Moving Walkways",
    specs: "0°–12° • Anti-Slip Pallets",
    desc: "Trolley-ready horizontal and inclined walkways for retail centers and terminals.",
    icon: "/icons/travelator.png",
  },
  {
    code: "04",
    title: "Turnkey Installation",
    specs: "±0.5mm Laser Alignment",
    desc: "In-house engineers handle shaft survey, rail plumbing, wiring, and load certification.",
    icon: "/icons/installation.png",
  },
  {
    code: "05",
    title: "Monthly AMC Servicing",
    specs: "Preventive Inspections",
    desc: "Scheduled checks on motors, cables, brakes, and sensors to prevent unplanned stops.",
    icon: "/icons/amc.png",
  },
  {
    code: "06",
    title: "24/7 Emergency Repair",
    specs: "Genuine OEM Spare Parts",
    desc: "Rapid diagnostics and standby technicians ready whenever a lift faults.",
    icon: "/icons/emergency.png",
  },
];

const SYSTEMS_SHOWCASE = [
  {
    id: "passenger-lifts",
    code: "SYS-01",
    title: "Mid & Low-Rise Passenger Lifts",
    specs: "630–1600KG • 1.0–2.5 M/S",
    desc: "Silent cabins tailored for apartments, corporate offices, hospitals, and hotels.",
    installImg: "/guide-rail.jpg",
    finishedImg: "/guide-open.jpg",
  },
  {
    id: "commercial-escalators",
    code: "SYS-02",
    title: "Commercial Escalators",
    specs: "30° / 35° • 800–1000MM STEP",
    desc: "Continuous-duty escalators with full safety sensors and reinforced steel trusses.",
    installImg: "/shaft-survey.jpg",
    finishedImg: "/open-survey.jpg",
  },
  {
    id: "moving-walkways",
    code: "SYS-03",
    title: "Moving Walkways & Travelators",
    specs: "0°–12° • ANTI-SLIP PALLETS",
    desc: "Steady, trolley-friendly walkways built for supermarkets and transit hubs.",
    installImg: "/shaft-pov.webp",
    finishedImg: "/pov-open.webp",
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Ibeh Charles",
    role: "Facility Manager",
    text: "Delivered cleanly from shaft inspection to handover. Zero vibration and technicians always show up on schedule.",
  },
  {
    id: 2,
    name: "Arch. Sarah K.",
    role: "Principal Architect",
    text: "Shaft measurements and cabin finishing matched our drawings to the millimeter. Silent ride and tidy site work.",
  },
  {
    id: 3,
    name: "Chinedu E.",
    role: "Operations Director",
    text: "A stalled lift is never an option in our facility. Their monthly AMC checks keep uptime consistent without surprises.",
  },
  {
    id: 4,
    name: "Folake A.",
    role: "Property Developer",
    text: "You can tell the leadership knows the mechanics, not just sales. Straightforward pricing and solid installation.",
  },
];

interface InquiryFormState {
  name: string;
  company: string;
  email: string;
  phoneOrWhatsapp: string;
  location: string;
  elevatorType: string;
  projectStage: string;
  quantity: string;
  floorsAndStops: string;
  load: string;
  speed: string;
  powerStandard: string;
  targetDelivery: string;
  requirements: string;
}

const INITIAL_INQUIRY: InquiryFormState = {
  name: "",
  company: "",
  email: "",
  phoneOrWhatsapp: "",
  location: "",
  elevatorType: "",
  projectStage: "",
  quantity: "1",
  floorsAndStops: "",
  load: "",
  speed: "",
  powerStandard: "415V / 3-Phase / 50Hz",
  targetDelivery: "",
  requirements: "",
};

export default function Home() {
  const router = useRouter();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [prefetchedToken, setPrefetchedToken] =
    useState<PrefetchedVoiceToken | null>(null);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isDoorTransitioning, setIsDoorTransitioning] = useState(false);
  const [showTechSpecs, setShowTechSpecs] = useState(false);
  const [statusNotice, setStatusNotice] = useState("");

  const [cardMode, setCardMode] = useState<
    Record<string, "installation" | "commissioned">
  >({
    "passenger-lifts": "commissioned",
    "commercial-escalators": "installation",
    "moving-walkways": "commissioned",
  });

  const [emergencyLocation, setEmergencyLocation] = useState("");
  const [emergencyFault, setEmergencyFault] = useState(
    "Lift Stalled / Urgent Repair"
  );

  const [inquiry, setInquiry] = useState<InquiryFormState>(INITIAL_INQUIRY);
  const items = [...REVIEWS, ...REVIEWS];

  const prefetchVoiceToken = useCallback(async () => {
    setPrefetchedToken(null);
    try {
      const res = await fetch("/api/get-token", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (data.token) {
        setPrefetchedToken({
          token: data.token,
          roomName: data.roomName,
          issuedAt: data.issuedAt || Date.now(),
        });
      }
    } catch {
      // VoiceAgentModal falls back to on-demand fetch
    }
  }, []);

  useEffect(() => {
    prefetchVoiceToken();
  }, [prefetchVoiceToken]);

  const handleOpenLiveCall = () => {
    setIsEmergencyOpen(false);
    setIsVoiceOpen(true);
  };

  const handleFloor56Transition = () => {
    setIsDoorTransitioning(true);
    setTimeout(() => {
      router.push("/about");
    }, 680);
  };

  const buildSummaryText = () =>
    [
      "ELEVATOR SUPPLY & ENQUIRY — OHIAGWU INTERNATIONAL",
      `Name: ${inquiry.name || "Not provided"}`,
      `Company: ${inquiry.company || "Not provided"}`,
      `Email: ${inquiry.email || "Not provided"}`,
      `Phone / WhatsApp: ${inquiry.phoneOrWhatsapp || "Not provided"}`,
      `Site Location: ${inquiry.location || "Not provided"}`,
      `System Needed: ${inquiry.elevatorType || "Not specified"}`,
      `Project Stage: ${inquiry.projectStage || "Not specified"}`,
      `Quantity: ${inquiry.quantity || "1"} unit(s)`,
      inquiry.floorsAndStops ? `Floors & Stops: ${inquiry.floorsAndStops}` : "",
      inquiry.load ? `Load: ${inquiry.load}` : "",
      inquiry.speed ? `Speed: ${inquiry.speed}` : "",
      inquiry.targetDelivery ? `Target Delivery: ${inquiry.targetDelivery}` : "",
      `Requirements: ${inquiry.requirements || "Not specified"}`,
    ]
      .filter(Boolean)
      .join("\n");

  const handleSendWhatsAppQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const text = buildSummaryText();
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setStatusNotice("Opening WhatsApp with your project brief pre-filled.");
    setTimeout(() => setStatusNotice(""), 5000);
  };

  const handleSendEmailQuote = () => {
    const text = buildSummaryText();
    const subject = encodeURIComponent(
      `Elevator Quote & Enquiry — ${inquiry.company || inquiry.name || "New Project"}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(
      text
    )}`;
    setStatusNotice(`Opening your email app addressed to ${CONTACT_EMAIL}.`);
    setTimeout(() => setStatusNotice(""), 5000);
  };

  const handleEmergencyWhatsApp = () => {
    const msg = [
      "URGENT LIFT EMERGENCY DISPATCH",
      `Site Address / Location: ${emergencyLocation || "Not specified"}`,
      `Issue: ${emergencyFault}`,
      "Please dispatch the nearest Ohiagwu International technician.",
    ].join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main
      id="top"
      className="bg-white min-h-screen relative font-sans text-neutral-950 overflow-x-hidden"
    >
      <BlueprintLoader />
      <ShaftRailNav />

      {/* 1. HERO */}
      <SplitShaftHero
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenVoice={handleOpenLiveCall}
      />

      {/* 2. SERVICES — CLEAN ARCHITECTURAL HAIRLINE GRID */}
      <section
        id="systems"
        className="w-full bg-white py-24 md:py-28 px-5 md:px-10 border-b border-neutral-200"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C94F16] font-semibold flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1.5px] bg-[#C94F16]" />
              What We Do
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight leading-[1.1] text-neutral-950">
              End-to-end vertical mobility, engineered in-house.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-4 leading-relaxed">
              From factory sourcing and shaft plumbing to 24/7 maintenance, our
              own technicians own every millimeter of the job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-neutral-200">
            {CORE_SERVICES.map((item) => (
              <div
                key={item.code}
                className="bg-white border-r border-b border-neutral-200 hover:bg-[#FAF9F7] p-8 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative w-10 h-10 opacity-90">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        fill
                        sizes="40px"
                        className="object-contain mix-blend-multiply"
                      />
                    </div>
                    <span className="font-mono text-[11px] text-neutral-400">
                      {item.code}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-neutral-950 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#C94F16] font-semibold mt-7 pt-4 border-t border-neutral-100">
                  {item.specs}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SYSTEMS SHOWCASE — INSTALLATION VS FINISHED */}
      <section
        id="showcase"
        className="w-full bg-[#F7F7F5] py-24 md:py-28 px-5 md:px-10 border-b border-neutral-200"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C94F16] font-semibold flex items-center gap-2.5 mb-3">
                <span className="w-5 h-[1.5px] bg-[#C94F16]" />
                Our Systems
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
                From raw shaft to finished cabin.
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-sm leading-relaxed">
              Toggle each system to inspect our live shaft installation work
              alongside the commissioned finish.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {SYSTEMS_SHOWCASE.map((sys) => {
              const mode = cardMode[sys.id] || "commissioned";
              return (
                <div
                  key={sys.id}
                  className="bg-white border border-neutral-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-60 overflow-hidden bg-neutral-900">
                      <img
                        src={
                          mode === "installation"
                            ? sys.installImg
                            : sys.finishedImg
                        }
                        alt={sys.title}
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                      <div className="absolute bottom-3 left-3 right-3 flex bg-black/85 backdrop-blur-sm p-1 font-mono text-[10px]">
                        <button
                          type="button"
                          onClick={() =>
                            setCardMode((prev) => ({
                              ...prev,
                              [sys.id]: "installation",
                            }))
                          }
                          className={`flex-1 py-1.5 uppercase tracking-wider transition-colors cursor-pointer ${
                            mode === "installation"
                              ? "bg-[#C94F16] text-white font-semibold"
                              : "text-neutral-300 hover:text-white"
                          }`}
                        >
                          Installation
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setCardMode((prev) => ({
                              ...prev,
                              [sys.id]: "commissioned",
                            }))
                          }
                          className={`flex-1 py-1.5 uppercase tracking-wider transition-colors cursor-pointer ${
                            mode === "commissioned"
                              ? "bg-white text-black font-semibold"
                              : "text-neutral-300 hover:text-white"
                          }`}
                        >
                          Finished Lift
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#C94F16] font-semibold">
                        {sys.specs}
                      </p>
                      <h3 className="font-heading text-lg font-bold text-neutral-950 mt-2">
                        {sys.title}
                      </h3>
                      <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                        {sys.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <a
                      href="#contact"
                      className="w-full inline-flex items-center justify-between border-t border-neutral-200 pt-4 text-xs font-semibold text-neutral-950 hover:text-[#C94F16] transition-colors"
                    >
                      Request specifications <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. INSTALLATION RIGOR (3-STEP VISUAL PROOF) */}
      <section
        id="rigor"
        className="w-full bg-white py-24 md:py-28 px-5 md:px-10 border-b border-neutral-200"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C94F16] font-semibold flex items-center gap-2.5 mb-3">
                <span className="w-5 h-[1.5px] bg-[#C94F16]" />
                Site Standard
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
                Why our lifts run quiet for decades.
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-sm leading-relaxed">
              Direct factory sourcing means zero middlemen—and strict shaft
              plumbing eliminates vibration and premature wear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                step: "01",
                title: "Shaft & Pit Audit",
                desc: "Dimensions, headroom, and pit waterproofing verified before a single bracket is bolted.",
                img: "/east-africa-elevator-guide-rail-installation.webp",
              },
              {
                step: "02",
                title: "±0.5mm Laser Plumbing",
                desc: "Steel guide rails aligned with laser instrumentation so every cabin glides without shake.",
                img: "/east-africa-elevator-shaft-survey.webp",
              },
              {
                step: "03",
                title: "Full-Load Brake Test",
                desc: "Motors tuned for stable voltage protection and full safety-gear load tested before handover.",
                img: "/elevator-maintenance-south-africa.webp",
              },
            ].map((stage) => (
              <div
                key={stage.step}
                className="border border-neutral-200 bg-white overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden bg-neutral-100">
                  <img
                    src={stage.img}
                    alt={stage.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-black/85 text-white px-2.5 py-1 font-mono text-[10px] font-semibold tracking-widest">
                    STEP {stage.step}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-base font-bold text-neutral-950">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1.5 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FLOOR 56 — FOUNDER'S STORY */}
      <section
        id="floor-56"
        className="w-full bg-[#111111] text-white py-24 md:py-28 px-5 md:px-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#F27D2C] font-semibold mb-6">
            Floor 56 — Leadership
          </p>
          <blockquote className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-snug text-white">
            &ldquo;Over 20 years ago, our founder stepped inside factory shafts
            to master elevator mechanics firsthand. Every installation still
            answers to that personal standard.&rdquo;
          </blockquote>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-neutral-400 mt-7">
            Managing Director &amp; CEO — Ohiagwu International Limited
          </p>

          <div className="mt-9 flex justify-center">
            <button
              type="button"
              onClick={handleFloor56Transition}
              className="inline-flex items-center gap-2.5 bg-[#C94F16] hover:bg-white text-white hover:text-black px-7 py-3.5 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Read the founder&apos;s story <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. CLIENT FEEDBACK — LOCATION-FREE, CONCISE */}
      <section className="w-full overflow-hidden bg-white py-24 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-5 md:px-10 mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C94F16] font-semibold flex items-center gap-2.5 mb-3">
            <span className="w-5 h-[1.5px] bg-[#C94F16]" />
            Client Feedback
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-950">
            Trusted by facility teams and developers.
          </h2>
        </div>

        <div className="flex">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 34, repeat: Infinity }}
            className="flex gap-6 px-5 whitespace-nowrap"
          >
            {items.map((review, i) => (
              <div
                key={`${review.id}-${i}`}
                className="w-[300px] md:w-[380px] whitespace-normal bg-[#F7F7F5] border border-neutral-200 p-7 flex-shrink-0 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-[#C94F16]">
                    {[...Array(5)].map((_, idx) => (
                      <Star fill="currentColor" key={idx} size={13} />
                    ))}
                  </div>
                  <p className="text-neutral-800 text-sm leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
                <div className="border-t border-neutral-200 pt-4 mt-6">
                  <h4 className="font-heading text-neutral-950 font-bold text-sm">
                    {review.name}
                  </h4>
                  <span className="font-mono text-neutral-500 text-[10px] tracking-[0.14em] uppercase">
                    {review.role}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. START A CONVERSATION — KERUI-STYLE ARCHITECTURAL GRID BAND */}
      <section
        id="contact"
        className="w-full bg-[#B54311] text-white py-20 md:py-24 px-5 md:px-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/80 font-semibold flex items-center gap-2.5 mb-4">
            <span className="w-5 h-[1.5px] bg-white/80" />
            Start a Conversation
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-12">
            Talk to us about your project
          </h2>

          <div className="border-t border-white/25 divide-y divide-white/25">
            {/* Row 1: Live 24/7 Voice Agent / Engineering Desk */}
            <button
              type="button"
              onClick={handleOpenLiveCall}
              className="w-full py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left group cursor-pointer"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/75 sm:w-56 shrink-0">
                24/7 Voice Dispatch
              </span>
              <span className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-white group-hover:translate-x-1 transition-transform flex-1">
                Speak live with our engineering desk
              </span>
              <ArrowUpRight
                size={24}
                className="text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0"
              />
            </button>

            {/* Row 2: Business Inquiry Email */}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="w-full py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left group"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/75 sm:w-56 shrink-0">
                Business Inquiry
              </span>
              <span className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-white group-hover:translate-x-1 transition-transform flex-1 break-all">
                {CONTACT_EMAIL}
              </span>
              <ArrowUpRight
                size={24}
                className="text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0"
              />
            </a>

            {/* Row 3: Chat on WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hello Ohiagwu International, I would like to discuss an elevator or escalator project."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left group"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/75 sm:w-56 shrink-0">
                Chat on WhatsApp
              </span>
              <span className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-white group-hover:translate-x-1 transition-transform flex-1">
                {PHONE_NUMBER}
              </span>
              <ArrowUpRight
                size={24}
                className="text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0"
              />
            </a>
          </div>
        </div>
      </section>

      {/* 8. STREAMLINED PROJECT INQUIRY FORM (OPTIONAL TECH SPECS) */}
      <section className="w-full bg-white py-20 md:py-24 px-5 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C94F16] font-semibold flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1.5px] bg-[#C94F16]" />
              Project Brief
            </p>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              Send your specifications for a direct quote.
            </h3>
          </div>

          <form
            onSubmit={handleSendWhatsAppQuote}
            className="border border-neutral-200 bg-[#FAF9F7] p-6 md:p-9 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-[10px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={inquiry.name}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, name: e.target.value })
                  }
                  placeholder="Full name"
                  className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1.5">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={inquiry.company}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, company: e.target.value })
                  }
                  placeholder="Company name"
                  className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-[10px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1.5">
                  Phone or WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={inquiry.phoneOrWhatsapp}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, phoneOrWhatsapp: e.target.value })
                  }
                  placeholder="+234 800 000 0000"
                  className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={inquiry.email}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, email: e.target.value })
                  }
                  placeholder="name@company.com"
                  className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-[10px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1.5">
                  System Needed *
                </label>
                <select
                  required
                  value={inquiry.elevatorType}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, elevatorType: e.target.value })
                  }
                  className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                >
                  <option value="">Select system</option>
                  <option value="Passenger Lift">Passenger Lift</option>
                  <option value="Machine-Room-Less (MRL) Lift">
                    Machine-Room-Less (MRL) Lift
                  </option>
                  <option value="Home / Residential Lift">
                    Home / Residential Lift
                  </option>
                  <option value="Commercial Escalator">
                    Commercial Escalator
                  </option>
                  <option value="Moving Walkway / Travelator">
                    Moving Walkway / Travelator
                  </option>
                  <option value="AMC / Emergency Repair">
                    AMC / Emergency Repair
                  </option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1.5">
                  Site Location *
                </label>
                <input
                  type="text"
                  required
                  value={inquiry.location}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, location: e.target.value })
                  }
                  placeholder="City & address"
                  className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>
            </div>

            {/* Optional Collapsible Technical Specs */}
            <div className="border-t border-neutral-200 pt-4">
              <button
                type="button"
                onClick={() => setShowTechSpecs((prev) => !prev)}
                className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C94F16] hover:text-neutral-950 transition-colors cursor-pointer"
              >
                {showTechSpecs ? <Minus size={14} /> : <Plus size={14} />}
                {showTechSpecs
                  ? "Hide technical specifications"
                  : "Add technical specifications (floors, load, speed, timeline)"}
              </button>

              {showTechSpecs && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  <div>
                    <label className="font-mono text-[10px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1.5">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={inquiry.quantity}
                      onChange={(e) =>
                        setInquiry({ ...inquiry, quantity: e.target.value })
                      }
                      className="w-full bg-white border border-neutral-300 px-3 py-2 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1.5">
                      Floors / Stops
                    </label>
                    <input
                      type="text"
                      value={inquiry.floorsAndStops}
                      onChange={(e) =>
                        setInquiry({
                          ...inquiry,
                          floorsAndStops: e.target.value,
                        })
                      }
                      placeholder="e.g. 6 floors"
                      className="w-full bg-white border border-neutral-300 px-3 py-2 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1.5">
                      Load Capacity
                    </label>
                    <input
                      type="text"
                      value={inquiry.load}
                      onChange={(e) =>
                        setInquiry({ ...inquiry, load: e.target.value })
                      }
                      placeholder="e.g. 1000 kg"
                      className="w-full bg-white border border-neutral-300 px-3 py-2 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1.5">
                      Target Date
                    </label>
                    <input
                      type="date"
                      value={inquiry.targetDelivery}
                      onChange={(e) =>
                        setInquiry({
                          ...inquiry,
                          targetDelivery: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-neutral-300 px-3 py-2 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="font-mono text-[10px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1.5">
                Project Notes *
              </label>
              <textarea
                required
                rows={3}
                value={inquiry.requirements}
                onChange={(e) =>
                  setInquiry({ ...inquiry, requirements: e.target.value })
                }
                placeholder="Briefly describe your building, shaft readiness, or maintenance issue."
                className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16] resize-none"
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#C94F16] hover:bg-neutral-950 text-white px-6 py-3 text-xs font-semibold transition-colors cursor-pointer"
              >
                <MessageCircle size={15} /> Send via WhatsApp
              </button>
              <button
                type="button"
                onClick={handleSendEmailQuote}
                className="inline-flex items-center gap-2 border border-neutral-900 hover:bg-neutral-950 hover:text-white text-neutral-950 px-6 py-3 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Mail size={15} /> Send via Email
              </button>
            </div>

            {statusNotice && (
              <p className="font-mono text-xs text-green-700 font-medium">
                {statusNotice}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="w-full py-10 pb-20 md:pb-10 px-6 border-t border-neutral-200 bg-white text-center font-mono text-[11px] text-neutral-500 tracking-[0.16em] uppercase">
        © 2026 Ohiagwu International Limited. All Rights Reserved.
      </footer>

      {/* 10. KERUI-STYLE CLEAN BOTTOM-RIGHT SPLIT DOCK */}
      <div className="fixed bottom-0 right-4 md:right-8 z-50 flex shadow-lg border border-neutral-200 bg-white">
        <button
          type="button"
          onClick={handleOpenLiveCall}
          className="bg-white hover:bg-neutral-100 text-neutral-950 px-4 py-3 text-xs font-semibold flex items-center gap-2 border-r border-neutral-200 cursor-pointer"
        >
          <PhoneCall size={13} className="text-[#C94F16]" /> Call Now
        </button>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            "Hello Ohiagwu International, I would like a project quote."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#C94F16] hover:bg-neutral-950 text-white px-4 py-3 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          WhatsApp <ArrowUpRight size={14} />
        </a>
      </div>

      {/* 11. 24/7 EMERGENCY MODAL */}
      <AnimatePresence>
        {isEmergencyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="w-full max-w-md bg-white border-t-4 border-red-600 p-6 md:p-7 relative shadow-2xl text-neutral-950"
            >
              <button
                type="button"
                onClick={() => setIsEmergencyOpen(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-black cursor-pointer"
                aria-label="Close emergency modal"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-red-600 uppercase tracking-widest mb-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                🚨 24/7 Fault Dispatch
              </div>
              <h3 className="font-heading text-xl font-bold">
                Report a lift fault
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Connect live with our dispatch engineer or send your location on
                WhatsApp.
              </p>

              <div className="space-y-4 mt-5">
                <div>
                  <label className="font-mono text-[10px] font-semibold uppercase tracking-widest text-neutral-600 block mb-1.5">
                    Site Address / Area
                  </label>
                  <input
                    type="text"
                    value={emergencyLocation}
                    onChange={(e) => setEmergencyLocation(e.target.value)}
                    placeholder="Building name and street"
                    className="w-full bg-[#FAF9F7] border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] font-semibold uppercase tracking-widest text-neutral-600 block mb-1.5">
                    Issue
                  </label>
                  <select
                    value={emergencyFault}
                    onChange={(e) => setEmergencyFault(e.target.value)}
                    className="w-full bg-[#FAF9F7] border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                  >
                    <option>Lift Stalled / Urgent Repair</option>
                    <option>Drive Fault / Error Code</option>
                    <option>Monthly AMC Servicing</option>
                    <option>Escalator / Walkway Fault</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleOpenLiveCall}
                    className="bg-neutral-950 hover:bg-[#C94F16] text-white py-3 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Call Support Live
                  </button>
                  <button
                    type="button"
                    onClick={handleEmergencyWhatsApp}
                    className="bg-[#C94F16] hover:bg-neutral-950 text-white py-3 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    WhatsApp Alert ↗
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 12. FLOOR 56 STEEL DOOR TRANSITION */}
      <AnimatePresence>
        {isDoorTransitioning && (
          <div className="fixed inset-0 z-[110] flex pointer-events-none">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] as const }}
              className="w-1/2 h-full bg-black border-r border-[#C94F16]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] as const }}
              className="w-1/2 h-full bg-black border-l border-[#C94F16]"
            />
          </div>
        )}
      </AnimatePresence>

      {/* 13. LIVEKIT VOICE MODAL */}
      <VoiceAgentModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        prefetchedToken={prefetchedToken}
        onTokenConsumed={prefetchVoiceToken}
      />
    </main>
  );
}
