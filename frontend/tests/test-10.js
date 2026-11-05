
export const name = "Recent Activity Display Limit";

export async function run(app, doc) {
    const events = [];

    for (let i = 1; i <= 6; i++) {
        events.push({
            id: i,
            deviceName: "Device " + i,
            deviceType: "sensor",
            sourceIp: "192.168.1." + i,
            destinationIp: "192.168.1.1",
            protocol: "TCP",
            port: 443,
            activity: "Test Event",
            timestamp:
                `2026-10-26T10:${String(i).padStart(2, "0")}:00`
        });
    }

    app.updateDashboard(events);

    const cards =
        doc.querySelectorAll(".activity-card");

    return (
        cards.length === 4 &&
        cards[0].textContent.includes("Device 6") &&
        cards[3].textContent.includes("Device 3")
    );
}
