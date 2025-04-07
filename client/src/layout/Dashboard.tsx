import { AppSidebar } from "@/layout/Sidebar"
import { SiteHeader } from "@/layout/NavHeader"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="p-6"><Outlet/></main>
      </SidebarInset>
    </SidebarProvider>
  )
}
