"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import type { ChatMessage } from "@/components/chat/useChat";

const FEEDBACK_KEY = "vv-chat-feedback-counts";
type Feedback = "helpful" | "not-helpful";

function recordFeedback(feedback: Feedback) {
  try {
    const saved = localStorage.getItem(FEEDBACK_KEY);
    const counts: Record<Feedback, number> = saved
      ? JSON.parse(saved)
      : { helpful: 0, "not-helpful": 0 };
    const updated = {
      helpful: Number(counts.helpful) || 0,
      "not-helpful": Number(counts["not-helpful"]) || 0,
    };
    updated[feedback] += 1;
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
  } catch {
    // Keep the chat usable if browser storage is unavailable.
  }
}

const iconButton =
  "flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white hover:text-zinc-800 hover:shadow-sm disabled:cursor-default disabled:hover:bg-transparent disabled:hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006766]";

export function MessageBubble({
  message,
  onHandoff,
}: {
  message: ChatMessage;
  onHandoff: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const copyTimer = useRef<number>();
  const isAssistant = message.role === "assistant";

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const submitFeedback = (value: Feedback) => {
    if (feedback) return;
    recordFeedback(value);
    setFeedback(value);
  };

  return (
    <article
      className={`vv-msg flex items-end gap-2 ${
        isAssistant ? "justify-start" : "justify-end"
      }`}
    >
      {isAssistant && (
        <span
          aria-hidden="true"
          className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#007c7a] to-[#004f4e] text-[9px] font-black tracking-wider text-white shadow-sm"
        >
          VV
        </span>
      )}

      <div
        className={`flex min-w-0 max-w-[84%] flex-col ${
          isAssistant ? "items-start" : "items-end"
        }`}
      >
        <div
          className={`whitespace-pre-wrap break-words px-4 py-2.5 text-sm leading-relaxed ${
            isAssistant
              ? "rounded-2xl rounded-bl-md border border-zinc-200/70 bg-white text-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              : "rounded-2xl rounded-br-md bg-gradient-to-br from-[#007c7a] to-[#005a59] text-white shadow-[0_4px_12px_-4px_rgba(0,80,78,0.45)]"
          }`}
        >
          {isAssistant && <span className="sr-only">Assistant: </span>}
          {message.content}
        </div>

        {isAssistant && message.actions?.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.actions.map((action) => (
              <a
                key={`${action.href}-${action.label}`}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                onClick={() => {
                  if (
                    action.href.startsWith("mailto:") ||
                    action.href.startsWith("tel:")
                  ) {
                    onHandoff();
                  }
                }}
                className="rounded-full border border-[#006766]/25 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#006766] shadow-sm transition-all hover:border-[#006766] hover:bg-[#006766] hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006766] focus-visible:ring-offset-1"
              >
                {action.label}
              </a>
            ))}
          </div>
        ) : null}

        {isAssistant && message.id !== "greeting" ? (
          <div className="mt-1.5 flex items-center gap-0.5 text-zinc-500">
            <button
              type="button"
              onClick={copyMessage}
              aria-label={copied ? "Copied reply" : "Copy reply"}
              title={copied ? "Copied" : "Copy reply"}
              className={iconButton}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-700" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
            <span className="mx-1.5 h-3 w-px bg-zinc-300" aria-hidden="true" />
            {feedback ? (
              <span className="px-1 text-[11px] font-medium text-[#006766]">
                Thanks for your feedback
              </span>
            ) : (
              <span className="px-1 text-[11px]">Was this helpful?</span>
            )}
            <button
              type="button"
              onClick={() => submitFeedback("helpful")}
              aria-label="Yes, this was helpful"
              aria-pressed={feedback === "helpful"}
              disabled={feedback !== null}
              className={`${iconButton} ${
                feedback === "helpful" ? "!text-[#006766]" : ""
              } ${feedback === "not-helpful" ? "opacity-40" : ""}`}
            >
              <ThumbsUp
                className={`h-3.5 w-3.5 ${
                  feedback === "helpful" ? "fill-[#006766]/20" : ""
                }`}
              />
            </button>
            <button
              type="button"
              onClick={() => submitFeedback("not-helpful")}
              aria-label="No, this was not helpful"
              aria-pressed={feedback === "not-helpful"}
              disabled={feedback !== null}
              className={`${iconButton} ${
                feedback === "not-helpful" ? "!text-[#006766]" : ""
              } ${feedback === "helpful" ? "opacity-40" : ""}`}
            >
              <ThumbsDown
                className={`h-3.5 w-3.5 ${
                  feedback === "not-helpful" ? "fill-[#006766]/20" : ""
                }`}
              />
            </button>
            <span className="sr-only" role="status">
              {feedback ? "Thanks for your feedback." : ""}
            </span>
          </div>
        ) : null}
      </div>
    </article>
  );
}
