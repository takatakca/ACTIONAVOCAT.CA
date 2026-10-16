// Fail-closed, read-only migration gate. No deployment action is performed.
// The decision can only become "ready" when the candidate preserves known
// URLs, the build is internally consistent, and an explicit audited approval
// record exists. Approval metadata contains NO passwords or client records.
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { pages, productionRoutes } from "../src/content.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const out = join(root, "dist");
const candidate = new Set(pages.map((page) => "/" + page.slug));
const knownGaps = [...new Set(productionRoutes)].filter((path) => !candidate.has(path));
const errors = [];
let manifest;

try {
  manifest = JSON.parse(await readFile(join(out, "release-manifest.json"), "utf8"));
  if (!Array.isArray(manifest.pages) || manifest.pages.length !== pages.length) {
    errors.push("Le manifeste ne couvre pas toutes les pages.");
  }
  if (process.env.GITHUB_SHA && manifest.sourceSha !== process.env.GITHUB_SHA) {
    errors.push("Le SHA du manifeste ne correspond pas au commit actif.");
  }
} catch {
  errors.push("Manifeste absent ou invalide. Exécuter npm run build.");
}

if (manifest?.pages && Array.isArray(manifest.pages)) {
  for (const page of pages) {
    const route = "/" + page.slug;
    const expectedFile = page.slug ? page.slug + ".html" : "index.html";
    const recorded = manifest.pages.find((item) =>
      item.route === route && item.file === expectedFile
    );
    if (!recorded) {
      errors.push("Manifeste : page manquante " + route);
      continue;
    }
    try {
      const content = await readFile(join(out, expectedFile));
      const hash = createHash("sha256").update(content).digest("hex");
      if (hash !== recorded.sha256) errors.push("Empreinte SHA-256 différente : " + route);
    } catch {
      errors.push("Fichier de sortie manquant : " + route);
    }
  }
}

if (knownGaps.length) {
  errors.push("URLs publiques non reprises (" + knownGaps.length + ") :\n" +
    knownGaps.map((path) => "  - " + path).join("\n"));
}

const approvalsRequired = [
  "sourceCompared", "publicRouteInventoryComplete", "legalTextApproved",
  "privacyPolicyApproved", "contactDetailsVerified",
  "legacyBackupVerified", "rollbackTested", "documentRootVerified",
  "adminAndAppsPreserved", "stagingVerified", "productionChangeApproved"
];
let approval;
try {
  approval = JSON.parse(await readFile(join(root, "deploy/release-approval.json"), "utf8"));
} catch {
  errors.push("Approbation documentée absente : deploy/release-approval.json.");
}
if (approval) {
  for (const key of approvalsRequired) {
    if (approval.checks?.[key] !== true) errors.push("Critère non vérifié : " + key);
  }
  if (typeof approval.approvedBy !== "string" || approval.approvedBy.trim().length < 3) {
    errors.push("Identité de l'approbateur non renseignée.");
  }
  const date = Date.parse(approval.approvedAt);
  if (!Number.isFinite(date) || date > Date.now() || date < Date.now() - 90 * 86400_000) {
    errors.push("Date d'approbation absente, future ou de plus de 90 jours.");
  }
  if (typeof approval.backupReference !== "string" || approval.backupReference.trim().length < 8) {
    errors.push("Référence de sauvegarde vérifiée absente.");
  }
  if (typeof approval.rollbackReference !== "string" || approval.rollbackReference.trim().length < 8) {
    errors.push("Référence d'essai de restauration absente.");
  }
}

console.log("=== ACTIONAVOCAT — CONTRÔLE PRÉ-PUBLICATION ===");
console.log("Pages candidat : " + pages.length + " | Routes publiques connues : " + productionRoutes.length);
if (errors.length) {
  for (const error of errors) console.log("BLOQUANT : " + error);
  console.log("DÉCISION : aucune substitution automatique de la production.");
  process.exitCode = 1;
} else {
  console.log("PRÉVALIDATION OK. Cela n'effectue aucun déploiement.");
  console.log("Lancer les vérifications finales de publication sur la cible réelle.");
}
