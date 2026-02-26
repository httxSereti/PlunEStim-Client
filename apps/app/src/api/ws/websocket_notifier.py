import asyncio
from typing import Optional
from utils.logger import Logger
from .websocket_manager import WebSocketManager


class WebSocketNotifier:
    def __init__(self):
        self._queue: Optional[asyncio.Queue] = None
        self._loop: Optional[asyncio.AbstractEventLoop] = None

    def setup(self, loop: asyncio.AbstractEventLoop):
        self._loop = loop
        self._queue = asyncio.Queue()

    def notify(self, payload_type: str, payload: dict):
        if self._loop is None or self._queue is None:
            Logger.warning("WSNotifier not ready, dropping event")
            return

        message = {"type": payload_type, "payload": payload}
        self._loop.call_soon_threadsafe(self._queue.put_nowait, message)

    async def consume(self, ws_manager: WebSocketManager):
        while True:
            try:
                message = await self._queue.get()
                await ws_manager.broadcast(message)
            except Exception as e:
                Logger.error(f"WSNotifier consume error: {e}")


ws_notifier = WebSocketNotifier()
