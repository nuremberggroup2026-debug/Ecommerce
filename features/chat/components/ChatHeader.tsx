"use client";

import { Bot, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { useLocale } from "next-intl";

interface ChatHeaderProps {
  onClear: () => void;
  disabled: boolean;
}

export function ChatHeader({ onClear, disabled }: ChatHeaderProps) {
  const locale = useLocale();

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border/80 bg-background/95 backdrop-blur-xs">
      {/* Start side: AI Avatar & Info */}
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <span className="absolute -bottom-0.5 -end-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-background" />
        </div>
        <div>
          <h2 className="text-sm font-semibold leading-tight">
            {locale === "ar" ? "أورا - المساعد الذكي" : "Aura Assistant"}
          </h2>
          
        </div>
      </div>

      {/* Opposite side: "New Chat" button + Close button */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          disabled={disabled}
          className="h-8 gap-1.5 px-2.5 text-xs rounded-lg border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 text-foreground cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{locale === "ar" ? "محادثة جديدة" : "New Chat"}</span>
        </Button>

        <SheetClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </Button>
        </SheetClose>
      </div>
    </div>
  );
}
