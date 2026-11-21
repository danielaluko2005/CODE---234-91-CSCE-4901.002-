// Turn event records from the API into the field names used by the Home Dashboard.
// This module does not start the backend or change the existing demo data.

function firstValue(...values) {
    return values.find(value => value !== null && value !== undefined && value !== "");
}

const VALID_SEVERITIES = new Set(["normal", "unusual", "threat"]);
const VALID_TYPES = new Set(["traffic", "sensor_reading", "status", "command", "login"]);

function knownValue(value, known, fallback) {
    const candidate = String(value || "").toLowerCase();
    return known.has(candidate) ? candidate : fallback;
}

function normalizeEvent(raw, index = 0) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
        throw new TypeError("Each event must be an object");
    }

    return {
        id: firstValue(raw.id, index + 1),
        deviceName: String(firstValue(raw.deviceName, raw.device_name, raw.device, raw.name, "Unknown device")),
        deviceType: String(firstValue(raw.deviceType, raw.device_type, "device")),
        sourceIp: String(firstValue(raw.sourceIp, raw.source_ip, raw.src_ip, "--")),
        destinationIp: String(firstValue(raw.destinationIp, raw.destination_ip, raw.dst_ip, "--")),
        protocol: String(firstValue(raw.protocol, "--")),
        port: firstValue(raw.port, raw.destination_port, raw.dst_port, null),
        activity: String(firstValue(raw.activity, raw.description, raw.message, "Network event")),
        timestamp: firstValue(raw.timestamp, null),
        eventType: knownValue(firstValue(raw.eventType, raw.event_type), VALID_TYPES, "traffic"),
        severity: knownValue(raw.severity, VALID_SEVERITIES, "normal")
    };
}

function normalizeEvents(payload) {
    const records = Array.isArray(payload) ? payload : payload?.events;
    if (!Array.isArray(records)) {
        throw new TypeError("Expected an event array or { events: [...] }");
    }
    return records.map((event, index) => normalizeEvent(event, index));
}

export { normalizeEvent, normalizeEvents, VALID_SEVERITIES, VALID_TYPES };
