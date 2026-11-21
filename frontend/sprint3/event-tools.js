// Small data helpers used by the Sprint 3 API dashboard.

function eventKey(event) {
    // Stable identifiers are more reliable than a timestamp alone.
    if (event.id !== null && event.id !== undefined) return String(event.id);
    return [event.deviceName, event.timestamp, event.activity].join("|");
}

function uniqueEvents(events) {
    const seen = new Set();
    return events.filter(event => {
        const key = eventKey(event);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}


function newestFirst(events) {
    return [...events].sort((a, b) => {
        const aTime = new Date(a.timestamp || 0).getTime() || 0;
        const bTime = new Date(b.timestamp || 0).getTime() || 0;
        return bTime - aTime;
    });
}


function eventSummary(events) {
    const deviceNames = new Set(events.map(event => event.deviceName).filter(Boolean));
    const times = events.map(event => Date.parse(event.timestamp)).filter(Number.isFinite);
    return {
        eventCount: events.length,
        deviceCount: deviceNames.size,
        lastEventTime: times.length ? new Date(Math.max(...times)).toISOString() : null
    };
}


function countBySeverity(events) {
    const counts = { normal: 0, unusual: 0, threat: 0 };
    for (const event of events) {
        if (Object.hasOwn(counts, event.severity)) counts[event.severity]++;
    }
    return counts;
}

function filterEvents(events, { text = "", severity = "all" } = {}) {
    const needle = text.trim().toLowerCase();
    return events.filter(event => {
        if (severity !== "all" && event.severity !== severity) return false;
        const haystack = [event.deviceName, event.activity, event.sourceIp,
            event.destinationIp, event.protocol].join(" ").toLowerCase();
        return !needle || haystack.includes(needle);
    });
}


export { eventKey, uniqueEvents, newestFirst, eventSummary, countBySeverity, filterEvents };
