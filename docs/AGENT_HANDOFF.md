# AGENT_HANDOFF — reprise immédiate

**Dernière session : 2026-10-16 (America/Toronto).**
**Dépôt :** https://github.com/takatakca/ACTIONAVOCAT.CA
**Branche :** `main`
**Dernier commit technique validé au moment de la rédaction :**
`181bf83f51c94c9e8910cc6546bd57475251e993`.
**Important :** la présente mise à jour de documentation crée un commit
ultérieur; lire le SHA réel via GitHub `main` avant d'écrire.

## Dernière tâche terminée

- Durcissement du serveur HTTP de prévisualisation : méthodes, statuts
  400/404/405, entêtes de sécurité, routes propres et priorité `.html`.
- Manifeste de livraison avec SHA et empreintes des pages.
- Tests d'intégration HTTP et vérification de parité pré-publication.
- Inventaire public limité et pipeline manuel associé.
- **CI sur le commit technique réussi** :
  https://github.com/takatakca/ACTIONAVOCAT.CA/actions/runs/38952518702
- Suite documentaire : AGENTS.md et cinq documents de continuité.

## Tâche en cours

Inventaire exhaustif et comparaison avec les fichiers du site de production.
Les guides juridiques, `.htaccess`, médias et applications réelles ne sont
pas encore accessibles dans ce dépôt. **Ne pas déployer le candidat sur le
document root historique avant reprise et vérification de ces éléments.**

## Fichiers modifiés dans cette session

- scripts/serve.mjs
- scripts/build.mjs
- scripts/preflight.mjs
- scripts/inventory-public.mjs
- tests/http.test.mjs
- tests/preflight.test.mjs
- package.json
- .gitignore
- .github/workflows/ci.yml
- .github/workflows/inventory.yml
- .github/workflows/release-gate.yml
- deploy/release-approval.example.json
- AGENTS.md
- docs/PROJECT_STATUS.md
- docs/TASK_QUEUE.md
- docs/AGENT_HANDOFF.md
- docs/DEPLOYMENT.md
- docs/DECISIONS.md
- README.md et docs/HANDOFF.md

## Vérifications exécutées

- GitHub : `main`, commit `9ed8a3e` avant reprise, pas de PR ni issue ouverte.
- L'ancienne surveillance publique a réussi les 15 et 16 octobre 2026.
- GitHub Actions sur `181bf83` : `npm run build`, `npm test`,
  contrôles d'artefacts, dépôt d'artefact, tous **réussis**.
- `npm run preflight` : **échec attendu et requis** jusqu'à ce que
  l'inventaire et les approbations soient complets.
- Le script `inventory:public` a été publié mais son exécution manuelle
  n'est pas attestée dans cette session.

## Problèmes / blocages connus

1. Le code et la configuration exacts de cPanel ne sont pas dans GitHub.
2. Les routes publiques connues dépassent le nombre de pages candidates.
3. Le contenu juridique et les informations de confidentialité demandent
   validation métier.
4. Pas de déploiement cible authentifié, de preuve de sauvegarde ni de test
   de rollback.
5. Les mentions `/admin` et `/apps` proviennent de la relève précédente;
   elles restent à vérifier sur l'hébergement.

## Statut réel du déploiement

**Production historique inchangée. Aucun déploiement du candidat.**
La compilation GitHub ne constitue pas une preuve de publication du site.

## Accès nécessaires (aucun secret dans GitHub)

- Lecture ou export sûr des fichiers du document root du domaine.
- Copie et configuration Apache/`.htaccess`, inventaire des applications.
- Références d'une sauvegarde exploitable et de sa restauration validée.
- Approbation professionnelle des contenus et données personnelles.
- Plus tard seulement : identifiants de déploiement limités au document root
  exact, sous forme de secrets GitHub chiffrés.

## Prochaine action exacte

1. Lire AGENTS.md et ces cinq documents; vérifier le nouveau `main`.
2. Vérifier la CI la plus récente, corriger si nécessaire.
3. Exécuter le workflow manuel « inventaire public » ou
   `npm run inventory:public` depuis un accès réseau autorisé.
4. Comparer ce rapport avec l'export réel cPanel et ajouter les anciennes
   pages/routes manquantes, sans retranscrire des dossiers confidentiels.
5. Continuer jusqu'à `npm run preflight` vert et déploiement réversible
   effectivement vérifié.

Une session finie ne se relance pas seule. Un orchestrateur externe
explicitement autorisé est nécessaire pour une reprise automatisée.
