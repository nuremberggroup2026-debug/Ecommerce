"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Edit3, Clock } from "lucide-react";
import type { OrderByIdAdmin, OrderStatus } from "@/features/orders/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminUpdateOrderStatus } from "@/features/orders/api/orders.client.api";

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const statusStyles: Record<OrderStatus, string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  CONFIRMED: "border-blue-200 bg-blue-50 text-blue-700",
  PROCESSING: "border-indigo-200 bg-indigo-50 text-indigo-700",
  SHIPPED: "border-purple-200 bg-purple-50 text-purple-700",
  DELIVERED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  CANCELLED: "border-red-200 bg-red-50 text-red-700",
};

export function ViewOrderHeader({ order }: { order: OrderByIdAdmin }) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (value: OrderStatus) => {
    try {
      setIsUpdating(true);
      await adminUpdateOrderStatus(order.id, value);
      setStatus(value);
      router.refresh();
    } catch (error) {
      console.error("Failed to update order status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formattedCreated = new Date(order.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  // Fallback to createdAt if updatedAt is not set yet in existing DB records
  const updatedAt = order.updatedAt
    ? new Date(order.updatedAt)
    : new Date(order.createdAt);
  const formattedUpdated = updatedAt.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mb-5 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="h-9 w-9 shrink-0 bg-white mt-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-xl font-semibold tracking-tight">
              Order #{order.orderNumber}
            </h1>
            <Badge variant="outline" className={statusStyles[status]}>
              {statusLabels[status]}
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              <span className="font-medium">Created at:</span>{" "}
              {formattedCreated}
            </div>
            <div className="hidden sm:block text-muted-foreground/30">•</div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-medium">Updated at:</span>{" "}
              {formattedUpdated}
            </div>
            <div className="hidden sm:block text-muted-foreground/30">•</div>
            <div className="font-medium text-foreground">
              {order.orderItems.length} items
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5 bg-gray-20/50 p-2.5 rounded-lg border border-gray-100">
        <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-gray-700 w-full mb-0.5">
          <Edit3 className="h-3.5 w-3.5" />
          Update Order Status Here
        </div>
        <Select
          value={status}
          onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          disabled={isUpdating}
        >
          <SelectTrigger className="h-9 w-full bg-white sm:w-50 border-blue-200 focus:ring-gray-500 font-semibold shadow-sm text-gray-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(statusLabels).map(([value, label]) => (
              <SelectItem key={value} value={value} className="font-medium">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
