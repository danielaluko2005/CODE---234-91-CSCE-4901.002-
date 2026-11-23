// API URL is the current frontend assumption, not a confirmed backend contract.
const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000";
const EVENTS_PATH = "/api/events";
const STATUS_PATH = "/api/status";

function resolveBaseUrl(override = "") {
    const base = String(override || DEFAULT_API_BASE_URL).trim();
    const parsed = new URL(base);
    if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error("Backend URL must use http or https");
    }
    return base.replace(/\/+$/, "");
}

export { DEFAULT_API_BASE_URL, EVENTS_PATH, STATUS_PATH, resolveBaseUrl };
