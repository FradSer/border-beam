// Generates registry/new-york/ui/border-beam.css from palette data.
// Source-of-truth for color palettes; rerun this script after tweaking palettes.
//   pnpm run generate:css
// Run as part of `pnpm run registry:build` via the prebuild script.

import { writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, "../registry/new-york/ui/border-beam.css")

// ---- Palette data (md size; preserved from Jakubantalik/border-beam, MIT) ----

const mdPalettes = {
  colorful: [
    { color: "rgb(255, 50, 100)", pos: "33% -7.4%", size: "70px 40px" },
    { color: "rgb(40, 140, 255)", pos: "12% -5%", size: "60px 35px" },
    { color: "rgb(50, 200, 80)", pos: "2.1% 68.3%", size: "40px 70px" },
    { color: "rgb(30, 185, 170)", pos: "2.1% 68.3%", size: "20px 35px" },
    { color: "rgb(100, 70, 255)", pos: "74.4% 100%", size: "180px 32px" },
    { color: "rgb(40, 140, 255)", pos: "55% 100%", size: "85px 26px" },
    { color: "rgb(255, 120, 40)", pos: "93.9% 0%", size: "74px 32px" },
    { color: "rgb(240, 50, 180)", pos: "100% 27.1%", size: "26px 42px" },
    { color: "rgb(180, 40, 240)", pos: "100% 27.1%", size: "52px 48px" },
  ],
  mono: [
    { color: "rgb(180, 180, 180)", pos: "33% -7.4%", size: "70px 40px" },
    { color: "rgb(140, 140, 140)", pos: "12% -5%", size: "60px 35px" },
    { color: "rgb(160, 160, 160)", pos: "2.1% 68.3%", size: "40px 70px" },
    { color: "rgb(130, 130, 130)", pos: "2.1% 68.3%", size: "20px 35px" },
    { color: "rgb(170, 170, 170)", pos: "74.4% 100%", size: "180px 32px" },
    { color: "rgb(150, 150, 150)", pos: "55% 100%", size: "85px 26px" },
    { color: "rgb(190, 190, 190)", pos: "93.9% 0%", size: "74px 32px" },
    { color: "rgb(145, 145, 145)", pos: "100% 27.1%", size: "26px 42px" },
    { color: "rgb(165, 165, 165)", pos: "100% 27.1%", size: "52px 48px" },
  ],
  ocean: [
    { color: "rgb(100, 80, 220)", pos: "33% -7.4%", size: "70px 40px" },
    { color: "rgb(60, 120, 255)", pos: "12% -5%", size: "60px 35px" },
    { color: "rgb(80, 100, 200)", pos: "2.1% 68.3%", size: "40px 70px" },
    { color: "rgb(50, 140, 220)", pos: "2.1% 68.3%", size: "20px 35px" },
    { color: "rgb(120, 80, 255)", pos: "74.4% 100%", size: "180px 32px" },
    { color: "rgb(70, 130, 255)", pos: "55% 100%", size: "85px 26px" },
    { color: "rgb(140, 100, 240)", pos: "93.9% 0%", size: "74px 32px" },
    { color: "rgb(90, 110, 230)", pos: "100% 27.1%", size: "26px 42px" },
    { color: "rgb(130, 70, 255)", pos: "100% 27.1%", size: "52px 48px" },
  ],
  sunset: [
    { color: "rgb(255, 80, 50)", pos: "33% -7.4%", size: "70px 40px" },
    { color: "rgb(255, 160, 40)", pos: "12% -5%", size: "60px 35px" },
    { color: "rgb(255, 120, 60)", pos: "2.1% 68.3%", size: "40px 70px" },
    { color: "rgb(255, 200, 50)", pos: "2.1% 68.3%", size: "20px 35px" },
    { color: "rgb(255, 100, 80)", pos: "74.4% 100%", size: "180px 32px" },
    { color: "rgb(255, 180, 60)", pos: "55% 100%", size: "85px 26px" },
    { color: "rgb(255, 60, 60)", pos: "93.9% 0%", size: "74px 32px" },
    { color: "rgb(255, 140, 50)", pos: "100% 27.1%", size: "26px 42px" },
    { color: "rgb(255, 90, 70)", pos: "100% 27.1%", size: "52px 48px" },
  ],
}

