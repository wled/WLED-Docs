---
title: Remote Access / IFTTT
hide:
  # - navigation
  # - toc
---

WLED is open-source, DIY software. This means all services are hosted locally on your ESP8266/32.
Therefore you can only control your lights from within your local (home) network.

If you need to control WLED from anywhere (the public internet) you can do so in multiple ways, some requiring additional hardware:

### 1. Home Automation systems

If you add your WLED device to your Home Automation system (e.g. Home Assistant or ioBroker), you can control WLED remotely if you have set up remote access for your Home Automation system, for example via Nabu Casa.

### 2. Amazon Echo device
If you have set up your Alexa device to control WLED, you can just use the Alexa App or another Echo device linked to your account to control your lights (on/off and brightness only)

### 3. Reverse Proxy

If you have a device capable running a reverse proxy in your local network,
you can expose WLED safely over public internet.
This allows you to control lighting from anywhere on the globe.
See [Accessing WLED over Internet](/advanced/access-over-internet) for details.

Additionally, this opens up many new possibilities for automation! You can use a service like [IFTTT](https://ifttt.com/) Webhooks to send automated WLED API calls that can do anything from turning on the lights at a set time to changing their color if you get a new email!

### 4. Hue sync

If you have a Philips hue setup and sync WLED to it, you can control your WLED lights in any way it's possible to control your hue lights (hue App, Alexa (including colors), any other service that uses Philips hue API)
