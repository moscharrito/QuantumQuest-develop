from singhit_app.db import app_db

class BaseRepository():
    def __init__(self) -> None:
        self.db = app_db