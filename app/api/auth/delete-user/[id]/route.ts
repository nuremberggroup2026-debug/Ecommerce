import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { deleteUser } from "@/server/auth/services";
import { NextResponse } from "next/server";

export const DELETE = withAuth(
  ["super_admin"],
  async (request: Request, { params }) => {
    try {
      const { id } = await params;
      const result = await deleteUser(id);
      const status = HTTP_STATUS_MAP[result.code];
      return NextResponse.json(
        { success: result.success, message: result.message },
        { status },
      );
    } catch (error) {}
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  },
);
