import React, { useEffect } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import { routes } from './routes';

// SEO Data for each page
const seoData: Record<string, { title: string; description: string; keywords?: string }> = {
  '/': {
    title: 'Institution Panafricaine de Pilotage et Gouvernance',
    description: 'MboMa & Co. est une structure de pilotage et de gouvernance de projets complexes opérant à l\'interface des nations et du futur. Nous ne faisons pas du bruit. Nous laissons une trace.',
    keywords: 'MboMa, Afrique, gouvernance, innovation, développement, souveraineté, technologie, panafricain, consulting'
  },
  '/institution': {
    title: 'Institution',
    description: 'Découvrez MboMa & Co., une institution panafricaine dédiée au pilotage stratégique et à la gouvernance de projets complexes en Afrique.',
    keywords: 'institution panafricaine, gouvernance, Afrique, pilotage stratégique, MboMa'
  },
  '/vision': {
    title: 'Vision & Valeurs',
    description: 'Notre vision : bâtir une Afrique souveraine par l\'innovation et la gouvernance. Découvrez les valeurs qui guident MboMa & Co.',
    keywords: 'vision, valeurs, Afrique souveraine, innovation africaine, MboMa'
  },
  '/expertises': {
    title: 'Expertises',
    description: 'Nos domaines d\'expertise : transformation digitale, gouvernance institutionnelle, innovation technologique et développement durable en Afrique.',
    keywords: 'expertise, transformation digitale, gouvernance, innovation, technologie, Afrique, MboMa'
  },
  '/architecture': {
    title: 'Architecture',
    description: 'L\'architecture organisationnelle de MboMa & Co. : une structure agile et innovante au service de l\'excellence africaine.',
    keywords: 'architecture, organisation, structure, MboMa, Afrique'
  },
  '/rapports': {
    title: 'Rapports Annuels',
    description: 'Consultez nos rapports annuels et découvrez l\'impact de MboMa & Co. sur le développement et l\'innovation en Afrique.',
    keywords: 'rapports annuels, impact, développement, Afrique, MboMa, résultats'
  },
  '/audit-booking': {
    title: 'Réservation d\'Audit Gratuit',
    description: 'Réservez votre audit gratuit avec MboMa & Co. Audit de conformité RGPD, sécurité numérique et infrastructure cloud pour votre entreprise.',
    keywords: 'audit gratuit, RGPD, sécurité numérique, cloud, conformité, MboMa'
  },
  '/masterclass': {
    title: 'Masterclass Dormez & Gagnez',
    description: 'Inscrivez-vous à notre masterclass exclusive "Dormez & Gagnez" - L\'art de l\'automatisation totale. 19-21 Février 2026 à Kinshasa.',
    keywords: 'masterclass, formation, automatisation, revenus passifs, Kinshasa, MboMa, Dormez et Gagnez'
  },
  '/verification': {
    title: 'Vérification d\'Inscription',
    description: 'Vérifiez votre inscription à la masterclass MboMa & Co. avec votre numéro de référence.',
    keywords: 'vérification, inscription, masterclass, MboMa'
  }
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

// Dynamic SEO component
const DynamicSEO = () => {
  const location = useLocation();
  const currentSEO = seoData[location.pathname] || seoData['/'];
  const fullTitle = location.pathname === '/' 
    ? `MboMa & Co. | ${currentSEO.title}` 
    : `${currentSEO.title} | MboMa & Co.`;
  const currentUrl = `https://www.mboma.org${location.pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={currentSEO.description} />
      <meta name="keywords" content={currentSEO.keywords} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={currentSEO.description} />
      <meta property="og:image" content="https://www.mboma.org/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="MboMa & Co." />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={currentSEO.description} />
      <meta name="twitter:image" content="https://www.mboma.org/og-image.png" />
      
      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const element = useRoutes(routes);

  return (
    <div className="min-h-screen selection:bg-institutional-green selection:text-white bg-white">
      <DynamicSEO />
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
