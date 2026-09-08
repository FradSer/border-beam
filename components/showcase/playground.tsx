"use client"

import { useState } from "react"
import { ArrowUpRight, Eye, EyeOff, Layers3, RotateCw, Waves } from "lucide-react"
import { BorderBeam, type BorderBeamColorVariant, type BorderBeamTheme } from "@/components/ui/border-beam"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CodeBlock } from "./copy-code"

type Size = "md" | "sm" | "line" | "pulse-inner" | "pulse-outside"
const variants: BorderBeamColorVariant[] = ["colorful", "mono", "ocean", "sunset"]

function Preview({ size, variant, strength, active, theme }: { size: Size; variant: BorderBeamColorVariant; strength: number; active: boolean; theme: BorderBeamTheme }) {
  return (
    <div className="preview-stage" data-testid="beam-preview" data-size={size}>
      <div className="stage-caption"><span>COMPONENT PREVIEW</span><span>{size}</span></div>
      <BorderBeam size={size} colorVariant={variant} theme={theme} strength={strength} active={active} className="specimen-beam">
        <Card className="specimen-card">
          <CardHeader><Layers3 aria-hidden="true" /><CardDescription>YOUR NEXT INTERFACE</CardDescription><CardTitle>Give your ideas<br />an edge.</CardTitle></CardHeader>
          <CardContent><p>A little light. A different feeling.</p></CardContent>
          <CardFooter><span>Built with border-beam</span><ArrowUpRight aria-hidden="true" /></CardFooter>
        </Card>
      </BorderBeam>
      <div className="stage-caption"><span>{active ? "EFFECT ENABLED" : "EFFECT HIDDEN"}</span><span>{Math.round(strength * 100)}% STRENGTH</span></div>
    </div>
  )
}

function Parameters({ sizes, size, setSize, variant, setVariant, strength, setStrength }: {
  sizes: Size[]; size: Size; setSize: (value: Size) => void; variant: BorderBeamColorVariant;
  setVariant: (value: BorderBeamColorVariant) => void; strength: number; setStrength: (value: number) => void;
}) {
  return (
    <aside className="parameters" aria-label="Beam parameters">
      <div className="parameter-intro"><h2>Make it yours</h2><p>Small adjustments. Instant feedback.</p></div>
      <fieldset><legend>Preset</legend><ToggleGroup type="single" value={size} onValueChange={(value) => { if (sizes.includes(value as Size)) setSize(value as Size) }} variant="outline" spacing={2} aria-label="Beam preset" className="flex-wrap">
        {sizes.map((item) => <ToggleGroupItem key={item} value={item} aria-label={item}>{item}</ToggleGroupItem>)}
      </ToggleGroup></fieldset>
      <fieldset><legend>Palette</legend><ToggleGroup type="single" value={variant} onValueChange={(value) => { if (variants.includes(value as BorderBeamColorVariant)) setVariant(value as BorderBeamColorVariant) }} variant="outline" spacing={2} aria-label="Beam palette" className="palette-options">
        {variants.map((item) => <ToggleGroupItem key={item} value={item} aria-label={item}><span className="palette-swatch" data-palette={item} aria-hidden="true" />{item}</ToggleGroupItem>)}
      </ToggleGroup></fieldset>
      <div className="strength-control"><div><Label id="strength-label">Strength</Label><output>{Math.round(strength * 100)}%</output></div><Slider aria-labelledby="strength-label" min={0} max={1} step={0.01} value={[strength]} onValueChange={([value]) => setStrength(value)} /><div className="range-labels"><span>Subtle</span><span>Full glow</span></div></div>
      <p className="parameter-note">WebGPU color rendering.<br />CSS fallback when unavailable.</p>
    </aside>
  )
}

export function Playground({ theme, active, onActiveChange }: { theme: BorderBeamTheme; active: boolean; onActiveChange: () => void }) {
  const [size, setSize] = useState<Size>("md")
  const [variant, setVariant] = useState<BorderBeamColorVariant>("colorful")
  const [strength, setStrength] = useState(0.7)
  const family = size.startsWith("pulse") ? "pulse" : "rotate"
  const snippet = `<BorderBeam\n  size="${size}"\n  colorVariant="${variant}"\n  strength={${Number(strength.toFixed(2))}}\n  active={${active}}\n>\n  <Card>Content</Card>\n</BorderBeam>`
  return (
    <section id="playground" aria-label="Interactive playground" className="workbench">
      <Tabs value={family} onValueChange={(value) => setSize(value === "pulse" ? "pulse-inner" : "md")}>
        <div className="workbench-toolbar"><TabsList aria-label="Effect family"><TabsTrigger value="rotate"><RotateCw aria-hidden="true" />Rotate</TabsTrigger><TabsTrigger value="pulse"><Waves aria-hidden="true" />Pulse</TabsTrigger></TabsList><Button variant="ghost" size="sm" onClick={onActiveChange}>{active ? <EyeOff data-icon="inline-start" /> : <Eye data-icon="inline-start" />}{active ? "Hide effects" : "Show effects"}</Button></div>
        {(["rotate", "pulse"] as const).map((item) => <TabsContent key={item} value={item} className="workbench-panel"><Preview size={size} variant={variant} strength={strength} active={active} theme={theme} /><Parameters sizes={item === "rotate" ? ["md", "sm", "line"] : ["pulse-inner", "pulse-outside"]} size={size} setSize={setSize} variant={variant} setVariant={setVariant} strength={strength} setStrength={setStrength} /></TabsContent>)}
      </Tabs>
      <details className="usage-panel" open><summary><span>Use this configuration</span><Badge variant="outline">React</Badge></summary><CodeBlock key={snippet} value={snippet} label="usage code" id="usage-code" /></details>
    </section>
  )
}
