const API_BASE_URL =
    "http://127.0.0.1:8000";


async function fetchNetworkEvents() {
    const response =
        await fetch(
            `${API_BASE_URL}/api/events`
        );

    if (!response.ok) {
        throw new Error(
            "Unable to load network events"
        );
    }

    return await response.json();
}


async function fetchSystemStatus() {
    const response =
        await fetch(
            `${API_BASE_URL}/api/status`
        );

    if (!response.ok) {
        throw new Error(
            "Unable to load system status"
        );
    }

    return await response.json();
}


export {
    fetchNetworkEvents,
    fetchSystemStatus
};