"""
app/capture/sniffer.py
R1: wraps Scapy's AsyncSniffer, which captures in its own background thread
so the API stays responsive. Needs root (or CAP_NET_RAW) on Linux.
"""

import time
from typing import Callable, Optional

from scapy.sendrecv import AsyncSniffer


class SnifferError(RuntimeError):
    """Raised when capture can't start (bad interface, no permissions...)."""


class PacketSniffer:
    def __init__(self) -> None:
        self._sniffer: Optional[AsyncSniffer] = None

    def start(self, callback: Callable, interface: Optional[str] = None) -> None:
        sniffer = AsyncSniffer(iface=interface, prn=callback, store=False)  # store=False: don't keep packets in RAM
        sniffer.start()

        # The capture thread dies right away on a bad interface or missing permissions,
        # so wait briefly and check it is still alive.
        time.sleep(0.5)
        if not (sniffer.thread.is_alive() and sniffer.running):
            raise SnifferError("Could not start capture. Check the interface name and run with sudo.")
        self._sniffer = sniffer

    def stop(self) -> None:
        if self._sniffer is not None:
            self._sniffer.stop()
            self._sniffer = None

    def is_running(self) -> bool:
        s = self._sniffer
        return bool(s is not None and s.running and s.thread.is_alive())
