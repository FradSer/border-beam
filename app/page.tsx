"use client"

import { useState, useSyncExternalStore } from "react"
import { ArrowDown, ArrowUpRight, GitBranch, Moon, Sun } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CodeBlock } from "@/components/showcase/copy-code"
import { Examples, installCommand } from "@/components/showcase/examples"
import { Playground } from "@/components/showcase/playground"

function subscribeTheme(onChange: () => void) {
  function syncTheme(event: StorageEvent) {
    if (event.key === "border-beam-theme" || event.key === null) {
      document.documentElement.classList.toggle("dark", event.newValue !== "light")
      onChange()
    }
  }
  window.addEventListener("storage", syncTheme)
  window.addEventListener("beam-theme-change", onChange)
  return () => {
    window.removeEventListener("storage", syncTheme)
    window.removeEventListener("beam-theme-change", onChange)
  }
}

const getTheme = () => document.documentElement.classList.contains("dark")
const getServerTheme = () => true

function Header({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <header className="site-header">
      <div className="brand"><a href="#main" className="wordmark" aria-label="border-beam home"><span className="brand-mark" aria-hidden="true" />border-beam</a><span className="wordmark-divider">/</span><a className="creator-link" href="https://github.com/FradSer" target="_blank" rel="noreferrer">by Frad</a></div>
      <nav aria-label="Main navigation"><a className="nav-link" href="#playground">Playground</a><a className="nav-link" href="#components">Components</a><a className="nav-link" href="#installation">Install</a><Button asChild variant="ghost" size="icon"><a href="https://github.com/FradSer/border-beam" target="_blank" rel="noreferrer" aria-label="GitHub repository"><GitBranch /></a></Button><Button variant="outline" size="icon" onClick={onToggle} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>{dark ? <Sun /> : <Moon />}</Button></nav>
    </header>
  )
}

function Installation() {
  return (
    <section id="installation" className="page-section installation" aria-labelledby="installation-title">
      <div className="section-heading"><div><h2 id="installation-title">Your next border.<br /><span>One command away.</span></h2></div><Button asChild variant="outline"><a href="https://github.com/FradSer/border-beam#usage" target="_blank" rel="noreferrer">Read the docs<ArrowUpRight data-icon="inline-end" /></a></Button></div>
      <div className="install-terminal"><div className="terminal-heading"><span>Install with shadcn</span><Badge variant="outline">React</Badge></div><CodeBlock value={installCommand} label="installation command" /></div>
      <div className="install-notes"><p>Component, CSS, and shader module. In your codebase.</p><p>Ready for Next.js. No extra configuration.</p></div>
    </section>
  )
}

export default function Home() {
  const dark = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme)
  const [active, setActive] = useState(true)
  function toggleTheme() {
    document.documentElement.classList.toggle("dark", !dark)
    try { localStorage.setItem("border-beam-theme", dark ? "light" : "dark") } catch { /* Theme switching also works without storage. */ }
    window.dispatchEvent(new Event("beam-theme-change"))
  }
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to playground</a>
      <Header dark={dark} onToggle={toggleTheme} />
      <main id="main" tabIndex={-1}>
        <section className="intro" aria-labelledby="page-title"><div><h1 id="page-title">A little light.<br /><span>A better edge.</span></h1></div><div className="intro-aside"><p>Animated borders for React &amp; shadcn/ui.<br className="desktop-break" /> Tune the beam. Find your feel. Make it yours.</p><a href="#installation">Add to your project<ArrowDown aria-hidden="true" /></a></div></section>
        <Playground theme={dark ? "dark" : "light"} active={active} onActiveChange={setActive} />
        <div className="workbench-footnote"><span>Five presets. Four palettes. Your component.</span><span>WebGPU powered · CSS fallback</span></div>
        <Examples theme={dark ? "dark" : "light"} active={active} />
        <Separator />
        <Installation />
      </main>
      <footer className="site-footer"><div><a className="wordmark" href="#main"><span className="brand-mark" aria-hidden="true" />border-beam</a><p className="footer-credit">Made by <a href="https://github.com/FradSer" target="_blank" rel="noreferrer">Frad</a>.</p></div><p>Original effect by <a href="https://www.jakubantalik.com" target="_blank" rel="noreferrer">Jakub Antalik</a>.<br />Built for your next interface.</p><a href="https://github.com/FradSer/border-beam/blob/main/LICENSE" target="_blank" rel="noreferrer">Open source · MIT<ArrowUpRight aria-hidden="true" /></a></footer>
    </div>
  )
}
