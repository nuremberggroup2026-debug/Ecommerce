import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import {
  deleteProductVariant,
  getAllProductVariantById,
  updateProductVariant,
} from "@/server/productVariants/services";
import { ProductVariantUpdateInput } from "@/types";
import { NextResponse } from "next/server";

export const GET = withAuth(
  ["super_admin"],
  async (request: Request, { params }) => {
    try {
      const { id } = await params;
      const result = await getAllProductVariantById(id);
      const status = HTTP_STATUS_MAP[result.code] || 500;

      return NextResponse.json(
        {
          success: result.success,
          data: result.data || null,
          message: result.message,
        },
        { status },
      );
    } catch (error) {
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

export const PUT = withAuth(
  ["super_admin"],
  async (request: Request, { params }) => {
    try {
      const { id } = await params;
      const body = (await request.json()) as ProductVariantUpdateInput;
      const result = await updateProductVariant(id, body);
      const status = HTTP_STATUS_MAP[result.code] || 500;

      return NextResponse.json(
        {
          success: result.success,
          data: result.variant || null,
          message: result.message,
        },
        { status },
      );
    } catch (error) {
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

export const DELETE = withAuth(
  ["super_admin"],
  async (request: Request, { params }) => {
    try {
      const { id } = await params;
      const result = await deleteProductVariant(id);
      const status = HTTP_STATUS_MAP[result.code] || 500;

      return NextResponse.json(
        {
          success: result.success,
          message: result.message,
        },
        { status },
      );
    } catch (error) {
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
