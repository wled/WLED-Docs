---
title: Welcome to WLED
hide:
  - navigation
  - toc
---

<p align="center">
  <img src="assets/images/ui/headers/wled_logo_akemi.png">
  <a href="https://github.com/Aircoookie/WLED/releases"><img src="https://img.shields.io/github/release/Aircoookie/WLED.svg?style=flat-square"></a>
  <a href="https://raw.githubusercontent.com/Aircoookie/WLED/master/LICENSE"><img src="https://img.shields.io/github/license/Aircoookie/wled?color=blue&style=flat-square"></a>
  <a href="https://wled.discourse.group"><img src="https://img.shields.io/discourse/topics?colorB=blue&label=forum&server=https%3A%2F%2Fwled.discourse.group%2F&style=flat-square"></a>
  <a href="https://discord.gg/QAh7wJHrRM"><img src="https://img.shields.io/discord/473448917040758787.svg?colorB=blue&label=discord&style=flat-square"></a>
  <a href="https://github.com/Aircoookie/WLED"><img src="https://img.shields.io/badge/source-github-blue.svg?style=flat-square"></a>
  <a href="https://gitpod.io/#https://github.com/Aircoookie/WLED"><img src="https://img.shields.io/badge/Gitpod-ready--to--code-blue?style=flat-square&logo=gitpod"></a>
</p>
  
# Welcome to my project WLED! ✨

A fast and feature-rich implementation of an ESP32/ESP8266 webserver to control NeoPixel (WS2812B, WS2811, SK6812) LEDs or also SPI based chipsets like the WS2801 and APA102!

## ⚙️ Features

- WS2812FX library integrated for over 100 special effects  
- FastLED noise effects and 50 palettes  
- Modern UI with color, effect and segment controls  
- Segments to set different effects and colors to parts of the LEDs  
- Settings page - configuration over network  
- Access Point and station mode - automatic failsafe AP  
- Up to 3 LED outputs per ESP8266 instance and 10 LED outputs per ESP32 instance
- Support for RGBW strips  
- Up to 250 user presets to save and load colors/effects easily, supports cycling through them.  
- Presets can be used to automatically execute API calls  
- Nightlight function (gradually dims down)  
- Full OTA software updatability (HTTP + ArduinoOTA), password protectable  
- Configurable analog clock + support for the Cronixie kit by Diamex  
- Configurable Auto Brightness limit for safer operation  
- Filesystem-based config for easier backup of presets and settings
- Native [Home-Assistant integration](https://www.home-assistant.io/integrations/wled/): [![Start native Homeassistant integration configuration](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start?domain=wled)

## 💡 Supported light control interfaces

- Community driven mobile applications
  - WLED Native app made by community member [Moustachauve](https://github.com/Moustachauve)
    - For [Android](https://play.google.com/store/apps/details?id=ca.cgagnier.wlednativeandroid) [[Source]((https://github.com/Moustachauve/WLED-Native-Android))]
    - For [iOS](https://apps.apple.com/us/app/wled-native/id6446207239) [[Source]((https://github.com/Moustachauve/WLED-Native-iOS/))]
  - Pipplee WLED 2D app designed specifically for 2D LED matrices
    - For [Android](https://play.google.com/store/apps/details?id=com.breakpoint.pipplee)
    - For [iOS](https://apps.apple.com/in/app/pipplee-wled-2d/id6740536171)
    - [Website](https://pipplee.com/)
- [JSON](/interfaces/json-api) and [HTTP request](/interfaces/http-api) APIs  
- [MQTT](/interfaces/mqtt)  
- [Blynk IoT](/interfaces/blynk)  
- [E1.31](/interfaces/e1.31-dmx), [Art-Net](/interfaces/e1.31-dmx), DDP and [TPM2.net](/interfaces/udp-realtime)
- [Hyperion](https://github.com/hyperion-project/hyperion.ng)
- [UDP realtime](/interfaces/udp-realtime)
- [Alexa voice control (including dimming and color)](/advanced/remote-access-ifttt)
- [Sync to Philips Hue lights](/interfaces/philips-hue)
- Adalight (PC ambilight via serial) and TPM2  
- [Sync color of multiple WLED devices (UDP notifier)](/interfaces/udp-notifier)
- [Infrared remotes (24-key RGB, receiver required)](/interfaces/infrared)
- Simple timers/schedules (time from NTP, timezones/DST supported)  

## 📲 Quick start guide and documentation

See the [getting started](/basics/getting-started) page!

[On this page](/basics/tutorials) you can find excellent tutorials made by the community and helpful tools to help you get your new lamp up and running!

## 🖼️ User interface

<img src="/assets/images/ui/headers/macbook-pro-space-gray-on-the-wooden-table.jpg" width="50%"><img src="assets/images/ui/headers/walking-with-iphone-x.jpg" width="50%">

## 💾 Compatible hardware

See [here](/basics/compatible-hardware)!

## ✌️ Other

Licensed under the EUPL-1.2 license 
Credits [here](/about/contributors)!

Join the Discord server to discuss everything about WLED!

<a href="https://discord.gg/QAh7wJHrRM"><img src="https://discordapp.com/api/guilds/473448917040758787/widget.png?style=banner2" width="25%"></a>

Check out the WLED [Discourse forum](https://wled.discourse.group)!  
You can also send me mails to [dev.aircoookie@gmail.com](mailto:dev.aircoookie@gmail.com), but please only do so if you want to talk to me privately.  
If WLED really brightens up your every day, you can [![Paypalbadge](https://img.shields.io/badge/send%20me%20a%20small%20gift-paypal-blue.svg?style=flat-square)](https://paypal.me/aircoookie)

!!! danger "Disclaimer"
    If you are sensitive to photosensitive epilepsy it is not recommended that you use this software.  
    In case you still want to try, don't use strobe, lighting or noise modes or high effect speed settings.  
    As per the MIT license, I assume no liability for any damage to you or any other person or equipment.  
