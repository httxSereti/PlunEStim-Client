import type { Route } from "../pages/+types/home";
import WebSocketLoggerComponent from "@/components/websocket-logger";
import { Skeleton } from "@pes/ui/components/skeleton";
import { Button } from "@pes/ui/components/button";


// eslint-disable-next-line no-empty-pattern
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Hi" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col space-y-3">
          {/* <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div> */}
          <WebSocketLoggerComponent />
        </div>
      </div>
    </div>
  );
}