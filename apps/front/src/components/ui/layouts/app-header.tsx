import { Button } from "@pes/ui/components/button";
import { useSidebar } from "@pes/ui/components/sidebar";
import { SidebarIcon } from "lucide-react";
import { Separator } from "@pes/ui/components/separator";
import { ModeToggle } from "../theme/mode-toggle";

export function AppHeader() {
    const { toggleSidebar } = useSidebar()

    return (
        <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
            <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
                <Button
                    className="h-8 w-8"
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                >
                    <SidebarIcon />
                </Button>
                <Separator orientation="vertical" className="mr-2 h-4" />
                {/* <Breadcrumb className="hidden sm:block">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">
                                Building Your Application
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb> */}
                <div className="w-full sm:ml-auto sm:w-auto">
                    <div className="relative">
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}
