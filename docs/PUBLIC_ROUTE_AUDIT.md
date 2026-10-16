# Audit public des routes — 16 octobre 2026

## Exécution vérifiée

- Site audité : https://actionavocat.ca/
- Workflow : `ActionAvocat — inventaire public`
- Source vérifiable :
  https://github.com/takatakca/ACTIONAVOCAT.CA/actions/runs/38953338394
- Échantillon : 34 URLs issues des routes semences et des liens publics.
- 17 réponses HTTP 200 avec document HTML.
- 16 réponses HTTP 404.
- 1 réponse HTTP 403.
- La version enrichie des rapports est sur :
  https://github.com/takatakca/ACTIONAVOCAT.CA/actions/runs/38953338394
- Le rapport JSON est dans l'artefact temporaire GitHub Actions, pas
  committé dans le dépôt.

Cette exploration est bornée. **34 chemins ne signifient pas que toutes
les pages du site ont été recensées** : il reste à confronter sitemap,
fichiers cPanel et chemins historiques.

## 14 liens 404 à destination publique 200 vérifiée

Le rapport `broken-links.json` contient 14 propositions de corrections
sans publication. Exemples représentatifs :

| Lien cassé | Destination vérifiée |
| --- | --- |
| `/services.html` | `/services` |
| `/contact.html` | `/contact` |
| `/service/services` | `/services` |
| `/service/contact` | `/contact` |
| `/service/service/droit-civil` | `/service/droit-civil` |
| `/service/service/droit-travail` | `/service/droit-travail` |

D'autres doublons `/service/service/...` concernent des pages de
créances, mises en demeure, contrats et procédure civile.

## 3 cas non résolus

- `/service` : HTTP 403 ; la destination voulue n'est pas prouvée.
- `/service/service/droit-affaires` : HTTP 404 ; destination candidate
  `/service/droit-affaires` non confirmée HTTP 200 par l'inventaire.
- `/service/service/litiges-representation` : HTTP 404 ; destination
  candidate `/service/litiges-representation` non confirmée HTTP 200.

Une ancienne réponse d'erreur a également redirigé vers un chemin qui
ressemble à une arborescence interne du serveur. **Le rapport amélioré
masque désormais ce type de chemin.** Réviser les règles Apache pour
éviter toute divulgation de chemin interne.

## Corrections à réaliser sur l'hébergement réel

1. Chercher les attributs `href` relatifs mal formés dans les fichiers
   HTML originaux; préférer des chemins absolus `/service/...`.
2. Vérifier le comportement `.html` et les réécritures Apache.
3. Déterminer si `/service` doit rediriger, rester protégé ou servir
   un index; ne pas contourner un éventuel contrôle d'accès.
4. Tester les 14 destinations proposées avant toute correction.
5. Réparer le HTML d'origine si possible; les règles `RedirectMatch`
   proposées sont un filet de sécurité, pas un substitut aux bonnes URLs.
6. Comparer les statuts HTTP et le rendu mobile avant/après correction.

## Artefacts techniques

- `reports/public-routes.json` : chemins publics et statuts seulement.
- `reports/broken-links.json` : 14 candidats vérifiés / 3 cas en attente.
- `reports/apache-redirects.review.conf` : fragment de règles
  **à examiner**, jamais installé par les workflows.
- Génération : `npm run inventory:public`.
- Aucun formulaire rempli, cookie d'accès, mot de passe ou corps HTML de
  dossier n'est conservé.

**Statut : audit réalisé, correctifs de production non appliqués.**
