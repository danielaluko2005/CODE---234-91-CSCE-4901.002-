
export const name = "Recent Activity Sorting";

export async function run(app, doc) {
    const events = [
        {
            deviceName: "Old Camera",
            timestamp: "2026-10-20T09:00:00"
        },
        {
            deviceName: "Newest Sensor",
            timestamp: "2026-10-26T12:00:00"
        },
        {
            deviceName: "Middle Router",
            timestamp: "2026-10-23T11:00:00"
        }
    ];

    app.updateDashboard(events);

    const cards =
        doc.querySelectorAll(".activity-card h3");

    return (
        cards.length === 3 &&
        cards[0].textContent.trim() === "Newest Sensor" &&
        cards[1].textContent.trim() === "Middle Router" &&
        cards[2].textContent.trim() === "Old Camera"
    );
}
