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

function readStoredMessages(): ChatMessage[] {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return [createGreeting()];
    const parsed: unknown = JSON.parse(stored);
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      parsed.length <= MAX_HISTORY &&
      parsed.every(
        (message) =>
          message &&
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          typeof message.id === "string",
      )
    ) {
      return parsed as ChatMessage[];
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
    setMessages(readStoredMessages());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY)));
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
