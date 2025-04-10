---
title: DMX
hide:
  # - navigation
  # - toc
---

### DMX output

!!! info "Version Info"
    As of version 0.9.2 WLED supports DMX output via MAX485. This is great for controlling DMX LED PAR lamps with WLED patterns.

#### features and limitations

* up to 15 DMX channels per fixture
* channels can be set to dimmer (brightness), red, green, blue, white, 0, 255
* supports channel spacing between fixtures
* outputs a DMX channel map
* one universe (512 channels)
* type of fixture

#### software setup

For the DMX feature to work, you need to flash a WLED binary with DMX enabled. Among the latest releases, search for the corresponding .bin for your board with the postfix "_dmx".

Alternatively, you'll need to compile WLED from source. It's not a big deal, you can do it! [Here](/basics/getting-started) is the Quick Start guide. There you'll find the section "i want to modify WLED".

1. make sure, you can compile the latest version of WLED without any issues. Then continue.

2. Once that works, in wled00/wled.h you need to change the line
   `//#define WLED_ENABLE_DMX`
   to
   `#define WLED_ENABLE_DMX`
   Yes, you just remove the //, which enables the line and therefore DMX support.

3. Once you successfully uploaded the sketch to your board, you'll find a new entry "DMX Output" in your settings menu.

4. Grab the manual for your lamp and maybe some snacks, look up the dmx channels and set everything up accordingly.

#### hardware setup

The DMX output required the use of a MAX485 / SN 75176 transceiver connected to GPIO2 of your ESP. As of now, the pin is hardcoded inside of WLED (see below).

I am currently working on an open source PCB design to go along with this feature.

For information about the use of DMX with ESP8266, you might like to read [this](https://robertoostenveld.nl/art-net-to-dmx512-with-esp8266/) tutorial by [Robert Oostenveld](https://robertoostenveld.nl/). Note this is just background information about the hardware and you do not need any of the code listed here when using WLED output.

If you need to use another pin for output than the GPIO2, you'll need to change this in the ESP-Dmx library itself. This setting is located in src/dependencies/dmx/ESPDMX.cpp on line 31.

#### questions

If you have further questions about this feature, you can reach me via github (@jwingefeld), ICQ (30914656) or via WLED Discord (JvPeek).
