# TASK_QUEUE — ACTIONAVOCAT.CA

## P0 — blocages de production

- [x] Inventaire public initial automatique : 34 chemins, 17 HTML 200,
  16 erreurs 404, une erreur 403.
- [x] Générer un rapport séparé proposant 14 corrections vers des
  destinations déjà vérifiées (3 chemins non résolus).
- [ ] Récupérer une copie de la racine Web cPanel du **bon compte**
  (sans secrets ni données clients dans GitHub), des médias, et du
  `.htaccess` réel. Vérifier le document root et les applications.
- [ ] Corriger dans les sources du site historique les liens `href`
  relatifs qui créent `/service/service/...`; examiner les 404 `.html`.
- [ ] Vérifier individuellement les 3 chemins non résolus, y compris
  `/service` HTTP 403 (ne pas supprimer de protection sans raison).
- [ ] Corriger les erreurs qui exposent une arborescence interne dans
  certaines redirections 404 de l'ancien serveur Apache.
- [ ] Inventorier toutes les autres URLs publiques via sitemap,
  arborescence cPanel et logs. 34 routes ne sont pas un inventaire complet.
- [ ] Sauvegarde hors dépôt public + preuve d'une restauration réussie.
- [ ] Vérifier `/admin` BasicAuth, `/apps` Passenger et les chemins imbriqués.
- [ ] Vérifier et faire approuver les contenus juridiques, les coordonnées
  et la politique de confidentialité.

## P1 — candidate et qualité

- [x] Construction Node 22 sans dépendances npm externes.
- [x] Tests HTTP de navigation, statuts, sécurité et manifeste.
- [x] Prévisualisation `noindex` par défaut.
- [x] Contrôle de migration documenté et mode indexable explicite.
- [x] Surveiller la production via workflow GitHub en lecture seule.
- [ ] Réintégrer les guides, médias et pages historiques réels et approuvés.
- [ ] Tester le CSS, les URLs propres, le référencement et l'accessibilité
  sur une copie de production, sans interrompre le serveur existant.
- [ ] Réviser le traitement de données et les formulaires sources, s'ils
  existent, avec autorisations vérifiées côté serveur.

## P2 — préparation puis publication vérifiée

- [ ] Confirmer qui héberge actionavocat.ca et les chemins exacts.
- [ ] Créer une cible isolée de prévisualisation, protégée de l'indexation.
- [ ] Comparer routes et médias exhaustifs, confirmer rollback.
- [ ] Réaliser les vérifications humaines requises, créer
  `deploy/release-approval.json` sans secrets.
- [ ] Compiler la release `ACTIONAVOCAT_INDEXABLE=true npm run build`
  puis obtenir `npm run preflight` vert.
- [ ] Mettre en place le déploiement réellement autorisé, avec journal,
  sauvegarde et retour arrière.
- [ ] Contrôler le domaine réel, le commit servi, HTTPS, le SEO et
  l'absence de régression sur `/admin` et `/apps`.

## Prochaine action exactement

**Importer et comparer les fichiers de production cPanel** avec les
routes et liens constatés dans [PUBLIC_ROUTE_AUDIT.md](PUBLIC_ROUTE_AUDIT.md).
Sans cet export, continuer à développer les contrôles indépendants,
mais ne pas envoyer `dist/` sur le document root du site historique.
