"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  HardHat,
  Star,
  Users,
  PhoneCall,
  ArrowUpRight,
  AlertTriangle,
  X,
  Wrench,
  CheckCircle2,
  Mail,
  MessageCircle,
} from "lucide-react";
import { VoiceAgentModal } from "@/components/VoiceAgentModal";
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

const CORE_SERVICES_GRID = [
  {
    code: "01",
    title: "Mid & Low-Rise Passenger Lifts",
    desc: "Smooth, quiet elevators for apartments, offices, and hotels. No shaking, no sudden stops—built to handle heavy daily traffic.",
    metaLeft: "NATIONWIDE SUPPLY",
    metaRight: "±0.5MM ALIGNMENT",
    icon: "/icons/lift.png",
    specs: "LOAD: 630–1600KG",
  },
  {
    code: "02",
    title: "Commercial Escalators",
    desc: "Heavy-duty escalators built for busy malls, plazas, and commercial centers. Energy-saving drives that run reliably all day.",
    metaLeft: "NATIONWIDE MOBILIZATION",
    metaRight: "HEAVY-DUTY TRUSS",
    icon: "/icons/escalator.png",
    specs: "30° / 35° INCLINE",
  },
  {
    code: "03",
    title: "Moving Walkways & Travelators",
    desc: "Safe, anti-slip horizontal and inclined walkways. Perfect for supermarkets, airports, and multi-level retail hubs.",
    metaLeft: "NATIONWIDE DELIVERY",
    metaRight: "HIGH TRAFFIC RATED",
    icon: "/icons/travelator.png",
    specs: "0°–12° INCLINE",
  },
  {
    code: "04",
    title: "Installation & Contracting",
    desc: "We don’t leave installation to roadside technicians. Our own trained crew handles shaft survey, rail alignment, wiring, and load testing.",
    metaLeft: "NATIONWIDE DEPLOYMENT",
    metaRight: "FAST ACTION: LAGOS",
    icon: "/icons/installation.png",
    specs: "TURNKEY DELIVERY",
  },
  {
    code: "05",
    title: "AMC & Monthly Maintenance",
    desc: "Scheduled monthly checks on your cables, motors, door sensors, and brakes so we catch small issues before they stop your lift.",
    metaLeft: "NATIONWIDE CONTRACTS",
    metaRight: "FAST ACTION: LAGOS",
    icon: "/icons/amc.png",
    specs: "GENUINE OEM PARTS",
  },
  {
    code: "06",
    title: "24/7 Repair & Emergency Service",
    desc: "Call us anytime. Our team responds quickly with proper diagnostics and original spare parts to get your lift moving again.",
    metaLeft: "NATIONWIDE RESPONSE",
    metaRight: "LAGOS RAPID TEAM",
    icon: "/icons/emergency.png",
    specs: "24/7 ON STANDBY",
  },
];

const SYSTEMS_SHOWCASE = [
  {
    id: "passenger-lifts",
    code: "SYS-01",
    title: "Mid & Low-Rise Passenger Lifts",
    specs: "630–1600KG // 1.0–2.5 M/S // MACHINE-ROOM-LESS & TRACTION",
    desc: "Clean, silent passenger cabins tailored for residential estates, corporate headquarters, hospitals, and hotels.",
    installImg: "/guide-rail.jpg",
    finishedImg: "/guide-open.jpg",
  },
  {
    id: "commercial-escalators",
    code: "SYS-02",
    title: "Commercial Escalators",
    specs: "30° / 35° // 800–1000MM STEP WIDTH // VVVF DRIVE",
    desc: "Built for heavy foot traffic in shopping malls and commercial complexes, with full safety sensors and strong steel trusses.",
    installImg: "/shaft-survey.jpg",
    finishedImg: "/open-survey.jpg",
  },
  {
    id: "moving-walkways",
    code: "SYS-03",
    title: "Moving Walkways & Travelators",
    specs: "0°–12° // ANTI-SLIP PALLETS // SHOPPING & TRANSIT",
    desc: "Steady, trolley-friendly moving walkways designed for busy supermarkets, malls, and public terminals across Nigeria.",
    installImg: "/shaft-pov.webp",
    finishedImg: "/pov-open.webp",
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Ibeh Charles",
    role: "Facility Manager, Victoria Island",
    text: "Ohiagwu International handled our installation cleanly from start to finish. Anytime we call for routine service, their engineers show up on time.",
  },
  {
    id: 2,
    name: "Arch. Sarah K.",
    role: "Principal Architect, Ikoyi",
    text: "Their shaft measurement and cabin finishing matched our drawings to the millimeter. Smooth ride, zero noise, and very tidy site work.",
  },
  {
    id: 3,
    name: "Chinedu E.",
    role: "Operations Director, Ikeja",
    text: "In our facility, a stalled lift is not an option. Their monthly AMC checks have kept our elevators running smoothly without surprises.",
  },
  {
    id: 4,
    name: "Folake A.",
    role: "Property Developer, Lekki",
    text: "You can tell the leadership actually understands the mechanics, not just sales. Straightforward pricing, proper installation, zero stories.",
  },
];

