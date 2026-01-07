
import React from 'react';

export const COLORS = {
  GREEN: '#6E8F3A',
  ORANGE: '#C8742A',
  LIGHT_GREEN: '#AFC18B',
  GREY: '#3A3A3A',
  WHITE: '#FFFFFF',
};

export const NAVIGATION = [
  { label: 'Institution', id: 'institution' },
  { label: 'Vision & Valeurs', id: 'vision' },
  { label: 'Expertises', id: 'expertises' },
  { label: 'Architecture', id: 'architecture' },
];

export const VALUES = [
  { title: "Rigueur institutionnelle", description: "Respect absolu des normes et cadres juridiques internationaux." },
  { title: "Responsabilité", description: "Engagement total sur des résultats concrets et mesurables." },
  { title: "Intégrité", description: "Transparence et éthique absolue dans toutes nos collaborations." },
  { title: "Innovation utile", description: "Priorité systématique à l'impact réel sur le cosmétique et l'éphémère." },
  { title: "Souveraineté africaine", description: "Conception de solutions adaptées aux réalités endogènes et souveraines." },
  { title: "Excellence opérationnelle", description: "Exigence maximale dans la précision et la rapidité d'exécution." },
];

export const EXPERTISES = [
  { title: "Transformation Numérique", desc: "Digitalisation des processus étatiques et institutionnels." },
  { title: "Structuration d’Écosystèmes", desc: "Création de hubs d'innovation et de clusters industriels." },
  { title: "Gouvernance de Programmes", desc: "Pilotage de projets complexes à l'échelle nationale ou régionale." },
  { title: "Ingénierie de Développement", desc: "Accompagnement des politiques publiques et initiatives privées." }
];

export const IMPACT_METRICS = [
  { label: "Horizon Stratégique", value: "20-30 Ans" },
  { label: "Pôles d'Excellence", value: "03" },
  { label: "Projets Structurés", value: "15+" },
  { label: "Zones d'Impact", value: "Panafricain" }
];

export const SECTORS = [
  "Infrastructures Critiques",
  "Finances Publiques & Fiscalité",
  "Énergie & Développement Durable",
  "Capital Humain & Éducation",
  "Technologies de Rupture"
];

export const STRATEGIC_PARTNERSHIPS = [
  { name: "Gouvernements Africains", type: "Institutionnel", focus: "Politiques publiques & réformes structurelles" },
  { name: "Banque Africaine de Développement", type: "Financier", focus: "Financement de projets d'infrastructure" },
  { name: "Union Africaine", type: "Supranational", focus: "Intégration régionale & harmonisation" },
  { name: "Secteur Privé Stratégique", type: "Commercial", focus: "Innovation & transfert technologique" }
];

export const FLAGSHIP_PROJECTS = [
  {
    title: "Programme de Digitalisation Gouvernementale",
    location: "Afrique Centrale",
    duration: "2024-2027",
    scope: "Transformation numérique des services publics dans 6 pays",
    impact: "15M+ citoyens bénéficiaires"
  },
  {
    title: "Hub d'Innovation Technologique",
    location: "Kinshasa-Brazzaville",
    duration: "2023-2030",
    scope: "Écosystème d'innovation transfrontalier",
    impact: "500+ startups incubées"
  },
  {
    title: "Corridor Énergétique Durable",
    location: "Bassin du Congo",
    duration: "2025-2035",
    scope: "Infrastructure énergétique verte régionale",
    impact: "50M+ habitants connectés"
  }
];

export const GOVERNANCE_PRINCIPLES = [
  {
    principle: "Transparence Absolue",
    description: "Tous nos processus sont auditables et conformes aux standards internationaux de gouvernance.",
    implementation: "Reporting trimestriel, audits externes, publication des métriques d'impact"
  },
  {
    principle: "Souveraineté Technologique",
    description: "Priorité systématique aux solutions développées localement avec transfert de compétences.",
    implementation: "70% minimum d'expertise locale, formation continue, open-source privilégié"
  },
  {
    principle: "Impact Mesurable",
    description: "Chaque intervention doit produire des résultats quantifiables et durables.",
    implementation: "KPIs définis ex-ante, évaluation d'impact indépendante, suivi post-projet"
  },
  {
    principle: "Éthique Environnementale",
    description: "Respect absolu des écosystèmes et contribution positive au développement durable.",
    implementation: "Évaluation environnementale systématique, compensation carbone, économie circulaire"
  }
];

