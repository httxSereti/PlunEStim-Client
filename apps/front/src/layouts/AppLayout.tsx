import {
    Outlet
} from "react-router";

import { SidebarInset, SidebarProvider } from "@pes/ui/components/sidebar"
import { AppSidebar } from "@/components/ui/layouts/sidebar/app-sidebar"
import { AppHeader } from "@/components/ui/layouts/app-header";

export default function AppLayout() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "244px",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <AppHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

