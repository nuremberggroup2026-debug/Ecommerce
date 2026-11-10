"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { MAX_MESSAGE_LENGTH } from "@/lib/ai/constants";

interface ChatInputProps {
  isLoading: boolean;
  onSend: (message: string) => void;
  onStop: () => void;
}

export function ChatInput({ isLoading, onSend, onStop }: ChatInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const locale = useLocale();
  const isOverLimit = text.length > MAX_MESSAGE_LENGTH;
  const isNearLimit = text.length >= MAX_MESSAGE_LENGTH * 0.8;

  const placeholder =
    locale === "ar"
      ? "اسأل أورا عن أي منتج..."
      : "Ask Aura about any product...";

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120,
      )}px`;
    }
  }, [text]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isLoading) {
      onStop();
      return;
    }
    const trimmed = text.trim();
    if (!trimmed || isOverLimit) return;
    onSend(trimmed);
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 border-t border-border/80 bg-background/95 backdrop-blur-xs"
    >
      <div className="relative flex items-end gap-2 bg-muted/50 border border-border rounded-2xl p-1.5 focus-within:border-black/50 dark:focus-within:border-white/50 focus-within:ring-1 focus-within:ring-black/10 transition-all">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={MAX_MESSAGE_LENGTH}
          rows={1}
          className="flex-1 bg-transparent px-3 py-2 text-sm resize-none focus:outline-hidden max-h-32 text-foreground placeholder:text-muted-foreground/60 leading-relaxed"
        />

        {isLoading ? (
          <Button
            type="button"
            size="icon"
            onClick={onStop}
            className="h-8 w-8 rounded-xl bg-black hover:bg-neutral-800 text-white shrink-0 cursor-pointer shadow-xs"
            aria-label="Stop generating"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            disabled={!text.trim() || isOverLimit}
            className="h-8 w-8 rounded-xl bg-black hover:bg-neutral-800 text-white disabled:opacity-30 shrink-0 cursor-pointer transition-all duration-200 shadow-xs"
            aria-label="Send message"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        )}
      </div>
     
      <div className="flex items-center justify-between text-[11px] px-1 mt-1.5">
        {isOverLimit ? (
          <span className="text-red-500 font-medium">
            {locale === "ar"
              ? `تجاوزت الحد المسموح (${MAX_MESSAGE_LENGTH} حرف). يُرجى تقصير الرسالة.`
              : `Character limit exceeded (max ${MAX_MESSAGE_LENGTH}). Please shorten your message.`}
          </span>
        ) : (
          <span className="text-muted-foreground/60">
            {locale === "ar"
              ? "قد تُخطئ أورا في بعض التفاصيل، يُرجى التأكد من المواصفات."
              : "Aura can make mistakes. Verify product specs on the page."}
          </span>
        )}
        {/* Counter (shows when approaching or exceeding the limit) */}
        {isNearLimit && (
          <span
            className={`text-[10px] font-mono shrink-0 ms-2 ${
              isOverLimit ? "text-red-500 font-bold" : "text-muted-foreground"
            }`}
          >
            {text.length}/{MAX_MESSAGE_LENGTH}
          </span>
        )}
      </div>
    </form>
  );
}
