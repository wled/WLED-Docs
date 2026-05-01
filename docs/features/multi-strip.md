---
title: Multi-strip Support
hide:
  # - navigation
  # - toc
---

## Multi strip support

Starting in WLED 0.12.0, you are able to use multiple LED outputs from one ESP board!
Pins and LED numbers can be easily configured in LED settings, you don't need to re-compile code for your specific setup. Custom binaries for multiple pins are now also a thing of the past!

There are a few tips and recomendations to keep in mind when designing your setup:

### General

- It is highly recommended to use an ESP32 when using more than 1 output
- You may freely choose the LEDs type, pin numbers, length and color order of your LED strips at runtime in the LED settings page
- You cannot use input-only pins for LEDs output
    - classic esp32: pins 34 through 39 are input only.
    - esp32-s2: pin 46 is input only.
    - esp32-s3 and esp32-c3 don't have any input-only pins.
- Highly recommended to size power supply correctly according to your setup and disable the WLED brightness limiter setting to increase framerate with very large LED counts
- Most strip types have yet to be tested. Add confirmed working below:
- Confirmed working: WS281x, SK6812 RGBW, PWM white

### ESP8266

- There is a maximum of 3 strips supported.
- It is highly recommended to use two specific LED pins, GPIO1 (TX) and GPIO2 (D4), since they allow for hardware driving.
- It is recommended to use 512 LEDs/pin for good performance for a total of 1024 LEDs.
- 800 LEDs/pin for a total of 1600 has been confirmed working, but is not recommended for good performance and reliability.
- Using GPIO1 will disable serial debugging. If you need it, you can't use a strip on this pin.
- GPIO3 (RX) is the third pin that allows hardware driving on ESP8266. However, it uses 5 times as much memory per LED as GPIO 1 and 2, so use it only for low LED counts (recommended <50)
- You can use any other pin, but it will use the bitbang method, which is not recommended for reliability. It is best to stick to GPIO 1, 2, and if need be, 3.
- Using pin GPIO16 for WS2812b LEDs did not work in my testing.
- ESP8266 can calculate about 15k LEDs per second (that means 250LEDs @~60fps, 500 LEDs @~30fps, 1000 LEDs @~15fps)
- The LED settings will give you a bar that shows how much memory you can allocate.

### ESP32

- There is a maximum of 10 strips supported on "classic" ESP32 (dual core) boards. In audioreactive builds, you can use up to 9, because the audio input driver needs one of the hardware units that is normally available for driving LEDs.
 - * "classic" ESP32: 10 led strips (9 with audioreactive)
 - * ESP32-S3: 12 led strips (with parallel I2S)
 - * ESP32-S2: 12 led strips (with parallel I2S, 4 with audioreactive)
 - * ESP32-C3: 2 led strips
- Contrary to the ESP8266, the pin usage does not matter on ESP32, feel free to use any available pin, except for input-only pins.
- For perfect performance, it is recommeded to use 512 LEDs/pin with 4 outputs for a total of 2048 LEDs.
- For very good performance, it is recommended to use 800 LEDs/pin with 4 outputs for a total of 3200 LEDs.
- For good performance, you can use 1000 LEDs/pin with 4 outputs for a total of 4000 LEDs.
- For okay performance, you can use 1000 LEDs/pin with 5 outputs for a total of 5000 LEDs.
- For okay performance, you can use 800 LEDs/pin with 6 outputs for a total of 4800 LEDs.
- ESP32 can calculate about 65k-85k LEDs per second (that means 1000 LEDs @~70fps, 2000 LEDs @~35fps, 4000 LEDs @~18fps)
- 4 outputs seem to be the sweet spot. 

### Virtual LEDs (DDP)

See [Virtual Leds](/advanced/ddp)
