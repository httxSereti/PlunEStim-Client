import { createSlice } from '@reduxjs/toolkit';
import type { Sensor } from '@/types';
import type { RootState } from '@/store';
import { createEntityAdapter } from "@reduxjs/toolkit";

const sensorsAdapter = createEntityAdapter<Sensor>();

const sensorsSlice = createSlice({
    name: "sensors",
    initialState: sensorsAdapter.getInitialState(),
    reducers: {
        sensorsInitialized: sensorsAdapter.setAll,
        sensorUpdated: sensorsAdapter.updateOne,
    },
});

export const sensorsSelectors = sensorsAdapter.getSelectors(
    (state: RootState) => state.sensors
);

export const { sensorsInitialized, sensorUpdated } = sensorsSlice.actions;
export default sensorsSlice.reducer;