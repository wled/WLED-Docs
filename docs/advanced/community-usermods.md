---
title: Community Usermods
---

This page is an index of usermods that live outside the WLED repository, written and maintained by community members. WLED itself also ships with over 70 built-in usermods (audio-reactive, sensors, displays, and more) in its [`usermods/` directory](https://github.com/wled/WLED/tree/main/usermods), each with its own README; those are not listed here. Entries below are maintained by their authors; the WLED project does not test or endorse them.

To help people find your usermod even before it appears here, tag your GitHub repository with the [`wled-usermod`](https://github.com/topics/wled-usermod) topic.

!!! warning "Community content — use at your own risk"
    The usermods listed below are created and maintained by community members, **not** the WLED development team.
    **The WLED project does not review, test, endorse, or provide support for any of these modules.**

    Usermods are native C++ code compiled directly into your WLED firmware. A usermod runs with
    **full, unrestricted access** to your device's hardware, network, and memory — there is no
    sandbox or permission system to limit what it can do. Before installing a third-party build:

    - **Read the source code** (or have someone you trust read it) before flashing.
    - Be aware that a malicious or poorly written usermod could expose your network, **brick your
      device**, or behave in ways its description does not mention.
    - Only flash firmware from sources you trust. Prefer builds you compile yourself from
      reviewed source code over pre-compiled binaries distributed by strangers.

    The WLED project cannot verify the safety or quality of community usermods.
    **You are solely responsible for any third-party code you choose to run on your devices.**

Questions and bug reports for a listed usermod go to its author. The usual way is an issue on the usermod's repository, linked from its name. The WLED issue tracker and Discord can't help with third-party code.

To compile any of these into your own firmware, follow [Enabling usermods](/advanced/custom-features#enabling-usermods) on the Custom Features page.

## Official Starting Points

Two usermods come from the WLED project itself and are the best places to start writing your own:

- [wled-usermod-example](https://github.com/wled/wled-usermod-example): annotated template, use it as the starting point for your own usermod.
- [user_fx](https://github.com/wled/WLED/tree/main/usermods/user_fx): official effects usermod that ships with WLED, add your own effects to it or use it as a template. Enable it with `custom_usermods = user_fx`.

## Community Index

### [PowerManager](https://github.com/intermittech/wled-usermod-powermanager)

Per-segment power switching: relay/MOSFET outputs follow segment on/off, with anti-flash power sequencing, PSU stabilization and a Master AC relay. Grown from the built-in multi_relay usermod.

_By [@intermittech](https://github.com/intermittech). Platforms: esp32. License: EUPL-1.2._

### [Segment Power Sync](https://github.com/sharn25/wled-segment-power-sync)

Automatically synchronizes individual segment power states with the overall master power state. Ideal when using a relay to cut mains power to LEDs.

_By [@sharn25](https://github.com/sharn25). Platforms: both. License: MIT._

### [SHTC3_v2](https://github.com/lost-hope/SHTC3_v2)

Adds readout for the SHTC3 temperature and humidity sensor. Also publishes the values over MQTT and sends out HA sensor messages.

_By [@lost-hope](https://github.com/lost-hope). Platforms: both. License: EUPL-1.2._

### [Word Clock FX](https://github.com/AustinSaintAubin/wled-usermod-word-clock-fx-16x16)

16×16 English word-clock as a first-class WLED effect, with Open-Meteo weather words/presets and corner-button LEDs.

_By [@AustinSaintAubin](https://github.com/AustinSaintAubin). Platforms: esp32. License: MIT._

## Add Your Usermod

Open a pull request to [WLED-Docs](https://github.com/wled/WLED-Docs) adding a section to the index above, in this format:

```markdown
### [Name](https://github.com/you/your-usermod)

One or two sentences on what it does.

_By [@yourname](https://github.com/yourname). Platforms: esp32. License: GPLv3._
```

Platforms: `esp32`, `esp8266`, or `both`. Keep the index alphabetical.

## Choosing a License

A usermod is compiled into the WLED firmware, so it becomes part of a modified WLED build. WLED uses the **EUPL-1.2** licence. If you share a firmware binary that includes your usermod, also share the source code for that build and use EUPL-1.2 or a compatible open-source licence for the combined firmware.

For example:

- Your usermod repository may say **MIT**, but a `WLED-with-my-usermod.bin` file is not an MIT-only WLED build. It still includes WLED and its EUPL-1.2 requirements.
- MIT matters more when somebody reuses the usermod source code *independently* of WLED, possibly in a closed-source project.
- If you want a simple matching choice for a usermod that can be distributed with WLED, use **EUPL-1.2**.
- [Other compatible choices](https://eupl.eu/1.2/en) include **GPLv2**, **GPLv3**, **LGPL v2.1/v3**, and **MPL 2.0**.

This only matters when someone is distributing the firmware that includes your usermod. Building a usermod for your own device and keeping it private does not require publishing it.

