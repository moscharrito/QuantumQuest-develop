from singhit_app.db.config import AppDatabaseConfig
from typing import Callable

class AppEvents(AppDatabaseConfig):
    def __init__(self) -> None:
        super().__init__()

    async def startup_event(self) -> Callable:
        await self.connect_to_db()

    async def shutdown_event(self) -> Callable:
        await self.disconnect_from_db()