---
title: Home Automation Integration
hide:
  # - navigation
  # - toc
---

WLED works with most home automation systems. Home Assistant and openHAB have native integrations, Apple Home works through a bridge, and anything else can use one of WLED's APIs. (1)
{ .annotate }

1. When you have the choice, use the [JSON API](/interfaces/json-api). The [HTTP API](/interfaces/http-api) and [MQTT](#mqtt) work too.

## Home Assistant

Home Assistant has a native [WLED integration](https://www.home-assistant.io/integrations/wled/) for WLED 0.14.0 or newer.

!!! warning "RGBCCT Strips Need Home Assistant 2026.10.0 or Newer"
    On older versions, strips with separate warm and cold white (like WS2805 or analog RGB + CCT) can't use color and color temperature together, and the color picker may snap back to white. Update Home Assistant to fix it.

Home Assistant usually finds your WLED devices on its own. They show up as discovered devices under **Settings** -> **Devices & services**, and you can set them up from there.

If a device isn't discovered (for example, when mDNS doesn't work on your network), add it by hand:

1. Go to **Settings** -> **Devices & services**.
2. Click **Add integration** and pick **WLED**.
3. Enter the device's IP address or hostname.

Or use this button to jump straight to step 3:

[![Add the WLED integration to Home Assistant](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start?domain=wled)

Home Assistant can also control WLED over [MQTT](#mqtt), but the WLED integration does more with less setup. It finds your devices, keeps their state in sync, and covers effects, presets, and segments.

## Apple HomeKit

WLED doesn't support HomeKit on its own, but a bridge on your network can put your WLED lights in the Apple Home app. The light gets power, brightness, and color. If you have an Apple TV or HomePod at home, the Home app can control WLED when you're away too.

- **[HomeKit Bridge](https://www.home-assistant.io/integrations/homekit/)** in Home Assistant: include the WLED lights and scan the pairing QR code with the Home app. The integration's [preset, playlist, and color palette selects](https://www.home-assistant.io/integrations/wled/#selects) show up as a [power strip with a button for each option](https://www.home-assistant.io/integrations/homekit/#supported-integrations). For effects, set the ones you want in a [script](https://www.home-assistant.io/integrations/script/) or [scene](https://www.home-assistant.io/integrations/scene/) and include that. It shows up as a switch.
- **[Homebridge](https://homebridge.io/)** on a Raspberry Pi or home server, with a WLED plugin like [homebridge-simple-wled](https://www.npmjs.com/package/homebridge-simple-wled). It can also expose chosen effects or presets as switches, though not both at once.

## openHAB

In openHAB 3-based environments, you are able to use the native [openHAB WLED Binding](https://www.openhab.org/addons/bindings/wled/), which also supports discovery of your WLED devices.

For older openHAB (2.5.x) environments, the connection can be configured via MQTT broker & Openhab MQTT Binding (2.5x) with configuration files.
Please find the details [here](https://community.openhab.org/t/wled-control-without-the-binding/101120).

## MQTT

Anything that supports MQTT can control WLED, like Node-RED, Domoticz, or Home Assistant's MQTT integration. Point WLED at your broker under **Config** -> **Sync Interfaces**. The topics are described on the [MQTT](/interfaces/mqtt) page.

WLED doesn't send MQTT discovery messages, so you add each light to your system by hand. If your system has a native WLED integration, like Home Assistant or openHAB, that's usually the better choice.

### Home Assistant Example

??? info "Expand to show the Home Assistant configuration"
    ```yaml
    mqtt:
      light:
        - name: "Kitchen Floor Lights"
          command_topic: "wled/all"
          brightness_command_topic: "wled/all"
          rgb_command_topic: "wled/all/col"
          rgb_command_template: "{{ '#%02x%02x%02x' | format(red, green, blue) }}"
          effect_command_topic: "wled/all/api"
          effect_list:
            - "FX=0"
            - "FX=1"
            - "FX=2"
            - "FX=3"
            - "FX=4"
            - "FX=5"
    ```
    Add one `FX=` entry per effect you want to pick. The IDs are listed on the [Effects](/features/effects) page.

    Based on a config by @acid2000

## Other

- [HomeAssistant and NodeRED flows](https://github.com/Snipercaine/WLED-HomeAssistant)

- [Domoticz](https://github.com/frustreermeneer/domoticz-wled-plugin)

- [Indigo Domotics](https://www.indigodomo.com/pluginstore/214/)


