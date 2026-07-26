import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import {
  addNewApplication,
  getAllApplications,
} from "@/server/applications/services";
import { type ApplicationCreateInput } from "@/types";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as ApplicationCreateInput;
    const result = await addNewApplication(body);
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
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
};

export const GET = async () => {
  try {
    const result = await getAllApplications();
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      {
        success: result.success,
        data: result.applications || null,
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
