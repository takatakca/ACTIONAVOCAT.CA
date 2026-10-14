# Relève développeur — ACTIONAVOCAT.CA

## Vérification GitHub au démarrage (2026-10-14)

- Dépôt : takatakca/ACTIONAVOCAT.CA
- Branche principale : main.
- HEAD initial : 81b2455780bff2365671f535f4d2d8373858866e.
- Contenu initial : README.md avec seulement "# ACTIONAVOCAT.CA".
- Pas de code applicatif, docs de développement, workflows, issues ouvertes
  ni pull requests ouvertes disponibles dans ce dépôt initial.

## Éléments de contexte à préserver

Le domaine dispose d'un site existant. Son édition/source vit hors de ce dépôt,
probablement sur cPanel/MochaHost. Ne pas écraser ni reconstituer au hasard
les éléments non présents dans GitHub.

- /admin : accès protégé par BasicAuth à préserver intégralement.
- /apps : application(s) Passenger/Node à préserver, notamment /apps/romanowski.
- Le fichier .htaccess racine actuel ne doit pas être remplacé aveuglément.
- /service/... : pages HTML avec URLs publiques sans extension.
- Certaines routes possèdent fichier .html adjacent et sous-répertoire,
  conserver la priorité du fichier .html pour l'URL parent.

## Ce qui est réalisé dans ce commit

- Prévisualisation statique responsive (FR) indépendante et construisible.
- Navigation mobile accessible, services, contact et mentions prudentes.
- Métadonnées SEO, sitemap, robots et données structurées.
- Serveur HTTP de prévisualisation local.
- Suite de tests Node et workflow CI artefact.
- Script d'audit des routes publiques (GET, read-only).
- Inventaire des routes connues et fragment Apache **non installé**.

## Prochaines tâches, dans l'ordre

1. Exporter/archiver la racine Web actuelle de cPanel **sans secrets ni
   données de clients** ; relever l'arborescence, les médias et .htaccess.
2. Faire l'inventaire complet du sitemap et des routes (200, 301, 404).
3. Comparer le code existant avec ce candidat ; intégrer les pages réelles
   et les textes approuvés sans perdre les acquis du site.
4. Vérifier marque, mentions légales, politique de confidentialité, délais
   et informations de contact avec le cabinet.
5. Tester en environnement de staging les URLs propres, les assets, /admin,
   /apps, les chemins imbriqués, l'accessibilité et les performances.
6. Identifier le véritable document root cPanel et des secrets GitHub pour
   un déploiement versionné avec sauvegarde et restauration vérifiées.
7. **Seulement après** cette comparaison, activer le déploiement cible.
   Aucun déploiement automatique en production n'est configuré à ce stade.

## Commandes

    npm run build
    npm test
    npm run dev
    npm run audit:live

La compilation ne nécessite aucun paquet tiers ni accès au serveur de
production. Aucun secret ou identifiant d'infrastructure n'est stocké.
