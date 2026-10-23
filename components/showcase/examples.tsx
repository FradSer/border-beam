"use client"

import { useState } from "react"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import type { BorderBeamTheme } from "@/components/ui/border-beam"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { BorderBeamButton } from "@/registry/new-york/ui/border-beam-button"
import { BorderBeamCard } from "@/registry/new-york/ui/border-beam-card"
import { BorderBeamInput } from "@/registry/new-york/ui/border-beam-input"
import { BorderBeamTextarea } from "@/registry/new-york/ui/border-beam-textarea"
import { BorderBeamPulseButton } from "@/registry/new-york/ui/border-beam-pulse-button"
import { BorderBeamPulseCard } from "@/registry/new-york/ui/border-beam-pulse-card"
import { BorderBeamPulseInput } from "@/registry/new-york/ui/border-beam-pulse-input"
import { BorderBeamPulseTextarea } from "@/registry/new-york/ui/border-beam-pulse-textarea"
import { CodeBlock } from "./copy-code"

export const installCommand = "pnpm dlx shadcn@latest add https://border-beam.vercel.app/r/border-beam.json"

export function Examples({ theme, active }: { theme: BorderBeamTheme; active: boolean }) {
  const [family, setFamily] = useState("rotate")
  const [projectName, setProjectName] = useState("")
  const [idea, setIdea] = useState("")
  const beamProps = { beamTheme: theme, beamActive: active }
  const ExampleButton = family === "pulse" ? BorderBeamPulseButton : BorderBeamButton
  const ExampleCard = family === "pulse" ? BorderBeamPulseCard : BorderBeamCard
  const ExampleInput = family === "pulse" ? BorderBeamPulseInput : BorderBeamInput
  const ExampleTextarea = family === "pulse" ? BorderBeamPulseTextarea : BorderBeamTextarea
  const examples = [
    { name: "Button", description: "A clear next step.", content: <ExampleButton {...beamProps} asChild><a href="#installation">Get started<ArrowUpRight data-icon="inline-end" /></a></ExampleButton> },
    { name: "Card", description: "A surface worth noticing.", content: <ExampleCard {...beamProps} beamColorVariant="ocean"><CardHeader><CardTitle>Your next project</CardTitle></CardHeader><CardContent><p>Start with a brighter canvas.</p></CardContent></ExampleCard> },
    { name: "Input", description: "Bring focus to the details.", content: <div className="example-field"><Label htmlFor="example-name">Project name</Label><ExampleInput {...beamProps} beamColorVariant="sunset" id="example-name" value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="Something brilliant" /></div> },
    { name: "Textarea", description: "Room for a bigger idea.", content: <div className="example-field"><Label htmlFor="example-idea">Your idea</Label><ExampleTextarea {...beamProps} id="example-idea" value={idea} onChange={(event) => setIdea(event.target.value)} placeholder="What would you like to build?" rows={3} /></div> },
  ]
  return (
    <section id="components" className="page-section" aria-labelledby="components-title">
      <div className="section-heading"><div><h2 id="components-title">Familiar components.<br /><span>A different presence.</span></h2><p>Eight ready-to-use wrappers. The shadcn API you know.</p></div><ToggleGroup type="single" value={family} onValueChange={(value) => { if (value) setFamily(value) }} variant="outline" spacing={1} aria-label="Example effects"><ToggleGroupItem value="rotate" aria-label="Rotate wrappers">Rotate</ToggleGroupItem><ToggleGroupItem value="pulse" aria-label="Pulse wrappers">Pulse</ToggleGroupItem></ToggleGroup></div>
      <div className="examples-grid" data-family={family}>{examples.map(({ name, description, content }) => <Card className="example-card" key={name}><CardHeader><CardTitle>{name}</CardTitle><CardDescription>{description}</CardDescription></CardHeader><CardContent className="example-stage">{content}</CardContent><CardFooter><details><summary>Install {name.toLowerCase()}<ChevronDown aria-hidden="true" /></summary><CodeBlock value={`pnpm dlx shadcn@latest add https://border-beam.vercel.app/r/border-beam-${family === "pulse" ? "pulse-" : ""}${name.toLowerCase()}.json`} label={`${name.toLowerCase()} installation command`} /></details></CardFooter></Card>)}</div>
    </section>
  )
}
