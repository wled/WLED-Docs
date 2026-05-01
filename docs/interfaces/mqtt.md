---
title: MQTT
hide:
  # - navigation
  # - toc
---

!!! important
    **Notice:** The MQTT implementation is currently being **restructured** to provide a better experience for users of Home Assistant and other automation software. **This will be a breaking change**. For details regarding the rework, please see [#207](https://github.com/Aircoookie/WLED/issues/207)!

WLED versions from 0.8.0 up are able to connect to an MQTT broker for smart home control.
Connection to both domains and IP servers is supported on port 1883.

!!! warning
    Secure connections are not currently supported. I recommend only connecting to local MQTT brokers.
    In v0.8.4-0.8.6 only, WLED supports MQTT autodiscovery by the HomeAssistant software. This has been removed because of bootloop issues and in favor of the native HomeAssistant integration.

WLED will subscribe to up to six topics to change the state of the lights.

- **[mqttDeviceTopic]**  
  -> Send brightness as ASCII number 0-255 or the strings "ON", "OFF", and "T" (for toggle)
- **[mqttDeviceTopic]/col**  
  -> Send color as HEX (#WWRRGGBB or #RRGGBB) or 32bit DEC. Hex has '#','h' or 'H' as prefix.
- **[mqttDeviceTopic]/api**  
  -> Send an API call (using the [HTTP API](/interfaces/http-api) or, since 0.11, [JSON API](https://kno.wled.ge/interfaces/json-api) syntax). You may omit the "win" and just send e.g. "FX=73"

- **[mqttGroupTopic]**
- **[mqttGroupTopic]/col**
- **[mqttGroupTopic]/api**

The topic paths [mqttDeviceTopic] and [mqttGroupTopic] are customizable in Sync settings.
If [mqttGroupTopic] is left empty, it will not subscribe to anything. An empty [mqttDeviceTopic] will instead be replaced with the default "wled/macaddr".
[mqttDeviceTopic] is intended to be unique to one WLED device and just control that device.
[mqttGroupTopic] is intended to control a group of or all WLED devices.

UDP notifications will be sent just as if the change was done via the UI or HTTP API.

Additionally, on light change, WLED will publish to 3 topics for MQTT clients to query the state of the light.

- **[mqttDeviceTopic]/g**  
  -> Contains current brightness as ASCII number 0-255

- **[mqttDeviceTopic]/c**  
  -> Contains current color as HEX (#RRGGBB if white is 0, else #WWRRGGBB)

- **[mqttDeviceTopic]/v**  
  -> Contains XML API response (same as HTTP API)

There is support for client ID and authentication, but this is presently transmitted over an unencrypted connection, so please **do not** use the same password for other services.

If you have set up buttons and/or PIR sensors and checked the "Publish on button press", they will create new subtopics:
- **[mqttDeviceTopic]/button/[ButtonNumber]**
  -> Contains the status of the button at [ButtonNumber] as on or off

- **[mqttDeviceTopic]/motion/[ButtonNumber]**
  -> Contains the status of the motion sensor assigned to [ButtonNumber] as on or off

!!! warning "Attention"
    The maximum length of an MQTT message for WLED is only limited by free RAM.
