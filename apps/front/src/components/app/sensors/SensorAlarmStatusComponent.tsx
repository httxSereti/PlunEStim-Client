import type { FC } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { sensorsSelectors } from "@/store/slices/sensorsSlice";
import { useAppSelector } from "@/store/hooks";
import { Skeleton } from "@pes/ui/components/skeleton";
import { FieldLabel, Field, FieldContent, FieldDescription } from "@pes/ui/components/field";
import { Switch } from "@pes/ui/components/switch";
import { toast } from "sonner";

type SensorAlarmStatusProps = {
    sensorId: string;
};

const SensorAlarmStatusComponent: FC<SensorAlarmStatusProps> = ({ sensorId }) => {
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
        <Field orientation="horizontal" className="max-w-sm">
            <FieldContent>
                <FieldLabel htmlFor="switch-focus-mode">
                    Alarm
                </FieldLabel>
                <FieldDescription>
                    Enable Alarm and the consequences.
                </FieldDescription>
            </FieldContent>
            <Switch id="switch-focus-mode" checked={sensor.alarm_enable} onClick={toggleStatus} />
        </Field>
    );
}

export default SensorAlarmStatusComponent;