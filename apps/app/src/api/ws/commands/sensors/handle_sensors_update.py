from store import Store
from utils import Logger
from api.ws.websocket_notifier import WebSocketNotifier

store = Store()


async def handle_sensors_update(payload: dict, ws_notifier: WebSocketNotifier) -> dict:
    """
    Handle sensor update
    """
    try:
        for sensorName, value in payload.items():
            store.update_sensor_fields(sensorName, value)
    except KeyError:
        return {"status": "error", "message": "Can't update Sensor! (KeyError)"}

    Logger.info(f"[WS|sensors:update] Updated Sensors '{','.join(payload.keys())}'")

    return {"status": "ok"}
