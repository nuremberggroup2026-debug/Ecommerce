
"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import {
  Home,
  Package,
  Folder,
  ShoppingCart,
  Users,
  Boxes,
  BarChart,
  Megaphone,
  Star,
  Settings,
} from "lucide-react"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: Folder,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: Boxes,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "Marketing",
    url: "/dashboard/marketing",
    icon: Megaphone,
  },
  {
    title: "Reviews",
    url: "/dashboard/reviews",
    icon: Star,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="px-4 py-2 text-lg font-bold">
          Admin Panel
        </h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <p className="px-4 py-2 text-sm text-muted-foreground">
          © 2026 Admin
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}


