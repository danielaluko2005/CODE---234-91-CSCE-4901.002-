
# CODE---234-91-CSCE-4901.002-

# 🛡️ Real-Time Network Intrusion Detection & Anomaly Monitoring System

> A cybersecurity capstone project focused on detecting suspicious network activity in a controlled environment using network monitoring, rule-based detection, and optional machine learning.

## 📌 Project Overview

This project is a real-time Network Intrusion Detection System (IDS) designed to monitor network activity and identify suspicious or potentially malicious behavior.

The system will collect network traffic information, analyze network behavior, detect selected attack patterns, and provide security alerts through a web-based dashboard. The initial version will focus on rule-based detection, with machine-learning-based anomaly detection planned as an optional enhancement.

The project will be developed and tested in an isolated and controlled environment to ensure that all security testing is authorized and does not affect external networks.

## 🎯 Project Goals

The main goals of this project are to:

* 🔍 Monitor network activity in real time
* 🚨 Detect suspicious network behavior
* 🛡️ Identify selected cybersecurity attack patterns
* 📊 Provide a clear security monitoring dashboard
* 🗃️ Store and analyze security incidents
* 🧠 Explore machine learning for anomaly detection
* 🧪 Evaluate the accuracy and effectiveness of the detection system
* 🔐 Develop the system using secure software development practices

## ⚙️ How It Works

```text
                    ┌──────────────────┐
                    │   Network / IoT  │
                    │     Devices      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Network Traffic  │
                    │    Monitoring    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Feature / Data   │
                    │    Extraction    │
                    └────────┬─────────┘
                             │
                             ▼
                ┌──────────────────────────┐
                │     Detection Engine     │
                │                          │
                │  • Rule-Based Detection  │
                │  • Anomaly Detection     │
                └────────────┬─────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Security Alerts  │
                    └────────┬─────────┘
                             │
                    ┌────────┴────────┐
                    ▼                 ▼
             ┌─────────────┐   ┌─────────────┐
             │  Database   │   │  Dashboard  │
             └─────────────┘   └─────────────┘
```

## 🔎 Initial Detection Scenarios

The first version of the system will focus on a limited number of controlled scenarios, including:

* 🔎 Port scanning
* 🔑 Repeated authentication attempts
* 🌐 Unusual connection patterns
* 📈 Abnormal network traffic volume
* ⚠️ Other selected network behaviors identified during development

Additional detection scenarios may be added depending on project progress and available hardware.

## 🧠 Detection Approach

The project will begin with a **rule-based detection system**.

For example, if one device attempts to connect to a large number of different ports within a short period of time, the system may identify the behavior as a possible port scan.

The detection engine will analyze information such as:

* Source IP address
* Destination IP address
* Source port
* Destination port
* Network protocol
* Timestamp
* Number of connections
* Packet statistics
* Connection frequency

After the rule-based system is functioning correctly, the team may implement a machine-learning-based anomaly detector to identify network behavior that differs from established normal activity.

## 💻 Technology Stack

### Backend

* 🐍 Python
* ⚡ FastAPI

### Network Monitoring

* 📡 Scapy
* 🐧 Linux
* 🔬 Wireshark for testing and analysis

### Frontend

* ⚛️ React
* 📘 TypeScript

### Database

* 🗄️ PostgreSQL

### Machine Learning

* 🤖 scikit-learn

### Development & Deployment

* 🐳 Docker
* 🌿 Git
* 🐙 GitHub

> The technology stack may change as the project develops and after consultation with our capstone professor.

## 🖥️ Planned Features

### Network Monitoring

* Real-time network activity monitoring
* IP and port tracking
* Protocol identification
* Connection monitoring
* Network traffic statistics

### Threat Detection

* Port scan detection
* Repeated authentication attempt detection
* Suspicious connection detection
* Abnormal traffic detection
* Severity classification

### Security Dashboard

* Real-time alerts
* Source and destination information
* Attack classification
* Severity levels
* Incident history
* Network activity statistics
* Security event search

### Optional Features

