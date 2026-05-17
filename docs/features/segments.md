---
title: Segments
hide:
  # - navigation
  # - toc
---

!!! info
    Starting in WLED 0.9.0, Segments are supported.

This feature allows you to set different zones on the LED strip, each running a different effect or color.

A segment is selected if the checkmark next to the segment number is checked. Changes you make to color or effects will apply to all selected segments. The color/effect that is shown in the web UI is that of the first selected segment.

There is one _main segment_, Segment 0 by default. This segment has a few important differences to the rest of the segments:

- Color transitions only work on the main segment
- The main segment's color is the one that will be reported to HTTP and MQTT APIs

Tip: If you divide your strip into two segments, reverse the second one and select both, you can achieve very nice symmetrical effects!

Segment 0 has a Start LED of 0 and a Stop LED equal to the LED Count you defined in Configuration, LED Preferences. _The Stop LED is **not** included in the Segment._ Currently you can create a maximum of 10 segments in WLED 0.15 and earlier. Starting in v0.16, the segment limit was significantly increased.  Presets 1-15 use only Segment 0 by default.  Preset 16 is the only Preset that saves settings for Segments 1-10.

To display segment information select the down arrow in the Segment box.  To add a Segment select “+ Add Segment”.  Enter the Start and Stop LED as appropriate.  Grouping and Spacing control the organization of the LEDs within the selected effect.  To reverse the direction of an effect select Reverse Direction.  To delete a Segment select the trash can.  To save your Segment settings select the checkmark to the right of the Start and Stop LED numbers.

## Grouping and Spacing
When an effect changes the color of one LED, it is really changing the color of one LED group. Since the default group size is one, the effect normally only changes a single LED. When Grouping is set to two, the effect will light two LEDs using the same color. The two LEDs are treated as a single _virtual_ LED. 

To illustrate this, we can create a segment with 12 LEDS (physically referred to as LED 0 to LED 11) and select an effect that repeats three colors. When Grouping is set to one we see a repeating pattern of one red LED, one blue LED, and one green LED. When Grouping is set to two the segment of 12 physical LEDs becomes a segment of 6 virtual LEDs (virtualLED 0 to virtualLED 5). The same effect will now set the color of each virtual LED (which consists of two physical LEDs). The pattern becomes two red LEDs followed by two blue LEDs then two green LEDs.

