import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'

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
  browser('wait', '--fn', '!document.querySelector(".specimen-beam").hasAttribute("data-fading")')
  assert.equal(sampleBreathing().length, 1, 'hidden effect must stop breathing')
})
