import { Accumulations } from "@/components/common/sensors/common/accumulations";
import { CfgSensorSlider } from "@/components/common/sensors/common/cfg-sensor-slider";
import { LevelBlock } from "@/components/common/sensors/common/level-block";
import { SensorAlarmStatus } from "@/components/common/sensors/common/sensor-alarm-status";
import type { MotionSensor } from "@/types";
import { Separator } from "@pes/ui/components/separator";
import type { FC } from "react";

type SensorMotionProps = {
    sensorId: string;
    sensor: MotionSensor;
};

export const SensorMotion: FC<SensorMotionProps> = ({ sensorId, sensor }) => {
    const posDelta = Math.abs(sensor.current_position - sensor.position_ref);
    // const posAlert = sensor.alarm_enable && posDelta >= sensor.position_alarm_level;
    const moveAlert = sensor.alarm_enable && sensor.current_move >= sensor.move_alarm_level;

    return (
        <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
                <LevelBlock
                    label="Position (🐛)" value={sensor.current_position} unit="u"
                    note={`ref ${sensor.position_ref}`}
                    gaugeVal={posDelta} gaugeMax={sensor.position_alarm_level * 1.5} isAlert={false}
                />
                <LevelBlock
                    label="Movement" value={sensor.current_move} unit=""
                    note={`threshold ${sensor.move_alarm_level}`}
                    gaugeVal={sensor.current_move} gaugeMax={sensor.move_alarm_level * 1.5} isAlert={moveAlert}
                />
            </div>

            <Separator className="bg-border/40" />
            <p className="text-[11px] uppercase text-muted-foreground/50">
                Status
            </p>

            <Accumulations items={[
                { label: "Position", counter: sensor.position_alarm_counter, delayOn: sensor.position_delay_on, delayOff: sensor.position_delay_off },
                { label: "Movement", counter: sensor.move_alarm_counter, delayOn: sensor.move_delay_on, delayOff: sensor.move_delay_off },
            ]} />

            <Separator className="bg-border/40" />
            <p className="text-[11px] uppercase text-muted-foreground/50">
                Settings
            </p>

            <SensorAlarmStatus sensorId={sensorId} />

            <div className="flex flex-col gap-3.5 px-3 py-3 rounded-lg border border-border/25 bg-muted/10">
                <p className="font-mono text-[10px] tracking-widest uppercase text-primary/30">Position</p>
                <CfgSensorSlider
                    sensorId={sensorId}
                    label={"Alarm level to trigger"}
                    unit={"%"}
                    propertyKey={"position_alarm_level"}
                    step={1}
                    minValue={1}
                    maxValue={50}
                    disabled={false}
                />
                <CfgSensorSlider
                    sensorId={sensorId}
                    label={"Number of seconds it can be triggered"}
                    unit={"s"}
                    propertyKey={"position_delay_on"}
                    step={1}
                    minValue={1}
                    maxValue={120}
                    disabled={false}
                />
                <CfgSensorSlider
                    sensorId={sensorId}
                    label={"Number of seconds until it can trigger again (cooldown)"}
                    unit={"s"}
                    propertyKey={"position_delay_off"}
                    step={1}
                    minValue={1}
                    maxValue={120}
                    disabled={false}
                />
            </div>


            <div className="flex flex-col gap-3.5 px-3 py-3 rounded-lg border border-border/25 bg-muted/10">
                <p className="font-mono text-[10px] tracking-widest uppercase text-primary/30">Movement</p>
                <CfgSensorSlider
                    sensorId={sensorId}
                    label={"Alarm level to trigger"}
                    unit={"%"}
                    propertyKey={"move_alarm_level"}
                    step={1}
                    minValue={1}
                    maxValue={50}
                    disabled={false}
                />
                <CfgSensorSlider
                    sensorId={sensorId}
                    label={"Number of seconds it can be triggered"}
                    unit={"s"}
                    propertyKey={"move_delay_on"}
                    step={1}
                    minValue={1}
                    maxValue={120}
                    disabled={false}
                />
                <CfgSensorSlider
                    sensorId={sensorId}
                    label={"Number of seconds until it can trigger again (cooldown)"}
                    unit={"s"}
                    propertyKey={"move_delay_off"}
                    step={1}
                    minValue={1}
                    maxValue={120}
                    disabled={false}
                />
            </div>

            {/* <Separator className="bg-border/40" />
            <p className="text-[11px] uppercase text-muted-foreground/50">
                Statistics
            </p>

            <div>
                <div className="flex justify-between items-center py-1 border-b border-border/50 last:border-0">
                    <span className="font-mono text-[11px] text-muted-foreground/50">Position alarms fired</span>
                    <span className="font-mono text-[11px] text-foreground/80">{sensor.position_alarm_number}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/50 last:border-0">
                    <span className="font-mono text-[11px] text-muted-foreground/50">Movement alarms fired</span>
                    <span className="font-mono text-[11px] text-foreground/80">{sensor.move_alarm_number}</span>
                </div>
            </div> */}
        </div>
    );
}
