import type { BorderBeamSize } from "./border-beam"

/**
 * Shared breathing driver for the pulse effects.
 *
 * The pulse breathing (blob size / drift / per-quadrant opacity / height) and
 * the slow hue drift run from a SINGLE shared requestAnimationFrame loop
 * throttled to ~30 fps. Each oscillator ping-pongs a CSS custom property
 * between `a` and `b` with a cosine ease-in-out curve over `period` seconds,
 * offset by `delay` seconds so otherwise-identical oscillators desync.
 *
 * The variables are written inline on each element (no per-instance id suffix),
 * matching the static-CSS architecture: every element holds its own value of
 * each inheriting custom property, so instances never see each other's values.
 */

interface PulseOscillatorDef {
  prop: string
  a: number
  b: number
  /** Full period in seconds. */
  period: number
  /** Phase offset in seconds (desyncs otherwise-identical oscillators). */
  delay: number
  /** '' for unitless <number> vars, 'px' for <length> drift vars. */
  unit: "" | "px"
}

export interface PulseDriverConfig {
  oscillators: PulseOscillatorDef[]
  /**
   * Hue motion driven into `--beam-hue`; null when colors are static.
   * `continuous` rotates a full 360° loop so every palette color cycles
   * through every edge; otherwise it ping-pongs between -range and +range.
   */
  hue: { prop: string; range: number; period: number; continuous?: boolean } | null
}

interface PulseInstance {
  el: HTMLElement
  config: PulseDriverConfig
}

const instances = new Set<PulseInstance>()
let rafId: number | null = null
let lastFrame = 0

// ~30 fps. Subtract a small slack so a frame that lands a hair early still runs.
const FRAME_INTERVAL = 1000 / 30 - 2

const TWO_PI = Math.PI * 2

/** Cosine ease-in-out factor in [0, 1]: 0 at phase 0/1, 1 at phase 0.5. */
function pingPong(phase: number): number {
  return (1 - Math.cos(TWO_PI * phase)) / 2
}

function frame(ts: number): void {
  rafId = requestAnimationFrame(frame)

  if (ts - lastFrame < FRAME_INTERVAL) return
  lastFrame = ts

  const tSec = ts / 1000

  instances.forEach(({ el, config }) => {
    for (const osc of config.oscillators) {
      // Match CSS animation-delay semantics: a positive delay starts later.
      const phase = (tSec - osc.delay) / osc.period
      const value = osc.a + (osc.b - osc.a) * pingPong(phase)
      el.style.setProperty(
        osc.prop,
        osc.unit === "px" ? `${value.toFixed(2)}px` : value.toFixed(4)
      )
    }

    if (config.hue) {
      const { prop, range, period, continuous } = config.hue
      // `continuous` rotates a full circle (0→range, looping) so every color
      // sweeps through every edge; otherwise drift between -range and +range.
      const value = continuous
        ? ((tSec / period) % 1) * range
        : -range + 2 * range * pingPong(tSec / period)
      el.style.setProperty(prop, `${value.toFixed(2)}deg`)
    }
  })
}

function startLoop(): void {
  if (rafId == null) {
    lastFrame = 0
    rafId = requestAnimationFrame(frame)
  }
}

