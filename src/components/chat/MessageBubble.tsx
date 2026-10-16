"use client";

import { useState } from "react";
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

export function MessageBubble({
  message,
  onHandoff,
}: {
  message: ChatMessage;
  onHandoff: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const isAssistant = message.role === "assistant";

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
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
    <article className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[88%] ${isAssistant ? "items-start" : "items-end"} flex flex-col`}>
        <div
          className={`whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isAssistant
              ? "rounded-bl-md bg-white text-zinc-800 shadow-sm"
              : "rounded-br-md bg-[#006766] text-white"
          }`}
        >
          {isAssistant && (
            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-800">
              VV assistant
            </span>
          )}
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
                  if (action.href.startsWith("mailto:") || action.href.startsWith("tel:")) {
                    onHandoff();
                  }
                }}
                className="rounded-full border border-emerald-800/25 bg-white px-3 py-1.5 text-xs font-bold text-emerald-900 underline-offset-2 hover:bg-emerald-50 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
              >
                {action.label}
              </a>
            ))}
          </div>
        ) : null}

        {isAssistant && message.id !== "greeting" ? (
          <div className="mt-2 flex items-center gap-1 text-zinc-500">
            <button
              type="button"
              onClick={copyMessage}
              aria-label={copied ? "Copied reply" : "Copy reply"}
              className="rounded-md p-1.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            <span className="mx-1 text-[11px]">Was this helpful?</span>
            <button
              type="button"
              onClick={() => submitFeedback("helpful")}
              aria-label="Yes, this was helpful"
              aria-pressed={feedback === "helpful"}
              disabled={feedback !== null}
              className="rounded-md p-1.5 hover:bg-white disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
            >
              <ThumbsUp className={`h-3.5 w-3.5 ${feedback === "helpful" ? "text-emerald-800" : ""}`} />
            </button>
            <button
              type="button"
              onClick={() => submitFeedback("not-helpful")}
              aria-label="No, this was not helpful"
              aria-pressed={feedback === "not-helpful"}
              disabled={feedback !== null}
              className="rounded-md p-1.5 hover:bg-white disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
            >
              <ThumbsDown className={`h-3.5 w-3.5 ${feedback === "not-helpful" ? "text-emerald-800" : ""}`} />
            </button>
            {feedback && <span className="sr-only">Thanks for your feedback.</span>}
          </div>
        ) : null}
      </div>
    </article>
  );
}
