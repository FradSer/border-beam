"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import {
  BorderBeam,
  type BorderBeamColorVariant,
  type BorderBeamSize,
  type BorderBeamTheme,
} from "@/components/ui/border-beam"

export interface BorderBeamPulseInputProps
  extends React.ComponentProps<typeof Input> {
  beamSize?: Extract<BorderBeamSize, "pulse-inner" | "pulse-outside">
  beamColorVariant?: BorderBeamColorVariant
  beamTheme?: BorderBeamTheme
  beamActive?: boolean
  beamClassName?: string
}

/**
 * Input pre-wrapped with a breathing pulse border beam. Defaults to
 * "pulse-inner". Note: Input uses a translucent background, so the inner glow
 * may faintly show through with "pulse-inner"; "pulse-outside" rides the
 * element's own 1px border.
 */
export function BorderBeamPulseInput({
  beamSize = "pulse-inner",
  beamColorVariant = "colorful",
  beamTheme,
  beamActive = true,
  beamClassName,
  ...props
}: BorderBeamPulseInputProps) {
  return (
    <BorderBeam
      size={beamSize}
      colorVariant={beamColorVariant}
      theme={beamTheme}
      active={beamActive}
      className={beamClassName}
    >
      <Input {...props} />
    </BorderBeam>
  )
}
