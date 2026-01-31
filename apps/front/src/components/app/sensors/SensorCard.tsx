import type { FC } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Card, CardHeader, CardTitle, CardContent } from "@pes/ui/components/card";
import { sensorsSelectors, sensorUpdated } from "@/store/slices/sensorsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Skeleton } from "@pes/ui/components/skeleton";
import { MoreVertical, Edit, Trash2, Power } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@pes/ui/components/dropdown-menu";
import { Button } from "@pes/ui/components/button";
import { FieldLabel, Field, FieldContent, FieldDescription } from "@pes/ui/components/field";
import { Switch } from "@pes/ui/components/switch";
import SensorAlarmLevelComponent from "./SensorAlarmLevelComponent";

type SensorCardProps = {
    sensorId: string;
};

const SensorCard: FC<SensorCardProps> = ({ sensorId }) => {
    const sensor = useAppSelector(state => sensorsSelectors.selectById(state, sensorId));
    const dispatch = useAppDispatch()

    const { sendCommand } = useWebSocket();

    if (!sensor)
        return (
            <div className="flex flex-col space-y-3">
                <Skeleton className="h-[225px] w-80 rounded-xl" />
            </div>
        )

    const dotColor =
        sensor?.sensor_online === true
            ? "bg-green-500"
            : "bg-red-500";

    const toggleStatus = async () => {
        try {
            // toggle alarm_enable
            const newStatus = !sensor.alarm_enable;

            const data = await sendCommand('sensors:update', {
                [sensorId]: {
                    alarm_enable: newStatus,
                },
            });

            console.log("API response:", data);

            // Update Redux store
            dispatch(sensorUpdated({
                id: sensorId,
                changes: { alarm_enable: newStatus }
            }));
        } catch (error) {
            console.error('Failed to update sensor:', error);
        }
    };

    const handleEdit = () => {
        console.log("Edit sensor:", sensorId);
    };

    const handleDelete = () => {
        console.log("Delete sensor:", sensorId);
    };

    return (
        <Card className="">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-sm">{sensor?.id}</CardTitle>

                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <span
                            className={`h-3 w-3 rounded-full ${dotColor} cursor-pointer hover:opacity-80 transition-opacity`}
                        />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={toggleStatus}>
                                <Power className="mr-2 h-4 w-4" />
                                <span>{sensor.alarm_enable ? "Désactiver" : "Activer"}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleEdit}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Modifier</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Supprimer</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-5">
                    <p className="text-sm text-muted-foreground">
                        {sensor?.sensor_type}
                    </p>
                    {sensor.sensor_type === "motion" ? (
                        <>
                            <SensorAlarmLevelComponent sensorId={sensorId} sensorDataType="move" />
                            <SensorAlarmLevelComponent sensorId={sensorId} sensorDataType="position" />
                        </>
                    ) : (
                        <SensorAlarmLevelComponent sensorId={sensorId} sensorDataType="sound" />
                    )}
                    <Field orientation="horizontal" className="max-w-sm">
                        <FieldContent>
                            <FieldLabel htmlFor="switch-focus-mode">
                                Alarm
                            </FieldLabel>
                            <FieldDescription>
                                Enable Alarm and the consequences.
                            </FieldDescription>
                        </FieldContent>
                        <Switch id="switch-focus-mode" defaultChecked={sensor.alarm_enable} onClick={toggleStatus} />
                    </Field>
                </div>
            </CardContent>
        </Card>
    );
}

export default SensorCard;