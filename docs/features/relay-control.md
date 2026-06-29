---
title: Control a Relay
hide:
  # - navigation
  # - toc
---

Digital LED strips still use power when seemingly switched off, about 1W per 200 LEDs. In case you want to prevent that, you can completely cut power to the LEDs by adding a relay to your circuit. It is toggled by WLED when WLED is turned on/off (in the UI, or through other interfaces).
No pin is allocated for a relay by default, but can be easily set in the LED preferences page.
Previously, GPIO12 (Pin D6 on many devices) was set as the default and is confirmed to work well on most boards except the ESP32-C3.

When you decide that you want WLED to control a relay, make sure you buy a suitable relay board. Check what voltage you can supply from your controller to relay (available 3.3V or 5V pin or different voltage from external power source), and make sure the relay can be controlled by voltage level your board is providing  (3.3V CMOS, 5V TTL). Note, some relays come with a jumper that lets you configure whether the relay switches at high or low level of signal, giving you maximum flexibility.

The default WLED behavior is to turn the relay pin on (high) when the LEDs are on and off (low) when the LEDs are off. This can be changed in the LED Preferences page. Many relays are powered when the signal is LOW. See [this thread](https://github.com/wled/WLED/issues/631#issuecomment-605512524).

Sometimes people ask whether they can control more than one relay through WLED, including controlling this all via Alexa. Controlling an extra relay separately from the RGB lights is not something WLED is designed to do, however you can modify the code to add that functionality. For that, make sure you can compile WLED from source unmodified first. Then, change #define ESPALEXA_MAXDEVICES 1 in line 71 of the wled.h file to 2. After that, just follow the API documentation on https://github.com/Aircoookie/Espalexa to add a new EspalexaDevice to the alexa.cpp file

Second option for controlling multiple relays is using a Multi Relay usermod. As with Alexa you will need to compile WLED from source an include Multi Relay usermod either by including `-D USERMOD_MULTI_RELAY` in PlatformIO.ini or adding `#define USERMOD_MULTI_RELAY` in `wled.h` or `my_config.h`. You can also override default number of relays by defining `MULTI_RELAY_MAX_RELAYS`. Configuring usermod is done using Usermod settings page where you can define GPIO pins used, wether relay activates on HIGH or LOW logic, if the activation has any delay and if the relay can be controlled from the outside using MQTT message (external).
MQTT topic for controlling relays is `wled/[device]/relay/[relay_id]/command` and accepts `on`, `off` and `toggle` messages. When the relay changes state a message with `on` or `off` is sent with the topic `wled/[device]/relay/[relay_id]`.

How To: Use WLED to switch external relay with PIR sensor without affecting WLED state

If you do not want PIR (motion) sensor attached to WLED controller to trigger change of WLED state, but still want to control a legacy light, fan, etc. use the Multi Relay usermod and another relay attached to WLED controller. Create two presets for relay control (shown for switching relay off) and set up PIR and multi relay usermods as shown.

![image](https://user-images.githubusercontent.com/59397047/164982222-a55b2702-b21f-4245-96fb-a90d165de85c.png)

If you do not want button relay control just leave relay button at -1, the same goes for PIR sensor parameters (leave nighttime-only and/or off-only unchecked). Adjust preset numbers and GPIO pins to your liking. Multi relay usermod can also switch relay using MQTT messages or HTTP requests (check source code for available commands). Of course if you configured MQTT on your WLED device PIR sensor usermod will publish /motion topic to MQTT broker for your HA integration.

![image](https://user-images.githubusercontent.com/59397047/164982233-5057bcef-48fe-4e52-a2c3-f8c7856a2f8a.png)

![image](https://user-images.githubusercontent.com/59397047/164982248-769f6307-62cc-4c01-bed6-05602a6da1e8.png)
