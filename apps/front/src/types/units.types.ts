export interface UnitSettings {
    // identifier
    id: string;
    // Channel A
    ch_A: number;
    ch_A_max: number;
    ch_A_ramp_phase: number;
    ch_A_ramp_prct: number;
    ch_A_multiplier: number;
    // Channel B
    ch_B: number;
    ch_B_max: number;
    ch_B_ramp_phase: number;
    ch_B_ramp_prct: number;
    ch_B_multiplier: number;
    // Soft ramp
    ramp_time: number;
    ramp_wave: boolean;
    ramp_progress: number;
    // Channels usage
    ch_A_use: string;
    ch_B_use: string;
    // Waveform setting 1
    adj_1: number;
    adj_1_max: number;
    adj_1_ramp_phase: number;
    adj_1_ramp_prct: number;
    // Waveform setting 2
    adj_2: number;
    adj_2_max: number;
    adj_2_ramp_phase: number;
    adj_2_ramp_prct: number;
    // 2B timer adjusts
    adj_3: number;
    adj_4: number;
    // Power config
    ch_link: boolean;
    level_d: boolean;
    level_h: boolean;
    level_map: number;
    power_bias: number;
    // Mode
    mode: number;
    // Status
    cnx_ok: boolean;
    sync: boolean;
    updated: boolean;
}

export interface UnitsState {
    ids: string[];
    entities: Record<string, UnitSettings>;
}