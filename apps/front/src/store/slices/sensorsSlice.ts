import { createSlice } from '@reduxjs/toolkit';
import type { Sensor } from '@/types';
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

export const { sensorsInitialized, sensorUpdated } = sensorsSlice.actions;
export default sensorsSlice.reducer;