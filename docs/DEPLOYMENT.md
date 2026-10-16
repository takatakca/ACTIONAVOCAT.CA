# DEPLOYMENT — plan de publication sans perte

## Situation connue au 2026-10-16

- Site public historique : https://actionavocat.ca/, sous la marque ROMANOWSKI AVOCATS.
- Github : `takatakca/ACTIONAVOCAT.CA`, branche `main`.
- Hébergeur historique probable : MochaHost / cPanel. **Aucune confirmation
  d'accès SSH, FTP, document root ni de projet Coolify dans cette session.**
- Les chemins `/admin` (BasicAuth) et `/apps` (Passenger) sont signalés
  comme dépendances existantes; leur configuration réelle doit être vérifiée.
- Le dépôt est **un candidat**, pas une sauvegarde de l'ancien site.
- Aucune action GitHub ne publie sur l'hébergement de production.

## Production : contrôles préalables

1. Vérifier le vrai serveur cible et l'identité du domaine.
2. Exporter, horodater et vérifier la sauvegarde hors dépôt de tous les
   fichiers et de la configuration de l'ancienne application; valider la
   méthode de restauration sur copie.
3. Tester les règles Apache de l'ancien `.htaccess` sur copie isolée.
   Ne pas remplacer ce fichier par le fragment d'exemple.
4. Faire l'inventaire exhaustif des routes, des actifs et des services
   hérités. Les URLs sous `/service` ont des sous-répertoires et parfois
   un fichier `.html` adjacent : gérer la priorité correctement.
5. Faire approuver le contenu juridique, les coordonnées, la politique de
   confidentialité et la protection des données.
6. Générer le site : `npm run build && npm test`.
7. Vérifier la parité de toutes les URLs publiques et exécuter
   `npm run preflight`. L'échec actuel est **voulu**.
8. Une fois tous les critères prouvés, enregistrer les métadonnées non
   sensibles dans `deploy/release-approval.json` (modèle fourni).
9. Déployer d'abord la copie vers un emplacement temporaire **non routé**
   vers le domaine public, puis tester les accès et la restauration.
10. Procéder à la bascule seulement avec procédure de rollback disponible.

## Déploiement actuel

Le workflow `.github/workflows/ci.yml` produit l'artefact
`actionavocat-static-preview`, pas une publication du domaine.
Le workflow `release-gate.yml` exécute un contrôle manuel qui échoue tant que
des routes ou validations manquent. Il **ne déploie rien** même une fois vert.

Le workflow `inventory.yml` est manuel et publie seulement un rapport de
routes publiques dans un artefact temporaire, sans identifiants.

Ne pas recopier un pipeline FTP provenant d'un autre domaine sans connaître
le compte propriétaire d'actionavocat.ca et la destination exacte.

## Vérification de version

`dist/release-manifest.json` contient `sourceSha`, routes et SHA-256 des
pages. Après futur déploiement, si le fichier est volontairement exposé,
comparer ce SHA avec le commit GitHub publié. En son absence, vérifier le
contenu servi et les journaux; ne jamais affirmer un déploiement sur la seule
base de GitHub Actions.

## Retour arrière

Garder une copie intacte de l'ancien document root et du `.htaccess`.
La procédure exacte dépend du service réellement identifié. Tester et
documenter la restauration avant toute migration et ne pas retirer les
répertoires `/admin` ou `/apps` lors d'un déploiement statique.
