---
title: Settings
hide:
  # - navigation
  # - toc
---

Web-configurable settings are split in multiple sub-pages. This page is meant to clarify the purpose of each setting.

## WiFi Settings

This sub-page offers options to connect the ESP to different WiFi/WLAN devices.

![WiFi settings page](/assets/images/content/settings_wifi.png){ width="500" }

| Setting name | Value Range | Description |
|---|---|---|
Network Name | String 0..32 | The name (SSID) of your home WiFi. Spaces and some other characters are not supported.
Network password | String 0..64 | The password of your home WiFi
Static IP | 4x 0..256 | An optional static IPv4 address
Static gateway | 4x 0..255 | In a static config, your gateway's IPv4 address
Static subnet | 4x 0..255 | In a static config, this normally is 255.255.255.0
mDNS address | String 0..32 | Name of your device for the Bonjour/Zeroconf protocol
Client IP | - | The current IP of the ESP in the home network
AP SSID | String 0..32 | The name of the ESPs internal WiFi hotspot (Access Point)
Hide AP name | Y/N | The ESPs Access Point won't appear in WiFi lists of other devices
AP password | String 0..64 | The password of the ESPs WiFi Access Point
AP WiFi channel | 1..13 | The 2.4G WiFi band of the AP. For advanced users
AP opens | select | Condition on when to open the AP
AP IP | - | The Access Point IPv4 address of the ESP (is 192.168.4.1 in most cases)
WiFi sleep | Y/N | Disabling WiFi sleep can increase reliability, but increases power consumption

## LED Preferences

This sub-page configures your LED & Hardware setup.

| Setting name | Value Range | Default | Description |
|---|---|---|---|
Enable automatic brightness limiter | on/off | on | Have WLED automatically reduce overall brightness so that maximum current draw from the power supply stays below a specified level
Maximum current | 300–65000 mA | 850 mA | Maximum allowable current draw that WLED will target [*only appears if "Enable automatic brightness limiter" is on*]
LED voltage | multiple options | "5V default (55mA)" | Voltage/type of LEDs [*only appears if "Enable automatic brightness limiter" is on*]
Custom max. current | 1–255 | 50 | Current draw of a single LED pixel set to full white [*only appears if "LED voltage" is set to "Custom"*]

### Hardware Setup

#### LED outputs

![Two WS281x outputs configured on the LED settings page](/assets/images/content/settings_led.png){ width="400" }

WLED supports multiple outputs. To add an output, click the plus(+) button at the bottom of the "LED outputs" section; to remove the last output, click the minus(-) button. Below the plus/minus buttons is an indication of how much of the memory allocated to LEDs is being used by the configuration.

All outputs share the same address space within WLED. By default, the first pixel of an output will be given an address that is one higher than the last pixel of the previous output, but this can be altered.

Each output has the following settings:

