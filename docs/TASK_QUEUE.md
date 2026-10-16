# TASK_QUEUE — priorité réelle

## P0 — préserver le système existant (bloquant de déploiement)

- [ ] Obtenir un export de la racine Web actuelle (code public, .htaccess et
      inventaire des médias), **sans sauvegarder de secrets ou de données
      clients dans le dépôt public**. Document root et compte cPanel à vérifier.
- [ ] Sauvegarde de production chiffrée, contrôlée, et essai de restauration
      documenté (références non sensibles seulement dans GitHub).
- [ ] Recenser toutes les URLs publiques : exécuter le workflow manuel
      `inventory.yml`, rapprocher avec sitemap et liens du site.
- [ ] Faire correspondre à chaque URL existante son contenu approuvé
      (ou redirection 301 validée). Le script `preflight` bloque actuellement.
- [ ] Conserver et vérifier `/admin` BasicAuth, `/apps` Passenger et le
      comportement Apache du `.htaccess` d'origine.
- [ ] Obtenir l'approbation des textes juridiques, du numéro de téléphone,
      du courriel et de la politique de confidentialité.

## P1 — qualité fonctionnelle et sécurité

- [x] Suite tests unitaires + tests HTTP de routes propres.
- [x] Manifeste de release avec SHA GitHub et empreintes de pages.
- [x] Garde de migration non destructive.
- [x] Exploration contrôlée du site public (script et workflow manuel).
- [ ] Remplacer les contenus génériques de prévisualisation par les contenus
      réellement existants et validés.
- [ ] Tester liens, URLs imbriquées, trafic SEO, accessibilité et mobile
      sur une copie isolée, incluant les chemins de sous-répertoires.
- [ ] Revoir éventuels formulaires du site source et traitements de données
      conformément au droit québécois et à la déontologie.

## P2 — publication contrôlée

- [ ] Confirmer fournisseur, compte, document root, DNS et méthode de
      publication réellement utilisée (MochaHost présumé, NON vérifié).
- [ ] Créer un déploiement **vers un espace de prévisualisation isolé** avec
      secrets GitHub chiffrés et accès minimal, jamais vers le site existant
      avant parité et sauvegarde.
- [ ] Valider Apache sur copie avec `/admin`, `/apps`, URLs propres.
- [ ] Créer `deploy/release-approval.json` seulement après preuves vérifiées;
      tous les champs de `checks` doivent être vrais, aucune clé dans Git.
- [ ] Passer `npm run preflight` sans blocage après reprise de tous les
      contenus et approbations.
- [ ] Publier selon une stratégie de remplacement réversible avec retour
      arrière documenté; vérifier HTTPS, version, logs et URLs réellement servies.
- [ ] Reconfirmer SEO/robots/sitemap et supprimer les fichiers temporaires.

## Première action exécutable au prochain lancement

1. Relire l'état GitHub réel, la CI et `AGENT_HANDOFF.md`.
2. Exécuter `npm run build && npm test`.
3. Lancer le workflow manuel `ActionAvocat — inventaire public manuel`
   ou exécuter localement `npm run inventory:public`.
4. Confronter `reports/public-routes.json` aux fichiers source accessibles.
   Si la source cPanel manque encore, conserver le blocage de déploiement
   et continuer l'amélioration du candidat sans toucher à la production.
