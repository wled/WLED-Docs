---
title: Install WLED Binary
hide:
  # - navigation
  # - toc
---

### Flashing method 1: WLED web installer

!!! tip
    This is by far the easiest and fastest way to get WLED up and running!

Make sure you are running a recent desktop Chrome or Edge browser and head over to the [WLED installer site](https://install.wled.me)!
If you are updating an existing version of WLED, make sure to uncheck "Clean install" so that your settings are kept.
This installer is not yet available for ESPs with flash chips smaller than 4MB (e.g. ESP01)

!!! tip
    In case you want to flash WLED with audioreactive usermod: 
    Several users reported that this alternative, unofficial installer site may work better: [https://wled-install.github.io/](https://wled-install.github.io/).
    After using the standard WLED installer, microphone hardware sometimes cannot be initialized properly by WLED.

!!! tip
    If your serial port is listed on linux ('ttyUSB0 CP2102' or similar) but you are unable to open it, make sure you give yourself permission to use that device.
    Find the owner with:
    `ls -la /dev/ttyUSB0` (replace ttyUSB0 with your device). If it says `root`, Chrome will not be able to open it.
    Make yourself the owner by running `whoami` to get your username, and then to change the owner:
    `sudo chown {your username} /dev/ttyUSB0`(replace ttyUSB0 with your device).

### Flashing method 2: esptool

- First of all, please follow the steps to install esptool.py [here](https://github.com/espressif/esptool).
- Download the latest [release binary](https://github.com/Aircoookie/WLED/releases) file!
- Make sure only one ESP device/microcontroller is connected to your computer! Otherwise you could accidentally overwrite the wrong one. If you know the serial port, you can also add the `-port COM3` attribute after `write_flash`
- Execute this command:

#### ESP8266

```bash
esptool.py write_flash 0x0 ./WLED_XXX.bin
```

#### ESP32

Firstly, flash the version 4 bootloader file, which you can find [here](https://github.com/Aircoookie/WLED/releases/download/v0.13.1/esp32_bootloader_v4.bin).  
This step only has to be done once, to update afterwards the bootloader does not have to be re-installed.

```bash
esptool.py write_flash 0x0 ./esp32_bootloader_v4.bin
```

Now you can flash the actual firmware binary. Keep in mind the bootloader needs to have a flash offset of 0, but the firmware 0x10000.

```bash
esptool.py write_flash 0x10000 ./WLED_XXX.bin 
```

When esptool.py says `Connecting...`, some ESP32 boards require you to hold the boot button (to the right of the USB port) for a few seconds  

- If you experience issues, run this command before trying `write_flash` again (Note: this will erase all settings stored on the ESP!)

```bash
esptool.py erase_flash
```

If you have a MagicHome controller, here is a [good video tutorial](https://www.youtube.com/watch?v=qgBAU39v07k) on how to flash it.

### ESP8266 Flashing method 3: [ESP Home Flasher](https://github.com/esphome/esphome-flasher/releases) tool

!!! warning
    Don't use ESP Home Flasher for ESP32 boards.   
    On ESP32, ESP Home Flasher will make the filesystem very small (61kB), which leads to issues making presets. 
    Please consider using [WLED ESP Flasher](/basics/install-wled-flasher), or the web installer or esptool.

This is a GUI-based tool recommended by some users as easier to use than esptool.
For some boards, you might have to press some buttons after uploading:
> Hold both buttons down, plug it in, start flashing, then when it tries to detect, let go of the button to the left of the USB as you look at it, then when it detects the board type, let go of the other button.

If running Windows, you need a driver from here: <https://www.wemos.cc/en/latest/ch340_driver.html> before your computer will show the COM port in ESPhome Flasher. With a Wemos D1 mini you do not need to hold down the reset button while flashing.


!!! tip
    For ESP32 boards, you can use this [WLED ESP Flasher](/basics/install-wled-flasher) instead of ESP Home Flasher.


### Flashing method 4: OTA update

You can alternatively use my [basic HTTP OTA updater](https://github.com/Aircoookie/ESP8266MinimalHTTPUpdater) sketch and upload the binary! This requires the Arduino IDE and ESP8266 core installed.
If your device is already running a firmware with built-in OTA capability, you can probably use that as well.

### What binary should I use?

I always recommend to use the latest release. Starting from WLED 0.12.0, pins can be configured in LED settings and specific binaries for different LED pins or types are no longer needed. Please use the following binary for these boards respectively:

| Binary Name | For devices |
| --- | --- |
| WLED_0.x.x_ESP8266.bin | NodeMCU, Wemos D1 mini, ESP-12, all ESP8266 with 4MB flash. Recommended.
| WLED_0.x.x_ESP32.bin | All ESP32 devices (try [this](https://github.com/Aircoookie/WLED/issues/517#issuecomment-571333712) if the WLED-AP doesn't appear after flashing) |
| WLED_0.x.x_ESP32_Ethernet.bin | ESP32 devices with an Ethernet interface. Also works with WiFi only. |
| WLED_0.x.x_ESP01.bin | ESP-01 (black PCB), most Sonoff devices, ESP8265, all ESP8266 with 1MB flash. This binary has the full feature set, but wireless updates will not work. |
| WLED_0.x.x_ESP02.bin | All ESP8266 with 2MB flash, Athom bulbs.  This binary has the full feature set, but wireless updates will not work (for more detail see [this](https://github.com/Aircoookie/WLED/issues/3257). For wireless updates use WLED_0.x.x_ESP02.bin.gz firmware instead. |
| WLED_0.x.x_ESP02.bin.gz | All ESP8266 with 2MB flash, Athom bulbs, wireless update are possible with this firmware. |
| esp32_bootloader.bin | Not a WLED release. To be flashed to a brand new ESP32 before flashing the WLED binary itself. |

Legacy binary format (up to 0.11.1)

| Binary Name | For devices |
| --- | --- |
| WLED_0.x.x_ESP8266_1M_ota.bin | ESP-01 (black PCB), most Sonoff devices, ESP8265, all ESP8266 with 1MB flash. This binary has some interfaces disabled (Alexa, Blynk, Hue sync, Infrared) in order for wireless updates to continue working. |
| WLED_0.x.x_ESP8266_1M_full.bin | ESP-01 (black PCB), most Sonoff devices, ESP8265, all ESP8266 with 1MB flash. This binary has the full feature set, but wireless updates will not work. |
| WLED_0.x.x_ESP8266_512k.bin | ESP-01 (blue PCB), older Sonoff devices, all ESP8266 with 512kB flash. Interfaces (Alexa, Blynk, Hue sync, Infrared) disabled, no OTA. Support will not be possible in future versions. |
| WLED_0.x.x_ESP8266_ledpinY.bin | Custom build for 4MB flash ESP8266 and WS2812B. LED pin is changed (default is GPIO2). (This is GPIOY and not DY for the D to GPIO mapping, check your boards spec!) |
| WLED_0.x.x_ESP8266_apa102.bin | Custom build for 4MB flash ESP8266 and APA102 LEDs (clock pin GPIO0, data GPIO2).
| WLED_0.x.x_ESP8266_ws2801.bin | Custom build for 4MB flash ESP8266 and WS2801 LEDs (clock pin GPIO0, data GPIO2).
| WLED_0.x.x_ESP32_ledpinY.bin | Custom build for ESP32 and WS2812b. LED pin is changed (default is GPIO2). LED pin 16 is useful for the QuinLed-Dig-Uno board with ESP32. |
