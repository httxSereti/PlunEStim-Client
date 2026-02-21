import { CfgSensorSlider } from "@/components/common/sensors/common/cfg-sensor-slider";
import { LevelBlock } from "@/components/common/sensors/common/level-block";
import { SensorAlarmStatus } from "@/components/common/sensors/common/sensor-alarm-status";
import type { SoundSensor } from "@/types";
import { Separator } from "@pes/ui/components/separator";
import type { FC } from "react";

type SoundSensorProps = {
    sensorId: string;
    sensor: SoundSensor;
};

export const SensorSound: FC<SoundSensorProps> = ({ sensorId, sensor }) => {
    const isAlarming = sensor.alarm_enable && sensor.current_sound >= sensor.sound_alarm_level;

    return (
        <div className="flex flex-col gap-3">
            <LevelBlock
                label="Current level" value={sensor.current_sound} unit="%"
                note={`threshold ${sensor.sound_alarm_level} %`}
                gaugeVal={sensor.current_sound} gaugeMax={90} isAlert={isAlarming}
            />
            <Separator className="bg-border/40" />
            <p className="text-[11px] uppercase text-muted-foreground/50">
                Settings
            </p>
            <SensorAlarmStatus sensorId={sensorId} />
            <CfgSensorSlider
                sensorId={sensorId}
                label={"Alarm level to trigger"}
                unit={"%"}
                propertyKey={"sound_alarm_level"}
                step={1}
                minValue={1}
                maxValue={90}
                disabled={false}
            />
            <CfgSensorSlider
                sensorId={sensorId}
                label={"Number of seconds it can be triggered"}
                unit={"s"}
                propertyKey={"sound_delay_on"}
                step={1}
                minValue={1}
                maxValue={120}
                disabled={false}
            />
            <CfgSensorSlider
                sensorId={sensorId}
                label={"Number of seconds until it can trigger again (cooldown)"}
                unit={"s"}
                propertyKey={"sound_delay_off"}
                step={1}
                minValue={1}
                maxValue={120}
                disabled={false}
            />
        </div>
    );
}
