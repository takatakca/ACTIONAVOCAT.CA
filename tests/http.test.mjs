import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { once } from "node:events";

const script = fileURLToPath(new URL("../scripts/serve.mjs", import.meta.url));
async function start() {
  const child = spawn(process.execPath, [script], {
    env: { ...process.env, PORT: "0" }, stdio: ["ignore", "pipe", "pipe"]
  });
  const port = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Preview server timeout")), 8000);
    child.stdout.on("data", (data) => {
      const match = data.toString().match(/Preview: http:\/\/127\.0\.0\.1:(\d+)/);
      if (match) { clearTimeout(timer); resolve(Number(match[1])); }
    });
    child.on("error", (error) => { clearTimeout(timer); reject(error); });
    child.on("exit", (code) => { clearTimeout(timer); reject(new Error("Preview server exited " + code)); });
  });
  return { child, origin: "http://127.0.0.1:" + port };
}

test("preview serves clean routes, correct MIME and safe HTTP responses", async () => {
  const { child, origin } = await start();
  try {
    for (const path of ["/", "/service/droit-civil", "/service/droit-civil/", "/contact", "/confidentialite"]) {
      const response = await fetch(origin + path);
      assert.equal(response.status, 200, path);
      assert.match(response.headers.get("content-type"), /text\/html/);
      assert.match(await response.text(), /ROMANOWSKI/);
      assert.equal(response.headers.get("x-content-type-options"), "nosniff");
      assert.match(response.headers.get("content-security-policy"), /frame-ancestors 'none'/);
    }
    const asset = await fetch(origin + "/assets/style.css");
    assert.equal(asset.status, 200);
    assert.match(asset.headers.get("content-type"), /text\/css/);
    const head = await fetch(origin + "/service/droit-civil", { method: "HEAD" });
    assert.equal(head.status, 200);
    assert.equal((await head.text()).length, 0);
    assert.equal((await fetch(origin + "/src/content.mjs")).status, 404);
    assert.equal((await fetch(origin + "/absent-route")).status, 404);
    assert.equal((await fetch(origin + "/%00")).status, 400);
    const post = await fetch(origin + "/contact", { method: "POST" });
    assert.equal(post.status, 405);
    assert.equal(post.headers.get("allow"), "GET, HEAD");
    assert.equal((await fetch(origin + "/release-manifest.json")).status, 200);
  } finally {
    child.kill("SIGTERM");
    if (child.exitCode === null && child.signalCode === null) await once(child, "exit");
  }
});
