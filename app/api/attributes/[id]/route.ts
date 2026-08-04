import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import {
  deleteAttribute,
  getAttributeById,
  updateAttribute,
} from "@/server/attributes/attribute.services";
import { AttributeUpdateInput } from "@/types";
import { NextResponse } from "next/server";

export const GET = withAuth(
  ["super_admin"],
  async (request: Request, { params }) => {
    try {
      const { id } = await params;
      const result = await getAttributeById(id);
      const status = HTTP_STATUS_MAP[result.code] || 500;

      return NextResponse.json(
        {
          success: result.success,
          data: result.attribute || null,
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
      const body = (await request.json()) as AttributeUpdateInput;

      const result = await updateAttribute(id, body);
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

export const DELETE = withAuth(
  ["super_admin"],
  async (request: Request, { params }) => {
    try {
      const { id } = await params;

      const result = await deleteAttribute(id);
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
