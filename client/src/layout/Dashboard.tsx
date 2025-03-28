import { AppSidebar } from "@/layout/app-sidebar"
import { SiteHeader } from "@/layout/site-header"
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
