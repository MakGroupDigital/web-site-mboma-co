import React from 'react';
import { motion } from 'framer-motion';
import { VALUES } from '../constants';

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

export default VisionPage;
