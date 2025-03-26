---
title: Compiling WLED
hide:
  # - navigation
  # - toc
---

You want to add custom features to WLED, use non-default pins, or add in a usermod? You've found the right place!

WLED has come to rely on so many dependencies in the latest versions that building with Visual Studio Code and its PlatformIO (PIO) extension is the recommended way. It will install the ESP Arduino core, all the required libraries and the correct compilation settings for you automatically. The Arduino IDE is no longer recommended.

If you don't want to change the code but only add some compile options and/or usermods, you can use bot on discord or compile with just few clicks using [this inofficial web based wled compiler](https://wled-compile.github.io/). Using it you can download the resulting .bin file directly or install  via USB using built-in web-based installer.

### Compiling using Visual Studio Code

#### Preparations

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

#### Installing Visual Studio Code and PlatformIO extension

1. Download and install the free [Visual Studio Code](https://code.visualstudio.com/) by Microsoft.
2. Open VS Code and go to the Extensions manager (the icon with the stacked blocks in the left bar)
3. Search for `platformio ide` and install the PlatformIO extension
![](https://i.ibb.co/SNv8TtH/Screen-Shot-2020-11-03-at-6-27-58-PM.png)
4. In VS Code go to `File -> Open Folder` and open that root WLED folder (the one that contains `platformio.ini`, _NOT_ the `wled00` folder)
![](https://i.ibb.co/pXs1G0j/Screen-Shot-2020-11-03-at-5-27-03-PM.png)
![](https://i.ibb.co/10ykGxk/Screen-Shot-2020-11-03-at-5-27-17-PM.png)
---

#### Compiling

1. In VS Code, open the file `platformio.ini`.
2. Add a semicolon in front of the line that says `default_envs = travis_esp8266, travis_esp32` to comment it out.
3. Select your build environment by un-commenting one of the lines starting with `; default_envs =`.
Please remove _BOTH_ the `;` and the whitespace behind it to correctly uncomment the line.
For most ESP8266 boards, the `d1_mini` environment is best.
4. In the blue bottom bar, hit the checkmark to compile WLED or the arrow pointing right to compile and upload!

[Picture Guide](https://i.imgur.com/mZYo4KJ.jpg)

**Success!**

If you get one of these two errors, hit the checkmark icon once again to compile and that time the code should build without problems!

- `error: wled00\wled00.ino.cpp: No such file or directory`
- `FileNotFoundError: [WinError 2] The system cannot find the file specified: '[...].sconsign37.dblite'`

#### Making a custom environment

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

#### Flashing the compiled binary

!!! tip
    This step is optional and only recommended if you want to install the same binary to multiple boards. For testing, it is easiest to upload directly from PlatformIO

The .bin file is located in the subfolder `/build_output/firmware` in your WLED folder. The binary will have the same name as your environment.

All that's left to do is [flash this .bin file onto your ESP board](/basics/install-binary/#flashing-method-2-esptool) and then connect it to WiFi.


### Compiling using the Linux command line

To compile using the Linux command line, it is recommended to use a recent version of Linux, as older versions may have outdated versions of required packages. As of this writing, Ubuntu 24.04 LTS still has an old version of Node.js, but Ubuntu 24.10 has the right version. The following was tested with Ubuntu 24.10.

!!! tip
     If you don't have Ubuntu 24.10, use `multipass` or similar software to start a 24.10 container

#### Installing required software

Install `git` if it isn't already: `sudo apt install git`

Install the Node.js package manager: `sudo apt install npm`

Run `node --version` and make sure you have at least version 20. If your Linux distribution uses an older version, install Node.js directly from [Node.js](https://nodejs.org/en/download)

Install PlatformIO:

!!! warning
    Do NOT install PlatformIO with `apt`

```
curl -fsSL -o get-platformio.py https://raw.githubusercontent.com/platformio/platformio-core-installer/master/get-platformio.py
python3 get-platformio.py # if this fails because of missing packages, install the packages it complains about, then retry
PATH=$PATH:$HOME/.platformio/penv/bin/
```

Clone the WLED Git repository (or a different fork)
```
git clone https://github.com/wled/WLED.git
cd WLED
```
Optional: check out the branch or tag you want to build, e.g. `git checkout v0.15.0`

Run `npm ci` to do a clean install of all the required dependencies

#### Compiling

To build all environments, simply run `pio run`. More likely though you'll want to only build an image for the specific device you're using, which you can do with something like `pio run -e esp8266_2m_160`.
To see a list of available environments, run
```
pio project config --json-output | jq -cr '.[0][1][0][1]'
```

#### Flashing the compiled binary

The .bin and .bin.gz files are located in the subfolder `/build_output/release` in your WLED folder.

If you have an existing WLED install, you can flash the .bin.gz image using the Config -> Security & Updates -> Manual OTA Update option in the web interface. Otherwise, follow the instructions [here](/basics/install-binary/#flashing-method-2-esptool).

