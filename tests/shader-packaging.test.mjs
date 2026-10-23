import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { fileURLToPath } from 'node:url'
import wgslWebpackLoader from '@vgpu/wgsl/loader-webpack'
import ts from 'typescript'

const shaderPath = new URL('../registry/new-york/ui/beam-color.wgsl', import.meta.url)
const modulePath = new URL('../registry/new-york/ui/beam-color-shader.ts', import.meta.url)

test('the shipped TypeScript shader matches the official VGPU loader artifact', () => {
  const wgsl = readFileSync(shaderPath, 'utf8')
  const officialModule = wgslWebpackLoader.call({ resourcePath: shaderPath.pathname }, wgsl)
  const officialContext = { shader: null }
  runInNewContext(officialModule.replace('export default ', 'shader = '), officialContext)
  const expected = JSON.parse(JSON.stringify(officialContext.shader))
  const compiled = ts.transpileModule(readFileSync(modulePath, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  })
  const context = { exports: {} }
  runInNewContext(compiled.outputText, context)
  // Normalize the VM realm before comparing the public loader contract.
  assert.deepEqual(JSON.parse(JSON.stringify(context.exports.default)), expected)
  assert.equal(expected.version, 1)
  assert.equal(expected.wgsl, wgsl)
})

test('palette generation reproduces the checked-in shader source and module', () => {
  const before = [shaderPath, modulePath].map(path => readFileSync(path, 'utf8'))
  execFileSync(process.execPath, ['scripts/generate-css.mjs'], {
    cwd: new URL('..', import.meta.url),
    stdio: 'pipe',
  })
  assert.deepEqual([shaderPath, modulePath].map(path => readFileSync(path, 'utf8')), before)
})

test('the renderer imports local shader and browser runtime modules without type setup', () => {
  const renderer = readFileSync(new URL('../registry/new-york/ui/beam-color-renderer.ts', import.meta.url), 'utf8')
  assert.match(renderer, /import beamColorShader from "\.\/beam-color-shader"/)
  assert.doesNotMatch(renderer, /from ["'][^"']+\.wgsl["']/)
  assert.match(renderer, /from "\.\/beam-vgpu\.js"/)
  assert.doesNotMatch(renderer, /from "vgpu"|reference types=/)
})

test('the bundled browser runtime is reproducible, licensed, and has no runtime imports', async () => {
  const runtimePath = new URL('../registry/new-york/ui/beam-vgpu.js', import.meta.url)
  const before = readFileSync(runtimePath, 'utf8')
  execFileSync(process.execPath, ['scripts/generate-vgpu-runtime.mjs'], {
    cwd: new URL('..', import.meta.url), stdio: 'pipe',
  })
  assert.equal(readFileSync(runtimePath, 'utf8'), before)
  assert.match(before, /Copyright \(c\) 2025 Vercel, Inc\./)
  assert.match(before, /Permission is hereby granted, free of charge/)
  const parsed = ts.createSourceFile('beam-vgpu.js', before, ts.ScriptTarget.ES2020, true, ts.ScriptKind.JS)
  const inspect = node => {
    assert.ok(!ts.isImportDeclaration(node) && !(ts.isExportDeclaration(node) && node.moduleSpecifier),
      'browser runtime must not import external modules')
    if (ts.isCallExpression(node)) {
      assert.ok(node.expression.kind !== ts.SyntaxKind.ImportKeyword && node.expression.getText(parsed) !== 'require',
        'browser runtime must not dynamically load modules')
    }
    ts.forEachChild(node, inspect)
  }
  inspect(parsed)
  const runtime = await import(`data:text/javascript;base64,${Buffer.from(before).toString('base64')}`)
  assert.deepEqual(Object.keys(runtime).sort(), ['clock', 'effect', 'frame', 'frameLoop', 'init', 'surface'])
  assert.ok(Object.values(runtime).every(value => typeof value === 'function'))
})

test('the internal browser API types match the upstream calls used by the renderer', () => {
  const contractPath = fileURLToPath(new URL('./vgpu-contract.ts', import.meta.url))
  const source = `
    import * as upstream from 'vgpu'
    import type * as local from '../registry/new-york/ui/beam-vgpu.js'
    async function contract() {
      const gpu = await upstream.init()
      const handle: local.Gpu = gpu
      const surfaceOptions = {} as local.SurfaceOptions
      const output = upstream.surface(gpu, document.createElement('canvas'), surfaceOptions)
      const canvas: local.Surface = output
      const effectOptions = {} as local.EffectOptions
      const shader = { version: 1 as const, wgsl: '' }
      const effect = upstream.effect(gpu, shader, effectOptions)
      const render: local.Effect = effect
      const clock: ReturnType<typeof local.clock> = upstream.clock(gpu)
      const clear: Parameters<local.Frame['pass']>[0]['clear'] = [0, 0, 0, 0]
      upstream.frame(gpu, frame => frame.pass({ target: output, clear }, effect))
      const loop: ReturnType<typeof local.frameLoop> = upstream.frameLoop(gpu, frame => {
        frame.pass({ target: output, clear }, effect)
      }, { fps: 30 })
      render.set({ params: { time: clock.time } })
      canvas.onResize(() => {})()
      canvas.dispose()
      loop.stop()
      handle.dispose()
    }
    void contract
  `
  const options = {
    strict: true, noEmit: true, skipLibCheck: true,
    target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    types: ['@webgpu/types'],
  }
  const host = ts.createCompilerHost(options)
  const originalGetSourceFile = host.getSourceFile.bind(host)
  host.getSourceFile = (path, ...args) => path === contractPath
    ? ts.createSourceFile(path, source, options.target, true)
    : originalGetSourceFile(path, ...args)
  const program = ts.createProgram([contractPath], options, host)
  const diagnostics = ts.getPreEmitDiagnostics(program)
  assert.equal(diagnostics.length, 0, ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: path => path,
    getCurrentDirectory: () => process.cwd(),
    getNewLine: () => '\n',
  }))
})
