---
title: Custom Features
hide:
  # - navigation
  # - toc
---

This page covers how to add custom functionality to WLED, either through usermods or by modifying the source directly.

!!! tip "New to building WLED?"
    See [Compiling WLED](/advanced/compiling-wled) first to get your build environment set up.

## Usermods

Usermods are self-contained modules you can add to a WLED build without touching core source files. WLED ships with many usermods in the `usermods/` directory (audio-reactive, temperature sensors, displays, rotary encoders, and more).

### Enabling usermods

!!! info "Since WLED 16"
    The `custom_usermods` option replaced the old `usermods_list.cpp` approach. Each usermod now self-registers using the `REGISTER_USERMOD()` macro and declares its own dependencies in a `library.json`.

Add a `custom_usermods` entry to the relevant environment section in your `platformio_override.ini`:

```ini
[env:esp32dev_temperature]
extends = env:esp32dev  ; base environment from platformio.ini
custom_usermods =
  Temperature
  audioreactive
```

Each line is either a PlatformIO `lib_def` reference or a folder name under `usermods/`. (As a convenience for old foldernames, `usermod_` or `_v2` may be omitted.) Enabled usermods will appear in the WLED build as the library names from their `library.json` files.  Rebuild from PlatformIO and the usermods and their dependencies are automatically included, no other file edits needed.

#### Inheriting usermods from a base environment

Use PlatformIO variable substitution to extend a base environment's usermod list without repeating it:

```ini
[env:esp32dev_with_extras]
extends = env:esp32dev
custom_usermods =
  ${env:esp32dev.custom_usermods}
  RTC
```

### Writing a usermod

The recommended approach is to keep your usermod in its own repository, separate from the WLED source tree. This lets you version and share it independently, and reference it from any WLED build without copying files.

#### 1. Create a repository from the template

