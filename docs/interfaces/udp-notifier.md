---
title: WLED UDP Sync
hide:
  # - navigation
  # - toc
---

## Latest UDP Notifier Protocol

WLED 16.0.1 sends notifier protocol version 12. 
A version-12 notification message has a 41-byte header followed by a variable number of 36-byte segment records. 
Byte 39 contains the active segment count. Byte 40 contains the segment record size. 

The UDP message has the sender's segment capacity, not its active segment count. 
The receiver decodes only the active segment records advertised in byte 39, and deactivates additional segments.

The version-12 UDP SYNC notification packet size is `41 + 36 × getMaxSegments()` bytes.

WLED can only sync up to 39 active segments, due to a message size limitation in the underlying espressif framework.

### Usage

The UDP notifier function of WLED makes it easy to sync multiple lights to the same color/effect, enabled by default.
You can set the specific behavior of it in Sync settings, also you can choose if all aspects or only brightness/color/effects are applied.

Additionally, there is a "Sync" quick toggle for it in the main control UI!
In UI settings, you can set whether this button only turns on/off sending (default) or also receiving, with the option `Sync button toggles both send and receive`.

If your sync settings are not the way you like on boot, check the `WLED Broadcast` section in Sync settings, where you can specify what is sent and received by default:

#### Receiving settings

| Setting | Description |
| --- | --- |
Receive Brightness | If there is a sync notification, whether its brightness should be applied
Color | Whether the color of the synced device should be applied
Effects | Whether the effect settings should be applied

If all checkboxes are disabled, nothing is received by default after each boot. If the sync is toggled on in the main UI _and_ the corresponding checkbox in UI settings is checked, everything is received.

A sync receiver will not assume the state of the last sender directly after booting, a new packet must be send for it to react.

#### Sending settings

| Setting | Description |
| --- | --- |
Send on direct change | Whether to send a sync notification when state changed via the web UI or API
Send on button press | Whether to send sync when toggled by the physical hardware button
Send Alexa notifications | Whether to send sync after changed by Alexa (you may use Alexa groups instead)
Send Hue notifications | Whether to send sync after a connected Philips light changed
Send Macro notifications | Whether to send sync after a macro was triggered
Send notifications twice | Sends notifications twice (if you have issues with UDP packet loss)

The quick toggle in the main UI will only apply to direct changes (UI + API), all other sync type sending behavior remains unaffected.

You can easily group WLED devices (for example all in one room) by changing the UDP port of all devices you want in that group.

#### Sync groups

8 Sync groups are available. This allows syncing select instances only without changing the UDP port.  
For example, you might use one sync group per room you use WLED devices in.  
Make sure the sender and receiver you want to sync both have the same sync group ticked (a sender can send to multiple groups and a receiver can listen to multiple groups).  

Sync packets received from pre-0.13.0 instances are treated as if sent in sync group 1 only.

### Protocol description

!!! warning
    _Note: this info is partly out of date, see updated functionality in the code ([udp.cpp](https://github.com/wled/WLED/blob/master/wled00/udp.cpp))_

When enabled, the module where a value was changed will send an UDP broadcast to a port (default 21324).
Other modules that listen on this port will set themselves to the same color.

For interoperability, the protocol was designed so that even modules with different WLED versions can sync.
Therefore, if a WLED 0.14.0 system receives a WLED 0.4 UDP notification it will apply the primary color but keep its current secondary color.

Byte offsets are zero-based.

| Byte Index | Var Name | Description | Notifier Version |
| --- | --- | --- | --- |
0 | \- | Packet Purpose Byte`*` | 0
1 | callMode | Packet Reason`***` | 0
2 | bri | Master Brightness | 0
3 | col[0] | Primary Red Value | 0
4 | col[1] | Primary Green Value | 0
5 | col[2] | Primary Blue Value | 0
6 | nightlightActive | Nightlight running? | 0
7 | nightlightDelayMins | Nightlight Time | 0
8 | effectCurrent | Effect Index | 0
9 | effectSpeed | Effect Speed | 0
10 | white | Primary White Value | 1
11 | \- | Version Byte`****` <br/> <i> Notifier protocol version; `12` in WLED 0.14.1 </i> | 1
12 | colSec[0] | Secondary Red Value | 2
13 | colSec[1] | Secondary Green Value | 2
14 | colSec[2] | Secondary Blue Value | 2
15 | whiteSec | Secondary White Value | 2
16 | effectIntensity | Effect Intensity | 3
17-18 | transitionDelay | Transition duration  <br/> in milliseconds **little-endian**: low byte first | 4
19 | effectPalette | palette | 5
20–23 | | Tertiary RGBW color | 
24 | | Follow-up/retransmission flag |
25–28 | | Effect timebase in milliseconds, big-endian |
29 | | Time-source identifier |
30–33 | | Unix time in seconds, big-endian |
34–35 | | Millisecond component, big-endian |
36 | | Send-group bitmask; bit 0 represents group 1 |
37–38 | | CCT encoding `**` |
39 | | Active segment count | 11
40 | | Segment record size; `36` for version 12 | 11
41+ | | Variable number of Segment records | 11

`*` The notifier protocol is only used if this byte is 0. Otherwise, one of the [UDP Realtime](/interfaces/udp-realtime) protocols will be used.

`**` CCT byte 37:  
- `0`: byte 38 contains CCT in the range 0–255.
- `1–254`: bytes 37–38 contain a big-endian Kelvin value.
- `255`: no valid header CCT value.

`***` The callMode variable specifies the reason for the notification.
Every color update has the potential to trigger a notification.


| callMode | Description | Behavior | Comments
| --- | --- | --- | --- |
0 | Initial Boot | Do not notify |
1 | Direct Change via UI or API | notifyDirect? |
2 | Button was pressed | notifyButton? |
3 | Update by other notification | Do not notify | 
4 | Nightlight activated | notifyDirect? |
5 | Other (Req. with &NN) | Do not notify |
6 | Effect changed | notifyDirect? | unused legacy
7 | Hue light changed | notifyHue? |
8 | Preset Cycle active | notifyDirect? | unused legacy
9 | Updated via Blynk | notifyDirect? | unused legacy
9 | Updated via Blynk | notifyDirect? | unused legacy
10 | Alexa | notifyDirect? |
11 | | WebSocket-only | not a notifier reason
12 | Button/IR preset | notifyDirect? |


`****` This is the version of the UDP protocol.

| UDP Version | Description | WLED Version |
| --- | --- | --- |
0 | Basic Support | 0.3
1 | White Value supported | 0.4p
2 | Secondary Color supported | 0.4
3 | Effect Intensity supported | 0.5.0
4 | Transition Time supported | 0.6.0
5 | Palettes supported | 0.8.0
6 | Follow-up flag and effect timebase |
7 | Tertiary color |
8 | System-time synchronization |
9 | Sync-group bitmask |
10 | CCT |
11 | Segment records; released WLED 0.13.x uses 28-byte records |
12 | 36-byte records with extended options, custom controls, and 2D bounds |

