---
title: Macros
hide:
  # - navigation
  # - toc
---
!!! info
    Also see [Presets](/features/presets) for 0.11.0+.

You are able to set custom actions ("Macros") in Time & Macro settings for the following events:

- Specific time of day
- Button short/long/double press
- HTTP API call executing a macro with `&M=`
- Alexa On/Off
- Countdown over
- Timed light duration over
- Device (re)boot (up to 0.10.2, use LED settings `Boot preset` in 0.11)

Note: If you have multiple presets that run at the same time, the lowest down the list takes precedence.

Each macro has the format of a standard [HTTP API call](/interfaces/http-api) without the IP. Optionally, the "win&" may be omitted.
For example, the macro "A=255" sets the brightness to maximum. "R=255&G=160&B=0" sets the color to orange.
You can specify up to 16 macros. (up to 250 in WLED 0.11 since the Macro functionality has been merged into the Presets feature)

Examples of how to use API-calls and define macros can be found in [this issue](https://github.com/Aircoookie/WLED/issues/801#issuecomment-635600255) and [in this one](https://github.com/Aircoookie/WLED/issues/199#issuecomment-520143239).

The simplest macro example is getting a button to do your bidding.  The default pin to which a button can be connected is GPIO 0 (D3 on NodeMCU, D1 Mini and others).  Even though WLED uses the internal pull up resistors on input pins, this pin is ideally externally pulled high to 3.3V with a 10k resistor. The configured macro executes when the pin is pulled low (grounded). The desired macro is entered on the Time/Macros configuration page and then assigned to a short, long or double press. Like this:

![image](https://github.com/Aircoookie/WLED-Docs/assets/59397047/798ba6fe-0ab0-4288-9b5b-307c6f554f38)


The "T=2" macro toggles power to the LEDs (in this case long press).
The "FX=~" macro steps through the effects (in this case short press).

You can set a preset to `P1=1&P2=3&PL=~`, enter the preset number for your button, and this will step through presets 1 and 3. Change the "3" to whatever your highest preset is that you want to include.

The default (built-in) actions for button 0 are short-press: toggle on/off and long-press: select random color.
Long-pressing for more than 6 seconds will open the WLED-AP with the default password (`wled1234`).  
For further buttons, the default action for short press is cycling effects, long press ramp brightness, and double press cycle palettes.

## Buttons

Multiple buttons are implemented since 0.13 and allow a few different types of buttons to be connected to the ESP:

- momentary push-buttons that are normally open and short GPIO pin to ground (active low)
- momentary push-buttons that are normally closed and release the connection from GPIO pin to GND (inverted, active high)
- switches (be careful with selection of GPIO for switch since some GPIOs will prevent successful boot of ESP if held LOW or HIGH at boot)
- PIR switch AKA motion detection sensor (they set GPIO HIGH when motion is detected, this type of buttons will also trigger MQTT message with /motion topic if "Publish on button press" is set on MQTT config)
- some GPIO pins on ESP32 can act as momentary touch buttons with no additional hardware
- analog "buttons" (also with inverted logic) those can be used as potentiometers or analog input buttons

Button GPIO pin and type can be selected in the _LED Settings_ page.

Each momentary button can have 3 different [Presets](/features/presets) assigned, for short press, long press or double press.
Momentary push-buttons by default trigger shortly after the _release_ of a button, to be able to detect if it has been pressed short, long or twice. When configuring the same preset number for short, long and double press, it will trigger directly when being pressed as of WLED 0.14.0-b2-2306020.

For switch type buttons you can assign only 2 presets, one for transition of switch from LOW to HIGH and second for the opposite transition from HIGH to LOW.

Selecting 0 for preset will use the _default_ action. If you find that the default action is _inverted_ for switch, please create presets for On and Off actions and assign them appropriately.

For assigning [Presets](/features/presets) to buttons use _Time & Macros_ settings page.

Note: Button 0 has two, built-in functions. 1. Hold it down for >6 seconds and the Wi-Fi settings will be reset to default. 2. Hold it down for >12 seconds and flash memory is erased.

### Analog button
Starting in WLED 0.13, analog "buttons" (e.g. a potentiometer) are supported.
With the Short and Long columns set to 0, set the Double column in Button Actions to one of these values to configure:

| Property | Value |
| --- | --- |
Global brightness | 250
Effect speed | 249
Effect intensity | 248
Palette | 247
Primary color hue | 200
Segment N opacity | 0-32

This potentiometer should be supplied 3.3V and GND, with it's output supplied to A0 (or any other ADC pin you specify), recommended 10KΩ or greater. 

!!! info "Do not use ESP32 ADC2 GPIO pins for analog buttons"
    On ESP8266, you can only have a single analog button on pin A0, the pin set in the settings UI is ignored.  
    On ESP32, only ADC1 pins will work for analog input while WiFi is active (pins 32-39). ADC2 pins will not work.

### Global brightness

Users planning to use a potentiometer for global brightness should be aware that wled is configured to turn off when the potentiometer is adjusted to either extreme - both maximum and minimum adjustments. Users who desire to disable this functionality may do so on the hardware side by adding resistors between the potentiometer and the rails.

Adding a resistor between the potentiometer and 3.3V prevents A0 from fully reaching 3.3V and allows the potentiometer to be adjusted to the maximum adjustment without powering off wled. A value of 7.5%-10% of the potentiometer value should be sufficient for this (~750Ω for a 10KΩ potentiometer). Similarly, added resistance between the potentiometer and GND prevents A0 from reaching 0V, and allows the potentiometer to be adjusted to the minimum adjustment without powering off wled. A value of 3-5% of the potentiometer value should be sufficient (~500Ω for a 10KΩ potentiomenter).

In both instances, the added resistances will slightly reduce the overall adjustment range, with a larger reduction for larger resistor choices. As such, A user who desires the maximum possible adjustment range should determine their needed resistance values experimentally by installing the potentiometer, adjusting for stable behavior at the desired extrema, measuring the voltage on A0, using the voltage divider equation to determine the optimal resistance, then retesting for confirmation.