* Machine-learning anomaly detection
* Automated risk scoring
* Simulated incident response
* Additional IoT-specific detection
* Advanced network visualization

## 🧪 Testing Environment

All security testing will be performed in a **controlled and isolated environment**.

The team plans to investigate the use of:

* Raspberry Pi devices
* ESP32 or similar IoT development boards
* Virtual machines
* Test routers or network switches
* Other available university equipment

The exact hardware configuration will be determined after meeting with our capstone professor and reviewing available resources.

## 🔐 Security & Ethical Considerations

This project is intended for educational and research purposes.

All testing will be performed only on systems and devices that the team is authorized to use.

The project will:

* Use an isolated testing environment
* Avoid scanning unauthorized networks
* Use controlled attack simulations
* Avoid disrupting university production networks
* Protect collected network information
* Clearly document testing procedures

## 👥 Team

| Member        | Responsibility                      |
| ------------- | ----------------------------------- |
| Team Member 1 | Network & IoT Infrastructure        |
| Team Member 2 | Backend & Database                  |
| Team Member 3 | Detection Engine & Machine Learning |
| Team Member 4 | Frontend & System Integration       |

> Team responsibilities may be adjusted as the project progresses.

## 📅 Development Plan

### Sprint 1 — Planning & Research

* [ ] Meet with capstone professor
* [ ] Determine available hardware
* [ ] Define project requirements
* [ ] Finalize project scope
* [ ] Research existing IDS solutions
* [ ] Identify attack scenarios
* [ ] Design system architecture
* [ ] Set up GitHub repository

### Sprint 2 — Network Monitoring

* [ ] Set up controlled network
* [ ] Configure test devices
* [ ] Implement network traffic collection
* [ ] Collect normal network activity
* [ ] Establish initial network baseline

### Sprint 3 — Detection Engine

* [ ] Implement port scan detection
* [ ] Implement authentication attempt detection
* [ ] Implement suspicious connection detection
* [ ] Create severity levels
* [ ] Test detection rules

### Sprint 4 — Backend & Database

* [ ] Develop FastAPI backend
* [ ] Create database schema
* [ ] Store security events
* [ ] Implement API endpoints
* [ ] Connect detection engine to backend

### Sprint 5 — Dashboard

* [ ] Develop React dashboard
* [ ] Display live network activity
* [ ] Display security alerts
* [ ] Add incident history
* [ ] Add statistics and visualizations

### Sprint 6 — Integration & Testing

* [ ] Connect all system components
* [ ] Run controlled attack scenarios
* [ ] Measure detection performance
* [ ] Identify false positives
* [ ] Fix system issues

### Sprint 7+ — Advanced Features

* [ ] Implement anomaly detection
* [ ] Evaluate machine-learning model
* [ ] Add additional detection scenarios
* [ ] Improve dashboard
* [ ] Complete final system evaluation

## 📊 Evaluation

The final system will be evaluated using metrics such as:

* Detection accuracy
* Detection time
* False positive rate
* False negative rate
* Number of correctly detected scenarios
* System resource usage
* Dashboard response time

The team will use controlled experiments to compare the system's behavior under normal and suspicious network conditions.

## 🚧 Current Status

**Project Phase:** Initial Planning & Research

### Current Priorities

* 📅 Schedule meeting with capstone professor
* 🧰 Determine available IoT and networking hardware
* 📝 Finalize project requirements
* 🏗️ Design initial system architecture
* 🔬 Research existing IDS technologies
* 🧪 Define controlled testing scenarios

## ⚠️ Disclaimer

This project is developed for educational purposes as part of a university capstone project.

All cybersecurity testing will be performed in controlled environments on systems that the team is authorized to access. The project is not intended to be used for unauthorized network scanning, monitoring, or attacks.

## 🚀 Sprint 3 — Frontend Development & Integration Progress

The team has continued developing DOME ALERT through the implementation of the Home Dashboard, Network Events page, backend device monitoring components, and frontend testing.

The original development plan above represents the initial project proposal. The current frontend prototype is being developed using HTML, CSS, and JavaScript, while the backend work is being developed in Python.

### 🖥️ Home Dashboard Development

