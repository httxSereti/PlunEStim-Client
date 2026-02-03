
import type { Route } from ".react-router/types/src/pages/app/+types/units";
import { Units } from "@/components/common/units/units";

// eslint-disable-next-line no-empty-pattern
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "PES - Units" },
        { name: "description", content: "Manage, Controls and Watch Units connected to the server" },
    ];
}

export default function UnitsPage() {
    return (
        <Units />
    );
}