import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import {
  getAllAttributes,
  createAttribute,
} from "@/server/attributes/attribute.services";
import { AttributeCreateInput } from "@/types";
import { NextResponse } from "next/server";

export const POST = withAuth(["super_admin"], async (request: Request) => {
  try {
    const body = (await request.json()) as AttributeCreateInput;
    const result = await createAttribute(body);
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      {
        success: result.success,
        message: result.message,
      },
      { status },
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        success: false,
        message: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 },
    );
  }
});

export const GET = async () => {
  try {
    const result = await getAllAttributes();
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      {
        success: result.success,
        data: result.attributes || null,
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
};
