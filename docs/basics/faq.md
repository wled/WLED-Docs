---
title: FAQ
hide:
  # - navigation
  # - toc
---
!!! tip ""
    This page will continually get updated with questions often asked.

## Contents

### Installation

- [What binary should I use?](#what-binary-should-i-use)
- [I've flashed a bin, but i get no response at all](#ive-flashed-a-bin-but-i-get-no-response-at-all)

### Connection issues

- [Once I attach LEDs, I can't connect to the ESP anymore!](#once-i-attach-leds-i-cant-connect-to-the-esp-anymore)
- [I have entered my WiFi credentials and rebooted, but I can not connect to the module now!](#i-have-entered-my-wifi-credentials-and-rebooted-but-i-can-not-connect-to-the-module-now)
- [The module once was connected, but I can no longer reach it.](#the-module-once-was-connected-but-i-can-no-longer-reach-it)
- [The wled-xxx.local address (mDNS) does not work.](#the-wled-xxxlocal-address-mdns-does-not-work)
- [Is it safe to do a port forwarding to the public internet to control the lights from anywhere?](/advanced/security)
- [My device is unresponsive or animations lag!](#my-device-is-unresponsive-or-animations-lag)
- [I'm having a bootloop! (LEDs turn on every ~5seconds)](#im-having-a-bootloop-leds-turn-on-every-5seconds)
- [I am running realtime (e.g. E1.31) and not all of my LEDs are driven fluently!](#i-am-running-realtime-eg-e131-and-not-all-of-my-leds-are-driven-fluently)
- [Still having connection issues/connection dropping: what more can i check?](#still-having-connection-issuesconnection-dropping-what-more-can-i-check)

### Compilation issues

- [When compiling WLED in VS Code using platformio, I get an error.](#when-compiling-wled-in-vs-code-using-platformio-i-get-an-error)

### LED issues

- [My LEDs don't turn on at all.](#my-leds-dont-turn-on-at-all)
- [My LEDs don't get as bright as they should!](#my-leds-dont-get-as-bright-as-they-should)
- [My LEDs are unable to be set into an consistent solid color.](#my-leds-are-unable-to-be-set-into-an-consistent-solid-color)
- [When I select green, the LEDs turn red!](#when-i-select-green-the-leds-turn-red)
- [My LEDs act funny and flicker randomly.](#my-leds-act-funny-and-flicker-randomly)
- [Not all my LEDs turn on.](#not-all-my-leds-turn-on)
- [How to turn off the bright blue onboard LED?](#how-to-turn-off-the-bright-blue-onboard-led)
- [Why is gpio2/D4 the default LED pin?](#why-is-gpio2d4-the-default-led-pin)
- [Why can I only use 500 LEDs on the ESP8266 GPIO pin 3?](#why-can-i-only-use-500-leds-on-the-esp8266-gpio-pin-3)
- [What LED strip hardware is supported by WLED?](#what-led-strip-hardware-is-supported-by-wled)
- [My LEDs flicker when using the sunrise effect (or others) in a preset](#my-leds-flicker-when-using-the-sunrise-effect-or-others-in-a-preset)

### General questions

- [What does the name WLED mean?](#what-does-the-name-wled-mean)
- [What do the WLED version names mean?](#what-do-the-wled-version-names-mean)
- [What is the difference between the brightness sliders in the web UI?](#what-is-the-difference-between-the-brightness-sliders-in-the-web-ui)
- [My Segments are gone after a reboot!](#my-segments-are-gone-after-a-reboot)
- [May I sell a product running WLED?](#may-i-sell-a-product-running-wled)

### My question or solution is not on this page

- [Check out the WLED forum!](https://wled.discourse.group/)
- [Look through the Issues](#look-through-the-issues)
- [If I report a new Issue, what do i need to share?](#if-i-report-a-new-issue-what-do-i-need-to-share)

## Installation

### What binary should I use?

Please see [this page](/basics/install-binary#what-binary-should-i-use).

### I've flashed a bin, but i get no response at all

Some users report first erasing the flash (yes, even on a new device) sometimes helps .

## Connection issues

### Once I attach LEDs, I can't connect to the ESP anymore!

The gpio2/D4 pin needs to be high (pullup) at powerup time for the controller to boot successfully.
If you accidentally connected the strip the wrong way (if it has arrows printed on, make sure they face away from the pin, otherwise pay attention to the DIN printing). Most strips have the 3-pin male JST connector with 3 holes on the input side. Some users have reported troubles booting even with the direction being correct. In that case, please try adding a 3.3 or 4.7kOhms resistor between the data pin and 3v3 pin!

### I have entered my WiFi credentials and rebooted, but I can not connect to the module now!

If you did not enter a static IP, the module will automatically obtain a dynamic IP from the router.
You can check it in the router configuration or in the settings page, if the Access Point is still enabled.
An easier way is to use the WLED Native app which features automatic discovery!

### The module once was connected, but I can no longer reach it

First, make sure you can reach the connected WiFi yourself (with another device).
See if you can connect to the Access Point, then go to **4.3.2.1/reset**.
Else, power-cycle the module manually.

### The wled-xxx.local address (mDNS) does not work

This only works with Apple devices out of the box. You can install Bonjour to make it work in Windows.
For Android there is no convenient way to achieve it, though you can use apps like "Bonjour search" to find the IP.
It is highly recommended that you install the WLED Native app, which makes automatic discovery easy!

### Is it safe to do a port forwarding to the public internet to control the lights from anywhere?

See [this](/advanced/security) page.

### My device is unresponsive or animations lag!

You are probably using too many sync interfaces. Please only enable one of Hue sync, MQTT, or Blynk at a time.
For optimal performance, use two devices and sync them via the UDP notifier.
Maybe you are also using a very high amount of LEDs. 750 is the recommended maximum. If using E1.31 feature on an ESP32, try "Disabling WiFi Sleep" in the WiFi setup section to reduce lag/stuttering of visual effects.

### I'm having a bootloop! (LEDs turn on every ~5seconds)

Please open an issue or message me on Discord to resolve your issue. Most of the time, wiping the flash (Arduino IDE compile setting: Erase flash -> All flash contents) resolves the issue. Unfortunately it will also reset all your settings and presets. You can also try if using a different ESP resolves the issue. If you compiled with lwip version 2, try version 1.4 Higher Bandwidth instead!

### Still having connection issues/connection dropping: what more can i check?

Try disabling "Emulate Alexa device" in Sync settings before entering your home Wifi credentials.
Check whether mDNS is on or off and toggle it: does it make a difference? Same for 'NTP'. Same for 'Sync Send'. Check your router: is your 2.4Ghz on band 1: if not, try it please. If you have the possibility to try another 8266, please try it.

### I am running realtime (e.g. E1.31) and not all of my LEDs are driven fluently!

Realtime effect streaming uses a rather large bandwidth as data is transmitted uncompressed. For example, to drive 1000 LEDs at 30 fps, you will need a data rate of 720 kBit/s, which is difficult to achieve with most cheap ESP boards over WiFi.
Even if you split the total amount of LEDs across multiple controllers, your WiFi network could become the limiting factor quickly.
The best way to ensure a low-latency, reliable, fluid stream when using large quantities of LEDs is to invest in a wired Ethernet ESP32 board like QuinLED-Dig boards with ethernet or the Olimex ESP32-POE.

There is a 9 DMX universe limit by default in WLED. You can raise it in line 240 of const.h (E131_MAX_UNIVERSE_COUNT 9) and compile your own binary, but the performance of 2000 LEDs over WiFi will likely not be good unless you use an Ethernet enabled board.

If Ethernet is not an option, decrease your LED count as far as possible, lower the frame rate in the sending software and make sure the WiFi signal reception of the board is good. Even without Ethernet, a board with an external antenna is significantly better than a PCB antenna board.

Furthermore I suggest using the DDP protocol if available in your sender software (available in xLights). DDP has a smaller packet header and because of the reduced overhead the fluidity of your animations will be a bit better.

## Compilation issues

### When compiling WLED in VS Code using platformio, I get an error

Try building again. If the error says the `wled00.ino.cpp` or `.sconsign27.db.dblite` file could not be found, this often helps.
You can also try [this](https://github.com/Aircoookie/WLED/issues/361#issuecomment-557818554)!

## LED issues

### My LEDs don't turn on at all.

Please make sure you have connected the strip to GPIO2 and it is sufficiently powered.

### My LEDs don't get as bright as they should!

If the brightness slider in the UI is already at maximum, try checking the auto brightness limiter in the LED settings.
Set the milliamp limit to slightly below the rating of your power supply.
If the LEDs are still too dim or change color towards the end of the strip, there may be a significant voltage drop. Try injecting 5v power at the end or middle of the strip with some appropriate cabling.

### My LEDs are unable to be set into an consistent solid color

If the LEDs should be individually addressable, like the SK6812, but instead they only behave as either RED,GREEN OR BlUE pixels (in a row).
You might not have enabled (settings -> led preferences) "LEDs are 4-channel type (RGBW)"  for an RGBW/RGBWW/RGBNW strip.
This behaviour is accompanied by WLED being unable to address all LEDs, if you specify the exact amount of LEDs in the strip.

### When I select green, the LEDs turn red!

Depending on the type of LEDs used, Red and Green or other colors might be reversed. You can change the order in LED settings.
WS2812B and most related chips use GRB, WS2811 uses RGB in most cases.

### My LEDs act funny and flicker randomly

#### Reason 1

If you use an external 5V power supply for your LEDs, please connect the GND of power supply, LEDs, and ESP.
Otherwise, the LEDs can't read the data signal from the ESP.

#### Reason 2

The ESP8266 is a 3.3V microcontroller while the WS2812B LED uses 5V.
I have personally got away with this in most cases, but you should technically add a level shifter.
A string of WS2811 did not work in one case (pure static white).
A possible workaround is chaining a single WS2812B pixel in front and checking "Skip first LED" in the settings.
My recommended levelshifter is the SN74AHCT125N, also used in the QuinLED Dig-Uno board.
If you don't have a level shifter, you can use this creative [workaround](https://hackaday.com/2017/01/20/cheating-at-5v-ws2812-control-to-use-a-3-3v-data-line/).

#### Reason 3

Your data line can only be [so long](https://youtu.be/ZFO_QOBG9Bs?t=657). Try out with less or thicker wire between your data pin on your controller and the LED strip, or add (see video) some voltage booster (which can make even 40m data wire length work ;-)).

#### Reason 4

If they don't flicker, but display funny colors, try switching between RGB/RGBW modes in LED settings.

### Not all my LEDs turn on

#### Reason 1

By default the LED count is set to 30.
If you have more and can power them, go to LED settings and increase the LED count!
Please also enter the milliamp rating of your 5v power supply for optimal brightness in the field below it.
Do not increase the mA number if you power LEDs directly from the 5V pin of the ESP!

See [here](https://kno.wled.ge/features/multi-strip/) for maximum recommended LED counts.

#### Reason 2

An LED in your chain may be broken. Try another strip or removing the first LED that doesn't light up. Make sure you are in solid effect mode and the LED count is set high enough first!

### How to turn off the bright blue onboard LED?

This LED can be very distracting. Unfortunately it can't easily be disabled as it shares the gpio2/D4 pin with the LED output.  
It is turned off together with your LEDs (unless they require `Off Refresh` to be active)  
Currently there are 3 workarounds:

- Cover the LED
- Remove the LED permanently (desolder or apply pressure with e.g. a flathead screwdriver)
- Use a different `LEDPIN`, although the default is recommended for stable operation

### Why is gpio2/D4 the default LED pin?

Although pins D1 and D2 are usually regarded the best GPIO pins to use in an ESP8266 project, D4 is the default in WLED, despite having two major and one minor drawback. The major drawbacks are the permanently lit blue onboard LEDs and the fact that the pin level needs to be high (pullup) at powerup or the controller will not boot. A minor drawback is that the `Serial1` bus can not be used, but this is irrelevant in most cases, as the USB/serial converter is connected to the other `Serial` interface. The reason for using this pin is that it uses UART hardware driving, which increases stability and decreases CPU overhead especially with larger amounts of pixels.

### Why can I only use 500 LEDs on the ESP8266 GPIO pin 3?

The problem is the DMA hardware driving method used on (just) that pin. It works well, but uses **4x (!)** as much RAM memory as the UART hardware driving on pin 2 and the bitbang driver on all other pins.

### What LED strip hardware is supported by WLED?

The compatible chipsets for the color-coding are

- 1 pin:

  - WS2812B (5V)
  - WS2811 (12V power, with 5V signal)
  - WS2813 (WS2812 with redundant data on 2 wires DI and BI, to resist LEDs failure)
  - WS2815 (like WS2813 but 12V), send 5V signal on BI.
  - BTF2815 (cheaper 12V)
  - SK6813 (redundant like WS2813)
  - SK6812 (can support up to 4 colors, commonly GRBW)
  - SK6805 (3 colors)

- 2 pins (clock CI and data DI) chips:

  - APA102
  - SK9822
  - WS2801 (uses gpio0 and 2)
  - LPD8806

Beside the **digital addressable** LED strips the good old **analog** LED strips are supported, too:

- 4 pins: RGB
- 5 pins: RGBW / RGBWW / RGBCW / RGBNW (RGB + one white channel)
- 6 pins: RGBCT (RGB + 2 white channels) _Note: Support is only for Alexa._

### My LEDs flicker when using the sunrise effect (or others) in a preset
Due the default transition set on your WLED instance, it could be that going to the `sunrise` effect from an off strip can trigger an small "flash" ([discussion](https://github.com/Aircoookie/WLED/issues/3911#issuecomment-2060678535)). 

You can prevent this by changing the transition of that preset to `0`.

## General Questions

### What does the name WLED mean?

WiFi Lighting Effects Driver. Also it has LED in the name and is similar to the official term for WiFi, WLAN!

### What do the WLED version names mean?

WLED version names are Japanese! Here is a nice list of their meanings:

| Version | Name | Kanji | Meaning |
|---|---|---|---|
0.10 | Namigai | 浪貝 | Geoduck (don't google it!)
0.11.0 | Mirai | 未来 | Future
0.11.1 | Fumikiri | 踏切 | Railroad crossing
0.12 | Hikari | 光 | Light
0.13 | Toki | 時 | Time
0.14 | Hoshi | 星 | Star
0.15 | Kōsen | 光線 | Ray of light
N/A | Kuuhaku | 空白 | Blank

### What is the difference between the brightness sliders in the web UI?

There are three brightness slider types in the web UI. The white one in the **top bar** is the **master brightness** - it scales down every single color and all effects, palettes and segments by the same factor.  
  
In contrast, the slider **underneath the color wheel only** applies to the **currently selected color** and will not affect the brightness of other colors or Palettes. It is recommended to use this slider only if you like a darker version of a color alongside other, brighter colors. It should not be used to control the overall brightness, so it is preferable to leave it on maximum and instead use the master brightness control.  

There is a third brightness slider in each Segment panel. This serves the same purpose as master brightness, but limited to that segment. Please note that this does not override the master brightness, but instead is an additional downscaling. (If you set both Master and Segment brightness sliders to 50%, the resulting brightness is 25%)

### My Segments are gone after a reboot!

Segments are non-persistant by default. If you want to load your preset at every startup, just do the following:

- Set your segments up as desired
- Go into the Favorites tab in the web UI, click the save checkbox and save the config to preset slot number `16`
- In LED settings, set `Boot Preset` to `16`

This will be improved in a future release, so that you will be able to save multiple segment configurations!

### What is the difference between the WLED app and the WLED Native app?

The WLED app was the official app developped by the same people that brought you WLED. WLED Native is an initiative by community member [Moustachauve](https://github.com/Moustachauve) to bring an interface that is closer to the native operating system look of your device and some new features.

The official WLED app is now considered legacy. It is not currently maintained and might not receive any future bug fixes.

WLED Native has a few more features available, like a tablet interface for Android and can keep track of changes to the device IP address better.

While WLED Native is not the official app, it is officially endorsed and trusted by the WLED maintainers.

### May I sell a product running WLED?

WLED is licensed under the MIT license, thus you are free to use it in any way you wish as long as you retain the copyright notice and accept that I am not to be held liable for anything regarding your use of the software. For product pages, a link to the WLED GitHub repository would be hugely appreciated !

## My question or solution is not on this page

### Check out the WLED forum!

You can check out and use [the WLED Discourse forum](https://wled.discourse.group).

### Look through the Issues

Maybe someone already reported your issue, so everybody supplying support would be grateful if you take some time to [search through the existing issues](https://github.com/Aircoookie/WLED/issues).

### If I report a new Issue, what do i need to share?

When you create a ticket, please share:

- exact controller, maybe a link to the shop you bought it from
- LED-strip type and amount of LEDs
- Specifications of your power supply (max. current/voltage)
- how you wired up all components (a diagram and/or picture often helps)
- the BIN-file you tried to flash (version and file name) or your IDE version if compiling from source
- Have you followed the quick start and compile settings at <https://docs.wled.me>?
- Has it worked before?
- Does it works without any LEDs connected? (for instance the controller just connected to your PC over USB)
- Are you using/trying to use DHCP or static IP?
- Did you try to use a mobile hotspot instead of your WLAN AP/home wifi?
