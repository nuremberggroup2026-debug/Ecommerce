"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
import { useLocale } from "next-intl";
import { ChatSheet } from "./ChatSheet";

export function AuraChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 ${
          isArabic ? "left-6" : "right-6"
        } z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-black text-white hover:bg-neutral-900 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-neutral-800`}
        aria-label="Open AI Shopping Assistant"
      >
        <Bot className="w-5 h-5 group-hover:rotate-6 transition-transform" />
        <span className="text-xs font-semibold tracking-wide">
          {isArabic ? "مساعد التسوق" : "Ask Aura"}
        </span>
      </button>

      {/* Slide-over Drawer */}
      <ChatSheet isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
