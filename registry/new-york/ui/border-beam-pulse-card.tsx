"use client"

import * as React from "react"

import { Card } from "@/components/ui/card"
import {
  BorderBeam,
  type BorderBeamColorVariant,
  type BorderBeamSize,
  type BorderBeamTheme,
} from "@/components/ui/border-beam"

export interface BorderBeamPulseCardProps
  extends React.ComponentProps<typeof Card> {
  beamSize?: Extract<BorderBeamSize, "pulse-inner" | "pulse-outside">
  beamColorVariant?: BorderBeamColorVariant
  beamTheme?: BorderBeamTheme
  beamActive?: boolean
  beamClassName?: string
}

/**
 * Card pre-wrapped with a breathing pulse border beam. Defaults to
 * "pulse-inner". "pulse-outside" works well here: Card is opaque and ships its
 * own 1px border, which the outward halo rides on.
 */
export function BorderBeamPulseCard({
  beamSize = "pulse-inner",
  beamColorVariant = "colorful",
  beamTheme,
  beamActive = true,
  beamClassName,
  ...props
}: BorderBeamPulseCardProps) {
  return (
    <BorderBeam
      size={beamSize}
      colorVariant={beamColorVariant}
      theme={beamTheme}
      active={beamActive}
      className={beamClassName}
    >
      <Card {...props} />
    </BorderBeam>
  )
}
