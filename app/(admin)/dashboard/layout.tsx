import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/test/Sidebar";
import { Toaster } from "sonner";

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
      <SidebarInset className="min-w-0 overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
