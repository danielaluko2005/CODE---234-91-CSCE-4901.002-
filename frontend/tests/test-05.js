
export const name = "Latest Event Timestamp";

export async function run(app, doc) {
    const events = [
        {
            deviceName: "New Camera",
            timestamp: "2026-10-26T12:30:00"
        },
        {
            deviceName: "Old Sensor",
            timestamp: "2026-10-20T08:00:00"
        }
    ];

    app.updateDashboard(events);

    const lastUpdate =
        doc.getElementById("lastUpdate");

    const displayed =
        lastUpdate.textContent.trim();

    return (
        displayed.includes("Oct") &&
        displayed.includes("26") &&
        displayed.includes("2026")
    );
}
