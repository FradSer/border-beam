# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing Next.js 16 application using React 19, Tailwind CSS v4, shadcn registry tooling, TypeScript, and vgpu/WGSL.

## Users

Primary users are React developers who use shadcn/ui and want a reusable animated border-beam component they can install from a registry.

Secondary users are frontend developers and designers evaluating the component through the online demo.

## Product Purpose

The project publishes a reusable BorderBeam component and demonstrates it in an interactive web page. Success means developers can install the registry item, use its existing component API, and see the intended Rotate and Pulse behavior across supported sizes, themes, and color variants.

## Positioning

The project combines upstream border-beam behavior and palette compatibility with static shadcn registry distribution and vgpu-powered color rendering. The color renderer must be able to fall back to CSS when WebGPU is unavailable.

## Operating Context

Developers install components with the shadcn CLI and use them in React applications. Maintainers edit palette data and regenerate CSS, WGSL, and registry JSON artifacts. Visitors use the demo to compare Rotate and Pulse families, change sizes and color variants, adjust strength, pause motion, switch themes, and copy installation or usage snippets.

## Capabilities and Constraints

- Preserve the upstream BorderBeam props, size types, color variants, themes, motion behavior, and pulse geometry.
- Support `sm`, `md`, `line`, `pulse-inner`, and `pulse-outside`.
- Support `colorful`, `mono`, `ocean`, and `sunset` variants with dark, light, and automatic theme handling.
- Use vgpu to render the complete color layers, including stroke, inner, and bloom data, from WGSL.
- Keep CSS responsible for layout, masks, clipping, opacity, stacking, and fade behavior.
- Generate CSS and WGSL from palette data in `scripts/generate-css.mjs`; do not edit generated CSS directly.
- Distribute the component through shadcn registry JSON in `public/r/`.
- Use a shared browser GPU context and frame loop for multiple instances.
- Provide a usable CSS fallback when WebGPU or a GPU adapter is unavailable.
- Respect reduced-motion preferences and keep decorative layers out of the accessibility tree.
- Validate WGSL with `npx vgpu check` and verify the real adapter with `npx vgpu doctor`.

## Brand Commitments

- Product name: `border-beam`.
- Maintain the upstream reference and visual behavior from `Jakub Antalik`'s border-beam package: https://github.com/Jakubantalik/Libraries/tree/main/packages/border-beam.
- Keep shadcn registry distribution as the primary installation model.
- Keep the online demo focused on the component itself rather than inventing unrelated product branding.

## Evidence on Hand

- `registry/new-york/ui/border-beam.tsx` — component API and behavior.
- `registry/new-york/ui/border-beam.css` — generated CSS layers and masks.
- `registry/new-york/ui/beam-color.wgsl` — generated GPU color shader.
- `registry/new-york/ui/beam-color-renderer.ts` — vgpu runtime and lifecycle management.
- `registry/new-york/ui/pulse-driver.ts` — shared pulse motion driver.
- `scripts/generate-css.mjs` — palette, CSS, and WGSL source of truth.
- `registry.json` and `public/r/` — shadcn registry metadata and artifacts.
- `features/` — BDD scenarios for color rendering and demo behavior.
- Upstream demo: https://beam.jakubantalik.com/.

## Product Principles

- Preserve upstream behavior before adding new abstraction.
- Keep the install path simple for shadcn users.
- Render color data on the GPU without sacrificing a usable fallback.
- Keep generated artifacts tied to one palette source of truth.
- Treat animation as decorative: it must remain accessible, controllable, and safe to disable.

## Accessibility & Inclusion

The demo and component must remain keyboard usable, expose meaningful labels for controls, keep decorative GPU canvases hidden from assistive technology, support `prefers-reduced-motion`, and preserve a functional CSS experience when WebGPU is unavailable.
