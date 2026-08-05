"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  BorderBeam,
  type BorderBeamColorVariant,
  type BorderBeamSize,
  type BorderBeamTheme,
} from "@/components/ui/border-beam"

export interface BorderBeamPulseButtonProps
  extends React.ComponentProps<typeof Button> {
  beamSize?: Extract<BorderBeamSize, "pulse-inner" | "pulse-outside">
  beamColorVariant?: BorderBeamColorVariant
  beamTheme?: BorderBeamTheme
  beamActive?: boolean
  beamClassName?: string
}

/**
 * Button pre-wrapped with a breathing pulse border beam. Defaults to
 * "pulse-inner". Note: "pulse-outside" requires the wrapped child to be opaque
 * with a 1px border, so prefer the `outline` variant when using it.
 */
export function BorderBeamPulseButton({
  beamSize = "pulse-inner",
  beamColorVariant = "colorful",
  beamTheme,
  beamActive = true,
  beamClassName,
  ...props
}: BorderBeamPulseButtonProps) {
  return (
    <BorderBeam
      size={beamSize}
      colorVariant={beamColorVariant}
      theme={beamTheme}
      active={beamActive}
      className={beamClassName}
    >
      <Button {...props} />
    </BorderBeam>
  )
}
