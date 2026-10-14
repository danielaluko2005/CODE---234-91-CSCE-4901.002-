"""
app/capture/packet_parser.py
R1: turns a raw Scapy packet into the fields we care about.
"""

from typing import Optional

from scapy.layers.inet import ICMP, IP, TCP, UDP
from scapy.layers.inet6 import IPv6


def parse_packet(packet) -> Optional[dict]:
    # Only IP traffic is recorded; other frames (e.g. ARP) are skipped
    if packet.haslayer(IP):
        src, dst, proto_num = packet[IP].src, packet[IP].dst, int(packet[IP].proto)
    elif packet.haslayer(IPv6):
        src, dst, proto_num = packet[IPv6].src, packet[IPv6].dst, int(packet[IPv6].nh)
    else:
        return None

    source_port = destination_port = None

    if packet.haslayer(TCP):
        protocol = "TCP"
        source_port, destination_port = int(packet[TCP].sport), int(packet[TCP].dport)
    elif packet.haslayer(UDP):
        protocol = "UDP"
        source_port, destination_port = int(packet[UDP].sport), int(packet[UDP].dport)
    elif packet.haslayer(ICMP):
        protocol = "ICMP"
    else:
        protocol = f"IP-{proto_num}"  # any other IP protocol, labelled by number

    return {
        "source_ip": src,
        "destination_ip": dst,
        "source_port": source_port,
        "destination_port": destination_port,
        "protocol": protocol,
    }