interface InquiryFormState {
  name: string;
  company: string;
  location: string;
  projectName: string;
  email: string;
  phoneOrWhatsapp: string;
  projectType: string;
  elevatorType: string;
  quantity: string;
  floorsAndStops: string;
  load: string;
  speed: string;
  powerStandard: string;
  deliveryTerms: string;
  projectStage: string;
  targetDelivery: string;
  requirements: string;
}

const INITIAL_INQUIRY: InquiryFormState = {
  name: "",
  company: "",
  location: "Lagos, Nigeria",
  projectName: "",
  email: "",
  phoneOrWhatsapp: "",
  projectType: "",
  elevatorType: "",
  quantity: "1",
  floorsAndStops: "",
  load: "",
  speed: "",
  powerStandard: "415V / 3-Phase / 50Hz",
  deliveryTerms: "Site Delivery — Lagos, Nigeria",
  projectStage: "",
  targetDelivery: "",
  requirements: "",
};

export default function Home() {
  const router = useRouter();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isDoorTransitioning, setIsDoorTransitioning] = useState(false);
  const [statusNotice, setStatusNotice] = useState("");

  const [cardMode, setCardMode] = useState<
    Record<string, "installation" | "commissioned">
  >({
    "passenger-lifts": "commissioned",
    "commercial-escalators": "installation",
    "moving-walkways": "commissioned",
  });

  const [emergencyZone, setEmergencyZone] = useState("Victoria Island / Ikoyi");
  const [emergencyFault, setEmergencyFault] = useState(
    "Lift Stalled / Entrapment"
  );

  const [inquiry, setInquiry] = useState<InquiryFormState>(INITIAL_INQUIRY);

  const items = [...REVIEWS, ...REVIEWS];

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
      `City & State / Location: ${inquiry.location || "Nigeria"}`,
      `Project Name: ${inquiry.projectName || "Not provided"}`,
      `Email: ${inquiry.email || "Not provided"}`,
      `Phone or WhatsApp: ${inquiry.phoneOrWhatsapp || "Not provided"}`,
      `Project Type: ${inquiry.projectType || "Not specified"}`,
      `Elevator / System Type: ${inquiry.elevatorType || "Not specified"}`,
      `Quantity: ${inquiry.quantity || "1"} unit(s)`,
      `Floors & Stops: ${inquiry.floorsAndStops || "Not specified"}`,
      `Load: ${inquiry.load || "Not specified"}`,
      `Speed: ${inquiry.speed || "Not specified"}`,
      `Power Standard: ${inquiry.powerStandard || "Not specified"}`,
      `Site Delivery & Terms: ${inquiry.deliveryTerms || "Not specified"}`,
      `Project Stage: ${inquiry.projectStage || "Not specified"}`,
      `Target Delivery: ${inquiry.targetDelivery || "Not specified"}`,
      `Project Requirements: ${inquiry.requirements || "Not specified"}`,
    ].join("\n");

  const handleSendWhatsAppQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const text = buildSummaryText();
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setStatusNotice(
      "Opening WhatsApp with your quote and enquiry details ready to send."
    );
    setTimeout(() => setStatusNotice(""), 5000);
  };

  const handleSendEmailQuote = () => {
    const text = buildSummaryText();
    const subject = encodeURIComponent(
      `Elevator Quote & Enquiry${
        inquiry.projectName ? ` — ${inquiry.projectName}` : ""
      }`
    );
    const body = encodeURIComponent(text);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatusNotice(
      `Opening your email client with the enquiry addressed to ${CONTACT_EMAIL}.`
    );
    setTimeout(() => setStatusNotice(""), 5000);
  };

  const handleEmergencyWhatsApp = () => {
    const msg = [
      "URGENT LIFT EMERGENCY DISPATCH — LAGOS",
      `Location Axis: ${emergencyZone}`,
      `Fault Reported: ${emergencyFault}`,
      "Please send the nearest Ohiagwu International technician immediately.",
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
      {/* 1. Pencil-Sketch Preloader */}
      <BlueprintLoader />

      {/* Right-Edge Elevator Shaft Scroll Indicator */}
      <ShaftRailNav />

      {/* 2. Static Hero with Dark Overlay + Dual CTA Blocks */}
      <SplitShaftHero
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenVoice={handleOpenLiveCall}
      />

      {/* 3. WHAT WE DO — WHITE DOMINATED WITH BOLD ORANGE ACCENTS & DRAFTING GRID */}
      <section
        id="systems"
        className="w-full bg-white py-24 px-5 md:px-10 border-b border-neutral-200 relative"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.025) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#C94F16] font-bold mb-3">
              02 // WE ARE ACTIVE NATIONWIDE
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950">
              What We Do – Hand-Built for Nigerian Conditions.
            </h2>
            <p className="text-base md:text-lg text-neutral-600 mt-4 leading-relaxed font-medium">
              Some people just import boxes and disappear. We don&apos;t do
              that. From inspecting your raw concrete shaft to handing over a
              smooth, finished lift, our own technicians do the real work. If
              there is ever a fault, we deploy anywhere nationwide—with our
              rapid-response teams active and on standby across Lagos.
            </p>
          </div>

          {/* 6-Service White Grid with Smaller Icons and Angled Orange Corner Cuts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_SERVICES_GRID.map((item) => (
              <div
                key={item.code}
                className="relative bg-white border border-neutral-200 hover:border-[#C94F16] p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Signature Angled Orange Corner Accent */}
                <div
                  className="absolute top-0 right-0 w-10 h-10 bg-[#C94F16]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
                />

                <div>
                  {/* Top Row: Icon in top-left, number/code in top-right */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="relative w-12 h-12">
                      <Image
                        src={item.icon}
                        alt={`${item.title} Icon`}
                        fill
                        sizes="48px"
                        className="object-contain mix-blend-multiply"
                      />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#C94F16] mr-4">
                      {item.code} /
                    </span>
                  </div>

                  {/* Card Header & Description */}
                  <h3 className="text-lg font-extrabold text-neutral-950 pr-4">
                    {item.title}
                  </h3>
                  <p className="font-mono text-[10px] text-neutral-400 mt-1 uppercase tracking-wider">
                    {item.specs}
                  </p>
                  <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Functional Metadata (Nationwide Focus vs Lagos Standby) */}
                <div className="mt-7 pt-4 border-t border-neutral-100 flex items-center justify-between font-mono text-[9px] tracking-wider uppercase">
                  <span className="text-neutral-500 font-semibold">
                    {item.metaLeft}
                  </span>
                  <span className="text-[#C94F16] font-bold">
                    {item.metaRight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INSTALLATION TO FINISHED SHOWCASE (White & Light Limestone) */}
      <section className="w-full bg-[#F8F7F5] py-24 px-5 md:px-10 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#C94F16] font-bold mb-3">
                03 // SEE BOTH SIDES OF OUR WORK
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-950">
                From Raw Concrete to Finished Cabin.
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-md leading-relaxed">
              Use the buttons on each card to switch between our actual shaft
              work and the finished result clients ride every day.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SYSTEMS_SHOWCASE.map((sys) => {
              const mode = cardMode[sys.id] || "commissioned";
              return (
                <div
                  key={sys.id}
                  className="bg-white border border-neutral-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-64 overflow-hidden bg-neutral-900">
                      <img
                        src={
                          mode === "installation"
                            ? sys.installImg
                            : sys.finishedImg
                        }
                        alt={sys.title}
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                      <div className="absolute bottom-3 left-3 right-3 flex bg-black/90 p-1 border border-neutral-700 font-mono text-[10px]">
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
                              ? "bg-[#C94F16] text-white font-bold"
                              : "text-neutral-300 hover:text-white"
                          }`}
                        >
                          [ Installation ]
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
                              ? "bg-white text-black font-bold"
                              : "text-neutral-300 hover:text-white"
                          }`}
                        >
                          [ Finished Lift ]
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="font-mono text-[10px] tracking-[0.2em] text-[#C94F16] font-bold">
                        {sys.code} // DIRECT SUPPLY
                      </p>
                      <h3 className="text-xl font-bold text-neutral-950 mt-1.5">
                        {sys.title}
                      </h3>
                      <p className="font-mono text-[10px] text-neutral-500 mt-2 pb-3 border-b border-neutral-200">
                        {sys.specs}
                      </p>
                      <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                        {sys.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <a
                      href="#contact"
                      className="w-full inline-flex items-center justify-between border border-neutral-900 px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-neutral-950 hover:bg-[#C94F16] hover:border-[#C94F16] hover:text-white transition-colors"
                    >
                      Get Your Quote <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. THE INSTALLATION RIGOR (White Canvas with Real Site Photos) */}
      <section
        id="rigor"
        className="w-full bg-white py-24 px-5 md:px-10 border-b border-neutral-200"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#C94F16] font-bold mb-3">
                04 // HOW WE WORK ON SITE
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-950">
                Why Our Lifts Don&apos;t Shake or Break Down.
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-md leading-relaxed">
              Shiny doors look nice on day one, but it is what happens inside
              the concrete shaft that decides whether a lift lasts 20 years or
              gives trouble after 6 months.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 border border-neutral-200 bg-white shadow-sm group overflow-hidden">
              <div className="relative h-[340px] md:h-[420px] overflow-hidden">
                <img
                  src="/east-africa-elevator-shaft-survey.webp"
                  alt="Laser Guide-Rail Alignment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-5 left-5 bg-[#C94F16] text-white px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase">
                  STEP 02 // LASER RAIL ALIGNMENT (±0.5MM)
                </div>
              </div>
              <div className="p-6 border-t border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-950">
                  Proper Laser Plumbing Before the Cabin Goes In
                </h3>
                <p className="text-sm text-neutral-600 mt-1.5 leading-relaxed">
                  Our engineers align every steel guide rail with laser tools
                  and check every bracket bolt twice. That is why our cabins
                  glide quietly without vibration.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              <div className="border border-neutral-200 bg-white shadow-sm overflow-hidden grid grid-cols-5">
                <div className="col-span-2 relative min-h-[195px]">
                  <img
                    src="/east-africa-elevator-guide-rail-installation.webp"
                    alt="Elevator Shaft Pit Inspection"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-3 p-5 flex flex-col justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#C94F16] tracking-widest uppercase">
                    STEP 01 // SHAFT &amp; PIT CHECK
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-neutral-950">
                      Clean Pit &amp; Waterproofing Check
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                      We inspect shaft dimensions, overhead clearance, and pit
                      drainage before mounting a single steel bracket.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-neutral-200 bg-white shadow-sm overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/elevator-maintenance-south-africa.webp"
                    alt="Rooftop Traction Motor and Sheave Inspection"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-neutral-950 text-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest">
                    STEP 03 // MOTOR &amp; LOAD TEST
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-neutral-950">
                    Full-Load Safety &amp; Brake Testing
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                    We balance hoist ropes, tune the motor drive for Nigerian
                    voltage conditions, and run full safety brake tests before
                    handover.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AMC & 24/7 EMERGENCY CALLOUT BANNER */}
      <section
        id="services"
        className="w-full bg-[#F8F7F5] py-20 px-5 md:px-10 border-b border-neutral-200"
      >
        <div className="max-w-7xl mx-auto bg-white border-2 border-[#C94F16] p-8 md:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-sm">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C94F16] flex items-center gap-2 mb-3">
              <Wrench size={14} /> 24/7 SUPPORT &amp; MONTHLY SERVICING
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-950">
              Need an Urgent Repair or Reliable Monthly Servicing?
            </h2>
            <p className="text-sm md:text-base text-neutral-600 mt-3 leading-relaxed">
              Even if another contractor installed your lift, our team can audit
              it, replace faulty parts with original components, and put it on a
              dependable Annual Maintenance Contract (AMC).
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={handleOpenLiveCall}
              className="inline-flex items-center gap-2 bg-[#C94F16] hover:bg-black text-white px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <PhoneCall size={15} /> Call 24/7 Support
            </button>
            <button
              type="button"
              onClick={() => setIsEmergencyOpen(true)}
              className="inline-flex items-center gap-2 border border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-950 px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <AlertTriangle size={15} className="text-[#C94F16]" /> Make
              Enquiries
            </button>
          </div>
        </div>
      </section>

      {/* 7. DIRECT SUPPLY CHAIN */}
      <section
        id="bridge"
        className="w-full bg-white py-20 px-5 md:px-10 border-b border-neutral-200"
      >
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#C94F16] mb-3">
            05 // DIRECT FROM MANUFACTURER
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-950 mb-10">
            No Middlemen. Straight From Factory to Your Site.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              [
                "01 // DIRECT FACTORY TIES",
                "Over 20 years of hands-on sourcing and technical relationships with proven lift and escalator factories.",
              ],
              [
                "02 // BUILT FOR NIGERIA",
                "We specify voltage protection, heavy-duty motors, and durable door operators suited for local power and usage.",
              ],
              [
                "03 // CHECKED BEFORE SHIPPING",
                "Every rail, control cabinet, and safety component is verified before leaving the factory.",
              ],
              [
                "04 // INSTALLED BY OUR CREW",
                "Delivered to your site, installed cleanly by our technicians, and backed by genuine spare parts.",
              ],
            ].map(([title, copy]) => (
              <div
                key={title}
                className="border border-neutral-200 border-t-2 border-t-[#C94F16] p-6 bg-white"
              >
                <p className="font-mono text-xs font-bold text-[#C94F16] mb-2.5">
                  {title}
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FLOOR 56 — FOUNDER'S STORY BRIDGE */}
      <section
        id="floor-56"
        className="w-full bg-neutral-950 text-white py-24 px-5 md:px-10 relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#F27D2C] font-bold mb-5">
            FLOOR 56 // LEADERSHIP &amp; EXPERIENCE
          </p>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug text-white">
            &ldquo;In his early 30s, our founder travelled to China not just to
            buy elevators, but to enter the shafts and learn the trade with his
            own hands. Over 20 years later, every single installation still
            answers to his personal standard.&rdquo;
          </blockquote>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-400 mt-7">
            MANAGING DIRECTOR &amp; CEO — OHIAGWU INTERNATIONAL LIMITED
          </p>

          <div className="mt-9 flex justify-center">
            <button
              type="button"
              onClick={handleFloor56Transition}
              className="group inline-flex items-center gap-3 bg-[#C94F16] hover:bg-white text-white hover:text-black px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer"
            >
              <span>▲</span>
              READ THE FOUNDER&apos;S STORY
            </button>
          </div>
        </div>
      </section>

      {/* 9. CLIENT FEEDBACK MARQUEE */}
      <div className="w-full overflow-hidden bg-white py-20 relative border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <p className="font-mono text-xs font-bold tracking-[0.24em] text-[#C94F16] uppercase mb-2.5">
            WHAT OUR CLIENTS SAY
          </p>
          <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-950">
            Trusted Across Lagos &amp; Nationwide
          </h3>
        </div>
        <div className="flex">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 32, repeat: Infinity }}
            className="flex gap-6 px-3 whitespace-nowrap"
          >
            {items.map((review, i) => (
              <div
                key={`${review.id}-${i}`}
                className="w-[310px] md:w-[400px] whitespace-normal bg-[#F8F7F5] border border-neutral-200 p-7 flex-shrink-0"
              >
                <div className="flex gap-1 mb-4 text-[#C94F16]">
                  {[...Array(5)].map((_, idx) => (
                    <Star fill="currentColor" key={idx} size={14} />
                  ))}
                </div>
                <p className="text-neutral-700 mb-6 text-sm leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="border-t border-neutral-200 pt-4">
                  <h4 className="text-neutral-950 font-bold text-sm">
                    {review.name}
                  </h4>
                  <span className="font-mono text-neutral-500 text-[10px] tracking-widest uppercase">
                    {review.role}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 10. TRUST SIGNALS STRIP */}
      <div className="w-full bg-[#C94F16] text-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            [ShieldCheck, "ISO & EN-81 Safety Standards"],
            [HardHat, "In-House Trained Technicians"],
            [CheckCircle2, "Original Factory Spare Parts"],
            [Users, "Lagos & Nationwide Coverage"],
          ].map(([Icon, label], i) => {
            const Comp = Icon as React.ComponentType<{
              size?: number;
              className?: string;
            }>;
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <Comp size={22} className="text-white" />
                <span className="font-mono text-[11px] font-bold tracking-widest uppercase mt-3">
                  {label as string}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 11. ELEVATOR SUPPLY & ENQUIRY FORM */}
      <section id="contact" className="w-full bg-white py-24 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-neutral-200">
            <div>
              <p className="font-mono text-xs font-bold tracking-[0.24em] text-[#C94F16] uppercase mb-2">
                01 / BUILDING &amp; SITE SUPPLY
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-950">
                Elevator Supply &amp; Enquiry
              </h2>
              <p className="text-sm md:text-base text-neutral-600 mt-2 max-w-2xl">
                Enter your building details and lift specifications below to
                get your quote or make enquiries via WhatsApp or Email, or start
                a live voice call with our technical desk.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleOpenLiveCall}
                className="inline-flex items-center gap-2 bg-neutral-950 hover:bg-[#C94F16] text-white px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <PhoneCall size={15} /> Call Now
              </button>
              <button
                type="button"
                onClick={handleOpenLiveCall}
                className="inline-flex items-center gap-2 border border-[#C94F16] text-[#C94F16] hover:bg-[#C94F16] hover:text-white px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <PhoneCall size={15} /> Call 24/7 Support
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSendWhatsAppQuote}
            className="border border-neutral-200 bg-[#F8F7F5] p-6 md:p-10 shadow-sm space-y-6"
          >
            {/* Row 1: Name & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={inquiry.name}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, name: e.target.value })
                  }
                  placeholder="Contact name"
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  required
                  value={inquiry.company}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, company: e.target.value })
                  }
                  placeholder="Company or organization"
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>
            </div>

            {/* Row 2: City & State / Location + Project Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  City &amp; State / Location *
                </label>
                <input
                  type="text"
                  required
                  value={inquiry.location}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, location: e.target.value })
                  }
                  placeholder="e.g. Victoria Island, Lagos"
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={inquiry.projectName}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, projectName: e.target.value })
                  }
                  placeholder="Project name or reference"
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>
            </div>

            {/* Row 3: Email & Phone or WhatsApp */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
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
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  Phone or WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={inquiry.phoneOrWhatsapp}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, phoneOrWhatsapp: e.target.value })
                  }
                  placeholder="e.g. +234 800 000 0000"
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>
            </div>

            {/* Row 4: Project Type & Elevator Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  Project Type *
                </label>
                <select
                  required
                  value={inquiry.projectType}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, projectType: e.target.value })
                  }
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                >
                  <option value="">Select one</option>
                  <option value="Commercial & Office Building">
                    Commercial &amp; Office Building
                  </option>
                  <option value="Residential Estate & Apartments">
                    Residential Estate &amp; Apartments
                  </option>
                  <option value="Shopping Mall & Retail Center">
                    Shopping Mall &amp; Retail Center
                  </option>
                  <option value="Hospital & Healthcare Facility">
                    Hospital &amp; Healthcare Facility
                  </option>
                  <option value="Hotel & Hospitality">
                    Hotel &amp; Hospitality
                  </option>
                  <option value="Existing Lift AMC / Repair">
                    Existing Lift AMC / Repair
                  </option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  Elevator Type *
                </label>
                <select
                  required
                  value={inquiry.elevatorType}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, elevatorType: e.target.value })
                  }
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                >
                  <option value="">Select one</option>
                  <option value="Mid & Low-Rise Passenger Lift">
                    Mid &amp; Low-Rise Passenger Lift
                  </option>
                  <option value="Machine-Room-Less (MRL) Lift">
                    Machine-Room-Less (MRL) Lift
                  </option>
                  <option value="Commercial Escalator">
                    Commercial Escalator
                  </option>
                  <option value="Moving Walkway / Travelator">
                    Moving Walkway / Travelator
                  </option>
                  <option value="AMC / Preventive Maintenance">
                    AMC / Preventive Maintenance
                  </option>
                  <option value="Emergency Repair / Modernization">
                    Emergency Repair / Modernization
                  </option>
                </select>
              </div>
            </div>

            {/* Row 5: Quantity, Floors & Stops, Load, Speed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={inquiry.quantity}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, quantity: e.target.value })
                  }
                  placeholder="units"
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  Floors &amp; Stops
                </label>
                <input
                  type="text"
                  value={inquiry.floorsAndStops}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, floorsAndStops: e.target.value })
                  }
                  placeholder="e.g. 6 floors / 6 stops"
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  Load
                </label>
                <input
                  type="text"
                  value={inquiry.load}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, load: e.target.value })
                  }
                  placeholder="e.g. 1000 kg"
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  Speed
                </label>
                <input
                  type="text"
                  value={inquiry.speed}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, speed: e.target.value })
                  }
                  placeholder="e.g. 1.75 m/s"
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>
            </div>

            {/* Row 6: Power Standard & Site Delivery / Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  Power Standard
                </label>
                <input
                  type="text"
                  value={inquiry.powerStandard}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, powerStandard: e.target.value })
                  }
                  placeholder="Voltage, phase and frequency"
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  Site Delivery &amp; Terms
                </label>
                <input
                  type="text"
                  value={inquiry.deliveryTerms}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, deliveryTerms: e.target.value })
                  }
                  placeholder="e.g. Supply & Installation — Lekki, Lagos"
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>
            </div>

            {/* Row 7: Project Stage & Target Delivery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  Project Stage *
                </label>
                <select
                  required
                  value={inquiry.projectStage}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, projectStage: e.target.value })
                  }
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                >
                  <option value="">Select one</option>
                  <option value="Design / Architectural Planning">
                    Design / Architectural Planning
                  </option>
                  <option value="Shaft & Structural Construction">
                    Shaft &amp; Structural Construction
                  </option>
                  <option value="Finishing & MEP Stage">
                    Finishing &amp; MEP Stage
                  </option>
                  <option value="Completed / Existing Building">
                    Completed / Existing Building
                  </option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                  Target Delivery
                </label>
                <input
                  type="date"
                  value={inquiry.targetDelivery}
                  onChange={(e) =>
                    setInquiry({ ...inquiry, targetDelivery: e.target.value })
                  }
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16]"
                />
              </div>
            </div>

            {/* Row 8: Project Requirements */}
            <div>
              <label className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                Project Requirements *
              </label>
              <textarea
                required
                rows={4}
                value={inquiry.requirements}
                onChange={(e) =>
                  setInquiry({ ...inquiry, requirements: e.target.value })
                }
                placeholder="Please describe shaft dimensions, door opening, pit and headroom details, installation schedule, maintenance needs, or other requirements."
                className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:border-[#C94F16] resize-none"
              />
            </div>

            {/* Quote & Contact Actions: WhatsApp Quote, Email Quote, Call Now */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                <MessageCircle size={16} /> Send WhatsApp Quote ↗
              </button>

              <button
                type="button"
                onClick={handleSendEmailQuote}
                className="inline-flex items-center gap-2 bg-black hover:bg-[#C94F16] text-white px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Mail size={16} /> Send Email Quote ↗
              </button>

              <button
                type="button"
                onClick={handleOpenLiveCall}
                className="inline-flex items-center gap-2 border border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-950 px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <PhoneCall size={16} /> Call Now
              </button>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 px-3 py-4 transition-colors"
              >
                Dial Direct ({PHONE_NUMBER})
              </a>
            </div>

            {statusNotice && (
              <p className="font-mono text-xs text-green-700 font-semibold">
                {statusNotice}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="w-full py-10 px-6 border-t border-neutral-200 bg-white text-center font-mono text-[11px] text-neutral-500 tracking-[0.18em] uppercase">
        © 2026 OHIAGWU INTERNATIONAL LIMITED // LAGOS &amp; NATIONWIDE. ALL
        RIGHTS RESERVED.
      </footer>

      {/* 13. STICKY BOTTOM-RIGHT CONVERSION DOCK (Call + Green WhatsApp) */}
      <div className="fixed bottom-0 right-4 md:right-8 z-50 flex shadow-xl border border-neutral-300">
        <button
          type="button"
          onClick={handleOpenLiveCall}
          className="bg-white hover:bg-neutral-100 text-neutral-950 px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 border-r border-neutral-300 cursor-pointer"
        >
          <PhoneCall size={14} className="text-[#C94F16]" /> Call Now
        </button>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            "Hello Ohiagwu International, I would like to get a quote / make an enquiry."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
        >
          WhatsApp Quote <ArrowUpRight size={14} />
        </a>
      </div>

      {/* 14. 24/7 EMERGENCY & ENQUIRY MODAL */}
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
              className="w-full max-w-lg bg-white border-t-4 border-[#C94F16] p-6 md:p-8 relative shadow-2xl text-neutral-950"
            >
              <button
                type="button"
                onClick={() => setIsEmergencyOpen(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-black cursor-pointer"
                aria-label="Close emergency modal"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#C94F16] uppercase tracking-widest mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C94F16] animate-pulse" />
                24/7 SUPPORT &amp; ENQUIRIES
              </div>
              <h3 className="text-2xl font-extrabold">
                Make Enquiries or Call 24/7 Support
              </h3>
              <p className="text-sm text-neutral-600 mt-1.5">
                Choose your location axis and service need to start a live voice
                call with our technical desk or message us on WhatsApp.
              </p>

              <div className="space-y-4 mt-6">
                <div>
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-600 block mb-1.5">
                    Your Location / Axis
                  </label>
                  <select
                    value={emergencyZone}
                    onChange={(e) => setEmergencyZone(e.target.value)}
                    className="w-full bg-[#F8F7F5] border border-neutral-300 px-3.5 py-3 text-sm text-neutral-950"
                  >
                    <option>Victoria Island / Ikoyi</option>
                    <option>Lekki / Ajah Corridor</option>
                    <option>Ikeja / Maryland / GRA</option>
                    <option>Surulere / Yaba / Apapa</option>
                    <option>Other Lagos / Nationwide Site</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-600 block mb-1.5">
                    Service or Fault Needed
                  </label>
                  <select
                    value={emergencyFault}
                    onChange={(e) => setEmergencyFault(e.target.value)}
                    className="w-full bg-[#F8F7F5] border border-neutral-300 px-3.5 py-3 text-sm text-neutral-950"
                  >
                    <option>Lift Stalled / Urgent Repair</option>
                    <option>New Elevator / Escalator Quote</option>
                    <option>Monthly AMC Maintenance</option>
                    <option>Escalator / Travelator Inspection</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleEmergencyWhatsApp}
                    className="bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    WhatsApp Quote ↗
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenLiveCall}
                    className="bg-[#C94F16] hover:bg-black text-white py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Call 24/7 Support
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 15. FLOOR 56 STEEL DOOR CLOSING TRANSITION TO /about */}
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

      {/* 16. LIVEKIT VOICE MODAL */}
      <VoiceAgentModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />
    </main>
  );
}