
export const name = "Dashboard Demo Mode";

export async function run(app, doc) {
    const monitoring =
        doc.getElementById("monitoringStatus");

    const backend =
        doc.getElementById("backendStatus");

    const scan =
        doc.getElementById("scanStatus");

    return (
        monitoring.textContent.trim() === "Demo Mode" &&
        backend.textContent.trim() === "Demo Mode" &&
        scan.textContent.trim() === "Simulated"
    );
}

