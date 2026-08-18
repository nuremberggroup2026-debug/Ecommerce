"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";

import type { Order, order_status } from "@/features/orders/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { adminUpdateOrderStatus } from "@/features/orders/api/orders.client.api";

interface ViewOrderProps {
  order: Order;
}

const statusLabels: Record<order_status, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const statusStyles: Record<order_status, string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  CONFIRMED: "border-blue-200 bg-blue-50 text-blue-700",
  PROCESSING: "border-indigo-200 bg-indigo-50 text-indigo-700",
  SHIPPED: "border-purple-200 bg-purple-50 text-purple-700",
  DELIVERED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  CANCELLED: "border-red-200 bg-red-50 text-red-700",
};

export default function ViewOrder({ order }: ViewOrderProps) {
  const router = useRouter();
  const [status, setStatus] = useState<order_status>(order.status);
  const [isUpdating, setIsUpdating] = useState(false);
console.log("order",order)
  const handleStatusChange = async (value: order_status) => {
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

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/orders")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Order #{order.orderNumber}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
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
          <Select value={status} onValueChange={(v) => handleStatusChange(v as order_status)} disabled={isUpdating}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusLabels).map(([val, label]) => (
                <SelectItem key={val} value={val}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ================= INFO CARDS ================= */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Customer</CardTitle></CardHeader>
          <CardContent>
            <p className="font-medium">{order.email}</p>
            <p className="text-sm text-muted-foreground mt-1">{order.phoneNumber}</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Shipping Address</CardTitle></CardHeader>
          <CardContent className="text-sm">
            <p className="font-medium">{order.city}, {order.streetAddress}</p>
            <p className="text-muted-foreground mt-1">Bldg: {order.buildingNumber}</p>
            {order.additionalNote && <p className="text-muted-foreground mt-1">Note: {order.additionalNote}</p>}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-sm text-muted-foreground">Payment Summary</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-2">
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
                <span>-${Number(order.discountAmount).toFixed(2)}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-base">
              <span>Total:</span>
              <span>${Number(order.totalAmount).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= ORDER ITEMS ================= */}
      <Card className="shadow-sm">
        <CardHeader className="border-b bg-muted/10 py-4">
          <CardTitle className="text-base">Order Items</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {order.orderItems.map((item) => {
              const productImage = (item as any).productImage || (item as any).image || "/placeholder-product.png";
              const itemTotal = Number(item.itemPrice) * Number(item.quantity);

              return (
                <div key={item.id} className="flex items-center gap-4 p-4 sm:p-5">
                  <div className="relative h-16 w-16 shrink-0 rounded-md border bg-muted overflow-hidden">
                    <Image src={productImage} alt={item.productNameEn} fill sizes="64px" className="object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{item.productNameEn}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.productNameAr}</p>
                  </div>

                  <div className="text-sm text-muted-foreground hidden sm:block">
                    ${Number(item.itemPrice).toFixed(2)} × {item.quantity}
                  </div>

                  <div className="font-medium text-sm text-right w-20">
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