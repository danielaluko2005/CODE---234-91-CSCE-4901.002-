const USE_BACKEND = false;

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

function classifySeverity(event) {
    if (event.severity) {
        return event.severity.toLowerCase();
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

function normalizeEventItem(raw, index) {
    const normalized = {
        id: raw.id ?? index + 1,
        deviceName: raw.deviceName || raw.device || "IoT Device",
        deviceType: (raw.deviceType || "device").toLowerCase(),
        sourceIp: raw.sourceIp || raw.source_ip || "0.0.0.0",
        destinationIp: raw.destinationIp || raw.destination_ip || "0.0.0.0",
        protocol: (raw.protocol || "TCP").toUpperCase(),
        port: raw.port ?? 0,
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

    return list.map((item, idx) => normalizeEventItem(item, idx));
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
            <strong>${getDeviceIcon(event.deviceType)} ${event.deviceName}</strong>
        </div>
        <div class="detail-box">
            <span>Timestamp</span>
            <strong>${formatFullTimestamp(event.timestamp)}</strong>
        </div>
        <div class="detail-box">
            <span>Source IP</span>
            <strong>${event.sourceIp}</strong>
        </div>
        <div class="detail-box">
            <span>Destination IP</span>
            <strong>${event.destinationIp}</strong>
        </div>
        <div class="detail-box">
            <span>Port</span>
            <strong>${event.port}</strong>
        </div>
        <div class="detail-box">
            <span>Protocol</span>
            <strong>${event.protocol}</strong>
        </div>
        <div class="detail-box">
            <span>Activity</span>
            <strong>${event.activity}</strong>
        </div>
        <div class="detail-box">
            <span>Log Classification</span>
            <strong>${getSeverityLabel(event.severity)}</strong>
        </div>
    `;

    if (announcer) {
        announcer.textContent = `Selected event for ${event.deviceName}: ${event.activity}, from ${event.sourceIp} to ${event.destinationIp} on port ${event.port} via ${event.protocol}.`;
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
                <td colspan="7">No matching network events found.</td>
            </tr>
        `;
        renderEventDetails(null);
        return;
    }

    document.getElementById("eventsEmptyState").classList.add("hidden");

    events.forEach(event => {
        const isSelected = Number(event.id) === Number(selectedEventId);

        const card = document.createElement("article");
        card.className = `activity-card event-selectable-card${isSelected ? " selected" : ""}`;
        card.setAttribute("data-event-id", event.id);
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute(
            "aria-label",
            `Inspect ${event.deviceName} ${event.activity} from ${event.sourceIp} to ${event.destinationIp}`
        );

        card.innerHTML = `
            <div class="device-icon">${getDeviceIcon(event.deviceType)}</div>
            <div class="activity-details">
                <div class="activity-title-row">
                    <h3>${event.deviceName}</h3>
                    <span class="activity-time">${formatFullTimestamp(event.timestamp)}</span>
                </div>
                <p class="network-route">${event.sourceIp} → ${event.destinationIp}</p>
                <p class="network-details">
                    ${event.protocol} • Port ${event.port} • ${event.activity}
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

        row.innerHTML = `
            <td>${getDeviceIcon(event.deviceType)} ${event.deviceName}</td>
            <td>${event.sourceIp}</td>
            <td>${event.destinationIp}</td>
            <td>${event.port}</td>
            <td>${event.protocol}</td>
            <td>
                <span class="severity-pill severity-${event.severity}">
                    ${event.activity}
                </span>
            </td>
            <td>${formatFullTimestamp(event.timestamp)}</td>
        `;

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

    filteredEvents = allEvents.filter(event => {
        const matchesQuery =
            !query ||
            event.deviceName.toLowerCase().includes(query) ||
            event.sourceIp.toLowerCase().includes(query) ||
            event.destinationIp.toLowerCase().includes(query) ||
            String(event.port).includes(query) ||
            event.protocol.toLowerCase().includes(query) ||
            event.activity.toLowerCase().includes(query);

        const matchesProtocol = protocol === "ALL" || event.protocol === protocol;
        const matchesSeverity = severity === "ALL" || event.severity === severity;

        return matchesQuery && matchesProtocol && matchesSeverity;
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
        setEventsConnectionMode(false);
        hideAllEventStates();
        allEvents = normalizeNetworkEvents(fallbackNetworkEvents);
        applyEventFilters();
    }
}

document.getElementById("eventSearchInput").addEventListener("input", applyEventFilters);
document.getElementById("protocolFilterSelect").addEventListener("change", applyEventFilters);
document.getElementById("severityFilterSelect").addEventListener("change", applyEventFilters);

document.getElementById("resetFiltersButton").addEventListener("click", () => {
    document.getElementById("eventSearchInput").value = "";
    document.getElementById("protocolFilterSelect").value = "ALL";
    document.getElementById("severityFilterSelect").value = "ALL";
    applyEventFilters();
});

document.getElementById("refreshEventsButton").addEventListener("click", loadNetworkEventsPage);
document.getElementById("eventsRetryButton").addEventListener("click", loadNetworkEventsPage);

loadNetworkEventsPage();