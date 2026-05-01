---
title: Compiling WLED
hide:
  # - navigation
  # - toc
---

You want to add custom features to WLED, use non-default pins, or add in a usermod? You've found the right place!

WLED has come to rely on so many dependencies in the latest versions that building with Visual Studio Code and its PlatformIO (PIO) extension is the recommended way. It will install the ESP Arduino core, all the required libraries and the correct compilation settings for you automatically. The Arduino IDE is no longer recommended.

If you don't want to change the code but only add some compile options and/or usermods, you can use bot on discord or compile with just few clicks using [this inofficial web based wled compiler](https://wled-compile.github.io/). Using it you can download the resulting .bin file directly or install  via USB using built-in web-based installer.

### Preparations

1. Make sure Git client is installed on your system. If it isn't, you can get it [here](https://git-scm.com/downloads).
2. Also make sure that you have [Node.js](https://nodejs.org/en/download) 20 or higher installed.
3. Download the WLED source code by executing `git clone https://github.com/Aircoookie/WLED.git` in some folder.
(You can also use GitHub Desktop or download the latest source code from [https://github.com/Aircoookie/WLED](https://github.com/Aircoookie/WLED) under the `Code` dropdown menu as a .zip file.)
Alternatively fork the WLED project first and download it from your fork.
![](https://i.ibb.co/2hnGhyb/Screen-Shot-2020-11-03-at-5-25-18-PM.png)
4. Go into the WLED folder by executing `cd WLED`.
5. Install all dependencies by executing:
  ```
  npm install
  ```

### Installation guide (PlatformIO, recommended)

1. Download and install the free [Visual Studio Code](https://code.visualstudio.com/) by Microsoft.
2. Open VS Code and go to the Extensions manager (the icon with the stacked blocks in the left bar)
3. Search for `platformio ide` and install the PlatformIO extension
![](https://i.ibb.co/SNv8TtH/Screen-Shot-2020-11-03-at-6-27-58-PM.png)
4. In VS Code go to `File -> Open Folder` and open that root WLED folder (the one that contains `platformio.ini`, _NOT_ the `wled00` folder)
![](https://i.ibb.co/pXs1G0j/Screen-Shot-2020-11-03-at-5-27-03-PM.png)
![](https://i.ibb.co/10ykGxk/Screen-Shot-2020-11-03-at-5-27-17-PM.png)
---

### Compilation guide (PlatformIO)

!!! tip
    Make sure Git Client is installed on your system. You can get it [here](https://git-scm.com/downloads).

1. In VS Code, open the file `platformio.ini`.
2. Add a semicolon in front of the line that start `default_envs = ` to comment it out.
3. Select your build environment by un-commenting one of the lines starting with `; default_envs =`.
Please remove _BOTH_ the `;` and the whitespace behind it to correctly uncomment the line.
For most ESP8266 boards, the `d1_mini` environment is best.
4. In the blue bottom bar, hit the checkmark to compile WLED or the arrow pointing right to compile and upload!

[Picture Guide](https://i.imgur.com/mZYo4KJ.jpg)

**Success!**

If you get one of these two errors, hit the checkmark icon once again to compile and that time the code should build without problems!

- `error: wled00\wled00.ino.cpp: No such file or directory`
- `FileNotFoundError: [WinError 2] The system cannot find the file specified: '[...].sconsign37.dblite'`

### Making a custom environment

Once you've confirmed VSCode with Platformio is set up correctly, you can add/define overrides to allow you to use non-default pins, add a usermod, or add other custom features.

 1. Copy and paste the contents of `platformio_override.ini.sample` into a new file called `platformio_override.ini`. Make sure `platformio_override.ini` is in the same folder as `platformio.ini`.
 2. Replace the line `default_envs = WLED_tasmota_1M` with the line you uncommented in `platformio.ini` in the previous steps (from Compilation guide (PlatformIO)). Example: `default_envs = d1_mini`
 3. In `platformio.ini` scroll down until you see
```
 #--------------------
 # WLED BUILDS
 #--------------------
 ```
 4. Find the section that matches the build environment you selected in previous steps. Example: `[env:d1_mini]`
 5. Select the whole section (including the first line in brackets [ ] ), and copy and paste it into `platformio_override.ini` overwriting the build environment section that was already there.
 6. Add a new line under the the line that starts with `build_flags =`
 7. Put your `-D` overrides on this new line, giving each `-D` it's own new line.
 8. Compile your freshly customized WLED image!

### Flashing the compiled binary

!!! tip
    This step is optional and only recommended if you want to install the same binary to multiple boards. For testing, it is easiest to upload directly from PlatformIO

The .bin file is located in the subfolder `/build_output/firmware` in your WLED folder. The binary will have the same name as your environment.

All that's left to do is [flash this .bin file onto your ESP board](/basics/install-binary/#flashing-method-2-esptool) and then connect it to WiFi.

### Compilation guide (Arduino IDE, not recommended)

!!! warning
    This method is outdated. The source is no longer officially checked to be buildable with the Arduino IDE. Using PlatformIO is strongly advised.

- Follow a guide to setup your Arduino IDE (I am using version 1.8.9) with the ESP8266 libraries.
For current compiles I recommend the latest Arduino core version 2.7.4. If you do not wish to install all libraries manually it is recommended to download the PlatformIO extension for VS Code (see above).

- Run the following command to build the Web UI files:
  ```
  npm run build
  ```

- You will need to install a few libraries:

| Library Name | Platform |
| --- | --- |
[NeoPixelBus](https://github.com/Makuna/NeoPixelBus) (2.6.0) | All
[FastLED](https://github.com/FastLED/FastLED) | All
[ESPAsyncWebServer Aircoookie fork](https://github.com/Aircoookie/ESPAsyncWebServer) (2.0.0) | All
[IRRemoteESP8266](https://github.com/crankyoldgit/IRremoteESP8266) | All
[ESPAsyncTCP](https://github.com/me-no-dev/ESPAsyncTCP) | ESP8266 only
[ESPAsyncUDP](https://github.com/me-no-dev/ESPAsyncUDP) | ESP8266 only
[AsyncTCP for ESP32](https://github.com/me-no-dev/AsyncTCP) | ESP32 only
[LITTLEFS_esp32](https://github.com/lorol/LITTLEFS)* | ESP32 only

\* Please see [the installation guide](https://github.com/lorol/LITTLEFS#installation). You might need to enable a define in the library code.

All other dependencies are included with WLED for convenience.

- Now compile and flash the software! Make sure you erase everything when you flash! (If your board config does not provide this option, you can `Sketch -> Export compiled Binary` and upload with [any ESP flashing tool](/basics/install-binary).)

### Compilation settings (Arduino IDE)

ESP8266:

- Arduino Core v2.7.4
- Board: NodeMCU 1.0 (ESP-12E module) (or select your ESP board)
- CPU frequency: 80 MHz
- Flash size : 4MB (1MB SPIFFS)
- LwIP variant: v1.4 Higher Bandwidth (try 2 if you experience issues)
- Upload speed: Any, 921600 recommended

ESP8266-07 (External Antenna):

- Variants have 512kB or 1MB flash
- Be sure to use DOUT mode when flashing
- Flash Size 1MB (128k SPIFFS)
- 512kB variant no longer compatible

ESP-07s (External Antenna):

- Variant has 4MB flash
- Settings as for NodeMCU or Wemos

ESP32:

- Arduino Core v1.0.6
