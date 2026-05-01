---
title: Wiring Guides
hide:
  # - navigation
  # - toc
---

## Addressable LED Strips

![DigitalWiring](../assets/images/content/WLED_5VdigitalWiring.png)

![DigitalWiring12V](../assets/images/content/WLED_12VdigitalWiring.png)

![DigitalWiringMultiStrip](../assets/images/content/WLED_MultistripdigitalWiring.png)

![DigitalWiringMultiSupply](../assets/images/content/WLED_MultisupplydigitalWiring.png)

## Non-Addressable LED Strips

![AnalogWiring1x](../assets/images/content/12Vanalog_wiring.png)

![AnalogWiring3x](../assets/images/content/12Vanalog_wiringRGB.png)

More info on analog LEDs can be found [here](/basics/compatible-led-strips/#non-addressable-led-strips)

## Levelshifter

The SN74(A)HCT125(N) can be wired in different ways. The diagrams show the easiest wiring by connecting unused inputs to GND and leaving unused outputs unconnected. In general:

- Inputs 1A to 4A: connect unused inputs to GND
- Connect the output disable pins 1<span style="text-decoration:overline">OE</span> to 4<span style="text-decoration:overline">OE</span> to GND, enabling all outputs
- Outputs 1Y to 4Y: leave unused outputs unconnected 

![Shifter 1CH](../assets/images/content/Shifter74HCT125_Single.png)

![Shifter 2CH](../assets/images/content/Shifter74HCT125_Dual.png)

![Shifter 4CH](../assets/images/content/Shifter74HCT125_Quad.png)
