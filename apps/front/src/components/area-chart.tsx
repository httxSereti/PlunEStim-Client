import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@pes/ui/components/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@pes/ui/components/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@pes/ui/components/select"
import usePluneWebSocket from "@/hooks/usePluneWebSocket"

export const description = "An interactive area chart"

const chartConfig = {
    intensity: {
        label: "Power",
    },
    channelA: {
        label: "Channel A",
        color: "var(--chart-2)",
    },
    channelB: {
        label: "Channel B",
        color: "var(--chart-1)",
    },
}

const initialData = Array.from({ length: 20 }, (_, i) => ({
    time: new Date(Date.now() - (19 - i) * 1000).toISOString(),
    channelA: 0,
    channelB: 0,
    isNew: false,
}));

export function ChartAreaInteractive() {
    const [isRunning, setIsRunning] = React.useState(true);

    const [data, setData] = React.useState(initialData)
    const prevDataRef = React.useRef([...initialData]);

    const [timeRange, setTimeRange] = React.useState("90d")

    const { readyState, events, unitOneIntensity } = usePluneWebSocket();
    console.log(unitOneIntensity)

    // const filteredData = chartData.filter((item) => {
    //     const date = new Date(item.date)
    //     const referenceDate = new Date("2024-06-30")
    //     let daysToSubtract = 90
    //     if (timeRange === "30d") {
    //         daysToSubtract = 30
    //     } else if (timeRange === "7d") {
    //         daysToSubtract = 7
    //     }
    //     const startDate = new Date(referenceDate)
    //     startDate.setDate(startDate.getDate() - daysToSubtract)
    //     return date >= startDate
    // })

    React.useEffect(() => {

        // const interval = setInterval(() => {
        //     if (!isRunning) return;
        //     setData((currentData) => {
        //         prevDataRef.current = [...currentData];
        //         const lastPrice = currentData[currentData.length - 1].channelA;
        //         const newPrice = lastPrice + (Math.random() - 0.5) * 100;
        //         const newDataPoint = {
        //             time: new Date().toISOString(),
        //             channelA: newPrice,
        //             channelB: newPrice,
        //             isNew: true,
        //         };
        //         const updatedData = currentData.map((point) => ({ ...point, isNew: false }));
        //         return [...updatedData, newDataPoint];
        //     });
        // }, 1000);

        // return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Unit 1 - Real Time</CardTitle>
                    <CardDescription>
                        Showing Unit #1
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[100px] w-full"
                >
                    <AreaChart data={unitOneIntensity}>
                        <defs>
                            <linearGradient id="fillChannelB" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-channelB)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-channelB)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillChannelA" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-channelA)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-channelA)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            domain={[0, 100]}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="channelA"
                            type="natural"
                            fill="url(#fillChannelA)"
                            stroke="var(--color-channelA)"
                            stackId="a"
                            isAnimationActive={false}
                        />
                        <Area
                            isAnimationActive={false}
                            dataKey="channelB"
                            type="natural"
                            fill="url(#fillChannelB)"
                            stroke="var(--color-channelB)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
