import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { adminGetOrderById } from "@/server/orders/services";
import { NextResponse } from "next/server";

export const GET = withAuth(
  ["admin", "super_admin"],
  async (request, { params }) => {
    try {
      const { id } = await params;
      const result = await adminGetOrderById(id);
      const status = HTTP_STATUS_MAP[result.code];
      return NextResponse.json(
        {
          message: result.message,
          success: result.success,
          data: result.data,
        },
        { status },
      );
    } catch (error) {
      console.log("error: ", error);

      return NextResponse.json(
        {
          message: "Internal server error",
          success: false,
          data: null,
        },
        { status: 500 },
      );
    }
  },
);
