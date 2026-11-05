
export const name = "Total Event Count";

export async function run(app, doc) {
    const events = [];

    for (let i = 1; i <= 6; i++) {
        events.push({
            id: i,
            deviceName: "Sensor " + i,
            deviceType: "sensor",
            sourceIp: "192.168.1." + i,
            destinationIp: "192.168.1.1",
            protocol: "TCP",
            port: 443,
            activity: "Status Update",
            timestamp: "2026-10-26T12:00:00"
        });
    }

    app.updateDashboard(events);

    const count =
        doc.getElementById("eventCount").textContent.trim();

    const cards =
        doc.querySelectorAll(".activity-card");

    return (
        count === "6" &&
        cards.length === 4
    );
}
