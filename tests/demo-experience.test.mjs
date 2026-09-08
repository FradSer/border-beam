import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'

const session = `border-beam-ui-regression-${process.pid}`
function browser(...args) {
  return execFileSync('agent-browser', ['--session', session, ...args], { encoding: 'utf8' }).trim()
}
function evaluate(expression) {
  return JSON.parse(browser('eval', expression))
}
after(() => browser('close'))

test('showcase configuration, copy feedback, theme and responsive layout', () => {
  browser('open', process.env.TEST_URL ?? 'http://localhost:3000')
  browser('wait', 'header')
  assert.equal(evaluate('document.querySelector("header").textContent.includes("border-beam")'), true)
  browser('find', 'role', 'tab', 'click', '--name', 'Pulse', '--exact')
  assert.equal(evaluate('document.querySelector("[data-testid=beam-preview]").dataset.size'), 'pulse-inner')
  browser('find', 'role', 'radio', 'click', '--name', 'pulse-outside', '--exact')
  browser('find', 'role', 'radio', 'click', '--name', 'ocean', '--exact')
  assert.match(evaluate('document.querySelector("#usage-code").textContent'), /pulse-outside.*\n.*ocean/)
  browser('focus', '[role="slider"][aria-labelledby="strength-label"]')
  browser('press', 'ArrowRight')
  assert.match(evaluate('document.querySelector("#usage-code").textContent'), /strength=\{0\.71\}/)
  browser('find', 'role', 'button', 'click', '--name', 'Hide effects', '--exact')
  assert.match(evaluate('document.querySelector("#usage-code").textContent'), /active=\{false\}/)
  browser('find', 'role', 'tab', 'click', '--name', 'Rotate', '--exact')
  assert.equal(evaluate('document.querySelector("[data-testid=beam-preview]").dataset.size'), 'md')
  browser('find', 'role', 'button', 'click', '--name', 'Switch to light theme', '--exact')
  assert.equal(evaluate('document.documentElement.classList.contains("dark")'), false)
  assert.equal(evaluate('getComputedStyle(document.querySelector("[role=tab][data-state=inactive]")).color'), evaluate('getComputedStyle(document.querySelector(".parameter-note")).color'))
  browser('eval', 'Object.defineProperty(navigator.clipboard, "writeText", { configurable: true, value: async () => { throw new Error("Denied") } })')
  browser('find', 'role', 'button', 'click', '--name', 'Copy usage code', '--exact')
  browser('wait', '--text', 'Select and copy the code manually.')
  browser('eval', 'Object.defineProperty(navigator.clipboard, "writeText", { configurable: true, value: async (text) => { window.copiedCode = text } })')
  browser('find', 'role', 'button', 'click', '--name', 'Copy usage code', '--exact')
  browser('wait', '--text', 'Copied')
  assert.equal(evaluate('window.copiedCode'), evaluate('document.querySelector("#usage-code").textContent'))
  for (const width of [320, 390, 768, 1440]) {
    browser('set', 'viewport', String(width), '900')
    assert.equal(evaluate('document.documentElement.scrollWidth <= innerWidth'), true, `overflow at ${width}px`)
    assert.equal(evaluate('Array.from(document.querySelectorAll(".workbench-toolbar button")).every(button => button.getBoundingClientRect().right <= document.querySelector(".workbench").getBoundingClientRect().right)'), true, `clipped toolbar at ${width}px`)
  }
  assert.equal(evaluate('document.body.textContent.includes("ADAPTER READY")'), false)
})
