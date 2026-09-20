import { OrderStatus } from "@/server/orders/types";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { ReportPreset } from "@/features/orders/types";
type Router = {
  push: (href: string) => void;
  replace: (href: string) => void;
};
export const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "DELIVERED":
      return "text-emerald-600 bg-emerald-50 border-emerald-100";

    case "PROCESSING":
      return "text-amber-600 bg-amber-50 border-amber-100";

    case "SHIPPED":
      return "text-blue-600 bg-blue-50 border-blue-100";

    case "CANCELLED":
      return "text-rose-600 bg-rose-50 border-rose-100";

    case "PENDING":
      return "text-amber-600 bg-amber-50 border-amber-100";

    default:
      return "text-gray-600 bg-gray-50 border-gray-100";
  }
};

export const formatDate = (date: Date | string, locale: "en" | "ar" = "en") => {
  const parsedDate = date instanceof Date ? date : new Date(date);

  return parsedDate.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const handleApiError = (status: number, router: Router) => {
  switch (status) {
    case HTTP_STATUS_MAP.UNAUTHORIZED:
      router.push("/login");
      return;

    case HTTP_STATUS_MAP.PAYMENT_REQUIRED:
      router.replace("/checkout/payment");
      return;

    case HTTP_STATUS_MAP.FORBIDDEN:
      router.replace("/forbidden");
      return;

    case HTTP_STATUS_MAP.NOT_FOUND:
      router.replace("/not-found");
      return;

    case HTTP_STATUS_MAP.TOO_MANY_REQUESTS:
      router.replace("/too-many-requests");
      return;

    case HTTP_STATUS_MAP.INTERNAL_ERROR:
    case HTTP_STATUS_MAP.SERVICE_UNAVAILABLE:
      router.replace("/server-error");
      return;

    case HTTP_STATUS_MAP.BAD_REQUEST:
    case HTTP_STATUS_MAP.CONFLICT:
    case HTTP_STATUS_MAP.UNPROCESSABLE_ENTITY:
      return;

    default:
      return;
  }
};

 export const getDateInputValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getPresetDates = (preset: ReportPreset) => {
  const now = new Date();

  switch (preset) {
    case "today":
      return {
        from: getDateInputValue(now),
        to: getDateInputValue(now),
      };

    case "last7Days": {
      const from = new Date(now);
      from.setDate(from.getDate() - 6);

      return {
        from: getDateInputValue(from),
        to: getDateInputValue(now),
      };
    }

    case "thisMonth": {
      const from = new Date(now.getFullYear(), now.getMonth(), 1);

      return {
        from: getDateInputValue(from),
        to: getDateInputValue(now),
      };
    }

    case "lastMonth": {
      const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const to = new Date(now.getFullYear(), now.getMonth(), 0);

      return {
        from: getDateInputValue(from),
        to: getDateInputValue(to),
      };
    }

    case "thisYear": {
      const from = new Date(now.getFullYear(), 0, 1);

      return {
        from: getDateInputValue(from),
        to: getDateInputValue(now),
      };
    }

    case "lastYear": {
      const from = new Date(now.getFullYear() - 1, 0, 1);
      const to = new Date(now.getFullYear() - 1, 11, 31);

      return {
        from: getDateInputValue(from),
        to: getDateInputValue(to),
      };
    }

    case "specificYear": {
      const from = new Date(now.getFullYear(), 0, 1);
      const to = new Date(now.getFullYear(), 11, 31);

      return {
        from: getDateInputValue(from),
        to: getDateInputValue(to),
      };
    }

    case "custom":
      return {
        from: "",
        to: "",
      };
  }
};
