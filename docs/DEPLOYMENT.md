# DEPLOYMENT — ACTIONAVOCAT.CA

## Situation au 16 octobre 2026

- Production actuelle : https://actionavocat.ca/, ROMANOWSKI AVOCATS.
- Source GitHub : `takatakca/ACTIONAVOCAT.CA`, `main`.
- Hébergement historique cPanel/MochaHost : hypothèse de relève.
  Compte, document root, accès et applications : **non vérifiés en session**.
- Le dépôt n'est pas la copie complète du site original.
- **Pas de déploiement de production depuis GitHub aujourd'hui.**

## Commandes

```sh
npm run build              # candidats noindex
npm test                   # tests HTTP, statiques, garde
npm run dev                # http://127.0.0.1:4173
npm run audit:live         # liste des URL publiques connues
npm run inventory:public   # crawl public, rapports dans reports/
npm run preflight          # échec attendu actuellement
```

Le workflow `.github/workflows/ci.yml` construit et archive
`actionavocat-static-preview`. Le workflow `inventory.yml` explore les
routes publiques lors d'un changement de scripts/liste, ou manuellement,
sans accéder aux dossiers privés.

L'artefact `reports/apache-redirects.review.conf` contient des
**suggestions**, pas un `.htaccess` complet et jamais installé par CI.
Corriger les sources HTML historiques avant d'ajouter des redirections.

## Processus de migration

1. Identifier le compte et la configuration réelle; exporter le contenu
   public actuel en sauvegarde hors dépôt, avec contrôle d'intégrité.
2. Préserver `/admin`, `/apps`, Passenger, BasicAuth, `.htaccess`
   et médias, y compris les pages juridiques sous plusieurs sous-dossiers.
3. Restaurer la sauvegarde dans un espace isolé et tester un rollback.
4. Corriger les liens publics cassés identifiés par l'inventaire,
   sans supprimer une restriction Apache légitime.
5. Comparer chaque route existante (y compris le sitemap complet)
   à une page ou à une redirection explicitement approuvée.
6. Obtenir approbation de confidentialité, contenus et coordonnées.
7. Tester la candidate sur une adresse de prévisualisation protégée
   par accès et `noindex`. Tous les builds sont `noindex` par défaut.
8. Après toutes ces vérifications, préparer une compilation indexable
   avec `ACTIONAVOCAT_INDEXABLE=true npm run build`.
9. Faire passer `npm run preflight` (garde rouge aujourd'hui).
   Il exige un `deploy/release-approval.json` renseigné avec
   des références non sensibles aux vérifications/approbations.
10. Publier avec méthode de remplacement réversible et accès minimal,
    puis vérifier réellement les routes, certificats, fonctionnalités
    héritées et version servie (manifeste SHA).
11. Garder la restauration immédiatement disponible si la vérification
    post-déploiement échoue.

**Ne pas** coller le fragment d'exemple dans le `.htaccess` réel sans
avoir lu les directives Apache/Passenger actuelles. Aucun accès FTP/SSH
de cet environnement n'a été prouvé.

## Version et preuves

`dist/release-manifest.json` contient `sourceSha`, `indexable` et les
empreintes SHA-256 des pages. Une CI verte n'est pas une preuve du contenu
servi sur actionavocat.ca. Une publication réussie devra être démontrée
sur la cible avec ce manifeste et des tests HTTP.

La configuration d'un éventuel orchestrateur autonome de reprises
nécessite un service externe autorisé; aucun n'est configuré ici.
