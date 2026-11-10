"use client";

import { Sparkles } from "lucide-react";

interface ChatToolStatusProps {
  status: string;
}

export function ChatToolStatus({ status }: ChatToolStatusProps) {
  return (
    <div className="flex items-center gap-2 py-2 px-3 text-xs text-muted-foreground bg-muted/40 rounded-lg w-fit border border-border/50 animate-pulse">
      <Sparkles
        className="w-3.5 h-3.5 text-primary animate-spin"
        style={{ animationDuration: "3s" }}
      />
      <span>{status}</span>
    </div>
  );
}
