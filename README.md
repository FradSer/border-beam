# border-beam

Animated borders for React and shadcn/ui, powered by **WGSL shaders and WebGPU**.
Built by [Frad](https://github.com/FradSer).

One WGSL (WebGPU Shading Language) fragment shader renders moving color and glow
across three layers: stroke, inner glow, and bloom. A shared vgpu renderer runs
the shader through WebGPU, while CSS preserves edge masks and compositing.
The WGSL ships inside a generated TypeScript module: no shader loader setup is
required. Browsers without a GPU adapter keep the animated CSS fallback.

Refactored from [Jakubantalik/border-beam](https://github.com/Jakubantalik/border-beam)
(MIT), preserving the upstream palette with registry-native CSS. No runtime
`<style>` injection or per-instance `@property`.

## Install

```bash
pnpm dlx shadcn@latest add https://border-beam.vercel.app/r/border-beam.json
```

Run the command in a Next.js project initialized with shadcn, then import
`BorderBeam` as shown below. No WGSL loader, `next.config.ts` change, or
project-level type declaration is required.

The CLI places `border-beam.tsx`, `beam-color-renderer.ts`,
`beam-color-shader.ts`, `beam-vgpu.js`, `beam-vgpu.d.ts`, `pulse-driver.ts`, and
`border-beam.css` in your configured UI directory. It adds the `--beam-*` theme tokens. No GPU runtime package,
Node adapter, or native build script needs to be installed or approved.
The shader ships as a generated TypeScript module, so consuming projects never
import a raw `.wgsl` file. Default and `src/` directory layouts use the same
command.

## Usage

```tsx
import { BorderBeam } from "@/components/ui/border-beam"

export function Demo() {
  return (
    <BorderBeam theme="auto">
      <div className="bg-card rounded-2xl p-6">Content</div>
    </BorderBeam>
  )
}
```

The component wraps its children. Border radius is auto-detected from the
first child's computed `border-top-left-radius`, or you can pass
`borderRadius` explicitly.

## Pre-wrapped variants

Ready-to-use combinations of `BorderBeam` with the canonical shadcn
primitives. Each one installs the underlying primitive (from the official
shadcn registry) plus the complete base beam installation:

```bash
pnpm dlx shadcn@latest add https://border-beam.vercel.app/r/border-beam-card.json
```

| Item                   | Wraps shadcn | Default beam size |
| ---------------------- | ------------ | ----------------- |
| `border-beam-button`   | Button       | `sm`              |
| `border-beam-card`     | Card         | `md`              |
| `border-beam-input`    | Input        | `sm`              |
| `border-beam-textarea` | Textarea     | `md`              |
| `border-beam-pulse-button` | Button    | `pulse-inner`     |
| `border-beam-pulse-card` | Card        | `pulse-inner`     |
| `border-beam-pulse-input` | Input      | `pulse-inner`     |
| `border-beam-pulse-textarea` | Textarea | `pulse-inner`   |

Each accepts the underlying primitive's full prop signature plus five
beam-specific props (prefixed `beam*` so they never collide with primitive
props like Button's `size`):

| Prop               | Default      |
| ------------------ | ------------ |
| `beamSize`         | per-component |
| `beamColorVariant` | `'colorful'` |
| `beamTheme`        | omitted      |
| `beamActive`       | `true`       |
| `beamClassName`    | –            |

`beamSize` accepts all five sizes on standard wrappers; pulse wrappers accept
only `pulse-inner` and `pulse-outside`. `beamTheme` accepts `dark`, `light`, or
`auto` (system preference). Primitive props, including `className`, apply to
the child; `beamClassName` applies to the outer beam wrapper. For `duration`,
`strength`, or other beam controls below, compose `BorderBeam` directly.

```tsx
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BorderBeamCard } from "@/components/ui/border-beam-card"

<BorderBeamCard beamColorVariant="ocean" beamTheme="auto">
  <CardHeader>
    <CardTitle>Hello</CardTitle>
  </CardHeader>
  <CardContent>Glowing card content.</CardContent>
</BorderBeamCard>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'line' \| 'pulse-inner' \| 'pulse-outside'` | `'md'` | Visual preset |
| `colorVariant` | `'colorful' \| 'mono' \| 'ocean' \| 'sunset'` | `'colorful'` | Color palette |
| `theme` | `'dark' \| 'light' \| 'auto'` | omitted | Explicit theme, or system preference with `auto` |
| `active` | `boolean` | `true` | Toggles fade-in / fade-out animation |
| `staticColors` | `boolean` | `false` | Disables the hue-shift filter; auto-true for `mono` |
| `borderRadius` | `number` | auto-detect | Border radius in px (read from first child if omitted) |
| `duration` | `number` | `1.96` / `3.1` / `2.3` | Rotate, line, or pulse cycle duration in seconds |
| `strength` | `number` (0-1) | `1` | Overall opacity multiplier |
| `brightness` | `number` | `1.3` | GPU/CSS brightness multiplier |
| `saturation` | `number` | theme-derived | GPU/CSS saturation multiplier |
| `hueRange` | `number` | `30` | GPU/CSS hue rotation range in degrees; capped at 13 for `line` |
| `onActivate` | `() => void` | – | Fires when fade-in ends, or immediately with reduced motion |
| `onDeactivate` | `() => void` | – | Fires when fade-out ends, or immediately with reduced motion |

All other `HTMLAttributes<HTMLDivElement>` are forwarded to the wrapper.

## Browser support

The CSS animation uses CSS Houdini `@property`, masks, and conic gradients.
WebGPU is optional; visual appearance depends on browser support for these CSS features.

All animated variants use WebGPU when available. Static or mono palettes keep
geometry and shader frame updates running while disabling hue rotation. The
upstream CSS composite remains active, while vgpu provides the animated color
pass. If WebGPU is unavailable, the component keeps the generated CSS
animation without throwing. Pulse variants keep the shared requestAnimationFrame
driver running for the preserved CSS composite, including when GPU rendering is active.
Rendering pauses offscreen and respects reduced-motion preferences.

## Differences from Jakubantalik/border-beam

This registry version preserves the visual design and props API, but
re-implements the runtime:

- CSS remains static and generated from `scripts/generate-css.mjs`.
- vgpu renders the dynamic color layer from the same palette tables in
  `registry/new-york/ui/beam-color.wgsl`; CSS retains the masks, opacity, and
  geometry.
- One shared browser GPU context and frame loop serve all beam canvases. A
  missing WebGPU adapter falls back to the generated CSS animation.
- The upstream CSS visual composite remains intact; the shared pulse driver
  animates its breathing geometry alongside the GPU color renderer.
- The registry ships the renderer, generated TypeScript shader module, and a
  bundle of the pinned vgpu browser API with its license and internal types.
  Authoring tools and Node adapters stay in this repository's development
  dependencies. Raw WGSL stays here for shader validation and regeneration.

## Develop locally

```bash
pnpm install
pnpm dev
```

Open the local URL printed by the development server. `pnpm build` checks the
production build; `pnpm lint` checks source conventions. Rebuild registry files
with `pnpm registry:build` after changing a distributed component.

Browser regressions use the existing `agent-browser` CLI. With the app running,
run `TEST_URL=http://localhost:3000 pnpm test` (adjust the port to match the server).
The pulse suite requires a WebGPU-capable browser adapter.

`pnpm test:install` runs a fresh Docker installation check against the public
registry. It creates default and `src/` Next.js projects, runs the install
command, verifies that no WGSL configuration or project-level ambient type declarations were added,
and checks types, production builds, and browser interactions. Set `BORDER_BEAM_REGISTRY_URL`
to test a candidate endpoint and `REGISTRY_TEST_OUTPUT` to choose the evidence
directory. The test removes only the container it creates.
It uses the latest pnpm by default; set `BORDER_BEAM_PNPM_VERSION=10` to check
the older supported major version.

## Customizing

The visual palettes and WGSL palette tables are defined in
[`scripts/generate-css.mjs`](./scripts/generate-css.mjs). To tweak colors:

1. Edit the palette tables in that file.
2. Run `pnpm generate:css` to regenerate CSS, `beam-color.wgsl`, and the
   loader-free `beam-color-shader.ts` module using the official vgpu loader.
3. Run `pnpm registry:build` to regenerate the pinned vgpu browser bundle and
   rebuild the JSON endpoint. The bundle generator preserves upstream licenses
   and rejects Node/native dependencies and external imports.

## Credits

Original visual design and CSS technique by
[Jakub Antalik](https://github.com/Jakubantalik) — see
[`Jakubantalik/border-beam`](https://github.com/Jakubantalik/border-beam).
Refactor for shadcn registry by
[Frad](https://github.com/FradSer).

Both portions are released under MIT — see [LICENSE](./LICENSE).
