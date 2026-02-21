import type { FC } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { sensorsSelectors } from "@/store/slices/sensorsSlice";
import { useAppSelector } from "@/store/hooks";
import { Skeleton } from "@pes/ui/components/skeleton";
import { Switch } from "@pes/ui/components/switch";
import { toast } from "sonner";
import { Bell, BellOff } from "lucide-react";

type SensorAlarmStatusProps = {
    sensorId: string;
};

export const SensorAlarmStatus: FC<SensorAlarmStatusProps> = ({ sensorId }) => {
    const sensor = useAppSelector(state => sensorsSelectors.selectById(state, sensorId));
    const { sendCommand } = useWebSocket();

    if (!sensor)
        return (
            <div className="flex flex-col space-y-3">
                <Skeleton className="h-[225px] w-80 rounded-xl" />
            </div>
        )

    const toggleStatus = async () => {
        try {
            const newStatus = !sensor.alarm_enable;

            await sendCommand('sensors:update', {
                [sensorId]: {
                    alarm_enable: newStatus,
                },
            });
        } catch (err: unknown) {
            const error: Error = err as Error;

            toast.error("Can't update Sensor", {
                description: (error as Error).message,
                position: "top-right",
            })

            console.error('Failed to update sensor:', error);
        }
    };

    return (
        <div className={`flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors ${sensor.alarm_enable ? "border-primary/20 bg-primary/5" : "border-border/30 bg-transparent"}`}>
            <div className="flex items-center gap-2">
                {sensor.alarm_enable
                    ? <Bell size={12} className="text-primary/70" />
                    : <BellOff size={12} className="text-muted-foreground/30" />}
                <span className={`font-mono text-[11px] ${sensor.alarm_enable ? "text-primary/80" : "text-muted-foreground/40"}`}>
                    Alarm {sensor.alarm_enable ? "enabled" : "disabled"}
                </span>
            </div>
            <Switch checked={sensor.alarm_enable} onCheckedChange={toggleStatus} />
        </div>
    )
}
