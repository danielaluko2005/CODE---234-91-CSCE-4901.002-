
export const name = "Invalid Event Timestamp";

export async function run(app, doc) {
    const event = {
        id: 103,
        deviceName: "Test Sensor",
        deviceType: "sensor",
        sourceIp: "192.168.1.30",
        destinationIp: "192.168.1.1",
        protocol: "TCP",
        port: 443,
        activity: "Status Update",
        timestamp: "invalid-date"
    };

    app.updateDashboard([event]);

    const activityTime =
        doc.querySelector(".activity-time");

    const lastUpdate =
        doc.getElementById("lastUpdate");

    return (
        activityTime !== null &&
        activityTime.textContent.trim() === "--" &&
        lastUpdate.textContent.trim() === "--"
    );
}
