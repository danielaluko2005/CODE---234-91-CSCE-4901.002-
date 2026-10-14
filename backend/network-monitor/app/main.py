"""
app/main.py - entry point. Creates the app, sets up the database, mounts the routes.

R1 (monitor traffic) -> /api/monitor/*
R2 (record events)   -> /api/events
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api import event_routes, monitor_routes
from app.db.database import init_db
from app.services.monitor_service import monitor_service


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()  # on startup: create the database/tables if they don't exist
    yield
    if monitor_service.get_status()["running"]:  # on shutdown: stop capturing cleanly
        monitor_service.stop_monitoring()


app = FastAPI(title="Network Monitor API", version="0.1.0", lifespan=lifespan)

app.include_router(monitor_routes.router, prefix="/api/monitor", tags=["Monitor (R1)"])
app.include_router(event_routes.router, prefix="/api/events", tags=["Events (R2)"])


@app.get("/health", tags=["Health"])
def health():
    return {"status": "ok"}
