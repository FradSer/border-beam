"use client"

import * as React from "react"

import { Textarea } from "@/components/ui/textarea"
import {
  BorderBeam,
  type BorderBeamColorVariant,
  type BorderBeamSize,
  type BorderBeamTheme,
} from "@/components/ui/border-beam"

export interface BorderBeamPulseTextareaProps
  extends React.ComponentProps<typeof Textarea> {
  beamSize?: Extract<BorderBeamSize, "pulse-inner" | "pulse-outside">
  beamColorVariant?: BorderBeamColorVariant
  beamTheme?: BorderBeamTheme
  beamActive?: boolean
  beamClassName?: string
}

/**
 * Textarea pre-wrapped with a breathing pulse border beam. Defaults to
 * "pulse-inner". Note: Textarea uses a translucent background, so the inner
 * glow may faintly show through with "pulse-inner"; "pulse-outside" rides the
 * element's own 1px border.
 */
export function BorderBeamPulseTextarea({
  beamSize = "pulse-inner",
  beamColorVariant = "colorful",
  beamTheme,
  beamActive = true,
  beamClassName,
  ...props
}: BorderBeamPulseTextareaProps) {
  return (
    <BorderBeam
      size={beamSize}
      colorVariant={beamColorVariant}
      theme={beamTheme}
      active={beamActive}
      className={beamClassName}
    >
      <Textarea {...props} />
    </BorderBeam>
  )
}
