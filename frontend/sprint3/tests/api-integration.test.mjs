import { strict as assert } from "node:assert";
import { test } from "node:test";
import { fetchEventPayload, ApiRequestError } from "../api-client.js";
import { loadSource } from "../source-service.js";
import { getMockPayload } from "../mock-events.js";
import { createPoller } from "../poller.js";

test("mock mode returns normalized events without HTTP calls", async () => {
    const events = await loadSource("mock", {
        fetchImpl: () => {
            throw new Error("should not fetch");
        }
    });

    assert.equal(events.length, 4);
    assert.equal(events[0].deviceName, "Thermostat");
    assert.equal(events[0].severity, "normal");
});

test("live mode transforms backend event payload", async () => {
    const events = await loadSource("live", {
        fetchImpl: async () => ({
            ok: true,
            json: async () => ({
                events: [
                    {
                        id: 1,
                        device_name: "Door Sensor",
                        source_ip: "10.0.0.2"
                    }
                ]
            })
        })
    });

    assert.equal(events.length, 1);
    assert.equal(events[0].deviceName, "Door Sensor");
});

test("HTTP 404 has status, not a silent demo fallback", async () => {
    await assert.rejects(
        () => fetchEventPayload({
            fetchImpl: async () => ({
                ok: false,
                status: 404
            })
        }),
        error =>
            error instanceof ApiRequestError &&
            error.status === 404
    );
});

test("bad backend JSON is rejected", async () => {
    await assert.rejects(
        () => loadSource("live", {
            fetchImpl: async () => ({
                ok: true,
                json: async () => ({
                    error: "Unavailable"
                })
            })
        }),
        TypeError
    );
});

test("fixture cannot be mutated globally", () => {
    const copy = getMockPayload();
    copy.events.splice(0);

    assert.equal(getMockPayload().events.length, 4);
});

test("poller does not create a second running loop", () => {
    const poller = createPoller(() => {}, 10000);

    poller.start();
    poller.start();

    assert.equal(poller.running, true);

    poller.stop();

    assert.equal(poller.running, false);
});
