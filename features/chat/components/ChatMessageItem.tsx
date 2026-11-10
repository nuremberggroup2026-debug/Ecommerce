"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Message } from "../types/index";

interface ChatMessageItemProps {
  message: Message;
}

export function ChatMessageItem({ message }: ChatMessageItemProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 text-sm leading-relaxed",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar Icon */}
      <div
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs shadow-xs",
          isUser
            ? "bg-black text-white"
            : "bg-muted border border-border text-foreground",
        )}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5" />
        ) : (
          <Bot className="w-3.5 h-3.5" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 shadow-xs",
          isUser
            ? "bg-black text-white rounded-tr-xs"
            : "bg-muted/60 border border-border/60 text-foreground rounded-tl-xs",
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-2">
            <ReactMarkdown
              components={{
                a: ({ href, children }) => {
                  if (!href) return <span>{children}</span>;
                  return (
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1 font-semibold text-black dark:text-white underline underline-offset-2 hover:opacity-75 transition-opacity"
                    >
                      {children}
                    </Link>
                  );
                },
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc ps-4 space-y-1 my-1">{children}</ul>
                ),
                li: ({ children }) => <li className="text-sm">{children}</li>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
