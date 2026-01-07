import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { BRAND_SLOGAN } from '../constants';

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
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
          
          <div className="grid grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-institutional-lightGreen uppercase tracking-widest text-xs font-bold mb-6">Institution</h4>
              <ul className="space-y-4">
                <li><span className="text-sm text-white/40 block">Brazzaville / Kinshasa / Paris</span></li>
                <li><span className="text-sm text-white/40 block">Panafricanisme Moderne</span></li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-institutional-lightGreen uppercase tracking-widest text-xs font-bold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:co@mboma.org" className="text-sm hover:text-institutional-orange text-white/60 transition-colors block">
                    co@mboma.org
                  </a>
                </li>
                <li className="text-sm text-white/30 italic">Document confidentiel & propriétaire</li>
              </ul>
            </motion.div>
          </div>
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