---
name: border-beam
description: Animated border beam effect for shadcn with vgpu-powered color rendering
colors:
  primary: "#17181c"
  primary-dark: "#f5f5f7"
  background: "#fbfaf8"
  background-dark: "#0b0d10"
  card: "#ffffff"
  card-dark: "#12151a"
  muted: "#efede8"
  muted-dark: "#1c2128"
  muted-foreground: "#6e7885"
  border: "#d0d7de"
  border-dark: "#2a313c"
  accent-green: "#4dd293"
  accent-green-bright: "#37c878"
  accent-green-check: "#46c787"
  accent-green-copy: "#2caf72"
  accent-green-dot: "#62d28b"
  accent-blue: "#58a6ff"
  accent-blue-status: "#6d9cff"
  accent-blue-glow: "#5b7dff"
  accent-purple: "#8c78ff"
  accent-purple-radial: "#765cff"
  accent-red: "#ff6077"
  accent-red-glow: "#ff5d87"
  accent-yellow: "#ffb547"
typography:
  display:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "clamp(3.3rem, 6vw, 6.2rem)"
    fontWeight: 600
    lineHeight: 0.87
    letterSpacing: "-0.075em"
  display-mobile:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "clamp(3.3rem, 18vw, 5.4rem)"
    fontWeight: 600
    lineHeight: 0.87
    letterSpacing: "-0.075em"
  display-specimen:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "clamp(1.8rem, 4vw, 3.6rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.065em"
  display-chat:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "clamp(18px, 3vw, 29px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.045em"
  headline-lg:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "27px"
    fontWeight: 550
    lineHeight: 1.2
    letterSpacing: "-0.05em"
  headline-md:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.045em"
  headline-sm:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "21px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.04em"
  title-lg:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.035em"
  title:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.03em"
  title-sm:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  body-sm:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-xs:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-geist-mono), monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.04em"
  label-mono:
    fontFamily: "var(--font-geist-mono), monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.11em"
  label-micro:
    fontFamily: "var(--font-geist-mono), monospace"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
  label-nano:
    fontFamily: "var(--font-geist-mono), monospace"
    fontSize: "9px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  icon-sm: "7px"
  row: "9px"
  sm: "6px"
  md: "10px"
  code: "14px"
  lg: "16px"
  tile: "18px"
  xl: "20px"
  hero: "28px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "12px 17px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  badge-outline:
    backgroundColor: "transparent"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
---

# Design System: border-beam

## Overview

**Creative North Star: "The GPU Workbench"**

The design system presents the animated border-beam component as a high-precision graphic instrument. The interface combines dark technical inspection aesthetics with clean shadcn/ui components, demonstrating real-time WebGPU execution, three-pass WGSL shader rendering (Stroke, Inner, Bloom), and responsive CSS masking.

**Key Characteristics:**
- Dark technical surfaces with monospace status telemetry and live inspection cards.
- Live WebGPU execution highlighted with green and blue status badges.
- Clean component composition without redundant decorative borders.
- Monospace readouts and badges for parameters, shader names, and metrics.

## Colors

A restrained monochrome technical palette with semantic accents for WebGPU adapter and compilation telemetry.

### Primary
- **Deep Ink / Canvas** (`#0b0d10` / `oklch(0.14 0.018 260)`): The primary dark workbench background.
- **Light Contrast** (`#fbfaf8` / `oklch(0.985 0.005 90)`): High-contrast text and primary active buttons.

### Secondary
- **Adapter Green** (`#4dd293` / `#37c878` / `#46c787` / `#2caf72`): Active WebGPU adapter telemetry indicator and copy success state.
- **Shader Blue** (`#58a6ff` / `#6d9cff` / `#5b7dff`): Verified WGSL compilation and shader inspection indicator.

### Neutral
- **Card Surface** (`#12151a` / `oklch(0.18 0.02 260)`): Slightly elevated container surface for preview cards and inspector panels.
- **Muted Surface** (`#1c2128` / `oklch(0.22 0.02 260)`): Code blocks and inactive toggle backgrounds.
- **Muted Text** (`#6e7885` / `oklch(0.7 0.02 90)`): Monospace labels, descriptions, and metadata.
- **Hairline Border** (`#2a313c` / `oklch(0.3 0.018 260)`): 1px structural dividing lines.

### Named Rules
**The One Color Master Rule.** The component's animated color field carries all chromatic energy; surrounding controls and layout remain monochrome so the beam itself commands attention.

## Typography

**Display Font:** Geist Sans (with sans-serif fallback)
**Body Font:** Geist Sans (with sans-serif fallback)
**Label/Mono Font:** Geist Mono (with monospace fallback)

**Character:** Modern geometric sans with tight negative tracking for headlines, paired with a clean monospace face for technical telemetry and code.

### Hierarchy
- **Display** (600 weight, clamp(3.3rem, 6vw, 6.2rem), 0.87 line-height, -0.075em tracking): Primary hero title.
- **Headline** (550 weight, 27px, 1.2 line-height, -0.05em tracking): Section titles.
- **Title** (600 weight, 18px, 1.3 line-height, -0.03em tracking): Card and panel titles.
- **Body** (400 weight, 15px, 1.7 line-height, normal tracking): Descriptions and narrative copy.
- **Label** (500 weight, 11px, 1.4 line-height, 0.11em letter-spacing, uppercase): Telemetry badges, pass names, and metric labels.

## Layout

A balanced 1120px centered workbench shell. The hero uses an asymmetric two-column grid (copy left, oversized live preview right). The inspector uses a split layout (render target left, multi-tab inspector panel right). The playground uses a persistent side controls panel beside the live stage.

## Elevation & Depth

Surfaces rely on subtle tonal layering (`#0b0d10` canvas to `#12151a` card) and fine 1px hairline borders (`#2a313c`). Heavy drop shadows are omitted in favor of clean edge definition, letting the border-beam bloom provide natural visual elevation.

## Shapes

- **Base Radius:** 16px (1rem) on cards and preview stages, matching the default `md` border-beam radius.
- **Pill Radius:** 999px on badges, primary action buttons, and control chips.
- **Compact Radius:** 6px on code inline tags and small inputs.

## Components

### Buttons
- **Shape:** Rounded pill (999px) or standard rounded (6px).
- **Primary:** Full contrast inverted background (`#f5f5f7` text on `#17181c` in light, `#ffffff` text on dark).
- **Outline / Ghost:** Transparent background with hairline border or hover tint.

### Cards
- **Structure:** Always composed via `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`.
- **Background:** Elevated dark card background with 1px border.

### Badges
- **Style:** Small monospace uppercase text inside a pill outline or secondary filled container.

### Sliders & Toggles
- **Style:** shadcn `Slider` and `Button` controls with high-contrast active states and keyboard navigation support.

## Do's and Don'ts

### Do:
- **Do** compose all page elements using official shadcn primitives (`Button`, `Card`, `Badge`, `Separator`, `Tabs`, `Slider`, `Label`).
- **Do** provide clear feedback when copying install or playground code.
- **Do** preserve the live 3-pass vgpu rendering execution on every active beam.

### Don't:
- **Don't** add raw colorful backgrounds to container cards that compete with the border-beam color field.
- **Don't** use custom `space-y-*` or `space-x-*` classes; use `gap-*` in flex/grid containers.
- **Don't** remove the WebGPU fallback mechanism.
