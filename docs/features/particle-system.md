---
title: Particle System
---

The Particle System is a physics-based effects engine built into WLED. It simulates many independent particles — each with its own position, velocity, and size — and renders them onto your LED strip or matrix in real time.

WLED includes both a **1D Particle System** (for strips) and a **2D Particle System** (for matrices).

---

## How it works

Each frame, the engine:

1. Updates every particle's position based on its velocity.
2. Applies forces (gravity, drag, wind, etc.) depending on the active effect.
3. Handles collisions between particles where enabled.
4. Renders particles onto the LED output using brightness fall-off based on distance.

### Rendering (v0.16 improvement)

Large particles use **squared-distance ellipse rendering** instead of the blur-based method used in older versions. This is more accurate and can improve rendering speed by up to **30% FPS** on dense particle effects.

### Collisions

When particle collisions are enabled, the engine uses **mass-ratio based collision response**: a larger particle pushes a smaller one proportionally to the mass difference, rather than applying equal and opposite forces. This makes interactions feel more physically realistic.

---

## 1D Particle System

The 1D Particle System works on standard 1D LED segments. Effects include things like sparks, rain, fire, and bouncing balls along a single strip.

**2D mapping:** 1D particle effects support the `map1D2D` option, which maps the 1D output onto a 2D segment using various patterns (line, zigzag, circle, etc.). This lets you use 1D physics effects on a matrix.

---

## 2D Particle System

The 2D Particle System requires a **2D segment** configured in WLED. Effects render directly onto the X/Y grid of the matrix.

Available 2D particle effects include fireworks, sprinklers, waterfall, pinball, and more.

---

## Memory usage

The Particle System allocates memory **dynamically per segment** based on the number of active particles. On complex setups with many particles or multiple segments, **PSRAM is recommended** (and required on some configurations). Devices without enough free RAM will reduce the particle count automatically or skip the effect.

---

## Effect controls

Particle System effects expose standard WLED effect sliders and toggles (speed, intensity, palette), plus effect-specific controls such as:

- Gravity strength and direction
- Particle size
- Particle lifetime / spawn rate
- Collision on/off
- Wrap-around edges on/off

Controls vary by individual effect.

---

## Tips

- For best results on large matrices (32×32 and above), use an ESP32 with PSRAM.
- 1D Particle System effects run fine on ESP8266 for shorter strips.
- If an effect runs slowly, try reducing the segment size or lowering the particle count via the intensity slider.
