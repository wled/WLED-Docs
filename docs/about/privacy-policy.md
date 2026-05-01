---
title: Privacy Policy
hide:
  # - navigation
  - toc
---

# WLED Privacy Policy (GDPR-Compliant)

Last updated: 2025-11-20

## 1. Introduction
This Privacy Policy describes how the WLED Open Source Software (“WLED”, “the Software”) processes technical data when it is installed and run on a device. WLED is designed to operate locally and does not intentionally collect, transmit, or store personal data (as defined under the EU General Data Protection Regulation (GDPR)).

Because WLED is self-hosted (flashed onto user-controlled hardware), the individual or organization deploying WLED acts as the “Data Controller” for any data arising from its local operation. The WLED open source contributors act only as software publishers and typically do not receive any data.

New in recent versions: WLED offers an optional, opt-in submission of device hardware and configuration details to the WLED Usage Server. This occurs only if you explicitly click Accept during a fresh install or an upgrade prompt. No user behavior or personal data is collected or transmitted in this submission.

## 2. Scope
This policy applies to:
- The WLED firmware and its built-in web interface.
- Optional configuration and diagnostic data stored locally on the device.
- The optional, opt-in submission of non-personal hardware and configuration details to the WLED Usage Server.

It does not cover:
- Third-party integrations (e.g., Home Automation platforms, MQTT brokers, cloud dashboards).
- Forks or modified builds.
- External logging or analytics that a user may choose to enable independently.

## 3. Key Definitions (GDPR Art. 4)
- Personal Data: Any information relating to an identified or identifiable natural person. WLED is designed not to process such data by default.
- Processing: Any operation performed on data (e.g., storage, transmission).
- Data Controller: The person or entity determining purposes and means of processing (typically the device owner for local operation; for the optional Usage Server submission, the WLED project acts as a separate controller of that dataset).
- Data Processor: A party processing data on behalf of a controller (generally not applicable; WLED maintainers do not process your local data).

## 4. Categories of Data Processed
WLED processes and stores the following non-personal technical and configuration data locally on the device. If you opt in, a subset may be transmitted to the WLED Usage Server as described below.

### 4.1 Hardware & System Diagnostics (Local)
- Microcontroller type (e.g., ESP8266, ESP32 variant)
- Firmware version and build identifiers
- Available flash/RAM and usage metrics
- Uptime counters and reboot reason codes
- Voltage or power draw estimates (if supported)

### 4.2 LED & Effect Configuration (Local)
- Number of LEDs and mapping/segment definitions
- Color palette selections and active effects
- Brightness level and power limiting configuration
- GPIO pin assignments related to LED control

### 4.3 Network & Interface Settings (Local Only)
- Device name/hostname you assign (stored locally)
- Local IP address (assigned by your router, not transmitted by default)
- mDNS service name (if enabled)
- Wi‑Fi signal strength (RSSI) and channel
- MQTT broker address and topic strings (if you configure them)
- Sync group identifiers for multi-device coordination

### 4.4 Optional Feature Flags (Local)
- Enabled modules (e.g., audio reactive mode, sound input calibration, IR remote mapping)
- Security settings (OTA password hash, admin interface lock status)

### 4.5 Persistence Mechanisms
- Stored in device flash (configuration JSON or similar internal structures)
- Temporarily held in RAM for active operation

### 4.6 Data NOT Collected
WLED intentionally does NOT collect:
- User names, email addresses, physical addresses
- Precise geolocation
- Usage analytics or behavioral clickstreams
- Personal identifiers or profiling metrics
- Content unrelated to LED control (e.g., photos, messages)
- Credentials (e.g., Wi‑Fi or MQTT passwords) for transmission

If you integrate WLED with external platforms that gather personal data, such collection is outside the scope of this policy.

### 4.7 Optional Telemetry: WLED Usage Server (Opt-in)
If, after a fresh install or upgrade, you click Accept on the prompt, WLED will transmit a one-time report to the WLED Usage Server containing only non-personal hardware and configuration details. No user behavior or personal data is included.

Data included in the submission:
- Microcontroller family and model
- WLED firmware version/build and compile-time feature flags
- LED configuration: total LED count, segment counts and lengths, chipset type(s)
- Enabled modules/features (e.g., audio reactive enabled, IR support enabled)
  
Data explicitly excluded from the submission:
- Device name/hostname
- IP or MAC addresses
- Wi‑Fi SSID, passwords, or MQTT credentials
- User-entered free text fields
- Any usage or behavior logs (effects used over time, button clicks, etc.)
- Any data that directly identifies an individual

Network metadata:
- As with any internet request, your network will necessarily handle an IP address for routing. The WLED Usage Server is configured to minimize exposure to such metadata and not retain it in application logs. No IP or similar identifiers are stored with the submitted payload.

Frequency:
- A single submission occurs only when you click Accept on the post-install/upgrade prompt. No continuous telemetry is sent. If you do not Accept, nothing is sent.

## 5. Purposes of Processing
The technical data above is processed exclusively for:
- Proper functioning of LED control and effects (local processing)
- Device configuration management and persistence (local processing)
- Performance optimization (e.g., memory/power limiting) (local processing)
- Interoperability with user-selected local automation systems (local processing)
- Security features (e.g., validating OTA updates with stored credentials) (local processing)
- If opted in: creating aggregate, anonymized statistics about hardware types, common configurations, and feature adoption to help prioritize development and improve compatibility (Usage Server)

