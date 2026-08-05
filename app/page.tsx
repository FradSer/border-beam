"use client"

import { useCallback, useEffect, useSyncExternalStore, useState } from "react"
import { Moon, Sun } from "lucide-react"

import {
  BorderBeam,
  type BorderBeamColorVariant,
  type BorderBeamSize,
  type BorderBeamTheme,
} from "@/components/ui/border-beam"
import { BorderBeamButton } from "@/registry/new-york/ui/border-beam-button"
import { BorderBeamCard } from "@/registry/new-york/ui/border-beam-card"
import { BorderBeamInput } from "@/registry/new-york/ui/border-beam-input"
import { BorderBeamTextarea } from "@/registry/new-york/ui/border-beam-textarea"
import { BorderBeamPulseCard } from "@/registry/new-york/ui/border-beam-pulse-card"
import { BorderBeamPulseButton } from "@/registry/new-york/ui/border-beam-pulse-button"

const VARIANTS: BorderBeamColorVariant[] = [
  "colorful",
  "mono",
  "ocean",
  "sunset",
]
const SIZES: BorderBeamSize[] = ["sm", "md", "line"]
const PULSE_SIZES: BorderBeamSize[] = ["pulse-inner", "pulse-outside"]
const THEMES: BorderBeamTheme[] = ["dark", "light", "auto"]

function useTheme() {
  const getTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "dark"
    const stored = localStorage.getItem("theme") as "light" | "dark" | null
    return (
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    )
  }

  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    mq.addEventListener("change", onChange)
    // Same-tab storage writes also notify the store so the UI stays in sync.
    window.addEventListener("storage", onChange)
    return () => {
      mq.removeEventListener("change", onChange)
      window.removeEventListener("storage", onChange)
    }
  }, [])

  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark"
    localStorage.setItem("theme", next)
    // Notify the store immediately so useSyncExternalStore re-reads getTheme.
    window.dispatchEvent(new Event("storage"))
  }, [theme])

  return { theme, toggle }
}

export default function Home() {
  const { theme, toggle } = useTheme()
  const [active, setActive] = useState(true)
  const [beamTheme, setBeamTheme] = useState<BorderBeamTheme>("dark")
  const [count, setCount] = useState(0)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">border-beam</h1>
          <p className="text-muted-foreground">
            Animated border beam distributed as a shadcn registry. Static CSS,
            no runtime style injection. Supports border (sm/md), line
            (bottom-only traveling glow), and pulse (pulse-inner / pulse-outside
            breathing glow) variants with per-component theme control.
          </p>
          <p className="text-xs text-muted-foreground">
            Install:{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">
              npx shadcn@latest add
              https://border-beam.vercel.app/r/border-beam.json
            </code>
          </p>
        </div>
        <button
          onClick={toggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          className="shrink-0 size-9 inline-flex items-center justify-center rounded-md border bg-background hover:bg-muted"
        >
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </button>
      </header>

      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setActive(!active)}
          className="px-3 py-1.5 rounded-md border bg-background text-sm hover:bg-muted"
        >
          {active ? "Deactivate all" : "Activate all"}
        </button>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-3 py-1.5 rounded-md border bg-background text-sm hover:bg-muted"
        >
          Add instance ({count})
        </button>
        <select
          value={beamTheme}
          onChange={(e) => setBeamTheme(e.target.value as BorderBeamTheme)}
          className="px-3 py-1.5 rounded-md border bg-background text-sm"
        >
          {THEMES.map((t) => (
            <option key={t} value={t}>
              theme: {t}
            </option>
          ))}
        </select>
        <span className="text-xs text-muted-foreground">
          Toggle theme top-right; use theme selector for per-component
          control; add instances to verify independent rotation.
        </span>
      </div>

      {SIZES.map((size) => (
        <section key={size} className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            BorderBeam — size: {size}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {VARIANTS.map((v) => (
              <BorderBeam
                key={v}
                size={size}
                colorVariant={v}
                active={active}
                theme={beamTheme}
                className="block"
              >
                <div
                  className={`bg-card text-card-foreground px-6 py-10 text-center ${
                    size === "sm" ? "rounded-[32px]" : "rounded-2xl"
                  }`}
                >
                  <div className="text-base font-medium">{v}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {size}
                  </div>
                </div>
              </BorderBeam>
            ))}
          </div>
        </section>
      ))}

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          BorderBeam — pulse family
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PULSE_SIZES.map((size) => (
            <div key={size} className="space-y-3">
              <div className="text-xs text-muted-foreground">size: {size}</div>
              <div className="grid grid-cols-2 gap-6">
                {VARIANTS.map((v) => (
                  <BorderBeam
                    key={v}
                    size={size}
                    colorVariant={v}
                    active={active}
                    theme={beamTheme}
                    className="block"
                  >
                    <div className="bg-card text-card-foreground rounded-2xl border px-6 py-10 text-center">
                      <div className="text-base font-medium">{v}</div>
                    </div>
                  </BorderBeam>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          BorderBeamButton — beam size: sm
        </h2>
        <div className="flex flex-wrap gap-4">
          {VARIANTS.map((v) => (
            <BorderBeamButton
              key={v}
              beamColorVariant={v}
              beamActive={active}
              beamTheme={beamTheme}
              size="lg"
            >
              {v}
            </BorderBeamButton>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          BorderBeamCard — beam size: md
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VARIANTS.map((v) => (
            <BorderBeamCard
              key={v}
              beamColorVariant={v}
              beamActive={active}
              beamTheme={beamTheme}
              beamClassName="block"
            >
              <div className="px-6 text-sm">
                <div className="font-medium">{v}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Card with border-beam
                </div>
              </div>
            </BorderBeamCard>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          BorderBeamInput — beam size: sm
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {VARIANTS.map((v) => (
            <BorderBeamInput
              key={v}
              beamColorVariant={v}
              beamActive={active}
              beamTheme={beamTheme}
              beamClassName="block"
              placeholder={`${v} input`}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          BorderBeamTextarea — beam size: md
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {VARIANTS.map((v) => (
            <BorderBeamTextarea
              key={v}
              beamColorVariant={v}
              beamActive={active}
              beamTheme={beamTheme}
              beamClassName="block"
              placeholder={`${v} textarea`}
              rows={3}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          BorderBeamPulseButton / BorderBeamPulseCard — beam size: pulse-inner
        </h2>
        <div className="flex flex-wrap gap-6">
          {VARIANTS.map((v) => (
            <BorderBeamPulseButton
              key={v}
              beamColorVariant={v}
              beamActive={active}
              beamTheme={beamTheme}
              variant="outline"
            >
              {v}
            </BorderBeamPulseButton>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VARIANTS.map((v) => (
            <BorderBeamPulseCard
              key={v}
              beamColorVariant={v}
              beamActive={active}
              beamTheme={beamTheme}
              beamClassName="block"
            >
              <div className="px-6 text-sm">
                <div className="font-medium">{v}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Card with breathing pulse
                </div>
              </div>
            </BorderBeamPulseCard>
          ))}
        </div>
      </section>

      {count > 0 ? (
        <section className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            dynamically added (count: {count})
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: count }, (_, i) => (
              <BorderBeam
                key={i}
                size={SIZES[i % SIZES.length]}
                colorVariant={VARIANTS[i % VARIANTS.length]}
                active={active}
                theme={beamTheme}
                className="block"
              >
                <div className="bg-card text-card-foreground rounded-2xl px-6 py-10 text-center">
                  <div className="text-base font-medium">#{i + 1}</div>
                </div>
              </BorderBeam>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
