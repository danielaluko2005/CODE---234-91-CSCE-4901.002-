
export const name = "Unique Device Count";

export async function run(app, doc) {
    const events = [
        {
            deviceName: "Camera",
            timestamp: "2026-10-26T10:00:00"
        },
        {
            deviceName: "Camera",
            timestamp: "2026-10-26T10:01:00"
        },
        {
            deviceName: "Door Sensor",
            timestamp: "2026-10-26T10:02:00"
        }
    ];

    app.updateDashboard(events);

    const deviceCount =
        doc.getElementById("deviceCount");

    const eventCount =
        doc.getElementById("eventCount");

    return (
        deviceCount.textContent.trim() === "2" &&
        eventCount.textContent.trim() === "3"
    );
}
