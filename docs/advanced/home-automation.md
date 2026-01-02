---
title: Home Automation Integration
hide:
  # - navigation
  # - toc
---

It is possible to interface WLED with home automation systems and other 3rd party software.
You can use any API WLED provides (JSON, HTTP, UDP, MQTT), JSON is preferred. This page is intended for sample code and configs others use to control WLED from various 3rd party software:

[HomeAssistant and NodeRED flows](https://github.com/Snipercaine/WLED-HomeAssistant)

## Domoticz:
Please see [here](https://github.com/frustreermeneer/domoticz-wled-plugin)!

## Home Assistant

### Using the native integration

!!! warning "Compatibility notice"
    WLED devices are not supported by Home Assistant 2022.2 or later if a CCT bus is configured or `White Balance Correction` is enabled.  
    
    We hope to resolve this issue as soon as possible. As a temporary workaround you can enable the option `Calculate CCT from RGB` in LED settings.

WLED can be configured using the integrations in the Home Assistant frontend.

Menu: **Configuration** -> **Integrations**.

In most cases, the WLED devices will be automatically discovered by Home Assistant. Those automatically discovered WLED devices are listed on the integrations page.

If for some reason (e.g., due to lack of mDNS support on your network), the WLED device isn't discovered, it can be added manually.

Click on the `+` sign to add an integration and click on **WLED**. After completing the configuration flow, the WLED
integration will be available.

[WLED integration documentation](https://www.home-assistant.io/integrations/wled/)

!!! warning "Presets not loaded"
    Currently there is a known bug ([#3628](https://github.com/wled/WLED/issues/3628)) - affecting the Home Assistant WLED integration regardless of device type or WLED version - where presets created in the WLED web UI do not reliably appear inside HA (the preset list may remain empty). As a result, users cannot select or trigger those presets through HA. This behavior appears to originate from the HA integration rather than WLED core. The most reliable workaround is to reload the WLED integration in Home Assistant, after which the preset list usually populates correctly.

### Using MQTT

Alternatively, MQTT can be used (not recommended).
Auto discovery is no longer supported since version 0.9 of WLED.
In case you want to configure the device manually:

??? info "Expand to show MQTT configuration"
    ```
    light:
      - platform: mqtt
        name: "Kitchen Floor Lights"
        command_topic: "wled/all"
        brightness_command_topic: "wled/all"
        rgb_command_topic: "wled/all/col"
        rgb_command_template: "{{ '#%02x%02x%02x' | format(red, green, blue)}}"
        effect_command_topic : "wled/all/api"
        effect_list:
        - "FX=0"
        - "FX=1"
        - "FX=2"
        - "FX=3"
        - "FX=4"
        - "FX=5"
        - "FX=6"
        - "FX=7"
        - "FX=8"
        - "FX=9"
        - "FX=10"
        - "FX=11"
        - "FX=12"
        - "FX=13"
        - "FX=14"
        - "FX=15"
        - "FX=16"
        - "FX=17"
        - "FX=18"
        - "FX=19"
        - "FX=20"
        - "FX=21"
        - "FX=22"
        - "FX=23"
        - "FX=24"
        - "FX=25"
        - "FX=26"
        - "FX=27"
        - "FX=28"
        - "FX=29"
        - "FX=30"
        - "FX=31"
        - "FX=32"
        - "FX=33"
        - "FX=34"
        - "FX=35"
        - "FX=36"
        - "FX=37"
        - "FX=38"
        - "FX=39"
        - "FX=40"
    ```
    by @acid2000

    Config json which is sent via autodiscovery:
    ```json
    {
      "name": "WLED Light",
      "stat_t": "wled/840d8e989815/c",
      "cmd_t": "wled/840d8e989815",
      "rgb_stat_t": "wled/840d8e989815/c",
      "rgb_cmd_t": "wled/840d8e989815/col",
      "bri_cmd_t": "wled/840d8e989815",
      "bri_stat_t": "wled/840d8e989815/g",
      "fx_cmd_t": "wled/840d8e989815/api",
      "fx_stat_t": "wled/840d8e989815/api",
      "bri_val_tpl": "{{value}}",
      "rgb_cmd_tpl": "{{'#%02x%02x%02x' | format(red, green, blue)}}",
      "rgb_val_tpl": "{{value[1:3]|int(base=16)}},{{value[3:5]|int(base=16)}},{{value[5:7]|int(base=16)}}",
      "qos": 0,
      "opt": true,
      "pl_on": "ON",
      "pl_off": "OFF",
      "fx_val_tpl": "{{value}}",
      "fx_list": [
        "[FX=00] Solid", "[FX=01] Blink", "[FX=02] Breathe", "[FX=03] Wipe", "[FX=04] Wipe Random", 
        "[FX=05] Random Colors", "[FX=06] Sweep", "[FX=07] Dynamic", "[FX=08] Colorloop", 
        "[FX=09] Rainbow", "[FX=10] Scan", "[FX=11] Dual Scan", "[FX=12] Fade", "[FX=13] Chase", 
        "[FX=14] Chase Rainbow", "[FX=15] Running", "[FX=16] Saw", "[FX=17] Twinkle", "[FX=18] Dissolve",
        "[FX=19] Dissolve Rnd", "[FX=20] Sparkle", "[FX=21] Dark Sparkle", "[FX=22] Sparkle+", 
        "[FX=23] Strobe", "[FX=24] Strobe Rainbow", "[FX=25] Mega Strobe", "[FX=26] Blink Rainbow", 
        "[FX=27] Android", "[FX=28] Chase", "[FX=29] Chase Random", "[FX=30] Chase Rainbow", 
        "[FX=31] Chase Flash", "[FX=32] Chase Flash Rnd", "[FX=33] Rainbow Runner", "[FX=34] Colorful", 
        "[FX=35] Traffic Light", "[FX=36] Sweep Random", "[FX=37] Running 2", "[FX=38] Red & Blue", 
        "[FX=39] Stream", "[FX=40] Scanner", "[FX=41] Lighthouse", "[FX=42] Fireworks", "[FX=43] Rain", 
        "[FX=44] Merry Christmas", "[FX=45] Fire Flicker", "[FX=46] Gradient", "[FX=47] Loading", 
        "[FX=48] In Out", "[FX=49] In In", "[FX=50] Out Out", "[FX=51] Out In", "[FX=52] Circus", 
        "[FX=53] Halloween", "[FX=54] Tri Chase", "[FX=55] Tri Wipe", "[FX=56] Tri Fade", 
        "[FX=57] Lightning", "[FX=58] ICU", "[FX=59] Multi Comet", "[FX=60] Dual Scanner", 
        "[FX=61] Stream 2", "[FX=62] Oscillate", "[FX=63] Pride 2015", "[FX=64] Juggle", 
        "[FX=65] Palette", "[FX=66] Fire 2012", "[FX=67] Colorwaves", "[FX=68] BPM", 
        "[FX=69] Fill Noise", "[FX=70] Noise 1", "[FX=71] Noise 2", "[FX=72] Noise 3", "[FX=73] Noise 4",
        "[FX=74] Colortwinkle", "[FX=75] Lake", "[FX=76] Meteor", "[FX=77] Smooth Meteor", 
        "[FX=78] Railway", "[FX=79] Ripple"
      ]
    }
    ```
## Indigo Domotics:
Please see [here](https://www.indigodomo.com/pluginstore/214/)!

## openHAB: 

In openHAB 3 based environments you are able to use the native [openHAB WLED Binding](https://www.openhab.org/addons/bindings/wled/), which also supports discovery of your WLED devices.

For older openHAB (2.5.x) environmantes the connection can be configured via MQTT broker & Openhab MQTT Binding (2.5x) with configuration files 
Please find the details [here](https://community.openhab.org/t/wled-control-without-the-binding/101120)


