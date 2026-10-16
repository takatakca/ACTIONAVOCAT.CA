# Inventaire initial de la production — 2026-10-14

La production publique https://actionavocat.ca/ est active sous la marque
**ROMANOWSKI AVOCATS**. Ce dépôt ne contient pas son code d'origine.

## Routes publiques attestées lors de la découverte

- /
- /service/droit-civil
- /service/droit-civil/admissible-petites-creances
- /service/droit-civil/demande-introductive-instance
- /service/droit-civil/mise-en-demeure
- /service/droit-civil/recouvrement-de-creances
- /service/conseils-juridiques-consultation
- /service/conseils-juridiques-consultation/convention-d-honoraires-et-mandat
- /service/droit-affaires/contrats-commerciaux
- /service/droits-constitutionnels
- /realisation-assurance
- /service/droit-travail
- /service/droit-travail/obligations-de-l-employeur-cnesst
- /service/litiges-representation/requete-d-urgence-ordonnance-de-sauvegarde
- /service/droit-affaires/prevenir-les-clauses-abusives-dans-les-contrats-commerciaux

Ce relevé n'est pas un sitemap exhaustif ; **ne pas retirer les pages absentes
de cette liste**. Certaines possèdent un long contenu éditorial et des liens
externes. Les réutiliser requiert leur extraction depuis les fichiers du
site et la validation de leur exactitude juridique.

## Contact actuellement affiché sur des pages publiques

- Téléphone : +1 (514) 895-2000
- Courriel : romanowskiyan@gmail.com
- Ville : Montréal

Ces informations sont fournies à titre de données visibles publiquement et
doivent être confirmées auprès du cabinet avant bascule en production.

## Éléments à conserver

- /admin et son accès protégé par BasicAuth ;
- /apps et les applications Node/Passenger, dont /apps/romanowski ;
- règles .htaccess existantes : URLs sans .html, chemins imbriqués, SSL ;
- les guides juridiques détaillés et les anciens slugs ;
- médias, SEO et formulaires/backend existants (ne pas les réinventer).

Le contrôle des routes publiques peut être lancé via npm run audit:live. Il
ne se connecte pas à cPanel et n'écrit rien en production.
