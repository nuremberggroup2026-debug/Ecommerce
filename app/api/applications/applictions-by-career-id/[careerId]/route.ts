import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getApplicationsByCareerId } from "@/server/applications/services";
import { NextResponse } from "next/server";

export const GET = withAuth(
  ["super_admin"],
  async (_request: Request, { params }) => {
    try {
      const { careerId } = await params;
      const result = await getApplicationsByCareerId(careerId);
      const status = HTTP_STATUS_MAP[result.code] || 500;

      return NextResponse.json(
        {
          success: result.success,
          data: result.applications || null,
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
        { status: 500 },
      );
    }
  },
);
