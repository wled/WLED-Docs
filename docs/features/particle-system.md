---
title: Particle System
---

The Particle System is a physics-based effects engine built into WLED. It simulates many independent particles — each with its own position, velocity, size, age and color — and renders them onto your LED strip or matrix in real time.

WLED includes both a **1D Particle System** (for strips) and a **2D Particle System** (for matrices). The code is highly optimized for speed so it can be used with well over a thousand particles at high frame rates.

Since the animations are based on particle properties with some sprinkled in randomness for a more natural behaviour, all "PS" effects are random and undeterministic in nature: the visuals generated never repeat. If you want two segments with particle effects to look identical, use the "Copy Segment" effect.

---

## How it works

Each frame, the engine:

1. Spawns new particles and ages existing particles - old particles fade out and die
2. Updates every particle's position based on its current velocity and checks for wall collisions.
3. Applies forces (gravity, drag, wind, etc.) depending on the active effect.
4. Handles collisions between particles where enabled.
5. Renders particles onto the LED output using brightness fall-off from the particle center.

### Rendering

Particles of size "0" are rendered to a single pixel. A size of "1" uses two/four pixels for smooth movement.
Larger particles use quared-distance fall-off rendering: in 2D this means they render as shaded circles/ellipses.

The color of each particle is added on top of already rendered ones creating fluid animation - when using a diffuser to blur individual LEDs this creates very fluid and dynamic animations.

### Collisions

Particles can collide with walls or with other particles if enabled. The engine uses mass-ratio based collision response: a larger particle pushes a smaller one proportionally to the mass difference, rather than applying equal and opposite forces. This makes interactions feel more physically realistic.

When collisions are enabled, each particle needs to check the proximity to each other particle: this can result in tens of thousands of checks for every frame and uses a lot of processing power. The rendering speed can therefore slow down significantly. Reducing the number of particles using the effect sliders is recommended if collisions are enabled.

---

## 1D Particle System

The 1D Particle System works on standard 1D LED segments. Effects include things like sparks, rain, fire, and bouncing balls along a single strip.

**2D mapping:** 1D particle effects support the `map1D2D` option, which maps the 1D output onto a 2D segment using various patterns. This lets you use 1D physics effects on a matrix.

---

## 2D Particle System

The 2D Particle System requires a 2D segment configured in WLED. Effects render directly onto the X/Y grid of the matrix.

Available 2D particle effects include fire, fireworks, meteor, galaxy, waterfall, ballpit, and more.

---

## Memory usage

The Particle System allocates memory dynamically per segment based on the number of used particles which depends on the effect and segment size. On larger setups with many particles or multiple segments, PSRAM is recommended. The particle system will try its best to run if not enough RAM is available by reducing the particle count automatically - if even that fails the effect fails and falls back to "Solid".

---

## Effect controls

Since particle effects are based on physics parameters they can be tuned a lot more than normal effects by using the effect sliders.
Each effect uses different slider controls such as:

- Gravity strength and direction
- Particle size
- Particle lifetime / spawn rate
- Collision on/off
- Wrap-around edges on/off

The default slider settings were chosen such that the effect looks nice on many different setups but often can be optimized for a specific situation. A description of what each slider/checkmark does for each effect is described [here](/features/effects).

