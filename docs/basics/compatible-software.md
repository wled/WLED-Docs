---
title: Compatible Software
hide:
  # - navigation
  # - toc
---

!!! note ""
    Still under construction, feel free to add to the list!

This page lists some third-party software that can interface with WLED!

## Controllers

Controllers use the WLED API to change the current light settings.

| Name | Description |
|---|---|
[Home Assistant](https://www.home-assistant.io/integrations/wled/) | Versatile and feature rich home automation system. Out-of-the-box WLED integration with automatic discovery.
[Homey pro with the D.A.L.O.R App](https://homey.app/en-us/app/com.sdn.neopixel-on-rest/D.A.L.O.R/) | Home automation system, WLED integration via the D.A.L.O.R. app  with automatic discovery.
[ioBroker adapter](https://github.com/iobroker-community-adapters/ioBroker.wled) | Versatile and feature rich home automation system. Out-of-the-box WLED integration with automatic discovery.
| [Lumia Stream](https://lumiastream.com/) | Allows for control of your lights from streaming software |
| [node-red-contrib-wled](https://flows.nodered.org/node/node-red-contrib-wled) | [Node-RED](https://nodered.org) nodes for WLED |
| [OctoPrint-WLED](https://plugins.octoprint.org/plugins/wled) | Connect your [OctoPrint](https://octoprint.org) install to your WLED install using this plugin to show things like printer status, progress and more! |
[openHAB](https://community.openhab.org/t/wled-a-binding-for-controlling-led-strips-and-strings-from-an-opensource-esp8266-project/87286) | Another more professional feature rich home automation system. WLED integration made easy. [Link 2](https://community.openhab.org/t/solved-wled-please-make-this-work-in-openhab/82783) |
[WLED-GUI](https://github.com/w00000dy/WLED-GUI) | This is a cross-platform desktop app for WLED. You can use it on Windows, Linux and Mac.
[WLED Native for Android](https://github.com/Moustachauve/WLED-Native-Android)<br /> [WLED Native for iOS](https://github.com/Moustachauve/WLED-Native-iOS/) | An alternative version of the WLED app with a similar user interface to the official one that looks close to the native OS style guidelines and has a few more features added on top of it.
[wledQuickControl](https://github.com/satrik/wledQuickControl) | macOS 11.0+ Menu Bar app for controlling power and brightness.
[WinLED](https://github.com/clusterzx/WinLED) | Windows App for controlling WLED Instance (Brighness, Power, Presets, Effects...). Also usable from Traybar for quick actions.

## Sources

Source programs generate light data and stream them to WLED in real time.

| Name | Description |
|---|---|
[LedFx](https://github.com/LedFx/LedFx) | A music visualization tool written in Python. Connects to WLED via E1.31 or UDP. [Dr.Zzs tutorial video](https://www.youtube.com/watch?v=ipSfQdfX4fE)
[Prismatik WLED-WiFi](https://github.com/psieg/Lightpack) (native) | Ambilight via WiFi or serial - natively supports UDP (WARLS, DRGB, DNRGB protocols).
[Prismatik WLED-WiFi](https://github.com/Lord-FEAR/Prismatik-WLED-WiFi) (plugin) | Ambilight via WiFi - a Plugin alternative for Prismatik WLED support.
[xLights](http://xlights.org/) | xLights is a Light Sequencer and Show scheduler which works with WLED. Dr.Zzs has made some videos to set it up. [Intro Video](https://www.youtube.com/watch?v=p7wV6A26Gak)
[Hyperion.ng](https://hyperion-project.org/) | Hyperion is an open-source Bias or Ambient Lighting implementation which you might know from TV manufacturers. It supports many LED devices and video grabbers. Support for WLED through UDPraw at port 19446 or E1.31. [Tutorial video](https://www.youtube.com/watch?v=SudT6AjwwOM), [Dr.Zzs video](https://youtu.be/urOEHzbV48A?t=649)
[Hyperion (Classic)](https://hyperion-project.org/) | Hyperion is an open-source Bias or Ambient Lighting implementation which you might know from TV manufacturers. It supports many LED devices and video grabbers. Support for WLED through UDPraw at port 19446 or E1.31.
Enigmalight | Ambilight clone for broadcom based linux receivers.  It supports many LED devices. Support for WLED through USB Adalight/Momo. Download to various forums use the WEB search function of your browser.
[Q Light Controller+](https://www.qlcplus.org/) | QLC+ is a free and cross-platform software to control DMX or analog lighting systems like moving heads, dimmers, scanners etc. QLC+ runs on Linux, Windows (XP+), macOS (10.7+) and the Raspberry Pi. WLED can be used with E1.31 (sACN). use major version 4, as 5 is in development.

## Various

| Name | Description |
|---|---|
[Logitech WLED Sync](https://github.com/hkayy/Logitech-WLED-Sync) | Windows tray application to sync Logitech gaming peripherals to WLED.
