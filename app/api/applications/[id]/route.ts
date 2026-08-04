import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import {
  deleteApplication,
  getApplicationsByApplicationId,
} from "@/server/applications/services";
import { NextResponse } from "next/server";
import { log } from "util";

export const GET = withAuth(
  ["super_admin"],
  async (_request: Request, { params }) => {
    try {
      const { id } = await params;
      const result = await getApplicationsByApplicationId(id);
      const status = HTTP_STATUS_MAP[result.code] || 500;

      return NextResponse.json(
        {
          success: result.success,
          data: result.application || null,
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


export const DELETE = withAuth(
  ["super_admin"],
  async (_request: Request, { params }) => {
    try {
      const { id } = await params;
      const result = await deleteApplication(id);
      const status = HTTP_STATUS_MAP[result.code] || 500;

      
      return NextResponse.json(
        {
          success: result.success,
          message: result.message,
        },
        { status },
      );
    } catch (error) {
        console.log("error: ",error);
        
      return NextResponse.json(
        {
          success: false,
          message: "INTERNAL_SERVER_ERROR",
        },
        { status: 500 },
      );
    }
  },
);
