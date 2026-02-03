import { type LucideIcon } from "lucide-react"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@pes/ui/components/sidebar"
import { Link, useLocation } from "react-router"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon: LucideIcon
        isActive?: boolean
    }[]
}) {

    const location = useLocation()

    const isLinkActive = (url: string) => {
        return location.pathname === url || location.pathname.startsWith(url + '/')
    }

    return (
        <SidebarMenu className="p-2">
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild
                        isActive={isLinkActive(item.url)}
                    >
                        <Link to={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}
