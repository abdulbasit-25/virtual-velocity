"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatPanel = dynamic(
  () =>
    import("@/components/chat/ChatPanel").then((module) => module.ChatPanel),
  { ssr: false },
);

const OPEN_KEY = "vv-chat-open";
const TEASER_KEY = "vv-chat-teaser-seen";
const TEASER_DELAY_MS = 8000;

function readSessionFlag(key: string) {
  try {
    return sessionStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

function writeSessionFlag(key: string, value: boolean) {
  try {
    sessionStorage.setItem(key, String(value));
  } catch {
    // The widget remains usable without browser storage.
  }
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsOpen(readSessionFlag(OPEN_KEY));
      setIsReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    writeSessionFlag(OPEN_KEY, isOpen);
  }, [isOpen, isReady]);

  useEffect(() => {
    if (!isReady || isOpen || readSessionFlag(TEASER_KEY)) return;
    const timeout = window.setTimeout(
      () => setShowTeaser(true),
      TEASER_DELAY_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [isOpen, isReady]);

  const dismissTeaser = useCallback(() => {
    writeSessionFlag(TEASER_KEY, true);
    setShowTeaser(false);
  }, []);

  const openChat = () => {
    dismissTeaser();
    setIsOpen(true);
  };

  const closeChat = useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  return (
    <>
      <style>{`
        @keyframes vw-rise {
          from { opacity: 0; transform: translateY(10px) scale(.96) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }
        @keyframes vw-halo {
          0%   { transform: scale(1);   opacity: .45 }
          70%  { transform: scale(1.7); opacity: 0 }
          100% { transform: scale(1.7); opacity: 0 }
        }
        .vw-teaser { animation: vw-rise .35s cubic-bezier(.2,.8,.2,1) both; transform-origin: bottom right }
        .vw-halo   { animation: vw-halo 2.8s ease-out infinite }
        @media (prefers-reduced-motion: reduce) {
          .vw-teaser, .vw-halo { animation: none !important }
        }
      `}</style>

      <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {showTeaser && !isOpen && (
          <div
            role="status"
            className="vw-teaser pointer-events-auto relative flex max-w-[min(18rem,calc(100vw-2rem))] items-center gap-1 rounded-2xl border border-zinc-200/80 bg-white py-1.5 pl-1.5 pr-1 shadow-[0_12px_32px_-8px_rgba(0,40,40,0.28)]"
          >
            <button
              type="button"
              onClick={openChat}
              className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-left text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006766]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#007c7a] to-[#004f4e] text-[10px] font-black tracking-wider text-white">
                VV
              </span>
              <span className="leading-snug">
                Questions?{" "}
                <span className="text-[#006766]">Ask me anything.</span>
              </span>
            </button>
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label="Dismiss chat suggestion"
              className="shrink-0 self-start rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006766]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            {/* speech-bubble tail pointing at the launcher */}
            <span
              aria-hidden="true"
              className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-zinc-200/80 bg-white"
            />
          </div>
        )}

        <button
          ref={launcherRef}
          type="button"
          onClick={isOpen ? closeChat : openChat}
          aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className="group pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#008583] via-[#006766] to-[#004f4e] text-white shadow-[0_10px_28px_-6px_rgba(0,80,78,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-6px_rgba(0,80,78,0.6),inset_0_1px_0_rgba(255,255,255,0.25)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#006766]/35 active:translate-y-0 active:scale-95 motion-reduce:transition-none"
        >
          {!isOpen && (
            <span
              aria-hidden="true"
              className="vw-halo absolute inset-0 rounded-full bg-[#006766]"
            />
          )}

          {/* Cross-fading, rotating icons */}
          <MessageCircle
            aria-hidden="true"
            className={`absolute h-6 w-6 transition-all duration-300 motion-reduce:transition-none ${
              isOpen
                ? "rotate-90 scale-50 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <X
            aria-hidden="true"
            className={`absolute h-6 w-6 transition-all duration-300 motion-reduce:transition-none ${
              isOpen
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-50 opacity-0"
            }`}
          />
        </button>
      </div>

      {isOpen && <ChatPanel onClose={closeChat} onHandoff={closeChat} />}
    </>
  );
}
