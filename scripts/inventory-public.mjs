// Explore strictly public pages. Never authenticates, follows forms, posts,
// writes to the server, or requests /admin, /apps, or application endpoints.
// Reports only URL paths and HTTP status, never page contents or client data.
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { productionRoutes } from "../src/content.mjs";

const origin = "https://actionavocat.ca";
const host = new URL(origin).hostname;
const max = Math.min(Math.max(Number(process.env.MAX_PAGES || "80"), 1), 100);
const queue = [...new Set(productionRoutes)];
const visited = new Set();
const results = [];
const excluded = /^\/(?:admin|apps|api|login|logout|wp-admin|\.well-known)(?:\/|$)/i;
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
function normalizePath(href, base) {
  try {
    const parsed = new URL(href.replaceAll("&amp;", "&"), base);
    if (parsed.origin !== origin || parsed.hostname !== host || excluded.test(parsed.pathname) ||
        !/^\/[a-zA-Z0-9/_\-%.]*$/.test(parsed.pathname)) return null;
    return parsed.pathname.replace(/\/+$/, "") || "/";
  } catch {
    return null;
  }
}

for (let index = 0; index < queue.length && visited.size < max; index++) {
  const path = queue[index];
  if (visited.has(path) || excluded.test(path)) continue;
  visited.add(path);
  try {
    const response = await fetch(origin + path, {
      method: "GET", redirect: "follow",
      headers: { "User-Agent": "ActionAvocat-PublicRouteInventory/1.0" },
      signal: AbortSignal.timeout(10000)
    });
    const finalUrl = new URL(response.url);
    const accepted = finalUrl.origin === origin;
    const contentType = response.headers.get("content-type") || "";
    const html = accepted && response.ok && contentType.includes("text/html") ?
      await response.text() : "";
    results.push({ path, httpStatus: response.status, finalPath: accepted ? finalUrl.pathname : null, html: Boolean(html) });
    if (html) {
      const matches = html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["']/gi);
      for (const match of matches) {
        const next = normalizePath(match[1], response.url);
        if (next && !visited.has(next) && !queue.includes(next)) queue.push(next);
      }
    }
  } catch (error) {
    results.push({ path, httpStatus: null, error: error.name || "NetworkError" });
  }
  await sleep(120);
}

const output = fileURLToPath(new URL("../reports/", import.meta.url));
await mkdir(output, { recursive: true });
const report = {
  origin, generatedAt: new Date().toISOString(),
  maxPages: max, scannedPages: results.length,
  queueRemaining: Math.max(0, queue.length - visited.size),
  results
};
await writeFile(join(output, "public-routes.json"), JSON.stringify(report, null, 2) + "\n");
console.log("Inventaire terminé : " + results.length + " pages ; " +
  results.filter((row) => !row.html).length + " réponses non HTML/échecs.");
console.log("Artefact : reports/public-routes.json. Aucune écriture vers le site public.");