## 6. Legal Basis (GDPR Art. 6)
- Local, non-personal technical data: GDPR Recital 26 (data not related to an identified or identifiable person is outside GDPR’s scope).
- Optional Usage Server submission: Explicit consent (Art. 6(1)(a)), provided by clicking Accept. You can decline, or withdraw consent at any time as described below.

If a deployment introduces personal data (e.g., assigning a hostname containing a person’s name), the Data Controller’s legal basis is typically “legitimate interest” (Art. 6(1)(f)) for operating home automation equipment.

## 7. Data Minimization & Privacy-by-Design
- Only essential hardware and configuration parameters are processed.
- No remote transmission occurs unless you explicitly opt in.
- The Usage Server is designed to exclude personal data and user behavior metrics.
- Network metadata (e.g., IP addresses) is not retained in application logs.

## 8. Data Retention
- Local: Configuration and diagnostic data persist only as long as the firmware remains flashed and settings are not factory-reset. Ephemeral runtime metrics (e.g., RAM usage) disappear on reboot.
- Usage Server (opt-in): Reports are retained only as long as needed to compute aggregate statistics. Aggregate metrics do not contain personal data. Raw payloads are minimized and not retained beyond what is necessary for aggregation and service integrity.

## 9. Data Sharing & Disclosure
- Local: No data is sent to WLED maintainers, cloud services, or third parties by default.
- Usage Server (opt-in): Your one-time submission is processed by the WLED Usage Server operated for the WLED project. No sale of data. No sharing with advertisers. Access is restricted to project maintainers for the stated purposes.

Data leaves the device only if you enable integrations (e.g., MQTT publishing of state messages) or opt in to the Usage Server submission. Those messages should not include personal identifiers, and WLED does not transmit credentials.

## 10. International Transfers
- Local-only operation: No transfers.
- Usage Server (opt-in): The service may be hosted in a jurisdiction different from yours. As the payload is strictly non-personal technical data, GDPR cross-border transfer rules are generally not triggered. If hosting occurs outside your region, standard technical and organizational measures are used to protect the data in transit and at rest.

## 11. Security Measures
- Local configuration is stored in flash with standard microcontroller access controls.
- Optional OTA update password (recommended).
- Use a secure local network; avoid exposing WLED directly to the public internet.
- Usage Server submissions are transmitted over encrypted channels (HTTPS/TLS).
- Server-side access is limited to authorized project maintainers.

## 12. User / Data Subject Rights
Since WLED does not process personal data by default, GDPR data subject rights (access, erasure, portability, etc.) are generally not applicable.

If you introduce personal data into custom fields under your control, you can:
- Access: View configuration via the web UI or API.
- Rectify: Edit settings.
- Erase: Perform a factory reset or reflash the device.

Consent management for the Usage Server:
- Decline the prompt to avoid any transmission.
- If you accepted by mistake: no continuous telemetry is sent; no further action is required for that submission. You may also reset/reflash to clear settings or decline on future prompts after upgrades.

## 13. Children’s Data
WLED is not designed to target or identify children. No age-related data is processed.

## 14. Third-Party Integrations
If you connect WLED to:
- Home Assistant
- Smart home hubs
- Cloud IoT platforms
Their privacy policies govern any additional data processing. Ensure you do not embed personal identifiers in topics, device names, or payloads.

## 15. Open Source Contributions
Issue reports or pull requests in public repositories may contain optional personal data that a contributor posts voluntarily (e.g., GitHub handle). Such data is processed under those platforms’ privacy policies, not by WLED firmware runtime.

## 16. Changes to This Policy
We may update this policy to reflect firmware or service changes. Revisions will be published in the source repository with an updated “Last updated” date. Material changes to the Usage Server submission flow will be reflected in the in-app prompt.

## 17. Contact / Questions
WLED is a community-driven open source project; a formal Data Protection Officer (DPO) is typically not required. For privacy-related questions:
- Open a discussion or issue in the official WLED repository (avoid sharing personal data).
- If you embed WLED in a commercial context, consult local regulations and your legal counsel.

## 18. Controller Guidance (Commercial / Institutional Deployments)
If you embed WLED in a product offered to end-users:
- Perform a Data Protection Impact Assessment (DPIA) if you add telemetry.
- Provide end-users with a tailored privacy notice if any personal data is introduced.
- Maintain records of processing if personal data becomes involved (Art. 30).

## 19. How to Keep Deployments Privacy-Respecting
- Use generic device names (e.g., “wled-livingroom”) rather than personal identifiers.
- Avoid adding user-specific tags into MQTT topics.
- Do not expose the device directly to the internet without appropriate safeguards.
- Regularly update firmware to the latest stable releases.

---

Short Summary (Non-Legal):
WLED runs locally and stores only what it needs to control LEDs. It does not collect personal or behavioral data. After install or upgrade, you may optionally click Accept to send a one-time, non-personal report of your hardware and configuration to the WLED Usage Server to help improve compatibility and development priorities. If you don’t accept, nothing is sent.
