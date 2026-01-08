import React from 'react';
import { motion } from 'framer-motion';

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

export default InstitutionPage;
