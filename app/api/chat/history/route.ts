import { getSessionHistory } from "@/lib/ai/agent";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get("sessionId");

    if (!sessionId || sessionId.trim() === "") {
      return NextResponse.json(
        {
          data: null,
          success: false,
          message: "sessionId query parameter is required",
        },
        { status: 400 },
      );
    }

    const messages = await getSessionHistory(sessionId);
    return NextResponse.json(
      {
        data: { sessionId, messages },
        success: true,
        message: "All Session Messages",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ GET /api/chat/history error:", error);
    return NextResponse.json(
      {
        data: null,
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to load chat history",
      },
      { status: 500 },
    );
  }
};
