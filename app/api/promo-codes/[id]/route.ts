import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import {
  deletePromoCode,
  getPromoCodeById,
  updatePromoCode,
} from "@/server/promoCodes/services";
import { PromoCodeCreateInput } from "@/server/promoCodes/types";
import { NextResponse } from "next/server";

export const GET = withAuth(
  ["super_admin"],
  async (_request: Request, { params }) => {
    try {
      const { id } = await params;
      const result = await getPromoCodeById(id);
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
  },
);

export const PUT = withAuth(
  ["super_admin"],
  async (request: Request, { params }) => {
    try {
      const { id } = await params;
      const body = (await request.json()) as Partial<PromoCodeCreateInput>;
      const result = await updatePromoCode(body, id);
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

export const DELETE = withAuth(
  ["super_admin"],
  async (_request: Request, { params }) => {
    try {
      const { id } = await params;
      const result = await deletePromoCode(id);
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
