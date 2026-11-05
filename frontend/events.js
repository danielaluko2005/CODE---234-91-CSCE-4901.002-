const USE_BACKEND = false;

// F2: the kinds of device data we record.
// These keys must match the "event_type" values the backend sends.
const EVENT_TYPE_LABELS = {
    traffic: "Network traffic",
    sensor_reading: "Sensor reading",
    status: "Status message",
    command: "Command",
    login: "Login activity"
};

const SEVERITY_LEVELS = ["normal", "unusual", "threat"];
const DIRECTIONS = ["inbound", "outbound", "internal"];

const fallbackNetworkEvents = [
    {
        id: 1,
        deviceName: "Thermostat",
        deviceType: "thermostat",
        sourceIp: "192.168.1.10",
        destinationIp: "192.168.1.1",
        protocol: "TCP",
        port: 443,
        activity: "Status Update",
        severity: "normal",
        timestamp: "2026-10-05T12:42:00"
    },
    {
        id: 2,
        deviceName: "Smart Camera",
        deviceType: "camera",
        sourceIp: "192.168.1.15",
        destinationIp: "192.168.1.1",
        protocol: "UDP",
        port: 53,
        activity: "Network Request",
        severity: "normal",
        timestamp: "2026-10-05T12:41:00"
    },
    {
        id: 3,
        deviceName: "Door Sensor",
        deviceType: "sensor",
        sourceIp: "192.168.1.20",
        destinationIp: "192.168.1.1",
        protocol: "TCP",
        port: 1883,
        activity: "Sensor Message",
        severity: "normal",
        timestamp: "2026-10-05T12:40:00"
    },
    {
        id: 4,
        deviceName: "Smart Plug",
        deviceType: "plug",
        sourceIp: "192.168.1.25",
        destinationIp: "192.168.1.1",
        protocol: "TCP",
        port: 443,
        activity: "Device Update",
        severity: "normal",
        timestamp: "2026-10-05T12:39:00"
    },
    {
        id: 5,
        deviceName: "Smart Camera",
        deviceType: "camera",
        sourceIp: "192.168.1.15",
        destinationIp: "192.168.1.250",
        protocol: "UDP",
        port: 8080,
        activity: "Unusual High-Rate Packet Burst",
        severity: "unusual",
        timestamp: "2026-10-05T12:38:00"
    },
    {
        id: 6,
        deviceName: "Door Sensor",
        deviceType: "sensor",
        sourceIp: "203.0.113.45",
        destinationIp: "192.168.1.20",
        protocol: "TCP",
        port: 22,
        activity: "Suspicious Port Scan Attempt",
        severity: "threat",
        timestamp: "2026-10-05T12:36:00"
    },
    // F2 demo events: one of each kind of device data
    {
        id: 7,
        deviceName: "Thermostat",
        deviceType: "thermostat",
        eventType: "sensor_reading",
        sourceIp: "192.168.1.10",
        destinationIp: "192.168.1.1",
        protocol: "TCP",
        port: 1883,
        activity: "Temperature reading: 72°F",
        severity: "normal",
        timestamp: "2026-10-05T12:43:00"
    },
    {
        id: 8,
        deviceName: "Smart Plug",
        deviceType: "plug",
        eventType: "command",
        sourceIp: "192.168.1.1",
        destinationIp: "192.168.1.25",
        protocol: "TCP",
        port: 1883,
        activity: "Command received: turn off",
        severity: "normal",
        timestamp: "2026-10-05T12:44:00"
    },
    {
        id: 9,
        deviceName: "Door Sensor",
        deviceType: "sensor",
        eventType: "status",
        sourceIp: "192.168.1.20",
        destinationIp: "192.168.1.1",
        protocol: "TCP",
        port: 1883,
        activity: "Status: door locked",
        severity: "normal",
        timestamp: "2026-10-05T12:45:00"
    },
    {
        id: 10,
        deviceName: "Smart Camera",
        deviceType: "camera",
        eventType: "login",
        sourceIp: "198.51.100.23",
        destinationIp: "192.168.1.15",
        protocol: "TCP",
        port: 8080,
        activity: "Failed admin login attempt (3 in 1 minute)",
        severity: "unusual",
        timestamp: "2026-10-05T12:46:00"
    },
    {
        id: 11,
        deviceName: "Smart Camera",
        deviceType: "camera",
        eventType: "traffic",
        sourceIp: "192.168.1.15",
        destinationIp: "203.0.113.9",
        protocol: "TCP",
        port: 443,
        activity: "Video upload to cloud service",
        severity: "normal",
        timestamp: "2026-10-05T12:47:00"
    }
];

