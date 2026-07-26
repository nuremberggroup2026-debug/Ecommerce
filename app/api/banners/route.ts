import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getAllBanners, createBanner } from "@/server/banner/services";
import { NewBanner } from "@/types";
import { NextResponse } from "next/server";

export const POST = withAuth(["super_admin"], async (request: Request) => {
  try {
    const body = (await request.json()) as NewBanner;
    const result = await createBanner(body);
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
});

export const GET = async () => {
  try {
    const result = await getAllBanners();
    const status = HTTP_STATUS_MAP[result.code] || 500;
    return NextResponse.json(
      {
        success: result.success,
        data: result.banners || null,
        message: result.message,
      },
      { status },
    );
  } catch (error) {
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
