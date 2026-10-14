"""app/api/monitor_routes.py - R1: start, stop and check the traffic monitor."""

from typing import Optional

from fastapi import APIRouter, HTTPException

from app.capture.sniffer import SnifferError
from app.models.schemas import MonitorStartRequest, MonitorStatus
from app.services.monitor_service import MonitorAlreadyRunning, MonitorNotRunning, monitor_service

router = APIRouter()


@router.post("/start", response_model=MonitorStatus)
def start_monitoring(body: Optional[MonitorStartRequest] = None):
    try:
        return monitor_service.start_monitoring(body.interface if body else None)
    except MonitorAlreadyRunning as e:
        raise HTTPException(status_code=409, detail=str(e))
    except SnifferError as e:  # usually: missing sudo or wrong interface name
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/stop", response_model=MonitorStatus)
def stop_monitoring():
    try:
        return monitor_service.stop_monitoring()
    except MonitorNotRunning as e:
        raise HTTPException(status_code=409, detail=str(e))


@router.get("/status", response_model=MonitorStatus)
def get_status():
    return monitor_service.get_status()
