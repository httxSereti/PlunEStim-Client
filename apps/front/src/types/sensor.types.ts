export interface BaseSensor {
    id: string;
    sensor_online: boolean;
    alarm_enable: boolean;
}

export interface MotionSensor extends BaseSensor {
    sensor_type: "motion";

    position_ref: number;
    position_alarm_level: number;
    position_delay_on: number;
    position_delay_off: number;

    move_alarm_level: number;
    move_delay_on: number;
    move_delay_off: number;

    position_alarm_counter: number;
    move_alarm_counter: number;

    position_alarm_number: number;
    move_alarm_number: number;

    position_alarm_number_action: number;
    move_alarm_number_action: number;

    current_position: number;
    current_move: number;
}

export interface SoundSensor extends BaseSensor {
    sensor_type: "sound";

    sound_alarm_level: number;
    sound_delay_on: number;
    sound_delay_off: number;

    sound_alarm_counter: number;
    sound_alarm_number: number;
    sound_alarm_number_action: number;

    current_sound: number;
}

export type Sensor = MotionSensor | SoundSensor;

export interface SensorsState {
    ids: string[];
    entities: Record<string, Sensor>;
}