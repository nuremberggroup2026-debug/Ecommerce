"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";

import type { Order, OrderStatus } from "@/features/orders/types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { adminUpdateOrderStatus } from "@/features/orders/api/orders.client.api";

interface ViewOrderProps {
  order: Order;
}

interface OrderItemWithImage {
  id: string;
  productNameEn: string;
  productNameAr: string;
  itemPrice: number | string;
  quantity: number;
  productImage?: string | null;
  image?: string | null;
}

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

export default function ViewOrder({ order }: ViewOrderProps) {
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

  const formattedDate = new Date(order.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/dashboard/orders")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Order #{order.orderNumber}
            </h1>

            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{order.orderItems.length} Items</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className={statusStyles[status]}>
            {statusLabels[status]}
          </Badge>

          <Select
            value={status}
            onValueChange={(value) =>
              handleStatusChange(value as OrderStatus)
            }
            disabled={isUpdating}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>

            <SelectContent>
              {Object.entries(statusLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Customer
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="font-medium">{order.email}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {order.phoneNumber}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Shipping Address
            </CardTitle>
          </CardHeader>

          <CardContent className="text-sm">
            <p className="font-medium">
              {order.city}, {order.streetAddress}
            </p>

            <p className="mt-1 text-muted-foreground">
              Bldg: {order.buildingNumber}
            </p>

            {order.additionalNote && (
              <p className="mt-1 text-muted-foreground">
                Note: {order.additionalNote}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Payment Summary
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Method:</span>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>${Number(order.subtotal).toFixed(2)}</span>
            </div>

            {Number(order.discountAmount) > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount:</span>
                <span>
                  -${Number(order.discountAmount).toFixed(2)}
                </span>
              </div>
            )}

            <Separator className="my-2" />

            <div className="flex justify-between text-base font-bold">
              <span>Total:</span>
              <span>${Number(order.totalAmount).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="border-b bg-muted/10 py-4">
          <CardTitle className="text-base">Order Items</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y">
            {order.orderItems.map((item) => {
              const orderItem = item as OrderItemWithImage;
              const productImage =
                orderItem.productImage ||
                orderItem.image ||
                "/placeholder-product.png";

              const itemTotal =
                Number(orderItem.itemPrice) * Number(orderItem.quantity);

              return (
                <div
                  key={orderItem.id}
                  className="flex items-center gap-4 p-4 sm:p-5"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                    <Image
                      src={productImage}
                      alt={orderItem.productNameEn}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {orderItem.productNameEn}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {orderItem.productNameAr}
                    </p>
                  </div>

                  <div className="hidden text-sm text-muted-foreground sm:block">
                    ${Number(orderItem.itemPrice).toFixed(2)} ×{" "}
                    {orderItem.quantity}
                  </div>

                  <div className="w-20 text-right text-sm font-medium">
                    ${itemTotal.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}