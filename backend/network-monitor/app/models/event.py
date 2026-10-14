"""app/models/event.py - the table that stores network events (R1 fields + R2 timestamp)."""

from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base
from app.utils.time_utils import utc_now


class NetworkEvent(Base):
    __tablename__ = "network_events"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    # R2: indexed so audit queries by date range stay fast
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=utc_now, index=True)
    source_ip: Mapped[str] = mapped_column(String(45))        # 45 chars is enough for IPv6
    destination_ip: Mapped[str] = mapped_column(String(45))
    source_port: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)       # None for ICMP
    destination_port: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    protocol: Mapped[str] = mapped_column(String(20))
    activity: Mapped[str] = mapped_column(String(100))
