import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

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

export default ArchitecturePage;
