import type { FC } from "react";

type LevelBlockProps = {
    label: string;
    value: number;
    unit: string;
    note: string;
    gaugeVal: number;
    gaugeMax: number;
    isAlert: boolean;
};

type BarProps = {
    pct: number;
    isAlert: boolean;
    isAmber?: boolean;
};

const Bar: FC<BarProps> = ({ pct, isAlert, isAmber }) => {
    const color = isAlert
        ? "hsl(var(--destructive))"
        : isAmber
            ? "#d97706"
            : "hsl(var(--primary))";
    return (
        <div className="h-1 w-full rounded-full bg-muted/50 overflow-hidden">
            <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, pct)}%`, background: color, opacity: 0.85 }}
            />
        </div>
    );
}

export const LevelBlock: FC<LevelBlockProps> = ({ label, value, unit, note, gaugeVal, gaugeMax, isAlert }) => {
    const pct = (gaugeVal / gaugeMax) * 100;
    return (
        <div className={`rounded-lg border px-3 pt-2.5 pb-3 ${isAlert ? "border-destructive/20 bg-destructive/5" : "border-border/50 bg-muted/30"}`}>
            <div className="flex justify-between items-start mb-1">
                <span className="font-mono text-[10px] text-muted-foreground/40 tracking-widest uppercase">{label}</span>
                <span className={`font-mono text-[10px] ${isAlert ? "text-destructive/60" : "text-muted-foreground/30"}`}>{note}</span>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
                <span className={`font-mono text-3xl font-medium leading-none ${isAlert ? "text-destructive" : "text-foreground/90"}`}>{value}</span>
                {unit && <span className="font-mono text-xs text-muted-foreground/50">{unit}</span>}
            </div>
            <Bar pct={pct} isAlert={isAlert} />
        </div>
    );
}
