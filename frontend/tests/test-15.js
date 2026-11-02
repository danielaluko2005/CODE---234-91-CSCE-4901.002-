
export const name = "Safe Network Address Rendering";

export async function run(app, doc) {
    const event = {
        id: 104,
        deviceName: "Test Router",
        deviceType: "router",
        sourceIp: "<b>192.168.1.10</b>",
        destinationIp: "<i>192.168.1.1</i>",
        protocol: "TCP",
        port: 443,
        activity: "Connection Test",
        timestamp: "2026-10-26T14:40:00"
    };

    app.updateDashboard([event]);

    const route =
        doc.querySelector(".activity-card .network-route");

    if (!route) {
        return false;
    }

    return (
        route.textContent.includes("<b>192.168.1.10</b>") &&
        route.textContent.includes("<i>192.168.1.1</i>") &&
        route.querySelector("b") === null &&
        route.querySelector("i") === null
    );
}
