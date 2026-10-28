
# DOME ALERT — Sprint 2 Dashboard Test Plan

Course: CSCE 4901
Team: CODE 234-91
Contributor: Tanya
Component: Home/Monitoring Dashboard

## Objective

Verify that the dashboard correctly displays simulated
network events, monitoring status, device counts, and
system information.

## Testing Environment

Frontend: HTML, CSS, JavaScript
Browser: Chrome or Edge
Testing Tool: Live Server
Data Source: Simulated events

## Test Cases

### TC-01 — Dashboard Loading

Open space.html using Live Server.

Expected:
The DOME ALERT dashboard loads without JavaScript errors.

Status: Not Run

### TC-02 — Monitoring Mode

Open the Home Dashboard.

Expected:
Monitoring Status displays Demo Mode.
Backend Connection displays Demo Mode.
Network Scan displays Simulated.

Status: Not Run

### TC-03 — Device Count

Load the four sample events.

Expected:
Connected Devices displays 4.

Status: Not Run

### TC-04 — Network Event Count

Load the four sample events.

Expected:
Network Events displays 4.

Status: Not Run

### TC-05 — Recent Network Activity

Inspect the activity cards.

Expected:
Four events appear with device names, IP addresses,
protocols, ports, activities, and timestamps.

Status: Not Run

### TC-06 — Last Event Timestamp

Check System Status.

Expected:
The latest event displays a valid date and time.

Status: Not Run

### TC-07 — Empty State

Call updateDashboard([]).

Expected:
Both counters become 0.
Activity cards disappear.
The empty-state message appears.

Status: Not Run

### TC-08 — Error State

Call updateDashboard(null).

Expected:
An error message and Retry button appear.
Old activity cards are cleared.

Status: Not Run

### TC-09 — Retry

Click Retry after triggering an error.

Expected:
The four simulated events are displayed again.

Status: Not Run

### TC-10 — Safe Event Rendering

Provide a test event containing HTML-like text
in the device name.

Expected:
The text is displayed without being interpreted
as HTML markup.

Status: Not Run

### TC-11 — Responsive Layout

Open the dashboard using a narrow mobile viewport.

Expected:
Text, activity cards, and navigation remain usable.

Status: Not Run

### TC-12 — Events Navigation

Navigate from Home to Events and back.

Expected:
Both pages open correctly.

Status: Not Run

## Test Summary

Passed: 0
Failed: 0
Not Run: 12

## Current Limitations

- The dashboard uses simulated network events.
- Actual device monitoring is not yet verified.
- Backend API integration requires team coordination.
- Integration testing will be performed when the
  backend API is available.

## Next Steps

1. Execute frontend test cases.
2. Record actual Pass/Fail results.
3. Fix any discovered issues.
4. Confirm backend API data format.
5. Begin frontend/backend integration testing.
