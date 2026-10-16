# Relève historique — ACTIONAVOCAT.CA

**Ce fichier est conservé pour les liens existants.** La relève courante,
actualisée à chaque session, est maintenant
[docs/AGENT_HANDOFF.md](AGENT_HANDOFF.md).

## État initial observé le 2026-10-14

- Dépôt GitHub d'origine : uniquement \`README.md\`.
- Branche \`main\` : \`81b2455780bff2365671f535f4d2d8373858866e\`.
- Site public ROMANOWSKI AVOCATS déjà disponible hors dépôt.
- Chemins signalés à préserver : \`/admin\` sous BasicAuth et \`/apps\`
  sous Passenger, dont \`/apps/romanowski\` (vérification cPanel nécessaire).
- \`.htaccess\` en place et coexistence de fichiers \`.html\` avec des
  sous-répertoires pour les anciennes pages.

Le candidat statique construit sur GitHub n'est pas une restauration
complète du site. Ne pas l'utiliser pour écraser la production.

Consulter également [PROJECT_STATUS.md](PROJECT_STATUS.md),
[TASK_QUEUE.md](TASK_QUEUE.md) et [DEPLOYMENT.md](DEPLOYMENT.md).
