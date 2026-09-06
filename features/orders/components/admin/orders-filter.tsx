"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/features/orders/types";

export function OrdersFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [orderNumber, setOrderNumber] = useState(
    searchParams.get("orderNumber") || "",
  );
  const [customerEmail, setCustomerEmail] = useState(
    searchParams.get("customerEmail") || "",
  );
  const [status, setStatus] = useState(searchParams.get("status") || "ALL");

  const statusLabels: Record<OrderStatus, string> = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (orderNumber) {
      params.set("orderNumber", orderNumber);
    } else {
      params.delete("orderNumber");
    }

    if (customerEmail) {
      params.set("customerEmail", customerEmail);
    } else {
      params.delete("customerEmail");
    }

    if (status && status !== "ALL") {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    setOrderNumber("");
    setCustomerEmail("");
    setStatus("ALL");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("orderNumber");
    params.delete("customerEmail");
    params.delete("status");
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleApply}
      className="flex flex-col md:flex-row gap-4 mb-6 items-end bg-white p-4 rounded-xl border shadow-sm"
    >
      <div className="flex flex-col gap-2 w-full md:w-auto">
        <label
          htmlFor="orderNumber"
          className="text-sm font-medium text-gray-700"
        >
          Order Number
        </label>
        <Input
          id="orderNumber"
          placeholder="e.g. ORD-123"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="w-full md:w-50"
        />
      </div>

      <div className="flex flex-col gap-2 w-full md:w-auto">
        <label
          htmlFor="customerEmail"
          className="text-sm font-medium text-gray-700"
        >
          Customer Email
        </label>
        <Input
          id="customerEmail"
          type="email"
          placeholder="email@example.com"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          className="w-full md:w-62.5"
        />
      </div>

      <div className="flex flex-col gap-2 w-full md:w-auto">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full md:w-45">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            {Object.values(OrderStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {statusLabels[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 w-full md:w-auto md:ml-auto">
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          className="flex-1 md:flex-none"
        >
          Clear
        </Button>
        <Button
          type="submit"
          className="flex-1 md:flex-none bg-black hover:bg-black "
        >
          Apply Filters
        </Button>
      </div>
    </form>
  );
}
