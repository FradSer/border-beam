"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react"

import { getPulseDriverConfig, registerPulseInstance } from "./pulse-driver"
import "./border-beam.css"

export type BorderBeamSize = "sm" | "md" | "line" | "pulse-inner" | "pulse-outside"
export type BorderBeamTheme = "dark" | "light" | "auto"
export type BorderBeamColorVariant = "colorful" | "mono" | "ocean" | "sunset"

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export interface BorderBeamProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode
  size?: BorderBeamSize
  colorVariant?: BorderBeamColorVariant
  theme?: BorderBeamTheme
  active?: boolean
  borderRadius?: number
  staticColors?: boolean
  duration?: number
  strength?: number
  brightness?: number
  saturation?: number
  hueRange?: number
  onActivate?: () => void
  onDeactivate?: () => void
}

const SIZE_DEFAULT_RADIUS: Record<BorderBeamSize, number> = {
  sm: 32,
  md: 16,
  line: 16,
  "pulse-inner": 16,
  "pulse-outside": 16,
}

function useSystemTheme(enabled: boolean): "dark" | "light" {
  const [sysTheme, setSysTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  })

  useEffect(() => {
    if (!enabled) return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (e: MediaQueryListEvent) =>
      setSysTheme(e.matches ? "dark" : "light")
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [enabled])

  return sysTheme
}