const smPalettes = {
  colorful: {
    border: [
      { color: "rgb(50, 200, 80)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(30, 185, 170)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(255, 120, 40)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(100, 70, 255)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(240, 50, 180)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(180, 40, 240)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(40, 140, 255)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(255, 50, 100)", pos: "100% 27%", size: "11px 12px" },
    ],
    inner: [
      { color: "rgba(50, 200, 80, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(30, 185, 170, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(255, 120, 40, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(100, 70, 255, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(240, 50, 180, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(180, 40, 240, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(40, 140, 255, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(255, 50, 100, 0.3)", pos: "100% 27%", size: "11px 12px" },
    ],
  },
  mono: {
    border: [
      { color: "rgb(160, 160, 160)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(140, 140, 140)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(180, 180, 180)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(150, 150, 150)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(170, 170, 170)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(155, 155, 155)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(145, 145, 145)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(165, 165, 165)", pos: "100% 27%", size: "11px 12px" },
    ],
    inner: [
      { color: "rgba(160, 160, 160, 0.25)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(140, 140, 140, 0.22)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(180, 180, 180, 0.17)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(150, 150, 150, 0.17)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(170, 170, 170, 0.15)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(155, 155, 155, 0.20)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(145, 145, 145, 0.15)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(165, 165, 165, 0.15)", pos: "100% 27%", size: "11px 12px" },
    ],
  },
  ocean: {
    border: [
      { color: "rgb(60, 140, 200)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(50, 120, 180)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(100, 80, 220)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(80, 100, 255)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(120, 70, 240)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(90, 80, 220)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(70, 110, 255)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(110, 90, 230)", pos: "100% 27%", size: "11px 12px" },
    ],
    inner: [
      { color: "rgba(60, 140, 200, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(50, 120, 180, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(100, 80, 220, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(80, 100, 255, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(120, 70, 240, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(90, 80, 220, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(70, 110, 255, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(110, 90, 230, 0.3)", pos: "100% 27%", size: "11px 12px" },
    ],
  },
  sunset: {
    border: [
      { color: "rgb(255, 180, 50)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(255, 150, 40)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(255, 80, 60)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(255, 100, 80)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(255, 60, 80)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(255, 120, 60)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(255, 200, 50)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(255, 90, 70)", pos: "100% 27%", size: "11px 12px" },
    ],
    inner: [
      { color: "rgba(255, 180, 50, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(255, 150, 40, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(255, 80, 60, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(255, 100, 80, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(255, 60, 80, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(255, 120, 60, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(255, 200, 50, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(255, 90, 70, 0.3)", pos: "100% 27%", size: "11px 12px" },
    ],
  },
}

const radial = (c) =>
  `radial-gradient(ellipse ${c.size} at ${c.pos}, ${c.color}, transparent)`

const joinRadial = (palette) => palette.map(radial).join(",\n      ")

const mdInner = (variant) => {
  const baseAlpha = variant === "mono" ? 0.225 : 0.45
  return mdPalettes[variant].map((c) => {
    const rgba = c.color.replace("rgb(", "rgba(").replace(")", `, ${baseAlpha})`)
    const smaller = c.size
      .split(" ")
      .map((s) => `${Math.round(parseInt(s, 10) * 0.9)}px`)
      .join(" ")
    return `radial-gradient(ellipse ${smaller} at ${c.pos}, ${rgba}, transparent)`
  }).join(",\n      ")
}

// ---- Conic overlays (theme-dependent) ----

const conicWhite = (theme) => {
  const stops =
    theme === "dark"
      ? [
          [54, "transparent"],
          [57, "rgba(255, 255, 255, 0.1)"],
          [60, "rgba(255, 255, 255, 0.3)"],
          [63, "rgba(255, 255, 255, 0.6)"],
          [66, "rgba(255, 255, 255, 0.75)"],
          [69, "rgba(255, 255, 255, 0.6)"],
          [72, "rgba(255, 255, 255, 0.3)"],
          [75, "rgba(255, 255, 255, 0.1)"],
          [78, "transparent"],
        ]
      : [
          [54, "transparent"],
          [57, "rgba(0, 0, 0, 0.08)"],
          [60, "rgba(0, 0, 0, 0.2)"],
          [63, "rgba(0, 0, 0, 0.4)"],
          [66, "rgba(0, 0, 0, 0.55)"],
          [69, "rgba(0, 0, 0, 0.4)"],
          [72, "rgba(0, 0, 0, 0.2)"],
          [75, "rgba(0, 0, 0, 0.08)"],
          [78, "transparent"],
        ]
  const inner = stops.map(([p, c]) => `${c} ${p}%`).join(", ")
  return `conic-gradient(from var(--beam-angle), transparent 0%, ${inner}, transparent 100%)`
}

