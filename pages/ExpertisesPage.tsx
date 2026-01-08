import React from 'react';
import { motion } from 'framer-motion';
import { EXPERTISES } from '../constants';

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

export default ExpertisesPage;
