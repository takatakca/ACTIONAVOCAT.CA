# AGENT_HANDOFF — ACTIONAVOCAT.CA

**Date de dernière session : 2026-10-16, America/Toronto.**
**Repository :** https://github.com/takatakca/ACTIONAVOCAT.CA
**Branche :** `main`.
**Dernier SHA technique explicitement vérifié avant documentation :**
`fdc1692bef76a3fbafc5922ee8b938922635a71f`.
La documentation mise à jour sera poussée après ce commit : consulter
**le SHA du HEAD GitHub réel** avant toute modification.

## Dernière tâche complétée

- Inventaire en lecture seule des routes publiques réelles (34 URLs).
- 17 HTTP 200 HTML, 16 HTTP 404, 1 HTTP 403.
- Génération automatique de 14 suggestions vers des cibles déjà validées
  HTTP 200, avec 3 chemins non résolus.
- Production de rapports `public-routes.json`, `broken-links.json` et
  `apache-redirects.review.conf` (artefacts GitHub, non publiés).
- Masquage des chemins internes renvoyés par certaines erreurs HTTP.
- Prévisualisation SEO `noindex,nofollow,noarchive` par défaut.
- Contrôle de migration bloquant et approbation explicite prévue.
- **CI réussie** sur le commit `fdc1692` :
  https://github.com/takatakca/ACTIONAVOCAT.CA/actions/runs/38953718753
- **Inventaire automatisé réussi** avant dernier changement SEO :
  https://github.com/takatakca/ACTIONAVOCAT.CA/actions/runs/38953606269

## Tâche actuellement en cours

Comparer l'inventaire des URLs et des liens cassés avec les vrais fichiers
de production. La source réelle est toujours hors GitHub et ses répertoires
protégés n'ont pas été inspectés.

## Fichiers de code modifiés au cours de cette session

- `scripts/build.mjs`, `scripts/serve.mjs`
- `scripts/preflight.mjs`, `scripts/inventory-public.mjs`
- `scripts/route-audit.mjs`, `scripts/redirect-preview.mjs`
- `src/content.mjs`, `src/template.html`
- `tests/http.test.mjs`, `tests/site.test.mjs`
- `tests/preflight.test.mjs`, `tests/route-audit.test.mjs`
- `tests/redirect-preview.test.mjs`
- `package.json`, `.gitignore`
- `.github/workflows/ci.yml`, `inventory.yml`, `release-gate.yml`
- `deploy/release-approval.example.json`
- `AGENTS.md`, `README.md`, documents de `docs/`

## Vérifications et erreurs

- GitHub HEAD initial de session : `9ed8a3edb0dfc315946a76032bc31e4d0fa21235`.
- Aucune PR ou issue ouverte au début de la session.
- `npm run build`, `npm test` : réussite attestée par GitHub Actions
  sur les commits techniques, dont `fdc1692`.
- Les artefacts de prévisualisation et d'inventaire sont produits dans
  les runs GitHub Actions.
- `npm run preflight` : **doit échouer** tant que la source d'origine,
  les anciennes URLs et les approbations sont manquantes.
- Le crawl relève 17 erreurs HTTP, non corrigées sur la production.
- Un ancien chemin interne de serveur a été exposé par une redirection
  d'erreur : les nouveaux rapports masquent ce chemin, mais l'ancien
  serveur doit être corrigé après accès et sauvegarde.

## Statut réel du déploiement

**Aucun déploiement des nouvelles pages en production.**
Le site public historique reste en place. Ni l'accès SSH/FTP exact,
ni le document root, ni le plan de restauration n'ont été validés.

## Accès et preuves nécessaires

- Export de fichiers et règles du document root du bon compte cPanel,
  sans importer de secrets ni de données clients dans un dépôt public.
- Accès de lecture et de validation pour `/admin` et `/apps` sans
  en publier les contenus privés.
- Sauvegarde vérifiée et essai de restauration.
- Approbation des pages juridiques, coordonnées et confidentialité.
- À terme, identifiants de publication à privilèges minimaux, en secrets
  GitHub, après confirmation du serveur de destination.

## Prochaine action exacte

1. Vérifier `main` et la dernière CI, lire `AGENTS.md`.
2. Consulter `docs/PUBLIC_ROUTE_AUDIT.md` et le dernier inventaire.
3. Récupérer l'export autorisé des fichiers historiques et `.htaccess`,
   puis corriger les liens relatifs cassés dans **leur vrai fichier source**.
4. Réintégrer les guides et médias validés sans supprimer les routes.
5. Réaliser sauvegarde/restauration et approbation métier, puis seulement
   déployer de façon réversible après `npm run preflight` réussi.

**Pas de relance automatique de session :** un orchestrateur externe
explicitement autorisé et configuré est requis; ne pas en inventer un.
