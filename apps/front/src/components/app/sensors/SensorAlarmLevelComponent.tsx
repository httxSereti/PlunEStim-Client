import type { FC } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { sensorsSelectors, sensorUpdated } from "@/store/slices/sensorsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Skeleton } from "@pes/ui/components/skeleton";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@pes/ui/components/button";
import { FieldLabel, Field, FieldContent, FieldDescription } from "@pes/ui/components/field";
import { ButtonGroup } from "@pes/ui/components/button-group";
import { Input } from "@pes/ui/components/input";

type SensorAlarmLevelProps = {
    sensorId: string;
    sensorDataType: "move" | "position" | "sound";
};

const SENSOR_CONFIG = {
    sound: {
        propertyKey: 'sound_alarm_level',
    },
    move: {
        propertyKey: 'move_alarm_level',
    },
    position: {
        propertyKey: 'position_alarm_level',
    }
} as const;

const SensorAlarmLevelComponent: FC<SensorAlarmLevelProps> = ({ sensorId, sensorDataType }) => {
    const sensor = useAppSelector(state => sensorsSelectors.selectById(state, sensorId));
    const dispatch = useAppDispatch()
    const { sendCommand } = useWebSocket();

    const MIN_VALUE = 0;
    const MAX_VALUE = 100;

    // if (sensor && !sensor.sensor_online)
    if (!sensor)
        return (
            <Skeleton className="h-[46px]" />
        )

    const config = SENSOR_CONFIG[sensorDataType];
    const currentAlarmLevel = (sensor as never)[config.propertyKey] ?? 0;

    const handleIncrement = () => {
        if (currentAlarmLevel < MAX_VALUE) {
            updateAlarmLevel(currentAlarmLevel + 1)
        }
    };

    const handleInputChange = (e: { target: { value: string; }; }) => {
        const value = e.target.value;
        if (value === '') {
            updateAlarmLevel(0);
            return;
        }
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue) && numValue >= MIN_VALUE && numValue <= MAX_VALUE) {
            updateAlarmLevel(numValue);
        }
    };

    const handleInputBlur = () => {
        if (currentAlarmLevel === 0 || currentAlarmLevel < MIN_VALUE) {
            updateAlarmLevel(MIN_VALUE);
        } else if (currentAlarmLevel > MAX_VALUE) {
            updateAlarmLevel(MAX_VALUE);
        }
    };

    const handleDecrement = () => {
        if (currentAlarmLevel > MIN_VALUE) {
            updateAlarmLevel(currentAlarmLevel - 1)
        }
    };

    const updateAlarmLevel = async (newLevel: number) => {
        try {
            await sendCommand('sensors:update', {
                [sensorId]: {
                    [config.propertyKey]: newLevel,
                },
            });

            dispatch(sensorUpdated({
                id: sensorId,
                changes: { [config.propertyKey]: newLevel }
            }));
        } catch (error) {
            console.error(`Failed to update property '${config.propertyKey}' to '${newLevel}' on sensor:`, error);
        }
    };

    return (
        <Field orientation="horizontal" className="max-w-sm">
            <FieldContent>
                <FieldLabel htmlFor="switch-focus-mode">
                    Level ({sensorDataType})
                </FieldLabel>
                <FieldDescription>
                    Level to reach to trigger Alarm
                </FieldDescription>
            </FieldContent>
            <ButtonGroup
                orientation="horizontal"
                aria-label="Media controls"
                className="h-fit gap-2"
            >
                <Button variant="outline" size="icon"
                    onClick={handleDecrement}
                    disabled={currentAlarmLevel <= MIN_VALUE}
                >
                    <MinusIcon />
                </Button>
                <Input
                    id="input-alarm-level"
                    className="max-w-14 text-center text-lg font-semibold"
                    autoComplete="off"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    value={currentAlarmLevel}
                />
                <Button variant="outline" size="icon" onClick={handleIncrement}
                    disabled={currentAlarmLevel >= MAX_VALUE}>
                    <PlusIcon />
                </Button>
            </ButtonGroup>
        </Field>
    );
}

export default SensorAlarmLevelComponent;