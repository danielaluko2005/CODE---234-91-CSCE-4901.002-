
export const name = "Unknown Device Icon Fallback";

export async function run(app, doc) {
    const event = {
        id: 102,
        deviceName: "Unknown Device",
        deviceType: "unknown",
        sourceIp: "192.168.1.50",
        destinationIp: "192.168.1.1",
        protocol: "UDP",
        port: 53,
        activity: "Unknown Activity",
        timestamp: "2026-10-26T14:35:00"
    };

    app.updateDashboard([event]);

    const icon =
        doc.querySelector(".activity-card .device-icon");

    const heading =
        doc.querySelector(".activity-card h3");

    return (
        icon !== null &&
        icon.textContent.includes("📱") &&
        heading !== null &&
        heading.textContent.trim() === "Unknown Device"
    );
}