let allEvents = [];
let filteredEvents = [];
let selectedEventId = null;

function getDeviceIcon(deviceType) {
    switch (deviceType) {
        case "thermostat":
            return "🌡️";
        case "camera":
            return "📷";
        case "sensor":
            return "🚪";
        case "plug":
            return "🔌";
        default:
            return "📱";
    }
}

function formatFullTimestamp(timestamp) {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
        return String(timestamp || "--");
    }
    return date.toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit"
    });
}

function formatShortTime(timestamp) {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
        return "--";
    }
    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });
}

// Event data comes from the network, so escape it before putting it in innerHTML.
// (textContent and setAttribute are already safe and don't need this.)
function escapeHtml(value) {
    const text = value == null ? "--" : String(value);

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// ICMP and some device messages have no port
function formatPort(port) {
    return port === null || port === undefined || port === "" ? "—" : String(port);
}

function getEventTypeLabel(eventType) {
    return EVENT_TYPE_LABELS[eventType] || EVENT_TYPE_LABELS.traffic;
}

function isPrivateIp(ip) {
    return /^(10\.|127\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(String(ip));
}

// The backend will send "direction". Until it does, work it out from the IPs.
function inferDirection(sourceIp, destinationIp) {
    const sourceIsLocal = isPrivateIp(sourceIp);
    const destinationIsLocal = isPrivateIp(destinationIp);

    if (sourceIsLocal && !destinationIsLocal) {
        return "outbound";
    }
    if (!sourceIsLocal && destinationIsLocal) {
        return "inbound";
    }
    return "internal";
}

function formatDirection(direction) {
    if (direction === "outbound") return "Outbound (leaving home network)";
    if (direction === "inbound") return "Inbound (from outside)";
    return "Internal (inside home network)";
}

function classifySeverity(event) {
    // Only accept known levels: severity is also used in a CSS class name
    const givenSeverity = String(event.severity || "").toLowerCase();
    if (SEVERITY_LEVELS.includes(givenSeverity)) {
        return givenSeverity;
    }
    const text = `${event.activity || ""}`.toLowerCase();
    if (/scan|threat|attack|unauthorized|breach|alert/.test(text)) {
        return "threat";
    }
    if (/unusual|burst|risk|warning|retry/.test(text)) {
        return "unusual";
    }
    return "normal";
}

function getSeverityLabel(severity) {
    if (severity === "threat") return "Threat (Red)";
    if (severity === "unusual") return "At Risk / Unusual (Yellow)";
    return "Normal Log (Green)";
}

// Accepts both our demo format (camelCase) and the backend format (snake_case)
function normalizeEventItem(raw, index) {
    const sourceIp = raw.sourceIp || raw.source_ip || "0.0.0.0";
    const destinationIp = raw.destinationIp || raw.destination_ip || "0.0.0.0";
    const eventType = String(raw.eventType || raw.event_type || "traffic").toLowerCase();
    const givenDirection = String(raw.direction || "").toLowerCase();

    const normalized = {
        id: raw.id ?? index + 1,
        deviceName: raw.deviceName || raw.device_name || raw.device || "Unknown device",
        deviceType: String(raw.deviceType || raw.device_type || "device").toLowerCase(),
        eventType: EVENT_TYPE_LABELS[eventType] ? eventType : "traffic",
        direction: DIRECTIONS.includes(givenDirection)
            ? givenDirection
            : inferDirection(sourceIp, destinationIp),
        sourceIp,
        destinationIp,
        protocol: String(raw.protocol || "TCP").toUpperCase(),
        port: raw.port ?? raw.destination_port ?? null,
        activity: raw.activity || "Network Event",
        timestamp: raw.timestamp || new Date().toISOString()
    };
    normalized.severity = classifySeverity({ ...raw, ...normalized });
    return normalized;
}

function normalizeNetworkEvents(data) {
    const list = Array.isArray(data)
        ? data
        : data && Array.isArray(data.events)
        ? data.events
        : null;

    if (!list) {
        throw new Error("Invalid network event data");
    }

    // Newest first, the same order the backend uses
    return list
        .map((item, idx) => normalizeEventItem(item, idx))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function hideAllEventStates() {
    document.getElementById("eventsLoadingState").classList.add("hidden");
    document.getElementById("eventsErrorState").classList.add("hidden");
    document.getElementById("eventsEmptyState").classList.add("hidden");
}

function setEventsConnectionMode(connected) {
    const badge = document.getElementById("backendConnectionBadge");
    const statusMsg = document.getElementById("eventsStatusMessage");

    if (connected) {
        badge.textContent = "Backend Connected";
        statusMsg.textContent = "Streaming live network event history from backend";
    } else {
        badge.textContent = "Demo Mode";
        statusMsg.textContent = "Using simulated network event history";
    }
}

function renderEventDetails(event) {
    const detailsBody = document.getElementById("eventDetailsBody");
    const badge = document.getElementById("selectedEventBadge");
    const announcer = document.getElementById("srEventAnnouncer");

    if (!event) {
        badge.textContent = "No Event Selected";
        badge.className = "severity-pill severity-normal";
        detailsBody.innerHTML = `
            <p class="details-empty-prompt">
                Select any network event below to view its full packet and endpoint details.
            </p>
        `;
        return;
    }

    badge.textContent = getSeverityLabel(event.severity);
    badge.className = `severity-pill severity-${event.severity}`;

    detailsBody.innerHTML = `
        <div class="detail-box">
            <span>Device</span>
            <strong>${getDeviceIcon(event.deviceType)} ${escapeHtml(event.deviceName)}</strong>
        </div>
        <div class="detail-box">
            <span>Event Type</span>
            <strong>${escapeHtml(getEventTypeLabel(event.eventType))}</strong>
        </div>
        <div class="detail-box">
            <span>Direction</span>
            <strong>${escapeHtml(formatDirection(event.direction))}</strong>
        </div>
        <div class="detail-box">
            <span>Timestamp</span>
            <strong>${escapeHtml(formatFullTimestamp(event.timestamp))}</strong>
        </div>
        <div class="detail-box">
            <span>Source IP</span>
            <strong>${escapeHtml(event.sourceIp)}</strong>
        </div>
        <div class="detail-box">
            <span>Destination IP</span>
            <strong>${escapeHtml(event.destinationIp)}</strong>
        </div>
        <div class="detail-box">
            <span>Port</span>
            <strong>${escapeHtml(formatPort(event.port))}</strong>
        </div>
        <div class="detail-box">
            <span>Protocol</span>
            <strong>${escapeHtml(event.protocol)}</strong>
        </div>
        <div class="detail-box">
            <span>Activity</span>
            <strong>${escapeHtml(event.activity)}</strong>
        </div>
        <div class="detail-box">
            <span>Log Classification</span>
            <strong>${getSeverityLabel(event.severity)}</strong>
        </div>
    `;

    if (announcer) {
        const portText = event.port == null ? "no port" : `port ${event.port}`;
        announcer.textContent =
            `Selected ${getEventTypeLabel(event.eventType).toLowerCase()} for ${event.deviceName}: ` +
            `${event.activity}, ${event.direction}, from ${event.sourceIp} to ${event.destinationIp} ` +
            `on ${portText} via ${event.protocol}.`;
    }
}

function selectEventById(eventId) {
    selectedEventId = eventId;
    const found =
        filteredEvents.find(item => item.id === eventId) ||
        allEvents.find(item => item.id === eventId) ||
        null;

    renderEventDetails(found);

    document.querySelectorAll("[data-event-id]").forEach(el => {
        const isSelected = Number(el.getAttribute("data-event-id")) === Number(eventId);
        el.classList.toggle("selected", isSelected);

        // Tell screen readers which event is the current one
        const control = el.querySelector(".row-select-btn") || el;
        if (isSelected) {
            control.setAttribute("aria-current", "true");
        } else {
            control.removeAttribute("aria-current");
        }
    });
}

function renderEventCardsAndTable(events) {
    const cardList = document.getElementById("fullEventsCardList");
    const tableBody = document.getElementById("eventsTableBody");

    cardList.innerHTML = "";
    tableBody.innerHTML = "";

    if (events.length === 0) {
        document.getElementById("eventsEmptyState").classList.remove("hidden");
        tableBody.innerHTML = `
            <tr>
                <td colspan="8">No matching network events found.</td>
            </tr>
        `;
        renderEventDetails(null);
        return;
    }

    document.getElementById("eventsEmptyState").classList.add("hidden");

    events.forEach(event => {
        const isSelected = Number(event.id) === Number(selectedEventId);
        const eventTypeLabel = getEventTypeLabel(event.eventType);

        const card = document.createElement("article");
        card.className = `activity-card event-selectable-card${isSelected ? " selected" : ""}`;
        card.setAttribute("data-event-id", event.id);
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute(
            "aria-label",
            `Inspect ${event.deviceName}, ${eventTypeLabel}: ${event.activity}, from ${event.sourceIp} to ${event.destinationIp}`
        );

        card.innerHTML = `
            <div class="device-icon">${getDeviceIcon(event.deviceType)}</div>
            <div class="activity-details">
                <div class="activity-title-row">
                    <h3>${escapeHtml(event.deviceName)}</h3>
                    <span class="activity-time">${escapeHtml(formatFullTimestamp(event.timestamp))}</span>
                </div>
                <p class="network-route">
                    ${escapeHtml(event.sourceIp)} → ${escapeHtml(event.destinationIp)}
                    (${escapeHtml(event.direction)})
                </p>
                <p class="network-details">
                    ${escapeHtml(eventTypeLabel)} • ${escapeHtml(event.protocol)} •
                    Port ${escapeHtml(formatPort(event.port))} • ${escapeHtml(event.activity)}
                </p>
            </div>
        `;

        card.addEventListener("click", () => selectEventById(event.id));
        card.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectEventById(event.id);
            }
        });
        cardList.appendChild(card);

        const row = document.createElement("tr");
        row.setAttribute("data-event-id", event.id);
        if (isSelected) {
            row.classList.add("selected");
        }

        // The device name is a real <button>, so keyboard users can Tab to each row
        // and press Enter or Space. The click bubbles up to the row's click handler.
        row.innerHTML = `
            <td>
                <button type="button" class="row-select-btn">
                    ${getDeviceIcon(event.deviceType)} ${escapeHtml(event.deviceName)}
                </button>
            </td>
            <td>${escapeHtml(eventTypeLabel)}</td>
            <td>${escapeHtml(event.sourceIp)}</td>
            <td>${escapeHtml(event.destinationIp)}</td>
            <td>${escapeHtml(formatPort(event.port))}</td>
            <td>${escapeHtml(event.protocol)}</td>
            <td>
                <span class="severity-pill severity-${event.severity}">
                    ${escapeHtml(event.activity)}
                </span>
            </td>
            <td>${escapeHtml(formatFullTimestamp(event.timestamp))}</td>
        `;

        row.querySelector(".row-select-btn").setAttribute(
            "aria-label",
            `Inspect ${event.deviceName}, ${eventTypeLabel}: ${event.activity}`
        );

        row.addEventListener("click", () => selectEventById(event.id));
        tableBody.appendChild(row);
    });

    if (
        selectedEventId === null ||
        !events.some(item => Number(item.id) === Number(selectedEventId))
    ) {
        selectEventById(events[0].id);
    } else {
        selectEventById(selectedEventId);
    }
}

