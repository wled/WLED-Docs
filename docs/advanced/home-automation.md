---
title: Home Automation Integration
hide:
  # - navigation
  # - toc
---

It is possible to interface WLED with home automation systems and other 3rd-party software.
You can use any API WLED provides (JSON, HTTP, UDP, MQTT); JSON is preferred. This page is intended for sample code and configs others use to control WLED from various 3rd-party software.

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

### Using MQTT

Alternatively, MQTT can be used (not recommended).
MQTT autodiscovery is not supported.
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

## openHAB

In openHAB 3-based environments, you are able to use the native [openHAB WLED Binding](https://www.openhab.org/addons/bindings/wled/), which also supports discovery of your WLED devices.

For older openHAB (2.5.x) environments, the connection can be configured via MQTT broker & Openhab MQTT Binding (2.5x) with configuration files.
Please find the details [here](https://community.openhab.org/t/wled-control-without-the-binding/101120).

## Other

- [HomeAssistant and NodeRED flows](https://github.com/Snipercaine/WLED-HomeAssistant)

- [Domoticz](https://github.com/frustreermeneer/domoticz-wled-plugin)

- [Indigo Domotics](https://www.indigodomo.com/pluginstore/214/)


