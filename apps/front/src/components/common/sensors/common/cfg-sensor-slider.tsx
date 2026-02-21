import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { sensorsSelectors, sensorUpdated } from "@/store/slices/sensorsSlice";
import { Slider } from "@pes/ui/components/slider";
import type { FC } from "react";

type CfgSensorSliderProps = {
    sensorId: string;
    propertyKey: string;
    label: string;
    minValue: number;
    maxValue: number;
    step: number;
    unit: string;
    disabled: boolean;
};

export const CfgSensorSlider: FC<CfgSensorSliderProps> = ({ sensorId, propertyKey, minValue, maxValue, label, step, unit, disabled }) => {
    const sensor = useAppSelector(state => sensorsSelectors.selectById(state, sensorId));
    const dispatch = useAppDispatch()
    const { sendCommand } = useWebSocket();

    const currentValue = (sensor as never)[propertyKey] ?? 0;

    const updateLevel = async (newLevel: number | undefined) => {
        try {
            await sendCommand('sensors:update', {
                [sensorId]: {
                    [propertyKey]: newLevel,
                },
            });

            dispatch(sensorUpdated({
                id: sensorId,
                changes: { [propertyKey]: newLevel }
            }));
        } catch (error) {
            console.error(`Failed to update property '${propertyKey}' to '${newLevel}' on sensor:`, error);
        }
    };

    return (
        <div className={`transition-opacity duration-200 ${disabled ? "opacity-30 pointer-events-none" : ""}`}>
            <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] tracking-wide text-muted-foreground/60">{label}</span>
                <span className="font-mono text-[12px] font-medium text-primary">
                    {currentValue}<span className="text-muted-foreground/50 text-[10px] ml-0.5">{unit}</span>
                </span>
            </div>
            <Slider min={minValue} max={maxValue} step={step} value={[currentValue]} onValueChange={([v]) => updateLevel(v)} />
        </div>
    );
}
