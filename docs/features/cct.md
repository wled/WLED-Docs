---
title: White handling
hide:
  # - navigation
  # - toc
---

### White channel(s) handling

Besides addressable RGB and RGBW bus types, WLED 0.13.0 also supports PWM CCT (correlated color temperature) lights.

#### Auto white handling

Many effects and realtime sources are based on an RGB color model, which necessitates a method to calculate a white channel value from the RGB value for lights that support more than RGB.

WLED offers four auto white modes, one of which can be selected in LED settings using the option `Auto-calculate white channel from RGB`. This option is only shown if at least one bus with White channel support is present.

| Auto White mode | Description |
|---|---|
Accurate | This mode subtracts the calculated white value from the RGB channels. This gets rid of the "RGB-white" but means that the light is less bright with only the white channel and not the RGB channels being utilized for pure white.
Brighter | This does the exact opposite and not touch the RGB channels at all, just mix in the dedicated white.
None | No auto white calculation is performed. The white channel of colors can be manually set using the `White channel` slider in the user interface, RGB-only effects and most realtime sources will leave the white channel off.
Dual | The `White channel` slider is present in the UI and works the same as in `None` mode, however if the slider value is 0 (far left), the `Brighter` mode is used for auto white calculation. This is the default auto white mode.
Max | Sets white to the value of the brightest RGB channel. This is good for white-only LEDs without any RGB.

`Accurate` and `Brighter` methods are applied on a per-pixel basis, so they also work in color palettes and realtime effects!

#### White Balance correction

If enabled in LED settings, WB correction allows either making all pixels colder or warmer on a per-segment basis using a slider in the main user interface.  
This is applied to the RGB color only, after the auto white channel calculation.

#### CCT handling

WLED starting with version 0.13.0 also supports bus types with two white channels, one with a warm color temperature (e.g. 2700 Kelvin, reddish white) and one with a cold white color temperature (e.g. 8000 Kelvin, bluish white).

Since as of the release of version 0.13.0 no adjustable CCT addressable LEDs are supported*, this only applies to PWM analog LED outputs.

_*SK6812 WWA (with 3 channels, warm white, cold white and amber) are supported, but treated as if RGB using the `WS281x` bus type. White spectrum support for this LED type will be added at a later point._

The overall brightness of the white channels is determined from the auto-white calculation outlined above, and as such is identical in behavior to that of single white channel busses.

The color temperature is set either on a per-segment basis via a dedicated slider in the UI, or if `Calculate CCT from RGB` is enabled in LED settings, is estimated on a per-pixel basis from the set RGB color (e.g. setting Red results in the warmest, setting Blue results in the coldest possible white).
The former has the advantage of granular white spectrum control independent of the set RGB color, while the latter enables control of the color temperature from all effects and realtime sources.

#### CCT additive blending

Setting this to 0% results in a more even brightness output across the supported temperature range, as the fading between the warm and cold white channels is linear.

Setting this to 100% results in the highest peak brightness output at the neutral white point (CCT value `127`), as both white channels are active at 100%.

![](/assets/images/content/wledcct.png)

!!! warning
		Make sure your setup can handle driving both white channels at maximum output simultaneously. This results in a higher heat output and might reduce the lifetime of your LEDs. For example, bulbs by Athom are designed for linear blending (0%) and may be damaged by attempting to use additive blending.

You can limit the maximum allowed additive blending at build time using the `WLED_MAX_CCT_BLEND` macro.  
For example, add `-D WLED_MAX_CCT_BLEND=0` to your build flags to force linear blending only.

#### IC CCT

By default, PWM CCT bus types set the value of the warm and cold white channels.  
If your hardware uses an IC that controls the color temperature based on one PWM signal and the overall brightness on the other, please use the build flag `-D WLED_USE_IC_CCT` in a custom compilation. (the 15W bulb by Athom uses this method)

#### CCT in the JSON API

Please see [here](/interfaces/json-api/#cct-control) for more info on how to handle WLED CCT from integrations.