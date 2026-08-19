---
title: Serial
hide:
  # - navigation
  # - toc
---

WLED supports multiple protocols over Serial.
Serial is available via USB, and on most boards, GPIO1 for TX and GPIO3 for RX.

!!! info "Pin usage limitation"
    If GPIO3 is allocated (e.g. for LED output), all Serial functionality except debug output is unavailable.  
    If GPIO1 is allocated, all Serial output is disabled, including the JSON API response, Improv, and tpm2 output.

### Adalight and tpm2

Both these protocols are supported and can be used to stream realtime LED data to WLED for direct display, e.g. from an bias lighting program. For tpm2, only data packets are supported and data in 24-bit RGB format is expected.  
If you want to drive a large amount of LEDs, you may need to increase the Baud rate in WLED Sync settings, as the default baud rate of `115200` is only sufficient for about 50-100 LEDs depending on the refresh rate.  
Both Adalight and tpm2 are supported.

### JSON over Serial

You can send commands to the WLED instance via Serial using the [JSON API](/interfaces/json-api).  
To request a JSON response containing the `state` and `info` objects, send `{"v":true}`.

### Improv

Improv Serial is supported and can be used to check the installed software version as well as connect your device to WiFi without needing to connect to the WLED access point.  
Improv is used by the [WLED web installer](https://install.wled.me) for an easy installation and setup process.  
The baud rate must remain at the default `115200` setting for the device to be detected as Improv-capable.

### Other

#### Version query

Send a lowercase `'v'` character (byte `0x76`) to obtain the ID of the installed WLED version.

#### LED data query

To get the colors currently displayed by LEDs:

- Send an uppercase `'L'` (byte `0x4C`) to request the current LED data as a [tpm2](https://gist.github.com/jblang/89e24e2655be6c463c56) data packet in 24-bit RGB format.

- Send a lowercase `'l'` (byte `0x6C`) to request the current LED data in JSON format. This returns the LED colors as 32-bit integers, of which the lowest byte is the Blue value, then Green, then Red, and the highest byte is the White channel value.

For both of these methods, you may need to increase the baud rate if you have a large amount of LEDs.  
However, tpm2 requires on average 2-4x less bandwidth than JSON, and should therefore be preferred if your application can parse binary data.

#### Changing Baud Rate

There are 2 main methods for changing Baud Rate for the serial connection:
- Persistent: Configure in App under [Sync Interfaces](/features/settings/#sync-settings). This setting will persist, and WLED will use the specified Baud Rate from this point forward.
- Temporary: Utilizing the serial connection at the existing Baud Rate, send the specific command byte to have WLED temporarily change to a new Baud Rate. This Baud Rate is temporary and will be reset to the default or persistent setting on reboot.

Byte | Baud Rate
--- | ---
`0xB0` | 115200
`0xB1` | 230400
`0xB2` | 460800
`0xB3` | 500000
`0xB4` | 576000
`0xB5` | 921600
`0xB6` | 1000000
`0xB7` | 1500000
- *Note:* Keep at 115200 to use Improv. Some boards may not support high rates.
        
        
        

#### Debugging

Compile with the `-D WLED_DEBUG` build flag to enable serial debugging using `DEBUG_PRINTLN(x)` macros.  
This will reserve pin GPIO1, therefore it cannot be used for other purposes when debugging.
