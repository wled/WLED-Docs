---
title: Mapping
hide:
  # - navigation
  # - toc
---

WLED now has the ability to remap your LED strip programmatically.


# What is it?
This allows us to treat the WLED strip as if it is wired in any way - we can then use the mapping feature to address the strip in any order. This allows for matrix support, serpentine runs and such.

LED Maps replace and over-ride the older Gap system. **Note:** that if a `ledmap.json` file exists, the `2d-gaps.json` file will be ignored.


# How do we do it?


## Create config file

Navigate to the edit page for your WLED device by adding `/edit` to its address - for example, https://my-led-device.local/edit
Use this edit page to create a file called `ledmap1.json`, where `1` is incremented for each map you load on your controller.

**Note:** If the filename is `ledmap.json`, the config file ***will not load***; the filename must end in a number even if there's only one config file.


## Formatting

`ledmap1.json` file needs to be a JSON-formatted file with the key being `"map"` and the value being an array of numbers `[0,1,2,3...]` representing the new order of pixels. The _position_ of values in the array is the "natural" order of LEDs, with the number being the electrical position of a given LED on the linear strand.
  
The ArduinoJSON library is *****extremely***** whitespace sensitive.
If your `ledmap1.json` file is not working, check for white-spaces where they should not be. 

***Note:*** In the examples below, additional whitespace is added for readability; however, the examples may not work when copied and pasted directly due to this whitespace sensitivity.

LED positions are zero-indexed. If you have 20 LEDs, your LED "addresses" will start at 0 and end at 19, but they do not need to be entered in order or completely, as demonstrated below.


## Additional configurations

Multiple maps are supported in the latest versions by using `ledmapx.json`, where x is a number. Maps can be selected in your cfg.json  using `{"ledmap":x,...`, where `x` corresponds to the number in the filename, or in the main settings UI below segments, where any customised names will also be used in the selection list, see below.


## Complicated maps

LEDs can be mapped in the "map" array in any order, including out-of-order, allowing you to map custom and complex shapes using `-1` in the map for gaps/blank/null LEDs. In addition, not all LEDs in a segment need to be mapped in the map; you can leave out extra LEDs if they're not required.


# Examples 


## Formatting options for `"map"`

In the examples below (formatted multiple ways), we remap a strip of four LEDs from a physical order of 0 1 2 3 into a new order of 0 2 1 3.


### Single line
```json
{"map":[0,2,1,3]}
```


### Multi-line object, single line array
```json
{"map":[
0,2,1,3
]}
```


### Multi-line array, helpful in visualising 2D matrices
```json
{"map":[
0,2,
1,3
]}
```


## 1D redordering example

This is another example that switches direction every 5 LEDs.
It could be formatted in any of the three ways demonstrated above.
  
```json
{"map":[0, 1, 2, 3, 4, 9, 8, 7, 6, 5, 10, 11, 12, 13, 14,
19, 18, 17, 16, 15, 20, 21, 22, 23, 24, 29, 28, 27, 26, 25]}
```


## 2D Matrix reordering

The following example shows how to create a `ledmap1.json` for LEDs arranged in a two-dimensional grid instead of a one-dimensional string. Notice the addition of the `width` and `height` keys and how they correspond to how the map array itself is formatted. This isn't required, but it is helpful to do.

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

A basic matrix map like the one above can also be quickly configured in the UI as a Gap, but if you need more control, this is a good starting point. As noted above, if an `ledmap.json` file exists, the `2d-gaps.json` file will be ignored.

Also, while we've written it here as a multi-line array with the same number of lines as the height and the same number of entries per line as the width, you could still format it as a single-line file, as below; they are functionally the same.

```json
{"map":[0,1,2,3,7,6,5,4,8,9,10,11],"width": 4,"height":3}
```


## Mapping complex shapes using -1's for spacing

A more complex example of 16 LEDs arranged in a double figure `∞` shape. This includes some empty space represented as `-1`.
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


## Naming your maps for easier use

In addition, you can name your  map configs in the UI by adding an "n" key to the config.

```json
{"n": "Double infinity map.",
"map":
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
