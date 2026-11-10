"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Message } from "../types/index";
import { useChatSession } from "./useChatSession";
import { sendChatMessageStream, getChatHistory } from "../api/chat.client.api";
import { MAX_MESSAGE_LENGTH } from "@/lib/ai/constants";

export function useShoppingAssistant() {
  const { sessionId, resetSession } = useChatSession();
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!sessionId) return;
    let isMounted = true;
    setIsLoadingHistory(true);
    getChatHistory(sessionId)
      .then((history) => {
        console.log("history", history);
        console.log("sessionId: ", sessionId);
        const fetchedMessages = history.data.messages;
        if (isMounted && fetchedMessages.length > 0) {
          setMessages(fetchedMessages);
        }
      })
      .catch((err) => console.error("Failed to load history:", err))
      .finally(() => {
        if (isMounted) setIsLoadingHistory(false);
      });

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  const sendMessage = useCallback(
    async (userText: string) => {
      const trimmed = userText.trim();
      if (
        !trimmed ||
        isLoading ||
        !sessionId ||
        trimmed.length > MAX_MESSAGE_LENGTH
      )
        return;
      const userMessageId = crypto.randomUUID();
      const assistantMessageId = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        { id: userMessageId, role: "user", content: trimmed },
        { id: assistantMessageId, role: "assistant", content: "" },
      ]);

      setIsLoading(true);
      setStatusMessage(null);

      abortControllerRef.current = new AbortController();

      try {
        await sendChatMessageStream({
          message: trimmed,
          sessionId,
          signal: abortControllerRef.current.signal,
          onStatus: (status) => {
            setStatusMessage(status);
          },
          onToken: (token) => {
            setStatusMessage(null);
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageId
                  ? { ...msg, content: msg.content + token }
                  : msg,
              ),
            );
          },
          onError: (error) => {
            setStatusMessage(null);
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageId
                  ? { ...msg, content: error }
                  : msg,
              ),
            );
          },
          onDone: () => {
            setIsLoading(false);
            setStatusMessage(null);
          },
        });
      } catch (err) {
        if ((err as Error)?.name === "AbortError") {
          console.log("Chat aborted by user");
        } else {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "Something went wrong. Please try again.";
          // 👈 Update the assistant bubble with the error message
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: errorMessage }
                : msg,
            ),
          );
        }
      } finally {
        setIsLoading(false);
        setStatusMessage(null);
        abortControllerRef.current = null;
      }
    },
    [sessionId, isLoading],
  );

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const clearConversation = useCallback(() => {
    stopGeneration();
    setMessages([]);
    resetSession();
  }, [stopGeneration, resetSession]);

  return {
    sessionId,
    messages,
    isLoading,
    statusMessage,
    sendMessage,
    stopGeneration,
    clearConversation,
  };
}
