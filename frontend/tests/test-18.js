
export const name = "Dashboard Loading State";

export async function run(app, doc) {
    const event = {
        id: 107,
        deviceName: "Loading Test Device",
        deviceType: "sensor",
        sourceIp: "192.168.1.60",
        destinationIp: "192.168.1.1",
        protocol: "TCP",
        port: 443,
        activity: "Test Event",
        timestamp: "2026-10-26T15:10:00"
    };

    app.updateDashboard([event]);

    const before =
        doc.querySelectorAll(".activity-card").length;

    app.showLoading();

    const loading =
        doc.getElementById("loadingState");

    const after =
        doc.querySelectorAll(".activity-card").length;

    const error =
        doc.getElementById("errorState");

    return (
        before === 1 &&
        !loading.classList.contains("hidden") &&
        after === 0 &&
        error.classList.contains("hidden")
    );
}
