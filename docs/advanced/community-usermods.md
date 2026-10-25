---
title: Community Usermods
---

Usermods written and maintained by the community, outside the WLED repository. WLED's own usermods live in its [`usermods/` folder](https://github.com/wled/WLED/tree/main/usermods) instead. Either kind needs a [custom build](/advanced/custom-features#enabling-usermods) to use.

!!! warning "Community content, use at your own risk"
    These usermods come from community members, not the WLED team. The WLED project doesn't review, test, endorse or support them, so for help or bug reports, open an issue on the usermod's own repository. You're responsible for what you run on your devices.

    Read a usermod's source before you flash it, and prefer building it yourself over a binary from a stranger. It's C++ compiled into your firmware, with full access to the device, so a bad one can brick it or expose your network. (1)
    { .annotate }

    1.  There's no sandbox, and a usermod can do things its description doesn't mention.

## Third-party usermods

| Name | Description | Author | Platforms | License |
|---|---|---|---|---|
| [M5StickC Plus AXP192 Power](https://github.com/martindell/wled-m5stickc-plus-power) | Turns on the M5StickC Plus 5V output at startup<br/>_Safe LED load unverified_ | @martindell | esp32 | EUPL-1.2 |
| [PowerManager](https://github.com/intermittech/wled-usermod-powermanager) | Relays and MOSFETs that follow segment on/off | @intermittech | esp32 | EUPL-1.2 |
| [Segment Power Sync](https://github.com/sharn25/wled-segment-power-sync) | Keeps segment power in sync with master power | @sharn25 | both | MIT |
| [Sensor Hub](https://github.com/lost-hope/sensor-hub) | Shows multiple sensors in the Info tab, MQTT and the API | @lost-hope | both | EUPL-1.2 |
| [SHTC3_v2](https://github.com/lost-hope/SHTC3_v2) | SHTC3 temperature and humidity sensor, with MQTT | @lost-hope | both | EUPL-1.2 |
| [wizlights](https://github.com/eibanez/wled-usermod-wizlights) | Control Wiz lights from WLED | @eibanez | both | EUPL-1.2 |
| [Word Clock FX](https://github.com/AustinSaintAubin/wled-usermod-word-clock-fx-16x16) | 16×16 word clock effect with weather words | @AustinSaintAubin | esp32 | MIT |

## Write your own

[Writing a usermod](/advanced/custom-features#writing-a-usermod) walks you through it, starting from the [wled-usermod-example](https://github.com/wled/wled-usermod-example) template. Just adding an effect? The built-in [user_fx](https://github.com/wled/WLED/tree/main/usermods/user_fx) usermod is the quickest start: add your effect to it and enable it with `custom_usermods = user_fx`.

## Add your usermod

Open a pull request to [WLED-Docs](https://github.com/wled/WLED-Docs) that adds one row to the table, in alphabetical order:

```markdown
| [Name](https://github.com/you/your-usermod) | What it does, in a few words<br/>_Optional short note_ | @yourname | esp32 | GPLv3 |
```

Platforms is `esp32`, `esp8266`, or `both`. Keep the description under ten words. If something is important to know before installing, add it as a short note after `<br/>`, in italics. Everything else goes in your README.

Until it's listed here, people can still find your usermod if you tag the GitHub repository with the [`wled-usermod`](https://github.com/topics/wled-usermod) topic.

### Requesting an automated code review

To request an AI code review (CodeRabbit) on your usermod, post this as a separate comment in your new PR:

```text
@coderabbitai please perform an external usermod code inspection for this PR.
Include the inspected revision, files inspected, findings, and coverage limits in your reply.
```

Then wait a few minutes 👀, and CodeRabbit should post a review summary for your external usermod.

## Choosing a license

A usermod is compiled into the WLED firmware, so it becomes part of a modified WLED build. WLED uses the **EUPL-1.2** licence. If you share a firmware binary that includes your usermod, also share the source code for that build and use EUPL-1.2 or a compatible open-source licence for the combined firmware.

For example:

- Your usermod repository may say **MIT**, but a `WLED-with-my-usermod.bin` file is not an MIT-only WLED build. It still includes WLED and its EUPL-1.2 requirements.
- MIT matters more when somebody reuses the usermod source code *independently* of WLED, possibly in a closed-source project.
- If you want a simple matching choice for a usermod that can be distributed with WLED, use **EUPL-1.2**.
- [Other compatible choices](https://eupl.eu/1.2/en) include **GPLv2**, **GPLv3**, **LGPL v2.1/v3**, and **MPL 2.0**.

This only matters when someone is distributing the firmware that includes your usermod. Building a usermod for your own device and keeping it private does not require publishing it.

