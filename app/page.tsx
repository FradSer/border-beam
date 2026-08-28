"use client"

import { useMemo, useState } from "react"
import {
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  ExternalLink,
  GitBranch,
  Layers3,
  Moon,
  Pause,
  Play,
  RotateCw,
  Send,
  Sparkles,
  Sun,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  BorderBeam,
  type BorderBeamColorVariant,
  type BorderBeamTheme,
} from "@/components/ui/border-beam"
import { BorderBeamButton } from "@/registry/new-york/ui/border-beam-button"
import { BorderBeamCard } from "@/registry/new-york/ui/border-beam-card"
import { BorderBeamInput } from "@/registry/new-york/ui/border-beam-input"
import { BorderBeamTextarea } from "@/registry/new-york/ui/border-beam-textarea"

const VARIANTS: BorderBeamColorVariant[] = ["colorful", "mono", "ocean", "sunset"]
type PlaygroundSize = "md" | "sm" | "line" | "pulse-inner" | "pulse-outside"
type BeamLayer = "stroke" | "inner" | "bloom"

function usePageTheme() {
  const [dark, setDark] = useState(true)
  const toggle = () => {
    setDark((current) => {
      document.documentElement.classList.toggle("dark", !current)
      return !current
    })
  }
  return { dark, toggle }
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-label={label}
      data-copied={copied ? "true" : "false"}
      onClick={() => {
        void navigator.clipboard.writeText(value)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1200)
      }}
    >
      {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}

function MockChat() {
  return (
    <Card className="mock-chat">
      <CardHeader className="mock-chat-header">
        <div className="mock-chat-toolbar">
          <span className="mock-dot" aria-hidden="true" />
          <CardDescription>New message</CardDescription>
          <Badge variant="outline">⌘ K</Badge>
        </div>
      </CardHeader>
      <CardContent className="mock-chat-body">Build something that moves.</CardContent>
      <CardFooter className="mock-chat-footer">
        <Badge variant="secondary">Agent</Badge>
        <Badge variant="secondary">Auto</Badge>
        <Button className="mock-send" size="icon" aria-label="Send message"><Send data-icon="" /></Button>
      </CardFooter>
    </Card>
  )
}

const layerMeta: Array<{ id: BeamLayer; label: string; description: string }> = [
  { id: "stroke", label: "Stroke", description: "Primary edge pass" },
  { id: "inner", label: "Inner", description: "Inset color field" },
  { id: "bloom", label: "Bloom", description: "Soft halo pass" },
]

