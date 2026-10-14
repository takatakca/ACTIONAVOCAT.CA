// Vérification publique non destructive : aucun SSH, aucun secret, aucune écriture.
import { productionRoutes } from "../src/content.mjs";
const origin = "https://actionavocat.ca";
let failures = 0;
for (const route of productionRoutes) {
  const url = origin + route;
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(12000),
      headers: { "User-Agent": "ActionAvocat-ReadOnly-Monitor/1.0" }
    });
    const contentType = response.headers.get("content-type") || "";
    const body = contentType.includes("text/html") ? await response.text() : "";
    const final = new URL(response.url);
    const ok = response.ok && final.protocol === "https:" &&
      final.hostname === "actionavocat.ca" && /<title[\s>]/i.test(body);
    console.log((ok ? "OK   " : "FAIL ") + response.status + " " + route + " → " + final.pathname);
    if (!ok) failures++;
  } catch (error) {
    console.error("FAIL " + route + ": " + error.message);
    failures++;
  }
}
if (failures) {
  console.error(failures + " routes en échec. Aucune modification apportée à la production.");
  process.exitCode = 1;
} else {
  console.log("Audit en lecture seule : toutes les routes publiques répondent.");
}
