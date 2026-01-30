import type { Route } from "./+types/home";
import WebSocketLoggerComponent from "@/components/websocket-logger";
import { Skeleton } from "@pes/ui/components/skeleton";
import { Button } from "@pes/ui/components/button";
import RealTimeChart from "@/components/rt-chart";
import { ChartAreaInteractive } from "@/components/area-chart";
import { useWebSocket } from "@/hooks/useWebSocket";
// import { UnitSettingsDialog } from "@/components/app/units/UnitSettingsDialog";
import UnitUpdateSettingsForm from "@/components/app/units/UnitUpdateSettingsForm";
// import usePluneWebSocket from "@/hooks/usePluneWebSocket";


// eslint-disable-next-line no-empty-pattern
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "PES" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  // const { readyState, events } = usePluneWebSocket();
  const { status, isConnected, send, reconnect } = useWebSocket();

  return (
    <div className="flex flex-1 flex-row justify-center gap-4 p-4 pt-0">
      <UnitUpdateSettingsForm unitName="UNIT1" />
      <UnitUpdateSettingsForm unitName="UNIT2" />
      <UnitUpdateSettingsForm unitName="UNIT3" />

      {/* <RealTimeChart /> */}
      {/* {readyState === 1 ? "Connected" : "Disconnected"} */}
      {/* <ChartAreaInteractive />
      <ChartAreaInteractive />
      <ChartAreaInteractive /> */}
      {/* {JSON.stringify(events)} */}
    </div>
  );
}