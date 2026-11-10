"use client";

import { useLocale } from "next-intl";

interface QuickPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const PROMPTS = {
  en: [
    "What are the best-selling products?",
    "Show me comfortable hoodies under $50",
    "Do you have new arrivals?",
   
  ],
  ar: [
    "ما هي المنتجات الأكثر مبيعاً؟",
    "اعرض هوديات مريحة بأقل من 50 دولار",
    "هل توجد تشكيلة جديدة حالياً؟",
   
  ],
};

export function QuickPrompts({ onSelectPrompt }: QuickPromptsProps) {
  const locale = useLocale() as "en" | "ar";
  const suggestions = PROMPTS[locale] || PROMPTS.en;

  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {suggestions.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onSelectPrompt(prompt)}
          className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-start cursor-pointer shadow-xs"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}