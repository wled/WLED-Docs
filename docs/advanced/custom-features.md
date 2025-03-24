---
title: Custom Features
hide:
  # - navigation
  # - toc
---

!!! warning
    _Note: this page is now out of date, see updated functionality in the code ([WLED/usermods/EXAMPLE](https://github.com/wled/WLED/tree/main/usermods/EXAMPLE))_

This page is intended for those wishing to modify the WLED code to add their own functionality.

### Basics
Programming is done in the Arduino IDE. There is a special file, `usermod.cpp`, to write your own code.
(however, if you think your code may be relevant to many users, feel free to code it in directly and open a pull request)

This file has three empty methods:
- `userSetup()` is called after loading settings but before connecting to WiFi. 
Use it to start own interfaces if it does not depend on WiFi (IR, Sensors, GPIOs,...).
Also you can use it to load custom settings or to specify own server pages with the `server.on()` method.
- `userConnected()` is called once WiFi is connected. Use it to connect to external servers or init interfaces using wiFi.
- `userLoop()` is called by the main `loop()` function.

### Modify WLED values
If you know what you're doing, you may choose to change the value of any global variable declared in `wled.h`.
However, for basic color and brightness changes, these are the most important:

Variable Name | Type | Purpose
--- | --- | ---
bri | byte (0-255) | Master Brightness (0 is off, 255 is maximum)
col[0] | byte (0-255) | Red color value
col[1] | byte (0-255) | Green color value
col[2] | byte (0-255) | Blue color value
col[3] | byte (0-255) | White color value

After updating the color, you must call the `colorUpdated(int)` method. If you want to send a notification with the new color to other ESPs, use `colorUpdated(NOTIFIER_CALL_MODE_DIRECT_CHANGE)`, otherwise `colorUpdated(NOTIFIER_CALL_MODE_NO_NOTIFY)`.

### Timing

If you'd just like a simple modification that requires timing (like sending a request every 2 seconds), please **never** use the `delay()` function in your `userLoop()`! It will block everything else and WLED will become unresponsive and effects won't work! Instead, try this instead:
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

To set a segment, use `strip.setSegment(id, start, stop);`, where _id_ is the segment ID, _start_ is the first LED of the segment and _stop_ is the LED after the last one in the segment.

To edit the configuration of a segment, use:
```cpp
WS2812FX::Segment& seg = strip.getSegment(id);
//set color (i=0 is primary, i=1 secondary i=2 tertiary)
seg.colors[i] = ((myWhite << 24) | ((myRed&0xFF) << 16) | ((myGreen&0xFF) << 8) | ((myBlue&0xFF)));
//set effect config
seg.mode = myFxI;
seg.speed = mySpeed;
seg.intensity = myIntensity;
seg.palette = myPaletteId;
```
Keep in mind that this will not cause interface updates as of 0.8.6. For that, you still need to use `colorUpdated(NOTIFIER_CALL_MODE_DIRECT_CHANGE)`

### Create custom effects

It is possible to create your own effects and add them to the FX library.
The relevant files for that are `FX.cpp` and `FX.h`.

Here is a step-by-step guide on how to make your effect:

1. Take a look at some of the effects in `FX.cpp` to see how they are implemented!

2. Add your own routine in FX.cpp starting with: `uint16_t WS2812FX::mode_custom`

3. Add to total number of effects in FX.h line 110: `#define MODE_COUNT` 

4. Add your mode number (ie` #define FX_MODE_CUSTOM                   110`) in FX.h around line 200.

5. Add your mode around line 400 of FX.h, like so:
`      _mode[FX_MODE_CUSTOM]                    = &WS2812FX::mode_custom;`

6. Add it to the functions in FX.h around line 600:`       mode_custom(void),`

7. Give it a name at the bottom (10 modes per line) in `JSON_mode_names[]`. Wrap your name in quotes just like the others.

8. Compile, upload and enjoy!  Your new effect will automatically be added to the list in the web ui.

If you programmed a nice effect you want to share, submit a pull request!
### Create a custom effect as usermod

!!! info "Since 0.14"
    This feature was introduced with version 0.14.

It is possible to add new effects in form of a usermod.

Use `255` for the effect ID as it is a placeholder for "1st available slot". If you want a permanent ID use whatever is not used by built-in effects or other usermod's effects. It is possible to call [addEffect(255,...)](https://github.com/Aircoookie/WLED/blob/1dab26bcbcac051f2b7be47a2d5c757a9938bf1f/wled00/FX.cpp#L7655) multiple times to add more effects without a collision of IDs.

```cpp
uint16_t mode_blink(void) {
  ...
  return FRAMETIME;
}

static const char _data_FX_MODE_BLINK[] PROGMEM = "Blink@!,Duty cycle;!,!;!;01";

class BlinkUsermod : public Usermod
{
  public:
    void setup()
    {
      strip.addEffect(255, &mode_blink, _data_FX_MODE_BLINK);
    }

    void loop()
    {
    }

    uint16_t getId()
    {
      return USERMOD_ID_...;
    }
};
```

For details about the format of the configuration string see [effect metadata](/interfaces/json-api/#effect-metadata).

### Changing Web UI

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
