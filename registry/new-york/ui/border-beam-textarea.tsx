"use client"

import * as React from "react"

import { Textarea } from "@/components/ui/textarea"
import {
  BorderBeam,
  type BorderBeamColorVariant,
  type BorderBeamSize,
} from "@/components/ui/border-beam"

export interface BorderBeamTextareaProps
  extends React.ComponentProps<typeof Textarea> {
  beamSize?: BorderBeamSize
  beamColorVariant?: BorderBeamColorVariant
  beamActive?: boolean
  beamClassName?: string
}

export function BorderBeamTextarea({
  beamSize = "md",
  beamColorVariant = "colorful",
  beamActive = true,
  beamClassName,
  ...props
}: BorderBeamTextareaProps) {
  return (
    <BorderBeam
      size={beamSize}
      colorVariant={beamColorVariant}
      active={beamActive}
      className={beamClassName}
    >
      <Textarea {...props} />
    </BorderBeam>
  )
}
