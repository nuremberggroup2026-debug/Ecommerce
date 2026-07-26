import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { updateOrderStatus } from "@/server/orders/services";
import { OrderStatus,UpdateOrderStatusRequest } from "@/types";
import { NextResponse } from "next/server";



export const PUT = withAuth(
  ["super_admin", "admin"],
  async (request: Request, { params }) => {
    try {
      const {id} = await params;
      console.log("id: ", id);
      
      const body = (await request.json()) as UpdateOrderStatusRequest;

      if (!id || !body.status)
        return NextResponse.json(
          {
            success: false,
            message: "Order ID and status are required.",
          },
          { status: HTTP_STATUS_MAP.BAD_REQUEST },
        );

      const result = await updateOrderStatus(id, body.status);
      const status = HTTP_STATUS_MAP[result.code] || 500;

      return NextResponse.json(
        {
          success: result.success,
          message: result.message,
        },
        { status },
      );
    } catch (error) {
      console.error("Update order status error:", error);
      return NextResponse.json(
        { success: false, message: "Internal server error" },
        { status: HTTP_STATUS_MAP.INTERNAL_ERROR },
      );
    }
  },
);
