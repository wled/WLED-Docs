---
title: Install using WLED ESP Flasher
hide:
  # - navigation
  # - toc
---

## 1. Downloading WLED firmware bin file

You can find precompiled .bin files on the [official release page](https://bin.wled.me). Also available [alternative with precompiled usermods](https://github.com/srg74/WLED-wemos-shield/tree/master/resources/Firmware)

If you are not sure what binary you should use look at this page:
[What binary should I use?](/basics/install-binary#what-binary-should-i-use)

## 2. Downloading the WLED ESP Flasher

The flasher is maintained in the [WLED-wemos-shield project](https://github.com/srg74/WLED-wemos-shield). Download it for your operating system:

=== "Windows"

    [Download WLED ESP Flasher for Windows](https://github.com/srg74/WLED-wemos-shield/raw/master/resources/Firmware/WLED_%20ESP_Flasher/Windows.zip)

    Unzip the file and start the flasher.

=== "macOS"

    [Download WLED ESP Flasher for macOS](https://github.com/srg74/WLED-wemos-shield/raw/master/resources/Firmware/WLED_%20ESP_Flasher/macOS.zip)

    Unzip the file and start the flasher.

## 3. Flashing firmware bin files

When flasher start, choose `Serial port` (it must be a port your board is connected to).

![](https://github.com/srg74/WLED-wemos-shield/raw/master/resources/Images/Flasher1.png)

Next , choose `downloaded BIN file`.

![](https://github.com/srg74/WLED-wemos-shield/raw/master/resources/Images/Flasher2.png)

Click on `Flash ESP`.

![](https://github.com/srg74/WLED-wemos-shield/raw/master/resources/Images/Flasher3.png)

Now WLED firmware will be flashed to the ESP. Wait until process is finished and you will see `ADA` message.

![](https://github.com/srg74/WLED-wemos-shield/raw/master/resources/Images/Flasher4.png)

**Next steps:** [Quick start guide](/basics/getting-started)
