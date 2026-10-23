---
name: vgpu-color-rendering
category: decision
summary: border-beam uses vgpu for the dynamic color layer while preserving static CSS geometry and fallback
source: border-beam
created: 2026-08-28
updated: 2026-10-24
---

## Fact

All animated border, line, and pulse variants render a dynamic color pass with vgpu/WebGPU while preserving the upstream CSS visual composite. Static or mono palettes still advance geometry in the shader while disabling hue rotation. The WGSL shader is generated from the same upstream-derived palette data as the CSS. Existing CSS masks, geometry, opacity, and static palettes remain the source of truth for visual fidelity and fallback behavior.

## How to apply

- `registry/new-york/ui/beam-color.wgsl` is the shader source; validate it with `npx vgpu check ... --require-validation`.
- `registry/new-york/ui/beam-color-renderer.ts` owns the shared browser GPU context and frame loop, and reference-counts each canvas surface for React Strict Mode cleanup.
- `scripts/generate-css.mjs` uses the official pinned vgpu loader at registry build time to generate `beam-color-shader.ts` from the same WGSL. The renderer imports that TypeScript module and a bundled vgpu browser runtime with self-contained internal types. Consuming Next.js projects need no WGSL loader, config change, project-level type declaration, or native build approval.
- `scripts/generate-css.mjs` remains the CSS source of truth. Generated `border-beam.css` retains the upstream visual-composite layers when `data-vgpu-colors` is active, while the shader advances geometry and color time for every animated palette.
- Pin `vgpu@0.3.1` as an authoring dependency and generate the browser runtime at registry build time. Do not install its Node adapter dependency tree in consumer apps: pnpm 12 rejects the native build scripts. Preserve upstream licenses in the generated browser runtime. Keep raw WGSL in the repository for validation; do not install it as an application module.
- `pnpm-workspace.yaml` overrides only VGPU's authoring MCP server to `2.3.1` to fix its security advisories. Keep the VGPU browser packages pinned. Exact Next.js `16.4.3` release-age exceptions permit this reviewed stable patch without exempting future versions.

## Verification

Verified on 2026-10-24:

- `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`, and `pnpm registry:build` passed. All nine local regressions passed, including the browser GPU path, live reduced-motion changes, stable SSR markup, and reproducible shader/runtime packaging.
- A fresh `node:24-bookworm` Docker run installed the public registry with the exact README command into default and `src/` Next.js projects. Node 24.22.1, pnpm 12.15.0, Next.js 16.4.2, and shadcn 4.22.1 passed both type checks and production builds. Next.js configuration stayed byte-for-byte unchanged; no project-level ambient declarations or GPU package dependencies were added.
- All four Docker browser tests passed. They cover all five presets, palette changes, hide/show, and functional CSS fallback with actual gradients, masks, opacity, and animation. Docker exposed WebGPU but had no adapter, so GPU-path evidence comes from the separate local browser regression.
- The public endpoint matches generated registry SHA-256 `b2a385f85a07c07e00e70b8b0c6aed28005cea74c2afec8d93bc8b129ce2040e`. Vercel deployment `dpl_61cTR3oQPZgrSR7NFaWB2eq7Gz2n` was promoted to `https://border-beam.vercel.app` before the final public Docker run.
- Browser bundle and installation-contract changes received an independent review. Full Docker logs, traces, screenshots, and results are in `/tmp/border-beam-zero-config-public-pnpm12-20261024/` on the verification host.
- Security maintenance upgraded Next.js and its ESLint configuration to `16.4.3`, shadcn to `4.22.1`, and vulnerable transitive dependencies within their existing major versions. A full audit found zero known vulnerabilities across 753 packages. Independent checks confirmed that 57 of the 58 captured GitHub alerts no longer match the locked versions. Alert `#141` was dismissed as inaccurate because [upstream withdrew its braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm); no active advisory was suppressed.
- After the security update, all nine local regressions passed. A fresh Docker source snapshot passed frozen installation, full audit, lint, type generation/checking, registry reproduction, and the Next.js `16.4.3` production build. The locked VGPU runtime and all generated registry files stayed byte-identical. Evidence is in `/tmp/border-beam-security-clean-docker-20261024/` and `/tmp/border-beam-security-host-tests-20261024.log` on the verification host.
- A separate fresh public installation run passed all 26 steps and four browser tests for default and `src/` consumers. Those create-next-app consumers resolved Next.js `16.4.2`; this run checks installation compatibility, while the separate source-snapshot audit and build verify this repository's patched dependencies. Evidence is in `/tmp/border-beam-security-registry-install-20261024/`.
