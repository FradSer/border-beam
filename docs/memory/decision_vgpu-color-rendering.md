---
name: vgpu-color-rendering
category: decision
summary: border-beam uses vgpu for the dynamic color layer while preserving static CSS geometry and fallback
source: border-beam
created: 2026-08-28
updated: 2026-08-28
---

## Fact

All animated border, line, and pulse variants render their dynamic color layer with vgpu/WebGPU. Static or mono palettes still advance geometry in the shader while disabling hue rotation. The WGSL shader is generated from the same upstream-derived palette data as the CSS. Existing CSS masks, geometry, opacity, pulse driver, and static palettes remain the source of truth for fallback behavior.

## How to apply

- `registry/new-york/ui/beam-color.wgsl` is the shader source; validate it with `npx vgpu check ... --require-validation`.
- `registry/new-york/ui/beam-color-renderer.ts` owns the shared browser GPU context and frame loop, and reference-counts each canvas surface for React Strict Mode cleanup.
- `next.config.ts` registers the vgpu WGSL loader for Turbopack, and `vgpu-env.d.ts` provides WGSL/WebGPU types.
- `scripts/generate-css.mjs` remains the CSS source of truth. Generated `border-beam.css` disables CSS color layers once `data-vgpu-colors` is active, while the shader advances geometry and color time for every animated palette.
- Registry metadata includes `vgpu` and ships the renderer plus WGSL file.

## Verification

`pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`, `pnpm registry:build`, `npx vgpu check registry/new-york/ui/beam-color.wgsl --require-validation`, and an agent-browser WebGPU smoke test all passed.
