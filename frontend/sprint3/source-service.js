import { fetchEventPayload } from "./api-client.js";
import { normalizeEvents } from "./event-adapter.js";
import { getMockPayload } from "./mock-events.js";
import { uniqueEvents, newestFirst } from "./event-tools.js";

async function loadSource(source, options = {}) {
    if (!["mock", "live"].includes(source)) throw new Error("Choose mock or live source");
    const payload = source === "mock" ? getMockPayload() : await fetchEventPayload(options);
    const events = normalizeEvents(payload);
    return newestFirst(uniqueEvents(events));
}

export { loadSource };
