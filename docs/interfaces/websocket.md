---
title: WebSocket
hide:
  # - navigation
  # - toc
---

WLED's WebSocket server gives you the [JSON API](/interfaces/json-api) over a persistent connection: you can send state changes and get state updates pushed to you, without polling. This is the interface to build a custom UI, dashboard widget or app on. Your client hears about every change immediately, including changes made from another phone, a button or a schedule. It is what the built-in web UI uses to stay in sync, and it also carries the live LED preview. It is enabled in every standard build. (1)
{ .annotate }

1.  The WebSocket server has been part of WLED since 0.10.2. Only custom builds compiled with `-D WLED_DISABLE_WEBSOCKETS` lack it.

The server is available at the `/ws` endpoint, so connect to `ws://[WLED-IP]/ws`. WLED has no TLS support, so there is no `wss://`. A browser page served over HTTPS is not allowed to open a plain `ws://` connection, so keep your dashboard on HTTP or behind a proxy that terminates TLS.

## Receiving State Updates

Upon connecting, the server sends a JSON object containing the state and info objects, equivalent to HTTP GET `/json/si`. From then on it sends the same object to all connected clients whenever the lighting state changes, no matter what caused the change. Listening to these pushes is all it takes to keep an external UI in sync. (1)
{ .annotate }

1.  Broadcasts are rate-limited to about one per second, so rapid changes are coalesced. You always end up with the latest state, but not with one message per change.

You can also request the state object manually by sending `{"v":true}`, the response goes only to your client.

## Sending Commands

Send any [JSON API](/interfaces/json-api) state update as a text message, for example `{"on":true,"bri":128}`. The server replies with either the updated state and info objects or a plain `{"success":true}`, depending on whether a broadcast to all clients is already imminent.

A message must fit into a single WebSocket frame. (1) If the device is momentarily out of JSON buffers, you get `{"error":3}`. Retry after a moment. Sending the text `p` returns `pong`, which can serve as an application-level heartbeat.
{ .annotate }

1.  At most 1428 bytes, 528 bytes on ESP8266. Larger messages are split across frames by the client and answered with `{"error":9}`, WLED does not reassemble them.

## Example

Everything above fits in a few lines of browser JavaScript:

```js
const ws = new WebSocket("ws://[WLED-IP]/ws");

// fires on connect and every time the light changes, from any source
ws.onmessage = (event) => {
  const { state } = JSON.parse(event.data);
  if (!state) return; // command acknowledgements are {"success":true}
  console.log(`power: ${state.on}, brightness: ${state.bri}`);
};

// turn on and dim, the confirmation arrives via onmessage
ws.onopen = () => ws.send(JSON.stringify({ on: true, bri: 128 }));
```

## Live LED Stream (Peek)

Send `{"lv":true}` to receive a live stream of the LED colors, the same stream the "Peek" feature of the web UI shows. Only one client receives the stream at a time; when a new client requests it, the previous client stops getting frames but stays connected. `{"lv":false}` stops the stream.

Frames arrive as binary messages, at most one every 40 ms:

| Byte(s) | Content |
|---|---|
| 0 | `L` |
| 1 | Version: `1` for strips, `2` for 2D matrices |
| 2, 3 | Width and height, only present in version `2` |
| remainder | 3 bytes R, G, B per LED. White is folded into the RGB values |

Long setups are downsampled to fit the frame. (1)
{ .annotate }

1.  Strips longer than 1024 LEDs (256 on ESP8266) only send every n-th LED. Matrices are sent at half or quarter resolution when they exceed the limit, the width and height bytes reflect that, rounded down. A downsampled matrix frame can be longer than width x height x 3 bytes, read exactly width x height pixels and ignore any trailing bytes. When a matrix dimension is not divisible by the downsampling factor, the sampler steps through LED indices rather than the advertised grid, so rows shift slightly and the preview of such matrices is a little distorted.

## Realtime Data Input

Binary messages to the socket are treated as realtime protocol packets. The first byte selects the protocol, the rest of the message is the packet itself: `2` for [DDP](/interfaces/ddp), which is the tested path, and `0` for [E1.31 (sACN)](/interfaces/e1.31-dmx) or `1` for Art-Net, both currently untested. This lets a client push realtime LED data over the existing WebSocket connection instead of opening a UDP path.

## Deprecated: /json/live

HTTP GET `/json/live` used to return the LED colors as JSON. It is deprecated and no longer included in the standard builds since WLED 0.15. (1) If you are polling it, switch to the `{"lv":true}` stream above.
{ .annotate }

1.  It only exists in custom builds compiled with `-D WLED_ENABLE_JSONLIVE` in `build_flags`. Builds made without WebSockets (`-D WLED_DISABLE_WEBSOCKETS`) enable it automatically as a fallback.

## Connection Limits

WLED keeps up to 8 clients connected on ESP32, and up to 3 on ESP8266. When a new client would exceed the limit, the oldest connection is closed. Each open connection costs RAM, so on ESP8266 keep concurrent clients to a minimum. The `ws` field of the [info object](/interfaces/json-api) reports how many clients are currently connected, or `-1` on builds without WebSockets.
