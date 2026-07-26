import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import {
  deleteProduct,
  getProductById,
  updateProductWithVariant,
} from "@/server/products/services";
import { ProductWithVaraintsUpdateInput } from "@/types";
import { NextResponse } from "next/server";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const result = await getProductById(id);
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      {
        success: result.success,
        data: result.data || null,
        message: result.message,
      },
      { status },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
};

export const PUT = withAuth(
  ["super_admin"],
  async (request: Request, { params }) => {
    try {
      const { id } = await params;
      const body = (await request.json()) as ProductWithVaraintsUpdateInput;
      const result = await updateProductWithVariant(id, body);
      const status = HTTP_STATUS_MAP[result.code] || 500;

      return NextResponse.json(
        {
          success: result.success,
          message: result.message,
        },
        { status },
      );
    } catch (error) {
      console.log("error: ", error);

      return NextResponse.json(
        {
          success: false,
          message: "Internal server error",
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
      const result = await deleteProduct(id);
      const status = HTTP_STATUS_MAP[result.code] || 500;

      return NextResponse.json(
        {
          success: result.success,
          message: result.message,
        },
        { status },
      );
    } catch(error) {
 
        console.log("error: ",error);
        
      return NextResponse.json(
        {
          success: false,
          message: "Internal server error",
        },
        { status: 500 },
      );
    }
  },
);
