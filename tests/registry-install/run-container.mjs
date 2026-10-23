import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { createHash } from "node:crypto"
import { copyFile, cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises"

const evidence = "/work/evidence"
await mkdir(evidence, { recursive: true })
const stages = []
async function run(label, executable, args, cwd = "/work") {
  console.log(`Starting ${label}`)
  const child = spawn(executable, args, { cwd, env: process.env, stdio: ["ignore", "pipe", "pipe"] })
  let log = ""
  child.stdout.on("data", chunk => { log += chunk })
  child.stderr.on("data", chunk => { log += chunk })
  const code = await new Promise((resolve, reject) => { child.once("error", reject); child.once("exit", resolve) })
  await writeFile(`${evidence}/${label}.log`, log)
  stages.push({ label, executable, args, cwd, code })
  await writeFile(`${evidence}/stages.json`, JSON.stringify(stages, null, 2))
  if (code !== 0) throw new Error(`${label} failed (${code}):\n${log.slice(-6000)}`)
  console.log(`Passed ${label}`)
  return log
}

const registryUrl = process.env.BORDER_BEAM_REGISTRY_URL
const pnpmVersion = process.env.BORDER_BEAM_PNPM_VERSION ?? "latest"
const versions = { node: process.version, pnpm: null, layouts: {} }
assert.ok(registryUrl, "BORDER_BEAM_REGISTRY_URL is required")
try {
  const response = await fetch(registryUrl, { signal: AbortSignal.timeout(30000) })
  assert.equal(response.status, 200)
  const registry = await response.text()
  JSON.parse(registry)
  await writeFile(`${evidence}/registry.json`, registry)
  await writeFile(`${evidence}/endpoint.json`, JSON.stringify({ url: registryUrl, status: response.status, sha256: createHash("sha256").update(registry).digest("hex"), node: process.version }, null, 2))
  // pnpm needs bootstrapping in the official Node image; all project operations use it.
  await run("pnpm-bootstrap", "npm", ["install", "--global", `pnpm@${pnpmVersion}`])
  versions.pnpm = (await run("pnpm-version", "pnpm", ["--version"])).trim()
  await writeFile(`${evidence}/versions.json`, JSON.stringify(versions, null, 2))
  for (const layout of ["default", "src"]) {
    const cwd = `/work/consumer-${layout}`
    await run(`${layout}-scaffold`, "pnpm", ["dlx", "create-next-app@latest", `consumer-${layout}`, "--yes", "--use-pnpm", "--ts", "--tailwind", "--eslint", "--app", "--import-alias", "@/*", layout === "src" ? "--src-dir" : "--no-src-dir", "--disable-git"])
    const config = await readFile(`${cwd}/next.config.ts`)
    await copyFile(`${cwd}/next.config.ts`, `${evidence}/${layout}-next.config.before.ts`)
    await run(`${layout}-shadcn-init`, "pnpm", ["dlx", "shadcn@latest", "init", "-d"], cwd)
    await run(`${layout}-shadcn-add`, "pnpm", ["dlx", "shadcn@latest", "add", registryUrl], cwd)
    const installedPackage = JSON.parse(await readFile(`${cwd}/package.json`, "utf8"))
    for (const section of ["dependencies", "devDependencies", "optionalDependencies"]) {
      for (const dependency of ["vgpu", "@vgpu/wgsl", "@webgpu/types"]) {
        assert.equal(installedPackage[section]?.[dependency], undefined, `Consumer must not need ${dependency} in ${section}`)
      }
    }
    versions.layouts[layout] = {
      next: (await run(`${layout}-next-version`, "pnpm", ["exec", "next", "--version"], cwd)).trim(),
      shadcn: (await run(`${layout}-shadcn-version`, "pnpm", ["dlx", "shadcn@latest", "--version"], cwd)).trim(),
    }
    await writeFile(`${evidence}/versions.json`, JSON.stringify(versions, null, 2))
    await writeFile(`${evidence}/${layout}-package.json`, JSON.stringify(installedPackage, null, 2))
    const app = `${cwd}/${layout === "src" ? "src/" : ""}app`
    await copyFile("/fixtures/page.tsx.txt", `${app}/page.tsx`)
    // Avoid an unrelated network dependency on Google Fonts in the generated layout.
    await copyFile("/fixtures/layout.tsx.txt", `${app}/layout.tsx`)
    assert.deepEqual(await readFile(`${cwd}/next.config.ts`), config, "Installation changed next.config.ts")
    assert.equal((await readdir(cwd)).includes("vgpu-env.d.ts"), false, "Consumer must not need vgpu-env.d.ts")
    const declarations = (await readdir(cwd)).filter(name => name.endsWith(".d.ts") && name !== "next-env.d.ts")
    assert.deepEqual(declarations, [], "Installation must not add consumer ambient declarations")
    await copyFile(`${cwd}/next.config.ts`, `${evidence}/${layout}-next.config.after.ts`)
    // create-next-app emits route types. Refresh them through the supported CLI,
    // without editing tsconfig or adding handwritten type declarations.
    await run(`${layout}-typegen`, "pnpm", ["exec", "next", "typegen"], cwd)
    await run(`${layout}-typecheck`, "pnpm", ["exec", "tsc", "--noEmit"], cwd)
    await run(`${layout}-build`, "pnpm", ["build"], cwd)
    await run(`${layout}-post-build-typecheck`, "pnpm", ["exec", "tsc", "--noEmit"], cwd)
    assert.deepEqual(await readFile(`${cwd}/next.config.ts`), config, "Build changed next.config.ts")
    await run(`${layout}-packages`, "pnpm", ["list", "--depth", "0", "--json"], cwd)
    await copyFile(`${cwd}/components.json`, `${evidence}/${layout}-components.json`)
  }
  await mkdir("/work/browser-check/tests", { recursive: true })
  await writeFile("/work/browser-check/package.json", JSON.stringify({ private: true, type: "module" }))
  await copyFile("/fixtures/e2e.config.ts.txt", "/work/browser-check/e2e.config.ts")
  await copyFile("/fixtures/registry.e2e.ts.txt", "/work/browser-check/tests/registry.e2e.ts")
  await run("browser-dependencies", "pnpm", ["add", "-D", "e2e@latest", "@e2e-dev/web@latest"], "/work/browser-check")
  await run("browser-install", "pnpm", ["exec", "e2e-web", "install", "chromium", "--with-deps"], "/work/browser-check")
  await run("browser-packages", "pnpm", ["list", "--depth", "0", "--json"], "/work/browser-check")
  await run("browser-e2e", "pnpm", ["exec", "e2e", "run", "--no-cache", "--retries", "0"], "/work/browser-check")
  await writeFile(`${evidence}/result.json`, JSON.stringify({ passed: true, layouts: ["default", "src"], nextConfigUnchanged: true, manualWgslSetup: false }, null, 2))
} catch (error) {
  await writeFile(`${evidence}/result.json`, JSON.stringify({ passed: false, error: error.stack }, null, 2))
  console.error(error)
  process.exitCode = 1
} finally {
  try {
    await cp("/work/browser-check/.e2e", `${evidence}/browser-results`, { recursive: true })
  } catch (error) {
    if (error.code !== "ENOENT") throw error
  }
}
