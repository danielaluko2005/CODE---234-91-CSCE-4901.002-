
export const name = "Network Event Details";

export async function run(app, doc) {
    const event = {
        id: 101,
        deviceName: "Test Camera",
        deviceType: "camera",
        sourceIp: "192.168.1.20",
        destinationIp: "192.168.1.1",
        protocol: "TCP",
        port: 8080,
        activity: "Connection Test",
        timestamp: "2026-10-26T14:30:00"
    };

    app.updateDashboard([event]);

    const card =
        doc.querySelector(".activity-card");

    if (!card) {
        return false;
    }

    const content = card.textContent;

    return (
        content.includes("Test Camera") &&
        content.includes("192.168.1.20") &&
        content.includes("192.168.1.1") &&
        content.includes("TCP") &&
        content.includes("8080") &&
        content.includes("Connection Test")
    );
}
