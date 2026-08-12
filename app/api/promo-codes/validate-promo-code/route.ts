import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { validatePromoCode } from "@/server/promoCodes/services";
import { NextResponse } from "next/server";

export const GET = withAuth([], async (request: Request, { user }) => {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    if (!code)
      return NextResponse.json(
        {
          message: "Missing query string (code)",
          success: false,
          data: null,
        },
        { status: 400 },
      );
    const userId = user.id;
    const result = await validatePromoCode(code, userId);
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      {
        success: result.success,
        data: result.data,
        message: result.message,
      },
      { status },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "INTERNAL_SERVER_ERROR",
      },
      { status: HTTP_STATUS_MAP.INTERNAL_ERROR },
    );
  }
});
