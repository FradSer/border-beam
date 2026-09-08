---
name: Pulse composite requires its breathing driver
description: GPU initialization must not stop the preserved CSS pulse geometry
type: project
---

## Why

GPU canvases currently use a thin edge mask while the upstream CSS inner and bloom composite remains visible. Stopping the shared pulse driver on GPU initialization freezes those visible CSS layers and makes Pulse appear static.

## How to apply

Keep the shared CSS breathing driver active for visible active/fading pulse instances regardless of GPU availability. Retain offscreen, inactive, and reduced-motion guards. Validate actual changing geometry, not only selected preset attributes, with `node --test tests/pulse-animation.test.mjs`. Rebuild registry JSON after component changes.

## Related

[[../features/color-animation.feature]]
