---
title: Installation using ESP GUI
hide:
  # - navigation
  # - toc
---

## 1. Downloading the firmware bin file

You can find precompiled .bin files on the [release page](https://bin.wled.me). Be sure to download the latest version. This file looks something like this:

`WLED_[...]_ESP[...].bin`

If you are not sure what binary you should use look at this page:
[What binary should I use?](/basics/install-binary#what-binary-should-i-use)

## 2. Downloading the Flash Download Tools

Espressif has an official GUI tool for Windows.
It has a lot of options and can be used for the ESP8266 and ESP32.
You can find it on Espressif's download page [here](https://www.espressif.com/en/support/download/other-tools)!
(if the link changed, just search for `esp flash download tool` on Google)

![Downloadpage screenshot](https://github.com/WoodyLetsCode/ESP-RGB-Controller/raw/master/images/ESP%20Flash%20Download%20Tools.png)

After downloading the file, unzip it and start `flash_download_tools_v3.6.8.exe`.

## 3. Flashing the firmware bin files

<img src="https://github.com/WoodyLetsCode/ESP-RGB-Controller/raw/master/images/ESP8266%20DownloadTool.png" height="400px" align="right"><img src="https://github.com/WoodyLetsCode/ESP-RGB-Controller/raw/master/images/ESP-RGB-DownloadTool_Dev.png" height="150px" align="right">After starting `flash_download_tools_v[...].exe` there should pop up two small windows. Now just click on the `Developer Mode` and`ESP8266 DownloadTool` button.
Now a new window opens.

- Under the SPIDownload section select the `WLED_[...]_ESP[...].bin` file by clicking on the first `...` button
- In the Textfield next to the "@" char put in this adress: `0x0`
- Than make sure that the file is checked (click on the checkbox)
- **Click on the `Default` button**
- Set SPI Speed to `80Mhz`
- Set Flash Size to `32Mbit`
- Select the COM Port of your ESP (usually it's **not** `COM1`)
- BAUD can be set to `921600`
- Verify that everything looks like the two picture below
![ESPTool settings](../assets/images/content/install-gui-esptool-settings.png)

- _(optionally)_ click on **ERASE** to erase the entire flash chip
- click on `START`

Now the firmware will be flashed to the ESP. When the firmware flashing was successful you see this: ![Succesful finish](https://github.com/WoodyLetsCode/ESP-RGB-Controller/raw/master/images/ESP8266%20DownloadTool_finish.png). Finally restart your board.

**Next steps:** [Quick start guide](/basics/getting-started)
