import type { Route } from "../pages/+types/home";
import usePluneWebSocket from "@/hooks/usePluneWebSocket";

// eslint-disable-next-line no-empty-pattern
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "PES" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { readyState, events } = usePluneWebSocket();

  return (
    <div className="home">
      {readyState === 1 ? "Connected" : "Disconnected"}
      {JSON.stringify(events)}
    </div>
  );
}