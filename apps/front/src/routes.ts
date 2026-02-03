import {
    type RouteConfig,
    index,
    route,
} from "@react-router/dev/routes";

export default [

    route("app", "components/layout/app-layout.tsx", [
        index("pages/home.tsx"),
        route("units", "pages/app/units.tsx"),
        route("sensors", "pages/app/sensors.tsx"),
    ]),

    route("auth", "pages/auth/sign.tsx"),

    route("*?", "catchall.tsx"),
] satisfies RouteConfig;
