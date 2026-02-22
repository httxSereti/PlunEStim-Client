import type { Route } from ".react-router/types/src/pages/app/admin/+types/users";

// eslint-disable-next-line no-empty-pattern
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "PES | Admin - Users" },
        { name: "description", content: "Manage users" },
    ];
}

export default function UsersAdminPage() {
    return (
        "cc world"
    );
}