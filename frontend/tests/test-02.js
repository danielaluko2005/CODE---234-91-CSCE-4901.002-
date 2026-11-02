
export const name = "Network Event Count";

export async function run(app, doc) {
    const events = [
        {
            id: 1,
            deviceName: "Camera",
            timestamp: "2026-10-26T10:00:00"
        },
        {
            id: 2,
            deviceName: "Sensor",
            timestamp: "2026-10-26T10:01:00"
        },
        {
            id: 3,
            deviceName: "Router",
            timestamp: "2026-10-26T10:02:00"
        }
    ];

    app.updateDashboard(events);

    const count =
        doc.getElementById("eventCount");

    return count.textContent.trim() === "3";
}
