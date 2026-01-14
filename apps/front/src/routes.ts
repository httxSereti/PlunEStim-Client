import {
    type RouteConfig,
    route,
} from "@react-router/dev/routes";

export default [
    route("/test", "pages/test.tsx"),
    route("/sensor", "pages/sensor.tsx"),
    route("/", "pages/home.tsx"),
    route("*?", "catchall.tsx"),
] satisfies RouteConfig;
