import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { runInNewContext } from 'node:vm'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import ts from 'typescript'

const session = `pulse-regression-${process.pid}`
function browser(...args) {
  return execFileSync('agent-browser', ['--session', session, ...args], { encoding: 'utf8' }).trim()
}
after(() => browser('close'))

function sampleBreathing() {
  return JSON.parse(browser('eval', `new Promise(resolve => {
    const root = document.querySelector('.specimen-beam');
    const samples = [];
    let start;
    function sample(time) {
      start ??= time;
      samples.push(root.style.getPropertyValue('--bw1'));
      if (time - start < 500) requestAnimationFrame(sample);
      else resolve([...new Set(samples)]);
    }
    requestAnimationFrame(sample);
  })`))
}

test('GPU pulse retains breathing in the visible CSS composite, including mono', () => {
  browser('--webgpu', 'open', process.env.TEST_URL ?? 'http://localhost:3000')
  browser('wait', 'header')
  browser('find', 'role', 'tab', 'click', '--name', 'Pulse', '--exact')
  browser('wait', '.specimen-beam[data-vgpu-colors]')
  for (const size of ['pulse-inner', 'pulse-outside']) {
    browser('find', 'role', 'radio', 'click', '--name', size, '--exact')
    for (const palette of ['colorful', 'mono']) {
      browser('find', 'role', 'radio', 'click', '--name', palette, '--exact')
      const samples = sampleBreathing()
      assert.ok(samples.length > 1 && samples.every(Boolean), `${size}/${palette} must breathe after GPU initialization: ${samples}`)
    }
  }
  browser('find', 'role', 'button', 'click', '--name', 'Hide effects', '--exact')
  browser('wait', '--fn', '!document.querySelector(".specimen-beam").hasAttribute("data-active") && !document.querySelector(".specimen-beam").hasAttribute("data-fading")')
  assert.equal(sampleBreathing().length, 1, 'hidden effect must stop breathing')
})

test('changing reduced motion preserves a static visible effect and completes deactivation', () => {
  browser('set', 'media', 'dark')
  browser('open', process.env.TEST_URL ?? 'http://localhost:3000')
  browser('wait', 'header')
  browser('find', 'role', 'tab', 'click', '--name', 'Pulse', '--exact')
  assert.ok(sampleBreathing().length > 1, 'pulse starts animated')
  browser('set', 'media', 'dark', 'reduced-motion')
  assert.equal(sampleBreathing().length, 1, 'running pulse stops when the preference changes')
  assert.equal(JSON.parse(browser('eval', 'Number(getComputedStyle(document.querySelector(".specimen-beam")).getPropertyValue("--beam-opacity")) > 0')), true, 'reduced motion keeps the active border visible')
  assert.equal(JSON.parse(browser('eval', 'document.querySelector(".specimen-beam").hasAttribute("data-vgpu-colors")')), false, 'reduced motion releases the GPU renderer')
  browser('open', process.env.TEST_URL ?? 'http://localhost:3000')
  browser('wait', 'header')
  browser('find', 'role', 'tab', 'click', '--name', 'Pulse', '--exact')
  assert.equal(sampleBreathing().length, 1, 'pulse also stays static on initial load')
  assert.equal(JSON.parse(browser('eval', 'Number(getComputedStyle(document.querySelector(".specimen-beam")).getPropertyValue("--beam-opacity"))')), 1, 'initial reduced motion keeps the active border visible')
  browser('find', 'role', 'button', 'click', '--name', 'Hide effects', '--exact')
  browser('wait', '--fn', '!document.querySelector(".specimen-beam").hasAttribute("data-active") && !document.querySelector(".specimen-beam").hasAttribute("data-fading")')
  browser('find', 'role', 'button', 'click', '--name', 'Show effects', '--exact')
  assert.equal(JSON.parse(browser('eval', 'Number(getComputedStyle(document.querySelector(".specimen-beam")).getPropertyValue("--beam-opacity"))')), 1)
  browser('set', 'media', 'dark')
  assert.ok(sampleBreathing().length > 1, 'pulse resumes when reduced motion is disabled')
})

test('auto theme renders a stable server snapshot even with browser APIs present', () => {
  const require = createRequire(import.meta.url)
  const source = readFileSync(new URL('../registry/new-york/ui/border-beam.tsx', import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  })
  function render(window) {
    const compiled = { exports: {} }
    runInNewContext(outputText, {
      module: compiled, exports: compiled.exports, window,
      require: (id) => id.startsWith('./') ? {} : require(id),
    })
    return renderToString(createElement(compiled.exports.BorderBeam, { theme: 'auto' }, createElement('button', null, 'Continue')))
  }
  const server = render(undefined)
  const browserEnvironment = render({ matchMedia: () => ({ matches: false }) })
  assert.equal(browserEnvironment, server, 'prerendered markup must not depend on a browser-only light preference')
  assert.match(server, /data-theme="dark"/)
})
