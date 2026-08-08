import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { BRAND_SLOGAN } from '../constants';

const footerLinks = [
  {
    title: 'Découvrir',
    links: [
      { label: 'Accueil', path: '/' },
      { label: 'Institution', path: '/institution' },
      { label: 'Vision & Valeurs', path: '/vision' },
      { label: 'Expertises', path: '/expertises' },
      { label: 'Architecture', path: '/architecture' },
      { label: 'Rapports annuels', path: '/rapports' },
    ],
  },
  {
    title: 'Programmes',
    links: [
      { label: 'Technology Partnership', path: '/technology-partnership-program' },
      { label: 'Audit technologique', path: '/audit-technologique' },
      { label: 'Digitalisez votre entreprise', path: '/digitalisez-votre-entreprise' },
      { label: 'Votre idée d’application', path: '/idee-application' },
      { label: 'Automatisez avec l’IA', path: '/automatisez-vos-taches-avec-ia' },
    ],
  },
  {
    title: 'Accès directs',
    links: [
      { label: 'Réserver un audit gratuit', path: '/audit-booking' },
      { label: 'Masterclass', path: '/masterclass' },
      { label: 'Offre Moni.IO', path: '/moni_offer' },
    ],
  },
] as const;

const Footer: React.FC = () => {
  return (
    <footer className="bg-institutional-grey text-white py-16 lg:py-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="grid grid-cols-6 h-full w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-r border-white h-full" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 gap-14 xl:grid-cols-[1.1fr_2fr] xl:gap-20 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Logo variant="white" size="md" />
            <p className="mt-8 text-white/70 max-w-md font-serif italic text-lg leading-relaxed">
              « {BRAND_SLOGAN} »
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {footerLinks.map((section, sectionIndex) => (
              <motion.nav
                key={section.title}
                aria-label={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + sectionIndex * 0.08 }}
              >
                <h4 className="text-institutional-lightGreen uppercase tracking-widest text-xs font-bold mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-3.5">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-institutional-orange"
                      >
                        <span aria-hidden="true" className="text-institutional-lightGreen/60 transition-transform group-hover:translate-x-1">→</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            ))}
          </div>
        </div>

        <div className="mb-10 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-institutional-lightGreen">Contact direct</p>
            <p className="mt-2 text-sm text-white/35">Brazzaville · Kinshasa · Paris</p>
          </div>
          <a href="mailto:co@mboma.org" className="text-base text-white/70 transition-colors hover:text-institutional-orange">
            co@mboma.org
          </a>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/40 tracking-widest uppercase">
            © {new Date().getFullYear()} MboMa & Co. Tous droits réservés.
          </p>
          <div className="flex items-center gap-8">
            {['Stratégie', 'Innovation', 'Développement'].map((item, i) => (
              <span key={i} className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
