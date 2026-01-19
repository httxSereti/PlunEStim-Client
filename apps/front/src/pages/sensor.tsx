import { useWebSocket } from "@/hooks/useWebSocket";
import type { Route } from "../pages/+types/home";


// eslint-disable-next-line no-empty-pattern
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "PES • Sensors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Sensor() {

    const { status, isConnected, sendCommand } = useWebSocket();

    const updateSensor = async () => {

        try {
            const data = await sendCommand('sensors:update', {
                motion1: {
                    alarm_enable: true,
                    position_alarm_number_action: 5
                },
                motion2: {
                    alarm_enable: true,
                    position_alarm_number_action: 5,
                    move_delay_off: 42
                },
            });
            console.log(data)
            // setNotifications(data as unknown[]);
        } catch (error) {
            console.error('Failed to load notifications:', error);
        }

        // send<ChatMessage['payload']>('chat:message', {
        //     text: "dddd",
        //     userId: '123',
        //     username: 'Me',
        // });

    }
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            WebSocket: {status} {isConnected ? '🟢' : '🔴'}
            <button onClick={updateSensor}>click</button>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
    );
}