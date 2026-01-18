import React, { useEffect, useCallback, useRef, type ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { WebSocketContext, type WebSocketContextValue } from '@/hooks/useWebSocket';
import type { WebSocketMessage } from '@/types';

interface WebSocketProviderProps {
    children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
    const dispatch = useAppDispatch();
    const { status, error, reconnectAttempts } = useAppSelector((state) => state.websocket);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const hasInitialized = useRef(false);
    const pendingCommands = useRef<Map<string, {
        resolve: (value: unknown) => void;
        reject: (reason: unknown) => void
    }>>(new Map());

    // Connecter automatiquement si authentifié (une seule fois)
    useEffect(() => {
        if (isAuthenticated && !hasInitialized.current) {
            hasInitialized.current = true;
            dispatch({ type: 'websocket/connect' });
        }
    }, [dispatch, isAuthenticated]);

    // Réinitialiser si déconnexion
    useEffect(() => {
        if (!isAuthenticated && hasInitialized.current) {
            hasInitialized.current = false;
            dispatch({ type: 'websocket/disconnect' });
        }
    }, [isAuthenticated, dispatch]);

    const send = useCallback(
        <T = unknown>(type: string, payload?: T) => {
            dispatch({
                type: 'websocket/send',
                payload: { type, payload } as WebSocketMessage<T>,
            });
        },
        [dispatch]
    );

    const sendCommand = useCallback(
        <T = unknown, R = unknown>(command: string, params?: T): Promise<R> => {
            return new Promise((resolve, reject) => {
                if (status !== 'connected') {
                    reject(new Error('WebSocket not connected'));
                    return;
                }

                const id = `${command}_${Date.now()}_${Math.random()}`;
                const timeout = setTimeout(() => {
                    pendingCommands.current.delete(id);
                    reject(new Error('Command timeout'));
                }, 30000);

                pendingCommands.current.set(id, {
                    resolve: (value) => {
                        clearTimeout(timeout);
                        resolve(value as R);
                    },
                    reject: (reason) => {
                        clearTimeout(timeout);
                        reject(reason);
                    },
                });

                send(command, { ...params, id });
            });
        },
        [status, send]
    );

    const disconnect = useCallback(() => {
        hasInitialized.current = false;
        dispatch({ type: 'websocket/disconnect' });
    }, [dispatch]);

    const reconnect = useCallback(() => {
        dispatch({ type: 'websocket/disconnect' });
        setTimeout(() => {
            hasInitialized.current = true;
            dispatch({ type: 'websocket/connect' });
        }, 300);
    }, [dispatch]);

    const value: WebSocketContextValue = {
        status,
        error,
        reconnectAttempts,
        isConnected: status === 'connected',
        send,
        sendCommand,
        disconnect,
        reconnect,
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
}