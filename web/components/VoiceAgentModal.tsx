"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useVoiceAssistant,
  useLocalParticipant,
  useRoomContext,
  useDataChannel,
} from "@livekit/components-react";
import { AudioPresets, RoomEvent, type RoomOptions } from "livekit-client";
import "@livekit/components-styles";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  MessageCircle,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Ear,
} from "lucide-react";

const PHONE_NUMBER = (
  process.env.NEXT_PUBLIC_PHONE_NUMBER || "+2348000000000"
).trim();

const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2340000000000"
).replace(/\D/g, "");

const TOKEN_MAX_AGE_MS = 45 * 60 * 1000;

const LOW_LATENCY_ROOM_OPTIONS: RoomOptions = {
  dynacast: true,
  audioCaptureDefaults: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
  publishDefaults: {
    dtx: true,
    red: true,
    audioPreset: AudioPresets.speech,
  },
};

export interface PrefetchedVoiceToken {
  token: string;
  roomName: string;
  issuedAt: number;
}

interface QuotePayload {
  action?: string;
  client_name?: string;
  company?: string;
  location?: string;
  project_name?: string;
  email?: string;
  phone_or_whatsapp?: string;
  project_type?: string;
  lift_type?: string;
  quantity?: string | number;
  floors_and_stops?: string;
  load?: string;
  speed?: string;
  power_standard?: string;
  delivery_terms?: string;
  project_stage?: string;
  target_delivery?: string;
  inquiry?: string;
  urgent?: boolean;
}

