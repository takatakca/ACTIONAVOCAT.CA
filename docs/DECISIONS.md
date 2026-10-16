# DECISIONS — journal technique

## 2026-10-14 — Ne pas écraser le site existant
Le dépôt initial ne contenait qu'un README mais un site
ROMANOWSKI AVOCATS fonctionnait déjà. Maintenir une prévisualisation
sans remplacement automatique de la production.

## 2026-10-14 — Prévisualisation sans collecte de dossiers
Construire un site statique FR sans dépendances npm externes. Ne pas
inventer de backend juridique, de formulaire confidentiel ni d'identité
TAKATAK. Les guides complets d'origine doivent être récupérés et validés.

## 2026-10-14 — Surveillance publique strictement en lecture seule
Utiliser des requêtes GET, sans comptes ni accès à cPanel, à `/admin`
ou à `/apps`. La CI verte ne signifie pas que la version est déployée.

## 2026-10-16 — Garde de migration non contournable par défaut
Bloquer un remplacement lorsqu'il manque des routes publiques, des
preuves de sauvegarde/restauration ou les approbations métier. Utiliser
un manifeste SHA-256 et un modèle d'approbation sans secret.

## 2026-10-16 — Réparer les liens historiques à la source
L'inventaire a trouvé 16 réponses 404 et une 403 sur 34 chemins.
Le moteur propose seulement des redirections vers des cibles déjà
confirmées HTTP 200. Ne pas installer de redirections spéculatives ni
un nouveau `.htaccess` complet sur le serveur historique.

## 2026-10-16 — Masquer les chemins internes dans les rapports
Certaines erreurs HTTP exposent un chemin de type système de fichiers.
Ne pas distribuer ce chemin. Le rapport public masque sa valeur et
signale uniquement qu'un examen Apache est nécessaire.

## 2026-10-16 — Les builds de prévisualisation ne doivent pas être indexés
Le réglage par défaut est `noindex,nofollow,noarchive` et
`robots.txt` interdit l'exploration. Pour construire un artefact
indexable, il faut le demander explicitement avec
`ACTIONAVOCAT_INDEXABLE=true` **puis passer la garde de prépublication**.
Aucun pipeline n'effectue encore de déploiement de production.

## 2026-10-16 — Hébergement non inféré depuis d'autres projets
Le contexte TAKATAK/Contabo/MochaHost d'autres dépôts ne valide pas
l'environnement d'ACTIONAVOCAT.CA. La configuration d'hébergement,
la protection des accès et l'identité du client restent indépendantes.
