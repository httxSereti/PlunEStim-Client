import { useEffect, useState } from "react";

interface WebsocketMessage {
  type: string;
  payload: unknown;
}

interface WSSensorNotification {
  type: string;
  payload: string[];
}


export default function WebSocketLoggerComponent() {
  const [sensorNotifications, setSensorNotifications] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onmessage = (event) => {
      const message: WebsocketMessage = JSON.parse(event.data);

      console.log(message)

      if (message.type === "sensor-notification") {
        const { payload } = message as WSSensorNotification;

        setSensorNotifications((prev) => [...prev, ...payload])
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Real-time Sensor Notifications</h1>
      <pre>{sensorNotifications.map((msg, index) => (
        <li key={index}>{msg}</li>
      ))}</pre>
    </div>
  );
}