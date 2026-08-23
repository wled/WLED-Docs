---
title: WebSocket
hide:
  # - navigation
  # - toc
---

!!! info "Version Info"
    Since WLED 0.10.2, a WebSocket server is enabled by default and can be used to access a subset of the [JSON API](/interfaces/json-api).

The server is available at the `/ws` endpoint, you can access it like `ws://[WLED-IP]/ws`.

You may send any JSON state update to the socket.
On change of the lighting state, the server will send a JSON object containing the state and info objects (this is equivalent to HTTP GET `/json/si`) to all connected clients. This object will also be sent to a client upon connecting.

You can manually request the full JSON state object by sending `{"v":true}` to the websocket.

You can also request a live stream of the LED values (e.g. the "Peek" feature of WLED-UI) by sending `{"lv":true}` to the websocket. Only one client can receive this at a time, if a new client requests it the stream will stop for the previous client (but the websocket will stay connected).

### The old /json/live endpoint

HTTP GET `/json/live` used to return the same LED values as the websocket stream. It is deprecated and no longer included in the standard builds since WLED 0.15. It only exists in custom builds compiled with `-D WLED_ENABLE_JSONLIVE` in `build_flags`, and builds made without WebSockets (`-D WLED_DISABLE_WEBSOCKETS`) enable it automatically as a fallback.

If you are polling `/json/live`, switch to the websocket stream: it is faster, and it is what the built-in preview uses. Both interfaces send at most 256 LED values, longer setups are downsampled to every n-th LED.

There can be a maximum of 4 clients connected at a time. If a fifth client connects, a different client will be disconnected. On ESP8266, it is recommended to have no more than 2 clients connected simultaneously.
