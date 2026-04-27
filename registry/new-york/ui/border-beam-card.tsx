"use client"

import * as React from "react"

import { Card } from "@/components/ui/card"
import {
  BorderBeam,
  type BorderBeamColorVariant,
  type BorderBeamSize,
} from "@/components/ui/border-beam"

export interface BorderBeamCardProps
  extends React.ComponentProps<typeof Card> {
  beamSize?: BorderBeamSize
  beamColorVariant?: BorderBeamColorVariant
  beamActive?: boolean
  beamClassName?: string
}

export function BorderBeamCard({
  beamSize = "md",
  beamColorVariant = "colorful",
  beamActive = true,
  beamClassName,
  ...props
}: BorderBeamCardProps) {
  return (
    <BorderBeam
      size={beamSize}
      colorVariant={beamColorVariant}
      active={beamActive}
      className={beamClassName}
    >
      <Card {...props} />
    </BorderBeam>
  )
}
