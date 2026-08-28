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
    <Card className="min-h-[150px] overflow-hidden border-border/70 bg-card p-5">
      <CardHeader className="p-0 pb-3">
        <div className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-[#ff6077] shadow-[12px_0_#ffb547,24px_0_#62d28b] mr-7" aria-hidden="true" />
          <CardDescription className="text-xs">New message</CardDescription>
          <Badge variant="outline" className="ml-auto text-[10px]">⌘ K</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 py-8 text-2xl font-medium tracking-tight md:text-3xl">
        Build something that moves.
      </CardContent>
      <CardFooter className="flex items-center gap-2.5 border-t border-border p-0 pt-3.5">
        <Badge variant="secondary">Agent</Badge>
        <Badge variant="secondary">Auto</Badge>
        <Button className="ml-auto size-7 rounded-full" size="icon" aria-label="Send message">
          <Send data-icon="" />
        </Button>
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
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-8 md:px-8 md:py-12">
      <header className="flex items-center justify-between pb-4">
        <Button asChild variant="ghost" size="sm" className="font-mono text-xs tracking-wider uppercase">
          <a href="https://www.jakubantalik.com" target="_blank" rel="noreferrer">
            <ArrowUpRight data-icon="inline-start" /> jakubantalik.com
          </a>
        </Button>
        <nav className="flex items-center gap-2" aria-label="External links">
          <Button asChild variant="outline" size="icon" aria-label="GitHub repository">
            <a href="https://github.com/JakubAntalik/Libraries" target="_blank" rel="noreferrer">
              <GitBranch data-icon="" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" aria-label="Follow on X">
            <a href="https://x.com/jakubantalik" target="_blank" rel="noreferrer">
              <ExternalLink data-icon="" />
            </a>
          </Button>
          <Button variant="outline" size="icon" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>
            {dark ? <Sun /> : <Moon />}
          </Button>
        </nav>
      </header>
      <Separator />

      <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16" aria-labelledby="page-title">
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1.5 font-mono text-xs">
              <Sparkles data-icon="inline-start" /> VGPU / BORDER-BEAM
            </Badge>
            <span className="font-mono text-xs text-muted-foreground">0.3.1 runtime</span>
          </div>
          <h1 id="page-title" className="text-5xl font-semibold tracking-tighter sm:text-6xl md:text-7xl">
            The edge,<br />
            <em className="text-muted-foreground not-italic">under inspection.</em>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            A GPU-rendered border beam for React and shadcn. Explore the live effect, inspect its three color passes, and take the component with you.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <Button asChild size="lg" className="rounded-full">
              <a href="#playground">
                Open playground <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild variant="link">
              <a href="https://github.com/FradSer/border-beam" target="_blank" rel="noreferrer">
                View source
              </a>
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden rounded-2xl border-border bg-card p-0">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border p-5 md:p-6">
            <div>
              <CardDescription className="font-mono text-xs">LIVE PREVIEW / 01</CardDescription>
              <CardTitle className="text-lg">Color field</CardTitle>
            </div>
            <Badge variant="secondary" className="gap-2">
              <span className="size-2 rounded-full bg-[#37c878] shadow-[0_0_8px_#37c878]" aria-hidden="true" />
              WebGPU online
            </Badge>
          </CardHeader>
          <CardContent className="bg-muted/40 p-8 md:p-12">
            <BorderBeam size="md" colorVariant="colorful" theme={playgroundTheme} active={active} className="w-full">
              <MockChat />
            </BorderBeam>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-4 border-t border-border p-4 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <RotateCw className="size-3.5" data-icon="inline-start" /> 12s hue cycle
            </span>
            <span className="flex items-center gap-1.5">
              <Layers3 className="size-3.5" data-icon="inline-start" /> 3 color passes
            </span>
            <span>rgba / premultiplied</span>
          </CardFooter>
        </Card>
      </section>

      <div className="flex flex-wrap items-center gap-6 border-y border-border py-3 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[#4dd293] shadow-[0_0_6px_#4dd293]" aria-hidden="true" />
          ADAPTER READY
        </span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[#6d9cff] shadow-[0_0_6px_#6d9cff]" aria-hidden="true" />
          WGSL VALIDATED
        </span>
        <span className="ml-auto text-muted-foreground/80">Shared frame loop · 30 FPS cap</span>
      </div>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]" aria-label="GPU renderer inspector">
        <Card className="flex flex-col justify-center rounded-2xl border-border bg-card p-6 md:p-8">
          <CardHeader className="p-0 pb-6">
            <CardDescription className="font-mono text-xs">RENDER TARGET / 01</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-0">
            <BorderBeam size="md" colorVariant={variant} theme={playgroundTheme} strength={strength} active={active} className="w-full max-w-lg">
              <Card className="flex min-h-[220px] flex-col justify-end border-border/70 bg-card p-6">
                <CardHeader className="p-0">
                  <Badge variant="outline" className="w-fit font-mono">{variant.toUpperCase()}</Badge>
                  <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                    Build something<br />that moves.
                  </CardTitle>
                  <CardDescription className="pt-2 text-xs">Rendered on the GPU</CardDescription>
                </CardHeader>
              </Card>
            </BorderBeam>
          </CardContent>
          <CardFooter className="flex items-center gap-2 p-0 pt-6 font-mono text-xs text-muted-foreground">
            <span className="h-px w-8 bg-border" aria-hidden="true" />
            select a pass to inspect its role
          </CardFooter>
        </Card>

        <Card className="flex flex-col justify-between overflow-hidden rounded-2xl border-border bg-card p-0">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border p-6">
            <div>
              <CardDescription className="font-mono text-xs">INSPECTOR</CardDescription>
              <CardTitle className="text-lg">Renderer passes</CardTitle>
            </div>
            <Badge variant="outline">LIVE</Badge>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={family} onValueChange={(value) => setFamily(value as "rotate" | "pulse")} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rotate">Rotate</TabsTrigger>
                <TabsTrigger value="pulse">Pulse</TabsTrigger>
              </TabsList>
              <TabsContent value="rotate" className="pt-4">
                <div className="flex flex-col gap-2">
                  {layerMeta.map((layer, index) => (
                    <Button
                      key={layer.id}
                      type="button"
                      variant={selectedLayer === layer.id ? "secondary" : "ghost"}
                      className="h-auto w-full justify-start gap-3 p-3.5"
                      onClick={() => setSelectedLayer(layer.id)}
                    >
                      <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                      <div className="grid size-7 place-items-center rounded-md border border-border">
                        <Layers3 className="size-3.5" />
                      </div>
                      <div className="flex flex-col items-start gap-0.5 text-left">
                        <strong className="text-sm font-medium">{layer.label}</strong>
                        <small className="text-xs text-muted-foreground">{layer.description}</small>
                      </div>
                      <Badge variant={selectedLayer === layer.id ? "default" : "outline"} className="ml-auto text-[10px]">
                        {selectedLayer === layer.id ? "SELECTED" : "READY"}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="pulse" className="pt-4">
                <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                  <Badge variant="outline" className="w-fit font-mono">PULSE INNER / OUTSIDE</Badge>
                  <p className="leading-relaxed">
                    Breathing geometry stays synchronized while each color pass renders in WGSL.
                  </p>
                  <div className="flex items-center gap-6 border-t border-border pt-4">
                    <div className="flex flex-col">
                      <strong className="text-lg font-semibold text-foreground">16</strong>
                      <small className="font-mono text-xs text-muted-foreground">oscillators</small>
                    </div>
                    <div className="flex flex-col">
                      <strong className="text-lg font-semibold text-foreground">2.3s</strong>
                      <small className="font-mono text-xs text-muted-foreground">duration</small>
                    </div>
                    <div className="flex flex-col">
                      <strong className="text-lg font-semibold text-foreground">30</strong>
                      <small className="font-mono text-xs text-muted-foreground">fps cap</small>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t border-border p-4 font-mono text-xs">
            <span className="text-muted-foreground">CURRENT PASS</span>
            <code className="text-foreground">{selectedLayer}.wgsl</code>
            <Button variant="ghost" size="icon" aria-label="Open shader source">
              <Code2 className="size-4" />
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="flex flex-col gap-6" aria-label="Component examples">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono">02</Badge>
            <h2 className="text-2xl font-semibold tracking-tight">Component matrix</h2>
          </div>
          <p className="text-sm text-muted-foreground">Same renderer. Different surfaces.</p>
        </div>
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <BorderBeamButton beamColorVariant="colorful" beamTheme={playgroundTheme} beamActive={active}>
            Continue
          </BorderBeamButton>
          <BorderBeamCard beamColorVariant="ocean" beamTheme={playgroundTheme} beamActive={active}>
            <CardHeader className="p-4">
              <CardDescription className="font-mono text-[10px]">REGISTRY CARD</CardDescription>
              <CardTitle className="text-sm">Card wrapper</CardTitle>
            </CardHeader>
          </BorderBeamCard>
          <BorderBeamInput beamColorVariant="sunset" beamTheme={playgroundTheme} beamActive={active} placeholder="Search anything" />
          <BorderBeamTextarea beamColorVariant="colorful" beamTheme={playgroundTheme} beamActive={active} placeholder="Describe a motion" rows={2} />
        </div>
      </section>
      <Separator />

      <section className="flex flex-col gap-6" id="playground" aria-labelledby="playground-title">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono">03</Badge>
            <h2 id="playground-title" className="text-2xl font-semibold tracking-tight">Playground</h2>
          </div>
          <p className="text-sm text-muted-foreground">Change the inputs. Watch every pass respond.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
          <Card className="flex flex-col justify-between rounded-2xl border-border p-6">
            <CardHeader className="p-0 pb-4">
              <CardDescription className="font-mono text-xs">SHADER PARAMETERS</CardDescription>
              <CardTitle className="text-base">Configure the beam</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-0">
              <div className="flex flex-col gap-2">
                <Label className="font-mono text-xs text-muted-foreground uppercase">Type</Label>
                <div className="flex flex-wrap gap-1.5" role="group" aria-label="Beam type">
                  {(["md", "sm", "line", "pulse-inner", "pulse-outside"] as PlaygroundSize[]).map((item) => (
                    <Button
                      key={item}
                      type="button"
                      size="sm"
                      variant={size === item ? "default" : "outline"}
                      className="font-mono text-xs"
                      onClick={() => setSize(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-mono text-xs text-muted-foreground uppercase">Color variant</Label>
                <div className="flex flex-wrap gap-1.5" role="group" aria-label="Beam color variant">
                  {VARIANTS.map((item) => (
                    <Button
                      key={item}
                      type="button"
                      size="sm"
                      variant={variant === item ? "default" : "outline"}
                      className="font-mono text-xs"
                      onClick={() => setVariant(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground uppercase">
                  <Label htmlFor="strength">Strength</Label>
                  <output className="text-foreground">{Math.round(strength * 100)}%</output>
                </div>
                <Slider id="strength" min={0} max={1} step={0.01} value={[strength]} onValueChange={([value]) => setStrength(value ?? 0.7)} />
              </div>
            </CardContent>
            <CardFooter className="p-0 pt-6">
              <Button variant="outline" className="w-full" onClick={() => setActive((value) => !value)}>
                {active ? <Pause data-icon="inline-start" /> : <Play data-icon="inline-start" />}
                {active ? "Pause renderer" : "Resume renderer"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex min-h-[300px] items-center justify-center rounded-2xl border-border bg-card p-8 md:p-12">
            <BorderBeam size={size} colorVariant={variant} theme={playgroundTheme} strength={strength} active={active} className="w-full max-w-md">
              <Card className="flex flex-col items-center justify-center p-8 text-center">
                <Badge variant="outline" className="font-mono text-xs">LIVE / {selectedLayer.toUpperCase()}</Badge>
                <CardTitle className="pt-2 text-xl font-medium">{variant}</CardTitle>
                <CardDescription className="font-mono text-xs">{size} · strength {Math.round(strength * 100)}%</CardDescription>
              </Card>
            </BorderBeam>
          </Card>
        </div>

        <Card className="flex flex-row items-center justify-between gap-4 rounded-xl border-border bg-muted/60 p-4 font-mono text-xs">
          <CardContent className="p-0">
            <code className="text-foreground">{snippet}</code>
          </CardContent>
          <CardFooter className="p-0">
            <CopyButton value={snippet} label="Copy playground code" />
          </CardFooter>
        </Card>
      </section>
      <Separator />

      <section className="flex flex-col gap-6" aria-label="Installation">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono">04</Badge>
            <h2 className="text-2xl font-semibold tracking-tight">Install from the registry.</h2>
          </div>
          <p className="text-sm text-muted-foreground">One command. The component, CSS, and WGSL arrive together.</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Card className="flex flex-1 flex-row items-center justify-between gap-4 rounded-xl border-border bg-muted/60 p-4 font-mono text-xs">
            <CardContent className="p-0">
              <code className="text-foreground">npx shadcn@latest add https://border-beam.vercel.app/r/border-beam.json</code>
            </CardContent>
            <CardFooter className="p-0">
              <CopyButton value="npx shadcn@latest add https://border-beam.vercel.app/r/border-beam.json" label="Copy installation command" />
            </CardFooter>
          </Card>
          <Button asChild size="lg" className="rounded-full">
            <a href="https://github.com/FradSer/border-beam" target="_blank" rel="noreferrer">
              Read the docs <ArrowUpRight data-icon="inline-end" />
            </a>
          </Button>
        </div>
      </section>

      <footer className="flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <Badge variant="outline" className="font-mono">border-beam</Badge>
        <span>Static CSS geometry · WGSL color passes · vgpu runtime</span>
        <Button asChild variant="link" size="sm" className="p-0 font-mono text-xs text-muted-foreground">
          <a href="https://github.com/FradSer/border-beam" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </footer>
    </main>
  )
}
