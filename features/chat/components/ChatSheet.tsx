"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useLocale } from "next-intl";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useShoppingAssistant } from "../hooks/useShoppingAssistant";

interface ChatSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatSheet({ isOpen, onOpenChange }: ChatSheetProps) {
  const locale = useLocale();
  const side = locale === "ar" ? "left" : "right";

  const {
    messages,
    isLoading,
    statusMessage,
    sendMessage,
    stopGeneration,
    clearConversation,
  } = useShoppingAssistant();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        showCloseButton={
          false
        } /* 👈 Stops the default X from overlapping the AI icon */
        className="p-0 sm:max-w-md w-full h-full flex flex-col gap-0 border-border bg-background"
      >
        {/* Header with New Chat + Close button */}
        <ChatHeader
          onClear={clearConversation}
          disabled={messages.length === 0 || isLoading}
        />

        {/* Message Viewport */}
        <ChatMessages
          messages={messages}
          statusMessage={statusMessage}
          isLoading={isLoading}
          onSelectPrompt={sendMessage}
        />

        {/* Composer Input */}
        <ChatInput
          isLoading={isLoading}
          onSend={sendMessage}
          onStop={stopGeneration}
        />
      </SheetContent>
    </Sheet>
  );
}
