"use client";

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
} from "@/components/ui/sidebar";

import {
  Home,
  Package,
  Folder,
  ShoppingCart,
  Users,
  BarChart,
  Timeline,
  BriefcaseBusiness,
  Images,
  ClipboardList,
} from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Banners",
    url: "/dashboard/banners",
    icon: Images,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: Folder,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Attributes",
    url: "/dashboard/attributes",
    icon: Timeline,
  },

  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ShoppingCart,
  },

  {
    title: "Careers",
    url: "/dashboard/careers",
    icon: BriefcaseBusiness,
  },

  {
    title: "Applications",
    url: "/dashboard/applications",
    icon: ClipboardList,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <h2
          className="
            px-4 py-2 
            text-lg font-bold
            overflow-hidden
            whitespace-nowrap
            transition-all
            duration-300
            group-data-[collapsible=icon]:opacity-0
            group-data-[collapsible=icon]:-translate-x-4
          "
        >
          Admin Panel
        </h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            className="
              transition-all
              duration-300
              group-data-[collapsible=icon]:opacity-0
            "
          >
            Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="shrink-0" />

                      <span
                        className="
                          overflow-hidden
                          whitespace-nowrap
                          transition-all
                          duration-300
                          group-data-[collapsible=icon]:opacity-0
                          group-data-[collapsible=icon]:-translate-x-3
                        "
                      >
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <p
          className="
            px-4 py-2 
            text-sm 
            text-muted-foreground
            transition-all
            duration-300
            group-data-[collapsible=icon]:opacity-0
            group-data-[collapsible=icon]:-translate-x-3
          "
        >
          © 2026 Admin
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
