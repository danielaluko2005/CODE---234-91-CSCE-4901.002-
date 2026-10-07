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
        port: 1883,
        activity: "Sensor Message",
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


function createActivityCard(event) {
    return `
        <article class="activity-card">

            <div class="device-icon">
                ${getDeviceIcon(event.deviceType)}
            </div>

            <div class="activity-details">

                <div class="activity-title-row">

                    <h3>
                        ${event.deviceName}
                    </h3>

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
    const activityList =
        document.getElementById("activityList");

    activityList.innerHTML = "";

    const recentEvents =
        events.slice(0, 4);

    recentEvents.forEach(event => {
        activityList.insertAdjacentHTML(
            "beforeend",
            createActivityCard(event)
        );
    });
}


function updateEventCount(events) {
    document.getElementById(
        "eventCount"
    ).textContent = events.length;
}


function updateDeviceCount(events) {
    const devices =
        new Set(
            events.map(
                event => event.deviceName
            )
        );

    document.getElementById(
        "deviceCount"
    ).textContent = devices.size;
}


function updateLastUpdate(events) {
    const lastUpdate =
        document.getElementById(
            "lastUpdate"
        );

    if (events.length === 0) {
        lastUpdate.textContent = "--";
        return;
    }

    const newestEvent =
        events.reduce(
            (latest, current) => {
                return new Date(current.timestamp) >
                    new Date(latest.timestamp)
                    ? current
                    : latest;
            }
        );

    lastUpdate.textContent =
        formatTime(
            newestEvent.timestamp
        );
}


function hideAllStates() {
    document.getElementById(
        "loadingState"
    ).classList.add("hidden");

    document.getElementById(
        "errorState"
    ).classList.add("hidden");

    document.getElementById(
        "emptyState"
    ).classList.add("hidden");
}


function showLoading() {
    hideAllStates();

    document.getElementById(
        "loadingState"
    ).classList.remove("hidden");
}


function showEmpty() {
    hideAllStates();

    document.getElementById(
        "emptyState"
    ).classList.remove("hidden");
}


function showError() {
    hideAllStates();

    document.getElementById(
        "errorState"
    ).classList.remove("hidden");
}


function showActivity() {
    hideAllStates();
}


function updateDashboard(events) {
    if (!Array.isArray(events)) {
        showError();
        return;
    }

    if (events.length === 0) {
        document.getElementById(
            "activityList"
        ).innerHTML = "";

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


function loadDashboard() {
    showLoading();

    setTimeout(() => {
        updateDashboard(networkEvents);
    }, 500);
}


document.getElementById(
    "retryButton"
).addEventListener(
    "click",
    loadDashboard
);


loadDashboard();
