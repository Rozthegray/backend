"use client";

import React, { useState, useEffect } from "react";
import { PhoneCall, MessageCircle } from "lucide-react";
import { VoiceAgentModal } from "@/components/VoiceAgentModal";

const CLEAN_WA_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2340000000000"
).replace(/\D/g, "");

export function openElevatorXVoice() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-elevatorx-voice"));
  }
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${CLEAN_WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function ElevatorXContactDock() {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsVoiceOpen(true);
    window.addEventListener("open-elevatorx-voice", handler);
    return () => window.removeEventListener("open-elevatorx-voice", handler);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <button
          type="button"
          onClick={() => setIsVoiceOpen(true)}
          className="bg-brand-charcoal text-white p-4 rounded-full shadow-lg hover:bg-brand-red hover:scale-110 transition-all flex items-center justify-center group relative cursor-pointer"
          aria-label="Talk to Elevator X AI Engineer"
        >
          <PhoneCall size={22} />
          <span className="absolute right-full mr-4 bg-brand-charcoal text-white text-xs font-medium py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Talk to AI Engineer
          </span>
        </button>

        <a
          href={buildWhatsAppUrl(
            "Hello Elevator X, I would like to inquire about an elevator or escalator installation."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group relative"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle size={22} />
          <span className="absolute right-full mr-4 bg-brand-charcoal text-white text-xs font-medium py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>
      </div>

      <VoiceAgentModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />
    </>
  );
}
