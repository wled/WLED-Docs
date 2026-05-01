---
title: OTA Lock
hide:
  # - navigation
  # - toc
---

WLED security model is based on assumption that it is run on a trusted network, and in most cases, anyone having a network access to a WLED device has permissions for any operation.
OTA Lock is an exception to this rule.
OTA Lock allows limiting users who can perform OTA by requiring a password before allowing an update.
This can be used for additional security when a device is accessed from the public internet. See [Remote Access / IFTTT](/advanced/remote-access-ifttt) for more information.
This page will tell you what you can expect by WLEDs security.

### TLDR - what to do?

A: If you just operate WLED within a local network and/or with a secured Access Point (change the default password "wled1234"!!) you are fine.

If you have configured a port forwarding to control WLED from outside your local subnet, **please make sure the setting "OTA Lock" is enabled and you have changed the default OTA password "wledota"! Also, NEVER edit sensitive data (like WiFi credentials) while connected via the port forwarding!**

### 1: Is the connection itself safe?

A: Technically not. The ESP8266 uses unencrypted HTTP traffic. Implementing HTTPS would take too much processing power and memory on this little device. This means an attacker could read your passwords during transmit. Therefore, to be safe, please do NOT change the AP/Client WiFi/OTA password from outside of your LAN via a forwarded port. If you are at home, you should be safe if your WiFi is secured. You can change any other setting while you're away, though. WLED doesn't send your actual password to the settings page, just its length.

### 2: What do you mean by secure then?

A: WLED comes with the ability to carry out a software update via WiFi (OTA). However, no one must be able to flash a malicious new binary firmware to steal your WiFi credentials or make your ESP part of a botnet. Therefore, you should enable the "OTA Lock" setting and change its default passphrase "wledota".

### 3: Can I protect the light configuration?

A: Currently not. This is not sensitive information like your WiFi password. Anyone with your IP and port can control the lights. Open an issue if it should ever happen that somebody plays with your lights. I might consider adding an optional password lock then. For now, it is way too cumbersome for what it does.

### 4: Can I protect the settings page?
A: Yes, you can set a settings PIN in the `Security & Update setup`. Remember that WLED uses unencrypted transmission, so be prutent when selecting a PIN and do NOT reuse banking, etc. pin. After changing or entering the PIN, WLED will stay unlocked for 15 minutes before asking again when accessing any of the settings pages.

### 5: I want to do a software update, but it says "OTA lock active"?

A: You need to go to the settings page. Untick the "OTA Lock" setting and input your passphrase in the field below it.
Now apply the settings and reboot. After that you can carry out the software update. Don't forget to re-enable OTA Lock afterwards! To enable, you don't have to enter the passphrase, unless you want to change it. For the lock to work you need to apply and reboot again.

### 6: Why is this OTA lock stuff that important?

A: Your unencrypted WiFi password is stored in the module's EEPROM. It would be easy to "update" the software to a malicious version which sends your password to the attacker. OTA Lock makes sure only those with the passphrase may carry out a software update. And yes, while you can disable OTA lock by doing a factory reset, this would also kill the WiFi connection to the attacker.

### 7: Anything else?

A: A personal tip from me is not to give anyone your IP to control the software who you do not wish to do so on a regular basis. It is not critical from a security standpoint, but it can be very annoying if someone plays with your lights, or even worse, change your AP credentials to the point where you can no longer access the module except via USB.
