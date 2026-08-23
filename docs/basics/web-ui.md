---
title: The Web UI
hide:
  # - navigation
  # - toc
---

Once your WLED device is on your network, open its IP address (or mDNS name, like `http://wled-1234.local`) in a browser and you'll land in the web UI. This page is a quick tour of everything you see there. Screenshots are from WLED 16.0.1, older versions look a little different but the layout is the same.

## Phone and PC Layout

The UI adapts to your screen width.

=== "Phone"

    ![The WLED web UI on a phone, showing the Colors tab](/assets/images/content/webui_colors.png){ width="320" }

    On a narrow screen you see one tab at a time. Switch between **Colors**, **Effects**, **Segments** and **Presets** with the tab bar at the bottom.

=== "PC"

    ![The WLED web UI in PC mode, showing all tabs side by side](/assets/images/content/webui_pc_mode.png)

    On a wide screen a **PC Mode** button appears in the top bar and the tabs spread out side by side, so you can pick a color, an effect and a preset without switching views.

## The Top Bar

The bar at the top is always visible. From left to right:

| Button | What it does |
|---|---|
| Power | Turns the LEDs on or off |
| Timer | Starts the nightlight timer, which dims or turns off the LEDs after a set time |
| Sync | Toggles sending your changes to other WLED devices. What gets sent, and whether this device also listens, is set under Sync Interfaces ([WLED UDP Sync](/interfaces/udp-notifier)) |
| Peek | Shows a live preview of your LEDs at the top of the page |
| Info | Opens the info panel (see below) |
| Nodes | Lists the other WLED devices found on your network |
| Config | Opens the settings menu |

The slider next to the gear icon is the master brightness.

![Dragging the master brightness slider](/assets/images/content/webui_brightness.gif){ width="292" }

## Colors Tab

![Picking colors and a palette on the Colors tab](/assets/images/content/webui_colors.gif){ width="320" }

This is where you pick what color your LEDs show:

- The **color wheel** sets the hue and saturation, the slider below it sets the brightness of the selected color.
- The **quick color buttons** jump straight to common colors, and **R** picks a random one.
- The round **Fx** button selects which of the effect's color slots you are editing. Many effects use two or three colors (for example a foreground and a background), so you can set each slot separately.
- The **palette list** at the bottom replaces your selected colors with a color palette. Palettes starting with `*` are built from your selected colors, so they change with them. See [Palettes](/features/palettes).
- The **Files**, **PixelForge** and **Palettes** buttons open the file manager, the [image upload tool](/features/pixelforge) and the custom palette editor.

Depending on your LED setup you may see extra sliders here, for example a white channel or white balance slider on RGBW and CCT strips.

## Effects Tab

![Scrolling and picking from the effect list](/assets/images/content/webui_effects.gif){ width="320" }

Pick from the full [effect list](/features/effects), with a search box at the top. The icons behind each effect name tell you what it works with:

- 🎨 can use a color palette
- ⋮ runs on a 1D strip
- ▦ needs a 2D matrix
- ♪ reacts to sound volume
- ♫ reacts to sound frequencies

The sliders below the list control the running effect. Every effect has **speed** and **intensity**, and many add their own custom sliders and checkboxes, so this area changes depending on the selected effect.

## Segments Tab

![A strip split into four named segments, each with its own power and brightness](/assets/images/content/webui_segments.gif){ width="320" }

[Segments](/features/segments) split your LEDs into parts that can each run their own colors and effects. Here you can add segments, name them, set their boundaries, and pick the transition time and blend style used when anything changes. Each segment also has its own power button and brightness slider.

## Presets Tab

[Presets](/features/presets) save your current setup (colors, effects, segments) so you can bring it back with one tap. Create one with **+ Preset**, or chain several into a playlist with **+ Playlist**.

![Saving the current effect as a new preset](/assets/images/content/webui_presets.gif)

## Info Panel

![The info panel](/assets/images/content/webui_info.png){ width="320" }

The **Info** button shows what your device is up to: WLED version, WiFi signal strength, uptime, current time, free memory, LED count and estimated current draw. Builds with usermods (like audio reactive) show their status here too.

## Config

![The settings menu](/assets/images/content/webui_settings_menu.png){ width="320" }

The **Config** button opens the settings menu, where the real setup happens: WiFi, LED hardware, sync interfaces, time and security. Every settings page is covered in detail on the [Settings](/features/settings) page.
