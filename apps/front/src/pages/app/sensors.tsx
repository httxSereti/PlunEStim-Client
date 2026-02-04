import { Sensors } from "@/components/common/sensors/sensors";
import type { Route } from ".react-router/types/src/pages/app/+types/sensors";
import type { RouteHandle } from "@/types/route-handle";

export const handle: RouteHandle = { header: "sensors" };

// eslint-disable-next-line no-empty-pattern
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "PES - Sensors" },
        { name: "description", content: "Manage, Controls and Watch sensors connected to the server" },
    ];
}

export default function SensorsPage() {
    return (
        <Sensors />
    );
}