import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/test/Sidebar"
import { Toaster } from "sonner"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
         <Toaster
          toastOptions={{
            classNames: {
              success: "border-green-500",
              error: "border-red-500",
            },
          }}
        />
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}