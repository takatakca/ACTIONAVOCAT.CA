# AGENTS — ACTIONAVOCAT.CA

## Démarrage obligatoire

1. Lire \`docs/AGENT_HANDOFF.md\`, \`docs/PROJECT_STATUS.md\`,
   \`docs/TASK_QUEUE.md\`, \`docs/DECISIONS.md\`, \`docs/DEPLOYMENT.md\`.
2. Vérifier GitHub \`main\` (SHA, PR, issues, workflows) avant toute écriture.
3. Exécuter \`npm run build && npm test\` après chaque modification de code.
4. Reprendre la première tâche réellement exécutable de \`TASK_QUEUE.md\`.
5. Pousser des commits cohérents, sans force-push ni secrets.
6. Mettre à jour \`docs/AGENT_HANDOFF.md\` avant la fin de session.

## Interdictions de publication destructive

La branche \`main\` contient un **candidat de migration**, pas une copie de
l'hébergement de production. Le site \`https://actionavocat.ca/\` existe déjà.
Ne JAMAIS remplacer automatiquement les fichiers de production avec \`dist/\`
avant l'import complet du site, la parité des URLs et un essai de restauration.

Préserver :
- \`/admin\` et BasicAuth ;
- \`/apps\`, Passenger/Node et toute application actuelle ;
- \`.htaccess\` et règles de réécriture/SSL ;
- guides juridiques et médias publiés, y compris les URLs imbriquées.

Un pipeline vert signifie « compilable », pas « production déployée ».
Le pré-contrôle \`npm run preflight\` **doit échouer** actuellement : c'est
intentionnel tant que les conditions restent incomplètes.

## Portée produit

ROMANOWSKI AVOCATS est une identité éditoriale autonome.
Ne pas fusionner son interface avec TAKATAK ni déplacer des données client.
N'ajouter aucun formulaire de dossier, authentification ou API juridique sans
modèle d'accès vérifié côté serveur, fondement de traitement et autorisation.
Ne pas publier des textes juridiques générés comme s'ils avaient été approuvés.

## Commandes

\`\`\`sh
npm run build
npm test
npm run dev
npm run audit:live
npm run inventory:public
npm run preflight   # échec attendu actuellement
\`\`\`

## Reprise après interruption

GitHub est la source de vérité. La session ne peut être relancée
automatiquement par ce fichier : cela exige un orchestrateur externe
explicitement autorisé et configuré. Ne pas inventer de service actif.
