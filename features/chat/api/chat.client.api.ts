import { API } from "@/lib/constants/api";
import type {
  ChatStreamChunk,
  SendMessageParams,
  HistoryResponseData,
} from "../types/index";
import { Clientapi } from "@/services/client/api";
import type { ResponseType } from "@/types/index";

export async function sendChatMessageStream({
  message,
  sessionId,
  signal,
  onDone,
  onError,
  onStatus,
  onToken,
}: SendMessageParams): Promise<void> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({ message, sessionId }),
  });

  if (!response.ok) {
    console.log("!response.ok: ", response);

    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Request failed with status ${response.status}`,
    );
  }
  if (!response.body) {
    throw new Error("No readable stream received from server");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimed = line.trim();
        if (!trimed || !trimed.startsWith("data:")) continue;

        const jsonStr = trimed.replace(/^data:\s*/, "");
        try {
          const chunk: ChatStreamChunk = JSON.parse(jsonStr);

          switch (chunk.type) {
            case "status":
              onStatus(chunk.message);
              break;
            case "token":
              onToken(chunk.token);
              break;
            case "error":
              onError(chunk.error);
              break;
            case "done":
              onDone();
              return;
          }
        } catch (error) {}
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export async function getChatHistory(
  sessionId: string,
): Promise<ResponseType<HistoryResponseData>> {
  return Clientapi.get<ResponseType<HistoryResponseData>>(
    `${API.ENDPOINTS.CHAT.CHAT_HISTORY}?sessionId=${sessionId}`,
  );
}
