import { Button } from "@pes/ui/components/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@pes/ui/components/tooltip"
import { Kbd, KbdGroup } from "@pes/ui/components/kbd"
import { Zap } from "lucide-react"

export function QuickSettings() {

    return (
        <Tooltip>
            <TooltipTrigger className="cursor-pointer" asChild>
                <Button className="size-8 shrink-0" variant="ghost" size="icon">
                    <Zap />
                </Button>
            </TooltipTrigger>
            <TooltipContent className="pr-1.5">
                <div className="flex items-center gap-2">
                    Open Quick Settings
                    <KbdGroup>
                        <Kbd>Ctrl</Kbd>
                        <Kbd>S</Kbd>
                    </KbdGroup>
                </div>
            </TooltipContent>
        </Tooltip>

    )
}
