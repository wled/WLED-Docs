---
title: Infrared
hide:
  # - navigation
  # - toc
---


!!! info "Version Info"
    Since v0.13.0, infrared control for any IR remote compatible with your IR receiver with JSON remote.

A dedicated infrared receiver module is required.
(KY-022 or TSOP38238 are confirmed to work and inexpensive)

The default sensor pin is GPIO4. It can be changed in the WLED settings.

### JSON IR Remote
The JSON IR remote allows users to customize IR remote behavior without writing custom C 
code or compiling. Using the JSON IR remote, you can map buttons from any compatible 
remote to any HTTP request API or JSON API command. 

The map of IR codes to API commands is stored on your ESP's file system in `ir.json`. 
From the "LED Preferences" page, set the IR pin and remote type to "JSON remote". Once "JSON remote" is selected, 
a file upload control will appear. You can also upload and edit ir.json from the /edit page, which can be reached by going to
http://[controller-ip]/edit. If you use the edit page to upload your config file, be sure to name it `ir.json`.

### Preconfigured Remotes
LED remotes typically are not sold separately. But you can purchase with an RGB controller for $2-4 on AliExpress and $5-10 on Amazon. 
When purchasing a remote, be sure that it is an infrared (IR) remote and not a radio (RF) remote as they are not supported at this time.

[![44 key remote](44-key.png)](https://www.aliexpress.com/item/32714274390.html)
44-key white 
[ir.json](44-key_ir.json)

[![40 key blue remote](40-key-blue.png)](https://www.aliexpress.com/item/1005001873663294.html)
40-key blue
[ir.json](40-key-blue_ir.json)

![40 key black remote](40-key-black.png)
40-key black 
[ir.json](40-key-black_ir.json)

[![38 key remote](38-key.png)](https://www.aliexpress.com/item/1005002944086008.html)
38-key [ir.json](38-key_ir.json) (Sold with WLED compatible SP511E controllers)

![32 key remote](32-key.png) 
32-key [ir.json](32-key_ir.json) (commonly sold with fairy string lights)

[![24 key white remote](24-key.png)](https://www.aliexpress.com/item/4001348058175.html)  
24-key (very common, but buttons need repurposed to be very useful with WLED)  
*    [ir.json v1](24-key_ir.json) gray buttons load presets 1-4  
*    [ir.json v2](24-key-v2_ir.json) gray buttons cycle effects, palettes and change speed  

![24 key remote with green key bottom left](24-key_bottom_left_green.png)
24-key remote with bottom left key being green [ir.json](24-key_bottom_left_green_ir.json)

[![24 key grey remote](24-key-grey.png)](https://www.aliexpress.com/item/4000704528801.html)
24-key grey
[ir.json](24-key-grey_ir.json)

![24-key-osram remote](24-key-osram.png)
24-key OSRAM
[ir.json osram](24-key-osram_ir.json) [OSRAM](https://www.lumimania.fr/led-stmivatelna-zarovka-rgbw-star-gu10-4-5w-230v-2700k-osram/) 

![24 key music remote](24-key-v3.png)
24-key music
[ir.json v3](24-key-v3_ir.json)

[![21 key remote](21-key.png)](https://www.aliexpress.com/item/1005001319234216.html)
21-key
[ir.json](21-key_ir.json)

![image](https://user-images.githubusercontent.com/59397047/180650647-982701e9-55a6-43d5-8573-47e249a03ae0.png)
18-Key Silver
[ir.json](18-key-ir.json)

[![6 key remote](6-key.png)](https://www.aliexpress.com/item/33014078844.html)
6-key
[ir.json](6-key_ir.json)

![Apple Remote V2](apple-v2.png)
Apple Remote V2
[ir.json](apple-v2_ir.json)

### Editing ir.json
First see if a JSON file already exists for your remote. If not, see if there is a JSON file for a remote with 
the same number of buttons. Often remotes with the same number of buttons have different labels but emit the 
same codes. The JSON keys are the hex encoded IR codes emitted by each button.  The keys are strings and case is important, 
be sure to use the same format as the sample below. It is also the same format used when codes are echoed on the serial console. 

In the JSON document, each button object should have a `cmd` attribute containing the HTTP request or JSON API command. 
In addition to HTTP and JSON API commands, several C functions are supported (!incBrightness, !decBrightness, !presetFallback).
The !incBrightness and !decBrightness functions, take smaller steps at the dim end of the range with progressively larger steps at the bright end.
The !presetFallback function applies a preset (attribute PL) and falls back to the specified effect and palette (attributes FX and FP) if preset does not exist. (see sample below)

If an IR remote button is pressed rapidly or held down, subsequent presses have a different code (0xFFFFFFFF). 
If your command is repeatable but does not contain the "~" character and is not calling incBrightness or decBrightness, then add a "rpt" attribute with a value of true. 
Label and position attributes are ignored by WLED but useful when making edits. 

If an ir.json file does not already exist for your remote, you will need to determine what code each button emits. To do this, connect your ESP8266 or ESP32 to a computer and 
open Arduino or VSCode serial monitor. Then press each button and record the code printed on the serial monitor. You should see something like this:

```bash
IR recv
0xFFDE10
```

You should get a 24-bit hex encoded integer. If you get 0xFFFFFFFF, that means the button has been pressed repeatedly or held down. Try tapping quickly.

### Tips
* Map `play` or `auto` buttons to a playlist. They currently just turn on preset cycling `CY=1` or load a playlist of presets 1-5. You can define the playlist in ir.json as in the sample below, or save a playlist as a preset and load that.
* Save your 'every day' presets in one range of ids, maybe 1-30; your 'holiday' presets in another range, maybe 31-40. Then you can devote two buttons to cycle through presets. In our example, the command on the 'holiday cycle' button would be `P1=31&P2=40&PL=~`
* You can also group your presets by color; for instance reddish animations in 1-10, greenish in 11-20, bluish in 21-30. The 44-key remote has up and down arrows for red, green and blue. So the command on the 'blue down' button would be `P1=21&P2=30&PL=~-` 
* Most of the 24-key and fewer remotes are designed with analog LEDs in mind and do not have very useful labels for WLED. With JSON IR and a fine-tip Sharpie, you can repurpose buttons to make them more useful.

### ir.json sample

```json
{
  "0xF740BF": {
    "label": "On/Off",
    "cmd": "T=2",
    "rpt": true
  },
  "0xF700FF": {
    "label": "Speed +",
    "cmd": "SX=~16"
  },
  "0xF720DF": {
    "label": "Red",
    "cmnt": "Lava palette + primary, secondary and tertiary colors",
    "cmd": "FP=8&CL=hFF7F00&C2=hFF0000&C3=hCC3D60"
  }, 
  "0xF710EF": {
    "label": "Timer1",
    "cmnt": "Timer 60 min",
    "cmd": "NL=60&NT=0"
  },
  "0xF730CF": {
    "label": "Play",
    "cmnt": "prime example of a playlist that cycles every 180 seconds and continues to repeat",
    "cmd": {"playlist":{"ps":[1,3,5,7,11,13,17],"dur": 1800,"transition":7,"repeat":0,"end":0}}
  }, 
  "0xFF9867": {
    "label": "Bright+",
    "cmnt": "smaller steps at beginning, larger steps at the end",
    "cmd": "!incBrightness"
  },
  "0xF78877": {
    "label": "DIY1",
    "cmnt": "Preset 1, fallback to Saw(16) - Party(6) if it doesn't exist",
    "cmd": "!presetFallback",
    "PL": 1,
    "FX": 16,
    "FP": 6
  },
}
```
