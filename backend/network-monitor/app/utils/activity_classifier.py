"""
app/utils/activity_classifier.py
R1: gives each packet a readable "activity" label based on its port.
"""

from typing import Optional

# Sprint 1: a simple lookup. Add more ports (or smarter logic) in a later sprint.
PORT_SERVICES = {
    21: "FTP", 22: "SSH", 23: "Telnet", 25: "SMTP", 53: "DNS",
    67: "DHCP", 68: "DHCP", 80: "HTTP", 123: "NTP", 443: "HTTPS",
    445: "SMB", 3306: "MySQL", 3389: "RDP", 5432: "PostgreSQL",
}


def classify_activity(
    protocol: str,
    source_port: Optional[int] = None,
    destination_port: Optional[int] = None,
) -> str:
    if protocol.upper().startswith("ICMP"):
        return "ICMP message"

    # Prefer the destination port (the service being contacted), then the source port
    service = PORT_SERVICES.get(destination_port) or PORT_SERVICES.get(source_port)
    return f"{service} traffic" if service else f"{protocol} traffic"
