"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CopyCode({ value, label }: { value: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle")
  async function copy() {
    setStatus("copying")
    try {
      await navigator.clipboard.writeText(value)
      setStatus("copied")
    } catch {
      setStatus("error")
    }
  }
  return (
    <div className="copy-action">
      <Button variant="ghost" size="sm" aria-label={label} disabled={status === "copying"} onClick={copy}>
        {status === "copied" ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
        {status === "copied" ? "Copied" : "Copy"}
      </Button>
      <span role="status" className={status === "error" ? "copy-error" : "sr-only"}>
        {status === "error" ? "Select and copy the code manually." : status === "copied" ? "Code copied to clipboard." : ""}
      </span>
    </div>
  )
}

export function CodeBlock({ value, label, id }: { value: string; label: string; id?: string }) {
  return (
    <div className="code-block">
      <pre tabIndex={0} role="region" aria-label={label}><code id={id}>{value}</code></pre>
      <CopyCode value={value} label={`Copy ${label}`} />
    </div>
  )
}
