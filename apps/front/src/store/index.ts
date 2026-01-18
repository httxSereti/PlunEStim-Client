import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import websocketReducer from '@/store/slices/websocketSlice';
import { createWebSocketMiddleware } from '@/store/middleware/websocketMiddleware';

const wsMiddleware = createWebSocketMiddleware({
    url: 'ws://localhost:8000/ws',
    reconnect: true,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
    heartbeatInterval: 25000,
    heartbeatTimeout: 60000,
    getToken: () => {
        const token = localStorage.getItem('token');
        return token;
    },
});

export const store = configureStore({
    reducer: {
        auth: authReducer,
        websocket: websocketReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['websocket/send'],
            },
        }).concat(wsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
