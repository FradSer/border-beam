"use client"

import * as React from "react"

import { Textarea } from "@/components/ui/textarea"
import {
  BorderBeam,
  type BorderBeamColorVariant,
  type BorderBeamSize,
  type BorderBeamTheme,
} from "@/components/ui/border-beam"

export interface BorderBeamTextareaProps
  extends React.ComponentProps<typeof Textarea> {
  beamSize?: BorderBeamSize
  beamColorVariant?: BorderBeamColorVariant
  beamTheme?: BorderBeamTheme
  beamActive?: boolean
  beamClassName?: string
}

export function BorderBeamTextarea({
  beamSize = "md",
  beamColorVariant = "colorful",
  beamTheme,
  beamActive = true,
  beamClassName,
  ...props
}: BorderBeamTextareaProps) {
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
