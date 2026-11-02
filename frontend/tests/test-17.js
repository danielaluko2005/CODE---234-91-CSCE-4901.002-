
export const name = "API Event Response Normalization";

export async function run(app, doc) {
    const events = [
        {
            id: 106,
            deviceName: "Test Device",
            timestamp: "2026-10-26T15:00:00"
        }
    ];

    const direct =
        app.normalizeNetworkEvents(events);

    const wrapped =
        app.normalizeNetworkEvents({
            events: events
        });

    let rejectedInvalidData = false;

    try {
        app.normalizeNetworkEvents({
            data: events
        });
    } catch (error) {
        rejectedInvalidData = true;
    }

    return (
        Array.isArray(direct) &&
        direct.length === 1 &&
        Array.isArray(wrapped) &&
        wrapped.length === 1 &&
        rejectedInvalidData
    );
}
