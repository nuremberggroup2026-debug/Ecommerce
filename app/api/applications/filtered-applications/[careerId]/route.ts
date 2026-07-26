import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getFilteredApplications } from "@/server/applications/services";
import { NextResponse } from "next/server";

export const GET = withAuth(
  ["super_admin"],
  async (request: Request, { params }) => {
    try {
      const { searchParams } = new URL(request.url);
      const { careerId } = await params;
      const rawPage = searchParams.get("page") || "1";
      const page = Number(rawPage) > 0 ? Number(rawPage) : 1;

      const result = await getFilteredApplications(careerId, page);
      const status = HTTP_STATUS_MAP[result.code] || 500;

      return NextResponse.json(
        {
          success: result.success,
          data: result.applications || null,
          totalApplications: result.pagination?.totalItems || 0,
          pagination: result.pagination,
          message: result.message,
        },
        { status },
      );
    } catch {
      return NextResponse.json(
        {
          success: false,
          data: null,
          totalApplications: 0,
          pagination: null,
          message: "Internal server error",
        },
        { status: 500 },
      );
    }
  },
);
