// Turn event records from the API into the field names used by the Home Dashboard.
// This module does not start the backend or change the existing demo data.

function firstValue(...values) {
    return values.find(value => value !== null && value !== undefined && value !== "");
}

function normalizeEvent(raw, index = 0) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
        throw new TypeError("Each event must be an object");
    }

    return {
        id: firstValue(raw.id, index + 1),
        deviceName: String(firstValue(raw.deviceName, raw.device_name, "Unknown device")),
        deviceType: String(firstValue(raw.deviceType, raw.device_type, "device")),
        sourceIp: String(firstValue(raw.sourceIp, raw.source_ip, "--")),
        destinationIp: String(firstValue(raw.destinationIp, raw.destination_ip, "--")),
        protocol: String(firstValue(raw.protocol, "--")),
        port: firstValue(raw.port, raw.destination_port, null),
        activity: String(firstValue(raw.activity, "Network event")),
        timestamp: firstValue(raw.timestamp, null)
    };
}

function normalizeEvents(payload) {
    const records = Array.isArray(payload) ? payload : payload?.events;
    if (!Array.isArray(records)) {
        throw new TypeError("Expected an event array or { events: [...] }");
    }
    return records.map((event, index) => normalizeEvent(event, index));
}

export { normalizeEvent, normalizeEvents };
