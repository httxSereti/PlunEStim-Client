import { Button } from "@pes/ui/components/button";
import { useSidebar } from "@pes/ui/components/sidebar";
import { SidebarIcon } from "lucide-react";
import { Separator } from "@pes/ui/components/separator";
import { AddUser } from "@/components/layout/headers/admin/users/add-user";

export function AdminUsersHeader() {
    const { toggleSidebar } = useSidebar()

    return (
        <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
            <div className="flex h-[48px] w-full items-center gap-2 px-4">
                <Button
                    className="h-8 w-8"
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                >
                    <SidebarIcon />
                </Button>
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="ml-auto flex items-center gap-2">
                    <AddUser />
                </div>
            </div>
        </header>
    )
}
