import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Custom SVG Icons
const Icons = {
  // Transformation Numérique - Circuit/Digital transformation icon
  digitalTransform: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="16" cy="16" r="3" fill="currentColor"/>
      <circle cx="32" cy="16" r="3" fill="currentColor"/>
      <circle cx="16" cy="32" r="3" fill="currentColor"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M19 16H16V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M29 16H32V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M19 32H16V29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M29 32H32V29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 20V17M24 28V31M20 24H17M28 24H31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  
  // Structuration d'Écosystèmes - Network/Hub icon
  ecosystem: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2"/>
      <circle cx="24" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="40" cy="24" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="24" cy="40" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="8" cy="24" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="36" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="36" cy="36" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="36" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M24 12V18M24 30V36M30 24H36M12 24H18" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M28 20L33 15M28 28L33 33M20 28L15 33M20 20L15 15" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  
  // Gouvernance de Programmes - Dashboard/Chart icon
  governance: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M6 16H42" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="11" r="2" fill="currentColor"/>
      <circle cx="18" cy="11" r="2" fill="currentColor"/>
      <circle cx="24" cy="11" r="2" fill="currentColor"/>
      <rect x="12" y="22" width="6" height="14" rx="1" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="21" y="26" width="6" height="10" rx="1" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="30" y="20" width="6" height="16" rx="1" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  
  // Ingénierie de Développement - Building/Construction icon
  engineering: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <path d="M8 42H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 42V24L24 14L36 24V42" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M24 14V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="24" cy="6" r="2" fill="currentColor"/>
      <rect x="18" y="30" width="12" height="12" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 30V42" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 36H30" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="16" y="22" width="4" height="4" rx="0.5" fill="currentColor" fillOpacity="0.5"/>
      <rect x="28" y="22" width="4" height="4" rx="0.5" fill="currentColor" fillOpacity="0.5"/>
      <path d="M6 24L24 8L42 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Traitement des Données - Data/Analytics icon
  dataProcessing: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <ellipse cx="24" cy="12" rx="16" ry="6" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 12V24C8 27.314 15.163 30 24 30C32.837 30 40 27.314 40 24V12" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 24V36C8 39.314 15.163 42 24 42C32.837 42 40 39.314 40 36V24" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 18C8 21.314 15.163 24 24 24C32.837 24 40 21.314 40 18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
      <path d="M8 30C8 33.314 15.163 36 24 36C32.837 36 40 33.314 40 30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
      <circle cx="16" cy="12" r="2" fill="currentColor"/>
      <circle cx="24" cy="10" r="2" fill="currentColor"/>
      <circle cx="32" cy="12" r="2" fill="currentColor"/>
    </svg>
  ),
  
  // Valorisation de Données - Diamond/Value icon
  dataValue: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <path d="M24 4L6 18L24 44L42 18L24 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M6 18H42" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 4L18 18L24 44L30 18L24 4Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1"/>
      <path d="M12 18L24 4L36 18" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 18L24 8L30 18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
      <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M24 27V34" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M20 30L24 34L28 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Tokenisation & Blockchain - Chain/Blockchain icon
  blockchain: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <rect x="6" y="18" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
      <rect x="18" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
      <rect x="30" y="18" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
      <rect x="18" y="30" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M18 24H18.01M30 24H30.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M24 18V18.01M24 30V30.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="12" cy="24" r="2" fill="currentColor"/>
      <circle cx="24" cy="12" r="2" fill="currentColor"/>
      <circle cx="36" cy="24" r="2" fill="currentColor"/>
      <circle cx="24" cy="36" r="2" fill="currentColor"/>
      <path d="M14 22L20 16M28 16L34 22M34 26L28 32M20 32L14 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  
  // Default/Fallback icon
  default: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 14V24L30 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  // Arrow down icon for expand
  arrowDown: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

interface ExpertiseCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  details: string[];
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ title, description, icon, color, details }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getColorClasses = (colorName: string, type: 'text' | 'bg' | 'border') => {
    const colorMap: Record<string, Record<string, string>> = {
      'institutional-green': {
        text: 'text-institutional-green',
        bg: 'bg-institutional-green',
        border: 'border-institutional-green'
      },
      'institutional-orange': {
        text: 'text-institutional-orange',
        bg: 'bg-institutional-orange',
        border: 'border-institutional-orange'
      },
      'institutional-lightGreen': {
        text: 'text-institutional-lightGreen',
        bg: 'bg-institutional-lightGreen',
        border: 'border-institutional-lightGreen'
      }
    };
    return colorMap[colorName]?.[type] || colorMap['institutional-green'][type];
  };

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
        isExpanded ? 'col-span-full lg:col-span-2' : ''
      }`}
    >
      <motion.div
        className={`p-8 h-full border-2 transition-all duration-300 rounded-xl ${
          isExpanded
            ? `${getColorClasses(color, 'border')} bg-gradient-to-br from-white to-gray-50`
            : `border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg`
        }`}
        whileHover={{ y: isExpanded ? 0 : -4 }}
      >
        <div className="flex items-start justify-between mb-6">
          <div className={`${getColorClasses(color, 'text')} transition-transform duration-300 ${isExpanded ? 'scale-110' : ''}`}>
            {icon}
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className={`${getColorClasses(color, 'text')} opacity-60`}
          >
            {Icons.arrowDown}
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
              <h4 className={`text-xs uppercase tracking-widest font-bold ${getColorClasses(color, 'text')} mb-4`}>
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
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${getColorClasses(color, 'bg')}`}></span>
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
  const cardDetails: Record<string, { icon: React.ReactNode; color: string; details: string[] }> = {
    'Transformation Numérique': {
      icon: Icons.digitalTransform,
      color: 'institutional-green',
      details: [
        'Audit & stratégie numérique',
        'Gouvernance des données',
        'Interopérabilité des systèmes',
        'Cybersécurité institutionnelle'
      ]
    },
    'Structuration d\'Écosystèmes': {
      icon: Icons.ecosystem,
      color: 'institutional-orange',
      details: [
        'Création de hubs technologiques',
        'Écosystèmes d\'innovation',
        'Partenariats stratégiques',
        'Incubation de startups'
      ]
    },
    'Gouvernance de Programmes': {
      icon: Icons.governance,
      color: 'institutional-lightGreen',
      details: [
        'Pilotage de projets complexes',
        'Gestion de portefeuille',
        'Suivi & évaluation d\'impact',
        'Coordination multi-acteurs'
      ]
    },
    'Ingénierie de Développement': {
      icon: Icons.engineering,
      color: 'institutional-green',
      details: [
        'Conception de politiques publiques',
        'Accompagnement des réformes',
        'Transfert technologique',
        'Renforcement de capacités'
      ]
    },
    'Traitement des Données': {
      icon: Icons.dataProcessing,
      color: 'institutional-orange',
      details: [
        'Collecte et nettoyage de données',
        'Analyse statistique avancée',
        'Machine learning appliqué',
        'Visualisation d\'insights'
      ]
    },
    'Valorisation de Données': {
      icon: Icons.dataValue,
      color: 'institutional-lightGreen',
      details: [
        'Extraction de valeur économique',
        'Monétisation de données',
        'Création de nouveaux services',
        'Modèles de revenus innovants'
      ]
    },
    'Tokenisation & Blockchain': {
      icon: Icons.blockchain,
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
          icon: Icons.default,
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
