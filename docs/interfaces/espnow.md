---
title: ESPNow Remotes
---

WLED supports wireless control via **ESPNow**, a low-latency, connectionless Wi-Fi protocol built into ESP32 and ESP8266 chips. Compatible remotes (such as the WizMote or GLEDOPTO RF remote) can send button events directly to WLED without joining your Wi-Fi network.

---

## Enabling ESPNow

ESPNow is enabled in **Settings → WiFi**. Once enabled, a **Remote List** section appears on the same page.

---

## Managing remotes

WLED can store up to **10 paired remotes**. Each remote is identified by its MAC address.

### Adding a remote

1. Press any button on the remote. WLED receives the signal and shows the remote's MAC address in the **Last device seen** field.
2. Click the **`+`** button next to the MAC address to add it to the trusted list.

Only remotes in the trusted list can control WLED. Signals from unlisted devices are ignored.

### Removing a remote

Click the **`-`** button next to any listed MAC address to remove it.

### Manual entry

You can also type a MAC address directly (12 hex characters, no separators). The field validates the format before saving.

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

Codes 20–22 were added in v0.16.

---

## Compatible remotes

| Remote | Notes |
|--------|-------|
| WizMote | Press and hold the power button for ~5 s to put it into pairing mode. |
| GLEDOPTO RF Remote | Works out of the box with ESPNow-enabled WLED builds. |

Other ESP32/ESP8266-based devices running ESPNow can also act as remotes if they send the correct button code format.

---

## Notes

- ESPNow remotes operate on the same Wi-Fi channel as your WLED device. If the device is connected to a 2.4 GHz access point, the channel is fixed to that AP's channel. Standalone (AP mode) devices default to channel 1.
- ESPNow does not require an internet connection or a Wi-Fi router — it works peer-to-peer.
- The paired remote list is saved to WLED's configuration file under the key `linked_remote` (same as earlier firmware versions — existing configs are backward compatible).
