import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const session = `border-beam-ui-regression-${process.pid}`
function browser(...args) {
  return execFileSync('agent-browser', ['--session', session, ...args], { encoding: 'utf8' }).trim()
}
function evaluate(expression) {
  return JSON.parse(browser('eval', expression))
}
function waitFor(expression) {
  browser('wait', '--fn', expression)
}
after(() => browser('close'))

test('showcase configuration, copy feedback, theme and responsive layout', () => {
  browser('open', process.env.TEST_URL ?? 'http://localhost:3000')
  browser('wait', 'header')
  browser('set', 'viewport', '1280', '800')
  assert.equal(evaluate('document.querySelector("header").textContent.includes("border-beam")'), true)
  assert.equal(evaluate('document.title.includes("Frad") && document.querySelector("header").textContent.includes("by Frad")'), true)
  assert.equal(evaluate('document.querySelector(".specimen-card").getBoundingClientRect().bottom < innerHeight'), true, 'complete preview is visible on arrival')
  browser('click', '.usage-panel > summary')
  browser('find', 'role', 'tab', 'click', '--name', 'Pulse', '--exact')
  waitFor('document.querySelector("[data-testid=beam-preview]").dataset.size === "pulse-inner"')
  assert.equal(evaluate('document.querySelector("[data-testid=beam-preview]").dataset.size'), 'pulse-inner')
  browser('find', 'role', 'radio', 'click', '--name', 'pulse-outside', '--exact')
  browser('find', 'role', 'radio', 'click', '--name', 'ocean', '--exact')
  waitFor('document.querySelector("#usage-code").textContent.includes("ocean")')
  assert.match(evaluate('document.querySelector("#usage-code").textContent'), /pulse-outside.*\n.*ocean/)
  browser('focus', '[role="slider"][aria-labelledby="strength-label"]')
  browser('press', 'ArrowRight')
  waitFor('document.querySelector("#usage-code").textContent.includes("strength={0.71}")')
  assert.match(evaluate('document.querySelector("#usage-code").textContent'), /strength=\{0\.71\}/)
  browser('find', 'role', 'button', 'click', '--name', 'Hide effects', '--exact')
  waitFor('document.querySelector("#usage-code").textContent.includes("active={false}")')
  assert.match(evaluate('document.querySelector("#usage-code").textContent'), /active=\{false\}/)
  browser('find', 'role', 'tab', 'click', '--name', 'Rotate', '--exact')
  waitFor('document.querySelector("[data-testid=beam-preview]").dataset.size === "md"')
  assert.equal(evaluate('document.querySelector("[data-testid=beam-preview]").dataset.size'), 'md')
  browser('find', 'role', 'tab', 'click', '--name', 'Pulse', '--exact')
  waitFor('document.querySelector("[data-testid=beam-preview]").dataset.size === "pulse-outside"')
  browser('focus', '[role="slider"][aria-labelledby="duration-label"]')
  browser('press', 'ArrowRight')
  waitFor('document.querySelector("#usage-code").textContent.includes("duration={2.4}")')
  browser('find', 'role', 'button', 'click', '--name', 'Switch to light theme', '--exact')
  waitFor('!document.documentElement.classList.contains("dark")')
  assert.equal(evaluate('document.documentElement.classList.contains("dark")'), false)
  assert.equal(evaluate('getComputedStyle(document.querySelector("[role=tab][data-state=inactive]")).color'), evaluate('getComputedStyle(document.querySelector(".workbench-footnote")).color'))
  waitFor('document.querySelector("#usage-code").textContent.includes(`theme="light"`)')
  browser('eval', 'Object.defineProperty(navigator.clipboard, "writeText", { configurable: true, value: async () => { throw new Error("Denied") } })')
  browser('find', 'role', 'button', 'click', '--name', 'Copy usage code', '--exact')
  browser('wait', '--text', 'Select and copy the code manually.')
  browser('eval', 'Object.defineProperty(navigator.clipboard, "writeText", { configurable: true, value: async (text) => { window.copiedCode = text } })')
  browser('find', 'role', 'button', 'click', '--name', 'Copy usage code', '--exact')
  browser('wait', '--text', 'Copied')
  assert.equal(evaluate('window.copiedCode'), evaluate('document.querySelector("#usage-code").textContent'))
  browser('find', 'role', 'button', 'click', '--name', 'Reset playground', '--exact')
  waitFor('document.querySelector(".toolbar-actions button").disabled')
  assert.match(evaluate('document.querySelector("#usage-code").textContent'), /size="md"[\s\S]*colorVariant="colorful"[\s\S]*strength=\{0.7\}[\s\S]*duration=\{2.3\}[\s\S]*active=\{true\}/)
  assert.equal(evaluate('document.querySelector(".usage-panel button").textContent'), 'Copy', 'copy feedback resets when the snippet changes')
  browser('fill', '#example-name', 'Aurora')
  browser('fill', '#example-idea', 'A brighter interface')
  browser('find', 'role', 'radio', 'click', '--name', 'Pulse wrappers', '--exact')
  waitFor('document.querySelector(".examples-grid").dataset.family === "pulse"')
  assert.equal(evaluate('document.querySelector("#example-name").value'), 'Aurora')
  assert.equal(evaluate('document.querySelector("#example-idea").value'), 'A brighter interface')
  assert.equal(evaluate('Array.from(document.querySelectorAll("#components code")).every(code => code.textContent.includes("/r/border-beam-pulse-"))'), true)
  browser('click', '#components .example-card:first-child summary')
  browser('wait', '--text', 'border-beam-pulse-button.json')
  for (const width of [320, 390, 768, 1440]) {
    browser('set', 'viewport', String(width), '900')
    assert.equal(evaluate('document.documentElement.scrollWidth <= innerWidth'), true, `overflow at ${width}px`)
    assert.equal(evaluate('Array.from(document.querySelectorAll(".workbench-toolbar button")).every(button => button.getBoundingClientRect().right <= document.querySelector(".workbench").getBoundingClientRect().right)'), true, `clipped toolbar at ${width}px`)
    if (process.env.TEST_SCREENSHOT_DIR) {
      mkdirSync(process.env.TEST_SCREENSHOT_DIR, { recursive: true })
      browser('eval', 'window.scrollTo(0, 0)')
      browser('screenshot', join(process.env.TEST_SCREENSHOT_DIR, `light-${width}.png`), '--full')
    }
  }
  assert.equal(evaluate('document.body.textContent.includes("ADAPTER READY")'), false)
  browser('open', process.env.TEST_URL ?? 'http://localhost:3000')
  browser('wait', 'header')
  waitFor('!document.documentElement.classList.contains("dark")')
  assert.equal(evaluate('document.documentElement.classList.contains("dark")'), false, 'theme survives a reload')
  browser('find', 'role', 'button', 'click', '--name', 'Switch to dark theme', '--exact')
  waitFor('document.documentElement.classList.contains("dark")')
  if (process.env.TEST_SCREENSHOT_DIR) {
    browser('screenshot', join(process.env.TEST_SCREENSHOT_DIR, 'dark-desktop.png'), '--full')
  }
})
