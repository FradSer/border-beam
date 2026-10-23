"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CopyCode({ value, label }: { value: string; label: string }) {
  const [feedback, setFeedback] = useState<{ value: string; status: "copying" | "copied" | "error" } | null>(null)
  const status = feedback?.value === value ? feedback.status : "idle"
  useEffect(() => {
    if (feedback?.status !== "copied") return
    const timeout = window.setTimeout(() => setFeedback(null), 2000)
    return () => window.clearTimeout(timeout)
  }, [feedback])
  async function copy() {
    setFeedback({ value, status: "copying" })
    try {
      await navigator.clipboard.writeText(value)
      setFeedback({ value, status: "copied" })
    } catch {
      setFeedback({ value, status: "error" })
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
