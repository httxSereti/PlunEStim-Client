import {
    type RouteConfig,
    route,
} from "@react-router/dev/routes";

export default [
    route("/extensions/casino/configuration", "pages/extensions/casino/configuration.tsx"),
    route("/test", "pages/home.tsx"),
    route("*?", "catchall.tsx"),
] satisfies RouteConfig;