function updateSummaryMetrics() {
    document.getElementById("totalEventsMetric").textContent = allEvents.length;
    document.getElementById("filteredEventsCount").textContent = `${filteredEvents.length} currently shown`;

    const latestEl = document.getElementById("latestEventTime");
    if (allEvents.length === 0) {
        latestEl.textContent = "--";
        return;
    }

    const newest = allEvents.reduce((latest, current) =>
        new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
    );
    latestEl.textContent = formatShortTime(newest.timestamp);
}

function applyEventFilters() {
    const query = document.getElementById("eventSearchInput").value.trim().toLowerCase();
    const protocol = document.getElementById("protocolFilterSelect").value;
    const severity = document.getElementById("severityFilterSelect").value;
    const eventType = document.getElementById("eventTypeFilterSelect").value;

    filteredEvents = allEvents.filter(event => {
        const matchesQuery =
            !query ||
            event.deviceName.toLowerCase().includes(query) ||
            event.sourceIp.toLowerCase().includes(query) ||
            event.destinationIp.toLowerCase().includes(query) ||
            formatPort(event.port).includes(query) ||
            event.protocol.toLowerCase().includes(query) ||
            event.activity.toLowerCase().includes(query) ||
            getEventTypeLabel(event.eventType).toLowerCase().includes(query);

        const matchesProtocol = protocol === "ALL" || event.protocol === protocol;
        const matchesSeverity = severity === "ALL" || event.severity === severity;
        const matchesEventType = eventType === "ALL" || event.eventType === eventType;

        return matchesQuery && matchesProtocol && matchesSeverity && matchesEventType;
    });

    updateSummaryMetrics();
    renderEventCardsAndTable(filteredEvents);
}

