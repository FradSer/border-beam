import { clock, effect, frame, frameLoop, init, surface } from "vgpu"
import beamColorShader from "./beam-color.wgsl"

import type { BorderBeamColorVariant, BorderBeamSize } from "./border-beam"

export type BeamColorLayer = "stroke" | "inner" | "bloom"

export interface BeamColorRendererHandle {
  update(options: BeamColorRendererOptions): void
  setVisible(visible: boolean): void
  dispose(): void
}

export interface BeamColorRendererOptions {
  variant: BorderBeamColorVariant
  size: BorderBeamSize
  theme: "dark" | "light"
  hueRange: number
  brightness: number
  saturation: number
  duration: number
  staticColors: boolean
  pulseGlowScale: { x: number; y: number }
  root: HTMLElement
  reducedMotion: boolean
}

type Gpu = Awaited<ReturnType<typeof init>>
type BeamSurface = ReturnType<typeof surface>
type BeamEffect = ReturnType<typeof effect>

type LayerEntry = {
  canvas: HTMLCanvasElement
  surface: BeamSurface
  effect: BeamEffect
  layer: BeamColorLayer
  unsubscribeResize: () => void
}

type ManagedEntry = {
  canvases: HTMLCanvasElement[]
  layers: LayerEntry[]
  root: HTMLElement
  options: BeamColorRendererOptions
  leases: number
  animated: boolean
  visible: boolean
  rootObserver?: ResizeObserver
  update(options: BeamColorRendererOptions): void
  disposeUnderlying(): void
}

const LAYERS: BeamColorLayer[] = ["stroke", "inner", "bloom"]
const MODE: Record<BorderBeamSize, number> = {
  sm: 1,
  md: 0,
  line: 2,
  "pulse-inner": 3,
  "pulse-outside": 4,
}
const VARIANT: Record<BorderBeamColorVariant, number> = {
  colorful: 0,
  mono: 1,
  ocean: 2,
  sunset: 3,
}

let gpuPromise: Promise<Gpu> | null = null
let sharedGpu: Gpu | null = null
let sharedLoop: ReturnType<typeof frameLoop> | null = null
let pendingRendererStarts = 0
const managedEntries = new Set<ManagedEntry>()
const animatedEntries = new Set<ManagedEntry>()
const canvasEntries = new WeakMap<HTMLCanvasElement, ManagedEntry>()

function getSharedGpu(): Promise<Gpu> {
  if (!gpuPromise) {
    gpuPromise = init().then(
      (gpu) => {
        sharedGpu = gpu
        return gpu
      },
      (error) => {
        gpuPromise = null
        throw error
      }
    )
  }
  return gpuPromise
}

function stopSharedGpuIfUnused(gpu: Gpu): void {
  if (
    managedEntries.size > 0 ||
    pendingRendererStarts > 0 ||
    sharedGpu !== gpu
  ) return
  sharedLoop?.stop()
  sharedLoop = null
  sharedGpu = null
  gpuPromise = null
  gpu.dispose()
}

function colorIndex(variant: BorderBeamColorVariant): number {
  return VARIANT[variant]
}

function setEffectParams(
  entry: ManagedEntry,
  layer: LayerEntry,
  time: number
): void {
  const rootRect = entry.root.getBoundingClientRect()
  const canvasRect = layer.canvas.getBoundingClientRect()
  const canvasWidth = Math.max(layer.surface.size[0], 1)
  const canvasClientWidth = Math.max(layer.canvas.clientWidth, 1)
  const dpr = canvasWidth / canvasClientWidth
  const rootWidth = Math.max(rootRect.width * dpr, canvasWidth)
  const rootHeight = Math.max(rootRect.height * dpr, layer.surface.size[1])

  layer.effect.set({
    params: {
      time,
      variant: colorIndex(entry.options.variant),
      hueRange: entry.options.hueRange,
      brightness: entry.options.brightness,
      saturation: entry.options.saturation,
      mode: MODE[entry.options.size],
      dark: entry.options.theme === "dark" ? 1 : 0,
      width: layer.surface.size[0],
      height: layer.surface.size[1],
      rootWidth,
      rootHeight,
      duration: Math.max(entry.options.duration, 0.001),
      staticColors: entry.options.staticColors ? 1 : 0,
      pulseScaleX: entry.options.pulseGlowScale.x,
      pulseScaleY: entry.options.pulseGlowScale.y,
      offsetX: (canvasRect.left - rootRect.left) * dpr,
      offsetY: (canvasRect.top - rootRect.top) * dpr,
      layer: LAYERS.indexOf(layer.layer),
    },
  })
}

function renderStatic(gpu: Gpu, entry: ManagedEntry): void {
  frame(gpu, (currentFrame) => {
    for (const layer of entry.layers) {
      setEffectParams(entry, layer, 0)
      currentFrame.pass(
        { target: layer.surface, clear: [0, 0, 0, 0] },
        layer.effect
      )
    }
  })
}

function ensureSharedLoop(gpu: Gpu): void {
  if (sharedLoop || animatedEntries.size === 0) return
  const time = clock(gpu)
  sharedLoop = frameLoop(gpu, (currentFrame) => {
    animatedEntries.forEach((entry) => {
      entry.layers.forEach((layer) => {
        setEffectParams(entry, layer, time.time)
        currentFrame.pass(
          { target: layer.surface, clear: [0, 0, 0, 0] },
          layer.effect
        )
      })
    })
  }, { fps: 30 })
}

