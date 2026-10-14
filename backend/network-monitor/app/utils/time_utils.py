"""
app/utils/time_utils.py
R2: every timestamp is stored as UTC so audit records are unambiguous.
"""

from datetime import datetime, timezone


def utc_now() -> datetime:
    return datetime.now(timezone.utc).replace(tzinfo=None)


def from_epoch(seconds) -> datetime:
    """Packet capture time (epoch seconds) -> UTC datetime."""
    return datetime.fromtimestamp(float(seconds), tz=timezone.utc).replace(tzinfo=None)


def to_naive_utc(dt: datetime) -> datetime:
    """Normalise a datetime sent by a client (may include a timezone) to UTC."""
    if dt.tzinfo is not None:
        dt = dt.astimezone(timezone.utc).replace(tzinfo=None)
    return dt


def to_iso_z(dt: datetime) -> str:
    return dt.isoformat(timespec="milliseconds") + "Z"