async function loadNetworkEventsPage() {
    hideAllEventStates();
    document.getElementById("eventsLoadingState").classList.remove("hidden");

    if (!USE_BACKEND) {
        setEventsConnectionMode(false);
        setTimeout(() => {
            hideAllEventStates();
            allEvents = normalizeNetworkEvents(fallbackNetworkEvents);
            applyEventFilters();
        }, 300);
        return;
    }

    try {
        const { fetchNetworkEvents } = await import("./api.js");
        const response = await fetchNetworkEvents();
        allEvents = normalizeNetworkEvents(response);
        setEventsConnectionMode(true);
        hideAllEventStates();
        applyEventFilters();
    } catch (error) {
        // Shows the real reason (for example a CORS error) in the browser console
        console.warn("Backend unavailable, showing demo events:", error);
        setEventsConnectionMode(false);
        hideAllEventStates();
        allEvents = normalizeNetworkEvents(fallbackNetworkEvents);
        applyEventFilters();
    }
}

document.getElementById("eventSearchInput").addEventListener("input", applyEventFilters);
document.getElementById("protocolFilterSelect").addEventListener("change", applyEventFilters);
document.getElementById("severityFilterSelect").addEventListener("change", applyEventFilters);
document.getElementById("eventTypeFilterSelect").addEventListener("change", applyEventFilters);

document.getElementById("resetFiltersButton").addEventListener("click", () => {
    document.getElementById("eventSearchInput").value = "";
    document.getElementById("protocolFilterSelect").value = "ALL";
    document.getElementById("severityFilterSelect").value = "ALL";
    document.getElementById("eventTypeFilterSelect").value = "ALL";
    applyEventFilters();
});

document.getElementById("refreshEventsButton").addEventListener("click", loadNetworkEventsPage);
document.getElementById("eventsRetryButton").addEventListener("click", loadNetworkEventsPage);

loadNetworkEventsPage();