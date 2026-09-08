"use client"

import { ArrowUpRight } from "lucide-react"
import type { BorderBeamTheme } from "@/components/ui/border-beam"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { BorderBeamButton } from "@/registry/new-york/ui/border-beam-button"
import { BorderBeamCard } from "@/registry/new-york/ui/border-beam-card"
import { BorderBeamInput } from "@/registry/new-york/ui/border-beam-input"
import { BorderBeamTextarea } from "@/registry/new-york/ui/border-beam-textarea"
import { CodeBlock } from "./copy-code"

export const installCommand = "npx shadcn@latest add https://border-beam.vercel.app/r/border-beam.json"

export function Examples({ theme, active }: { theme: BorderBeamTheme; active: boolean }) {
  const beamProps = { beamTheme: theme, beamActive: active }
  const examples = [
    { name: "Button", description: "A clear next step.", content: <BorderBeamButton {...beamProps} asChild><a href="#installation">Get started<ArrowUpRight data-icon="inline-end" /></a></BorderBeamButton> },
    { name: "Card", description: "A surface worth noticing.", content: <BorderBeamCard {...beamProps} beamColorVariant="ocean"><CardHeader><CardDescription>LESS CHROME, MORE CHARACTER</CardDescription><CardTitle>Your next project</CardTitle></CardHeader><CardContent><p>Start with a brighter canvas.</p></CardContent></BorderBeamCard> },
    { name: "Input", description: "Bring focus to the details.", content: <div className="example-field"><Label htmlFor="example-name">Project name</Label><BorderBeamInput {...beamProps} beamColorVariant="sunset" id="example-name" placeholder="Something brilliant" /></div> },
    { name: "Textarea", description: "Room for a bigger idea.", content: <div className="example-field"><Label htmlFor="example-idea">Your idea</Label><BorderBeamTextarea {...beamProps} id="example-idea" placeholder="What would you like to build?" rows={3} /></div> },
  ]
  return (
    <section id="components" className="page-section" aria-labelledby="components-title">
      <div className="section-heading"><div><p className="eyebrow">01 / COMPOSE</p><h2 id="components-title">Familiar components.<br /><span>A different presence.</span></h2></div><p>Ready-to-use shadcn wrappers.<br />The same API, with a beam around it.</p></div>
      <div className="examples-grid">{examples.map(({ name, description, content }) => <Card className="example-card" key={name}><CardHeader><CardTitle>{name}</CardTitle><CardDescription>{description}</CardDescription></CardHeader><CardContent className="example-stage">{content}</CardContent><CardFooter><details><summary>Install {name.toLowerCase()}<ArrowUpRight aria-hidden="true" /></summary><CodeBlock value={`npx shadcn@latest add https://border-beam.vercel.app/r/border-beam-${name.toLowerCase()}.json`} label={`${name.toLowerCase()} installation command`} /></details></CardFooter></Card>)}</div>
    </section>
  )
}
