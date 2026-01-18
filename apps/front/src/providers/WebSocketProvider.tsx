import React, { useEffect, useCallback, useRef, type ReactNode } from 'react';
import { createId } from "@paralleldrive/cuid2";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { WebSocketContext, type WebSocketContextValue } from '@/hooks/useWebSocket';
import type { WebSocketMessage } from '@/types';

interface WebSocketProviderProps {
    children: ReactNode;
    wsUrl?: string;
}

export function WebSocketProvider({
    children,
}: WebSocketProviderProps) {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.websocket.status);
    const error = useAppSelector((state) => state.websocket.error);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    const hasInitialized = useRef(false);
    const isConnecting = useRef(false);
    const pendingCommands = useRef<Map<string, {
        resolve: (value: unknown) => void;
        reject: (reason: unknown) => void
    }>>(new Map());

    useEffect(() => {
        console.log('🔍 Auth state changed:', { isAuthenticated, hasInitialized: hasInitialized.current, isConnecting: isConnecting.current });

        if (isAuthenticated && !hasInitialized.current && !isConnecting.current) {
            console.log('🚀 Starting WebSocket connection...');
            hasInitialized.current = true;
            isConnecting.current = true;
            dispatch({ type: 'websocket/connect' });

            // Reset flag après connexion
            setTimeout(() => {
                isConnecting.current = false;
            }, 1000);
        }

    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated && hasInitialized.current) {
            console.log('🔌 Disconnecting WebSocket (logout)');
            hasInitialized.current = false;
            isConnecting.current = false;
            dispatch({ type: 'websocket/disconnect' });
        }
    }, [isAuthenticated, dispatch]);

    // listen to answer to commands
    useEffect(() => {
        const handleMessage = (event: Event) => {
            const customEvent = event as CustomEvent<{ id?: string; payload: unknown }>;
            const { id, payload } = customEvent.detail;

            if (id && pendingCommands.current.has(id)) {
                const pending = pendingCommands.current.get(id)!;
                pending.resolve(payload);
                pendingCommands.current.delete(id);
            }
        };

        window.addEventListener('websocket:command-response', handleMessage);

        return () => {
            window.removeEventListener('websocket:command-response', handleMessage);
        };
    }, []);

    const send = useCallback(
        <T = unknown,>(type: string, payload?: T) => {
            console.log('📤 Sending message:', type);
            dispatch({
                type: 'websocket/send',
                payload: { type, payload } as WebSocketMessage<T>,
            });
        },
        [dispatch]
    );

    const sendCommand = useCallback(
        <T = unknown, R = unknown,>(command: string, params?: T): Promise<R> => {
            return new Promise((resolve, reject) => {
                if (status !== 'connected') {
                    console.error('❌ Cannot send command, not connected:', status);
                    reject(new Error('WebSocket not connected'));
                    return;
                }

                const id = `${command}_${Date.now()}_${createId()}`;
                console.log('🎯 Sending command:', command, id);

                const timeout = setTimeout(() => {
                    pendingCommands.current.delete(id);
                    console.error('⏱️ Command timeout:', id);
                    reject(new Error('Command timeout'));
                }, 30000);

                pendingCommands.current.set(id, {
                    resolve: (value) => {
                        clearTimeout(timeout);
                        console.log('✅ Command resolved:', id);
                        resolve(value as R);
                    },
                    reject: (reason) => {
                        clearTimeout(timeout);
                        console.error('❌ Command rejected:', id);
                        reject(reason);
                    },
                });

                dispatch({
                    type: 'websocket/send',
                    payload: { type: command, payload: params, id }
                });
            });
        },
        [status, dispatch]
    );

    const disconnect = useCallback(() => {
        console.log('🔌 Manual disconnect requested');
        hasInitialized.current = false;
        isConnecting.current = false;
        dispatch({ type: 'websocket/disconnect' });
    }, [dispatch]);

    const reconnect = useCallback(() => {
        console.log('🔄 Manual reconnect requested');
        hasInitialized.current = false;
        isConnecting.current = false;
        dispatch({ type: 'websocket/disconnect' });

        setTimeout(() => {
            hasInitialized.current = true;
            isConnecting.current = true;
            dispatch({ type: 'websocket/connect' });
            setTimeout(() => {
                isConnecting.current = false;
            }, 1000);
        }, 300);
    }, [dispatch]);

    const value: WebSocketContextValue = {
        status,
        error,
        reconnectAttempts: 0,
        isConnected: status === 'connected',
        send,
        sendCommand,
        disconnect,
        reconnect,
    };

    console.log('🔄 WebSocketProvider render:', { status, isAuthenticated, hasInitialized: hasInitialized.current });

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
}