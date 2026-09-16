import Link from "next/link";
import {
  ArrowUpRight,
  BadgePercent,
  ShoppingCart,
  Users,
  Package,
  Clock3,
  Folder,
} from "lucide-react";

import type { DashboardNumbers } from "../types/index";

interface DashboardStatsProps {
  numbers: DashboardNumbers;
}

interface StatCard {
  title: string;
  description: string;
  value: number;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function DashboardStats({ numbers }: DashboardStatsProps) {
  const stats: StatCard[] = [
    {
      title: "Orders",
      description: "All orders",
      value: numbers.numberOfOrders,
      href: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Pending Orders",
      description: "Orders awaiting action",
      value: numbers.numberOfPendingOrders,
      href: "/dashboard/orders?status=PENDING&page=1",
      icon: Clock3,
    },
    {
      title: "Categories",
      description: "Categories in your store",
      value: numbers.numberOfCategories,
      href: "/dashboard/categories",
      icon: Folder,
    },
    {
      title: "Products",
      description: "Products in your store",
      value: numbers.numberOfProducts,
      href: "/dashboard/products",
      icon: Package,
    },
    {
      title: "Users",
      description: "Registered customers",
      value: numbers.numberOfUsers,
      href: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Active Promo Codes",
      description: "Currently active",
      value: numbers.numberOfActivePromoCodes,
      href: "/dashboard/promo-codes",
      icon: BadgePercent,
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-950">Store Overview</h2>

        <p className="mt-1 text-sm text-gray-500">
          A quick look at your store activity.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 md:p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
            >
              {/* subtle background decoration */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gray-50 transition-transform duration-300 group-hover:scale-125" />

              <div className="relative flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-900 transition-colors duration-200 group-hover:bg-gray-950 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                <ArrowUpRight className="h-5 w-5 text-gray-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gray-900" />
              </div>

              <div className="relative mt-5">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <p className="mt-1 text-3xl font-bold tracking-tight text-gray-950">
                  {stat.value.toLocaleString()}
                </p>

                <p className="mt-2 text-xs text-gray-400">{stat.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
