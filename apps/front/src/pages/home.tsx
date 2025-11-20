import type { Route } from "../pages/+types/home";

// eslint-disable-next-line no-empty-pattern
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Hi" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <>Hi! Home</>;
}