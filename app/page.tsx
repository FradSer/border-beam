"use client"

import { useState } from "react"
import { ArrowDown, ArrowUpRight, GitBranch, Moon, Sun } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CodeBlock } from "@/components/showcase/copy-code"
import { Examples, installCommand } from "@/components/showcase/examples"
import { Playground } from "@/components/showcase/playground"

function Header({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <header className="site-header">
      <a href="#main" className="wordmark" aria-label="border-beam home"><span className="brand-mark" aria-hidden="true" />border-beam<span className="wordmark-divider">/</span><span className="wordmark-detail">for shadcn/ui</span></a>
      <nav aria-label="Main navigation"><a className="nav-link" href="#components">Components</a><a className="nav-link" href="#installation">Install</a><Button asChild variant="ghost" size="icon"><a href="https://github.com/FradSer/border-beam" target="_blank" rel="noreferrer" aria-label="GitHub repository"><GitBranch /></a></Button><Button variant="outline" size="icon" onClick={onToggle} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>{dark ? <Sun /> : <Moon />}</Button></nav>
    </header>
  )
}

function Installation() {
  return (
    <section id="installation" className="page-section installation" aria-labelledby="installation-title">
      <div className="section-heading"><div><p className="eyebrow">02 / TAKE IT WITH YOU</p><h2 id="installation-title">Your next border.<br /><span>One command away.</span></h2></div><Button asChild variant="outline"><a href="https://github.com/FradSer/border-beam#usage" target="_blank" rel="noreferrer">Read the docs<ArrowUpRight data-icon="inline-end" /></a></Button></div>
      <div className="install-terminal"><div className="terminal-heading"><span className="eyebrow">TERMINAL</span><Badge variant="outline">shadcn registry</Badge></div><CodeBlock value={installCommand} label="installation command" /></div>
      <div className="install-notes"><p>Component, CSS, and WGSL source. In your codebase.</p><p>Using Next.js? <a href="https://github.com/FradSer/border-beam/blob/main/next.config.ts" target="_blank" rel="noreferrer">Add the WGSL loader setup<ArrowUpRight aria-hidden="true" /></a></p></div>
    </section>
  )
}

export default function Home() {
  const [dark, setDark] = useState(true)
  const [active, setActive] = useState(true)
  function toggleTheme() {
    document.documentElement.classList.toggle("dark", !dark)
    setDark(!dark)
  }
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to playground</a>
      <Header dark={dark} onToggle={toggleTheme} />
      <main id="main" tabIndex={-1}>
        <section className="intro" aria-labelledby="page-title"><div><p className="eyebrow">AN ANIMATED BORDER COMPONENT FOR REACT</p><h1 id="page-title">A little light.<br /><span>A better edge.</span></h1></div><div className="intro-aside"><p>Give everyday interfaces a little more presence.<br className="desktop-break" /> Tune the beam. Find your feel. Make it yours.</p><a href="#installation">Add to your project<ArrowDown aria-hidden="true" /></a></div></section>
        <Playground theme={dark ? "dark" : "light"} active={active} onActiveChange={() => setActive((value) => !value)} />
        <div className="workbench-footnote"><span>Five presets. Four palettes. Your component.</span><span>WebGPU powered · CSS fallback</span></div>
        <Examples theme={dark ? "dark" : "light"} active={active} />
        <Separator />
        <Installation />
      </main>
      <footer className="site-footer"><a className="wordmark" href="#main"><span className="brand-mark" aria-hidden="true" />border-beam</a><p>Original effect by <a href="https://www.jakubantalik.com" target="_blank" rel="noreferrer">Jakub Antalik</a>.<br />Registry by <a href="https://github.com/FradSer" target="_blank" rel="noreferrer">Frad Lee</a>.</p><a href="https://github.com/FradSer/border-beam/blob/main/LICENSE" target="_blank" rel="noreferrer">Open source · MIT<ArrowUpRight aria-hidden="true" /></a></footer>
    </div>
  )
}
