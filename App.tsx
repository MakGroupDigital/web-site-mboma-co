import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Logo from './components/Logo';
import SEOHead from './components/SEOHead';
import { sendAuditRequest, AuditFormData } from './services/emailService';
import { VALUES, EXPERTISES, IMPACT_METRICS, SECTORS, STRATEGIC_PARTNERSHIPS, FLAGSHIP_PROJECTS, GOVERNANCE_PRINCIPLES, INNOVATION_LABS, CONTINENTAL_PRESENCE, THOUGHT_LEADERSHIP, BRAND_SLOGAN, VISION_STATEMENT, CORE_VALUES_BRIEF, INTERVENTION_DOMAINS, ANNUAL_REPORTS, AUDIT_CAMPAIGN } from './constants';

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
                onClick={() => onNavigate('audit-booking')}
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
            onClick={() => onNavigate('rapports')}
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
  </motion.div>
);

const AuditBookingPage: React.FC = () => {
  const [formData, setFormData] = useState<AuditFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    auditType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company || !formData.auditType) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const success = await sendAuditRequest(formData);
      
      if (success) {
        setSubmitStatus('success');
        // Réinitialiser le formulaire
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          auditType: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="py-24 lg:py-40 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-green mb-6">Prise de Rendez-vous</h2>
            <h3 className="font-sans text-4xl lg:text-5xl text-institutional-grey leading-tight max-w-4xl mx-auto mb-8">
              Réservez votre <span className="text-institutional-green italic">audit spécialisé</span>
            </h3>
            <p className="text-institutional-grey/70 font-serif text-lg max-w-3xl mx-auto leading-relaxed">
              {AUDIT_CAMPAIGN.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {AUDIT_CAMPAIGN.audits.map((audit, i) => (
              <motion.div
                key={audit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 border border-gray-100 p-8 hover:shadow-xl transition-all group"
              >
                <div className="mb-6">
                  <h4 className="font-sans text-xl font-bold text-institutional-grey mb-3 group-hover:text-institutional-green transition-colors">
                    {audit.title}
                  </h4>
                  <p className="text-institutional-grey/70 font-serif leading-relaxed mb-4">
                    {audit.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-institutional-orange font-medium mb-4">
                    <span>⏱️ {audit.duration}</span>
                    <span>💰 {audit.price}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="text-xs uppercase tracking-widest font-bold text-institutional-grey mb-3">Points Clés</h5>
                  <ul className="space-y-2">
                    {audit.highlights.map((highlight, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-institutional-grey/80">
                        <span className="w-1 h-1 bg-institutional-green rounded-full"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h5 className="text-xs uppercase tracking-widest font-bold text-institutional-grey mb-3">Livrables</h5>
                  <ul className="space-y-2">
                    {audit.deliverables.map((deliverable, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-institutional-grey/80">
                        <span className="w-1 h-1 bg-institutional-orange rounded-full"></span>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => setFormData(prev => ({ ...prev, auditType: audit.title }))}
                  className="w-full bg-institutional-green text-white py-3 px-6 font-sans text-sm font-bold uppercase tracking-widest hover:bg-institutional-green/90 transition-all group-hover:shadow-lg"
                >
                  Sélectionner cet audit
                </button>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-institutional-grey p-12 lg:p-16 text-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h4 className="text-institutional-lightGreen text-xs uppercase font-bold tracking-[0.3em] mb-6">
                  Formulaire de Contact
                </h4>
                <h5 className="font-sans text-2xl font-bold mb-6">
                  Planifions votre audit ensemble
                </h5>
                <p className="text-white/70 font-serif leading-relaxed mb-8">
                  Remplissez ce formulaire et notre équipe vous contactera sous 24h pour planifier votre audit et répondre à vos questions.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-institutional-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Réponse garantie sous 24h</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-institutional-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm">Confidentialité absolue</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-institutional-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Devis personnalisé gratuit</span>
                  </div>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mt-8 p-4 bg-green-500/20 border border-green-500/30 rounded">
                    <p className="text-green-300 text-sm">
                      ✅ Votre demande a été envoyée avec succès ! Nous vous contacterons sous 24h.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-8 p-4 bg-red-500/20 border border-red-500/30 rounded">
                    <p className="text-red-300 text-sm">
                      ❌ Erreur lors de l'envoi. Veuillez réessayer ou nous contacter directement.
                    </p>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Prénom *"
                    required
                    className="bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-lightGreen focus:outline-none"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Nom *"
                    required
                    className="bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-lightGreen focus:outline-none"
                  />
                </div>
                
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email professionnel *"
                  required
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-lightGreen focus:outline-none"
                />
                
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Entreprise *"
                  required
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-lightGreen focus:outline-none"
                />
                
                <select 
                  name="auditType"
                  value={formData.auditType}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white focus:border-institutional-lightGreen focus:outline-none"
                >
                  <option value="">Type d'audit souhaité *</option>
                  <option value="Audit de Conformité RGPD">Audit de Conformité RGPD</option>
                  <option value="Audit de Sécurité Numérique">Audit de Sécurité Numérique</option>
                  <option value="Audit d'Infrastructure Cloud">Audit d'Infrastructure Cloud</option>
                  <option value="Plusieurs audits">Plusieurs audits</option>
                </select>
                
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Décrivez brièvement votre contexte et vos besoins..."
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-lightGreen focus:outline-none resize-none"
                ></textarea>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-institutional-green text-white py-4 px-6 font-sans text-sm font-bold uppercase tracking-widest hover:bg-institutional-green/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
                
                <p className="text-xs text-white/50 text-center">
                  En soumettant ce formulaire, vous acceptez d'être contacté par MboMa & Co. concernant nos services d'audit.
                </p>
              </form>
            </div>
          </motion.div>

          {/* Alternative Contact */}
          <div className="text-center mt-16 pt-16 border-t border-gray-100">
            <h4 className="font-sans text-xl font-bold text-institutional-grey mb-4">
              Vous préférez nous appeler directement ?
            </h4>
            <p className="text-institutional-grey/70 font-serif mb-6">
              Notre équipe d'experts est disponible pour discuter de vos besoins d'audit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="mailto:co@mboma.org"
                className="flex items-center gap-3 text-institutional-green hover:text-institutional-orange transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">co@mboma.org</span>
              </a>
              <span className="text-institutional-grey/30">•</span>
              <span className="text-institutional-grey/70 font-serif">Réponse sous 24h garantie</span>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const RapportsPage: React.FC = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <section className="py-24 lg:py-40 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-green mb-6">Publications Institutionnelles</h2>
          <h3 className="font-sans text-4xl lg:text-5xl text-institutional-grey leading-tight max-w-4xl mx-auto">
            Nos rapports annuels : <span className="text-institutional-green italic">transparence</span> et impact
          </h3>
        </div>

        <div className="space-y-16">
          {ANNUAL_REPORTS.map((report, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 border border-gray-100 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 lg:p-16">
                  <div className="mb-8">
                    <span className="text-xs uppercase tracking-widest font-bold text-institutional-orange mb-4 block">
                      Rapport Annuel • {report.year}
                    </span>
                    <h4 className="font-sans text-3xl font-bold text-institutional-grey mb-4">
                      {report.subtitle}
                    </h4>
                    <p className="text-institutional-grey/70 font-serif text-lg leading-relaxed mb-8">
                      {report.description}
                    </p>
                  </div>

                  <div className="mb-12">
                    <h5 className="text-xs uppercase tracking-widest font-bold text-institutional-grey mb-6">Points Saillants</h5>
                    <ul className="space-y-3">
                      {report.highlights.map((highlight, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-institutional-grey/80">
                          <span className="w-2 h-2 bg-institutional-green rounded-full flex-shrink-0"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-8 mb-12 pb-8 border-b border-gray-200">
                    <div>
                      <span className="block text-2xl font-bold text-institutional-orange">{report.pages}</span>
                      <span className="text-xs uppercase tracking-widest text-institutional-grey/40">Pages</span>
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-institutional-grey">{report.year}</span>
                      <span className="text-xs uppercase tracking-widest text-institutional-grey/40">Année</span>
                    </div>
                  </div>
                </div>

                <div className="bg-institutional-grey p-12 lg:p-16 text-white flex flex-col justify-center">
                  <h5 className="text-institutional-lightGreen text-xs uppercase font-bold tracking-[0.3em] mb-8">
                    Accès aux Documents
                  </h5>
                  
                  <div className="space-y-6 mb-12">
                    <div className="border border-white/20 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h6 className="font-sans font-bold text-lg">Version Française</h6>
                        <span className="text-xs bg-institutional-orange px-3 py-1 font-bold">PDF</span>
                      </div>
                      <p className="text-white/70 text-sm mb-6 font-serif">{report.title}</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                          onClick={() => window.open(report.filePathFr, '_blank')}
                          className="flex-1 bg-institutional-green text-white px-6 py-3 text-sm uppercase tracking-widest font-bold hover:bg-institutional-green/90 transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Lire
                        </button>
                        <button 
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = report.filePathFr;
                            link.download = `mboma-rapport-${report.year}-fr.pdf`;
                            link.click();
                          }}
                          className="flex-1 border border-white/30 text-white px-6 py-3 text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Télécharger
                        </button>
                      </div>
                    </div>

                    <div className="border border-white/20 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h6 className="font-sans font-bold text-lg">English Version</h6>
                        <span className="text-xs bg-institutional-orange px-3 py-1 font-bold">PDF</span>
                      </div>
                      <p className="text-white/70 text-sm mb-6 font-serif">{report.titleEn}</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                          onClick={() => window.open(report.filePathEn, '_blank')}
                          className="flex-1 bg-institutional-green text-white px-6 py-3 text-sm uppercase tracking-widest font-bold hover:bg-institutional-green/90 transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Read
                        </button>
                        <button 
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = report.filePathEn;
                            link.download = `mboma-report-${report.year}-en.pdf`;
                            link.click();
                          }}
                          className="flex-1 border border-white/30 text-white px-6 py-3 text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/20">
                    <h6 className="text-xs uppercase tracking-widest font-bold text-white/60 mb-4">Partager</h6>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: report.title,
                              text: report.description,
                              url: window.location.href
                            });
                          } else {
                            navigator.clipboard.writeText(window.location.href);
                            alert('Lien copié dans le presse-papiers');
                          }
                        }}
                        className="flex-1 bg-white/10 text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        Partager
                      </button>
                      <button 
                        onClick={() => {
                          const emailSubject = encodeURIComponent(`Rapport MboMa & Co. ${report.year}`);
                          const emailBody = encodeURIComponent(`Découvrez le rapport annuel ${report.year} de MboMa & Co. : ${report.subtitle}\n\n${window.location.href}`);
                          window.open(`mailto:?subject=${emailSubject}&body=${emailBody}`);
                        }}
                        className="flex-1 bg-white/10 text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
    
    // Update page title based on current view
    const titles = {
      hero: 'MboMa & Co. | Institution Panafricaine de Pilotage et Gouvernance',
      institution: 'Institution | MboMa & Co.',
      vision: 'Vision & Valeurs | MboMa & Co.',
      expertises: 'Expertises | MboMa & Co.',
      architecture: 'Architecture | MboMa & Co.',
      rapports: 'Rapports Annuels | MboMa & Co.',
      'audit-booking': 'Réservation d\'Audit | MboMa & Co.'
    };
    
    document.title = titles[currentView as keyof typeof titles] || titles.hero;
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'institution': return <InstitutionPage key="inst" />;
      case 'vision': return <VisionPage key="vis" />;
      case 'expertises': return <ExpertisesPage key="exp" />;
      case 'architecture': return <ArchitecturePage key="arch" />;
      case 'rapports': return <RapportsPage key="rapp" />;
      case 'audit-booking': return <AuditBookingPage key="audit" />;
      default: return <HeroSection key="hero" onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen selection:bg-institutional-green selection:text-white bg-white">
      <SEOHead />
      <Header onNavigate={setCurrentView} currentView={currentView} />
      <main className="relative pt-0">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>

        {currentView !== 'hero' && (
          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="py-24 lg:py-40 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                  <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-orange mb-8">Engager le Dialogue</h2>
                  <h3 className="font-sans text-4xl lg:text-6xl text-institutional-grey mb-12 leading-tight">Bâtir ensemble <br /> le futur souverain.</h3>
                  <a href="mailto:co@mboma.org" className="text-2xl lg:text-4xl font-sans font-light text-institutional-grey hover:text-institutional-green transition-all pb-2 border-b-2 border-transparent hover:border-institutional-green">co@mboma.org</a>
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