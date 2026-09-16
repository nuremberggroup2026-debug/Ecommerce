import { api } from "@/services/server/api";

import { API } from "@/lib/constants/api";
import type { DashboardNumbers } from "../types/index";
import type { ResponseType } from "@/types/index";

export async function dashboardNumbers(): Promise<
  ResponseType<DashboardNumbers>
> {
  return api.get<ResponseType<DashboardNumbers>>(
    API.ENDPOINTS.DASHBOARD.DASHBOARD_NUMBERS,
  );
}
