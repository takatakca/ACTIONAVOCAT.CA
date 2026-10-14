// Textes de présentation généraux, révisables par l'équipe du cabinet.
// Aucune promesse de résultat, consultation gratuite ou délai garanti.
export const services = [
  {
    slug: "service/droit-civil",
    title: "Droit civil",
    label: "Litiges et recours",
    lead: "Des démarches structurées pour les différends contractuels, la responsabilité civile et le recouvrement.",
    points: [
      "Évaluation des faits, de la preuve et des recours possibles.",
      "Mises en demeure et négociation d'ententes.",
      "Accompagnement en matière de créances et de différends civils."
    ]
  },
  {
    slug: "service/droit-affaires",
    title: "Droit des affaires",
    label: "Entreprises",
    lead: "Des conseils pour aborder les risques et les conflits liés aux activités commerciales.",
    points: [
      "Différends entre entreprises et partenaires.",
      "Examen des obligations contractuelles.",
      "Stratégies de règlement et démarches judiciaires, lorsque pertinentes."
    ]
  },
  {
    slug: "service/litige-assurance",
    title: "Litiges en assurance",
    label: "Assurances",
    lead: "Une approche méthodique lorsque la portée d'une garantie ou le traitement d'une réclamation est contesté.",
    points: [
      "Analyse des documents de police et des communications.",
      "Évaluation des positions des parties.",
      "Préparation d'une démarche de résolution ou d'un litige."
    ]
  },
  {
    slug: "service/responsabilite-civile",
    title: "Responsabilité civile",
    label: "Dommages",
    lead: "Comprendre les enjeux de faute, de préjudice et de lien causal dans une situation litigieuse.",
    points: [
      "Organisation des faits et des éléments de preuve.",
      "Examen des fondements possibles d'une réclamation.",
      "Démarches de négociation et de représentation adaptées au dossier."
    ]
  },
  {
    slug: "service/recours-collectifs",
    title: "Actions collectives",
    label: "Recours collectifs",
    lead: "Une première lecture des enjeux collectifs, des parties concernées et des questions communes.",
    points: [
      "Analyse préliminaire des faits signalés.",
      "Identification des informations pertinentes.",
      "Orientation vers une démarche appropriée, selon le contexte."
    ]
  },
  {
    slug: "service/conseils-juridiques-consultation",
    title: "Conseils juridiques et consultation",
    label: "Orientation",
    lead: "Un premier échange permet de préciser la situation et de déterminer les prochaines étapes utiles.",
    points: [
      "Définition de l'objectif et du contexte du dossier.",
      "Préparation des questions et des documents à réunir.",
      "Discussion du mandat et des honoraires avant tout engagement."
    ]
  }
];

export const pages = [
  {
    slug: "",
    kind: "home",
    title: "ROMANOWSKI AVOCATS | Cabinet en litige civil à Montréal",
    description: "ROMANOWSKI AVOCATS : litiges civils, droit des affaires, assurances et consultation juridique. Contactez le cabinet pour discuter de votre situation."
  },
  ...services.map((service) => ({
    ...service,
    kind: "service",
    seoTitle: service.title + " | ROMANOWSKI AVOCATS",
    description: service.title + " : " + service.lead
  })),
  {
    slug: "contact",
    kind: "contact",
    title: "Contacter le cabinet | ROMANOWSKI AVOCATS",
    description: "Coordonnées de ROMANOWSKI AVOCATS à Montréal. Communiquez avec le cabinet pour une demande de rendez-vous."
  },
  {
    slug: "confidentialite",
    kind: "privacy",
    title: "Confidentialité | ROMANOWSKI AVOCATS",
    description: "Information sur la confidentialité et les moyens de communiquer avec le cabinet."
  }
];

export const productionRoutes = [
  "/",
  "/service/droit-civil",
  "/service/droit-civil/admissible-petites-creances",
  "/service/droit-civil/demande-introductive-instance",
  "/service/droit-civil/mise-en-demeure",
  "/service/droit-civil/recouvrement-de-creances",
  "/service/conseils-juridiques-consultation",
  "/service/conseils-juridiques-consultation/convention-d-honoraires-et-mandat",
  "/service/droit-affaires/contrats-commerciaux",
  "/service/droits-constitutionnels",
  "/realisation-assurance"
];
