"""app/models/schemas.py - the JSON shapes the API accepts and returns."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field, field_serializer

from app.utils.time_utils import to_iso_z


class MonitorStartRequest(BaseModel):
    interface: Optional[str] = Field(None, description="e.g. eth0. Leave empty for the default.")


class MonitorStatus(BaseModel):
    running: bool
    interface: Optional[str] = None


class EventOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)  # lets us build this straight from a DB row

    id: int
    timestamp: datetime
    source_ip: str
    destination_ip: str
    source_port: Optional[int] = None
    destination_port: Optional[int] = None
    protocol: str
    activity: str

    @field_serializer("timestamp")
    def _timestamp_as_utc(self, v: datetime):
        return to_iso_z(v)  # e.g. 2026-10-13T15:04:05.123Z
