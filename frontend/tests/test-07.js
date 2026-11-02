
export const name = "Invalid Event Data";

export async function run(app, doc) {
    app.updateDashboard(null);

    const error =
        doc.getElementById("errorState");

    const devices =
        doc.getElementById("deviceCount");

    const events =
        doc.getElementById("eventCount");

    const cards =
        doc.querySelectorAll(".activity-card");

    return (
        !error.classList.contains("hidden") &&
        devices.textContent.trim() === "0" &&
        events.textContent.trim() === "0" &&
        cards.length === 0
    );
}
