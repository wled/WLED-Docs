---
title: UDP Realtime / tpm2.net
hide:
  # - navigation
  # - toc
---

### Hyperion

You can now use WLED with the popular Ambilight software Hyperion.
Just configure Hyperion to use an UDP device with protocol 0 on port 19446!
The maximum number of LEDs supported in this mode is 490. (WLED 0.8.0 and lower: 341)

### Prismatik

[Prismatik](https://github.com/psieg/Lightpack) is another Ambilight option.
Select one of the UDP options in the device configuration wizard.

### TPM2.NET

Supported in latest master and will be available in WLED 0.10.1.
Please set the WLED broadcast UDP port to 65506 in Sync settings to enable receiving TPM2.NET data.

### UDP Sound Sync (v2)

This feature acts as a sound input and accepts pre-processed sound data on UDP port 11988. Generating and sending said data can be done in multiple ways: there is a [Window application](https://github.com/Victoare/SR-WLED-audio-server-win) or a lower-level [C library](https://github.com/netmindz/WLED-sync). You can learn more about this feature in the [documentation of the MM-fork](https://mm.kno.wled.ge/soundreactive/sync/), where it was implemented initially.

### UDP Realtime (v1)

Additionally, WLED offers a way to directly drive the connected LEDs via UDP. The protocol is referred to as WLED [Audio-Reactive-Led-Strip](https://github.com/scottlawsonbc/audio-reactive-led-strip) (WARLS), since the support of that project was its primary goal. However, it can also be used for other realtime applications like an ambilight.

WARLS uses the same UDP port the notifier uses (default 21324, can be changed in settings).
At the moment, the web UI will be disabled while active, the HTTP API, Alexa and button control remains functional.
It uses the current brightness and gamma correction settings.

Byte 0 of the UDP packet tells the server which realtime protocol to use.

Value | Description | Max. LEDs
--- | --- | ---
1 | WARLS | 255
2 | DRGB | 490
3 | DRGBW | 367
4 | DNRGB | 489/packet
0 | WLED Notifier | -

In every protocol, Byte 1 tells the server how many seconds to wait after the last received packet before returning to normal mode, in practice you should use 1-2 (seconds) here in most cases so that the module returns to normal mode quickly after the end of transmission. Use 255 to stay on the UDP data without a timeout until a request is requested via another method.

After this the LED color information is transmitted like this:

WARLS

Byte | Description
--- | ---
2 + n*4 | LED Index
3 + n*4 | Red Value
4 + n*4 | Green Value
5 + n*4 | Blue Value

DRGB:
This mode has the difference that the LED indices are not part of the packet, instead every LED is updated. This leads to a higher speed when all LEDs are changed, but a drastically lower speed if only one LED is updated per packet.

Byte | Description
--- | ---
2 + n*3 | Red Value
3 + n*3 | Green Value
4 + n*3 | Blue Value

DRGBW:
Like DRGB, but supports the White value for RGBW strips.

Byte | Description
--- | ---
2 + n*4 | Red Value
3 + n*4 | Green Value
4 + n*4 | Blue Value
5 + n*4 | White Value

DNRGB:
DRGB, but with 2 additional bytes that signify the starting LED index.
This allows for more than 490 LEDs in realtime mode by sending multiple packets.

Byte | Description
--- | ---
2 | Start index high byte
3 | Start index low byte
4 + n*3 | Red Value
5 + n*3 | Green Value
6 + n*3 | Blue Value

When realtime mode starts, all LEDs will be black. However, you don't have to change all LEDs using one packet.
Changing a single LED therefore only requires a packet of 2+4 bytes. All LEDs maintain their color until it is changed or the module exits WARLS mode because of a timeout.

### Setup with ARLS

The software now supports audio-reactive-led-strip!

1. Download [audio-reactive-led-strip](https://github.com/scottlawsonbc/audio-reactive-led-strip) and follow its installation instruction. You can also use my (untested) [fork](https://github.com/Aircoookie/audio-reactive-led-strip). In that case, you can skip step 2.
2. Insert the following code in led.py after line 66:
    m.append(1);
    m.append(2);
   These are the first two bytes of the protocol.
3. In config.py set your led amount, ESP IP and WLED UDP notifier port. For FPS, a setting between 15-30 is recommended.
4. Run visualization.py! If you have a low amount of LEDS (e.g. 10) try lowering the sigma values in line 129-131.
5. If you have multiple WLED devices, you can sync them all with music.
Use the led count of your largest device and set the IP to X.X.X.255 (UDP broadcast).
You can adjust the position of the amplitude with the WARLS offset setting.
Note that web control currently does not work while it is active.
