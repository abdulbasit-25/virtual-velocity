"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  RotateCcw,
  ShieldCheck,
  Square,
  X,
} from "lucide-react";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { QuickReplies } from "@/components/chat/QuickReplies";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { useChat } from "@/components/chat/useChat";

const MAX_MESSAGE_LENGTH = 1000;

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
  const showQuickReplies = !messages.some((message) => message.role === "user");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, isThinking]);

  const send = useCallback(
    (text = draft) => {
      if (sendMessage(text)) {
        setDraft("");
        if (inputRef.current) inputRef.current.style.height = "auto";
      }
    },
    [draft, sendMessage],
  );

  useEffect(() => {
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not(:disabled), textarea:not(:disabled), a[href]',
        ),
      ).filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [onClose]);

  const resizeInput = (value: string) => {
    setDraft(value.slice(0, MAX_MESSAGE_LENGTH));
    const input = inputRef.current;
    if (input) {
      input.style.height = "auto";
      input.style.height = `${Math.min(input.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="fixed inset-0 z-[55] bg-zinc-950/30 backdrop-blur-[2px] sm:bg-transparent sm:backdrop-blur-0">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0"
      />
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vv-chat-title"
        className="fixed inset-x-0 top-0 bottom-auto z-[56] flex h-dvh min-h-0 flex-col overflow-hidden border-0 border-zinc-200 bg-[#f7faf9] pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] shadow-2xl sm:inset-x-auto sm:top-auto sm:bottom-20 sm:right-4 sm:h-[min(600px,calc(100dvh-6rem))] sm:w-[min(380px,calc(100vw-2rem))] sm:rounded-3xl sm:border sm:pb-0 sm:pt-0 md:right-6"
      >
        <header className="flex shrink-0 items-center justify-between gap-3 bg-[#006766] px-4 py-4 text-white sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xs font-black tracking-wider">
              VV
            </span>
            <div className="min-w-0">
              <h2 id="vv-chat-title" className="truncate text-sm font-bold">
                Virtual Velocity
              </h2>
              <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                AI assistant
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={restart}
              aria-label="Restart chat"
              title="Restart chat"
              className="rounded-lg p-2 text-white/90 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close chat"
              title="Close chat"
              className="rounded-lg p-2 text-white/90 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div
          ref={logRef}
          role="log"
          aria-label="Conversation"
          aria-live="polite"
          aria-relevant="additions text"
          className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5 sm:px-5"
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

        <div className="shrink-0 border-t border-zinc-200 bg-white/95 px-3 pb-3 pt-3 sm:px-4">
          <div className="flex items-end gap-2 rounded-2xl border border-zinc-300 bg-white p-2 focus-within:border-emerald-800 focus-within:ring-2 focus-within:ring-emerald-800/15">
            <label htmlFor="vv-chat-input" className="sr-only">
              Ask Virtual Velocity a question
            </label>
            <textarea
              id="vv-chat-input"
              ref={inputRef}
              value={draft}
              onChange={(event) => resizeInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  send();
                }
              }}
              maxLength={MAX_MESSAGE_LENGTH}
              rows={1}
              disabled={isThinking}
              placeholder="Ask a question…"
              data-chat-focusable
              className="max-h-[120px] min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-base leading-5 text-zinc-900 outline-none placeholder:text-zinc-500 disabled:opacity-60 md:text-sm"
            />
            {isThinking ? (
              <button
                type="button"
                onClick={stopReply}
                aria-label="Stop response"
                className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
              >
                <Square className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => send()}
                disabled={!draft.trim()}
                aria-label="Send message"
                className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#006766] text-white transition-colors hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between gap-2 px-1">
            <p className="flex items-center gap-1 text-[10px] text-zinc-600">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              Don’t share passwords or sensitive details.
              <a
                href="/privacy-policy"
                className="font-semibold text-emerald-900 underline underline-offset-2"
              >
                Privacy
              </a>
            </p>
            <span className="shrink-0 text-[10px] tabular-nums text-zinc-500">
              {draft.length}/{MAX_MESSAGE_LENGTH}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