function stopLoopIfIdle(): void {
  if (instances.size === 0 && rafId != null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

/**
 * Register an element to be driven by the shared pulse loop.
 *
 * @returns a cleanup function that unregisters the instance (and stops the
 *          shared loop once no instances remain).
 */
export function registerPulseInstance(
  el: HTMLElement,
  config: PulseDriverConfig
): () => void {
  const instance: PulseInstance = { el, config }
  instances.add(instance)
  startLoop()

  return () => {
    instances.delete(instance)
    stopLoopIfIdle()
  }
}

/** Theme/size-tuned breathing parameters (kept in sync with generate-css.mjs). */
function pulseParams(size: BorderBeamSize, theme: "dark" | "light", duration: number) {
  const isDark = theme === "dark"
  const durScale = duration / 2.3
  if (size === "pulse-inner") {
    return {
      sp: 0.28,
      dr: isDark ? 33 : 40,
      op: isDark ? 0.48 : 0.45,
      gh: isDark ? 0.34 : 0.22,
      bs: (isDark ? 1.9 : 2.6) * durScale,
      ss: (isDark ? 2.6 : 4.6) * durScale,
      ghs: (isDark ? 2.4 : 5.5) * durScale,
      // Full hue revolution period (seconds) — colors continuously cycle.
      huePeriod: 16,
    }
  }
  return {
    sp: isDark ? 0.28 : 0.36,
    dr: isDark ? 14 : 19,
    op: isDark ? 0.46 : 0,
    gh: isDark ? 0.16 : 0.58,
    bs: (isDark ? 2.3 : 3.7) * durScale,
    ss: (isDark ? 6.4 : 4.6) * durScale,
    ghs: (isDark ? 2.4 : 3.8) * durScale,
    // Full hue revolution period (seconds) — colors continuously cycle.
    huePeriod: 14,
  }
}

function pulseOscillatorDefs(p: ReturnType<typeof pulseParams>): PulseOscillatorDef[] {
  const { sp, dr, op, gh, bs, ss, ghs } = p
  return [
    { prop: "--bw1", a: 1 - sp, b: 1 + sp * 1.1, period: ss * 0.9, delay: 0, unit: "" },
    { prop: "--bh1", a: 1 + sp * 0.9, b: 1 - sp * 0.85, period: ss * 1.26, delay: 0, unit: "" },
    { prop: "--bx1", a: -dr, b: dr * 0.9, period: bs * 1.6, delay: 0, unit: "px" },
    { prop: "--by1", a: dr * 0.55, b: -dr * 0.7, period: bs * 1.6, delay: 0, unit: "px" },
    { prop: "--bw2", a: 1 + sp, b: 1 - sp * 0.85, period: ss * 1.1, delay: 0, unit: "" },
    { prop: "--bh2", a: 1 - sp * 0.8, b: 1 + sp * 1.05, period: ss * 0.81, delay: 0, unit: "" },
    { prop: "--bx2", a: dr * 0.8, b: -dr * 0.9, period: bs * 1.88, delay: 0, unit: "px" },
    { prop: "--by2", a: -dr, b: dr * 0.65, period: bs * 1.88, delay: 0, unit: "px" },
    { prop: "--bw3", a: 1 - sp * 0.6, b: 1 + sp * 1.15, period: ss * 0.98, delay: 0, unit: "" },
    { prop: "--bh3", a: 1 + sp * 0.75, b: 1 - sp, period: ss * 1.4, delay: 0, unit: "" },
    { prop: "--bx3", a: -dr * 0.6, b: dr, period: bs * 1.45, delay: 0, unit: "px" },
    { prop: "--by3", a: -dr * 0.85, b: dr * 0.45, period: bs * 1.45, delay: 0, unit: "px" },
    { prop: "--bgh", a: 1 - gh, b: 1 + gh, period: ghs, delay: 0, unit: "" },
    { prop: "--bop-tl", a: 1 - op, b: 1, period: bs, delay: 0, unit: "" },
    { prop: "--bop-tr", a: 1 - op, b: 1, period: bs * 1.32, delay: bs * 0.28, unit: "" },
    { prop: "--bop-bl", a: 1 - op, b: 1, period: bs * 0.84, delay: bs * 0.55, unit: "" },
    { prop: "--bop-br", a: 1 - op, b: 1, period: bs * 1.58, delay: bs * 0.83, unit: "" },
  ]
}

/**
 * Returns the runtime config the JS driver needs to animate a pulse instance,
 * or null for non-pulse sizes.
 */
export function getPulseDriverConfig(
  size: BorderBeamSize,
  theme: "dark" | "light",
  duration: number,
  staticColors: boolean
): PulseDriverConfig | null {
  if (size !== "pulse-inner" && size !== "pulse-outside") return null
  const p = pulseParams(size, theme, duration)
  return {
    oscillators: pulseOscillatorDefs(p),
    // Pulse colors continuously rotate a full hue circle so the palette is never
    // pinned to fixed edges.
    hue: staticColors
      ? null
      : { prop: "--beam-hue", range: 360, period: p.huePeriod, continuous: true },
  }
}