const conicBloom = (theme) => {
  const stops =
    theme === "dark"
      ? [
          [58, "transparent"],
          [62, "rgba(255, 255, 255, 0.03)"],
          [65, "rgba(255, 255, 255, 0.08)"],
          [67, "rgba(255, 255, 255, 0.2)"],
          [69, "rgba(255, 255, 255, 0.45)"],
          [70, "rgba(255, 255, 255, 0.85)"],
          [70.5, "rgba(255, 255, 255, 0.85)"],
          [71.5, "rgba(255, 255, 255, 0.45)"],
          [73, "rgba(255, 255, 255, 0.2)"],
          [75, "rgba(255, 255, 255, 0.08)"],
          [78, "rgba(255, 255, 255, 0.03)"],
          [82, "transparent"],
        ]
      : [
          [58, "transparent"],
          [62, "rgba(0, 0, 0, 0.02)"],
          [65, "rgba(0, 0, 0, 0.08)"],
          [67, "rgba(0, 0, 0, 0.2)"],
          [69, "rgba(0, 0, 0, 0.4)"],
          [70, "rgba(0, 0, 0, 0.6)"],
          [70.5, "rgba(0, 0, 0, 0.6)"],
          [71.5, "rgba(0, 0, 0, 0.4)"],
          [73, "rgba(0, 0, 0, 0.2)"],
          [75, "rgba(0, 0, 0, 0.08)"],
          [78, "rgba(0, 0, 0, 0.03)"],
          [82, "transparent"],
        ]
  const inner = stops.map(([p, c]) => `${c} ${p}%`).join(", ")
  return `conic-gradient(from var(--beam-angle), transparent 0%, ${inner})`
}

// ---- Mask conic gradients (theme-independent) ----

const STROKE_MASK = `conic-gradient(
      from var(--beam-angle),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    )`

const SMALL_INNER_MASK = `conic-gradient(
      from var(--beam-angle),
      transparent 0%, transparent 22%,
      rgba(255, 255, 255, 0.12) 28%, rgba(255, 255, 255, 0.4) 36%,
      white 46%, white 82%,
      rgba(255, 255, 255, 0.4) 88%, rgba(255, 255, 255, 0.12) 94%,
      transparent 97%, transparent 100%
    )`

// ---- CSS emission ----

const variants = ["colorful", "mono", "ocean", "sunset"]

let css = `/*
 * border-beam.css — auto-generated by scripts/generate-css.mjs
 *
 * Refactored from Jakubantalik/border-beam (MIT) into static, registry-native CSS.
 * All per-instance @property names eliminated; multi-instance independence is
 * provided by the CSS standard (each element holds its own value of each
 * inheriting custom property).
 *
 * To tweak palettes or stop positions, edit scripts/generate-css.mjs and rerun
 *   pnpm run generate:css
 */

@property --beam-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}
@property --beam-opacity {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

@keyframes beam-spin     { to { --beam-angle: 360deg; } }
@keyframes beam-fade-in  { to { --beam-opacity: 1; } }
@keyframes beam-fade-out { from { --beam-opacity: 1; } to { --beam-opacity: 0; } }
@keyframes beam-hue-shift {
  0%, 100% {
    filter: hue-rotate(calc(var(--beam-hue-range, 30deg) * -1))
            brightness(var(--beam-brightness, 1.3))
            saturate(var(--beam-saturation, 1));
  }
  50% {
    filter: hue-rotate(var(--beam-hue-range, 30deg))
            brightness(var(--beam-brightness, 1.3))
            saturate(var(--beam-saturation, 1));
  }
}

[data-beam] {
  position: relative;
  border-radius: var(--beam-radius, 16px);
  overflow: hidden;
}
[data-beam] [data-beam-bloom] {
  display: none;
}

[data-beam][data-active] {
  animation:
    beam-spin var(--beam-duration, 1.96s) linear infinite,
    beam-fade-in 0.6s ease forwards;
}
[data-beam][data-fading] {
  animation:
    beam-spin var(--beam-duration, 1.96s) linear infinite,
    beam-fade-out 0.5s ease forwards;
}

/* ---- variant overrides for opacity multiplier (mono is half-strength) ---- */

[data-beam][data-variant="mono"] {
  --beam-mono-multiplier: 0.5;
}
[data-beam] {
  --beam-mono-multiplier: 1;
}

/* ---- mappings for the conic theme overlays ---- */

[data-beam] {
  --beam-conic-overlay: ${conicWhite("light")};
  --beam-bloom-overlay: ${conicBloom("light")};
}
.dark [data-beam] {
  --beam-conic-overlay: ${conicWhite("dark")};
  --beam-bloom-overlay: ${conicBloom("dark")};
}

/* ---- per-variant color gradients (theme-independent) ---- */
`

