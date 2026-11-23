import { resolveBaseUrl, EVENTS_PATH, STATUS_PATH } from "./api-config.js";

async function getJson(path, { baseUrl, fetchImpl = fetch, signal } = {}) {
    const response = await fetchImpl(resolveBaseUrl(baseUrl) + path, { signal, headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`API request failed (${response.status})`);
    return response.json();
}

async function fetchEventPayload(options = {}) {
    return getJson(EVENTS_PATH, options);
}

export { getJson, fetchEventPayload };
