import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { unitsInitialized, unitUpdated } from './unitsSlice';

export const HISTORY_LEN = 20;

export interface UnitHistory {
    ch_A: number[];
    ch_B: number[];
}

export interface HistoryState {
    byId: Record<string, UnitHistory>;
}

function emptyHistory(): UnitHistory {
    return { ch_A: [], ch_B: [] };
}

function appendHistory(
    history: UnitHistory,
    ch_A: number,
    ch_B: number,
): UnitHistory {
    return {
        ch_A: [...history.ch_A, ch_A].slice(-HISTORY_LEN),
        ch_B: [...history.ch_B, ch_B].slice(-HISTORY_LEN),
    };
}

const initialState: HistoryState = { byId: {} };

const unitHistorySlice = createSlice({
    name: 'unitHistory',
    initialState,
    reducers: {
        /** Hard-reset history for all units (e.g. on reconnect) */
        historyReset(state) {
            state.byId = {};
        },
    },

    /**
     * Listen to actions dispatched by unitsSlice
     */
    extraReducers: (builder) => {
        // 'units:init' → reset and seed one entry per unit
        builder.addCase(unitsInitialized, (state, action) => {
            state.byId = {};
            const units = Object.values(action.payload);
            units.forEach(({ id, ch_A, ch_B }) => {
                state.byId[id] = appendHistory(emptyHistory(), ch_A, ch_B);
            });
        });

        // 'units:update' → append to the matching unit's history
        builder.addCase(unitUpdated, (state, action) => {
            const { id, changes } = action.payload;

            console.log(changes)
            // Only append when channel values are part of the update
            if (changes === undefined || (changes.ch_A === undefined && changes.ch_B === undefined)) return;

            if (!state.byId[id]) state.byId[id] = emptyHistory();

            const current = state.byId[id];
            state.byId[id] = appendHistory(
                current,
                changes.ch_A ?? current.ch_A.at(-1) ?? 0,
                changes.ch_B ?? current.ch_B.at(-1) ?? 0,
            );
        });
    },
});

export const selectUnitHistory =
    (id: string) =>
        (state: RootState): UnitHistory =>
            state.unitsHistory.byId[id] ?? emptyHistory();

export const selectAllHistory =
    (state: RootState): Record<string, UnitHistory> =>
        state.unitsHistory.byId;

export const { historyReset } = unitHistorySlice.actions;
export default unitHistorySlice.reducer;