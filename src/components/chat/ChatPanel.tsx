"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, RotateCcw, ShieldCheck, Square, X } from "lucide-react";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { QuickReplies } from "@/components/chat/QuickReplies";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { useChat } from "@/components/chat/useChat";

const MAX_MESSAGE_LENGTH = 1000;
const COUNTER_THRESHOLD = 800; // only show the character counter when it matters
const MAX_INPUT_HEIGHT = 120;

const FOCUSABLE =
  'button:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])';

export function ChatPanel({
  onClose,
  onHandoff,
}: {
  onClose: () => void;
  onHandoff: () => void;
}) {
  const { messages, isThinking, sendMessage, stopReply, restart } = useChat();
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const wasThinking = useRef(false);

  const showQuickReplies = !messages.some((message) => message.role === "user");
  const showCounter = draft.length >= COUNTER_THRESHOLD;
  const canSend = draft.trim().length > 0;

  // Focus input on open, and give focus back to the trigger on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, []);

  // Lock page scroll while the chat is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Smoothly follow new messages.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  // The textarea is disabled while the assistant replies, which drops focus.
  // Put it back as soon as the reply finishes.
  useEffect(() => {
    if (wasThinking.current && !isThinking) inputRef.current?.focus();
    wasThinking.current = isThinking;
  }, [isThinking]);

  const resetInputHeight = () => {
    if (inputRef.current) inputRef.current.style.height = "auto";
  };

  const send = useCallback(
    (text = draft) => {
      if (sendMessage(text)) {
        setDraft("");
        resetInputHeight();
      }
    },
    [draft, sendMessage],
  );

  // Escape to close + focus trap.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!dialogRef.current.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleChange = (value: string) => {
    setDraft(value.slice(0, MAX_MESSAGE_LENGTH));
    const input = inputRef.current;
    if (input) {
      input.style.height = "auto";
      input.style.height = `${Math.min(input.scrollHeight, MAX_INPUT_HEIGHT)}px`;
    }
  };

  return (
    <div className="vv-chat fixed inset-0 z-[55]">
      <style>{`
        .vv-chat { --vv-brand: #006766; --vv-brand-dark: #004f4e; --vv-brand-soft: #e6f2f1; }
        @keyframes vv-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes vv-sheet {
          from { opacity: 0; transform: translateY(24px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        @keyframes vv-pop {
          from { opacity: 0; transform: translateY(16px) scale(.96) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }
        @keyframes vv-ping {
          0%   { transform: scale(1); opacity: .7 }
          80%, 100% { transform: scale(2.4); opacity: 0 }
        }
        .vv-backdrop { animation: vv-fade .2s ease-out both }
        .vv-panel { animation: vv-sheet .28s cubic-bezier(.2,.8,.2,1) both }
        @media (min-width: 640px) {
          .vv-panel { transform-origin: bottom right; animation-name: vv-pop }
        }
        .vv-ping { animation: vv-ping 2s cubic-bezier(0,0,.2,1) infinite }
        .vv-log { scrollbar-width: thin; scrollbar-color: #c9d6d4 transparent }
        .vv-log::-webkit-scrollbar { width: 6px }
        .vv-log::-webkit-scrollbar-thumb { background: #c9d6d4; border-radius: 9999px }
        @media (prefers-reduced-motion: reduce) {
          .vv-backdrop, .vv-panel, .vv-ping { animation: none !important }
          .vv-log { scroll-behavior: auto }
        }
      `}</style>

      {/* Backdrop: dimmed on mobile, invisible click-catcher on desktop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="vv-backdrop absolute inset-0 bg-zinc-950/40 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-0"
      />

      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vv-chat-title"
        className="vv-panel fixed inset-0 z-[56] flex min-h-0 flex-col overflow-hidden bg-[#f6f9f8] pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] sm:inset-auto sm:bottom-20 sm:right-4 sm:h-[min(640px,calc(100dvh-6rem))] sm:w-[min(400px,calc(100vw-2rem))] sm:rounded-[28px] sm:pb-0 sm:pt-0 sm:shadow-[0_24px_60px_-12px_rgba(0,40,40,0.35),0_0_0_1px_rgba(0,0,0,0.06)] md:right-6"
      >
        {/* Header */}
        <header className="relative shrink-0 overflow-hidden bg-gradient-to-br from-[#007c7a] via-[#006766] to-[#004f4e] px-4 py-4 text-white sm:px-5">
          {/* decorative glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl"
          />
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative shrink-0">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/25 bg-white/15 text-[13px] font-black tracking-wider shadow-inner backdrop-blur">
                  VV
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                  <span className="vv-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300" />
                  <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-[#006766] bg-emerald-300" />
                </span>
              </div>
              <div className="min-w-0">
                <h2
                  id="vv-chat-title"
                  className="truncate text-[15px] font-bold leading-tight tracking-tight"
                >
                  Virtual Velocity
                </h2>
                <p className="mt-0.5 text-xs text-white/80">
                  AI assistant · Online
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={restart}
                aria-label="Restart chat"
                title="Restart chat"
                className="rounded-xl p-2.5 text-white/90 transition-colors hover:bg-white/15 active:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close chat"
                title="Close chat"
                className="rounded-xl p-2.5 text-white/90 transition-colors hover:bg-white/15 active:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>
        </header>

        {/* Conversation */}
        <div
          ref={logRef}
          role="log"
          aria-label="Conversation"
          aria-live="polite"
          aria-relevant="additions text"
          data-lenis-prevent
          className="vv-log min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-[radial-gradient(circle_at_top,#ffffff,transparent_60%)] px-4 py-5 sm:px-5"
        >
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onHandoff={onHandoff}
            />
          ))}
          {showQuickReplies && <QuickReplies onSelect={(text) => send(text)} />}
          {isThinking && <TypingIndicator />}
        </div>

        {/* Composer */}
        <div className="shrink-0 border-t border-zinc-200/80 bg-white px-3 pb-3 pt-3 sm:px-4">
          <div className="flex items-end gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-1.5 transition-all focus-within:border-[#006766] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(0,103,102,0.12)]">
            <label htmlFor="vv-chat-input" className="sr-only">
              Ask Virtual Velocity a question
            </label>
            <textarea
              id="vv-chat-input"
              ref={inputRef}
              value={draft}
              onChange={(event) => handleChange(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();
                  send();
                }
              }}
              maxLength={MAX_MESSAGE_LENGTH}
              rows={1}
              disabled={isThinking}
              placeholder={
                isThinking ? "Virtual Velocity is replying…" : "Ask a question…"
              }
              data-chat-focusable
              className="max-h-[120px] min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2.5 text-base leading-5 text-zinc-900 outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-60 md:text-sm"
            />

            {isThinking ? (
              <button
                type="button"
                onClick={stopReply}
                aria-label="Stop response"
                title="Stop response"
                className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white transition-all hover:bg-zinc-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006766] focus-visible:ring-offset-2"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => send()}
                disabled={!canSend}
                aria-label="Send message"
                title="Send message"
                className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#007c7a] to-[#005a59] text-white shadow-sm transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:from-zinc-200 disabled:to-zinc-200 disabled:text-zinc-400 disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006766] focus-visible:ring-offset-2"
              >
                <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.5} />
              </button>
            )}
          </div>

          <div className="mt-2.5 flex items-center justify-between gap-3 px-1">
            <p className="flex min-w-0 items-center gap-1.5 text-[11px] leading-snug text-zinc-500">
              <ShieldCheck
                className="h-3.5 w-3.5 shrink-0 text-[#006766]"
                aria-hidden="true"
              />
              <span>
                Don’t share passwords or sensitive details.{" "}
                <a
                  href="/privacy-policy"
                  className="font-semibold text-[#006766] underline decoration-[#006766]/30 underline-offset-2 transition-colors hover:decoration-[#006766] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006766] rounded-sm"
                >
                  Privacy
                </a>
              </span>
            </p>
            {showCounter && (
              <span
                className={`shrink-0 text-[11px] tabular-nums ${
                  draft.length >= MAX_MESSAGE_LENGTH
                    ? "font-semibold text-red-600"
                    : "text-zinc-500"
                }`}
                aria-live="polite"
              >
                {draft.length}/{MAX_MESSAGE_LENGTH}
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
