---
title: Blynk
hide:
  # - navigation
  # - toc
---

!!! warning
    The official Blynk v1 server is shut down as of January 2023. WLED v0.14.0-b1 binaries no longer have Blynk support enabled by default.
    This only works with the _legacy_ Blynk app, for which new signups have been closed by the Blynk developer. WLED will either move to Blynk 2.0 or a different solution soon.

You can use the free (if you only use it for 1 WLED light) IoT cloud Blynk to control your WLED Lights with the beautiful Blynk app for Android and iOS!

With Blynk, you can also even control your lights when you are not connected to your home network!

## Installation

- Download the Blynk (legacy) app from the [Play Store](https://play.google.com/store/apps/details?id=cc.blynk) or the [App Store](https://itunes.apple.com/us/app/blynk-iot-for-arduino-esp32/id808760481?mt=8)
- Scan this QR code with the app:

![QR-Code](https://image.ibb.co/d4ASAp/clone_936213617.png)

- Paste the device auth token Blynk sends to your e-mail into the WLED sync settings (only one ESP!)

You can use the sync button in Blynk to sync other WLED ESPs, just like with the web UIs!

If you have doubts about the security of using a 3rd party IoT cloud, don't worry. WLED will only attempt to connect to Blynk if you put the device token string into Sync settings! Keep in mind that your ESP needs to connect to an external server, which may cause lag.
