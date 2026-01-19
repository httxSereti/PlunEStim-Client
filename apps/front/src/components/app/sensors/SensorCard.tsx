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

type SensorCardProps = {
    sensorId: string;
};

const SensorCard: FC<SensorCardProps> = ({ sensorId }) => {
    const dispatch = useAppDispatch()
    const sensor = useAppSelector(state => sensorsSelectors.selectById(state, sensorId));

    const { sendCommand } = useWebSocket();

    if (!sensor)
        return (
            <div className="flex flex-col space-y-3">
                <Skeleton className="h-[225px] w-80 rounded-xl" />
            </div>
        )

    console.log(sensor)

    const dotColor =
        sensor?.sensor_online === true
            ? "bg-green-500"
            : "bg-red-500";

    const toggleStatus = async () => {
        try {
            // toggle sensor_online
            const newStatus = !sensor.sensor_online;

            const data = await sendCommand('sensors:update', {
                [sensorId]: {
                    sensor_online: newStatus,
                },
            });

            console.log("API response:", data);

            // Update Redux store
            dispatch(sensorUpdated({
                id: sensorId,
                changes: { sensor_online: newStatus }
            }));
        } catch (error) {
            console.error('Failed to update sensor:', error);
        }
    };

    const handleEdit = () => {
        console.log("Edit sensor:", sensorId);
        // Ajoutez votre logique d'édition ici
    };

    const handleDelete = () => {
        console.log("Delete sensor:", sensorId);
        // Ajoutez votre logique de suppression ici
    };

    return (
        <Card className="w-80 h-[225px]">
            <CardHeader className="flex flex-row justify-between items-start">
                <CardTitle className="text-sm font-medium">{sensor?.id}</CardTitle>

                <div className="flex items-center">
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
                                <span>{sensor.sensor_online ? "Désactiver" : "Activer"}</span>
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
                <p className="text-sm text-muted-foreground">
                    {sensor?.sensor_type}
                </p>
            </CardContent>
        </Card>
    );
}

export default SensorCard;