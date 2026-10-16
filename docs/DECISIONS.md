# DECISIONS — journal technique

## 2026-10-14 — Ne pas remplacer un site existant par un dépôt vide
Le dépôt ne contenait initialement qu'un README. Le domaine avait déjà un
site ROMANOWSKI AVOCATS. Décision : créer un candidat isolé, pas une
réécriture destructive de l'hébergement.

## 2026-10-14 — Prévisualisation sans dépendances ni collecte
Une construction statique FR, zéro dépendance npm et aucun formulaire de
dossier ont été choisis pour permettre la validation sans backend juridique
non autorisé. Les guides originaux ne sont pas copiés ou remplacés.

## 2026-10-14 — Surveillance limitée à la lecture
Le contrôle quotidien public utilise des requêtes GET sans authentification.
Il ne touche pas cPanel, Passenger, l'administration ou les données de clients.

## 2026-10-16 — Garde de migration obligatoire
Une CI verte ne signifie pas que les routes historiques sont conservées.
Un contrôle compare les URLs connues aux pages générées et bloque la
prévalidation tant que des écarts restent présents. Un approbateur doit
confirmer séparément l'export du site, la restauration, la confidentialité,
l'administration et le contenu juridique, avec preuves non sensibles.

## 2026-10-16 — Inventaire public contrôlé
L'exploration publique est bornée (80 pages par défaut, 100 maximum),
exclut les préfixes administratifs et ne sauvegarde pas les corps HTML.
Les rapports ne sont pas committés dans le dépôt.

## 2026-10-16 — Ne pas confondre hébergement du groupe et du client
Les informations d'autres projets TAKATAK (Contabo, Coolify, comptes
MochaHost) ne prouvent pas que ce domaine est hébergé à tel endroit.
L'identité de ROMANOWSKI AVOCATS reste autonome. Pas d'authentification
TAKATAK ni de migration de données juridiques sans mandat spécifique.