The Home Dashboard provides a monitoring interface for viewing connected-device information and recent network events.

The current implementation includes:

* 📡 Monitoring status and backend connection indicators
* 📱 Connected-device and network event counts
* 🌐 Source and destination IP address information
* 🔍 Network protocols, ports, and event activity
* 🕒 Event timestamps and recent activity
* ⚠️ Loading, empty, and error states
* 🔄 Retry functionality for failed data requests
* 🛡️ Safe rendering of event information
* 📱 Responsive layout and accessible interface elements

The dashboard initially uses simulated network events while backend integration is being developed.

### 🔗 Sprint 3 API Integration Preparation

Sprint 3 focuses on preparing the Home Dashboard to receive backend event data and improving the frontend's data processing and testing.

The following frontend functionality has been implemented:

* Event normalization for different backend field names
* Validation of event records and timestamps
* Event type and severity handling
* Duplicate event removal
* Sorting of recent events by timestamp
* Event filtering and device-count calculations
* API configuration and request handling
* Request cancellation, timeouts, and HTTP error handling
* Mock API responses for frontend testing
* Separate Demo, Mock API, and Live Backend options
* Manual data refresh and Retry functionality
* Optional automatic refresh at 15-second intervals
* Automatic polling suspension when the browser tab is hidden
* Display of the last successful data refresh time

The frontend supports a simulated API response mode so integration behavior can be tested without requiring a running backend.

The Live Backend option is available for integration testing once the backend API is ready and its endpoints and response format are confirmed.

### 🧪 Frontend Testing

Automated testing has been added to verify the functionality of the dashboard and its data processing.

The available test suites include:

* **Sprint 2 Dashboard Tests:** 18 browser-based regression tests
* **Sprint 3 Browser Tests:** 21 checks for event normalization, filtering, API responses, and polling
* **Sprint 3 Node Tests:** 11 tests covering event processing and simulated API responses

The Sprint 2 tests have been run successfully. Sprint 3 browser tests and live backend integration require separate verification in the development environment.

### ⚙️ Running the Frontend

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Install and enable the Live Server extension.
4. Open `frontend/space.html` using Live Server.
5. The Home Dashboard opens with Sprint 2 demo data.
6. Select Mock API response to test the Sprint 3 frontend data-processing functionality.
7. Use Refresh Data to reload events.
8. Use the optional auto-refresh control to test periodic updates.

The Live Backend option requires a functioning backend server and compatible API responses.

### 🧪 Running the Tests

**Sprint 2 Dashboard Tests**

Open the following file using Live Server:

`frontend/tests/index.html`

Click **Run All Tests** to execute the 18 dashboard regression tests.

**Sprint 3 Browser Tests**

Open the following file using Live Server:

`frontend/sprint3/tests/index.html`

Click **Run Sprint 3 Tests** to execute the 21 browser test cases.

**Sprint 3 Node Tests**

From the repository root, run:

```bash
node --test frontend/sprint3/tests/event-tools.test.mjs frontend/sprint3/tests/api-integration.test.mjs
```

These tests validate frontend processing and simulated API behavior. Testing against the actual backend must be completed separately.

### 🔌 Backend Integration Requirements

The frontend currently uses the following provisional API configuration:

* Base URL: `http://127.0.0.1:8000`
* Network events endpoint: `/api/events`
* System status endpoint: `/api/status`

These endpoints must be confirmed with the backend developers before live integration.

The backend must provide the agreed event response structure and allow requests from the frontend development server.

### 📌 Remaining Sprint 3 Integration Work

The remaining integration tasks include:

* [ ] Confirm backend API endpoints and response fields
* [ ] Verify the backend starts and runs without errors
* [ ] Configure CORS for frontend requests
* [ ] Connect the Home Dashboard to a working backend
* [ ] Verify device and network event data from backend responses
* [ ] Test connection errors and recovery with the actual server
* [ ] Run and record all Sprint 3 test results
* [ ] Complete end-to-end frontend and backend integration testing

The frontend integration components are prepared, but successful connection to a functioning backend and actual network monitoring have not yet been verified.
