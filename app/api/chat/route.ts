import { NextRequest } from "next/server";
import { runShoppingAgentStream } from "@/lib/ai/agent";
import { MAX_MESSAGE_LENGTH } from "@/lib/ai/constants";
import { checkRateLimit } from "@/lib/helpers/rate-limit";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json();
    if (!message) {
      return new Response(JSON.stringify({ error: "message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({
          error: `message is too long (maximum ${MAX_MESSAGE_LENGTH} characters)`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (
      !sessionId ||
      typeof sessionId !== "string" ||
      sessionId.trim() === ""
    ) {
      return new Response(JSON.stringify({ error: "Session ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ip =
      req.headers.get("x-forworded-for")?.split(",")[0].trim() || "unknown-ip";
    const rateLimitKey = `${ip}:${sessionId}`;
    const { isRateLimited, remaining, resetInSeconds } = checkRateLimit(
      rateLimitKey,
      {
        limit: 10,
        windowMs: 60000,
      },
    );

    console.log(" isRateLimited, remaining, resetInSeconds: ", isRateLimited, remaining, resetInSeconds);
    
    if (isRateLimited) {
      return new Response(
        JSON.stringify({
          error: `Too many requests. Please wait ${resetInSeconds} seconds before sending another message.`,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(resetInSeconds),
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(resetInSeconds),
          },
        },
      );
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of runShoppingAgentStream({
            sessionId,
            message,
          })) {
            controller.enqueue(
              encoder.encode(`data:${JSON.stringify(chunk)}\n\n`),
            );
          }
        } catch (error) {
          console.log("❌ Streaming error in /api/chat:", error);
          controller.enqueue(
            encoder.encode(
              `data:${JSON.stringify({
                type: "error",
                error: error instanceof Error ? error.message : String(error),
              })}\n\n`,
            ),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("❌ POST /api/chat error:", error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : String(error) || "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
