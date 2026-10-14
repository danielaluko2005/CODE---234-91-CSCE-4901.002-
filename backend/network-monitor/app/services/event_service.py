"""
app/services/event_service.py
R2: saves network events (always with a timestamp) and looks them up.
"""

from datetime import datetime
from typing import Callable, Optional

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.event import NetworkEvent
from app.utils.time_utils import utc_now


class EventService:
    def __init__(self, session_factory: Callable[[], Session] = SessionLocal) -> None:
        self._session_factory = session_factory  # injectable so tests can use a temp DB

    def record_event(self, data: dict) -> NetworkEvent:
        event = NetworkEvent(
            timestamp=data.get("timestamp") or utc_now(),  # R2: never saved without a date/time
            source_ip=data["source_ip"],
            destination_ip=data["destination_ip"],
            source_port=data.get("source_port"),
            destination_port=data.get("destination_port"),
            protocol=data["protocol"].upper(),
            activity=data["activity"],
        )
        with self._session_factory() as session:
            session.add(event)
            session.commit()
            return event

    def get_events(
        self,
        start: Optional[datetime] = None,
        end: Optional[datetime] = None,
        protocol: Optional[str] = None,
        limit: int = 50,
        offset: int = 0,
    ) -> list[NetworkEvent]:
        stmt = select(NetworkEvent)
        if start:
            stmt = stmt.where(NetworkEvent.timestamp >= start)
        if end:
            stmt = stmt.where(NetworkEvent.timestamp <= end)
        if protocol:
            stmt = stmt.where(NetworkEvent.protocol == protocol.upper())
        stmt = stmt.order_by(NetworkEvent.timestamp.desc(), NetworkEvent.id.desc())  # newest first

        with self._session_factory() as session:
            return list(session.scalars(stmt.limit(limit).offset(offset)))


event_service = EventService()  # one shared instance for the whole app
