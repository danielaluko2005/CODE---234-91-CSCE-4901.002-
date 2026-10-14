from app.utils.activity_classifier import classify_activity


def test_known_ports():
    assert classify_activity("TCP", 50000, 22) == "SSH traffic"
    assert classify_activity("UDP", 50000, 53) == "DNS traffic"


def test_unknown_port_uses_protocol():
    assert classify_activity("TCP", 50000, 50001) == "TCP traffic"


def test_icmp():
    assert classify_activity("ICMP") == "ICMP message"