| Setting name | Value Range | Default | Description |
|---|---|---|---|
Type (represented by the output's number) | multiple options | WS281x | Select the type of LEDs this output will be controlling
Clock | multiple options | "Normal" | Select the PWM or SPI frequency used when driving supported LEDs <br> Used PWM frequencies for the ESP8266 / ESP32, and SPI respectively; <br> Slowest: 293.33 Hz / 6510.33 Hz / 1 MHz <br> Slow: 440 Hz / 9765.50 Hz / 2 MHz <br> Normal: 880 Hz / 19531 Hz / 5 MHz <br> Fast: 1760 Hz / 39062 Hz / 10 MHz <br> Fastest: 2640 Hz / 58593 Hz / 20 MHz <br> [*only appears if "Type" is set to a type that is controlled by PWM or SPI*]
Color order | multiple options | "GRB" | Select which order your LEDs process color information (e.g. if your LEDs display red and green swapped, try changing it) [*only appears if "Type" is set to a type that supports color order*]
Start/Index | integer | cumulative length of all previous outputs | Define which address this output (or its first pixel) should use within WLED's address space [*only editable if "Custom bus start indices" is on*]
Length | integer | 1 | Define how many pixels are connected to this output [*only appears if "Type" is set to a type that supports multiple pixels*]
(Data/Clk) GPIO(s) | integer | (blank) | Tell WLED which GPIO pin(s) this output is connected to [*number and description of GPIO settings will depend on the output's selected type*]
Reversed (rotated 180°) | on/off | off | Mirrors the LEDs (last LED is first) [*only appears if "Type" is set to a type that supports multiple pixels*]
Skip first LEDs | 0–length | 0 | Will turn off the first one or more LEDs and shift those remaining by that number (e.g. if the first LEDs are only used as a signal repeater) [*only appears if "Type" is set to a type that supports multiple pixels*]
Off Refresh | on/off | off (typically) | WLED doesn't send out data if all of its outputs are off, but some pixels (notably TM1814) will go into a demo mode after a period of inactivity, and setting forces WLED to periodically send out additional "off" commands [*only appears if "Type" is set to a type that supports multiple pixels; default is "on" if "Type" is set to "TM1814"*]
Inverted output | on/off | off | Invert the output's state (i.e. if the output is bright when it's supposed to be dark, set this to "on") [*only appears if "Type" is set to a type that supports output inversion*]
IP address | IPv4 | (blank) | Set the IP address where the output data should be sent to [*only appears if "Type" is set to a type that supports network output*]
Auto-calculate white channel from RGB | multiple options | "None" | Selects whether WLED should attempted to generate white-channel information for colors that are only defined as red, green, and blue values [*only appears if "Type" is set to a type that has a white channel, including white-only types like "PCM White"*]

The following settings apply to all LED outputs:

| Setting name | Value Range | Default | Description |
|---|---|---|---|
Make a segment for each output | on/off | off | Will automatically create a segment for each output, including the correct Start LED and Stop LED settings
Custom bus start indices | on/off | off| When on, custom "Start" or "Index" values can be set for each output (e.g. output 2 can be set so that it shows up as LED address 200 regardless of output 1's length)
Use global LED buffer | on/off | on | Improves the performance of WLED-wide brightness controls (including Automatic Brightness Limiting) at the expense of additional memory usage

Additionally, one or more Color Order Overrides can be defined by clicking the plus button. This is useful when you have LEDs with two different color orders sharing the same output. The following settings are available for each override:

| Setting name | Value Range | Default | Description |
|---|---|---|---|
Start | integer | 0 | Define which address this color override should start it
Length | integer | 1 | Define how many pixels in a row should have their color setting overridden
Color order | multiple options | "GRB" | Same as "Color order" above

### Color & White

| Setting name | Value Range | Default | Description |
|---|---|---|---|
Use Gamma correction for color | on/off | on | Corrects colors so they look closer to what you see on a monitor. Strongly recommended
Use Gamma correction for brightness | on/off | off | Corrects brightness changes so they look more linear. Not recommended
Use Gamma value | 0.1–3 | 2.2 | The gamma curve used by the two corrections above
White Balance correction | on/off | off | Adds a color temperature (CCT) slider and tints RGB colors warmer or colder to match it. Works on plain RGB strips, not only CCT strips
Global override for Auto-calculate white | multiple options | "Disabled" | Overrides the per-output "Auto-calculate white channel from RGB" setting for every output
Calculate CCT from RGB | on/off | off | Derives the color temperature from the RGB color instead of the CCT slider
CCT IC used (Athom 15W) | on/off | off | Enable if your controller uses a CCT IC
CCT blending | -100–100 % | 0 | Positive values blend the warm and cold white channels additively, negative values keep them exclusive. Set to 0 for 2-wire (reverse polarity) CCT strips

### Hardware Setup (buttons, IR, relay)

The lower part of the page configures the other hardware attached to your controller. Each is covered on its own page:

- **Buttons**: add button GPIOs and pick their type (pushbutton, switch, PIR sensor, touch, analog). What a button does is set up under [Macros](/features/macros).
- **IR Remote**: the IR receiver GPIO and remote type, see [Infrared](/interfaces/infrared).
- **Relay**: the relay GPIO and its invert / open drain options, see [Control a Relay](/features/relay-control).

### General settings

| Setting name | Value Range | Default | Description |
|---|---|---|---|
Turn LEDs on after power up/reset | on/off | on | Whether the lights turn on after power-on or restart
Bootup brightness | 1–255 | 128 | The master brightness applied at boot
Apply preset at boot | 0–250 | 0 | Preset to load at boot (0 = none)
Default transition time | 0–65500 ms | 750 | How long the crossfade lasts when colors, effects or brightness change
Use harmonic colors in Random palettes | on/off | on | Picks colors that go together when a random palette is generated
Random Palette Cycle Time | 1–255 s | 5 | How often the random palette changes
Timed light: Default duration | 1–255 min | 60 | How long the nightlight timer runs
Timed light: Default target brightness | 0–255 | 0 | The brightness the lights end at when the timer finishes (0 = off)
Timed light: Mode | multiple options | "Fade" | "Wait and set" jumps to the target brightness at the end, "Fade" and "Fade Color" dim gradually, "Sunrise" brightens instead
Palette wrapping | multiple options | "Linear (wrap if moving)" | How a palette behaves at its end (the seam)
Target refresh rate | 0–250 FPS | 42 | Frame rate WLED aims for. 0 means unlimited, which is experimental, as is anything well above the default

## User Interface settings

This sub-page changes the look of the web interface.

![User Interface settings page](/assets/images/content/settings_ui.png){ width="500" }

| Setting name | Value Range | Description |
|---|---|---|
Server description | String 1..32 | The name of the device as shown on the top of the UI. Differs from Alexa device name
Sync button toggles... | Y/N | If enabled, both send and receive are toggled by the button in UI. If disabled, only sending is toggled and receiving is kept as configured in Sync settings.

## Sync settings

This sub-page configures external software synchronization interfaces.

![Sync settings page](/assets/images/content/settings_sync.png){ width="500" }

| Setting name | Value Range | Description |
|---|---|---|
On/Off button enabled | Y/N | Check if there is a physical pushbutton connected to GPIO0
Infrared receiver type | select | Type of infrared receiver
Broadcast UDP port | 1..65535 | All WLED lights you want to group together must have the same port
Receive Brightness | Y/N | If there is a sync notification, whether its brightness should be applied
Color | Y/N | Whether the color of the synced device should be applied
Effects | Y/N | Whether the effect settings should be applied
Send on direct change | Y/N | Whether to send a sync notification when state changed via web UI or API
Send on button press | Y/N | Whether to send sync when toggled by button or IR
Send Alexa notifications | Y/N | Whether to send sync after changed by Alexa (you may use Alexa groups instead)
Send Hue notifications | Y/N | Whether to send sync after a connected Philips light changed
Send Macro notifications | Y/N | Whether to send sync after a macro was triggered
Send notifications twice | Y/N | Sends notifications twice (if you have issues with UDP packet loss)
Receive UDP realtime | Y/N | Receive live UDP stream data (DRGB, WARLS, ...)
Use E1.31 multicast | Y/N | Listen on multicast IP instead of unicast
E1.31 start universe | 1..63000 | Only applies for multicast. If you want to set different content, set ESPs at least 8 universes apart
Timeout | 100..65000 | Time after which to resume normal mode once stream has stopped. 65000 will keep the data indefinitely
Force max brightness | Y/N | Realtime stream with max. brightness (unless limited by power brightness limiter)
Disable realtime gamma correction | Y/N | Check if your host software does gamma correction already
Realtime LED offset | -255..255 | Shift the realtime input by how many LEDs
Emulate Alexa device | Y/N | Allows you to control the light via the Amazon Echo voice assistant. Requires reboot
Alexa Invocation name | String 1..32 | The name you want the device to have for control via Alexa. Choose something easy she can understand
MQTT Broker | IP or String 0..32 | Connect to this host MQTT broker
Device topic | String 0..32 | MQTT topic unique to this light
Group topic | String 0..32 | MQTT topic for all lights in a group (room, floor, ...)
Hue Bridge IP | 4x 0..255 | Your Hue bridge IPv4 address. Should be static to avoid reassigning
Poll Hue light | 0..99 | The ID of the hue lamp you want to sync WLED to
every x ms | 100..65000 | How often to poll. Smaller numbers decrease lag but might hurt bridge responsiveness
... | Y/N | Turn polling on/off
Receive On/Off | Y/N | Turn on/off like the hue light
Brightness | Y/N | Set brightness to that of the hue light
Color | Y/N | Set color to that of the hue light
Hue status | - | Shows the current connection status to a hue bridge
Baud rate | Various | Set the default Serial connection Baud Rate

## Time settings

Some of these settings no longer appear in 0.14.0 or later, or have different value ranges in newer WLED versions.

This sub-page configures automation tasks.

![Time settings page](/assets/images/content/settings_time.png){ width="500" }

| Setting name | Value Range | Description |
|---|---|---|
Get time from NTP | Y/N | Whether to get the current time from the internet
Use 24h format | Y/N | Use 24h clock format instead of AM/PM
Time zone | - | Your time zone. Open an issue if yours is unsupported. DST is applied automatically
UTC offset | -65000..65000 | Seconds to offset. If you want e.g. 1h offset, use 3600
Current local time | - | The local time the ESP has acquired. If set up correctly, should equal actual time
Clock overlay | - | The special overlay to use. Allows to display a clock on the strip
Countdown mode | Y/N | Allows to have a visual countdown towards a specific date
API macro fields | 16x String 0..64 | Allows you to define custom API calls which can be triggered by events
Boot Macro | 0..16 | Which macro to trigger after WiFi connected (0 is default action)
Alexa On/Off Macros | 2x 0..16 | Which macros to trigger when turning on/off via Alexa
Button Macro | 0..16 | Macro to trigger if button is short pressed. Default action is on/off toggle.
Long Press | 0..16 | Macro to trigger if button is long pressed (>0.7s).  Default action is random color.
Double press | 0..16 | Macro for double click on button.
Countdown-Over Macro | 0..16 | Macro to trigger when the countdown is over
Timed-Light-Over Macro | 0..16 | Macro to trigger when timed light is done

## Security settings

This sub-page manages permissions and updates.

![Security settings page](/assets/images/content/settings_sec.png){ width="500" }

| Setting name | Value Range | Description |
|---|---|---|
Enable OTA lock | Y/N | If enabled, no firmware updates may be done via WiFi and some settings can't be changed.
Passphrase | String 0..32 | To disable OTA lock, you need a password. The default is "wledota". Change it!
Deny access to WiFi settings | Y/N | Disables changes to WiFi settings while locked
Disable recovery AP | Y/N | If enabled, the module will not open an Access Point if connection to home WiFi failed.
Factory reset | Y/N | Deletes all custom settings data (passwords, configuration, macros, presets)
Manual OTA | - | If OTA is enabled, you can upload new binary firmware
Enable ArduinoOTA | Y/N | Useful for developers. Be careful, can even be left on when OTA locked! Only shown on builds compiled with `WLED_ENABLE_AOTA`, so it does not appear on the release binaries.