function updateAnimationMembership(
  gpu: Gpu,
  entry: ManagedEntry,
  animated: boolean
): void {
  entry.animated = animated
  if (animated && entry.visible) {
    animatedEntries.add(entry)
    ensureSharedLoop(gpu)
    return
  }

  animatedEntries.delete(entry)
  renderStatic(gpu, entry)
  if (animatedEntries.size === 0) {
    sharedLoop?.stop()
    sharedLoop = null
  }
}

function createLease(
  canvases: HTMLCanvasElement[],
  entry: ManagedEntry,
  gpu: Gpu
): BeamColorRendererHandle {
  entry.leases += 1
  let disposed = false
  return {
    update(options) {
      if (disposed) return
      entry.update(options)
    },
    setVisible(visible) {
      if (disposed || entry.visible === visible) return
      entry.visible = visible
      updateAnimationMembership(gpu, entry, entry.animated)
    },
    dispose() {
      if (disposed) return
      disposed = true
      entry.leases -= 1
      if (entry.leases > 0) return

      managedEntries.delete(entry)
      animatedEntries.delete(entry)
      entry.rootObserver?.disconnect()
      entry.layers.forEach((layer) => {
        layer.unsubscribeResize()
        layer.surface.dispose()
      })
      canvases.forEach((canvas) => canvasEntries.delete(canvas))
      if (animatedEntries.size === 0) {
        sharedLoop?.stop()
        sharedLoop = null
      }
      if (sharedGpu) stopSharedGpuIfUnused(sharedGpu)
    },
  }
}

function installGeometryObservers(gpu: Gpu, entry: ManagedEntry): void {
  const update = () => {
    entry.layers.forEach((layer) => setEffectParams(entry, layer, 0))
    if (!entry.animated) renderStatic(gpu, entry)
  }

  if (typeof ResizeObserver !== "undefined") {
    entry.rootObserver = new ResizeObserver(update)
    entry.rootObserver.observe(entry.root)
  }
}

export async function startBeamColorRenderer(
  canvases: HTMLCanvasElement[],
  options: BeamColorRendererOptions
): Promise<BeamColorRendererHandle> {
  const existingBeforeInit = canvasEntries.get(canvases[0])
  if (existingBeforeInit) {
    existingBeforeInit.update(options)
    return createLease(canvases, existingBeforeInit, sharedGpu!)
  }

  pendingRendererStarts += 1
  let pending = true
  const finishPending = () => {
    if (!pending) return
    pending = false
    pendingRendererStarts -= 1
  }

  let gpu: Gpu
  try {
    gpu = await getSharedGpu()
    const existing = canvasEntries.get(canvases[0])
    if (existing) {
      existing.update(options)
      finishPending()
      return createLease(canvases, existing, gpu)
    }
  } catch (error) {
    finishPending()
    throw error
  }

  const layers: LayerEntry[] = []
  try {
    for (let index = 0; index < LAYERS.length; index += 1) {
      const canvas = canvases[index]
      const output = surface(gpu, canvas, {
        alphaMode: "premultiplied",
        clearColor: [0, 0, 0, 0],
        dpr: [1, 2],
        label: `border-beam-${LAYERS[index]}`,
      })
      const color = effect(gpu, beamColorShader, {
        blend: "premultiplied",
        label: `border-beam-${LAYERS[index]}`,
        set: {
          params: {
            time: 0,
            variant: colorIndex(options.variant),
            hueRange: options.hueRange,
            brightness: options.brightness,
            saturation: options.saturation,
            mode: MODE[options.size],
            dark: options.theme === "dark" ? 1 : 0,
            width: output.size[0],
            height: output.size[1],
            rootWidth: output.size[0],
            rootHeight: output.size[1],
            duration: Math.max(options.duration, 0.001),
            staticColors: options.staticColors ? 1 : 0,
            pulseScaleX: options.pulseGlowScale.x,
            pulseScaleY: options.pulseGlowScale.y,
            offsetX: 0,
            offsetY: 0,
            layer: index,
          },
        },
      })
      const layer: LayerEntry = {
        canvas,
        surface: output,
        effect: color,
        layer: LAYERS[index],
        unsubscribeResize: () => undefined,
      }
      layers.push(layer)
    }

    const entry: ManagedEntry = {
      canvases,
      layers,
      root: options.root,
      options,
      leases: 0,
      animated: false,
      visible: true,
      update(nextOptions: BeamColorRendererOptions) {
        entry.options = nextOptions
        layers.forEach((layer) => setEffectParams(entry, layer, 0))
        updateAnimationMembership(gpu, entry, shouldAnimate(nextOptions))
      },
      disposeUnderlying() {
        animatedEntries.delete(entry)
        managedEntries.delete(entry)
        entry.rootObserver?.disconnect()
        layers.forEach((layer) => {
          layer.unsubscribeResize()
          layer.surface.dispose()
        })
        stopSharedGpuIfUnused(gpu)
      },
    }

    layers.forEach((layer) => {
      layer.unsubscribeResize = layer.surface.onResize(() => {
        setEffectParams(entry, layer, 0)
      })
    })
    managedEntries.add(entry)
    canvases.forEach((canvas) => canvasEntries.set(canvas, entry))
    installGeometryObservers(gpu, entry)
    updateAnimationMembership(gpu, entry, shouldAnimate(options))
    finishPending()
    return createLease(canvases, entry, gpu)
  } catch (error) {
    finishPending()
    layers.forEach((layer) => {
      layer.unsubscribeResize()
      layer.surface.dispose()
    })
    stopSharedGpuIfUnused(gpu)
    throw error
  }
}

function shouldAnimate(options: BeamColorRendererOptions): boolean {
  return !options.reducedMotion
}
