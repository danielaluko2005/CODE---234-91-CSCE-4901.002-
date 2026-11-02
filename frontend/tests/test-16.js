
export const name = "Dashboard Recovery After Error";

export async function run(app, doc) {
    app.updateDashboard(null);

    const error =
        doc.getElementById("errorState");

    if (error.classList.contains("hidden")) {
        return false;
    }

    const event = {
        id: 105,
        deviceName: "Recovery Sensor",
        deviceType: "sensor",
        sourceIp: "192.168.1.40",
        destinationIp: "192.168.1.1",
        protocol: "TCP",
        port: 443,
        activity: "Recovered Event",
        timestamp: "2026-10-26T14:45:00"
    };

    app.updateDashboard([event]);

    const eventCount =
        doc.getElementById("eventCount");

    const cards =
        doc.querySelectorAll(".activity-card");

    return (
        error.classList.contains("hidden") &&
        eventCount.textContent.trim() === "1" &&
        cards.length === 1 &&
        cards[0].textContent.includes("Recovery Sensor")
    );
}
