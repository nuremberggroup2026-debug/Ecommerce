import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent } from "langchain";
import { searchProductsTool } from "./tools";
import { getPostgresCheckpointer } from "@/lib/ai/checkPointer";
import type { BaseMessage } from "@langchain/core/messages";

const checkpointer = await getPostgresCheckpointer();

export const getShoppingAgent = async () => {
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-flash-lite-latest",
    temperature: 0,
    apiKey: process.env.GEMINI_API_KEY,
    streaming: true,
  });

  return createAgent({
    model,
    tools: [searchProductsTool],
    checkpointer,
    systemPrompt: `You are Aura, an expert AI shopping assistant for our e-commerce store.
Your goal is to help customers discover the perfect products, answer sizing and material questions, and provide a delightful shopping experience.
Guidelines:
1. When a customer asks for a product (e.g. "show me a hoodie", "do you have blue shirts?"), use the search_products tool to find options from the store catalog.
2. For simple greetings (like "hi", "hello"), reply politely and ask what they are shopping for today without searching.
3. When recommending products, always provide:
   - Product Name
   - Price
   - Why it fits their request (material, style)
   - A direct link formatted in markdown: [View Product](/products/[slug])
4. If a user asks in Arabic, reply in Arabic and link using English slug: [عرض المنتج](/products/[slug]).
5. Be concise, friendly, and enthusiastic!`,
  });
};

let agentInstance: ReturnType<typeof createAgent> | null = null;

const getOrCreateAgent = async () => {
  if (!agentInstance) {
    agentInstance = await getShoppingAgent();
  }

  return agentInstance;
};

// generator function, should be written in ES5
export async function* runShoppingAgentStream({
  sessionId,
  message,
}: {
  sessionId: string;
  message: string;
}) {
  const agent = await getOrCreateAgent();
  console.log(`🤖 [Shopping Agent] Session [${sessionId}]: "${message}"`);
  const eventStream = agent.streamEvents(
    {
      messages: [{ role: "human", content: message }],
    },
    { version: "v2", configurable: { thread_id: sessionId } },
  );

  let tokenCount = 0;
  let fallbackText = "";

  for await (const event of eventStream) {
    if (event.event === "on_tool_start") {
      const query = event.data?.input?.query;
      yield {
        type: "status",
        message: query
          ? `Searching store for "${query}"…`
          : "Checking product catalog…",
      };
    } else if (event.event === "on_tool_end") {
      yield {
        type: "status",
        message: "Selecting best matching products…",
      };
    } else if (event.event === "on_chat_model_stream") {
      const chunk = event.data?.chunk;
      if (chunk?.tool_call_chunks && chunk.tool_call_chunks.length > 0)
        continue;
      const content = chunk?.content;
      if (typeof content === "string" && content.length > 0) {
        tokenCount++;
        yield {
          type: "token",
          token: content,
        };
      }
    } else if (event.event === "on_chain_stream" && tokenCount === 0) {
      const chunk = event.data?.chunk;
      const messages = chunk?.model_request?.messages;
      if (Array.isArray(messages)) {
        for (let i = messages.length - 1; i >= 0; i--) {
          const msg = messages[i];
          const content = msg?.kwargs?.content ?? msg?.content ?? "";
          if (!content || typeof content != "string") continue;
          if (content.startsWith("[") || content.startsWith("{")) continue;
          fallbackText = content;
          break;
        }
      }
    } else if (event.event === "on_chat_model_end" && tokenCount === 0) {
      const output = event.data.output;
      const msg = output?.generations?.[0]?.[0]?.message || output;
      const content = msg?.content || msg?.text || "";
      if (
        typeof content === "string" &&
        content.trim() &&
        !content.startsWith("[") &&
        !content.startsWith("{")
      ) {
        fallbackText = content;
      }
    }
  }

  if (tokenCount === 0) {
    if (fallbackText) {
      yield { type: "token", token: fallbackText };
    } else {
      yield {
        type: "token",
        token:
          "I'm here to help! Could you please clarify what you're looking for?",
      };
    }
  }

  yield { type: "done" };
}

interface AgentStateValues {
  values?: {
    messages?: BaseMessage[];
  };
}

export const getSessionHistory = async (sessionId: string) => {
  const agent = await getOrCreateAgent();
  const state = await (agent.getState({
    configurable: { thread_id: sessionId },
  }) as unknown as Promise<AgentStateValues>);

  const rawMessages = state?.values?.messages || [];
  const formattedMessages: {
    id: string;
    role: "user" | "assistant";
    content: string;
  }[] = [];

  for (const msg of rawMessages) {
    const roleType = msg._getType();
    const content = typeof msg.content === "string" ? msg.content : "";

    if (roleType === "human" && content.trim()) {
      formattedMessages.push({
        id: msg.id || crypto.randomUUID(),
        role: "user",
        content,
      });
    } else if (roleType === "ai" && content.trim()) {
      formattedMessages.push({
        id: msg.id || crypto.randomUUID(),
        role: "assistant",
        content,
      });
    }
  }

  return formattedMessages;
};
