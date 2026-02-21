import { SensorBar } from "@/components/common/sensors/common/sensor-bar";
import type { FC } from "react";

type CounterBlockProps = {
    label: string;
    counter: number;
    delayOn: number;
    delayOff: number;
};

const CounterBlock: FC<CounterBlockProps> = ({ label, counter, delayOn, delayOff }) => {
    if (counter > 0) {
        // Accumulation: bar fills as counter rises 0 → delayOn
        const pct = Math.min(100, (counter / delayOn) * 100);
        const isHigh = pct >= 75;
        return (
            <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] text-muted-foreground/40">{label} — accumulating</span>
                    <span className={`font-mono text-[10px] tabular-nums ${isHigh ? "text-destructive/70" : "text-muted-foreground/40"}`}>
                        {counter} / {delayOn}
                    </span>
                </div>
                <SensorBar pct={pct} isAlert={isHigh} />
            </div>
        );
    }

    if (counter < 0) {
        // Cooldown: counter goes from -delayOff up to 0
        // remaining = how far from 0 = Math.abs(counter)
        const remaining = Math.abs(counter);
        const pct = Math.min(100, (remaining / delayOff) * 100);
        return (
            <div className="flex flex-col gap-2 px-3 py-2.5 rounded-lg border border-amber-500/15 bg-amber-500/5">
                <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-amber-600/70 tracking-widest uppercase">{label} — cooldown</span>
                    <div className="flex items-baseline gap-0.5">
                        <span className="font-mono text-[20px] leading-none font-medium text-amber-500/90">{remaining}</span>
                        <span className="font-mono text-[10px] text-amber-600/50">s</span>
                    </div>
                </div>
                <SensorBar pct={pct} isAmber />
            </div>
        );
    }

    // Idle
    return (
        <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground/20" />
            <span className="font-mono text-[10px] text-muted-foreground/30">{label} — idle</span>
        </div>
    );
}

type AccumulationProps = {
    items: {
        label: string;
        counter: number;
        delayOn: number;
        delayOff: number;
    }[]
};


export const Accumulations: FC<AccumulationProps> = ({ items }) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                {items.map(item => (
                    <CounterBlock
                        key={item.label}
                        label={item.label}
                        counter={item.counter}
                        delayOn={item.delayOn}
                        delayOff={item.delayOff}
                    />
                ))}
            </div>
        </div>
    );
}
