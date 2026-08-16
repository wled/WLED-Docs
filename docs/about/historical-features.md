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
Use the led count of your largest device and set the IP to X.X.X.255 (UDP broadcast).
You can adjust the position of the amplitude with the WARLS offset setting.
Web control currently does not work while WARLS is active.

