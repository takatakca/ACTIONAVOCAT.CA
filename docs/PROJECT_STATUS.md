# PROJECT_STATUS — ACTIONAVOCAT.CA

Actualisation : **2026-10-16**, America/Toronto.

| Domaine | Statut constaté |
| --- | --- |
| GitHub | https://github.com/takatakca/ACTIONAVOCAT.CA |
| Branche active | `main` |
| Commit technique vérifié avant documentation | `fdc1692bef76a3fbafc5922ee8b938922635a71f` |
| CI | Succès : https://github.com/takatakca/ACTIONAVOCAT.CA/actions/runs/38953718753 |
| Surveillance site historique | Succès le 15 et 16 octobre 2026 |
| Audit public | 34 URLs ; 17 HTML 200, 16 HTTP 404, 1 HTTP 403 |
| Liens réparables recensés | 14 propositions vers des cibles HTTP 200 ; 3 cas à examiner |
| Candidat GitHub | 9 pages statiques et routes propres de prévisualisation |
| Protection SEO prévisualisation | `noindex,nofollow` et `robots.txt` Disallow par défaut |
| Publication dans actionavocat.ca | **Non effectuée et non vérifiée** |
| Remplacement du site historique | Bloqué par la parité, l'export cPanel et la validation métier |

## Livrables opérationnels

- Site statique responsive en français, navigation clavier et métadonnées.
- Générateur HTML/sitemap/robots et manifeste d'empreintes SHA-256.
- Serveur local avec réponse 400/404/405, entêtes de sécurité et URLs propres.
- Tests HTTP, contrôle de version, parité, garde de migration.
- CI GitHub Actions verte, artefact de prévisualisation, surveillance
  quotidienne en lecture seule.
- Inventaire public sur modification de la liste de routes et en manuel.
- Rapport d'anomalies + suggestions `RedirectMatch` exactes et vérifiables.
- AGENTS.md et documents de continuité de l'agent.

## Travaux bloquants et risques actuels

Le site actuel n'est **pas** représenté intégralement dans le dépôt.
Il manque le code source de production, les guides complets, les médias,
l'administration, les applications Passenger et la configuration Apache
réelle. Une migration sans comparaison serait destructive.

Les 17 anomalies du crawl sont documentées dans
[PUBLIC_ROUTE_AUDIT.md](PUBLIC_ROUTE_AUDIT.md). Elles appartiennent au
site hébergé actuel et ne sont pas corrigées simplement par le push GitHub.

Il manque une sauvegarde vérifiée, un test de restauration, l'accès confirmé
au document root et les approbations de confidentialité/contenu juridique.
L'exécution `npm run preflight` doit rester rouge avant leur résolution.
