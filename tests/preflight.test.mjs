import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { pages, productionRoutes } from "../src/content.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
test("release manifest tracks every generated output and source SHA", async () => {
  const manifest = JSON.parse(await readFile(new URL("../dist/release-manifest.json", import.meta.url), "utf8"));
  assert.equal(manifest.pages.length, pages.length);
  assert.match(manifest.sourceSha, /^(local|[0-9a-f]{40})$/);
  for (const page of manifest.pages) {
    assert.match(page.sha256, /^[0-9a-f]{64}$/);
    assert.match(page.file, /^[a-z0-9/.-]+$/);
  }
});
test("production parity check blocks known route deletion", () => {
  const missing = productionRoutes.filter((path) => !pages.some((page) => "/" + page.slug === path));
  assert.ok(missing.length > 0, "Current preview is not a replacement of the legacy site");
  const audit = spawnSync(process.execPath, ["scripts/preflight.mjs"], { cwd: root, encoding: "utf8" });
  assert.equal(audit.status, 1);
  assert.match(audit.stdout, /URLs publiques non reprises/);
  assert.match(audit.stdout, /aucune substitution automatique/);
});
