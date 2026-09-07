import React from "react";
import { cn } from "@/lib/utils";

interface SectionSeparatorProps {
  title: string;
  suffix?: string;
  className?: string;
  id?: string;
}

export function SectionSeparator({
  title,
  suffix,
  className,
  id,
}: SectionSeparatorProps) {
  return (
    <div
      id={id}
      className={cn(
        "mx-auto w-full max-w-7xl px-6 lg:px-10 my-10 sm:my-14",
        className
      )}
    >
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <div className="h-0.5 flex-1 bg-neutral-200 " />
        <h2 className="shrink-0 text-center text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.25em] text-neutral-900 select-none">
          <span>{title}</span>
          {suffix && (
            <span className="ms-2 font-normal text-neutral-400">
              {suffix}
            </span>
          )}
        </h2>
        <div className="h-0.5 flex-1 bg-neutral-200" />
      </div>
    </div>
  );
}

export default SectionSeparator;
