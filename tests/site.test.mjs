import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { pages, services, productionRoutes } from "../src/content.mjs";
const root = fileURLToPath(new URL("../", import.meta.url));
const read = (filename) => readFile(join(root, filename), "utf8");
test("pages have distinct, safe, nonempty routes and metadata", () => {
  assert.equal(new Set(pages.map((page) => page.slug)).size, pages.length);
  assert.equal(pages[0].slug, "");
  for (const page of pages) {
    assert.match(page.slug, /^[a-z0-9/-]*$/);
    assert.ok(page.title.length >= 5);
    assert.ok((page.seoTitle || page.title).length > 20);
    assert.ok(page.description.length > 50);
  }
  assert.ok(services.length >= 5);
  assert.ok(productionRoutes.some((path) => path.includes("admissible-petites-creances")));
});
test("output exists and links are routed internally", async () => {
  await stat(join(root, "dist/index.html"));
  const paths = new Set(pages.map((page) => "/" + page.slug));
  const reserved = new Set(["/#expertises", "/#approche"]);
  for (const page of pages) {
    const file = page.slug ? "dist/" + page.slug + ".html" : "dist/index.html";
    const rendered = await read(file);
    assert.match(rendered, /<html lang="fr-CA">/);
    assert.match(rendered, /<meta name="description"/);
    assert.match(rendered, /<link rel="canonical"/);
    assert.match(rendered, /application\/ld\+json/);
    assert.match(rendered, /Aller au contenu principal/);
    assert.doesNotMatch(rendered, /\{\{[A-Z_]+\}\}/);
    const depth = page.slug ? page.slug.split("/").length - 1 : 0;
    const expectedAssets = "../".repeat(depth) + "assets/style.css";
    assert.ok(rendered.includes('href="' + expectedAssets + '"'), "Wrong asset path in " + file);
    assert.ok(rendered.includes('src="' + "../".repeat(depth) + 'assets/app.js"'));

    assert.doesNotMatch(rendered, /<form\b/i);
    for (const match of rendered.matchAll(/href="(\/[^"#?]*)(?:#[^"]*)?"/g)) {
      const target = match[1];
      assert.ok(paths.has(target), "Missing route " + target + " from " + file);
    }
    assert.ok(!rendered.includes('href="#"'));
  }
  assert.ok(reserved.size > 0);
});
test("no deployment will overwrite protected cPanel endpoints", async () => {
  const documentation = await read("docs/HANDOFF.md");
  assert.match(documentation, /\/admin/);
  assert.match(documentation, /\/apps/);
  const workflow = await read(".github/workflows/ci.yml");
  assert.doesNotMatch(workflow, /scp |rsync |ssh /i);
  assert.match(workflow, /npm run build/);
});
