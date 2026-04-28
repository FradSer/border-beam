"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import {
  BorderBeam,
  type BorderBeamColorVariant,
  type BorderBeamSize,
  type BorderBeamTheme,
} from "@/components/ui/border-beam"

export interface BorderBeamInputProps
  extends React.ComponentProps<typeof Input> {
  beamSize?: BorderBeamSize
  beamColorVariant?: BorderBeamColorVariant
  beamTheme?: BorderBeamTheme
  beamActive?: boolean
  beamClassName?: string
}

export function BorderBeamInput({
  beamSize = "sm",
  beamColorVariant = "colorful",
  beamTheme,
  beamActive = true,
  beamClassName,
  ...props
}: BorderBeamInputProps) {
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
