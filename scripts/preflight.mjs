// Non-destructive migration gate. Exit nonzero whenever replacing the
// existing website with the static candidate would remove known public URLs.
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { pages, productionRoutes } from "../src/content.mjs";

const out = fileURLToPath(new URL("../dist/", import.meta.url));
const candidate = new Set(pages.map((page) => "/" + page.slug));
const missing = [...new Set(productionRoutes)].filter((path) => !candidate.has(path));
let manifest;
const errors = [];
try {
  manifest = JSON.parse(await readFile(join(out, "release-manifest.json"), "utf8"));
  if (!Array.isArray(manifest.pages) || manifest.pages.length !== pages.length) {
    errors.push("Manifeste incomplet ou nombre de pages incohérent.");
  }
} catch {
  errors.push("Manifeste absent : exécuter npm run build.");
}
for (const page of pages) {
  try {
    await stat(join(out, page.slug ? page.slug + ".html" : "index.html"));
  } catch {
    errors.push("Sortie manquante : " + (page.slug || "/"));
  }
}
if (missing.length) {
  errors.push("URLs publiques non reprises (" + missing.length + ") :\n" +
    missing.map((path) => "  - " + path).join("\n"));
}
errors.push("Validation juridique et confidentialité : encore requises avant remplacement.");
errors.push("Inventaire et sauvegarde cPanel, /admin, /apps, .htaccess : non vérifiés.");
console.log("=== ACTIONAVOCAT — CONTRÔLE PRÉ-PUBLICATION ===");
console.log("Pages candidat : " + pages.length + " | Routes de référence : " + productionRoutes.length);
console.log(errors.map((error) => "BLOQUANT : " + error).join("\n"));
console.log("DÉCISION : aucune substitution automatique de la production.");
process.exitCode = 1;
