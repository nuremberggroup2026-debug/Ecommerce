import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getAllCareersWithApplications } from "@/server/careers/services";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await getAllCareersWithApplications();
    const status = HTTP_STATUS_MAP[result.code] || 500;
    return NextResponse.json(
      {
        success: result.success,
        data: result.careers || null,
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
};
