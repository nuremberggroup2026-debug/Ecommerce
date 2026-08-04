import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { deactivatePromoCode } from "@/server/promoCodes/services";
import { NextResponse } from "next/server";

export const PUT = withAuth(
  ["super_admin"],
  async (_request: Request, { params }) => {
    try {
      const { id } = await params;
      const result = await deactivatePromoCode(id);
      const status = HTTP_STATUS_MAP[result.code] || 500;

      return NextResponse.json(
        {
          success: result.success,
          message: result.message,
        },
        { status },
      );
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "INTERNAL_SERVER_ERROR",
        },
        { status: HTTP_STATUS_MAP.INTERNAL_ERROR },
      );
    }
  },
);
