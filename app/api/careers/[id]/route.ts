import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import {
  deleteCareer,
  getCareerById,
  updateCareer,
} from "@/server/careers/services";
import {  CareersUpdateInput } from "@/types";
import { NextResponse } from "next/server";

export const GET = withAuth(
  ["super_admin"],
  async (request: Request, { params }) => {
    try {
      const { id } = await params;
      const result = await getCareerById(id);
      const status = HTTP_STATUS_MAP[result.code] || 500;
      return NextResponse.json(
        {
          success: result.success,
          data: result.career || null,
          message: result.message,
        },
        { status },
      );
    } catch (error) {
      console.log("error: ", error);

      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Internal server error",
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
      const body = (await request.json()) as CareersUpdateInput;

      const result = await updateCareer(id, body);

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
  async (request: Request, { params }) => {
    try {
      const { id } = await params;

      const result = await deleteCareer(id);

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
          message: "Internal server error",
        },
        { status: 500 },
      );
    }
  },
);
