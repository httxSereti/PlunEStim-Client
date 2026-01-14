import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import { ThemeProvider } from "@/components/ui/theme/theme-provider";

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
                    {children}
                    <ScrollRestoration />
                    <Scripts />
                </ThemeProvider>
            </body>
        </html>
    );
}

export default function Root() {
    return <Outlet />;
}
