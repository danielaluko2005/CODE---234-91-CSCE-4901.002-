# Network Monitor - Backend (Sprint 1)

- **R1 Monitor Network Traffic**: captures Linux traffic and reads source IP, destination IP, port, protocol and activity.
- **R2 Record Network Events**: saves every event with a UTC date/time.

## Setup
```bash
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
pytest
```

## Run (capture needs root)
```bash
sudo ./venv/bin/python run.py
```
Docs and a "try it out" page: http://localhost:8000/docs

## API
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/monitor/start` | Start capture. Optional body: `{"interface": "eth0"}` (see `ip link`) |
| POST | `/api/monitor/stop` | Stop capture |
| GET | `/api/monitor/status` | Running or not |
| GET | `/api/events` | Recorded events. Optional: `start`, `end`, `protocol`, `limit`, `offset` |

## Flow
sniffer -> packet_parser -> activity_classifier -> event_service (adds timestamp) -> database -> `/api/events`

## Later sprints
Batch DB writes, live traffic view, more filters, event count/detail endpoints, CORS for a frontend.
