import React, { useEffect } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import { routes } from './routes';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

// Dynamic page titles
const useDynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'MboMa & Co. | Institution Panafricaine',
      '/institution': 'Institution | MboMa & Co.',
      '/vision': 'Vision & Valeurs | MboMa & Co.',
      '/expertises': 'Expertises | MboMa & Co.',
      '/architecture': 'Architecture | MboMa & Co.',
      '/rapports': 'Rapports Annuels | MboMa & Co.',
      '/audit-booking': 'Réservation d\'Audit | MboMa & Co.',
    };

    document.title = titles[location.pathname] || titles['/'];
  }, [location.pathname]);
};

const App: React.FC = () => {
  const location = useLocation();
  const element = useRoutes(routes);

  useDynamicTitle();

  return (
    <div className="min-h-screen selection:bg-institutional-green selection:text-white bg-white">
      <SEOHead />
      <ScrollToTop />
      <Header />
      <main className="relative pt-0">
        <AnimatePresence mode="wait">
          {element}
        </AnimatePresence>

        {location.pathname !== '/' && (
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
                    <a href="/" className="text-[10px] uppercase font-bold tracking-[0.3em] text-institutional-orange hover:text-institutional-grey transition-colors mt-auto inline-block">← Retour à l'accueil</a>
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
