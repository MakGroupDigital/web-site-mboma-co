import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { VALUES, EXPERTISES, IMPACT_METRICS, SECTORS, STRATEGIC_PARTNERSHIPS, FLAGSHIP_PROJECTS, GOVERNANCE_PRINCIPLES, INNOVATION_LABS, CONTINENTAL_PRESENCE, THOUGHT_LEADERSHIP, BRAND_SLOGAN, VISION_STATEMENT, CORE_VALUES_BRIEF, INTERVENTION_DOMAINS, ANNUAL_REPORTS, AUDIT_CAMPAIGN } from '../constants';
import DataProcessingTerminal from '../components/DataProcessingTerminal';
import ExpertiseCards from '../components/ExpertiseCards';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="grid grid-cols-12 h-full w-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1.5, delay: i * 0.1 }} key={i} className="border-r border-institutional-grey h-full" />
            ))}
          </div>
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="inline-block mb-8 py-2 px-4 border-l border-institutional-orange bg-institutional-orange/5">
             <span className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-orange">Institution Panafricaine</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }} className="font-sans font-light text-5xl md:text-7xl lg:text-8xl text-institutional-grey mb-8 tracking-tight leading-[1.1]">
            La puissance par <br /> <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="font-bold text-institutional-green italic">la retenue</motion.span>.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }} className="font-serif text-lg md:text-xl text-institutional-grey/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            MboMa & Co. est une structure de pilotage et de gouvernance de projets complexes opérant à l'interface des nations et du futur.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.5 }} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={() => navigate('/institution')} className="bg-institutional-green text-white px-10 py-5 font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-institutional-green/90 transition-all shadow-xl shadow-institutional-green/20 w-full sm:w-auto overflow-hidden relative group">
              <span className="relative z-10">Entrer dans l'Institution</span>
              <motion.div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Section: Metrics */}
      <section className="py-20 bg-institutional-grey text-white border-y border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {IMPACT_METRICS.map((metric, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <span className="block text-4xl lg:text-5xl font-sans font-bold text-institutional-lightGreen mb-2">{metric.value}</span>
                <span className="block text-[10px] uppercase tracking-[0.4em] font-medium text-white/40">{metric.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Vision Souveraine */}
      <section className="py-24 lg:py-40 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-green mb-8"
              >
                {VISION_STATEMENT.title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-lg text-institutional-grey/80 leading-relaxed mb-12"
              >
                {VISION_STATEMENT.description}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-institutional-grey p-8 text-white"
              >
                <p className="font-sans text-xl italic text-institutional-lightGreen">
                  "{VISION_STATEMENT.motto}"
                </p>
              </motion.div>

              <div className="mt-16 space-y-8">
                {CORE_VALUES_BRIEF.map((value, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-6 group"
                  >
                    <div className="w-12 h-12 border-2 border-institutional-orange flex items-center justify-center flex-shrink-0 group-hover:bg-institutional-orange transition-colors">
                      <span className="font-bold text-institutional-orange group-hover:text-white transition-colors text-sm">{value.number}</span>
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-lg text-institutional-grey mb-2">{value.title}</h4>
                      <p className="text-sm text-institutional-grey/60 font-serif">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-orange mb-8"
              >
                Domaines d'Intervention
              </motion.h3>
              <div className="space-y-12">
                {INTERVENTION_DOMAINS.map((domain, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="border-l-4 border-institutional-green pl-8 hover:border-institutional-orange transition-colors group"
                  >
                    <h4 className="font-sans font-bold text-xl text-institutional-grey mb-4 group-hover:text-institutional-green transition-colors">
                      {domain.title}
                    </h4>
                    <p className="text-institutional-grey/70 font-serif leading-relaxed mb-6">
                      {domain.description}
                    </p>
                    <ul className="space-y-2">
                      {domain.services.map((service, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-institutional-grey/60">
                          <span className="w-1 h-1 bg-institutional-orange rounded-full"></span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Audit Campaign CTA */}
      <section className="py-16 bg-gradient-to-r from-institutional-green to-institutional-lightGreen text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-institutional-orange rounded-full animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest font-bold">Campagne Spéciale 2026</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-sans text-3xl lg:text-4xl font-bold mb-4"
            >
              {AUDIT_CAMPAIGN.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-serif text-lg mb-8 max-w-2xl mx-auto opacity-90"
            >
              {AUDIT_CAMPAIGN.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {AUDIT_CAMPAIGN.audits.map((audit, i) => (
                <button
                  key={audit.id}
                  onClick={() => navigate('/audit-booking')}
                  className="bg-white text-institutional-green px-6 py-3 font-sans text-sm font-bold uppercase tracking-widest hover:bg-institutional-orange hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105 group"
                >
                  <span className="flex items-center gap-2">
                    {audit.shortTitle}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xs mt-6 opacity-70"
            >
              Offre limitée • Réservez votre audit dès maintenant
            </motion.p>
          </div>
        </div>
      </section>

      {/* Section: African Manifest */}
      <section className="py-24 lg:py-40 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-orange mb-8">Notre Manifeste</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-3xl lg:text-5xl text-institutional-grey leading-tight italic mb-12">
              « Nous croyons en une Afrique qui conçoit ses propres solutions, qui protège ses écosystèmes et qui déploie son excellence sans jamais sacrifier son intégrité. »
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-16 pt-8 border-t border-institutional-grey/10">
              <p className="font-sans text-xl text-institutional-green font-medium italic">
                « {BRAND_SLOGAN} »
              </p>
            </motion.div>
            <div className="h-px w-32 bg-institutional-green mt-8"></div>
          </div>
        </div>
      </section>

      {/* Section: Data Processing & Tokenization */}
      <section className="py-24 lg:py-40 bg-institutional-grey text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="grid grid-cols-12 h-full w-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white h-full" />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-institutional-orange/20 px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-institutional-orange rounded-full animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest font-bold">Technologie Avancée</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-sans text-3xl lg:text-5xl font-bold mb-6"
            >
              Traitement & Tokenisation des Données
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-serif text-lg max-w-3xl mx-auto opacity-90"
            >
              Découvrez comment nous transformons les données brutes en actifs numériques sécurisés et valorisés
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <DataProcessingTerminal />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-institutional-lightGreen mb-2">2.4M+</div>
              <p className="text-sm text-white/60">Tokens générés par cycle</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-institutional-orange mb-2">340%</div>
              <p className="text-sm text-white/60">ROI potentiel moyen</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-institutional-lightGreen mb-2">12</div>
              <p className="text-sm text-white/60">Nœuds de sécurisation</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section: Interactive Expertise Cards */}
      <section className="py-24 lg:py-40 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-green mb-6"
            >
              Nos Expertises
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-sans text-3xl lg:text-4xl text-institutional-grey leading-tight max-w-4xl mx-auto"
            >
              Cliquez sur chaque carte pour découvrir nos <span className="text-institutional-green italic">capacités détaillées</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ExpertiseCards expertises={EXPERTISES} />
          </motion.div>
        </div>
      </section>

      {/* Section: Annual Report CTA */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="font-sans text-3xl lg:text-4xl text-institutional-grey mb-8"
            >
              Lire notre dernier rapport de l'année <span className="text-institutional-green font-bold">2025</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-institutional-grey/70 font-serif text-lg max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Découvrez nos réalisations majeures, nos projets structurants et notre vision pour l'émergence d'une Afrique technologiquement souveraine.
            </motion.p>
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onClick={() => navigate('/rapports')}
              className="bg-institutional-green text-white px-12 py-4 font-sans uppercase tracking-[0.2em] text-sm font-bold hover:bg-institutional-green/90 transition-all shadow-xl shadow-institutional-green/20 group"
            >
              <span className="flex items-center gap-3">
                Consulter le Rapport 2025
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </motion.button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HeroSection;
