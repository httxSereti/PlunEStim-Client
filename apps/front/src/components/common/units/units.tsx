import { Unit } from "@/components/common/units/unit";
import type { FC } from "react";

export const Units: FC = () => {
    return (
        <div className="flex justify-center bg-background p-4">
            <div className="w-full max-w-7xl grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <Unit unitName="UNIT1" />
                <Unit unitName="UNIT2" />
                <Unit unitName="UNIT3" />
            </div>
        </div>
    );
}