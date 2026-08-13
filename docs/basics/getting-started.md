---
title: Getting Started
hide:
  # - navigation
  # - toc
---

## Welcome to the WLED Wiki!

Say hi to Akemi, the WLED mascot. She marks extra information throughout these docs. Click her any time you want to know more. (1)
{ .annotate }

1.  For a new project, an ESP32 is the better pick. It's much more capable hardware, and ESP8266 support is coming to an end.

### Quick Start Guide

**1.** Connect your LED strip to your ESP board. At its simplest, it's three connections: power, data, and ground. The diagrams below show the extras worth adding.

=== "Digital LED Strips"

    Also called addressable strips, for example WS2812B-compatible RGB(W) strips. Each LED can be controlled separately.

    For ESP32 use `GPIO16` (or `IO16` or `G16`); GPIOs `4`, `13` and `16-33` can be used, other pins are not recommended.

    For ESP8266 use `GPIO2`, on most development boards this pin is labeled `D4`. (1)
    { .annotate }

    1.  `GPIO1` and `GPIO2` are the recommended LED data pins on ESP8266, and `GPIO3` works for up to 100 LEDs. Other pins need _bit-banging_, which can slow performance and cause problems elsewhere such as with IR decoding. For clock-and-data LEDs, hardware SPI uses `GPIO14` (SCLK) for clock and `GPIO13` (MOSI) for data, and software SPI works on any pins. All pins can be changed in the Hardware section of LED settings.

    _If the connecting wire cannot be kept short, use a [level shifter](/basics/wiring-guides#levelshifter)._

    ![DigitalWiring](../assets/images/content/WLED_5VdigitalWiring.png)

=== "Analog LED Strips"

    Also called non-addressable strips. Every LED shows the same color, and each color channel needs its own GPIO and MOSFET. The IRLZ44N and STP55NF06L are good choices.

    ![AnalogWiring](../assets/images/content/12Vanalog_wiring.png)

!!! warning
    Board pin naming varies depending on the manufacturer. Please use the board pinout from the _specific_ board you purchased and use the GPIO pins to reference this guide. _Make sure to connect ESP and LED-strip grounds together!_

- 12V strips, multiple strips, several supplies, level shifters: [Wiring Guides](/basics/wiring-guides)
- Wire and fuse sizing: [LED power, wiring and fuse calculator](https://wled-calculator.github.io/)
- Optional pushbutton on `GPIO0` (`D3` on NodeMCU/Wemos, `IO17` on ESP32): [configurable actions](/features/macros)

**2.** Flash the software to your ESP module. The easiest way is the WLED web installer, which flashes your board straight from the browser.

[Install WLED](/basics/install-binary#flashing-method-1-wled-web-installer){ .md-button .md-button--primary }

Other flashing methods are on the [Install WLED Binary](/basics/install-binary) page. Advanced users who want to change WLED before flashing it can [compile it from source](/advanced/compiling-wled) instead.

!!! success "How to tell it worked"
    The first 30 LEDs will light up in bright orange to stimulate courage, friendliness and success!

**3.** Use a WiFi device to connect to the access point `WLED-AP` using the default password `wled1234`.
You can also just scan this QR code:

![QR-Code](../assets/images/content/getting-started-wled-ap-qr.png)

!!! tip "WLED-AP is not showing up!"
    If you do not see the `WLED-AP` SSID, the default SSID may have been changed at [compile time](/advanced/custom-ap).

Go to the IP `4.3.2.1` in your browser to control your lights! You should also be able to connect to `wled.me` if in access point mode (embedded DNS server).

### WiFi Setup

To connect your WLED module to your home WiFi:

**1.** Click on the _Config_ (gear) icon to edit your WLED module settings and choose "WiFi Setup".

**2.** For most home networks, simply enter your WiFi network's name and network password. You can also change the mDNS address for your WLED module here.

**3.** Click Save & Connect at the bottom of the page.

**4.** Reconnect your device to your home's WiFi network.

**5.**  Check the device list in your router's user interface for the IP of the WLED device within your local network. For easy automatic discovery, use the WLED Native app! Have fun with the WLED software!

### Software Update Procedure

=== "Reflash"

    Download the latest [release binary](https://github.com/wled/WLED/releases) and flash it exactly like the first install. The [Install WLED Binary](/basics/install-binary) page covers every flashing method.

=== "OTA Update"

    The software has an integrated _OTA software update_ capability.

    1. Type the correct OTA passphrase (default: "wledota") in the settings menu and remove the tick in the checkbox "OTA locked".
    2. Save settings and reboot the ESP.
    3. Select "Manual OTA update" in Security settings and upload a [release binary](https://github.com/wled/WLED/releases).
    4. When you are done, it is recommended to lock the OTA function again. Tick the checkbox and reboot. You can change the passphrase by typing in a new one first.

    If you try to access the update page while OTA is locked, you should see the message "OTA lock active".

!!! info "If you own multiple devices and want to update them"
    Since v0.13, the WLED source code includes shell/command prompt scripts that let you update multiple devices with a single command. Please check the `tools` subfolder for the `multi-update` scripts (.cmd or .sh). You will need to modify them to include the IP addresses of your WLED devices and assign a firmware binary file for each device. If you are using Windows, make sure the `curl` utility is somewhere in your `PATH` (curl ships with Windows 10 build 17063 and later, and with Windows 11). This will only work if "OTA Lock" is disabled.
