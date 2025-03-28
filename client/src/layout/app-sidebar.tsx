import * as React from "react"
import {
  IconBuilding,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconDatabase,
} from "@tabler/icons-react"

import { NavMain } from "@/layout/nav-main"
import { NavUser } from "@/layout/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Sales",
      url: "/sale",
      icon: IconDatabase,
    },
    {
      title: "Purchase",
      url: "/purchase",
      icon: IconListDetails,
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: IconBuilding,
    },
    {
      title: "Reports",
      url: "/report",
      icon: IconReport,
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">AVM ERP</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
