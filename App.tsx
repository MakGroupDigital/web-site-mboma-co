
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Logo from './components/Logo';
import { VALUES, EXPERTISES, IMPACT_METRICS, SECTORS, STRATEGIC_PARTNERSHIPS, FLAGSHIP_PROJECTS, GOVERNANCE_PRINCIPLES, INNOVATION_LABS, CONTINENTAL_PRESENCE, THOUGHT_LEADERSHIP, BRAND_SLOGAN, VISION_STATEMENT, CORE_VALUES_BRIEF, INTERVENTION_DOMAINS } from './constants';

// --- Page Components ---

const HeroSection: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => (
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
          <button onClick={() => onNavigate('institution')} className="bg-institutional-green text-white px-10 py-5 font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-institutional-green/90 transition-all shadow-xl shadow-institutional-green/20 w-full sm:w-auto overflow-hidden relative group">
            <span className="relative z-10">Entrer dans l'Institution</span>
            <motion.div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>

    {/* Section: Metrics (New) */}
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
          {/* Vision Statement */}
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

            {/* Core Values Brief */}
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

          {/* Intervention Domains */}
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

    {/* Section: African Manifest (New) */}
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

    {/* Section: Strategic Partnerships */}
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-green mb-6">Partenariats Stratégiques</h2>
          <p className="font-sans text-3xl lg:text-4xl text-institutional-grey max-w-3xl mx-auto leading-tight">
            Un écosystème de collaboration <span className="text-institutional-green italic">panafricain</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STRATEGIC_PARTNERSHIPS.map((partner, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 border-l-4 border-institutional-orange hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest font-bold text-institutional-orange">{partner.type}</span>
                <div className="w-8 h-8 border border-institutional-grey/20 flex items-center justify-center group-hover:border-institutional-green transition-colors">
                  <span className="text-xs font-bold text-institutional-grey group-hover:text-institutional-green">→</span>
                </div>
              </div>
              <h4 className="font-sans font-bold text-lg text-institutional-grey mb-3">{partner.name}</h4>
              <p className="text-sm text-institutional-grey/60 font-serif leading-relaxed">{partner.focus}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Section: Flagship Projects */}
    <section className="py-24 lg:py-40 bg-institutional-grey text-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-lightGreen mb-8">Projets Phares</h2>
          <h3 className="font-sans text-4xl lg:text-5xl leading-tight mb-8">
            Transformer l'Afrique <br />
            <span className="text-institutional-lightGreen italic">projet par projet</span>
          </h3>
          <p className="text-white/70 font-serif text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
            Nos interventions structurantes façonnent l'avenir du continent à travers des projets d'envergure nationale et régionale.
          </p>
          <div className="flex items-center justify-center gap-16">
            <div className="text-center">
              <span className="block text-4xl font-bold text-institutional-orange">26+</span>
              <span className="text-xs uppercase tracking-widest text-white/40">Projets Actifs</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-bold text-institutional-orange">12</span>
              <span className="text-xs uppercase tracking-widest text-white/40">Pays Partenaires</span>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {FLAGSHIP_PROJECTS.map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/10 p-8 hover:border-institutional-lightGreen/50 transition-all group h-full flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h4 className="font-sans font-bold text-xl mb-2 group-hover:text-institutional-lightGreen transition-colors">{project.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-white/50">
                    <span>{project.location}</span>
                    <span>•</span>
                    <span>{project.duration}</span>
                  </div>
                </div>
                <div className="text-institutional-orange text-2xl group-hover:scale-110 transition-transform">→</div>
              </div>
              <p className="text-white/70 font-serif mb-6 leading-relaxed flex-1">{project.scope}</p>
              <div className="pt-4 border-t border-white/10 mt-auto">
                <span className="text-xs uppercase tracking-widest font-bold text-institutional-lightGreen">Impact : {project.impact}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Section: Continental Presence */}
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-orange mb-6">Présence Continentale</h2>
          <h3 className="font-sans text-4xl lg:text-5xl text-institutional-grey leading-tight max-w-4xl mx-auto">
            Une approche <span className="text-institutional-green italic">panafricaine</span> avec une expertise locale
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {CONTINENTAL_PRESENCE.map((region, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group"
            >
              <div className="bg-gray-50 p-8 h-full border-l-4 border-institutional-green hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-sans font-bold text-xl text-institutional-grey">{region.region}</h4>
                  <span className="text-2xl font-bold text-institutional-orange">{region.projects}</span>
                </div>
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-widest font-bold text-institutional-grey/40 mb-3">Pays Partenaires</p>
                  <div className="flex flex-wrap gap-2">
                    {region.countries.map((country, j) => (
                      <span key={j} className="text-xs bg-white px-3 py-1 text-institutional-grey border border-gray-200">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-institutional-grey/60 font-serif leading-relaxed">{region.focus}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Section: Innovation Labs */}
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-green mb-8">Laboratoires d'Innovation</h2>
            <h3 className="font-sans text-4xl lg:text-5xl text-institutional-grey leading-tight mb-8">
              YBS-Innovate : <br />
              <span className="text-institutional-green italic">L'excellence technique</span>
            </h3>
            <p className="text-institutional-grey/70 font-serif text-lg leading-relaxed mb-12">
              Notre bras technique développe des solutions technologiques de pointe adaptées aux défis africains, avec un focus sur la souveraineté numérique et l'innovation endogène.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="block text-3xl font-bold text-institutional-orange mb-2">150+</span>
                <span className="text-xs uppercase tracking-widest text-institutional-grey/40">Solutions Développées</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-institutional-orange mb-2">85%</span>
                <span className="text-xs uppercase tracking-widest text-institutional-grey/40">Expertise Locale</span>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            {INNOVATION_LABS.map((lab, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 border border-gray-100 hover:border-institutional-green transition-all group"
              >
                <h4 className="font-sans font-bold text-lg text-institutional-grey mb-3 group-hover:text-institutional-green transition-colors">{lab.name}</h4>
                <p className="text-sm text-institutional-grey/60 font-serif mb-4">{lab.focus}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {lab.technologies.map((tech, j) => (
                    <span key={j} className="text-xs bg-institutional-green/10 text-institutional-green px-3 py-1 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-institutional-grey/40 italic">{lab.partnerships}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Section: Governance Principles */}
    <section className="py-24 lg:py-40 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-orange mb-6">Principes de Gouvernance</h2>
          <h3 className="font-sans text-4xl lg:text-5xl text-institutional-grey leading-tight max-w-4xl mx-auto">
            L'intégrité comme <span className="text-institutional-green italic">fondement</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {GOVERNANCE_PRINCIPLES.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border-2 border-institutional-green flex items-center justify-center flex-shrink-0 group-hover:bg-institutional-green transition-colors">
                  <span className="font-bold text-institutional-green group-hover:text-white transition-colors">{i + 1}</span>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xl text-institutional-grey mb-4">{item.principle}</h4>
                  <p className="text-institutional-grey/70 font-serif leading-relaxed mb-6">{item.description}</p>
                  <div className="bg-gray-50 p-4 border-l-4 border-institutional-orange">
                    <p className="text-sm text-institutional-grey/60 italic">{item.implementation}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Section: Thought Leadership */}
    <section className="py-24 bg-institutional-grey text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-lightGreen mb-8">Leadership Intellectuel</h2>
            <h3 className="font-sans text-4xl lg:text-5xl leading-tight mb-8">
              Façonner le débat <br />
              <span className="text-institutional-lightGreen italic">continental</span>
            </h3>
            <p className="text-white/70 font-serif text-lg leading-relaxed mb-12">
              Nos recherches et publications alimentent les réflexions stratégiques sur l'avenir de l'Afrique et influencent les politiques publiques continentales.
            </p>
            <button className="border border-institutional-lightGreen px-8 py-3 text-sm uppercase tracking-widest font-bold text-institutional-lightGreen hover:bg-institutional-lightGreen hover:text-institutional-grey transition-all">
              Accéder aux Publications
            </button>
          </div>
          <div className="space-y-8">
            {THOUGHT_LEADERSHIP.map((publication, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-white/10 p-8 hover:border-institutional-lightGreen/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold text-institutional-orange mb-2 block">{publication.type} • {publication.year}</span>
                    <h4 className="font-sans font-bold text-lg group-hover:text-institutional-lightGreen transition-colors">{publication.title}</h4>
                  </div>
                  <div className="text-institutional-orange text-xl group-hover:scale-110 transition-transform">↗</div>
                </div>
                <p className="text-white/70 font-serif leading-relaxed">{publication.summary}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </motion.div>
);

const InstitutionPage: React.FC = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
    <section className="py-24 lg:py-40 bg-gray-50 min-h-[70vh]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="sticky top-32">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-green mb-6">Profil Institutionnel</h2>
              <h3 className="font-sans text-4xl lg:text-5xl text-institutional-grey leading-tight mb-8">Une structure de pilotage <span className="text-institutional-green">souveraine</span>.</h3>
              <div className="h-1 bg-institutional-orange w-20"></div>
            </motion.div>
          </div>
          <div className="lg:col-span-7">
             <div className="bg-white p-12 shadow-sm border-l-4 border-institutional-green mb-12">
                <p className="font-serif text-xl leading-relaxed text-institutional-grey/80">MboMa & Co. n'est pas un cabinet de conseil traditionnel. Nous sommes un partenaire institutionnel de long terme qui assure la cohérence entre la vision politique, la structure financière et le déploiement technique.</p>
             </div>
          </div>
        </div>
      </div>
    </section>

    {/* Section: Methodology (New) */}
    <section className="py-24 lg:py-40 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-grey opacity-40 mb-4">Le Cycle MboMa</h2>
          <p className="font-sans text-3xl font-light">Une approche rigoureuse en quatre temps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { step: "01", title: "Diagnostic & Audit", desc: "Immersion profonde dans les réalités du terrain et les cadres réglementaires." },
            { step: "02", title: "Ingénierie de Projet", desc: "Conception de la structure de pilotage et des mécanismes de gouvernance." },
            { step: "03", title: "Déploiement", desc: "Exécution opérationnelle avec notre bras technique YBS-Innovate." },
            { step: "04", title: "Impact Durable", desc: "Mesure des résultats institutionnels, sociaux et économiques." }
          ].map((item, i) => (
            <div key={i} className="group relative">
              <span className="text-6xl font-sans font-bold text-gray-100 group-hover:text-institutional-green/10 transition-colors absolute -top-10 -left-4 z-0">{item.step}</span>
              <div className="relative z-10 pt-4">
                <h4 className="font-bold text-institutional-grey mb-4">{item.title}</h4>
                <p className="text-sm text-institutional-grey/60 leading-relaxed font-serif">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Section: Independent Governance (New) */}
    <section className="py-24 bg-institutional-grey text-white overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-lightGreen mb-8">Indépendance & Gouvernance</h2>
            <p className="font-serif text-lg leading-relaxed text-white/70 mb-8">
              En tant que structure indépendante, MboMa & Co. garantit une neutralité stratégique absolue. Nous opérons selon les standards internationaux de conformité (Compliance) pour sécuriser les investissements et la réputation de nos partenaires.
            </p>
            <div className="flex gap-12 border-t border-white/10 pt-8">
              <div>
                <span className="block text-institutional-orange font-bold text-2xl">Audit</span>
                <span className="text-[10px] uppercase tracking-widest text-white/30">Standard Global</span>
              </div>
              <div>
                <span className="block text-institutional-orange font-bold text-2xl">Éthique</span>
                <span className="text-[10px] uppercase tracking-widest text-white/30">Zéro Compromis</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 bg-white/5 p-12 rounded-sm border border-white/10">
             <Logo variant="white" size="lg" />
          </div>
        </div>
      </div>
    </section>
  </motion.div>
);

const VisionPage: React.FC = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <section className="py-24 lg:py-40 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-green mb-6">Vision & Mission</h2>
          <p className="font-sans text-3xl md:text-5xl text-institutional-grey leading-snug">Structurer le présent pour rendre l'Afrique compétitive à l'horizon <span className="text-institutional-green font-bold italic">2050</span>.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
          {VALUES.map((value, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white p-10 hover:bg-gray-50 transition-all group relative cursor-default">
              <div className="text-institutional-orange mb-6 flex items-center gap-4">
                <span className="text-sm font-bold opacity-30">0{idx + 1}</span>
                <motion.div initial={{ width: 10 }} whileHover={{ width: 40 }} className="h-[1px] bg-institutional-orange/30" />
              </div>
              <h4 className="font-sans font-bold text-lg mb-4 text-institutional-grey group-hover:text-institutional-green transition-colors">{value.title}</h4>
              <p className="text-sm text-institutional-grey/60 leading-relaxed font-serif">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Section: Pillars of Sovereignty (New) */}
    <section className="py-24 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="relative">
             <div className="aspect-[4/5] bg-institutional-grey relative z-10 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800" alt="African Heritage" className="w-full h-full object-cover grayscale opacity-50" />
             </div>
             <div className="absolute -bottom-10 -right-10 w-full h-full border-4 border-institutional-green -z-0"></div>
           </div>
           <div>
             <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-orange mb-8">Les Piliers de la Souveraineté</h3>
             <ul className="space-y-12">
               {[
                 { title: "Indépendance de Données", text: "Maîtriser les infrastructures cloud et les flux d'information pour protéger les intérêts nationaux." },
                 { title: "Ingénierie Endogène", text: "Former et mobiliser des experts locaux sur des projets d'envergure internationale." },
                 { title: "Protection Écosystémique", text: "Garantir que l'innovation respecte et valorise les écosystèmes culturels et naturels africains." }
               ].map((pillar, i) => (
                 <li key={i} className="flex gap-8">
                   <div className="h-12 w-12 border border-institutional-grey/10 flex-shrink-0 flex items-center justify-center font-bold text-institutional-green">{i+1}</div>
                   <div>
                     <h4 className="font-bold text-institutional-grey mb-2">{pillar.title}</h4>
                     <p className="text-sm text-institutional-grey/60 leading-relaxed font-serif">{pillar.text}</p>
                   </div>
                 </li>
               ))}
             </ul>
           </div>
        </div>
      </div>
    </section>
  </motion.div>
);

const ExpertisesPage: React.FC = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <section className="py-24 lg:py-40 bg-institutional-grey text-white overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-lightGreen mb-6">Expertises Prioritaires</h2>
            <h3 className="font-sans text-4xl lg:text-5xl leading-tight mb-12">Concevoir le cadre. <br /> <span className="text-institutional-lightGreen italic">Garantir l'impact</span>.</h3>
            <div className="space-y-8">
              {EXPERTISES.map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="mt-4 w-8 h-[1px] bg-institutional-orange group-hover:w-16 transition-all" />
                  <div>
                    <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-white/50 font-serif italic">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-4 opacity-30">
            <div className="aspect-square bg-white/10 border border-white/5"></div>
            <div className="aspect-square bg-institutional-green border border-white/5"></div>
            <div className="aspect-square bg-white border border-white/5"></div>
            <div className="aspect-square bg-institutional-orange border border-white/5"></div>
          </div>
        </div>
      </div>
    </section>

    {/* Section: Vertical Sectors (New) */}
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-1">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-green mb-8">Secteurs Verticaux</h3>
            <p className="text-institutional-grey/70 font-serif leading-relaxed">Nous n'intervenons que là où nous pouvons apporter une plus-value structurelle et technologique majeure.</p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {SECTORS.map((sector, i) => (
              <div key={i} className="p-10 border border-gray-100 flex items-center justify-between hover:border-institutional-green transition-all group">
                <span className="font-sans text-lg text-institutional-grey font-medium">{sector}</span>
                <span className="text-institutional-orange group-hover:translate-x-2 transition-transform">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Section: The Hybrid Model (New) */}
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="bg-institutional-grey p-12 lg:p-24 relative overflow-hidden text-white">
          <div className="relative z-10 max-w-3xl">
            <h4 className="text-institutional-lightGreen text-xs uppercase font-bold tracking-[0.3em] mb-8">L'Approche Hybride</h4>
            <p className="text-2xl lg:text-3xl font-light leading-relaxed mb-12 font-sans italic">
              « Notre force réside dans la fusion de deux mondes : la profondeur stratégique d'un cabinet de conseil et la rigueur d'exécution d'un bras technique. »
            </p>
            <div className="flex flex-wrap gap-8">
              <div className="px-6 py-2 border border-white/20 text-xs uppercase tracking-widest">Conseil Stratégique</div>
              <div className="px-6 py-2 border border-white/20 text-xs uppercase tracking-widest">Ingénierie Institutionnelle</div>
              <div className="px-6 py-2 border border-white/20 text-xs uppercase tracking-widest">Maîtrise Technologique</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </motion.div>
);

const ArchitecturePage: React.FC = () => (
  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}>
    <section className="py-24 lg:py-40 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-20">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-green mb-6">Architecture de Marque</h2>
          <h3 className="font-sans text-4xl text-institutional-grey mb-8">Une synergie structurelle intelligente.</h3>
          <p className="font-serif text-lg text-institutional-grey/70 leading-relaxed">Le choix du suffixe « & Co. » assure une souplesse structurelle sans enfermer l'entreprise dans un secteur unique, permettant d'agréger partenaires et filiales sous une gouvernance unifiée.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="p-12 border border-gray-100 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500">
            <div>
              <div className="mb-10"><Logo variant="color" size="sm" /></div>
              <h4 className="text-xl font-sans font-bold mb-4 uppercase tracking-widest text-institutional-grey">MboMa & Co. (Maison Mère)</h4>
              <p className="text-institutional-grey/60 font-serif leading-relaxed mb-8">Interface institutionnelle souveraine. Elle porte la vision, la stratégie globale et le portefeuille de projets complexes.</p>
            </div>
            <div className="pt-8 border-t border-gray-100"><span className="text-xs font-bold uppercase tracking-[0.2em] text-institutional-green">Structure & Dirige</span></div>
          </div>
          <div className="p-12 bg-gray-50 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
            <div>
              <div className="mb-10 h-12 flex items-center"><span className="font-sans font-bold tracking-tighter text-3xl text-institutional-grey/30 italic">YBS-Innovate</span></div>
              <h4 className="text-xl font-sans font-bold mb-4 uppercase tracking-widest text-institutional-grey">YBS-Innovate (Laboratoire)</h4>
              <p className="text-institutional-grey/60 font-serif leading-relaxed mb-8">Bras armé technique dédié à la R&D, à l'innovation opérationnelle et à l'exécution numérique des programmes.</p>
            </div>
            <div className="pt-8 border-t border-gray-200"><span className="text-xs font-bold uppercase tracking-[0.2em] text-institutional-grey">Conçoit & Fabrique</span></div>
          </div>
        </div>
      </div>
    </section>

    {/* Section: Ecosystem Map (New) */}
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="border border-institutional-grey/10 p-12 lg:p-24 bg-white text-center">
          <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-orange mb-12">Cartographie de l'Écosystème</h3>
          <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {["États & Gouvernements", "Secteur Privé Stratégique", "Org. Internationales", "Hubs d'Innovation"].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-px h-12 bg-institutional-grey/20 mb-4"></div>
                <span className="text-xs uppercase tracking-widest font-bold text-institutional-grey/40">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-16 inline-flex flex-col items-center">
             <div className="h-2 w-2 bg-institutional-orange rounded-full mb-4"></div>
             <p className="font-serif italic text-institutional-grey/60">Une plateforme de collaboration unique en Afrique.</p>
          </div>
        </div>
      </div>
    </section>
  </motion.div>
);

// --- Main App ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('hero');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'institution': return <InstitutionPage key="inst" />;
      case 'vision': return <VisionPage key="vis" />;
      case 'expertises': return <ExpertisesPage key="exp" />;
      case 'architecture': return <ArchitecturePage key="arch" />;
      default: return <HeroSection key="hero" onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen selection:bg-institutional-green selection:text-white bg-white">
      <Header onNavigate={setCurrentView} currentView={currentView} />
      <main className="relative pt-0">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>

        {/* Global Contact Section (Expanded) */}
        {currentView !== 'hero' && (
          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="py-24 lg:py-40 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                  <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-orange mb-8">Engager le Dialogue</h2>
                  <h3 className="font-sans text-4xl lg:text-6xl text-institutional-grey mb-12 leading-tight">Bâtir ensemble <br /> le futur souverain.</h3>
                  <a href="mailto:contact@mboma.co" className="text-2xl lg:text-4xl font-sans font-light text-institutional-grey hover:text-institutional-green transition-all pb-2 border-b-2 border-transparent hover:border-institutional-green">contact@mboma.co</a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-institutional-green uppercase text-[10px] font-bold tracking-[0.3em] mb-4">Brazzaville</h4>
                    <p className="text-sm text-institutional-grey/50 font-serif italic">Siège institutionnel et stratégique pour l'Afrique Centrale.</p>
                  </div>
                  <div>
                    <h4 className="text-institutional-green uppercase text-[10px] font-bold tracking-[0.3em] mb-4">Kinshasa</h4>
                    <p className="text-sm text-institutional-grey/50 font-serif italic">Pôle d'innovation opérationnelle et technologique.</p>
                  </div>
                  <div>
                    <h4 className="text-institutional-green uppercase text-[10px] font-bold tracking-[0.3em] mb-4">Paris</h4>
                    <p className="text-sm text-institutional-grey/50 font-serif italic">Interface internationale et relations investisseurs.</p>
                  </div>
                  <div>
                    <button onClick={() => setCurrentView('hero')} className="text-[10px] uppercase font-bold tracking-[0.3em] text-institutional-orange hover:text-institutional-grey transition-colors mt-auto">← Retour à l'accueil</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
