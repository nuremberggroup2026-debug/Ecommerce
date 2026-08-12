import { OrderStatus } from "@/types";

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

export const formatDate = (date: Date | string) => {
  const parsedDate = date instanceof Date ? date : new Date(date);

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
