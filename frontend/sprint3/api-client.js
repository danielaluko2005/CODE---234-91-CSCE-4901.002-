import { resolveBaseUrl, EVENTS_PATH, STATUS_PATH } from "./api-config.js";

class ApiRequestError extends Error {
    constructor(message, status = null) {
        super(message);
        this.name = "ApiRequestError";
        this.status = status;
    }
}

async function getJson(path, { baseUrl, fetchImpl = fetch, signal } = {}) {
    const response = await fetchImpl(resolveBaseUrl(baseUrl) + path, { signal, headers: { Accept: "application/json" } });
    if (!response.ok) throw new ApiRequestError(`API request failed (${response.status})`, response.status);
    return response.json();
}

async function fetchEventPayload(options = {}) {
    return getJson(EVENTS_PATH, options);
}

export { ApiRequestError, getJson, fetchEventPayload };
