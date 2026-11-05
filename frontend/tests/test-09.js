
export const name = "Dashboard Retry Recovery";

export async function run(app, doc) {
    app.updateDashboard(null);

    const retry =
        doc.getElementById("retryButton");

    const error =
        doc.getElementById("errorState");

    if (!retry || error.classList.contains("hidden")) {
        return false;
    }

    retry.click();

    await new Promise(resolve => {
        setTimeout(resolve, 650);
    });

    const eventCount =
        doc.getElementById("eventCount");

    const cards =
        doc.querySelectorAll(".activity-card");

    return (
        eventCount.textContent.trim() === "4" &&
        cards.length === 4 &&
        error.classList.contains("hidden")
    );
}
