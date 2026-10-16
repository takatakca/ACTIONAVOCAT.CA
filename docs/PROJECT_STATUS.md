# PROJECT_STATUS — ACTIONAVOCAT.CA

Date de vérification : **2026-10-16** (America/Toronto).

| Élément | État vérifié |
| --- | --- |
| GitHub | https://github.com/takatakca/ACTIONAVOCAT.CA |
| Branche | `main` |
| SHA de base examiné | `9ed8a3edb0dfc315946a76032bc31e4d0fa21235` |
| Dernier commit technique validé avant documentation | `181bf83f51c94c9e8910cc6546bd57475251e993` |
| CI technique | Succès : https://github.com/takatakca/ACTIONAVOCAT.CA/actions/runs/38952518702 |
| Surveillance publique | Succès au 2026-10-16 sur l'ancien site (workflow GitHub Actions) |
| PR ouvertes / issues ouvertes | Aucune au moment de l'audit |
| Candidate | Neuf pages HTML statiques, CSS/JS et SEO |
| Production | Site actif antérieur, non reconstruit à partir du dépôt |
| Publication de ce dépôt en production | **NON vérifiée / NON effectuée** |
| Déploiement automatique | **Désactivé pour la production** |
| Garde de migration | Échec attendu tant que les anciennes routes et validations manquent |

## Terminé

- Construction sans dépendances npm tierces, vérifiée sur GitHub Actions.
- Navigation mobile et pages vitrine, génération des métadonnées et sitemap.
- Serveur de prévisualisation, réponses HTTP sécurisées, tests d'intégration.
- Manifeste SHA de contenu permettant de comparer des artefacts.
- Script de surveillance du site public en lecture seule et workflow quotidien.
- Inventaire public borné (80 routes par défaut, 100 maximum) activable manuellement.
- Contrôle de parité des URLs publiques avec approbations explicites.
- Artefact de build automatiquement déposé sur GitHub Actions.

## Non terminé

- Source d'origine non importée dans GitHub : il manque les guides complets,
  médias, règles Apache réelles, applications Passenger, administration.
- Le contrôle de parité détecte des URLs existantes absentes du candidat.
- Vérification métier du contenu juridique et confidentialité non documentée.
- Pas de preuve d'accès/sauvegarde de cPanel, de test de restauration, de
  correspondance de document root ni de validation de domaine/staging.
- Aucun pipeline n'écrit sur MochaHost/Coolify, par sécurité.

Cette page ne prétend pas que l'application est terminée ni que le nouveau
candidat remplace l'ancien site.
