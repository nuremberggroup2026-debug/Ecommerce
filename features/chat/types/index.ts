export type ChatStreamChunk =
  | { type: "status"; message: string }
  | { type: "token"; token: string }
  | { type: "done" }
  | { type: "error"; error: string };

export interface SendMessageParams {
  message: string;
  sessionId: string;
  signal?: AbortSignal;
  onToken: (token: string) => void;
  onStatus: (status: string) => void;
  onError: (error: string) => void;
  onDone: () => void;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface HistoryResponseData {
  sessionId: string;
  messages: Message[];
}