export default function Home() {
  const { dark, toggle } = usePageTheme()
  const [family, setFamily] = useState<"rotate" | "pulse">("rotate")
  const [size, setSize] = useState<PlaygroundSize>("md")
  const [variant, setVariant] = useState<BorderBeamColorVariant>("colorful")
  const [strength, setStrength] = useState(0.7)
  const [active, setActive] = useState(true)
  const [selectedLayer, setSelectedLayer] = useState<BeamLayer>("stroke")
  const playgroundTheme: BorderBeamTheme = dark ? "dark" : "light"
  const snippet = useMemo(
    () => `<BorderBeam size="${size}" colorVariant="${variant}" strength={${strength.toFixed(1)}}>\n  <Card>Content</Card>\n</BorderBeam>`,
    [size, strength, variant]
  )

  return (
    <main className="showcase-shell">
      <header className="site-header">
        <Button asChild variant="ghost" size="sm" className="back-link">
          <a href="https://www.jakubantalik.com" target="_blank" rel="noreferrer">
            <ArrowUpRight data-icon="inline-start" /> jakubantalik.com
          </a>
        </Button>
        <nav className="external-links" aria-label="External links">
          <Button asChild variant="outline" size="icon" aria-label="GitHub repository"><a href="https://github.com/JakubAntalik/Libraries" target="_blank" rel="noreferrer"><GitBranch data-icon="" /></a></Button>
          <Button asChild variant="outline" size="icon" aria-label="Follow on X"><a href="https://x.com/jakubantalik" target="_blank" rel="noreferrer"><ExternalLink data-icon="" /></a></Button>
          <Button variant="outline" size="icon" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>{dark ? <Sun /> : <Moon />}</Button>
        </nav>
      </header>
      <Separator />

      <section className="workbench-hero" aria-labelledby="page-title">
        <div className="workbench-hero-copy">
          <div className="hero-brandline"><Badge variant="outline"><Sparkles data-icon="inline-start" /> VGPU / BORDER-BEAM</Badge><span className="hero-version">0.3.1 runtime</span></div>
          <h1 id="page-title">The edge,<br /><em>under inspection.</em></h1>
          <p className="hero-description">A GPU-rendered border beam for React and shadcn. Explore the live effect, inspect its three color passes, and take the component with you.</p>
          <div className="hero-actions"><Button asChild size="lg"><a href="#playground">Open playground <ArrowUpRight data-icon="inline-end" /></a></Button><Button asChild variant="link"><a href="https://github.com/FradSer/border-beam" target="_blank" rel="noreferrer">View source</a></Button></div>
        </div>
        <Card className="workbench-preview-card">
          <CardHeader className="workbench-preview-header"><div><CardDescription>LIVE PREVIEW / 01</CardDescription><CardTitle>Color field</CardTitle></div><Badge variant="secondary"><span className="live-mark" /> WebGPU online</Badge></CardHeader>
          <CardContent className="workbench-preview-content"><BorderBeam size="md" colorVariant="colorful" theme={playgroundTheme} active={active}><MockChat /></BorderBeam></CardContent>
          <CardFooter className="workbench-preview-footer"><span><RotateCw data-icon="inline-start" /> 12s hue cycle</span><span><Layers3 data-icon="inline-start" /> 3 color passes</span><span>rgba / premultiplied</span></CardFooter>
        </Card>
      </section>

      <div className="workbench-statusbar"><span className="status-item"><span className="status-dot status-dot-green" /> ADAPTER READY</span><span className="status-item"><span className="status-dot status-dot-blue" /> WGSL VALIDATED</span><span className="status-item status-muted">Shared frame loop · 30 FPS cap</span></div>

      <section className="inspector-section" aria-label="GPU renderer inspector">
        <div className="inspector-preview"><div className="section-eyebrow">RENDER TARGET / 01</div><BorderBeam size="md" colorVariant={variant} theme={playgroundTheme} strength={strength} active={active}><Card className="inspector-specimen"><CardHeader><Badge variant="outline">{variant.toUpperCase()}</Badge><CardTitle>Build something<br />that moves.</CardTitle><CardDescription>Rendered on the GPU</CardDescription></CardHeader></Card></BorderBeam><div className="inspector-caption"><span className="caption-line" /> select a pass to inspect its role</div></div>
        <Card className="inspector-panel">
          <CardHeader><div className="panel-title-row"><div><CardDescription>INSPECTOR</CardDescription><CardTitle>Renderer passes</CardTitle></div><Badge variant="outline">LIVE</Badge></div></CardHeader>
          <CardContent>
            <Tabs value={family} onValueChange={(value) => setFamily(value as "rotate" | "pulse")}><TabsList className="inspector-tabs"><TabsTrigger value="rotate">Rotate</TabsTrigger><TabsTrigger value="pulse">Pulse</TabsTrigger></TabsList><TabsContent value="rotate"><div className="layer-list">{layerMeta.map((layer, index) => <button type="button" className={`layer-row ${selectedLayer === layer.id ? "is-selected" : ""}`} key={layer.id} onClick={() => setSelectedLayer(layer.id)}><span className="layer-index">0{index + 1}</span><span className="layer-icon"><Layers3 data-icon="" /></span><span className="layer-copy"><strong>{layer.label}</strong><small>{layer.description}</small></span><span className="layer-state">{selectedLayer === layer.id ? "SELECTED" : "READY"}</span></button>)}</div></TabsContent><TabsContent value="pulse"><div className="pulse-inspector"><Badge variant="outline">PULSE INNER / OUTSIDE</Badge><p>Breathing geometry stays synchronized while each color pass renders in WGSL.</p><div className="pulse-metrics"><span><strong>16</strong><small>oscillators</small></span><span><strong>2.3s</strong><small>duration</small></span><span><strong>30</strong><small>fps cap</small></span></div></div></TabsContent></Tabs>
          </CardContent>
          <CardFooter className="inspector-footer"><span className="inspector-footer-label">CURRENT PASS</span><code>{selectedLayer}.wgsl</code><Button variant="ghost" size="icon" aria-label="Open shader source"><Code2 /></Button></CardFooter>
        </Card>
      </section>

      <section className="examples-section" aria-label="Component examples">
        <div className="section-heading"><Badge variant="outline">02</Badge><h2>Component matrix</h2><p>Same renderer. Different surfaces.</p></div>
        <div className="matrix-grid"><BorderBeamButton beamColorVariant="colorful" beamTheme={playgroundTheme} beamActive={active}>Continue</BorderBeamButton><BorderBeamCard beamColorVariant="ocean" beamTheme={playgroundTheme} beamActive={active}><CardHeader><CardDescription>REGISTRY CARD</CardDescription><CardTitle>Card wrapper</CardTitle></CardHeader></BorderBeamCard><BorderBeamInput beamColorVariant="sunset" beamTheme={playgroundTheme} beamActive={active} placeholder="Search anything" /><BorderBeamTextarea beamColorVariant="colorful" beamTheme={playgroundTheme} beamActive={active} placeholder="Describe a motion" rows={2} /></div>
      </section>

      <section className="playground-section" id="playground" aria-labelledby="playground-title">
        <div className="section-heading"><Badge variant="outline">03</Badge><h2 id="playground-title">Playground</h2><p>Change the inputs. Watch every pass respond.</p></div>
        <div className="playground-layout"><Card className="control-panel"><CardHeader><CardDescription>SHADER PARAMETERS</CardDescription><CardTitle>Configure the beam</CardTitle></CardHeader><CardContent className="control-content"><div className="control-block"><Label>Type</Label><ToggleGroup type="single" value={size} onValueChange={(value) => value && setSize(value as PlaygroundSize)} aria-label="Beam type" className="control-options">{(["md", "sm", "line", "pulse-inner", "pulse-outside"] as PlaygroundSize[]).map((item) => <ToggleGroupItem value={item} key={item}>{item}</ToggleGroupItem>)}</ToggleGroup></div><div className="control-block"><Label>Color variant</Label><ToggleGroup type="single" value={variant} onValueChange={(value) => value && setVariant(value as BorderBeamColorVariant)} aria-label="Beam color variant" className="control-options">{VARIANTS.map((item) => <ToggleGroupItem value={item} key={item}>{item}</ToggleGroupItem>)}</ToggleGroup></div><div className="control-block"><Label htmlFor="strength">Strength <output>{Math.round(strength * 100)}%</output></Label><Slider id="strength" min={0} max={1} step={0.01} value={[strength]} onValueChange={([value]) => setStrength(value ?? 0.7)} /></div></CardContent><CardFooter><Button variant="outline" onClick={() => setActive((value) => !value)}>{active ? <Pause data-icon="inline-start" /> : <Play data-icon="inline-start" />}{active ? "Pause renderer" : "Resume renderer"}</Button></CardFooter></Card><Card className="playground-stage"><CardContent><BorderBeam size={size} colorVariant={variant} theme={playgroundTheme} strength={strength} active={active}><Card className="example-tile example-tile-playground"><CardHeader><Badge variant="outline">LIVE / {selectedLayer.toUpperCase()}</Badge><CardTitle>{variant}</CardTitle><CardDescription>{size} · strength {Math.round(strength * 100)}%</CardDescription></CardHeader></Card></BorderBeam></CardContent></Card></div>
        <Card className="code-card"><CardContent><code>{snippet}</code></CardContent><CardFooter><CopyButton value={snippet} label="Copy playground code" /></CardFooter></Card>
      </section>

      <section className="install-section" aria-label="Installation"><div className="section-heading"><Badge variant="outline">04</Badge><h2>Install from the registry.</h2><p>One command. The component, CSS, and WGSL arrive together.</p></div><div className="install-row"><Card className="code-card"><CardContent><code>npx shadcn@latest add https://border-beam.vercel.app/r/border-beam.json</code></CardContent><CardFooter><CopyButton value="npx shadcn@latest add https://border-beam.vercel.app/r/border-beam.json" label="Copy installation command" /></CardFooter></Card><Button asChild size="lg"><a href="https://github.com/FradSer/border-beam" target="_blank" rel="noreferrer">Read the docs <ArrowUpRight data-icon="inline-end" /></a></Button></div></section>

      <footer className="site-footer"><Badge variant="outline">border-beam</Badge><span>Static CSS geometry · WGSL color passes · vgpu runtime</span><a href="https://github.com/FradSer/border-beam" target="_blank" rel="noreferrer">GitHub <ArrowUpRight data-icon="inline-end" /></a></footer>
    </main>
  )
}
