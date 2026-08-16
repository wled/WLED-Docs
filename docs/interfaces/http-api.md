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

| Parameter | Value Range | Description | Since Version |
| --- | --- | --- | --- |
&A= | 0 to 255 | Master brightness | 0.2
&T= | 0, 1, or 2 | Master Off/On/Toggle | 0.3
&R= | 0 to 255 | Primary Red value | 0.2
&G= | 0 to 255 | Primary Green value | 0.2
&B= | 0 to 255 | Primary Blue value | 0.2
&W= | 0 to 255 | Primary White value | 0.4
&FX= | 0 to 101 | LED Effect Index | 0.3
&SX= | 0 to 255 | Effect Speed | 0.3
&IX= | 0 to 255 | Effect Intensity | 0.5.0
&FP= | 0 to 46 | FastLED Palette | 0.8.0
&NL= | 0 to 255 | Nightlight active and duration in minutes | 0.3
&ND | none | Toggles nightlight on but uses default duration | 0.6.3
&NT= | 0 to 255 | Nightlight target brightness | 0.5.0
&NF= | 0 to 2 | Fade Nightlight, 1 = fade brightness only, 2 = additionally fade color from primary to secondary color | 0.5.0

## Advanced

| Parameter | Value Range | Description | Since Version |
| --- | --- | --- | --- |
&CL= | HEX/DEC | Primary color | 0.8.0
&C2= | HEX/DEC | Secondary color | 0.8.0
&C3= | HEX/DEC | Third color | 0.8.0
&R2= | 0 to 255 | Secondary Red value | 0.4
&G2= | 0 to 255 | Secondary Green value | 0.4
&B2= | 0 to 255 | Secondary Blue value | 0.4
&W2= | 0 to 255 | Secondary White value | 0.4
&HU= | 0 to 65535 | Hue | 0.5.1
&SA= | 0 to 255 | Saturation (only in conjunction with Hue) | 0.5.1
&H2 | none | Hue + Saturation will set secondary color | 0.5.1
&SR= | 0 or 1 | Set Primary/Secondary color to random hue | 0.4
&SC | none | Swap primary and secondary color | 0.4

### Use of hex values

Hex values need to be prefaced with the character h or H. The normal format is `RRGGBB`. If the led strip is RGBW, the hex format is `WWRRGGBB`. Note: In the UI the format is `RRGGBBWW`, so the values cannot be copied without a transformation.

### Loxone commands

Loxone offers two commands. One for RGB values and one for brightness and color temperature.

| Parameter | Syntax | Range | Description | Since Version |
|---|---|---|---|---|
&LX= | BBBGGGRRR | 0 - 100100100 | Loxone RGB value for primary color. Each color (`RRR`,`GGG`,`BBB`) is specified in the range from 0 to 100%. | 0.11
&LX= | 20bbbtttt | 200002700 - 201006500 | Loxone brightness and color temperature values for primary color. Brightness `bbb` is specified in the range 0 to 100%. `tttt` defines the color temperature in the range from 2700 to 6500 Kelvin. | 0.11
&LY= | BBBGGGRRR | 0 - 100100100 | Loxone RGB value for secondary color. Each color (`RRR`,`GGG`,`BBB`) is specified in the range from 0 to 100%. | 0.11
&LY= | 20bbbtttt | 200002700 - 201006500 | Loxone brightness and color temperature values for secondary color. Brightness `bbb` is specified in the range 0 to 100%. `tttt` defines the color temperature in the range from 2700 to 6500 Kelvin. | 0.11

## Notifications

| Parameter | Value Range | Description | Since Version |
| --- | --- | --- | --- |
&RN= | 0 or 1 | Receive UDP Notifications | 0.3
&SN= | 0 or 1 | Send UDP Notifications | 0.3
&NN | none | No notification for this request | 0.3
&HP= | 0 to 99 | Sets Hue polling light ID (0 is off) | 0.5.1

## Presets

| Parameter | Value Range | Description | Since Version |
| --- | --- | --- | --- |
&PS= | 1 to 16 | Saves current setup to preset. Preset 255 can be used and is temporary/not persistent. | 0.4
&PL= | 1 to 250 | Applies entire preset | 0.4
&P1= | 1 to 249 | First cycle preset | 0.6.3
&P2= | 2 to 250 | Last cycle preset | 0.6.3
&TT= | 0 to 65000 | Set transition time (ms) | 0.6.3

## Macros

| Parameter | Value Range | Description | Since Version |
| --- | --- | --- | --- |
&M= | 1 to 16 | Apply macro (deprecated, added for compatibility with pre-0.11 automations) | 0.5.0

## Segments

It is highly recommended to use the [JSON API](/interfaces/json-api) when dealing with Segments.

| Parameter | Value Range | Description | Since Version |
| --- | --- | --- | --- |
&SM= | 0 to 9 | Set the main segment (values are reported to XML) | 0.9.0
&SS= | 0 to 9 | Select segment to apply THIS api call to | 0.9.0
&SV= | 0, 1, or 2 | Set segment selected (2 unselects others) | 0.9.0
&S= | 0 to ledcount-1 | Set segment start | 0.9.0
&S2= | 0 to ledcount | Set segment stop | 0.9.0
&GP= | 1 to 255 | Set segment grouping | 0.9.1
&SP= | 0 to 255 | Set segment spacing | 0.9.1
&RV= | 0 or 1 | Reverse/Flip Segment direction | 0.9.1
&SB= | 0 to 255 | Segment brightness | 0.10.0

## General and Experimental

| Parameter | Value Range | Description | Since Version |
| --- | --- | --- | --- |
&RB | none | Reboot WLED | 0.10.0 (?)
&ST= | 32bit | Current UTC time in Unix epoch | 0.4
&CT= | 32bit | UTC time for countdown end | 0.4
&MD= | 0 or 1 | Set slider mode to RGB/HSB | 0.3
&AX= | 0 to 255 | Debug feature, can be configured for general IO | 0.3
&IN | none | Server will not respond to this request (internal) | 0.3
&OL= | 0 to 255 | Experimental overlays | 0.3
&L= | 0 to 255 | Lock pixel | 0.4
&L2= | 0 to 255 | Lock pixel range L to L2 | 0.4
&UL | none | Unlock instead (used in conjunction with L and L2) | 0.4
&NX= | String 1..6 | Cronixie clockface | 0.4
&NM= | 0 or 1 | Cronixie Time or Countdown mode | 0.4
&NB= | 0 or 1 | Cronixie Backlight | 0.4
&IT | none | Include UI color theme in API response | 0.8.2
&RD= | 0 or 1 | Toggle realtime UDP | 0.8.4
&LO= | 0-2 | Live data override. 0 is off, 1 is override until live data ends, 2 is override until ESP reboot | 0.10.2
&NP | none | Advance to the next preset in a playlist | 0.15

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
