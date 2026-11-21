import { strict as assert } from "node:assert";
import { test } from "node:test";
import { normalizeEvent, normalizeEvents } from "../event-adapter.js";
import { uniqueEvents, newestFirst, eventSummary, filterEvents } from "../event-tools.js";

test("converts backend keys", () => {
    const record = normalizeEvent({ device_name: "Camera", source_ip: "192.168.1.1", destination_port: 443 });
    assert.equal(record.deviceName, "Camera");
    assert.equal(record.sourceIp, "192.168.1.1");
    assert.equal(record.port, 443);
});

test("accepts arrays and wrapped responses", () => {
    assert.equal(normalizeEvents([{ device_name: "Thermostat" }]).length, 1);
    assert.equal(normalizeEvents({ data: { events: [] } }).length, 0);
    assert.throws(() => normalizeEvents({ error: true }), TypeError);
});

test("rejects malformed events and invalid timestamps", () => {
    assert.throws(() => normalizeEvent(null), TypeError);
    assert.equal(normalizeEvent({ timestamp: "not a date" }).timestamp, null);
});

test("deduplicates and sorts events", () => {
    const items = [
        { id: 2, timestamp: "2026-11-02T12:00:00Z", deviceName: "Camera" },
        { id: 1, timestamp: "2026-11-02T11:00:00Z", deviceName: "Thermostat" },
        { id: 2, timestamp: "2026-11-02T12:00:00Z", deviceName: "Camera" }
    ];
    assert.equal(uniqueEvents(items).length, 2);
    assert.equal(newestFirst(uniqueEvents(items))[0].id, 2);
});

test("computes device and event metrics", () => {
    const items = [{ deviceName: "A", severity: "normal" }, { deviceName: "A", severity: "threat" }];
    assert.equal(eventSummary(items).eventCount, 2);
    assert.equal(eventSummary(items).deviceCount, 1);
    assert.equal(filterEvents(items, { severity: "threat" }).length, 1);
});
