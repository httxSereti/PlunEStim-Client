import { createSlice } from '@reduxjs/toolkit';
import type { UnitSettings } from '@/types';
import type { RootState } from '@/store';
import { createEntityAdapter } from "@reduxjs/toolkit";

const unitsAdapter = createEntityAdapter<UnitSettings>();

const unitsSlice = createSlice({
    name: "units",
    initialState: unitsAdapter.getInitialState(),
    reducers: {
        unitsInitialized: unitsAdapter.setAll,
        unitUpdated: unitsAdapter.updateOne,
    },
});

export const unitsSelectors = unitsAdapter.getSelectors(
    (state: RootState) => state.units
);

export const { unitsInitialized, unitUpdated } = unitsSlice.actions;
export default unitsSlice.reducer;