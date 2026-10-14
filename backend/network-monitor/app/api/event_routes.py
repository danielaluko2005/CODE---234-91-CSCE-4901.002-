"""
app/api/event_routes.py - R2: view recorded events.
Read-only on purpose: audit records should never be edited or deleted.
"""

from datetime import datetime
from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from app.models.schemas import EventOut
from app.services.event_service import event_service
from app.utils.time_utils import to_naive_utc

router = APIRouter()


@router.get("", response_model=list[EventOut])
def list_events(
    start: Optional[datetime] = Query(None, description="From this date/time (ISO-8601, UTC)"),
    end: Optional[datetime] = Query(None, description="Up to this date/time (ISO-8601, UTC)"),
    protocol: Optional[str] = Query(None, description="e.g. TCP, UDP, ICMP"),
    limit: int = Query(50, ge=1, le=500),
    offset: int = Query(0, ge=0),
):
    start = to_naive_utc(start) if start else None
    end = to_naive_utc(end) if end else None
    if start and end and start > end:
        raise HTTPException(status_code=422, detail="'start' must be before 'end'")
    return event_service.get_events(start, end, protocol, limit, offset)
