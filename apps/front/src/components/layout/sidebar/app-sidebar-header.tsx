import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@pes/ui/components/sidebar"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { QuickSettings } from "@/components/layout/sidebar/quick-settings"

export function AppSidebarHeader() {
    const { open } = useSidebar()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="w-full flex gap-1 items-center pt-2">
                    <SidebarMenuButton size="lg" className="h-8 p-1 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" asChild>
                        <a href="#">
                            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <img src="/logo.png" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">PlunEStim</span>
                            </div>
                        </a>
                    </SidebarMenuButton>

                    {open ? (
                        <>
                            <ThemeToggle />
                            <QuickSettings />
                        </>
                    ) : null}

                </div>
            </SidebarMenuItem>
        </SidebarMenu >
    )
}
