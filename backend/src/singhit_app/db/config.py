from databases import Database
from singhit_app.core.config import settings
from singhit_app.core.logger import logger
from typing import List, Dict, Any

class AppDatabaseConfig:
    db_connection = None

    def __init__(self):
        if not AppDatabaseConfig.db_connection:
            AppDatabaseConfig.db_connection = Database(settings.database_url)
        self.db = AppDatabaseConfig.db_connection

    async def connect_to_db(self):
        try:
            logger.info('Connecting to the App Database')
            if not self.db.is_connected:
                await self.db.connect()
            logger.info('Successfully connected to the App Database')
        except Exception as e:
            logger.error('<--- Error Connecting to the App Database --->')
            logger.error(e)
            logger.error('<--- Error Connecting to the App Database --->')

    async def disconnect_from_db(self):
        try:
            logger.info('Closing the App Database connection')
            if self.db.is_connected:
                await self.db.disconnect()
            logger.info('Successfully closed the App Database connection')
        except Exception as e:
            logger.error('<--- Error closing the App Database connection --->')
            logger.error(e)
            logger.error('<--- Error closing the App Database connection --->')

    async def get_db(self):
        if not self.db.is_connected:
            raise RuntimeError("App Database is not connected.")
        
        return self.db
    
    async def fetch_one(self, query: str, values: Dict[str, Any] = None) -> Dict[str, Any]:
        try:
            result = await self.db.fetch_one(query=query, values=values)
            return result
        except Exception as e:
            logger.error('<--- Error fetching record from the App Database --->')
            logger.error(e)
            logger.error('<--- Error fetching record from the App Database --->')
            raise

    async def fetch_all(self, query: str, values: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        try:
            results = await self.db.fetch_all(query=query, values=values)
            return results
        except Exception as e:
            logger.error('<--- Error fetching records from the App Database --->')
            logger.error(e)
            logger.error('<--- Error fetching records from the App Database --->')
            raise