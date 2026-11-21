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


export { eventKey, uniqueEvents };
