---
title: Community Usermods
---

This page is an index of usermods written by the WLED community. Entries are maintained by their authors; the WLED project does not test or endorse them.

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

## Index

| Name | Description | Author | Platforms | License | Notes |
|---|---|---|---|---|---|
| [wled-usermod-example](https://github.com/wled/wled-usermod-example) | Annotated template — use as template to start your own usermod | @wled | both | EUPL | Official starting point |
| [user_fx](https://github.com/wled/WLED/tree/main/usermods/user_fx) | Community effects usermod — add your own effects here or use as a template | @wled | both | EUPL | Ships with WLED; enable with `custom_usermods = user_fx` |
| [Word Clock FX](https://github.com/AustinSaintAubin/wled-usermod-word-clock-fx-16x16) | 16×16 English word-clock as a first-class WLED effect, with Open-Meteo weather words/presets and corner-button LEDs | @AustinSaintAubin | esp32 | MIT |  |
| [Sensors I2C](https://github.com/AustinSaintAubin/wled-usermod-sensors-i2c) | Combined I²C environmental sensors (HTU21D temp/humidity, BMP180 pressure, BH1750 lux); can drive WLED auto-brightness, optional MQTT/HA | @AustinSaintAubin | esp32 | MIT |  |


## Adding your usermod to the list

Open a pull request to [WLED-Docs](https://github.com/wled/WLED-Docs) adding a row to the table above. 

Use this format:

```markdown
| [Name](https://github.com/you/your-usermod) | Short description | @yourname | esp32 | MIT |  |
```

Platforms: `esp32`, `esp8266`, or `both`.