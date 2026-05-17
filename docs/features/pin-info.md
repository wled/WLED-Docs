---
title: Pin Info
---

The **Pin Info** page gives you a live overview of every GPIO pin on your controller — what it's doing right now, and what it's capable of. It's a handy diagnostic tool when troubleshooting hardware conflicts or checking whether a pin is free to use.

Open it from **Settings → Pin Info**, or navigate directly to `http://<wled-ip>/settings/pininfo`.

The table refreshes every 250 ms, so button presses and touch events show up in real time.

---

## Table Columns

| Column | What it shows |
|---|---|
| **Pin** | GPIO number (e.g. *GPIO4*) |
| **Used by** | Who or what currently owns the pin (see below) |
| **Pin Notes** | Hardware capabilities of that pin (see below) |

---

## "Used By" — Pin Owners

A pin can be in one of these states:

- **Available** — not allocated to anything; free to use.
- **System** — reserved by WLED internals (flash, USB-JTAG, strapping pins, etc.). These pins cannot be assigned.
- **LED Digital / LED PWM / LED On/Off** — driving an LED bus.
- **Button** — configured as a button input. The button type (Push, Switch, Touch, Analog, PIR, …) is shown in small text next to "Button".
- **IR Receiver** — infrared remote input.
- **Relay** — relay output.
- **Ethernet** — used by an Ethernet (LAN) interface.
- **I2C / SPI / SPI RAM** — bus lines claimed by a peripheral.
- **DMX Output / DMX Input** — serial DMX data lines.
- **HUB75** — RGB matrix panel interface.
- **Debug** — debug/logging output.
- **Usermod** — claimed by a usermod. The usermod slot number is shown (e.g. *UM #134*).

For button pins, a small coloured dot appears to the left of the owner label:

- **Green dot** — button is currently pressed / signal is HIGH.
- **Grey dot** — button is released / signal is LOW.

For touch-capable pins, the raw capacitive touch reading is shown in small grey text next to the dot.

---

## "Pin Notes" — Hardware Capabilities

This column lists the hardware capabilities of the pin itself (not its current use):

| Note | Meaning |
|---|---|
| **Analog** | Can be used as an ADC (analogue-to-digital) input |
| **Touch** | Has a built-in capacitive touch sensor |
| **Input Only** | Output driver not available; can only be read, not driven |
| **Flash Boot** | Connected to the SPI flash — avoid using during normal operation |
| **Bootstrap** | A strapping pin that affects boot mode; use with caution |

A dash (`-`) means no special notes apply.

---

## Tips

- Pins shown as **System** or with **Flash Boot** / **Bootstrap** notes are best left unassigned unless you know exactly what you're doing.
- If a pin shows as **Available** but you know something is connected to it, double-check your LED/button/usermod settings — the pin may not be configured yet.
- The page works in real time: press a button and watch the dot change colour without reloading.
