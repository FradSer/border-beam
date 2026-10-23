import { spawn } from "node:child_process"
import { mkdir, mkdtemp, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

// Only test fixtures enter Docker: no host dependencies or application sources.
const fixtures = fileURLToPath(new URL("../tests/registry-install/", import.meta.url))
const registryUrl = process.env.BORDER_BEAM_REGISTRY_URL ?? "https://border-beam.vercel.app/r/border-beam.json"
const output = process.env.REGISTRY_TEST_OUTPUT
  ? path.resolve(process.env.REGISTRY_TEST_OUTPUT)
  : await mkdtemp(path.join(tmpdir(), "border-beam-registry-install-"))
const container = `border-beam-registry-${Date.now()}-${process.pid}`
const image = process.env.REGISTRY_TEST_IMAGE ?? "node:24-bookworm"
const pnpmVersion = process.env.BORDER_BEAM_PNPM_VERSION ?? "latest"

async function docker(args, allowFailure = false) {
  const code = await new Promise((resolve, reject) => {
    const child = spawn("docker", args, { stdio: "inherit" })
    child.once("error", reject)
    child.once("exit", resolve)
  })
  if (code !== 0 && !allowFailure) throw new Error(`Docker ${args[0]} failed (${code})`)
  return code
}

await mkdir(output, { recursive: true })
await writeFile(path.join(output, "invocation.json"), JSON.stringify({ registryUrl, image, pnpmVersion, container, startedAt: new Date().toISOString() }, null, 2))
console.log(`Registry: ${registryUrl}\nEvidence: ${output}`)
let created = false
try {
  await docker(["create", "--name", container, "--add-host", "host.docker.internal:host-gateway", "--shm-size", "1g", "-e", "CI=1", "-e", "NEXT_TELEMETRY_DISABLED=1", "-e", "E2E_TELEMETRY_DISABLED=1", "-e", `BORDER_BEAM_REGISTRY_URL=${registryUrl}`, "-e", `BORDER_BEAM_PNPM_VERSION=${pnpmVersion}`, image, "node", "/fixtures/run-container.mjs"])
  created = true
  await docker(["cp", fixtures, `${container}:/fixtures`])
  await docker(["start", "--attach", container])
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
} finally {
  if (created) {
    await docker(["cp", `${container}:/work/evidence/.`, output], true)
    await docker(["rm", "--force", container], true)
  }
  console.log(`Evidence saved to ${output}`)
}
