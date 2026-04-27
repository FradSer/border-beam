"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react"

import "./border-beam.css"

export type BorderBeamSize = "sm" | "md"
export type BorderBeamColorVariant = "colorful" | "mono" | "ocean" | "sunset"

export interface BorderBeamProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode
  size?: BorderBeamSize
  colorVariant?: BorderBeamColorVariant
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
  sm: 18,
  md: 16,
}

export const BorderBeam = forwardRef<HTMLDivElement, BorderBeamProps>(
  function BorderBeam(
    {
      children,
      size = "md",
      colorVariant = "colorful",
      active = true,
      borderRadius,
      staticColors = false,
      duration = 1.96,
      strength = 1,
      brightness = 1.3,
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
    const [detectedRadius, setDetectedRadius] = useState<number | null>(null)

    useLayoutEffect(() => {
      if (borderRadius != null) return
      const child = internalRef.current?.firstElementChild as HTMLElement | null
      if (!child) return
      const r = parseFloat(getComputedStyle(child).borderTopLeftRadius)
      if (!Number.isNaN(r) && r > 0) setDetectedRadius(r)
    }, [borderRadius])

    useEffect(() => {
      if (active && phase !== "active") setPhase("active")
      else if (!active && phase === "active") setPhase("fading")
    }, [active, phase])

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

    const beamStyle: CSSProperties = {
      ...style,
      ["--beam-radius" as string]: `${finalRadius}px`,
      ["--beam-inner-radius" as string]: `${Math.max(0, finalRadius - 1)}px`,
      ["--beam-duration" as string]: `${duration}s`,
      ["--beam-strength" as string]: clampedStrength,
      ["--beam-brightness" as string]: brightness,
      ["--beam-hue-range" as string]: `${hueRange}deg`,
      ...(saturation != null
        ? { ["--beam-saturation" as string]: saturation }
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
        data-static-colors={finalStaticColors ? "" : undefined}
        data-active={phase === "active" ? "" : undefined}
        data-fading={phase === "fading" ? "" : undefined}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
        <div data-beam-bloom />
      </div>
    )
  }
)

BorderBeam.displayName = "BorderBeam"
