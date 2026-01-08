import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ExpertiseCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  details: string[];
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ title, description, icon, color, details }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
        isExpanded ? 'col-span-full lg:col-span-2' : ''
      }`}
    >
      <motion.div
        className={`p-8 h-full border-2 transition-all duration-300 ${
          isExpanded
            ? `border-${color} bg-${color}/5`
            : `border-${color}/30 bg-white hover:border-${color}/60 hover:bg-${color}/2`
        }`}
        whileHover={{ y: isExpanded ? 0 : -4 }}
      >
        <div className="flex items-start justify-between mb-6">
          <div className={`text-4xl ${color === 'institutional-green' ? 'text-institutional-green' : color === 'institutional-orange' ? 'text-institutional-orange' : 'text-institutional-lightGreen'}`}>
            {icon}
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className={`text-2xl ${color === 'institutional-green' ? 'text-institutional-green' : color === 'institutional-orange' ? 'text-institutional-orange' : 'text-institutional-lightGreen'}`}
          >
            ↓
          </motion.div>
        </div>

        <h3 className="font-sans font-bold text-xl text-institutional-grey mb-3">
          {title}
        </h3>

        <p className="text-institutional-grey/70 font-serif text-sm leading-relaxed mb-6">
          {description}
        </p>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {isExpanded && (
            <div className="pt-6 border-t border-institutional-grey/10 space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-bold text-institutional-green mb-4">
                Capacités Clés
              </h4>
              <ul className="space-y-3">
                {details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 text-sm text-institutional-grey/80"
                  >
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${
                      color === 'institutional-green' ? 'bg-institutional-green' : color === 'institutional-orange' ? 'bg-institutional-orange' : 'bg-institutional-lightGreen'
                    }`}></span>
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

interface ExpertiseCardsProps {
  expertises: Array<{
    title: string;
    desc: string;
  }>;
}

const ExpertiseCards: React.FC<ExpertiseCardsProps> = ({ expertises }) => {
  const cardDetails: Record<string, { icon: string; color: string; details: string[] }> = {
    'Transformation Numérique': {
      icon: '🔄',
      color: 'institutional-green',
      details: [
        'Audit & stratégie numérique',
        'Gouvernance des données',
        'Interopérabilité des systèmes',
        'Cybersécurité institutionnelle'
      ]
    },
    'Structuration d\'Écosystèmes': {
      icon: '🌐',
      color: 'institutional-orange',
      details: [
        'Création de hubs technologiques',
        'Écosystèmes d\'innovation',
        'Partenariats stratégiques',
        'Incubation de startups'
      ]
    },
    'Gouvernance de Programmes': {
      icon: '📊',
      color: 'institutional-lightGreen',
      details: [
        'Pilotage de projets complexes',
        'Gestion de portefeuille',
        'Suivi & évaluation d\'impact',
        'Coordination multi-acteurs'
      ]
    },
    'Ingénierie de Développement': {
      icon: '🏗️',
      color: 'institutional-green',
      details: [
        'Conception de politiques publiques',
        'Accompagnement des réformes',
        'Transfert technologique',
        'Renforcement de capacités'
      ]
    },
    'Traitement des Données': {
      icon: '📈',
      color: 'institutional-orange',
      details: [
        'Collecte et nettoyage de données',
        'Analyse statistique avancée',
        'Machine learning appliqué',
        'Visualisation d\'insights'
      ]
    },
    'Valorisation de Données': {
      icon: '💎',
      color: 'institutional-lightGreen',
      details: [
        'Extraction de valeur économique',
        'Monétisation de données',
        'Création de nouveaux services',
        'Modèles de revenus innovants'
      ]
    },
    'Tokenisation & Blockchain': {
      icon: '⛓️',
      color: 'institutional-green',
      details: [
        'Numérisation d\'actifs',
        'Smart contracts',
        'Écosystèmes décentralisés',
        'Sécurité blockchain'
      ]
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {expertises.map((expertise, i) => {
        const details = cardDetails[expertise.title] || {
          icon: '✨',
          color: 'institutional-green',
          details: ['Service premium', 'Expertise reconnue', 'Impact mesurable', 'Résultats garantis']
        };

        return (
          <ExpertiseCard
            key={i}
            title={expertise.title}
            description={expertise.desc}
            icon={details.icon}
            color={details.color}
            details={details.details}
          />
        );
      })}
    </div>
  );
};

export default ExpertiseCards;
