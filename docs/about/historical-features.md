---
title: Historical Features
hide:
  # - navigation
  # - toc
---

This page documents features from WLED versions prior to 0.14 that are no longer present in current builds. It is preserved here for historical reference only.

---

## Preset System Prior to 0.11

There are 16 preset slots in total.
In 0.9.0, the last preset (16) is capable of saving the entire segment configuration. All other presets only save a single segment (main segment, the first one by default) and restore that preset to all selected segments.

In the Favorites tab, the number buttons from 1-16 are the different save slots. Find a config you like, then toggle _Saving mode_ on and click on a number to save the preset to that slot. If _Saving mode_ is toggled off, you can restore presets with a single click.

---

## Preset Cycle (up to 0.12.1)

With this feature, you can create an animation by automatically swapping between presets within a specified range.
Keep in mind that any changes you make to effects/colors will be overridden once the system applies the next preset.

If you want to start the preset cycle on boot, go to LED settings and tick "Save current preset cycle configuration as boot default".

To modify the duration of the preset cycle, ensure the preset cycle box is unchecked before entering a new time value. Once updated, the preset cycle can be enabled again.

Playlists superseded Preset Cycle in 0.13.

---

## Legacy API Parameters and JSON Keys

The following HTTP API parameters and JSON API keys are not available in current WLED builds. This list is for integrations that support older WLED versions.

### HTTP API parameters

| Parameter | Previous purpose | Current alternative |
| --- | --- | --- |
| `HP` | Set the Hue polling light ID. | No HTTP or JSON API replacement is available. |
| `MD` | Set the RGB/HSB slider mode. | No API replacement is available. This was a user-interface preference. |
| `AX` | Set the debug or general-I/O value. | No API replacement is available. |
| `L`, `L2`, `UL` | Lock or unlock individual pixels. | No direct replacement is available. Use JSON segment controls or individual LED control when applicable. |
| `NX` | Set the Cronixie clockface. | No API replacement is available. |
| `NB` | Set the Cronixie backlight. | No API replacement is available. |
| `IT` | Include the UI color theme in the HTTP API response. | No API replacement is available. |

### JSON API keys

| Key | Previous purpose | Current alternative |
| --- | --- | --- |
| `pss` | Report preset-slot usage as a bitfield. | No replacement is available. |
| `nl.fade` | Select instant or brightness-fade nightlight behavior. | Use `nl.mode`. Use `0` for instant, `1` for brightness fade, `2` for color fade, or `3` for sunrise. |
| `info.leds.pin` | Report LED output pin number. | No runtime JSON API replacement is available. |
| `info.btype` | Report the build origin. | Use `info.repo` |

---

## ARLS (audio-reactive-led-strip v1) Setup

!!! warning
    This integration is based on the unmaintained [audio-reactive-led-strip](https://github.com/scottlawsonbc/audio-reactive-led-strip) library and the v1 UDP Realtime protocol. Current WLED audio-reactive capabilities use the dedicated [Audio Reactive usermod](https://github.com/wled/WLED/tree/main/usermods/audioreactive) instead.

1. Download [audio-reactive-led-strip](https://github.com/scottlawsonbc/audio-reactive-led-strip) and follow its installation instructions. You can also use [this fork](https://github.com/Aircoookie/audio-reactive-led-strip) (in that case, skip step 2).
2. Insert the following code in `led.py` after line 66:

   ```python
   m.append(1);
   m.append(2);
   ```

   These are the first two bytes of the protocol.
3. In `config.py`, set your LED count, ESP IP address, and WLED UDP notifier port. For FPS, a setting between 15–30 is recommended.
4. Run `visualization.py`! If you have a small number of LEDs (for example, 10), try lowering the sigma values in lines 129–131.
5. If you have multiple WLED devices, you can sync them all with music.
Use the LED count of your largest device and set the IP to the subnet's broadcast address. For a `/24` subnet, use `X.X.X.255`.
You can adjust the position of the amplitude with the WARLS offset setting.
Web control currently does not work while WARLS is active.

---

## Legacy Binary Filename Scheme (up to 0.11.1)

| Binary Name | For devices |
| --- | --- |
| WLED_0.x.x_ESP8266_1M_ota.bin | ESP-01 (black PCB), most Sonoff devices, ESP8265, all ESP8266 with 1MB flash. This binary has some interfaces disabled (Alexa, Blynk, Hue sync, Infrared) in order for wireless updates to continue working. |
| WLED_0.x.x_ESP8266_1M_full.bin | ESP-01 (black PCB), most Sonoff devices, ESP8265, all ESP8266 with 1MB flash. This binary has the full feature set, but wireless updates will not work. |
| WLED_0.x.x_ESP8266_512k.bin | ESP-01 (blue PCB), older Sonoff devices, all ESP8266 with 512kB flash. Interfaces (Alexa, Blynk, Hue sync, Infrared) disabled, no OTA. Support will not be possible in future versions. |
| WLED_0.x.x_ESP8266_ledpinY.bin | Custom build for 4MB flash ESP8266 and WS2812B. LED pin is changed (default is GPIO2). (This is GPIOY and not DY for the D to GPIO mapping, check your boards spec!) |
| WLED_0.x.x_ESP8266_apa102.bin | Custom build for 4MB flash ESP8266 and APA102 LEDs (clock pin GPIO0, data GPIO2).
| WLED_0.x.x_ESP8266_ws2801.bin | Custom build for 4MB flash ESP8266 and WS2801 LEDs (clock pin GPIO0, data GPIO2).
| WLED_0.x.x_ESP32_ledpinY.bin | Custom build for ESP32 and WS2812b. LED pin is changed (default is GPIO2). LED pin 16 is useful for the QuinLed-Dig-Uno board with ESP32. |
