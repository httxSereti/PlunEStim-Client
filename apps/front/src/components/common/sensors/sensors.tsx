import { Sensor } from "@/components/common/sensors/sensor";
import type { FC } from "react";

export const Sensors: FC = () => {
    return (
        <div className="flex justify-center bg-background p-4">
            <div className="w-full max-w-7xl grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <Sensor sensorId="sound" />
                <Sensor sensorId="motion1" />
                <Sensor sensorId="motion2" />
            </div>
        </div>
    );
}