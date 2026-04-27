"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import {
  BorderBeam,
  type BorderBeamColorVariant,
  type BorderBeamSize,
} from "@/components/ui/border-beam"

export interface BorderBeamInputProps
  extends React.ComponentProps<typeof Input> {
  beamSize?: BorderBeamSize
  beamColorVariant?: BorderBeamColorVariant
  beamActive?: boolean
  beamClassName?: string
}

export function BorderBeamInput({
  beamSize = "sm",
  beamColorVariant = "colorful",
  beamActive = true,
  beamClassName,
  ...props
}: BorderBeamInputProps) {
  return (
    <BorderBeam
      size={beamSize}
      colorVariant={beamColorVariant}
      active={beamActive}
      className={beamClassName}
    >
      <Input {...props} />
    </BorderBeam>
  )
}
