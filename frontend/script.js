
const USE_BACKEND = false;

// Simulated events used until backend integration is available.
const networkEvents = [
    {
        id: 1,
        deviceName: "Thermostat",
        deviceType: "thermostat",
        sourceIp: "192.168.1.10",
        destinationIp: "192.168.1.1",
        protocol: "TCP",
        port: 443,
        activity: "Status Update",
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
        timestamp: "2026-10-05T12:41:00"
    },
    {
        id: 3,
        deviceName: "Door Sensor",
        deviceType: "sensor",
        sourceIp: "192.168.1.20",
        destinationIp: "192.168.1.1",
        protocol: "TCP",
        port: 443,
        activity: "Device Update",
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
        timestamp: "2026-10-05T12:39:00"
    }
];

function getDeviceIcon(deviceType) {
    switch (deviceType) {
        case "thermostat": return "🌡️";
        case "camera": return "📷";
        case "sensor": return "🚪";
        case "plug": return "🔌";
        default: return "📱";
    }
}

function formatTime(timestamp) {
    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
        return "--";
    }

    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });
}

// Sprint 2: Show both date and time for the latest event.
function formatDateTime(timestamp) {
    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
        return "--";
    }

    return date.toLocaleString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}

function createActivityCard(event) {
    return `
        <article class="activity-card">
            <div class="device-icon">
                ${getDeviceIcon(event.deviceType)}
            </div>

            <div class="activity-details">
                <div class="activity-title-row">
                    <h3>${event.deviceName}</h3>

                    <span class="activity-time">
                        ${formatTime(event.timestamp)}
                    </span>
                </div>

                <p class="network-route">
                    ${event.sourceIp} → ${event.destinationIp}
                </p>

                <p class="network-details">
                    ${event.protocol}
                    • Port ${event.port}
                    • ${event.activity}
                </p>
            </div>
        </article>
    `;
}

function renderRecentActivity(events) {
    const list = document.getElementById("activityList");
    list.innerHTML = "";

    const recentEvents = [...events]
        .sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
        )
        .slice(0, 4);

    recentEvents.forEach(event => {
        list.insertAdjacentHTML(
            "beforeend",
            createActivityCard(event)
        );
    });
}

function updateEventCount(events) {
    document.getElementById("eventCount").textContent =
        events.length;
}

function updateDeviceCount(events) {
    const devices = new Set(
        events.map(event => event.deviceName)
    );

    document.getElementById("deviceCount").textContent =
        devices.size;
}

function updateLastUpdate(events) {
    const element = document.getElementById("lastUpdate");

    if (events.length === 0) {
        element.textContent = "--";
        return;
    }

    const newest = events.reduce((latest, current) =>
        new Date(current.timestamp) > new Date(latest.timestamp)
            ? current
            : latest
    );

    element.textContent = formatDateTime(newest.timestamp);
}

function hideAllStates() {
    document.getElementById("loadingState")
        .classList.add("hidden");

    document.getElementById("errorState")
        .classList.add("hidden");

    document.getElementById("emptyState")
        .classList.add("hidden");
}

function clearActivity() {
    document.getElementById("activityList").innerHTML = "";
}

function showLoading() {
    hideAllStates();
    clearActivity();

    document.getElementById("loadingState")
        .classList.remove("hidden");
}

function showEmpty() {
    hideAllStates();
    clearActivity();

    document.getElementById("emptyState")
        .classList.remove("hidden");
}

function showError() {
    hideAllStates();
    clearActivity();

    document.getElementById("errorState")
        .classList.remove("hidden");
}

function showActivity() {
    hideAllStates();
}

function setDashboardMode(backendConnected) {
    const monitoringStatus =
        document.getElementById("monitoringStatus");

    const monitoringIndicator =
        document.getElementById("monitoringIndicator");

    const monitoringMessage =
        document.getElementById("monitoringMessage");

    const backendStatus =
        document.getElementById("backendStatus");

    const scanStatus =
        document.getElementById("scanStatus");

    if (backendConnected) {
        monitoringStatus.textContent = "Live Monitoring";
        monitoringMessage.textContent =
            "Displaying events received from the backend";
        backendStatus.textContent = "Connected";
        scanStatus.textContent = "Running";

        monitoringIndicator.setAttribute(
            "aria-label",
            "Backend monitoring connected"
        );
    } else {
        monitoringStatus.textContent = "Demo Mode";
        monitoringMessage.textContent =
            "Displaying simulated network activity";
        backendStatus.textContent = "Demo Mode";
        scanStatus.textContent = "Simulated";

        monitoringIndicator.setAttribute(
            "aria-label",
            "Demo monitoring status"
        );
    }
}

function normalizeNetworkEvents(data) {
    if (Array.isArray(data)) {
        return data;
    }

    if (data && Array.isArray(data.events)) {
        return data.events;
    }

    throw new Error("Invalid network event data");
}

function updateDashboard(events) {
    if (!Array.isArray(events)) {
        updateEventCount([]);
        updateDeviceCount([]);
        updateLastUpdate([]);
        showError();
        return;
    }

    if (events.length === 0) {
        updateEventCount([]);
        updateDeviceCount([]);
        updateLastUpdate([]);
        showEmpty();
        return;
    }

    showActivity();
    renderRecentActivity(events);
    updateEventCount(events);
    updateDeviceCount(events);
    updateLastUpdate(events);
}

async function loadDashboard() {
    showLoading();

    if (!USE_BACKEND) {
        setDashboardMode(false);

        setTimeout(() => {
            updateDashboard(networkEvents);
        }, 500);

        return;
    }

    try {
        const { fetchNetworkEvents } =
            await import("./api.js");

        const response = await fetchNetworkEvents();
        const events = normalizeNetworkEvents(response);

        setDashboardMode(true);
        updateDashboard(events);
    } catch (error) {
        console.warn("Backend unavailable:", error);
        setDashboardMode(false);
        updateDashboard(networkEvents);
    }
}

document.getElementById("retryButton")
    .addEventListener("click", loadDashboard);

loadDashboard();
