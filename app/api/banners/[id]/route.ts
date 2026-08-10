import { auth } from "@/lib/auth/auth";
import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import {
  deleteBanner,
  getBannerById,
  updateBanner,
} from "@/server/banner/services";
import { UpdateBanner } from "@/types";
import { NextResponse } from "next/server";

export const GET = withAuth(
  ["super_admin"],
  async (request: Request, { params }) => {
    try {
      const { id } = await params;
      const session = await auth();
      console.log("session 545: ", session);

      const result = await getBannerById(id);
      const status = HTTP_STATUS_MAP[result.code] || 500;
      return NextResponse.json(
        {
          success: result.success,
          data: result.banner || null,
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
      const body = (await request.json()) as UpdateBanner;

      const result = await updateBanner(id, body);

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
                  console.log(id);


      const result = await deleteBanner(id);


      const status = HTTP_STATUS_MAP[result.code] || 500;

      return NextResponse.json(
        {
          success: result.success,
          message: result.message,
        },
        { status },
      );
    } catch (error) {
      console.log(error);
      
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
