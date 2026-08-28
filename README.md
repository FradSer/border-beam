# border-beam

A shadcn registry that ships an animated border beam effect, refactored from
[Jakubantalik/border-beam](https://github.com/Jakubantalik/border-beam) (MIT)
into static, registry-native CSS with a vgpu-powered color renderer. No runtime
`<style>` injection or per-instance `@property`; the package remains compatible
with the upstream palette and keeps a static CSS fallback when WebGPU is unavailable.

## Install

```bash
npx shadcn@latest add https://border-beam.vercel.app/r/border-beam.json
```

The CLI places `border-beam.tsx`, `beam-color-renderer.ts`,
`beam-color.wgsl`, and `border-beam.css` in `components/ui/`, adds the
`--beam-*` theme tokens to your `:root` and `.dark` blocks, and installs the
`vgpu` runtime dependency. The WGSL file requires the loader setup documented
in `next.config.ts` for Next.js projects.

## Usage

```tsx
import { BorderBeam } from "@/components/ui/border-beam"

export function Demo() {
  return (
    <BorderBeam>
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
shadcn registry) plus `border-beam.tsx` + `border-beam.css`:

```bash
npx shadcn@latest add https://border-beam.vercel.app/r/border-beam-card.json
```

| Item                   | Wraps shadcn | Default beam size |
| ---------------------- | ------------ | ----------------- |
| `border-beam-button`   | Button       | `sm`              |
| `border-beam-card`     | Card         | `md`              |
| `border-beam-input`    | Input        | `sm`              |
| `border-beam-textarea` | Textarea     | `md`              |

Each accepts the underlying primitive's full prop signature plus four
beam-specific props (prefixed `beam*` so they never collide with primitive
props like Button's `size`):

| Prop               | Default      |
| ------------------ | ------------ |
| `beamSize`         | per-component |
| `beamColorVariant` | `'colorful'` |
| `beamActive`       | `true`       |
| `beamClassName`    | –            |

```tsx
import { BorderBeamCard } from "@/components/ui/border-beam-card"

<BorderBeamCard beamColorVariant="ocean">
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
| `active` | `boolean` | `true` | Toggles fade-in / fade-out animation |
| `staticColors` | `boolean` | `false` | Disables the hue-shift filter; auto-true for `mono` |
| `borderRadius` | `number` | auto-detect | Border radius in px (read from first child if omitted) |
| `duration` | `number` | `1.96` / `3.1` / `2.3` | Rotate, line, or pulse cycle duration in seconds |
| `strength` | `number` (0-1) | `1` | Overall opacity multiplier |
| `brightness` | `number` | `1.3` | GPU/CSS brightness multiplier |
| `saturation` | `number` | theme-derived | GPU/CSS saturation multiplier |
| `hueRange` | `number` | `30` | GPU/CSS hue rotation range in degrees |
| `onActivate` | `() => void` | – | Fires when fade-in animation ends |
| `onDeactivate` | `() => void` | – | Fires when fade-out animation ends |

All other `HTMLAttributes<HTMLDivElement>` are forwarded to the wrapper.

## Browser support

The CSS animation requires CSS Houdini `@property`:

- Chrome / Edge 85+
- Safari 15.4+
- Firefox 128+

Active non-mono rotate and line variants use WebGPU when available. If WebGPU
is unavailable, they keep the generated CSS animation without throwing. Pulse
variants continue to use the shared requestAnimationFrame driver.

## Differences from Jakubantalik/border-beam

This registry version preserves the visual design and props API, but
re-implements the runtime:

- CSS remains static and generated from `scripts/generate-css.mjs`.
- vgpu renders the dynamic color layer from the same palette tables in
  `registry/new-york/ui/beam-color.wgsl`; CSS retains the masks, opacity, and
  geometry.
- One shared browser GPU context and frame loop serve all beam canvases. A
  missing WebGPU adapter falls back to the generated CSS animation.
- Pulse breathing still uses the existing shared CSS custom-property driver.
- The registry ships the renderer, WGSL source, and `vgpu` dependency metadata.

## Customizing

The visual palettes and WGSL palette tables are defined in
[`scripts/generate-css.mjs`](./scripts/generate-css.mjs). To tweak colors:

1. Edit the palette tables in that file.
2. Run `pnpm generate:css` to regenerate the CSS and `beam-color.wgsl` files.
3. Run `pnpm registry:build` to rebuild the JSON endpoint.

## Credits

Original visual design and CSS technique by
[Jakub Antalik](https://github.com/Jakubantalik) — see
[`Jakubantalik/border-beam`](https://github.com/Jakubantalik/border-beam).
Refactor for shadcn registry by
[Frad Lee](https://github.com/FradSer).

Both portions are released under MIT — see [LICENSE](./LICENSE).
