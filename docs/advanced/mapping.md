---
title: Mapping
hide:
  # - navigation
  # - toc
---

WLED now has the ability to remap your LED strip programmatically.

### What is it?
This allows us to treat the WLED strip as if it is wired in any way - we can then use the mapping feature to address the strip in any order. This allows for matrix support, serpentine runs and such.

### How do we do it?

Navigate to the edit page for your WLED device by adding `/edit` to its address - for example, https://my-led-device.local/edit
Use this edit page to create a file called `ledmap.json`.

`ledmap.json` file needs to be a JSON formatted file with the the key being "map" and the value being an array of numbers representing the new order of pixels. The _position_ of values in the array is the "natural" order of LEDs and the value entered is the new position.
  
The ArduinoJSON library is *****extremely***** white-space sensitive.
If your `ledmap.json` file is not working, check for white-spaces where they should not be. The LED positions are zero-indexed.

Multiple maps are supported in the latest versions by using `ledmapx.json` where x is a number. Maps can be selected in a preset using `{"ledmap":x,...`.

Use -1 in the map for gaps/blank/null LEDs.

### Examples 
In the below example (formatted multiple ways), we remap a strip of four LEDs from a physical order of 0 1 2 3 into a new order of 0 2 1 3.

    {"map":[0,2,1,3]}

    {"map":[
    0,2,1,3
    ]}

    {"map":[
    0,2,
    1,3
    ]}


This is another example that switches direction every 5 LEDs.
It could be formatted any of the three ways demonstrated above.
  
```json
{"map":[0, 1, 2, 3, 4, 9, 8, 7, 6, 5, 10, 11, 12, 13, 14,
19, 18, 17, 16, 15, 20, 21, 22, 23, 24, 29, 28, 27, 26, 25]}
```

The following example shows how to create a `ledmap.json` for LEDs arranged in a two-dimensional grid intead of a one-dimensional string.

Here, we have a serpentine of LEDs in 4 columns and 3 rows:
```json
{
  "map": [
    0, 1,  2,  3,
    7, 6,  5,  4,
    8, 9, 10, 11
  ],
  "width":  4,
  "height": 3
}
```

![wiring diagram of the 4x3 mapping](mapping/mapping_4x3.png)

A more complex example of 16 LEDs arrange in a double figure `∞` shape. This includes some missing LEDs showing up as `-1`.
Note that if a `ledmap.json` file exists, the `2d-gaps.json` file will be ignored.
```json
{"map":
  [
    -1, -1, 14, -1, 12, -1, 10, -1, -1,
    -1, 15, -1, 13, -1, 11, -1,  9, -1,
     0, -1, -1, -1, -1, -1, -1, -1,  8,
    -1,  1, -1,  3, -1,  5, -1,  7, -1,
    -1, -1,  2, -1,  4, -1,  6, -1, -1
  ],
  "width":  9,
  "height": 5
}
```

![wiring diagram of the double ∞ shape mapping](mapping/mapping_infinity_shape.png)
