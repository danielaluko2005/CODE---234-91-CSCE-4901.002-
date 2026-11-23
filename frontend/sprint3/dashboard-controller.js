import { loadSource } from "./source-service.js";

// Sprint 2 keeps its original dashboard functions.
// Sprint 3 manages the additional data-source controls.

const sourceSelect = document.getElementById("sprint3Source");
const refreshButton = document.getElementById("sprint3Refresh");
const message = document.getElementById("sprint3Message");

let requestNumber = 0;

function updateMessage(text, level = "info") {
    message.textContent = text;
    message.dataset.level = level;
}

function showMockMode() {
    setDashboardMode(false);

    document.getElementById("monitoringStatus").textContent = "Mock API Data";
    document.getElementById("monitoringMessage").textContent =
        "Displaying simulated API response events";
    document.getElementById("backendStatus").textContent = "Not connected (mock)";
    document.getElementById("scanStatus").textContent = "Simulated";
    document.getElementById("monitoringIndicator").setAttribute(
        "aria-label", "Simulated API data"
    );
}

async function refreshSource() {
    const source = sourceSelect.value;
    const number = ++requestNumber;

    if (source === "demo") {
        refreshButton.disabled = false;
        setDashboardMode(false);
        updateMessage("Currently showing Sprint 2 demo data.");
        loadDashboard();
        return;
    }

    refreshButton.disabled = true;
    showLoading();

    updateMessage(
        source === "mock"
            ? "Loading mock events…"
            : "Contacting backend API…"
    );

    try {
        const events = await loadSource(source);

        if (number !== requestNumber) return;

        updateDashboard(events);

        if (source === "mock") {
            showMockMode();
            updateMessage(`Showing ${events.length} simulated API events.`);
        } else {
            setDashboardMode(true);

            document.getElementById("scanStatus").textContent = "Not verified";
            document.getElementById("monitoringMessage").textContent =
                "Displaying API events; device scan not verified";

            updateMessage(`Received ${events.length} events from the backend API.`);
        }
    } catch (error) {
        if (number !== requestNumber) return;

        updateDashboard(null);
        setDashboardMode(false);

        document.getElementById("monitoringStatus").textContent =
            "Backend Unavailable";
        document.getElementById("monitoringMessage").textContent =
            "Could not retrieve network events";
        document.getElementById("backendStatus").textContent = "Unavailable";
        document.getElementById("scanStatus").textContent = "Not verified";

        updateMessage(
            "Connection failed. Check that the backend is running and the API URL is correct.",
            "error"
        );

        console.warn("Sprint 3 event request failed:", error);
    } finally {
        if (number === requestNumber) {
            refreshButton.disabled = false;
        }
    }
}

sourceSelect.addEventListener("change", refreshSource);
refreshButton.addEventListener("click", refreshSource);

document.getElementById("retryButton").addEventListener(
    "click",
    event => {
        if (sourceSelect.value !== "demo") {
            event.stopImmediatePropagation();
            refreshSource();
        }
    },
    true
);

sourceSelect.disabled = true;
refreshButton.disabled = true;

setTimeout(() => {
    sourceSelect.disabled = false;
    refreshButton.disabled = false;
}, 600);
