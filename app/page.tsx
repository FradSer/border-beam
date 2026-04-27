"use client"

import { useState } from "react"

import {
  BorderBeam,
  type BorderBeamColorVariant,
  type BorderBeamSize,
} from "@/registry/new-york/ui/border-beam"

const VARIANTS: BorderBeamColorVariant[] = [
  "colorful",
  "mono",
  "ocean",
  "sunset",
]
const SIZES: BorderBeamSize[] = ["sm", "md"]

export default function Home() {
  const [active, setActive] = useState(true)
  const [count, setCount] = useState(0)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">border-beam</h1>
        <p className="text-muted-foreground">
          Animated border beam, distributed as a shadcn registry. Static CSS,
          no runtime style injection, no per-instance@property names.
        </p>
        <p className="text-xs text-muted-foreground">
          Install:{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">
            npx shadcn@latest add https://border-beam.vercel.app/r/border-beam.json
          </code>
        </p>
      </header>

      <div className="flex items-center gap-3">
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
        <span className="text-xs text-muted-foreground">
          Toggle to verify fade-in/fade-out; add instances to verify each beam
          rotates independently.
        </span>
      </div>

      {SIZES.map((size) => (
        <section key={size} className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            size: {size}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {VARIANTS.map((v) => (
              <BorderBeam
                key={v}
                size={size}
                colorVariant={v}
                active={active}
                className="block"
              >
                <div className="bg-card text-card-foreground rounded-2xl px-6 py-10 text-center">
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

      {count > 0 ? (
        <section className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            dynamically added (count: {count})
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: count }, (_, i) => (
              <BorderBeam
                key={i}
                size="md"
                colorVariant={VARIANTS[i % VARIANTS.length]}
                active={active}
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