export const INNOVATION_LABS = [
  {
    name: "FinTech Africaine",
    focus: "Solutions de paiement et inclusion financière",
    technologies: ["Blockchain", "IA", "Mobile Money"],
    partnerships: "Banques centrales, opérateurs télécoms"
  },
  {
    name: "GovTech Solutions",
    focus: "Digitalisation des services publics",
    technologies: ["Cloud souverain", "Cybersécurité", "Big Data"],
    partnerships: "Administrations publiques, organismes internationaux"
  },
  {
    name: "AgriTech Durable",
    focus: "Agriculture intelligente et sécurité alimentaire",
    technologies: ["IoT", "Satellites", "Biotechnologies"],
    partnerships: "Coopératives agricoles, instituts de recherche"
  }
];

export const CONTINENTAL_PRESENCE = [
  {
    region: "Afrique Centrale",
    countries: ["République du Congo", "RD Congo", "Cameroun", "Gabon"],
    focus: "Gouvernance institutionnelle et transformation numérique",
    projects: 12
  },
  {
    region: "Afrique de l'Ouest",
    countries: ["Sénégal", "Côte d'Ivoire", "Ghana", "Nigeria"],
    focus: "Écosystèmes d'innovation et fintech",
    projects: 8
  },
  {
    region: "Afrique de l'Est",
    countries: ["Kenya", "Rwanda", "Éthiopie"],
    focus: "Infrastructures critiques et énergie",
    projects: 6
  }
];

export const THOUGHT_LEADERSHIP = [
  {
    title: "L'Afrique Numérique Souveraine",
    type: "Livre Blanc",
    year: "2024",
    summary: "Stratégies pour une transformation digitale endogène et durable"
  },
  {
    title: "Gouvernance Hybride : Public-Privé-Citoyen",
    type: "Étude",
    year: "2023",
    summary: "Nouveaux modèles de gouvernance participative en Afrique"
  },
  {
    title: "Financement Innovant des Infrastructures",
    type: "Rapport",
    year: "2024",
    summary: "Mécanismes financiers alternatifs pour le développement continental"
  }
];

export const BRAND_SLOGAN = "Nous ne faisons pas du bruit. Nous laissons une trace.";

export const VISION_STATEMENT = {
  title: "Une Vision Souveraine",
  description: "MboMa & Co. est une entreprise institutionnelle indépendante dédiée à l'émergence d'une Afrique structurée et compétitive. Nous agissons à l'interface entre les institutions publiques, le secteur privé et les organisations internationales.",
  motto: "La puissance par la retenue, la présence par l'impact."
};

export const CORE_VALUES_BRIEF = [
  {
    number: "01",
    title: "Rigueur",
    description: "Respect absolu des normes et cadres juridiques."
  },
  {
    number: "02", 
    title: "Intégrité",
    description: "Transparence et éthique dans chaque collaboration."
  }
];

export const INTERVENTION_DOMAINS = [
  {
    title: "Transformation Numérique",
    description: "Accompagnement institutionnel vers une numérisation souveraine et sécurisée des processus critiques.",
    services: ["Audit & Stratégie", "Gouvernance des données", "Interopérabilité"]
  },
  {
    title: "Écosystèmes d'Innovation",
    description: "Conception et structuration de cadres favorables à l'innovation appliquée et au développement endogène.",
    services: ["Hubs Technologiques", "Politiques d'Innovation", "Partenariats Public-Privé"]
  },
  {
    title: "Pilotage de Programmes",
    description: "Gestion rigoureuse de projets complexes à fort impact social et économique à l'échelle panafricaine.",
    services: ["Maîtrise d'œuvre", "Coordination de consortiums", "Suivi & Évaluation"]
  }
];
