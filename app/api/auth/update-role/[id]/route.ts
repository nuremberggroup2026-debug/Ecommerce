import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { updateRole } from "@/server/auth/services";
import { UserRoles } from "@/types";
import { NextResponse } from "next/server";

export const PUT = withAuth(
  ["super_admin"],
  async (request: Request, { params }) => {
    try {
      const { id } = await params;
      const body = (await request.json()) as { newRole: UserRoles };

      const result = await updateRole(id, body.newRole);

      const httpStatus = HTTP_STATUS_MAP[result.code] || 500;

      return NextResponse.json(
        { message: result.message, success: result.success },
        { status: httpStatus },
      );
    } catch (error) {
      console.log("error: ", error);

      return NextResponse.json(
        { message: "INTERNAL_SERVER_ERROR", success: false },
        { status: 500 },
      );
    }
  },
);
