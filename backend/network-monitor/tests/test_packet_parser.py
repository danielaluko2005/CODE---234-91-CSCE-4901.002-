from scapy.layers.inet import ICMP, IP, TCP, UDP
from scapy.layers.l2 import ARP, Ether

from app.capture.packet_parser import parse_packet


def test_tcp_packet():
    r = parse_packet(IP(src="10.0.0.1", dst="10.0.0.2") / TCP(sport=40000, dport=443))
    assert r == {"source_ip": "10.0.0.1", "destination_ip": "10.0.0.2",
                 "source_port": 40000, "destination_port": 443, "protocol": "TCP"}


def test_udp_packet():
    r = parse_packet(IP(src="10.0.0.1", dst="8.8.8.8") / UDP(sport=50000, dport=53))
    assert r["protocol"] == "UDP" and r["destination_port"] == 53


def test_icmp_has_no_ports():
    r = parse_packet(IP(src="10.0.0.1", dst="10.0.0.9") / ICMP())
    assert r["protocol"] == "ICMP" and r["source_port"] is None


def test_non_ip_is_skipped():
    assert parse_packet(Ether() / ARP()) is None
