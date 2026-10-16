// Exact-match Apache suggestions only; never install or deploy automatically.
import { analyzeRoutes } from "./route-audit.mjs";
// Crawled path characters are restricted to letters, digits, /, _, -, %, and dot.
// Escape the dot for Apache's regular-expression engine.
const escapePattern = (path) => path.replaceAll(".", "\\.");
export function renderApacheReview(results) {
  const { redirects, unresolved } = analyzeRoutes(results);
  const lines = [
    "# ACTIONAVOCAT — PROPOSITIONS DE CORRECTION, NON APPLIQUÉES",
    "# Ne constitue PAS un .htaccess complet.",
    "# Corriger d'abord les liens href à la source si possible.",
    "# Valider sauvegarde, destinations et Apache avant toute intégration.",
    ""
  ];
  for (const { from, to } of redirects) {
    if (!from.startsWith("/") || !to.startsWith("/") ||
        from.includes("\n") || to.includes("\n")) continue;
    lines.push("RedirectMatch 301 ^" + escapePattern(from) + "/?$ " + to);
  }
  lines.push("", "# À résoudre manuellement (" + unresolved.length + " chemins) :");
  for (const entry of unresolved) lines.push("# " + entry.status + " " + entry.path);
  return lines.join("\n") + "\n";
}
