"use client";

import { useState, useEffect, useCallback } from "react";

const SESSION_STORAGE_KEY = "aura_chat_session_id";

export function useChatSession() {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    let currentId = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!currentId) {
      currentId = crypto.randomUUID();
      localStorage.setItem(SESSION_STORAGE_KEY, currentId);
    }

    setSessionId(currentId);
  }, []);

  const resetSession = useCallback(() => {
    const newId = crypto.randomUUID();
    localStorage.setItem(SESSION_STORAGE_KEY, newId);
    setSessionId(newId);
    return newId;
  }, []);

  return { sessionId, resetSession };
}
