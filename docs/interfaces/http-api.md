---
title: HTTP Request API
hide:
  # - navigation
  # - toc
---

!!! hint
    While this API is not deprecated, it is highly recommended to use the [JSON API](/interfaces/json-api) instead of the HTTP API for new integrations, as it is structured in a better way and allows efficient use of newer features like segments, presets, and playlists.

WLED's HTTP API allows you to set many properties of your lights, even more than the index page UI supports, via a simple GET web request.

!!! help
    _Unsure how all this API stuff works? Check out [this amazing guide](https://tynick.com/blog/01-28-2020/controlling-wled-with-raspberry-pi-using-the-wled-api/) by tynick!_

The basic URL scheme is: `[ipaddress]/win`. This will return an XML file with some current values (see bottom of page).
Parameters can be added to control some of the variables.

- Example (AP): `192.168.4.1/win&A=255` sets the brightness to maximum
- Example (mdns): `led.local/win&A=128&FX=0` sets the brightness to half and the effect to Solid

In conjunction with a [router port forwarding](/advanced/remote-access-ifttt) this can be used to automate WLED, for example via IFTTT.

Add one or multiple of the following parameters after the base URL/IP to change values:
(if the parameter is unknown or the value illegal nothing will happen)

## LED control

| Parameter | Value Range | Description |
| --- | --- | --- |
&A= | 0 to 255 | Master brightness
&T= | 0, 1, or 2 | Master Off/On/Toggle
&R= | 0 to 255 | Primary Red value
&G= | 0 to 255 | Primary Green value
&B= | 0 to 255 | Primary Blue value
&W= | 0 to 255 | Primary White value
&FX= | 0 to info.fxcount-1 | LED Effect Index
&SX= | 0 to 255 | Effect Speed
&IX= | 0 to 255 | Effect Intensity
&FP= | 0 to info.palcount-1 | Palette Index
&NL= | 0 to 255 | Nightlight active and duration in minutes
&ND | none | Toggles nightlight on but uses default duration
&NT= | 0 to 255 | Nightlight target brightness
&NF= | 0 to 2 | Fade Nightlight, 1 = fade brightness only, 2 = additionally fade color from primary to secondary color

## Advanced

| Parameter | Value Range | Description |
| --- | --- | --- |
&CL= | HEX/DEC | Primary color
&C2= | HEX/DEC | Secondary color
&C3= | HEX/DEC | Third color
&R2= | 0 to 255 | Secondary Red value
&G2= | 0 to 255 | Secondary Green value
&B2= | 0 to 255 | Secondary Blue value
&W2= | 0 to 255 | Secondary White value
&HU= | 0 to 65535 | Hue
&SA= | 0 to 255 | Saturation (only in conjunction with Hue)
&H2 | none | Hue + Saturation will set secondary color
&SR= | 0 or 1 | Set Primary/Secondary color to random hue
&SC | none | Swap primary and secondary color

### Use of hex values

Hex values need to be prefaced with the character h or H. The normal format is `RRGGBB`. If the led strip is RGBW, the hex format is `WWRRGGBB`. Note: In the UI the format is `RRGGBBWW`, so the values cannot be copied without a transformation.

### Loxone commands

Loxone offers two commands. One for RGB values and one for brightness and color temperature.

| Parameter | Syntax | Range | Description |
|---|---|---|---|
&LX= | BBBGGGRRR | 0 - 100100100 | Loxone RGB value for primary color. Each color (`RRR`,`GGG`,`BBB`) is specified in the range from 0 to 100%.
&LX= | 20bbbtttt | 200002700 - 201006500 | Loxone brightness and color temperature values for primary color. Brightness `bbb` is specified in the range 0 to 100%. `tttt` defines the color temperature in the range from 2700 to 6500 Kelvin.
&LY= | BBBGGGRRR | 0 - 100100100 | Loxone RGB value for secondary color. Each color (`RRR`,`GGG`,`BBB`) is specified in the range from 0 to 100%.
&LY= | 20bbbtttt | 200002700 - 201006500 | Loxone brightness and color temperature values for secondary color. Brightness `bbb` is specified in the range 0 to 100%. `tttt` defines the color temperature in the range from 2700 to 6500 Kelvin.


## Notifications

| Parameter | Value Range | Description |
| --- | --- | --- |
&RN= | 0 or 1 | Receive UDP Notifications
&SN= | 0 or 1 | Send UDP Notifications
&NN | none | No notification for this request

## Presets

| Parameter | Value Range | Description |
| --- | --- | --- |
&PS= | 1 to 250, or 255 (temporary) | Saves current setup to preset. Preset 255 is temporary and not persistent.
&PL= | 1 to 250 | Applies entire preset
&P1= | 1 to 249 | First cycle preset
&P2= | 2 to 250 | Last cycle preset
&TT= | 0 to 65000 | Set transition time (ms)

## Macros

| Parameter | Value Range | Description |
| --- | --- | --- |
&M= | 1 to 16 | Apply macro (deprecated; retained for compatibility with pre-0.11 automations)

## Segments

It is highly recommended to use the [JSON API](/interfaces/json-api) when dealing with Segments.

| Parameter | Value Range | Description |
| --- | --- | --- |
&SM= | 0 to info.leds.maxseg-1 | Set the main segment (values are reported to XML)
&SS= | 0 to info.leds.maxseg-1 | Select segment to apply THIS api call to
&SV= | 0, 1, or 2 | Set segment selected (2 unselects others)
&S= | 0 to ledcount-1 | Set segment start
&S2= | 0 to ledcount | Set segment stop
&GP= | 1 to 255 | Set segment grouping
&SP= | 0 to 255 | Set segment spacing
&RV= | 0 or 1 | Reverse/Flip Segment direction
&SB= | 0 to 255 | Segment brightness

## General and Experimental

| Parameter | Value Range | Description |
| --- | --- | --- |
&RB | none | Reboot WLED
&ST= | 32bit | Current UTC time in Unix epoch
&CT= | 32bit | UTC time for countdown end
&IN | none | Server will not respond to this request (internal)
&OL= | 0 to 255 | Experimental overlays
&NM= | 0 or 1 | Clock mode: 0 is normal, 1 is countdown
&RD= | 0 or 1 | Toggle realtime UDP
&LO= | 0-2 | Live data override. 0 is off, 1 is override until live data ends, 2 is override until ESP reboot
&NP | none | Advance to the next preset in a playlist (since 0.15)

## XML response

This is the XML file sent as response to every API call.

| Parameter | Value Range | Description |
| --- | --- | --- |
ac | 0 to 255 | Master Brightness
cl | 3x 0..255 | Primary Color RGB
cs | 3x 0..255 | Secondary RGB
ns | 0 or 1 | Notification Sending on
nr | 0 or 1 | Notification Receive on
nl | 0 or 1 | Nightlight active
nf | 0 or 2 | Nightlight Fade type
nd | 0 to 255 | Nightlight delay
nt | 0 to 255 | Nightlight target brightness
fx | 0 to 73 | Effect index
sx | 0 to 255 | Effect speed
ix | 0 to 255 | Effect intensity
fp | 0 to 43 | FastLED palette
wv | -1 to 255 | Primary White value
ws | 0 to 255 | Secondary White
ps | 0 to 255 | Current Preset
cy | 0 or 1 | Preset Cycling enabled
md | 0 or 1 | RGB or HSB UI mode
ds | String 0..32 | Server description
ss | 0 to 12 | Segment ID

## In-/decrementing values

You can use the `~` character to easily set values relative to their current value.  
This is currently supported for the following parameters:  
`A, R, G, B, W, R2, G2, B2, W2, FX, SX, IX, FP, PL`

For example, use `PL=~` to go to the next preset. Using just `~` without a number will increase the value by 1, `~-` will decrease it by 1. The value will then wrap around, so using `A=~-` when A is 0 will set A to 255.  

You can also specify by how much to change the value. For example, using `A=~10` will increase the brightness by 10. In case of using a number behind `~`, the value will clip (so it will not wrap around, if the maximum brightness is set, `A=~10` will not have any effect)

To setup a Macro for a Button to advance to the next Preset, use **win&P1=1&P2=30&PL=~**  
P1 will equal the first Preset of the rotation while P2 will be the last Preset.