for (const v of variants) {
  css += `
[data-beam][data-size="md"][data-variant="${v}"] {
  --beam-color-gradient: ${joinRadial(mdPalettes[v])};
  --beam-inner-gradient: ${mdInner(v)};
}
[data-beam][data-size="sm"][data-variant="${v}"] {
  --beam-color-gradient: ${joinRadial(smPalettes[v].border)};
  --beam-inner-gradient: ${joinRadial(smPalettes[v].inner)};
}
`
}

css += `
/* ---- ::after stroke layer (active + fading) ---- */

[data-beam][data-active]::after,
[data-beam][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-inner-radius, 15px);
  padding: 1px;
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: var(--beam-conic-overlay), var(--beam-color-gradient);
  -webkit-mask:
    ${STROKE_MASK},
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    ${STROKE_MASK},
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(
    var(--beam-opacity)
    * var(--beam-stroke-opacity, 0.48)
    * var(--beam-mono-multiplier, 1)
    * var(--beam-strength, 1)
  );
}

[data-beam]:not([data-static-colors])[data-active]::after,
[data-beam]:not([data-static-colors])[data-fading]::after {
  animation: beam-hue-shift 12s ease-in-out infinite;
}

/* ---- ::before inner glow layer (active + fading) ---- */

[data-beam][data-size="md"][data-active]::before,
[data-beam][data-size="md"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-radius, 16px);
  background: var(--beam-inner-gradient);
  box-shadow: inset 0 0 9px 1px var(--beam-inner-shadow, rgba(0, 0, 0, 0.14));
  -webkit-mask-image:
    ${STROKE_MASK},
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    ${STROKE_MASK},
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  clip-path: inset(0 round var(--beam-radius, 16px));
  opacity: calc(
    var(--beam-opacity)
    * var(--beam-inner-opacity, 0.7)
    * var(--beam-mono-multiplier, 1)
    * var(--beam-strength, 1)
  );
}

[data-beam][data-size="sm"][data-active]::before,
[data-beam][data-size="sm"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--beam-radius, 18px);
  background: var(--beam-inner-gradient);
  box-shadow: inset 0 0 5px 1px var(--beam-inner-shadow, rgba(0, 0, 0, 0.14));
  -webkit-mask-image: ${SMALL_INNER_MASK};
  -webkit-mask-composite: source-over;
  mask-image: ${SMALL_INNER_MASK};
  mask-composite: add;
  pointer-events: none;
  z-index: 1;
  clip-path: inset(0 round var(--beam-radius, 18px));
  opacity: calc(
    var(--beam-opacity)
    * var(--beam-inner-opacity, 0.7)
    * var(--beam-mono-multiplier, 1)
    * var(--beam-strength, 1)
  );
}

[data-beam]:not([data-static-colors])[data-active]::before,
[data-beam]:not([data-static-colors])[data-fading]::before {
  animation: beam-hue-shift 12s ease-in-out infinite;
}

/* ---- bloom layer ---- */

[data-beam][data-active] [data-beam-bloom],
[data-beam][data-fading] [data-beam-bloom] {
  display: block;
  position: absolute;
  inset: 0;
  border-radius: var(--beam-inner-radius, 15px);
  clip-path: inset(0 round var(--beam-radius, 16px));
  background: var(--beam-bloom-overlay);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: 1px;
  filter: blur(8px) brightness(var(--beam-brightness, 1.3)) saturate(var(--beam-saturation, 1));
  pointer-events: none;
  z-index: 3;
  opacity: calc(
    var(--beam-opacity)
    * var(--beam-bloom-opacity, 0.8)
    * var(--beam-mono-multiplier, 1)
    * var(--beam-strength, 1)
  );
}

[data-beam]:not([data-static-colors])[data-active] [data-beam-bloom],
[data-beam]:not([data-static-colors])[data-fading] [data-beam-bloom] {
  animation: beam-hue-shift 12s ease-in-out infinite;
}
`

writeFileSync(OUT, css, "utf8")
console.log(`Wrote ${OUT} (${css.length} chars, ${css.split("\n").length} lines)`)
