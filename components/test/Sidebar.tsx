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
  Timeline,
  Images 
} from "lucide-react"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Banners",
    url: "/dashboard/banners",
    icon: Images,
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
  )
}