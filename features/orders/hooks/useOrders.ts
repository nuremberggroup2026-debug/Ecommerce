"use client";

import { useEffect, useState } from "react";

import type { Order } from "@/features/orders/types";
import { getAdminOrders } from "@/features/orders/services/orders.service";

export function useAdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getAdminOrders();

      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);

      setError("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    isLoading,
    error,
    refetch: fetchOrders,
  };
}
