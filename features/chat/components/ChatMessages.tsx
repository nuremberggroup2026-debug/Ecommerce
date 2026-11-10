"use client";

import { useEffect, useRef } from "react";
import { Bot } from "lucide-react";
import { useLocale } from "next-intl";
import { ChatMessageItem } from "./ChatMessageItem";
import { ChatToolStatus } from "./ChatToolStatus";
import { QuickPrompts } from "./QuickPrompts";
import type { Message } from "../types/index";

interface ChatMessagesProps {
  messages: Message[];
  statusMessage: string | null;
  isLoading: boolean;
  onSelectPrompt: (prompt: string) => void;
}

export function ChatMessages({
  messages,
  statusMessage,
  isLoading,
  onSelectPrompt,
}: ChatMessagesProps) {
  const locale = useLocale();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 1. Never scroll when there are no messages
  useEffect(() => {
    if (messages.length > 0 || statusMessage) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, statusMessage]);

  return (
    // 2. min-h-0 allows proper shrinking; flex flex-col enables my-auto centering
    <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col">
      {messages.length === 0 ? (
        // 3. my-auto centers the block vertically with ZERO height overflow
        <div className="my-auto flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-foreground flex items-center justify-center border border-border shadow-xs">
            <Bot className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-base">
              {locale === "ar"
                ? "أورا - مساعد التسوق"
                : "Aura Shopping Assistant"}
            </h3>
            <p className="text-xs text-muted-foreground max-w-xs">
              {locale === "ar"
                ? "اسأل عن ترشيحات المنتجات، المقاسات، الأقمشة، أو تحقق مما هو متوفر حالياً."
                : "Ask about product recommendations, sizes, fabrics, or check what’s currently in stock."}
            </p>
          </div>
          <QuickPrompts onSelectPrompt={onSelectPrompt} />
        </div>
      ) : (
        // 4. Message list and bottom scroll anchor only render when there are messages
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessageItem key={message.id} message={message} />
          ))}

          {statusMessage && <ChatToolStatus status={statusMessage} />}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
