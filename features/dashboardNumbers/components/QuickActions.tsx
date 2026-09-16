import Link from "next/link";
import {
  ArrowUpRight,
  Images,
  Folder,
  Package,
  Timeline,
} from "lucide-react";

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const quickActions: QuickAction[] = [
  {
    title: "Add Banner",
    description: "Create a promotional banner",
    href: "/dashboard/banners/add",
    icon: Images,
  },
  {
    title: "Add Category",
    description: "Create a new product category",
    href: "/dashboard/categories/add",
    icon: Folder,
  },
  {
    title: "Add Product",
    description: "Add a new product to your store",
    href: "/dashboard/products/add",
    icon: Package,
  },
  {
    title: "Add Attribute",
    description: "Create a product attribute",
    href: "/dashboard/attributes/add",
    icon: Timeline,
  },
];

export function QuickActions() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-950">Quick Actions</h2>

        <p className="mt-1 text-sm text-gray-500">
          Create and manage important parts of your store.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-2xl border border-gray-200 bg-white py-5 px-2.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-900 transition-colors duration-200 group-hover:bg-gray-950 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                <ArrowUpRight className="h-5 w-5 text-gray-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gray-900" />
              </div>

              <div className="mt-5">
                <h3 className="font-semibold text-gray-950">{action.title}</h3>

                <p className="mt-1 text-sm leading-5 text-gray-500">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