On GitHub, open [wled/wled-usermod-example](https://github.com/wled/wled-usermod-example) and click **Use this template → Create a new repository**. This gives you a clean, independent repository pre-loaded with a minimal `library.json` and a fully annotated example implementation. Rename the files and class to something descriptive, then add your code.

#### 2. Reference it locally during development

Clone your new repository somewhere convenient — alongside your WLED checkout works well, since both projects can then be open in the same VS Code session:

```text
~/projects/
  WLED/                   ← the WLED source
  my-wled-usermod/        ← your repository
    library.json
    my_usermod.cpp
```

In `platformio_override.ini`, point `custom_usermods` at the local clone using a `file://` URL:

```ini
[env:esp32dev_my_usermod]
extends = env:esp32dev
custom_usermods =
  ${env:esp32dev.custom_usermods}
  file:///home/you/projects/my-wled-usermod
```

On Windows, use the `file:///C:/Users/you/...` form with forward slashes: `file:///C:/Users/you/projects/my-wled-usermod`.

PlatformIO will pick up your local changes on each build, and you can edit the usermod and WLED side-by-side without switching projects.

#### 3. Share it via git URL

Once your usermod is ready to share, others can reference it directly by URL — no local clone needed:

```ini
custom_usermods =
  ${env:esp32dev.custom_usermods}
  https://github.com/you/my-wled-usermod.git#main
```

PlatformIO uses the `name` field from the repository's `library.json` to identify the library. If that name does not match the repository name in the URL, supply it explicitly:

```ini
custom_usermods =
  MyMod = https://github.com/you/my-wled-usermod.git#main
```

Once it's ready, consider adding it to the [Community Usermods](/advanced/community-usermods) index and tagging your repository with the [`wled-usermod`](https://github.com/topics/wled-usermod) GitHub topic so others can find it.

#### What's inside a usermod

A usermod repository contains two things: a **PlatformIO library manifest** (`library.json`) and one or more **C++ source files** implementing your functionality.

`library.json` tells PlatformIO how to build and link your module, and lists any external libraries it depends on. The only mandatory non-obvious setting is `"libArchive": false`, which tells PlatformIO to link the module directly into the firmware rather than treating it as an archive — without it, `REGISTER_USERMOD` won't work and the build will fail:

```json
{
  "name": "my-wled-usermod",
  "build": { "libArchive": false },
  "dependencies": {
    "paulstoffregen/OneWire": "~2.3.8"
  }
}
```

Any libraries listed under `dependencies` are fetched automatically — no need to add them to `platformio_override.ini` by hand.

The C++ side extends the `Usermod` base class, overriding whichever lifecycle hooks you need, and calls `REGISTER_USERMOD()` at file scope to self-register:

```cpp
#include "wled.h"

class MyMod : public Usermod {
  void setup() override {
    // called once at boot, before WiFi connects
  }

  void connected() override {
    // called each time WiFi (re)connects
  }

  void loop() override {
    // called every main-loop iteration — never use delay() here!
    if (millis() - lastTime > 2000) {
      lastTime = millis();
      // do something every 2 seconds
    }
  }

  private:
    unsigned long lastTime = 0;
};

static MyMod my_mod;
REGISTER_USERMOD(my_mod);   // self-registers — no usermods_list.cpp edits needed
```

The `getId()` method is optional for most custom usermods — the base class returns `USERMOD_ID_UNSPECIFIED` by default. Override it only if another part of the firmware needs to identify your specific usermod.

The forked example file contains a fully annotated version of this covering persistent settings (`addToConfig` / `readFromConfig`), JSON state, MQTT, and more.


#### Useful lifecycle methods

| Method | When called |
|---|---|
| `setup()` | Once at boot, after config is loaded, before WiFi |
| `connected()` | Each time WiFi (re)connects |
| `loop()` | Every main loop iteration |
| `addToJsonInfo(root)` | When `/json/info` is requested |
| `addToJsonState(root)` | When `/json/state` is requested |
| `readFromJsonState(root)` | When a client POSTs to `/json/state` |
| `addToConfig(root)` | When settings are saved (persist to `cfg.json`) |
| `readFromConfig(root)` | At boot and after settings save |
| `appendConfigData(Print& settingsScript)` | When the Usermod Settings page renders |
| `handleOverlayDraw()` | Just before each LED strip update |
| `handleButton(b)` | On button events (return `true` to consume) |
| `onMqttConnect(sessionPresent)` | When MQTT connection is established (subscribe here) — wrap in `#ifndef WLED_DISABLE_MQTT` |
| `onMqttMessage(topic, payload)` | On incoming MQTT message — wrap in `#ifndef WLED_DISABLE_MQTT` |
| `onEspNowMessage(sender, payload, len)` | Called when an ESP-NOW message is received — can be used for usermod remote control |
| `onUdpPacket(payload, len)` | Called when a UDP packet is received on the notification UDP port — can be used for usermod sync |
| `onUpdateBegin(bool)` | Called prior to firmware update to request releasing memory; and after unsuccessful firmware update to resume |
| `onStateChange(mode)` | Called when WLED state changes (see `CALL_MODE_*` definitions) |

The `onMqttConnect` and `onMqttMessage` overrides must be wrapped in `#ifndef WLED_DISABLE_MQTT` / `#endif` guards, since MQTT support is a compile-time option. The `multi_relay` usermod (`usermods/multi_relay`) is a well-structured in-tree example of the subscribe-in-connect / handle-in-message pattern.

#### Persistent settings

Use `addToConfig()` and `readFromConfig()` to store settings in `cfg.json`. WLED will expose them automatically on the Usermod Settings page:

```cpp
void addToConfig(JsonObject& root) override {
  JsonObject top = root.createNestedObject(FPSTR(_name));
  top["myValue"] = myValue;
}

bool readFromConfig(JsonObject& root) override {
  JsonObject top = root[FPSTR(_name)];
  bool ok = !top.isNull();
  ok &= getJsonValue(top["myValue"], myValue, 42 /*default*/);
  return ok;  // return false to have WLED write defaults to disk
}
```

#### Adding custom effects

Writing effects as usermods is the recommended way to add new LED effects to a WLED build — no core source files need changing, and the effect can live in its own repository and be shared like any other usermod.

The `user_fx` usermod (`usermods/user_fx`) is the mainline example of this pattern and a convenient starting point. It bundles multiple effects in a single usermod and can be enabled with `custom_usermods = user_fx`. It has a [detailed README](https://github.com/wled/WLED/blob/main/usermods/user_fx/README.md) for creating effects.  Fork it or use it as a template for your own effects usermod.

Each effect is a free `void` function paired with a PROGMEM metadata string, registered via `strip.addEffect()` in the usermod's `setup()`. Multiple effects can be registered from a single `setup()`:

```cpp
void mode_myEffect() {
  // ... set pixel colors using SEGMENT, SEGENV, SEGLEN, SEGCOLOR(n), etc. ...
}
static const char _data_FX_MODE_MY_EFFECT[] PROGMEM = "My Effect@Speed,Intensity;!,!;!;01";

void setup() override {
  strip.addEffect(255, &mode_myEffect, _data_FX_MODE_MY_EFFECT);
  // 255 = "assign next available slot"; use a fixed ID for a permanent effect
  // call addEffect() again for each additional effect
}
```

See [effect metadata](/interfaces/json-api/#effect-metadata) for the format of the data string.

---

### Legacy v1 usermod (usermod.cpp)

!!! warning "Legacy"
    The v1 approach (`usermod.cpp`) predates the module system and only allows a single usermod per build. Use the v2 class-based approach above for new projects.

`wled00/usermod.cpp` contains three stub functions you can fill in:

- `userSetup()` — called after loading settings, before WiFi
- `userConnected()` — called once WiFi is connected
- `userLoop()` — called from the main loop

---

## Modifying WLED values directly

If you know what you're doing, you may change global variables declared in `wled.h`. For basic color and brightness:

| Variable | Type | Purpose |
|---|---|---|
| `bri` | `byte` (0–255) | Master brightness (0 = off) |
| `col[0]` | `byte` (0–255) | Red |
| `col[1]` | `byte` (0–255) | Green |
| `col[2]` | `byte` (0–255) | Blue |
| `col[3]` | `byte` (0–255) | White |

After changing a color call `colorUpdated(CALL_MODE_DIRECT_CHANGE)` to push it to the strip and notify sync targets, or `colorUpdated(CALL_MODE_NO_NOTIFY)` to skip the notification.

### Timing

If you'd just like a simple modification that requires timing (like sending a request every 2 seconds), please **never** use the `delay()` function in your `userLoop()`! It will block everything else and WLED will become unresponsive and effects won't work! Instead, try this:
```cpp
long lastTime = 0;
int delayMs = 2000; //we want to do something every 2 seconds

void userLoop()
{
  if (millis()-lastTime > delayMs)
  {
    lastTime = millis();
    //do something you want to do every 2 seconds
  }
}
```

### Internal Segments API

You can use Segments from your code to set different parts of the strip to different colors or effects.   
This can be very useful for highly customized installations, clocks, ...   

To get a reference to a segment, use `strip.getSegment(id)`, where _id_ is the segment ID (0-based). To change a segment's boundaries, assign `seg.start` and `seg.stop` directly and then call `seg.markForReset()`.

To edit the color and effect configuration of a segment, use:
```cpp
Segment& seg = strip.getSegment(id);
//set color (i=0 is primary, i=1 secondary i=2 tertiary)
seg.colors[i] = RGBW32(myRed, myGreen, myBlue, myWhite);
//set effect config
seg.mode = myFxId;
seg.speed = mySpeed;
seg.intensity = myIntensity;
seg.palette = myPaletteId;
```
Keep in mind that this will not cause interface updates. For that, you still need to use `colorUpdated(CALL_MODE_DIRECT_CHANGE)`

## Changing Web UI

In order to conserve space, the Web UI interface is represented as a series of `wled00/html_*.h` files which contain C/C++ strings with specific parts of the Web UI.

These files are automatically created from source files available in `wled00/data` folder. To generate files, install [Node.js](https://nodejs.org/en/download) 20 or higher globally. After that, recreate `html_*.h` files by running in the repo directory:
```
> npm install
> npm run build
```

If you want to test changes to the UI, it is easiest to work with the local `wled00/data/index.htm` file. You just need to enter the IP address of a WLED 0.10.0 or newer instance into the popup. If you accidentally input an incorrect IP or want to test with a different instance, clear the local storage (in Chrome: Developer Tools -> Application -> Local Storage)

If you continuously modify files in the wled00/data directory, you want to monitor these changes to make local html_*.h files being updated automatically. To do this, run this in repo directory:
```
> npm run dev
```
This will start monitoring wled00/data folder for changes. However, you will probably never need this, as `npm run build` is automatically executed before compiling.

The `html_*.h` files will only be created or updated if changes have been made to the `wled00/data` folder.
If you still want to recreate the files, you can use this command:
```
> npm run build -- -f
```

**WARNING!!** Be careful with changing the javascript in HTML files! For example `function GetV() {}` must be the last javascript function in the `<script>` element as it will be replaced by automatically generated code to fetch relevant settings from EEPROM. See `tools/cdata.js` for the replacement rules which run for every *.htm file in `wled00/data`.

Recompile and flash WLED!
