import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { WebSocketState, WebSocketStatus } from '@/types';

const initialState: WebSocketState = {
    status: 'disconnected',
    error: null,
    reconnectAttempts: 0,
    lastConnected: null,
};

const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<WebSocketStatus>) => {
            state.status = action.payload;
            if (action.payload === 'connected') {
                state.reconnectAttempts = 0;
                state.error = null;
                state.lastConnected = Date.now();
            }
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.status = 'error';
        },
        incrementReconnect: (state) => {
            state.reconnectAttempts += 1;
        },
        resetReconnect: (state) => {
            state.reconnectAttempts = 0;
        },
    },
});

export const { setStatus, setError, incrementReconnect, resetReconnect } = websocketSlice.actions;
export default websocketSlice.reducer;