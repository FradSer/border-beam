"use client"

import { useState } from "react"
import { ArrowUpRight, Eye, EyeOff, Layers3, RotateCcw, RotateCw, Waves } from "lucide-react"
import { BorderBeam, type BorderBeamColorVariant, type BorderBeamTheme } from "@/components/ui/border-beam"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CodeBlock } from "./copy-code"

type Size = "md" | "sm" | "line" | "pulse-inner" | "pulse-outside"
const variants: BorderBeamColorVariant[] = ["colorful", "mono", "ocean", "sunset"]

function Preview({ size, variant, strength, duration, active, theme }: { size: Size; variant: BorderBeamColorVariant; strength: number; duration: number; active: boolean; theme: BorderBeamTheme }) {
  return (
    <div className="preview-stage" data-testid="beam-preview" data-size={size}>
      <div className="stage-caption"><span>Live preview</span><span>{size} / {variant}</span></div>
      <BorderBeam size={size} colorVariant={variant} theme={theme} strength={strength} duration={duration} active={active} className="specimen-beam">
        <Card className="specimen-card">
          <CardHeader><Layers3 aria-hidden="true" /><CardTitle>Give your ideas<br />an edge.</CardTitle></CardHeader>
          <CardContent><p>A little light. A different feeling.</p></CardContent>
          <CardFooter><span>border-beam by Frad</span><ArrowUpRight aria-hidden="true" /></CardFooter>
        </Card>
      </BorderBeam>
      <div className="stage-caption"><span>{active ? "Effects enabled" : "Effects hidden"}</span><span>{duration.toFixed(1)}s / cycle</span></div>
    </div>
  )
}

function Parameters({ sizes, size, setSize, variant, setVariant, strength, setStrength, duration, setDuration }: {
  sizes: Size[]; size: Size; setSize: (value: Size) => void; variant: BorderBeamColorVariant;
  setVariant: (value: BorderBeamColorVariant) => void; strength: number; setStrength: (value: number) => void;
  duration: number; setDuration: (value: number) => void;
}) {
  return (
    <aside className="parameters" aria-label="Beam parameters">
      <fieldset><legend>Preset</legend><ToggleGroup type="single" value={size} onValueChange={(value) => { if (sizes.includes(value as Size)) setSize(value as Size) }} variant="outline" spacing={2} aria-label="Beam preset" className="flex-wrap">
        {sizes.map((item) => <ToggleGroupItem key={item} value={item} aria-label={item}>{({ md: "Medium", sm: "Small", line: "Line", "pulse-inner": "Inner", "pulse-outside": "Outside" })[item]}</ToggleGroupItem>)}
      </ToggleGroup></fieldset>
      <fieldset><legend>Palette</legend><ToggleGroup type="single" value={variant} onValueChange={(value) => { if (variants.includes(value as BorderBeamColorVariant)) setVariant(value as BorderBeamColorVariant) }} variant="outline" spacing={2} aria-label="Beam palette" className="palette-options">
        {variants.map((item) => <ToggleGroupItem key={item} value={item} aria-label={item}><span className="palette-swatch" data-palette={item} aria-hidden="true" /><span className="palette-name">{item}</span></ToggleGroupItem>)}
      </ToggleGroup></fieldset>
      <div className="strength-control"><div><Label id="strength-label">Strength</Label><output>{Math.round(strength * 100)}%</output></div><Slider aria-labelledby="strength-label" aria-valuetext={`${Math.round(strength * 100)} percent`} min={0} max={1} step={0.01} value={[strength]} onValueChange={([value]) => setStrength(value)} /></div>
      <div className="strength-control"><div><Label id="duration-label">Cycle duration</Label><output>{duration.toFixed(1)}s</output></div><Slider aria-labelledby="duration-label" min={1} max={8} step={0.1} value={[duration]} onValueChange={([value]) => setDuration(value)} /></div>
    </aside>
  )
}

export function Playground({ theme, active, onActiveChange }: { theme: BorderBeamTheme; active: boolean; onActiveChange: (active: boolean) => void }) {
  const [family, setFamily] = useState("rotate")
  const [rotateSize, setRotateSize] = useState<Size>("md")
  const [pulseSize, setPulseSize] = useState<Size>("pulse-inner")
  const [variant, setVariant] = useState<BorderBeamColorVariant>("colorful")
  const [strength, setStrength] = useState(0.7)
  const [duration, setDuration] = useState(2.3)
  const size = family === "pulse" ? pulseSize : rotateSize
  const setSize = family === "pulse" ? setPulseSize : setRotateSize
  const isDefault = family === "rotate" && rotateSize === "md" && pulseSize === "pulse-inner" && variant === "colorful" && strength === 0.7 && duration === 2.3 && active
  function reset() {
    setFamily("rotate")
    setRotateSize("md")
    setPulseSize("pulse-inner")
    setVariant("colorful")
    setStrength(0.7)
    setDuration(2.3)
    onActiveChange(true)
  }
  const snippet = `import { BorderBeam } from "@/components/ui/border-beam"\nimport { Card } from "@/components/ui/card"\n\n<BorderBeam\n  size="${size}"\n  colorVariant="${variant}"\n  theme="${theme}"\n  strength={${Number(strength.toFixed(2))}}\n  duration={${Number(duration.toFixed(1))}}\n  active={${active}}\n>\n  <Card>Content</Card>\n</BorderBeam>`
  return (
    <section id="playground" aria-label="Interactive playground" className="workbench">
      <Tabs value={family} onValueChange={setFamily}>
        <div className="workbench-toolbar"><TabsList aria-label="Effect family"><TabsTrigger value="rotate"><RotateCw aria-hidden="true" />Rotate</TabsTrigger><TabsTrigger value="pulse"><Waves aria-hidden="true" />Pulse</TabsTrigger></TabsList><div className="toolbar-actions"><Button variant="ghost" size="sm" onClick={reset} disabled={isDefault} aria-label="Reset playground"><RotateCcw data-icon="inline-start" /><span className="reset-label">Reset</span></Button><Button variant="ghost" size="sm" onClick={() => onActiveChange(!active)} aria-pressed={!active}>{active ? <EyeOff data-icon="inline-start" /> : <Eye data-icon="inline-start" />}{active ? "Hide effects" : "Show effects"}</Button></div></div>
        {(["rotate", "pulse"] as const).map((item) => <TabsContent key={item} value={item} className="workbench-panel"><Preview size={size} variant={variant} strength={strength} duration={duration} active={active} theme={theme} /><Parameters sizes={item === "rotate" ? ["md", "sm", "line"] : ["pulse-inner", "pulse-outside"]} size={size} setSize={setSize} variant={variant} setVariant={setVariant} strength={strength} setStrength={setStrength} duration={duration} setDuration={setDuration} /></TabsContent>)}
      </Tabs>
      <details className="usage-panel"><summary><span>Use this configuration</span><Badge variant="outline">React</Badge></summary><CodeBlock value={snippet} label="usage code" id="usage-code" /></details>
    </section>
  )
}
