
export const name = "Safe Event Text Rendering";

export async function run(app, doc) {
    const event = {
        id: 1,
        deviceName: "<b>Test Camera</b>",
        deviceType: "camera",
        sourceIp: "192.168.1.10",
        destinationIp: "192.168.1.1",
        protocol: "TCP",
        port: 443,
        activity: "Test Event",
        timestamp: "2026-10-26T12:00:00"
    };

    app.updateDashboard([event]);

    const heading =
        doc.querySelector(".activity-card h3");

    if (!heading) {
        return false;
    }

    return (
        heading.textContent.trim() ===
            "<b>Test Camera</b>" &&
        heading.querySelector("b") === null
    );
}
