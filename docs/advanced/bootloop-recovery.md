---
title: Boot-loop Detection & Recovery
---

WLED can detect when your controller is stuck in a crash loop and automatically take steps to recover it — without you needing a USB cable or serial terminal. This feature is especially useful after a bad settings change, a corrupted config file, or a failed OTA update.

---

## What Counts as a Boot-loop?

WLED counts **crash resets** stored in RTC memory (which survives a soft reboot). A crash reset is any of these reset reasons:

- Exception / software exception
- Hardware watchdog timeout
- Software watchdog timeout
- Panic / abort
- Task watchdog timeout

Normal power-on resets and clean software restarts reset the counter to zero. Brownout resets are logged but **do not** increment the counter.

If **5 or more crashes** happen within a **2-minute rolling window**, WLED considers the device stuck in a boot-loop and triggers the recovery sequence.

---

## Recovery Sequence

Recovery actions are taken **one per boot**, in order. After each action WLED restarts immediately. If the device still crashes after that restart, the next action is taken on the following boot.

| Step | Action | What it does |
|---|---|---|
| **1** | Restore backup config | Copies `/bkp.cfg.json` back over `/cfg.json` — rolls back to the last known-good configuration. |
| **2** | Reset config | Renames `/cfg.json` to `/rst.cfg.json` and starts WLED with factory defaults. Your old config is preserved in `/rst.cfg.json` for manual recovery. |
| **3** | Firmware rollback *(ESP32 only)* | Swaps the OTA boot partition to the previous firmware image. Useful after a bad OTA update. On ESP8266 this step is skipped. |
| **4** | Emergency serial dump | Dumps all filesystem files to the serial port and then **loops indefinitely**. WLED will not start normally again until you power-cycle or hardware-reset the board. Connect a serial terminal at 115200 baud to retrieve the files. |

!!! warning
    Step 4 is the last resort. WLED stops booting and only outputs to serial. A hardware reset (power cycle or the RST button) is required to exit this state.

---

## How the State Is Stored

The crash counter and recovery progress are stored in **RTC memory**, which persists across soft reboots but is cleared by a power cycle or hardware reset.

- **ESP32:** uses `RTC_NOINIT_ATTR` static variables (three values: last boot timestamp, crash count, recovery step).
- **ESP8266:** uses `RTC_USER_MEM` slots 32–34 (same three values).

This means:

- Pulling the power clears the counter — the device starts fresh on the next boot.
- A clean software restart from the WLED UI also clears the counter.

---

## Where This Runs

Boot-loop detection runs very early in startup (`WLED::setup()`), right after the filesystem is mounted and before any configuration is loaded. This ensures recovery can happen even if config loading itself is what causes the crash.

---

## Tips

- If your device lands in **Step 2** (reset config), check the serial log or the filesystem editor for `/rst.cfg.json` — your previous settings are still there.
- If you're on ESP32 and a firmware update went wrong, **Step 3** (rollback) may recover you automatically without needing to re-flash.
- To manually clear the crash counter without power-cycling, do a clean restart from the WLED web UI (reboot button in Settings → Security & Updates).
