"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  BorderBeam,
  type BorderBeamColorVariant,
  type BorderBeamSize,
} from "@/components/ui/border-beam"

export interface BorderBeamButtonProps
  extends React.ComponentProps<typeof Button> {
  beamSize?: BorderBeamSize
  beamColorVariant?: BorderBeamColorVariant
  beamActive?: boolean
  beamClassName?: string
}

export function BorderBeamButton({
  beamSize = "sm",
  beamColorVariant = "colorful",
  beamActive = true,
  beamClassName,
  ...props
}: BorderBeamButtonProps) {
  return (
    <BorderBeam
      size={beamSize}
      colorVariant={beamColorVariant}
      active={beamActive}
      className={beamClassName}
    >
      <Button {...props} />
    </BorderBeam>
  )
}
