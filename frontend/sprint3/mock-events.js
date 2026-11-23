// Repeatable sample API data for demos and tests while the backend is unfinished.
// Not collected from real devices.
const mockApiPayload = {
    events: [
        { id: "evt-101", device_name: "Smart Camera", device_type: "camera",
          source_ip: "192.168.1.15", destination_ip: "192.168.1.1", destination_port: 443,
          protocol: "TCP", activity: "Video status update", severity: "normal",
          event_type: "status", timestamp: "2026-11-02T15:10:00Z" },
        { id: "evt-102", device_name: "Door Sensor", device_type: "sensor",
          source_ip: "192.168.1.20", destination_ip: "192.168.1.1", destination_port: 1883,
          protocol: "TCP", activity: "Door event received", severity: "normal",
          event_type: "sensor_reading", timestamp: "2026-11-02T15:12:00Z" },
        { id: "evt-103", device_name: "Smart Camera", device_type: "camera",
          source_ip: "192.168.1.15", destination_ip: "203.0.113.9", destination_port: 443,
          protocol: "TCP", activity: "Unusual upload volume (simulated)", severity: "unusual",
          event_type: "traffic", timestamp: "2026-11-02T15:15:00Z" },
        { id: "evt-104", device_name: "Thermostat", device_type: "thermostat",
          source_ip: "192.168.1.10", destination_ip: "192.168.1.1", destination_port: 1883,
          protocol: "TCP", activity: "Temperature reading received", severity: "normal",
          event_type: "sensor_reading", timestamp: "2026-11-02T15:18:00Z" }
    ]
};

function getMockPayload() {
    // Copy so tests and UI code cannot overwrite the fixture.
    return JSON.parse(JSON.stringify(mockApiPayload));
}

export { getMockPayload };
