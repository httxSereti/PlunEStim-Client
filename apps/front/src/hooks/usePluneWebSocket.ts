import { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
interface WebsocketMessage {
  type: string;
  payload: unknown;
}

interface PluneEvent {
  type: string;
  event: string;
}

interface LevelUpdateSocketMessage {
  channel: string;
  level_new: number;
  level_old: number;
}

interface IUnitIntensity {
  time: string;
  channelA: number;
  channelB: number;
}

const usePluneWebSocket = () => {
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [events, setEvents] = useState<PluneEvent[]>([]);

  const [unitOneIntensity, setUnitOneIntensity] = useState<IUnitIntensity[]>([{
    time: new Date(Date.now() * 1000).toISOString(),
    channelA: 0,
    channelB: 0
  }])


  const socketUrl = "ws://localhost:8000/ws";

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: () => console.log("WebSocket connection established"),
      onClose: () => console.log("WebSocket connection closed"),
      onError: (error) => {
        console.error("WebSocket error:", error);
      },
      shouldReconnect: (closeEvent) => true, // Automatically reconnect
    }
  );

  useEffect(() => {
    if (lastJsonMessage) {
      const message = lastJsonMessage as WebsocketMessage;
      console.log(message)

      if (message.type === "level-update") {
        const msg = message.payload as LevelUpdateSocketMessage;

        console.log(msg)
        setUnitOneIntensity((currentData) => {
          const newDataPoint = {
            time: new Date(Date.now()).toISOString(),
            channelA: msg.level_new,
            channelB: msg.level_new,
            isNew: true,
          };
          const updatedData = currentData.map((point) => ({ ...point, isNew: false }));
          return [...updatedData, newDataPoint];
        });
      }
      // try {
      //   setChatMessages((prev) => [...prev, ...message?.payload]);
      //   //Put your logic here to classify the messages based on the type:
      //   //Go with a state management pattern to update your messages if you have complex apps
      // } catch (e) {
      //   console.error("Error parsing message:", e);
      // }
    }
  }, [lastJsonMessage]);

  const send = (message: { type: string; content: string }) => {
    sendJsonMessage(message); // send the event to server
  };

  return {
    readyState,
    events,
    unitOneIntensity,
    chatMessages,
    send,
  };
};

export default usePluneWebSocket; 