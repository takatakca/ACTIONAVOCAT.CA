# KLEAN — Carte de déploiement — actionavocat.ca — 2026-10-29

Signé : KLEAN (Muse), mission déploiement 2026-10-29 ~17:14 EDT.
Portée : carte seulement. Le site en ligne ne doit PAS être remplacé sans propriétaire.

## AVANT (vérifié 2026-10-29)

- Dépôt : `takatakca/ACTIONAVOCAT.CA`, branche `main` vérifiée : `5cf5a41271ad2fa34f7804d18b8ec0d14df61720` (2026-10-16, « docs: record verified legacy link failures and release blockers for agent handoff »).
- Cible déclarée dans le dépôt : **aucune cible de production GitHub**. Hébergement historique supposé : **cPanel/MochaHost** — compte, document root et accès **non vérifiés en session** selon `docs/DEPLOYMENT.md`. Le dépôt n'est pas la copie complète du site original. **Pas de déploiement de production depuis GitHub aujourd'hui.**
- Configuration présente : non — CI seulement (`.github/workflows/ci.yml` : build + archive `actionavocat-static-preview`, sans déploiement ; `inventory.yml` : inventaire public ; `live-watch.yml` : surveillance ; `release-gate.yml` : garde manuelle, artefact seulement). Aucun fichier Coolify, Vercel, Render ou Pages de déploiement ; `deploy/` ne contient que des suggestions (`htaccess-fragment.txt`, `release-approval.example.json`).

## PENDANT (auto-déploiement)

- **Auto-déploiement : NON.** Rien à activer par code : il n'existe aucune application d'hébergement connectée à ce dépôt, et aucun accès hébergeur vérifié. Activer un auto-déploiement par code seul créerait une fausse promesse de mise en ligne.
- Aucune PR ouverte sur ce dépôt au moment de la carte ; aucune PR créée ou fusionnée par cet agent pour ce dépôt, sauf la présente note.
- Tous les builds sont `noindex` par défaut (prévisualisation seulement).

## APRÈS (checklist propriétaire exacte — ne pas remplacer le site en ligne sans propriétaire)

1. Identifier le compte et la configuration réelle (cPanel/MochaHost) ; exporter le contenu public actuel en sauvegarde hors dépôt, avec contrôle d'intégrité.
2. Préserver `/admin`, `/apps`, Passenger, BasicAuth, `.htaccess` et médias, y compris les pages juridiques sous plusieurs sous-dossiers.
3. Restaurer la sauvegarde dans un espace isolé et tester un retour arrière.
4. Corriger les liens publics cassés identifiés par l'inventaire, sans supprimer une restriction Apache légitime.
5. Comparer chaque route existante (y compris le sitemap complet) à une page ou à une redirection explicitement approuvée.
6. Obtenir l'approbation de confidentialité, des contenus et des coordonnées.
7. Tester la candidate sur une adresse de prévisualisation protégée par accès et `noindex`.
8. Compiler ensuite une version indexable (`ACTIONAVOCAT_INDEXABLE=true npm run build`).
9. Faire passer `npm run preflight` (garde rouge aujourd'hui) avec un `deploy/release-approval.json` renseigné (références non sensibles aux vérifications/approbations).
10. Publier avec une méthode de remplacement réversible et un accès minimal, puis vérifier réellement les routes, certificats, fonctionnalités héritées et la version servie (manifeste SHA `dist/release-manifest.json`).
11. Garder la restauration immédiatement disponible si la vérification post-déploiement échoue.
- État en ligne : **non vérifié en ligne par cet agent** ; une CI verte n'est pas une preuve du contenu servi sur actionavocat.ca. Ne pas coller le fragment d'exemple dans le `.htaccess` réel sans avoir lu les directives Apache/Passenger actuelles.
