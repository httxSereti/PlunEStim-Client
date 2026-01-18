
import type { Middleware } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '@/store';
import type { WebSocketConfig, WebSocketMessage, WebSocketIncomingMessage } from '@/types';
import { setStatus, setError, incrementReconnect, resetReconnect } from '../slices/websocketSlice';
import { logout } from '@/store/slices/authSlice';
// import { addMessage } from '@/store/slices/messagesSlice';

export function createWebSocketMiddleware(config: WebSocketConfig): Middleware {
    const {
        url,
        reconnect = true,
        reconnectAttempts = 10,
        reconnectInterval = 3000,
        heartbeatInterval = 25000,
        heartbeatTimeout = 60000,
        getToken,
    } = config;

    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;
    let heartbeatIntervalId: NodeJS.Timeout | null = null;
    let heartbeatTimeoutId: NodeJS.Timeout | null = null;

    const startHeartbeat = () => {
        stopHeartbeat();

        heartbeatIntervalId = setInterval(() => {
            if (ws?.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'ping' }));

                // Timeout si pas de réponse
                heartbeatTimeoutId = setTimeout(() => {
                    console.warn('Heartbeat timeout - closing connection');
                    ws?.close();
                }, heartbeatTimeout);
            }
        }, heartbeatInterval);
    };

    const stopHeartbeat = () => {
        if (heartbeatIntervalId) {
            clearInterval(heartbeatIntervalId);
            heartbeatIntervalId = null;
        }
        if (heartbeatTimeoutId) {
            clearTimeout(heartbeatTimeoutId);
            heartbeatTimeoutId = null;
        }
    };

    const connect = (dispatch: AppDispatch, getState: () => RootState) => {
        if (ws?.readyState === WebSocket.OPEN) return;

        const token = getToken ? getToken() : null;

        if (!token) {
            dispatch(setError('No authentication token'));
            return;
        }

        dispatch(setStatus('connecting'));

        // token inside url
        const wsUrl = `${url}?token=${encodeURIComponent(token)}`;

        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            dispatch(setStatus('connected'));
            dispatch(resetReconnect());
            startHeartbeat();
        };

        ws.onclose = (event) => {
            dispatch(setStatus('disconnected'));
            stopHeartbeat();

            // Code 4001/4003 = auth error
            if (event.code === 4001 || event.code === 4003) {
                dispatch(setError('Authentication failed'));
                dispatch(logout());
                return;
            }

            // Reconnexion automatique
            const state = getState();
            if (reconnect && state.websocket.reconnectAttempts < reconnectAttempts) {
                dispatch(incrementReconnect());

                // Backoff exponentiel
                const delay = Math.min(
                    reconnectInterval * Math.pow(2, state.websocket.reconnectAttempts),
                    30000
                );

                reconnectTimeout = setTimeout(() => connect(dispatch, getState), delay);
            }
        };

        ws.onerror = () => {
            dispatch(setError('WebSocket error'));
        };

        ws.onmessage = (event) => {
            try {
                const message: WebSocketIncomingMessage = JSON.parse(event.data);

                // Répondre au heartbeat
                if (message.type === 'pong') {
                    if (heartbeatTimeoutId) {
                        clearTimeout(heartbeatTimeoutId);
                        heartbeatTimeoutId = null;
                    }
                    return;
                }

                // Gérer les erreurs d'auth
                if (message.type === 'auth:error' || message.type === 'error:unauthorized') {
                    dispatch(setError('Authentication error'));
                    dispatch(logout());
                    ws?.close(4001, 'Unauthorized');
                    return;
                }

                // dispatch to listener of events
                const customEvent = new CustomEvent(`websocket:${message.type}`, {
                    detail: message.payload,
                });
                window.dispatchEvent(customEvent);

                // Router les messages
                switch (message.type) {
                    case 'notification':
                    case 'chat:message':
                        // dispatch(addMessage({ type: message.type, data: message.payload }));
                        break;

                    case 'user:connected':
                    case 'user:disconnected':
                        // Gérer dans d'autres slices si nécessaire
                        break;

                    //   default:
                    //     // Messages génériques
                    //     if (message.type.includes('message') || message.type.includes('notification')) {
                    //       dispatch(addMessage({ type: message.type, data: message.payload }));
                    //     }
                }
            } catch (err) {
                console.error('Failed to parse WebSocket message:', err);
            }
        };
    };

    const disconnect = () => {
        if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
            reconnectTimeout = null;
        }
        stopHeartbeat();
        ws?.close();
        ws = null;
    };

    return (store) => (next) => (action) => {
        const { dispatch, getState } = store;

        const websocketMessage = action as WebSocketMessage;

        // Actions personnalisées
        switch (websocketMessage.type) {
            case 'websocket/connect':
                connect(dispatch, getState);
                break;

            case 'websocket/disconnect':
                disconnect();
                break;

            case 'websocket/send':
                if (ws?.readyState === WebSocket.OPEN) {
                    try {
                        ws.send(JSON.stringify(websocketMessage.payload));
                    } catch (err) {
                        console.error('Error sending WebSocket message:', err);
                    }
                } else {
                    console.warn('WebSocket not connected, cannot send message');
                }
                break;

            case 'auth/logout':
                disconnect();
                break;

            case 'auth/setToken':
                // Reconnecter avec le nouveau token
                disconnect();
                // Attendre que la déconnexion soit complète
                setTimeout(() => {
                    const state = getState();
                    if (state.auth.isAuthenticated) {
                        connect(dispatch, getState);
                    }
                }, 300);
                break;
        }

        return next(action);
    };
}
