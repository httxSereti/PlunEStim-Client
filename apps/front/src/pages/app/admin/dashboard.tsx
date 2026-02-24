import type { Route } from ".react-router/types/src/pages/app/admin/+types/dashboard";

// eslint-disable-next-line no-empty-pattern
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "PES | Admin - Dashboard" },
        { name: "description", content: "Admin dashboard" },
    ];
}

export default function DashboardPage() {
    return (
        "dashboard"
    );
}