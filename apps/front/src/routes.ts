import {
    type RouteConfig,
    index,
    route,
} from "@react-router/dev/routes";

export default [

    route("app", "layouts/AppLayout.tsx", [
        index("pages/home.tsx"),
        route("test", "pages/test.tsx"),
        route("sensor", "pages/app/sensors.tsx"),
    ]),

    route("auth", "pages/auth/sign.tsx"),


    route("*?", "catchall.tsx"),
] satisfies RouteConfig;
