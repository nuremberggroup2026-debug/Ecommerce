"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// تعريف أنواع البيانات
type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

type OrderItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  img: string;
  brand: string;
};

type Order = {
  orderId: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
};

export default function OrdersComponent() {
  const [orders] = useState<Order[]>([
    {
      orderId: "ORD-902-841",
      date: "Oct 12, 2026",
      total: 334,
      status: "Delivered",
      items: [
        {
          id: "1",
          title: "Premium Wireless Headphones",
          price: 299,
          quantity: 1,
          brand: "Sony",
          img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
        },
        {
          id: "3",
          title: "Ergonomic Ceramic Mug",
          price: 35,
          quantity: 1,
          brand: "Hasami",
          img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=400&q=80",
        }
      ]
    },
    {
      orderId: "ORD-711-420",
      date: "Sep 28, 2026",
      total: 135,
      status: "Processing",
      items: [
        {
          id: "5",
          title: "Organic Hydrating Serum",
          price: 45,
          quantity: 3,
          brand: "Ordinary",
          img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
        }
      ]
    },
    {
      orderId: "ORD-305-199",
      date: "Aug 15, 2026",
      total: 89,
      status: "Cancelled",
      items: [
        {
          id: "7",
          title: "Minimalist Desk Lamp",
          price: 89,
          quantity: 1,
          brand: "Lumina",
          img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80",
        }
      ]
    }
  ]);

  // التحكم في فتح وإغلاق تفاصيل الطلب
  const [expandedOrder, setExpandedOrder] = useState<string | null>(orders[0]?.orderId || null);

  const toggleOrder = (orderId: string) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  // دالة لتحديد لون حالة الطلب
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "Delivered": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "Processing": return "text-amber-600 bg-amber-50 border-amber-100";
      case "Shipped": return "text-blue-600 bg-blue-50 border-blue-100";
      case "Cancelled": return "text-rose-600 bg-rose-50 border-rose-100";
      default: return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  return (
    <main className="min-h-screen bg-white text-black flex flex-col">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 lg:px-10 flex-1 flex flex-col">
        
        {/* Header Section */}
        <header className="mb-12 border-b border-neutral-100 pb-6 text-center md:text-left">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Order History</h1>
          <p className="text-xs text-gray-400 font-light mt-2">
            Review your past purchases and track current orders.
          </p>
        </header>

        {/* Empty State (If no orders) */}
        {orders.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-6">
            <p className="text-sm text-gray-400 font-light">
              You haven't placed any orders yet.
            </p>
            <Link
              href="/products"
              className="rounded-full bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-neutral-800 shadow-sm active:scale-[0.98]"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order.orderId} 
                className={`border rounded-3xl transition-all duration-300 overflow-hidden ${
                  expandedOrder === order.orderId 
                    ? "border-neutral-200 shadow-md bg-white" 
                    : "border-neutral-100 bg-neutral-50/50 hover:border-neutral-200"
                }`}
              >
                {/* Order Summary Header (Clickable) */}
                <button 
                  onClick={() => toggleOrder(order.orderId)}
                  className="w-full flex flex-wrap items-center justify-between p-6 gap-4 text-left focus:outline-none"
                >
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                    {/* Order ID */}
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Order ID</p>
                      <p className="text-sm font-medium text-neutral-900">{order.orderId}</p>
                    </div>
                    
                    {/* Date */}
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Date</p>
                      <p className="text-sm text-neutral-700">{order.date}</p>
                    </div>

                    {/* Total */}
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Total</p>
                      <p className="text-sm font-bold text-black">${order.total}.00</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 ml-auto">
                    {/* Status Badge */}
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>

                    {/* Expand Icon */}
                    <svg 
                      className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${expandedOrder === order.orderId ? "rotate-180" : ""}`} 
                      fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Order Details */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    expandedOrder === order.orderId ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 border-t border-neutral-100 mt-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-4 pt-4">Items in this order</h4>
                      
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 group">
                            {/* Item Image */}
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white">
                              <Image 
                                src={item.img} 
                                alt={item.title} 
                                fill 
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                            
                            {/* Item Info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{item.brand}</p>
                              <Link href={`/products/${item.id}`} className="block truncate">
                                <p className="text-sm font-medium text-neutral-800 hover:text-black transition-colors">
                                  {item.title}
                                </p>
                              </Link>
                              <p className="text-xs text-neutral-500 mt-0.5">
                                Qty: {item.quantity} × ${item.price}.00
                              </p>
                            </div>
                            
                            {/* Item Total Price */}
                            <div className="text-sm font-semibold text-neutral-900">
                              ${item.price * item.quantity}.00
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons for Order */}
                      <div className="mt-8 flex items-center justify-end gap-3">
                        <button className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition">
                          View Invoice
                        </button>
                        {order.status === "Delivered" && (
                          <button className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-white bg-black hover:bg-neutral-800 rounded-xl transition shadow-sm">
                            Buy Again
                          </button>
                        )}
                      </div>
                      
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}