import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import {
  createProductWithVariant,
  getAllProducts,
} from "@/server/products/services";
import {
  AdminProductsFiltrationObject,
  ProductWithVaraintsCreateInput,
} from "@/server/products/types";
import { NextResponse } from "next/server";

export const POST = withAuth(["super_admin"], async (request: Request) => {
  try {
    const body = (await request.json()) as ProductWithVaraintsCreateInput;
    const result = await createProductWithVariant(body);
    const status = HTTP_STATUS_MAP[result.code] || 500;

    console.log("body: ", body);

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
        message: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 },
    );
  }
});

export const GET = withAuth(["super_admin"], async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") ?? 1);
    const take = Number(searchParams.get("take") ?? 5);
    const category = searchParams.get("category");
    const filterObjects: AdminProductsFiltrationObject = {
      page,
      take,
      category,
    };
    const result = await getAllProducts(filterObjects);

    if (!result)
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "not Found",
        },
        { status: 400 },
      );
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
        message: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 },
    );
  }
});