export const BorderBeam = forwardRef<HTMLDivElement, BorderBeamProps>(
  function BorderBeam(
    {
      children,
      size = "md",
      colorVariant = "colorful",
      theme,
      active = true,
      borderRadius,
      staticColors = false,
      duration,
      strength = 1,
      brightness,
      saturation,
      hueRange = 30,
      className,
      style,
      onActivate,
      onDeactivate,
      onAnimationEnd: consumerOnAnimationEnd,
      ...rest
    },
    forwardedRef
  ) {
    const internalRef = useRef<HTMLDivElement | null>(null)
    const [phase, setPhase] = useState<"idle" | "active" | "fading">(
      active ? "active" : "idle"
    )
    const [prevActive, setPrevActive] = useState(active)
    // Adjust state during render when the `active` prop changes, instead of
    // calling setState from an effect (avoids the extra render pass).
    if (active !== prevActive) {
      setPrevActive(active)
      setPhase(active ? "active" : "fading")
    }
    const [detectedRadius, setDetectedRadius] = useState<number | null>(null)
    const [isVisible, setIsVisible] = useState(true)
    const [pulseGlowScale, setPulseGlowScale] = useState({ x: 1, y: 1 })

    const isPulse = size === "pulse-inner" || size === "pulse-outside"

    const systemTheme = useSystemTheme(theme === "auto")
    const resolvedTheme = theme === "auto" ? systemTheme : (theme ?? "dark")

    useIsomorphicLayoutEffect(() => {
      if (borderRadius != null) return
      const child = internalRef.current?.firstElementChild as HTMLElement | null
      if (!child) return
      const r = parseFloat(getComputedStyle(child).borderTopLeftRadius)
      if (!Number.isNaN(r) && r > 0) setDetectedRadius(r)
    }, [borderRadius, children])

    // Pause the (paint-heavy) pulse animations while the element is scrolled
    // offscreen. This stops per-frame painting entirely for hidden instances
    // without changing their logical active/fading state.
    useEffect(() => {
      const el = internalRef.current
      if (!el || typeof IntersectionObserver === "undefined") return

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) setIsVisible(entry.isIntersecting)
        },
        // Start animating slightly before the element scrolls into view.
        { rootMargin: "256px" }
      )

      observer.observe(el)
      return () => observer.disconnect()
    }, [])

    // Pulse-outside glow geometry is authored in fixed pixels for a reference
    // element (~350x140). Measure the wrapped element and scale the glow
    // per-axis so the halo grows/shrinks to fit any component it's applied to.
    useEffect(() => {
      if (size !== "pulse-outside") return

      const el = internalRef.current
      if (!el) return

      const REF_WIDTH = 350
      const REF_HEIGHT = 140
      // Allow the glow to both shrink (small buttons) and grow (large cards),
      // with generous bounds to avoid degenerate geometry at the extremes.
      const MIN_SCALE = 0.35
      const MAX_SCALE = 4
      const clamp = (value: number) =>
        Math.max(MIN_SCALE, Math.min(MAX_SCALE, value))

      const measure = () => {
        const child = el.firstElementChild as HTMLElement | null
        if (!child) return
        const rect = child.getBoundingClientRect()
        if (!rect.width || !rect.height) return
        const x = +clamp(rect.width / REF_WIDTH).toFixed(3)
        const y = +clamp(rect.height / REF_HEIGHT).toFixed(3)
        setPulseGlowScale((prev) =>
          prev.x === x && prev.y === y ? prev : { x, y }
        )
      }

      measure()
      if (typeof ResizeObserver === "undefined") return

      const child = el.firstElementChild as HTMLElement | null
      if (!child) return

      const resizeObserver = new ResizeObserver(measure)
      resizeObserver.observe(child)
      return () => resizeObserver.disconnect()
    }, [size, children])

    const handleAnimationEnd = useCallback(
      (e: AnimationEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) {
          consumerOnAnimationEnd?.(e)
          return
        }
        const name = e.animationName
        if (name.includes("fade-out")) {
          setPhase("idle")
          onDeactivate?.()
        } else if (name.includes("fade-in")) {
          onActivate?.()
        }
        consumerOnAnimationEnd?.(e)
      },
      [onActivate, onDeactivate, consumerOnAnimationEnd]
    )

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node
        if (typeof forwardedRef === "function") forwardedRef(node)
        else if (forwardedRef) forwardedRef.current = node
      },
      [forwardedRef]
    )

    const finalRadius =
      borderRadius ?? detectedRadius ?? SIZE_DEFAULT_RADIUS[size]
    const finalStaticColors = colorVariant === "mono" || staticColors
    const clampedStrength = Math.max(0, Math.min(1, strength))
    const finalDuration = duration ?? (size === "line" ? 2.4 : isPulse ? 2.3 : 1.96)
    const finalHueRange = size === "line" ? Math.min(hueRange, 13) : hueRange

    // Detune breath/spike against the travel period to avoid visible resonance.
    const breatheDuration = finalDuration * 1.3
    const spikeDuration = finalDuration * 1.33
    const spike2Duration = finalDuration * 1.7

    // Runtime config for the JS breathing driver (null for non-pulse sizes).
    const driverConfig = useMemo(
      () =>
        isPulse
          ? getPulseDriverConfig(
              size,
              resolvedTheme,
              finalDuration,
              finalStaticColors
            )
          : null,
      [isPulse, size, resolvedTheme, finalDuration, finalStaticColors]
    )

    // Drive the pulse breathing from the shared, fps-capped rAF loop while the
    // instance is on, onscreen, and the user hasn't requested reduced motion.
    useEffect(() => {
      if (!driverConfig) return
      if (!(phase === "active" || phase === "fading") || !isVisible) return

      const el = internalRef.current
      if (!el) return

      if (
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ) {
        return
      }

      return registerPulseInstance(el, driverConfig)
    }, [driverConfig, phase, isVisible])

    const beamStyle: CSSProperties = {
      ...style,
      ["--beam-radius" as string]: `${finalRadius}px`,
      ["--beam-inner-radius" as string]: `${Math.max(0, finalRadius - 1)}px`,
      ["--beam-duration" as string]: `${finalDuration}s`,
      ["--beam-strength" as string]: clampedStrength,
      ...(brightness != null
        ? { ["--beam-brightness" as string]: brightness }
        : {}),
      ["--beam-hue-range" as string]: `${finalHueRange}deg`,
      ...(saturation != null
        ? { ["--beam-saturation" as string]: saturation }
        : {}),
      ...(size === "line"
        ? {
            ["--beam-breathe-duration" as string]: `${breatheDuration.toFixed(2)}s`,
            ["--beam-spike-duration" as string]: `${spikeDuration.toFixed(2)}s`,
            ["--beam-spike2-duration" as string]: `${spike2Duration.toFixed(2)}s`,
          }
        : {}),
      ...(size === "pulse-outside"
        ? {
            ["--pulse-glow-sx" as string]: pulseGlowScale.x,
            ["--pulse-glow-sy" as string]: pulseGlowScale.y,
          }
        : {}),
    }

    return (
      <div
        {...rest}
        ref={setRefs}
        className={className}
        style={beamStyle}
        data-beam=""
        data-size={size}
        data-variant={colorVariant}
        data-theme={theme != null ? resolvedTheme : undefined}
        data-static-colors={finalStaticColors ? "" : undefined}
        data-active={phase === "active" ? "" : undefined}
        data-fading={phase === "fading" ? "" : undefined}
        data-paused={
          isPulse && (phase === "active" || phase === "fading") && !isVisible
            ? ""
            : undefined
        }
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
        <div data-beam-bloom />
      </div>
    )
  }
)

BorderBeam.displayName = "BorderBeam"
