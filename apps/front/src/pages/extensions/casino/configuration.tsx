import { Skeleton } from "@pes/ui/components/skeleton";
import type { Route } from "./+types/configuration";

// eslint-disable-next-line no-empty-pattern
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Casino Extension" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function CasinoExtensionConfigurationPage() {
    const hash = window.location.hash.substring(1);
    const params = JSON.parse(decodeURIComponent(hash));
    const configurationToken = params.partnerConfigurationToken;

    console.log(configurationToken)

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
            <div className="flex flex-col space-y-3">
                {configurationToken ? configurationToken : "sal"}
                <Skeleton className="h-[250px] w-[250px] rounded-xl" />
            </div>
        </div>
        </div>
    );
}