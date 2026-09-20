"use client";

import type { OrderStatus } from "@/server/orders/types";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  status: OrderStatus | "ALL";
  onStatusChange: (status: OrderStatus | "ALL") => void;
};

export default function ReportStatus({ status, onStatusChange }: Props) {
  return (
    <div className="space-y-2">
      <Label>Order Status</Label>

      <Select
        value={status}
        onValueChange={(value) => onStatusChange(value as OrderStatus | "ALL")}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Statuses</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="DELIVERED">Delivered</SelectItem>
          <SelectItem value="CANCELLED">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      <p className="text-muted-foreground text-xs">
        The status filter only affects the order details section of the report.
      </p>
    </div>
  );
}
