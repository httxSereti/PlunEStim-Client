import { useEffect, useState } from "react";

export default function WebSocketLoggerComponent() {
  const [sensors, setSensors] = useState({});

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log(msg)

      if (msg.type === "command") {
        setSensors(msg.data);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Real-time Sensor Data</h1>
      <pre>{JSON.stringify(sensors, null, 2)}</pre>
    </div>
  );
}