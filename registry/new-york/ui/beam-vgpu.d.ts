// Internal subset of the pinned VGPU browser API used by Border Beam.
// Checked against the upstream implementation by shader-packaging.test.mjs.
export interface Gpu {
  dispose(): void
}

export interface Surface {
  readonly size: readonly [number, number]
  onResize(callback: () => void): () => void
  dispose(): void
}

export interface Effect {
  set(values: Record<string, unknown>): this
}

export interface SurfaceOptions {
  alphaMode?: 'premultiplied'
  clearColor?: readonly [number, number, number, number]
  dpr?: readonly [number, number]
  label?: string
}

export interface EffectOptions {
  blend?: 'premultiplied'
  label?: string
  set?: Record<string, unknown>
}

export interface Frame {
  pass(options: {
    target: Surface
    clear: readonly [number, number, number, number]
  }, effect: Effect): void
}

export declare function init(): Promise<Gpu>
export declare function clock(gpu: Gpu): { readonly time: number }
export declare function surface(gpu: Gpu, canvas: HTMLCanvasElement, options: SurfaceOptions): Surface
export declare function effect(gpu: Gpu, shader: { readonly version: 1; readonly wgsl: string }, options: EffectOptions): Effect
export declare function frame(gpu: Gpu, callback: (frame: Frame) => void): void
export declare function frameLoop(gpu: Gpu, callback: (frame: Frame) => void, options: { fps: number }): { stop(): void }
