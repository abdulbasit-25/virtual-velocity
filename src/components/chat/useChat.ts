"use client";

import { useCallback, useEffect, useState } from "react";
import { getAssistantReply, type ChatAction } from "@/lib/chat/reply";

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  actions?: ChatAction[];
};

const STORAGE_KEY = "vv-chat-messages";
const MAX_HISTORY = 20;
const MAX_MESSAGE_LENGTH = 1000;

const createGreeting = (): ChatMessage => ({
  id: "greeting",
  role: "assistant",
  content:
    "Hi! I’m Virtual Velocity’s AI assistant. Ask me about our services, work, or how to get started.",
  actions: [{ label: "Explore services", href: "/services" }],
});

function isStoredMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Partial<ChatMessage>;
  const validActions =
    message.actions === undefined ||
    (Array.isArray(message.actions) &&
      message.actions.every((action) => {
        if (!action || typeof action !== "object") return false;
        const candidate = action as Partial<ChatAction>;
        const safeHref =
          typeof candidate.href === "string" &&
          ((candidate.href.startsWith("/") &&
            !candidate.href.startsWith("//") &&
            !candidate.href.startsWith("/\\")) ||
            candidate.href.startsWith("mailto:") ||
            candidate.href.startsWith("tel:"));
        return (
          typeof candidate.label === "string" &&
          safeHref &&
          (candidate.external === undefined ||
            typeof candidate.external === "boolean")
        );
      }));

  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.length <= MAX_MESSAGE_LENGTH * 2 &&
    typeof message.id === "string" &&
    validActions
  );
}

function readStoredMessages(): ChatMessage[] {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return [createGreeting()];
    const parsed: unknown = JSON.parse(stored);
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      parsed.length <= MAX_HISTORY &&
      parsed.every(isStoredMessage)
    ) {
      return parsed;
    }
    return [createGreeting()];
  } catch {
    return [createGreeting()];
  }
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([createGreeting()]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [pendingTimeout, setPendingTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMessages(readStoredMessages());
      setIsHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(messages.slice(-MAX_HISTORY)),
        );
      } catch {
        // Keep the conversation available in memory if session storage is unavailable.
      }
    }
  }, [isHydrated, messages]);

  useEffect(
    () => () => {
      if (pendingTimeout) clearTimeout(pendingTimeout);
    },
    [pendingTimeout],
  );

  const sendMessage = useCallback(
    (rawMessage: string) => {
      const content = rawMessage.trim().slice(0, MAX_MESSAGE_LENGTH);
      if (!content || isThinking) return false;

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content,
      };
      const answer = getAssistantReply(content);
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: answer.text,
        actions: answer.actions,
      };

      setMessages((current) => [...current, userMessage].slice(-MAX_HISTORY));
      setIsThinking(true);
      const timeout = setTimeout(() => {
        setMessages((current) => [...current, assistantMessage].slice(-MAX_HISTORY));
        setIsThinking(false);
        setPendingTimeout(null);
      }, 320);
      setPendingTimeout(timeout);
      return true;
    },
    [isThinking],
  );

  const stopReply = useCallback(() => {
    if (pendingTimeout) clearTimeout(pendingTimeout);
    setPendingTimeout(null);
    setIsThinking(false);
  }, [pendingTimeout]);

  const restart = useCallback(() => {
    stopReply();
    setMessages([createGreeting()]);
  }, [stopReply]);

  return {
    messages,
    isThinking,
    sendMessage,
    stopReply,
    restart,
  };
}
