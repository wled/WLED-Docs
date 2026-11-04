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

### Advanced

The native integration has known limitations documented in the [official HA WLED integration docs](https://www.home-assistant.io/integrations/wled/). Below are practical workarounds using WLED's REST API.

#### AudioReactive usermod not controllable

Home Assistant does not expose usermods (such as AudioReactive) as entities.

**Workaround:** Use `rest_command` to enable/disable the AudioReactive usermod:

```yaml
rest_command:
  wled_audioreactive_on:
    url: "http://192.168.1.100/json/state"
    method: POST
    content_type: application/json
    payload: '{"AudioReactive":{"enabled":true}}'
  wled_audioreactive_off:
    url: "http://192.168.1.100/json/state"
    method: POST
    content_type: application/json
    payload: '{"AudioReactive":{"enabled":false}}'
```

#### No master control for color/effect across all segments

There is no single entity to control color, effect, and brightness across all segments simultaneously. Light groups send separate requests per segment, causing staggered transitions and latency.

**Workaround:** Use **presets**. Create a preset in WLED with the desired configuration (effect, colors, parameters) applied to all segments. Then activate it from Home Assistant:

```yaml
action: select.select_option
target:
  entity_id: select.wled_preset
data:
  option: "All Segments – Rainbow"
```

A preset encapsulates the complete state (effect, palette, brightness, speed, colors for all segments), ensuring all segments are updated simultaneously in a single transaction.

Alternatively, use a single REST API call to set all segments in one request:

```yaml
rest_command:
  wled_all_segments_effect:
    url: "http://192.168.1.100/json/state"
    method: POST
    content_type: application/json
    payload: >-
      {"seg":[
        {"id":0,"fx":{{ fx }},"pal":{{ pal }},"bri":{{ bri }}},
        {"id":1,"fx":{{ fx }},"pal":{{ pal }},"bri":{{ bri }}}
      ]}
```

Create a script for commonly used effects (adjust segment IDs to match your WLED config):

```yaml
script:
  wled_rainbow_all:
    sequence:
      - action: rest_command.wled_all_segments_effect
        data:
          fx: 9       # Rainbow effect
          pal: 11     # Rainbow palette
          bri: 200
```

#### Secondary and tertiary effect colors cannot be set from HA

Home Assistant's WLED integration exposes only the primary (foreground) color. Secondary (background) and tertiary colors used by many effects are inaccessible.

**Workaround A – Use presets:**

Configure the desired colors (primary, secondary, and tertiary) directly in the WLED web UI, save the configuration as a preset, then activate it from Home Assistant:

```yaml
action: select.select_option
target:
  entity_id: select.wled_preset
data:
  option: "Rainbow with Custom Colors"
```

This is the simplest approach and does not require parameterizing colors.

**Workaround B – Set all colors via REST API:**

If dynamic color control is needed, use the WLED REST API:

```yaml
rest_command:
  wled_set_colors:
    url: "http://192.168.1.100/json/state"
    method: POST
    content_type: application/json
    payload: >-
      {"seg":[{"id":0,"col":[
        [{{ r1 }},{{ g1 }},{{ b1 }}],
        [{{ r2 }},{{ g2 }},{{ b2 }}],
        [{{ r3 }},{{ g3 }},{{ b3 }}]
      ]}]}
```

Field mapping: `col[0]` = primary (Fx), `col[1]` = secondary (Bg), `col[2]` = tertiary (Cs).

Example call:
```yaml
action: rest_command.wled_set_colors
data:
  r1: 255
  g1: 0
  b1: 0
  r2: 0
  g2: 255
  b2: 0
  r3: 0
  g3: 0
  b3: 255
```

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


