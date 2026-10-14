# ACTIONAVOCAT.CA — ROMANOWSKI AVOCATS

**État au 14 octobre 2026 : reprise de contrôle du code source (candidat de migration).**

Le dépôt GitHub d'origine ne contenait qu'un titre README. Le domaine
https://actionavocat.ca/ héberge **déjà un site fonctionnel**, sous la marque
ROMANOWSKI AVOCATS. Le code de ce site n'est pas dans ce dépôt à ce jour.

Ce projet fournit donc une **base statique moderne et indépendante**, qui peut
être construite et inspectée sans toucher au site actuellement en ligne.
**Une compilation réussie n'autorise pas à remplacer le site existant.**

## Développement

Prérequis : Node.js 20+ (Node 22 recommandé), aucune dépendance npm externe.

    npm run build
    npm test
    npm run dev

Puis visiter http://localhost:4173.

- Sortie statique : dist/ (non versionnée).
- Routes propres générées en fichiers .html et index.html.
- Interface responsive en français, navigation clavier, liens de contact.
- Aucune collecte de dossiers juridiques côté navigateur.
- SEO : balises title/description/canonical, sitemap, robots et JSON-LD.
- Audit public en lecture seule : npm run audit:live.
- Pipeline GitHub Actions : build, tests et artefact de prévisualisation.

## Limites et précautions

Ce dépôt ne représente **pas** une copie fidèle du site existant : ses guides
juridiques détaillés, ses réalisations, son administration, ses médias et ses
applications Passenger n'ont pas encore été importés. Ne pas supprimer ces
ressources ni faire de synchronisation destructive.

Les dossiers **/admin** (BasicAuth) et **/apps** (Passenger), ainsi que
l'actuel fichier .htaccess racine, sont hors périmètre de cette version.
Le fragment de réécriture proposé dans deploy/htaccess-fragment.txt est
informatif et doit être intégré après audit du fichier existant.

Voir docs/PRODUCTION-INVENTORY.md et docs/HANDOFF.md pour la relève et les
étapes à effectuer avant un éventuel déploiement. Les textes ici sont des
présentations générales ; ils ne constituent pas des avis juridiques.

Aucun secret, configuration d'hébergement ou mécanisme de déploiement en
production n'a été inventé.
