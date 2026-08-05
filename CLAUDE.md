# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A shadcn/ui registry component for "border-beam" — a Next.js 16 + Tailwind CSS v4 project that publishes a reusable UI component via the shadcn registry system.

## Key Gotchas

- `registry/new-york/ui/border-beam.css` is **auto-generated** by `scripts/generate-css.mjs`. Never edit the CSS file directly — edit palette data in the script and regenerate.
- After editing registry components, run `pnpm registry:build` to regenerate JSON files in `public/r/`. This script chains `generate:css` then `shadcn build`.
- `components/ui/border-beam.tsx` is just a re-export wrapper from the registry source (`export * from "@/registry/new-york/ui/border-beam"`). Do not add logic there — edit the registry source instead.

## Build Commands

- `pnpm dev` — dev server (Turbopack is the default bundler in Next.js 16)
- `pnpm build` — Next.js production build (Turbopack)
- `pnpm lint` — ESLint flat config (`eslint .`)
- `pnpm registry:build` — generate CSS + build shadcn registry JSON (run after registry changes)
- `pnpm generate:css` — regenerate `border-beam.css` from palette data

## Architecture Notes

- Tailwind CSS v4 — no `tailwind.config.ts`; config is inline in CSS via `@theme`
- shadcn v4 — uses `shadcn build` to generate registry JSON
- Path alias: `@/*` maps to project root (configured in tsconfig.json)