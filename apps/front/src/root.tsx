import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@pes/ui/components/sidebar"
import { AppSidebar } from "@/components/ui/layouts/app-sidebar"
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { AppHeader } from "@/components/ui/layouts/app-header";

export function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <SidebarProvider
                        style={
                            {
                                "--sidebar-width": "calc(var(--spacing) * 72)",
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
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </SidebarInset>
                        <ScrollRestoration />
                        <Scripts />
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

export default function Root() {
    return <Outlet />;
}
