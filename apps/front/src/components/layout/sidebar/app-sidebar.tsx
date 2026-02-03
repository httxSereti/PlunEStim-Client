import * as React from "react"
import {
  BookOpen,
  Cloud,
  Frame,
  HardDrive,
  Home,
  Map,
  PieChart,
  Settings2,
  Sparkles,
  SquareTerminal,
} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@pes/ui/components/sidebar"
import { NavMain } from "@/components/layout/sidebar/nav-main"
import { NavPlayground } from "@/components/layout/sidebar/nav-playground"
import { NavProjects } from "@/components/layout/sidebar/nav-projects"
import { NavUser } from "@/components/layout/sidebar/nav-user"
import { AppSidebarHeader } from "@/components/layout/sidebar/app-sidebar-header"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Home",
      url: "/app/",
      icon: Home,
    },
    {
      title: "Notifications",
      url: "/app/notifications",
      icon: Sparkles,
    },
    {
      title: "Units",
      url: "/app/units",
      icon: HardDrive,
    },
    {
      title: "Sensors",
      url: "/app/sensors",
      icon: Cloud,
    },
  ],
  navPlayground: [
    {
      title: "Playground",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Units",
          url: "/app/units",
          icon: Map,
        },
        {
          title: "Sensors",
          url: "/app/sensors",
        },
        {
          title: "Settings",
          url: "/app/settings",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavPlayground items={data.navPlayground} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
