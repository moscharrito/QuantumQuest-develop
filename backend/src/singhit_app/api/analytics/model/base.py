from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime, timezone

class IDModel(BaseModel):
    id: int

class DateTimeModel(BaseModel):
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    @field_validator("created_at", "updated_at")
    def default_datetime(cls, value: datetime) -> datetime:
        return value or datetime.now(timezone.utc)