"""
app/services/monitor_service.py
R1: starts/stops traffic capture. Each captured packet is parsed, labelled
and saved as an event (R2) straight away.
"""

from typing import Optional

from app.capture.packet_parser import parse_packet
from app.capture.sniffer import PacketSniffer
from app.config import DEFAULT_INTERFACE
from app.services.event_service import event_service
from app.utils.activity_classifier import classify_activity
from app.utils.time_utils import from_epoch, utc_now


class MonitorAlreadyRunning(Exception):
    pass


class MonitorNotRunning(Exception):
    pass


class MonitorService:
    def __init__(self) -> None:
        self._sniffer = PacketSniffer()
        self._interface: Optional[str] = None

    def start_monitoring(self, interface: Optional[str] = None) -> dict:
        if self._sniffer.is_running():
            raise MonitorAlreadyRunning("Monitoring is already running")
        self._interface = interface or DEFAULT_INTERFACE
        self._sniffer.start(callback=self.handle_packet, interface=self._interface)
        return self.get_status()

    def stop_monitoring(self) -> dict:
        if not self._sniffer.is_running():
            raise MonitorNotRunning("Monitoring is not running")
        self._sniffer.stop()
        return self.get_status()

    def get_status(self) -> dict:
        return {"running": self._sniffer.is_running(), "interface": self._interface}

    def handle_packet(self, packet) -> None:
        """Called by the sniffer for every packet: parse -> label -> save."""
        data = parse_packet(packet)
        if data is None:  # not an IP packet, ignore
            return
        data["activity"] = classify_activity(data["protocol"], data["source_port"], data["destination_port"])
        try:
            data["timestamp"] = from_epoch(packet.time)  # when the packet was actually captured
        except Exception:
            data["timestamp"] = utc_now()
        # Sprint 1: one DB write per packet. If traffic gets heavy, batch these in a later sprint.
        event_service.record_event(data)


monitor_service = MonitorService()  # one shared instance for the whole app
