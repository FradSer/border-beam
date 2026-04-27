# border-beam

A shadcn registry that ships an animated border beam effect, refactored from
[Jakubantalik/border-beam](https://github.com/Jakubantalik/border-beam) (MIT)
into static, registry-native CSS. No runtime `<style>` injection, no
per-instance `@property`, no npm dependency on the upstream package.

## Install

```bash
npx shadcn@latest add https://border-beam.vercel.app/r/border-beam.json
```

The CLI places `border-beam.tsx` and `border-beam.css` in
`components/ui/`, adds the `--beam-*` theme tokens to your `:root` and
`.dark` blocks, and updates nothing else. The component has no npm
dependencies beyond React.

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
| `size` | `'sm' \| 'md'` | `'md'` | Visual preset (sm: button-sized, md: card-sized) |
| `colorVariant` | `'colorful' \| 'mono' \| 'ocean' \| 'sunset'` | `'colorful'` | Color palette |
| `active` | `boolean` | `true` | Toggles fade-in / fade-out animation |
| `staticColors` | `boolean` | `false` | Disables the hue-shift filter; auto-true for `mono` |
| `borderRadius` | `number` | auto-detect | Border radius in px (read from first child if omitted) |
| `duration` | `number` | `1.96` | Spin period in seconds |
| `strength` | `number` (0-1) | `1` | Overall opacity multiplier |
| `brightness` | `number` | `1.3` | `filter: brightness(...)` applied during hue-shift |
| `saturation` | `number` | theme-derived | `filter: saturate(...)`; falls back to `--beam-saturation` from `:root` / `.dark` |
| `hueRange` | `number` | `30` | Hue rotation range in degrees |
| `onActivate` | `() => void` | – | Fires when fade-in animation ends |
| `onDeactivate` | `() => void` | – | Fires when fade-out animation ends |

All other `HTMLAttributes<HTMLDivElement>` are forwarded to the wrapper.

## Browser support

The animation requires CSS Houdini `@property`:

- Chrome / Edge 85+
- Safari 15.4+
- Firefox 128+

In unsupported browsers the component renders without the animated beam
(no crash, no errors).

## Differences from Jakubantalik/border-beam

This registry version preserves the visual design and props API, but
re-implements the runtime:

- **No `useId()`** — all CSS selectors are global (`[data-beam]`,
  `[data-variant="..."]`, `[data-size="..."]`); each element holds its own
  inheriting custom-property value, which is what gives multi-instance
  independent rotation.
- **No `<style>` injection** — CSS ships statically via the shadcn
  registry pipeline.
- **No `prefers-color-scheme` listener** — light/dark theming uses
  shadcn's `.dark` class via `cssVars`.
- **No `MutationObserver`** — a single `useLayoutEffect` reads the child's
  `border-radius` once on mount.
- **`size: "line"` not yet supported** — planned as a v0.2 follow-up
  (line variant has its own animation system with five custom keyframes
  and six additional `@property` declarations).

## Customizing

The visual palettes are defined in
[`scripts/generate-css.mjs`](./scripts/generate-css.mjs). To tweak colors:

1. Edit the palette tables in that file.
2. Run `pnpm generate:css` to regenerate
   `registry/new-york/ui/border-beam.css`.
3. Run `pnpm registry:build` to rebuild the JSON endpoint.

## Credits

Original visual design and CSS technique by
[Jakub Antalik](https://github.com/Jakubantalik) — see
[`Jakubantalik/border-beam`](https://github.com/Jakubantalik/border-beam).
Refactor for shadcn registry by
[Frad Lee](https://github.com/FradSer).

Both portions are released under MIT — see [LICENSE](./LICENSE).
