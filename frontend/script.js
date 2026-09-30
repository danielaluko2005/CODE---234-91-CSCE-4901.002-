/* Demo only: no packet capture, HTTP requests, database, or real threat detection.
   These functions demonstrate the F1/R1 and F2/R2 presentation layer.
   A backend adapter must be added after the team agrees on the API. */
(() => {
  "use strict";
  const get = (id) => document.getElementById(id);
  const ui = {
    load: get("loadButton"), start: get("startButton"), stop: get("stopButton"),
    clear: get("clearButton"), retry: get("retryButton"), errorTest: get("errorButton"),
    status: get("monitoringStatus"), feedback: get("feedback"), error: get("errorMessage"),
    traffic: get("trafficBody"), history: get("eventList"), empty: get("emptyHistory"),
    count: get("eventCount"), trafficSection: get("traffic"), historySection: get("history")
  };
  const templates = [
    { device: "Demo thermostat", sourceIp: "192.168.50.10", destinationIp: "192.168.50.2", port: 1883, protocol: "MQTT", activity: "Simulated temperature reading sent" },
    { device: "Demo door sensor", sourceIp: "192.168.50.11", destinationIp: "192.168.50.2", port: 1883, protocol: "MQTT", activity: "Simulated door status message sent" },
    { device: "Demo smart plug", sourceIp: "192.168.50.12", destinationIp: "192.168.50.2", port: 1883, protocol: "MQTT", activity: "Simulated power status message sent" }
  ];
  let events = [];
  let timer = null;
  let loading = false;
  let sequence = 0;
  let streamIndex = 0;
  const dateFormat = new Intl.DateTimeFormat(undefined, {
    year: "numeric", month: "short", day: "2-digit", hour: "2-digit",
    minute: "2-digit", second: "2-digit", timeZoneName: "short"
  });
  function makeEvent(templateIndex, timestamp = Date.now()) {
    sequence += 1;
    return { ...templates[templateIndex % templates.length], id: `demo-${sequence}`,
      sequence, timestamp: new Date(timestamp).toISOString() };
  }
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    return Number.isNaN(date.getTime()) ? "Time unavailable" : dateFormat.format(date);
  }
  function clearError() {
    ui.error.textContent = "";
    ui.retry.hidden = true;
  }
  function updateControls() {
    ui.load.disabled = loading || timer !== null;
    ui.start.disabled = loading || timer !== null;
    ui.stop.disabled = timer === null;
    ui.clear.disabled = loading || timer !== null || events.length === 0;
    ui.errorTest.disabled = loading || timer !== null;
    ui.retry.disabled = loading || timer !== null;
  }
  function render() {
    const sorted = [...events].sort((a, b) =>
      Date.parse(b.timestamp) - Date.parse(a.timestamp) || b.sequence - a.sequence);
    ui.traffic.replaceChildren();
    ui.history.replaceChildren();
    ui.empty.hidden = sorted.length > 0;
    ui.count.textContent = String(sorted.length);
    if (!sorted.length) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 6;
      cell.textContent = "No demo events loaded yet.";
      row.append(cell);
      ui.traffic.append(row);
    }
    for (const event of sorted) {
      const row = document.createElement("tr");
      for (const value of [formatTime(event.timestamp), event.sourceIp,
        event.destinationIp, event.port, event.protocol, event.activity]) {
        const cell = document.createElement("td");
        cell.textContent = String(value);
        row.append(cell);
      }
      ui.traffic.append(row);
      const item = document.createElement("li");
      const heading = document.createElement("h3");
      heading.textContent = `${event.device} — ${event.id}`;
      const timeLine = document.createElement("p");
      const time = document.createElement("time");
      time.dateTime = event.timestamp;
      time.textContent = formatTime(event.timestamp);
      timeLine.append(time);
      const activity = document.createElement("p");
      activity.textContent = event.activity;
      const connection = document.createElement("p");
      connection.textContent = `${event.sourceIp} → ${event.destinationIp} | Port ${event.port} | ${event.protocol}`;
      item.append(heading, timeLine, activity, connection);
      ui.history.append(item);
    }
    updateControls();
  }
  async function loadSamples(fail = false) {
    if (loading || timer !== null) return;
    const retryHadFocus = document.activeElement === ui.retry;
    loading = true;
    clearError();
    ui.status.textContent = "Loading demo records. No backend request is being made.";
    ui.feedback.textContent = "Loading sample events…";
    ui.trafficSection.setAttribute("aria-busy", "true");
    ui.historySection.setAttribute("aria-busy", "true");
    updateControls();
    // Short delay lets testers see the loading state. Not a network request.
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    if (fail) {
      ui.status.textContent = "Demo load failed. Existing demo records are unchanged.";
      ui.feedback.textContent = "";
      ui.error.textContent = "Simulated load error. Select Retry sample load to recover.";
      ui.retry.hidden = false;
    } else {
      const now = Date.now();
      // Intentionally unordered input; render() sorts by timestamp.
      events = [makeEvent(0, now - 120000), makeEvent(2, now), makeEvent(1, now - 60000)];
      ui.status.textContent = "Sample events loaded. Demo stream is stopped.";
      ui.feedback.textContent = "Three simulated events loaded, newest first.";
    }
    loading = false;
    ui.trafficSection.setAttribute("aria-busy", "false");
    ui.historySection.setAttribute("aria-busy", "false");
    render();
    if (retryHadFocus) ui.load.focus();
  }
  function addStreamEvent() {
    events.push(makeEvent(streamIndex++));
    if (events.length > 100) events = events.slice(-100);
    render();
    ui.feedback.textContent = `Demo event added. ${events.length} simulated events displayed.`;
  }
  function startStream() {
    if (loading || timer !== null) return;
    clearError();
    timer = window.setInterval(addStreamEvent, 4000);
    ui.status.textContent = "Demo stream running. This does not monitor your network.";
    addStreamEvent();
    ui.stop.focus();
  }
  function stopStream() {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
    ui.status.textContent = "Demo stream stopped. Records remain until this page is reloaded or cleared.";
    ui.feedback.textContent = "Demo stream stopped.";
    updateControls();
    ui.start.focus();
  }
  ui.load.addEventListener("click", () => loadSamples());
  ui.retry.addEventListener("click", () => loadSamples());
  ui.errorTest.addEventListener("click", () => loadSamples(true));
  ui.start.addEventListener("click", startStream);
  ui.stop.addEventListener("click", stopStream);
  ui.clear.addEventListener("click", () => {
    if (loading || timer !== null) return;
    events = [];
    clearError();
    ui.status.textContent = "Demo events cleared. Demo stream is stopped.";
    ui.feedback.textContent = "Demo events cleared from this page only.";
    render();
    ui.load.focus();
  });
  window.addEventListener("pagehide", () => {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
    ui.status.textContent = "Demo stream stopped.";
    updateControls();
  });
  render();
})();
