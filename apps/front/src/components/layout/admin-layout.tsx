import { useAppSelector } from "@/store/hooks";
import {
    Navigate,
    Outlet,
} from "react-router";

export default function AdminLayout() {
    const { user, loading } = useAppSelector((state) => state.auth);

    if (loading) {
        return "Loading..."
    }

    if (!user || (user.role !== "admin" && user.role !== "root")) {
        return <Navigate to="/app" replace />;
    }

    return (
        <Outlet />
    );
}