|Setting|LED Output|
| :---: | --- |
|Grouping 1<br /> Spacing 0| ![](https://github.com/twlare/WLEDDocs/raw/master/G1S0A.png) |
|Grouping 2<br /> Spacing 0| ![](https://github.com/twlare/WLEDDocs/raw/master/G2S0Virtual.png) |

As the pattern cycles, the group of LEDs will move together.

|Setting|LED Output|
| :---: | --- |
|Grouping 1<br /> Spacing 0| ![](https://github.com/twlare/WLEDDocs/raw/master/G1S0Cycle.gif) |
|Grouping 2<br /> Spacing 0| ![](https://github.com/twlare/WLEDDocs/raw/master/G2S0Cycle.gif) |

Spacing controls the space or gap between LEDs. The default spacing is zero, so normally there is no space between LEDs. When Spacing is set to one, every other LED will be lit. The number of _virtual_ LEDs in the strip will be half the number of physical LEDs.

Again, we can create a segment with 12 LEDS (physically referred to as LED 0 to LED 11) and select an effect that repeats three colors. When Spacing is set to zero we see a repeating pattern of one red LED, one blue LED, and one green LED. When Spacing is set to one the segment of 12 physical LEDs becomes a segment of 6 virtual LEDs (virtualLED 0 to virtualLED 5). The same effect will now set the color of each virtual LED (which consists of the even numbered physical LEDs). The pattern becomes one red LED followed by a blank LED, one blue LED followed by a blank LED, then one green LED followed by a blank LED.

|Setting|LED Output|
| :---: | --- |
|Grouping 1<br /> Spacing 0| ![](https://github.com/twlare/WLEDDocs/raw/master/G1S0A.png) |
|Grouping 1<br /> Spacing 1| ![](https://github.com/twlare/WLEDDocs/raw/master/G1S1Virtual.png) |

As the pattern cycles, only the virtual LEDs will be lit - the blank LEDs in between the virtual LEDs will always be off.

|Setting|LED Output|
| :---: | --- |
|Grouping 1<br /> Spacing 0| ![](https://github.com/twlare/WLEDDocs/raw/master/G1S0Cycle.gif) |
|Grouping 1<br /> Spacing 1| ![](https://github.com/twlare/WLEDDocs/raw/master/G1S1Cycle.gif) |

Grouping and Spacing can be combined to create many different custom LED layouts. In the example below, the strip of 12 physical LEDs has been configured to function as four virtual LEDs with a small gap between them.

|Setting|LED Output|
| :---: | --- |
|Grouping 2<br /> Spacing 1| ![](https://github.com/twlare/WLEDDocs/raw/master/G2S1A.png) |
|Grouping 2<br /> Spacing 1| ![](https://github.com/twlare/WLEDDocs/raw/master/G2S1Cycle.gif) |

## Interleaving
This is an easy way to get a repeating pattern of colors using one segment per color.

![](https://i.ibb.co/7Ntw68B/interleave.png)

## Offset in a segment
By default effects start in the first LED in the segment and finish in the last one. If the offset parameter in a segment is used, the effect start will be moved by the number of positions entered. It will continue to the last LED and then finish with the initial positions that were skipped.

For instance, let's assume assume a strip of 12 LEDs with the positions numbered as follows (like the examples above):

![](https://github.com/twlare/WLEDDocs/raw/master/LEDS12.png)

An offset value of 5 will make the effect start in the physical position 5, continue to position 11 and then finish with positions 0 through 4, like this:

![](https://github.com/twlare/WLEDDocs/raw/master/LED7to6.png)

A negative offset value is allowed and represents an offset starting from the last position in the segment. In our previous example, an offset of -2 will start the effect in position 10, like this:

![](https://github.com/twlare/WLEDDocs/raw/master/LED2to1.png)

The offset values is prioritized over grouping and/or spacing. For example, if the offset is 2, grouping 4 and spacing 1, the first group of 4 LEDs will start at the physical position number 2.

## Segment Layering & Effect Overlay

Since v0.16, WLED supports true segment layering: segments with overlapping pixels are composited in real time using a blend mode you choose per segment. This makes it possible to combine almost any two effects on the same LEDs.

To use layering, create two or more segments that cover the same pixel range. On each segment, select its **blend mode** from the dropdown:

| Mode | Description |
|------|-------------|
| Top/Default | Shows only the top layer, ignoring the bottom entirely |
| Bottom/None | Shows only the bottom layer, ignoring the top entirely |
| Add | Adds colors together, clamping at white |
| Subtract | Subtracts the top from the bottom, darkening toward black |
| Difference | Absolute difference — identical colors go black, opposites go bright |
| Average | 50/50 blend of both layers |
| Multiply | Multiplies colors — white passes bottom through, black blocks it |
| Divide | Divides bottom by top — brightens where the top is dark |
| Lighten | Picks the brighter pixel from each layer |
| Darken | Picks the darker pixel from each layer |
| Screen | Inverse of multiply — always brightens |
| Overlay | Boosts contrast using the bottom layer's brightness |
| Hard Light | Like Overlay, but driven by the top layer |
| Soft Light | Subtle contrast and saturation boost, no clipping |
| Dodge | Brightens the bottom based on the top |
| Burn | Darkens the bottom based on the top |
| Stencil | Shows top where it has any color; shows bottom where top is black |

The compositing order follows segment ID order: the segment with the **lower** ID is treated as the bottom (background) layer.

### Transition Blending

v0.16 also adds transition blending styles that control how effects cross-fade when you switch presets. Options include Shift, Push, and others, in addition to the classic dissolve-style fade.
