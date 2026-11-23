// A single, stoppable refresh loop. The caller decides whether the page is visible.
function createPoller(refresh, intervalMs = 15000) {
    if (typeof refresh !== "function") throw new TypeError("refresh must be a function");
    let timer = null;
    let running = false;
    async function tick() {
        if (!running) return;
        try {
            await refresh();
        } finally {
            if (running) timer = setTimeout(tick, intervalMs);
        }
    }
    return {
        start() {
            if (running) return;
            running = true;
            timer = setTimeout(tick, intervalMs);
        },
        stop() {
            running = false;
            if (timer !== null) clearTimeout(timer);
            timer = null;
        },
        get running() { return running; }
    };
}

export { createPoller };
