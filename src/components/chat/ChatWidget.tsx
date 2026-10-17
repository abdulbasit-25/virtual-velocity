"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatPanel = dynamic(
  () => import("@/components/chat/ChatPanel").then((module) => module.ChatPanel),
  { ssr: false },
);

const OPEN_KEY = "vv-chat-open";
const TEASER_KEY = "vv-chat-teaser-seen";

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
    const timeout = window.setTimeout(() => setShowTeaser(true), 8000);
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
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {showTeaser && !isOpen && (
          <div className="flex max-w-[min(18rem,calc(100vw-2rem))] items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm font-medium text-zinc-800 shadow-xl">
            <span>Questions? Ask me anything.</span>
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label="Dismiss chat suggestion"
              className="rounded-md p-1 text-zinc-600 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <button
          ref={launcherRef}
          type="button"
          onClick={isOpen ? closeChat : openChat}
          aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#006766] text-white shadow-xl shadow-emerald-950/25 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-800/30 active:scale-95 motion-reduce:transition-none sm:h-14 sm:w-14"
        >
          {!isOpen && (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-2 border-emerald-500 motion-safe:animate-ping motion-reduce:animate-none"
            />
          )}
          {isOpen ? (
            <X className="relative h-6 w-6" aria-hidden="true" />
          ) : (
            <MessageCircle className="relative h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>
      {isOpen && (
        <ChatPanel
          onClose={closeChat}
          onHandoff={closeChat}
        />
      )}
    </>
  );
}
