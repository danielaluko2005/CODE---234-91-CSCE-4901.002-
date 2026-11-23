import { resolveBaseUrl, EVENTS_PATH, STATUS_PATH } from "./api-config.js";

class ApiRequestError extends Error {
    constructor(message, status = null) {
        super(message);
        this.name = "ApiRequestError";
        this.status = status;
    }
}

async function getJson(path, { baseUrl, fetchImpl = fetch, signal, timeoutMs = 6000 } = {}) {
    const controller = new AbortController();
    const abortForCaller = () => controller.abort();
    if (signal?.aborted) controller.abort();
    signal?.addEventListener("abort", abortForCaller, { once: true });
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetchImpl(resolveBaseUrl(baseUrl) + path, {
            signal: controller.signal,
            headers: { Accept: "application/json" }
        });
        if (!response.ok) {
            throw new ApiRequestError(`API request failed (${response.status})`, response.status);
        }
        return await response.json();
    } finally {
        clearTimeout(timer);
        signal?.removeEventListener("abort", abortForCaller);
    }
}

async function fetchEventPayload(options = {}) {
    return getJson(EVENTS_PATH, options);
}

export { ApiRequestError, getJson, fetchEventPayload };
