---
title: ESPNow Remotes
---

WLED supports wireless control via **ESPNow**, a low-latency, connectionless Wi-Fi protocol built into ESP32 and ESP8266 chips. Compatible remotes (such as the WizMote or GLEDOPTO RF remote) can send button events directly to WLED without joining your Wi-Fi network.

You can also [build your own remote](https://github.com/DedeHai/WLED-ESPNow-Remote) using an ESP32 C3.

---

## Enabling ESPNow

ESPNow is enabled in **Settings → WiFi**. Once enabled, a **Remote List** section appears on the same page.

!!! warning "Keep Wi-Fi Always On"
    For ESPNow remotes to work reliably, **Disable WiFi Sleep** must be set to keep Wi-Fi active at all times.

---

## Managing remotes

WLED can store up to **10 paired remotes**. Each remote is identified by its MAC address.

### Adding a remote

1. Press any button on the remote. WLED receives the signal and shows the remote's MAC address in the **Last device seen** field.
2. Click the **`+`** button next to the MAC address to add it to the trusted list.

Only remotes in the trusted list can control WLED. Signals from unlisted devices are ignored.

### Removing a remote

Click the **`-`** button next to any listed MAC address to remove it.

---

## Supported button codes

WLED handles the following button event codes from ESPNow remotes:

| Code | Action |
|------|--------|
| 1 | Brightness up |
| 2 | Brightness down |
| 3 | Next effect |
| 4 | Previous effect |
| 8 | Toggle on/off |
| 9 | Night mode |
| 10 | Next palette |
| 11 | Previous palette |
| 12 | White |
| 13 | Warm white |
| 14 | Daylight |
| 15 | Cool white |
| 16 | Red |
| 17 | Green |
| 18 | Blue |
| 19 | Yellow |
| 20 | Candle effect |
| 21 | Random colour |
| 22 | Fade effect |

Codes 20–22 were added in v16.0

Additional codes can be used by adding a `remote.json` file. There are some examples on how to do that available [here](https://github.com/DedeHai/WLED-ESPNow-Remote/tree/main/remote-json).