function formatDuration(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function formatQuoteSummary(data: QuotePayload): string {
  return [
    "ELEVATOR QUOTE & ENQUIRY — OHIAGWU INTERNATIONAL",
    data.client_name ? `Name: ${data.client_name}` : "",
    data.company ? `Company: ${data.company}` : "",
    data.location ? `Location: ${data.location}` : "",
    data.project_name ? `Project: ${data.project_name}` : "",
    data.email ? `Email: ${data.email}` : "",
    data.phone_or_whatsapp ? `Phone / WhatsApp: ${data.phone_or_whatsapp}` : "",
    data.project_type ? `Project Type: ${data.project_type}` : "",
    data.lift_type ? `System / Lift Type: ${data.lift_type}` : "",
    data.quantity ? `Quantity: ${data.quantity}` : "",
    data.floors_and_stops ? `Floors & Stops: ${data.floors_and_stops}` : "",
    data.load ? `Load: ${data.load}` : "",
    data.speed ? `Speed: ${data.speed}` : "",
    data.power_standard ? `Power Standard: ${data.power_standard}` : "",
    data.delivery_terms ? `Delivery Terms: ${data.delivery_terms}` : "",
    data.project_stage ? `Project Stage: ${data.project_stage}` : "",
    data.target_delivery ? `Target Delivery: ${data.target_delivery}` : "",
    data.inquiry ? `Details / Requirements: ${data.inquiry}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function playRingRingTone(ctx: AudioContext) {
  const now = ctx.currentTime;

  const playBurst = (startOffset: number, duration: number) => {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";
    osc1.frequency.setValueAtTime(440, now + startOffset);
    osc2.frequency.setValueAtTime(480, now + startOffset);

    gain.gain.setValueAtTime(0.0001, now + startOffset);
    gain.gain.exponentialRampToValueAtTime(0.035, now + startOffset + 0.03);
    gain.gain.setValueAtTime(0.035, now + startOffset + duration - 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now + startOffset);
    osc2.start(now + startOffset);
    osc1.stop(now + startOffset + duration + 0.01);
    osc2.stop(now + startOffset + duration + 0.01);
  };

  playBurst(0, 0.22);
  playBurst(0.32, 0.22);
}

function FemaleEngineerAvatar({
  mode,
}: {
  mode: "ringing" | "speaking" | "listening" | "thinking";
}) {
  const isSpeaking = mode === "speaking";
  const isListening = mode === "listening";
  const isRinging = mode === "ringing" || mode === "thinking";

  return (
    <div className="relative flex items-center justify-center">
      {isSpeaking && (
        <>
          <span className="absolute -inset-3 rounded-full border-2 border-[#25D366] animate-ping opacity-70" />
          <span className="absolute -inset-1.5 rounded-full border-2 border-[#25D366]" />
        </>
      )}
      {isListening && (
        <span className="absolute -inset-2.5 rounded-full border-2 border-sky-400/80 animate-pulse" />
      )}
      {isRinging && (
        <span className="absolute -inset-2.5 rounded-full border-2 border-amber-400/75 animate-ping opacity-60" />
      )}

      <div
        className={`relative w-24 h-24 rounded-full flex items-center justify-center border-2 shadow-xl transition-all duration-300 ${
          isSpeaking
            ? "bg-[#25D366] border-white text-[#062814] scale-105"
            : isListening
              ? "bg-sky-950 border-sky-400 text-sky-200"
              : "bg-amber-950 border-amber-400 text-amber-200"
        }`}
      >
        <svg
          viewBox="0 0 64 64"
          className="w-16 h-16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M16 26C16 16.6112 23.1634 10 32 10C40.8366 10 48 16.6112 48 26H16Z"
            fill="currentColor"
            fillOpacity="0.95"
          />
          <rect
            x="12"
            y="25"
            width="40"
            height="4"
            rx="2"
            fill="currentColor"
          />
          <path
            d="M18 29C17 36 17 42 15 46H49C47 42 47 36 46 29H18Z"
            fill="currentColor"
            fillOpacity="0.45"
          />
          <circle cx="32" cy="36" r="10" fill="#FDE6D8" />
          <circle cx="28.5" cy="35.5" r="1.3" fill="#171717" />
          <circle cx="35.5" cy="35.5" r="1.3" fill="#171717" />
          <path
            d="M29.2 40C30.8 41.4 33.2 41.4 34.8 40"
            stroke="#171717"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M14 57C15.5 50.5 22.8 47 32 47C41.2 47 48.5 50.5 50 57"
            fill="currentColor"
          />
        </svg>
      </div>

      {isSpeaking ? (
        <div
          aria-label="Speaking"
          className="absolute -bottom-2 bg-white text-[#0B141A] px-2.5 py-1 rounded-full shadow-md flex items-center gap-0.5 h-6"
        >
          <span className="w-1 h-2.5 bg-[#25D366] rounded-full animate-bounce [animation-delay:-0.2s]" />
          <span className="w-1 h-4 bg-[#25D366] rounded-full animate-bounce [animation-delay:-0.1s]" />
          <span className="w-1 h-2 bg-[#25D366] rounded-full animate-bounce" />
          <span className="w-1 h-3.5 bg-[#25D366] rounded-full animate-bounce [animation-delay:-0.15s]" />
        </div>
      ) : isListening ? (
        <div
          aria-label="Listening"
          className="absolute -bottom-2 bg-sky-400 text-slate-950 px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 h-6 font-mono text-[9px] font-bold uppercase"
        >
          <Ear size={12} /> Listening
        </div>
      ) : (
        <div
          aria-label="Ringing"
          className="absolute -bottom-2 bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 h-6 font-mono text-[9px] font-bold uppercase"
        >
          <Phone size={11} /> Ringing...
        </div>
      )}
    </div>
  );
}

function WhatsAppCallView({
  onEndCall,
  onEmergencyEscalation,
  onQuoteCaptured,
  onRedirectReady,
  emergencyActive,
  collectedData,
  whatsappUrl,
  summaryText,
}: {
  onEndCall: () => void;
  onEmergencyEscalation: (payload: QuotePayload) => void;
  onQuoteCaptured: (payload: QuotePayload) => void;
  onRedirectReady: (url: string, summary: string, urgent?: boolean) => void;
  emergencyActive: boolean;
  collectedData: QuotePayload | null;
  whatsappUrl: string;
  summaryText: string;
}) {
  const room = useRoomContext();
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const { state: agentState, agentAttributes } = useVoiceAssistant();

  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [speakerMuted, setSpeakerMuted] = useState(false);
  const [hasAgentSpoken, setHasAgentSpoken] = useState(false);
  const [ringTick, setRingTick] = useState(0);
  const [spokenLine, setSpokenLine] = useState("");
  const autoOpenedRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (agentState === "speaking") {
      setHasAgentSpoken(true);
    }
  }, [agentState]);

  // Play "ring-ring" while connecting until the agent first speaks
  useEffect(() => {
    if (hasAgentSpoken || agentState === "speaking" || speakerMuted) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      return;
    }

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    audioCtxRef.current = ctx;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    playRingRingTone(ctx);
    const interval = setInterval(() => {
      setRingTick((t) => (t + 1) % 2);
      if (ctx.state === "running") {
        playRingRingTone(ctx);
      }
    }, 2200);

    return () => {
      clearInterval(interval);
      ctx.close().catch(() => {});
      audioCtxRef.current = null;
    };
  }, [hasAgentSpoken, agentState, speakerMuted]);

  // Sync speaker mute state with RoomAudioRenderer's audio elements
  useEffect(() => {
    document.querySelectorAll("audio").forEach((el) => {
      el.muted = speakerMuted;
    });
  }, [speakerMuted, agentState]);

  useEffect(() => {
    if (!room) return;

    const handleTranscription = (
      segments: Array<{ text?: string }>,
      participant?: { isLocal?: boolean }
    ) => {
      if (participant?.isLocal) return;
      const text = segments
        .map((s) => s.text || "")
        .join(" ")
        .trim();
      if (text) {
        setHasAgentSpoken(true);
        setSpokenLine(text);
      }
    };

    room.on(RoomEvent.TranscriptionReceived, handleTranscription);
    return () => {
      room.off(RoomEvent.TranscriptionReceived, handleTranscription);
    };
  }, [room]);

  useEffect(() => {
    const attrTranscript =
      agentAttributes?.["lk.agent.transcript"] ||
      agentAttributes?.["transcript"];
    if (attrTranscript && attrTranscript.trim()) {
      setHasAgentSpoken(true);
      setSpokenLine(attrTranscript.trim());
    }
  }, [agentAttributes]);

  const openWhatsAppNow = useCallback(
    (data: QuotePayload, isUrgent: boolean) => {
      const formatted = formatQuoteSummary(data);
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        formatted
      )}`;
      const shortSummary = [
        data.client_name,
        data.lift_type,
        data.location,
        data.inquiry,
      ]
        .filter(Boolean)
        .join(" — ");

      onRedirectReady(
        url,
        shortSummary || "Call summary ready on WhatsApp",
        isUrgent
      );

      if (isUrgent || !autoOpenedRef.current) {
        autoOpenedRef.current = true;
        window.open(url, "_blank", "noopener,noreferrer");
      }
    },
    [onRedirectReady]
  );

  useDataChannel("app-action", (msg) => {
    try {
      const decoded = new TextDecoder().decode(msg.payload);
      const data: QuotePayload = JSON.parse(decoded);

      if (data.action === "escalate_management" || data.urgent) {
        onEmergencyEscalation(data);
        setHasAgentSpoken(true);
        setSpokenLine("Urgent alert sent to management.");
        openWhatsAppNow(
          {
            ...data,
            inquiry:
              data.inquiry ||
              "URGENT EMERGENCY: Immediate management & dispatch needed.",
          },
          true
        );
        return;
      }

      if (data.action === "quote_collected") {
        onQuoteCaptured(data);
        const formatted = formatQuoteSummary(data);
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          formatted
        )}`;
        const shortSummary = [data.client_name, data.lift_type, data.location]
          .filter(Boolean)
          .join(" — ");
        onRedirectReady(url, shortSummary || "Quote summary ready", false);
        return;
      }

      if (data.action === "redirect_whatsapp") {
        onQuoteCaptured(data);
        openWhatsAppNow(data, Boolean(data.urgent));
      }
    } catch (err) {
      console.error("Failed to parse agent payload:", err);
    }
  });

  const toggleMic = async () => {
    if (!localParticipant) return;
    await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
  };

  const toggleSpeaker = () => {
    const nextMuted = !speakerMuted;
    setSpeakerMuted(nextMuted);
    document.querySelectorAll("audio").forEach((el) => {
      el.muted = nextMuted;
    });
  };

  const avatarMode: "ringing" | "speaking" | "listening" | "thinking" =
    agentState === "speaking"
      ? "speaking"
      : !hasAgentSpoken
        ? "ringing"
        : agentState === "thinking"
          ? "thinking"
          : "listening";

  const statusLabel = emergencyActive
    ? "Emergency Escalated to Management"
    : avatarMode === "ringing"
      ? ringTick === 0
        ? "Ringing... Connecting to agent"
        : "Connecting to agent..."
      : avatarMode === "speaking"
        ? "Speaking now..."
        : avatarMode === "thinking"
          ? "One moment..."
          : "Listening to you...";

  return (
    <div className="bg-[#0B141A] text-white flex flex-col justify-between min-h-[450px]">
      {/* TOP: Call Duration */}
      <div className="pt-6 pb-3 px-6 text-center border-b border-white/10">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400">
          OHIAGWU TECHNICAL DESK
        </p>
        <p className="font-mono text-lg font-bold tracking-widest text-white mt-0.5">
          {formatDuration(secondsElapsed)}
        </p>
      </div>

      {/* CENTER: Female Engineer Icon + Ringing / Listening / Speaking */}
      <div className="px-6 py-6 flex flex-col items-center text-center flex-1 justify-center">
        <FemaleEngineerAvatar mode={avatarMode} />

        <h3 className="text-xl font-extrabold tracking-tight text-white mt-5">
          Engr. Ngozi • Technical Desk
        </h3>
        <p
          className={`font-mono text-xs font-semibold mt-1 ${
            avatarMode === "speaking"
              ? "text-[#25D366]"
              : avatarMode === "ringing"
                ? "text-amber-300"
                : "text-sky-300"
          }`}
        >
          {statusLabel}
        </p>

        {avatarMode === "ringing" ? (
          <p className="mt-3 text-xs text-neutral-400 max-w-xs leading-relaxed">
            Connecting to agent — she will greet you as soon as the line picks
            up.
          </p>
        ) : (
          spokenLine && (
            <p className="mt-3 text-xs text-neutral-300 max-w-xs leading-relaxed line-clamp-2">
              {spokenLine}
            </p>
          )
        )}

        {emergencyActive && (
          <div className="mt-3 w-full max-w-xs bg-[#C94F16] border border-white/30 px-3.5 py-2 flex items-center justify-between gap-2 text-left">
            <span className="text-[11px] font-bold flex items-center gap-1.5">
              <AlertTriangle size={14} className="shrink-0" />
              Escalated to management
            </span>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="bg-white text-[#C94F16] px-2 py-1 font-mono text-[10px] font-bold uppercase"
            >
              Call 24/7
            </a>
          </div>
        )}

        {collectedData && (
          <div className="mt-2.5 w-full max-w-xs bg-white/10 border border-white/15 px-3 py-1.5 text-[11px] text-neutral-200 flex items-center gap-1.5 truncate">
            <CheckCircle2 size={13} className="text-[#25D366] shrink-0" />
            <span className="truncate">
              {[
                collectedData.client_name,
                collectedData.location,
                collectedData.lift_type,
              ]
                .filter(Boolean)
                .join(" • ") || "Quote noted"}
            </span>
          </div>
        )}

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-wider"
          >
            <MessageCircle size={14} />
            WhatsApp Quote ({summaryText.slice(0, 22)}...)
          </a>
        )}
      </div>

      {/* BOTTOM: Speaker, Mute Mic, End Call */}
      <div className="px-6 py-5 bg-black/45 border-t border-white/10 flex items-center justify-around">
        <button
          type="button"
          onClick={toggleSpeaker}
          className="flex flex-col items-center gap-1.5 cursor-pointer"
        >
          <span
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              speakerMuted
                ? "bg-white text-black"
                : "bg-white/15 hover:bg-white/25 text-white"
            }`}
          >
            {speakerMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-300">
            {speakerMuted ? "Muted" : "Speaker"}
          </span>
        </button>

        <button
          type="button"
          onClick={toggleMic}
          className="flex flex-col items-center gap-1.5 cursor-pointer"
        >
          <span
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isMicrophoneEnabled
                ? "bg-white/15 hover:bg-white/25 text-white"
                : "bg-white text-black"
            }`}
          >
            {isMicrophoneEnabled ? <Mic size={20} /> : <MicOff size={20} />}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-300">
            {isMicrophoneEnabled ? "Mute" : "Mic Off"}
          </span>
        </button>

        <button
          type="button"
          onClick={onEndCall}
          className="flex flex-col items-center gap-1.5 cursor-pointer"
        >
          <span className="w-12 h-12 rounded-full bg-[#E53935] hover:bg-[#c62828] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95">
            <PhoneOff size={20} />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-red-300 font-bold">
            End Call
          </span>
        </button>
      </div>

      <RoomAudioRenderer />
    </div>
  );
}

export function VoiceAgentModal({
  isOpen,
  onClose,
  prefetchedToken,
  onTokenConsumed,
}: {
  isOpen: boolean;
  onClose: () => void;
  prefetchedToken?: PrefetchedVoiceToken | null;
  onTokenConsumed?: () => void;
}) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [collectedData, setCollectedData] = useState<QuotePayload | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [summaryText, setSummaryText] = useState("");
  const autoStartedRef = useRef(false);

  const resetCallState = useCallback(() => {
    setToken("");
    setEmergencyActive(false);
    setCollectedData(null);
    setWhatsappUrl("");
    setSummaryText("");
    setError("");
  }, []);

  const startSession = useCallback(async () => {
    setError("");
    setEmergencyActive(false);
    setCollectedData(null);
    setWhatsappUrl("");
    setSummaryText("");

    // Instant path: consume fresh prefetched token with 0ms network delay
    if (
      prefetchedToken?.token &&
      Date.now() - prefetchedToken.issuedAt < TOKEN_MAX_AGE_MS
    ) {
      setToken(prefetchedToken.token);
      onTokenConsumed?.();
      return;
    }

    // Fallback path: fetch on demand
    setLoading(true);
    try {
      const res = await fetch("/api/get-token", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to connect call");
      setToken(data.token);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Could not start voice call");
    } finally {
      setLoading(false);
    }
  }, [prefetchedToken, onTokenConsumed]);

  // Auto-connect immediately the moment the modal opens
  useEffect(() => {
    if (isOpen && !autoStartedRef.current) {
      autoStartedRef.current = true;
      startSession();
    }
    if (!isOpen) {
      autoStartedRef.current = false;
    }
  }, [isOpen, startSession]);

  const handleClose = () => {
    resetCallState();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm bg-white shadow-2xl border-t-4 border-[#C94F16] overflow-hidden text-neutral-950">
        <button
          type="button"
          onClick={handleClose}
          className={`absolute top-3.5 right-3.5 z-20 p-1.5 transition-colors cursor-pointer ${
            token
              ? "text-neutral-400 hover:text-white"
              : "text-neutral-400 hover:text-black"
          }`}
          aria-label="Close call window"
        >
          <X size={18} />
        </button>

        {!token ? (
          <div className="p-6 md:p-7">
            <div className="mb-6 pr-5">
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#C94F16] uppercase">
                OHIAGWU TECHNICAL DESK
              </span>
              <h3 className="text-xl font-extrabold tracking-tight mt-1">
                Call Our Technical Engineer
              </h3>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                Start a live voice call with our desk. She greets you right
                away, listens to your request, escalates emergencies
                immediately, and captures your quote details.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={startSession}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3.5 px-5 font-mono font-bold uppercase tracking-[0.15em] text-xs transition-colors shadow-md disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Ringing...
                  </>
                ) : (
                  <>
                    <Phone size={16} />
                    Start Voice Call
                  </>
                )}
              </button>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="w-full flex items-center justify-center gap-2 border border-neutral-300 hover:border-black text-neutral-900 py-2.5 px-4 font-mono font-bold uppercase tracking-wider text-xs transition-colors"
              >
                <Phone size={14} className="text-[#C94F16]" />
                Call 24/7 Support Direct
              </a>
            </div>
          </div>
        ) : (
          <LiveKitRoom
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            options={LOW_LATENCY_ROOM_OPTIONS}
            connect={true}
            audio={true}
            video={false}
            onDisconnected={resetCallState}
          >
            <WhatsAppCallView
              onEndCall={resetCallState}
              onEmergencyEscalation={(payload) => {
                setEmergencyActive(true);
                setCollectedData((prev) => ({ ...prev, ...payload }));
              }}
              onQuoteCaptured={(payload) => {
                setCollectedData((prev) => ({ ...prev, ...payload }));
              }}
              onRedirectReady={(url, summary) => {
                setWhatsappUrl(url);
                setSummaryText(summary);
              }}
              emergencyActive={emergencyActive}
              collectedData={collectedData}
              whatsappUrl={whatsappUrl}
              summaryText={summaryText}
            />
          </LiveKitRoom>
        )}
      </div>
    </div>
  );
}