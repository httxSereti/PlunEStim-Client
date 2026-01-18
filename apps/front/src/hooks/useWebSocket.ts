
import { useContext, createContext, useEffect, useRef } from 'react';

export interface WebSocketContextValue {
  status: string;
  error: string | null;
  reconnectAttempts: number;
  isConnected: boolean;
  send: <T = unknown>(type: string, payload?: T) => void;
  sendCommand: <T = unknown, R = unknown>(command: string, params?: T) => Promise<R>;
  disconnect: () => void;
  reconnect: () => void;
}

export const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export function useWebSocket() {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider');
  }

  return context;
}

// hook to subscribe to an event
export function useWebSocketEvent<T = unknown>(
  eventType: string,
  callback: (data: T) => void
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleEvent = (event: Event) => {
      const customEvent = event as CustomEvent<T>;
      callbackRef.current(customEvent.detail);
    };

    const eventName = `websocket:${eventType}`;
    window.addEventListener(eventName, handleEvent);

    return () => {
      window.removeEventListener(eventName, handleEvent);
    };
  }, [eventType]);
}
