
export const name = "Dashboard Empty State";

export async function run(app, doc) {
    app.updateDashboard([]);

    const devices =
        doc.getElementById("deviceCount");

    const events =
        doc.getElementById("eventCount");

    const empty =
        doc.getElementById("emptyState");

    const cards =
        doc.querySelectorAll(".activity-card");

    const lastUpdate =
        doc.getElementById("lastUpdate");

    return (
        devices.textContent.trim() === "0" &&
        events.textContent.trim() === "0" &&
        !empty.classList.contains("hidden") &&
        cards.length === 0 &&
        lastUpdate.textContent.trim() === "--"
    );
}
