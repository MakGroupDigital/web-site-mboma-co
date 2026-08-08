import React, { useEffect } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import { routes } from './routes';

// SEO Data for each page
type SeoEntry = {
  title: string;
  description: string;
  keywords?: string;
  image: string;
  imageAlt: string;
  type?: 'website' | 'article';
  robots?: string;
};

const defaultSeo: SeoEntry = {
  title: 'Institution Panafricaine de Pilotage et Gouvernance',
  description: 'MboMa & Co. est une structure de pilotage et de gouvernance de projets complexes operant a l interface des nations et du futur. Nous ne faisons pas du bruit. Nous laissons une trace.',
  keywords: 'MboMa, Afrique, gouvernance, innovation, developpement, souverainete, technologie, panafricain, consulting',
  image: '/logo-og.png',
  imageAlt: 'MboMa & Co. - Institution Panafricaine',
  type: 'website',
  robots: 'index, follow'
};

const seoData: Record<string, SeoEntry> = {
  '/': {
    ...defaultSeo
  },
  '/institution': {
    title: 'Institution',
    description: 'Découvrez MboMa & Co., une institution panafricaine dédiée au pilotage stratégique et à la gouvernance de projets complexes en Afrique.',
    keywords: 'institution panafricaine, gouvernance, Afrique, pilotage strategique, MboMa',
    image: '/og-image.png',
    imageAlt: 'Page Institution - MboMa & Co.',
    type: 'website',
    robots: 'index, follow'
  },
  '/vision': {
    title: 'Vision & Valeurs',
    description: 'Notre vision : bâtir une Afrique souveraine par l\'innovation et la gouvernance. Découvrez les valeurs qui guident MboMa & Co.',
    keywords: 'vision, valeurs, Afrique souveraine, innovation africaine, MboMa',
    image: '/og-image.png',
    imageAlt: 'Page Vision & Valeurs - MboMa & Co.',
    type: 'website',
    robots: 'index, follow'
  },
  '/expertises': {
    title: 'Expertises',
    description: 'Nos domaines d\'expertise : transformation digitale, gouvernance institutionnelle, innovation technologique et développement durable en Afrique.',
    keywords: 'expertise, transformation digitale, gouvernance, innovation, technologie, Afrique, MboMa',
    image: '/og-image.png',
    imageAlt: 'Page Expertises - MboMa & Co.',
    type: 'website',
    robots: 'index, follow'
  },
  '/architecture': {
    title: 'Architecture',
    description: 'L\'architecture organisationnelle de MboMa & Co. : une structure agile et innovante au service de l\'excellence africaine.',
    keywords: 'architecture, organisation, structure, MboMa, Afrique',
    image: '/og-image.png',
    imageAlt: 'Page Architecture - MboMa & Co.',
    type: 'website',
    robots: 'index, follow'
  },
  '/rapports': {
    title: 'Rapports Annuels',
    description: 'Consultez nos rapports annuels et découvrez l\'impact de MboMa & Co. sur le développement et l\'innovation en Afrique.',
    keywords: 'rapports annuels, impact, developpement, Afrique, MboMa, resultats',
    image: '/og-image.png',
    imageAlt: 'Rapports annuels - MboMa & Co.',
    type: 'website',
    robots: 'index, follow'
  },
  '/audit-booking': {
    title: 'Réservation d\'Audit Gratuit',
    description: 'Réservez votre audit gratuit avec MboMa & Co. Audit de conformité RGPD, sécurité numérique et infrastructure cloud pour votre entreprise.',
    keywords: 'audit gratuit, RGPD, securite numerique, cloud, conformite, MboMa',
    image: '/og-image.png',
    imageAlt: 'Reservation d audit - MboMa & Co.',
    type: 'website',
    robots: 'index, follow'
  },
  '/masterclass': {
    title: 'Masterclass Dormez & Gagnez',
    description: 'Inscrivez-vous à notre masterclass exclusive "Dormez & Gagnez" - L\'art de l\'automatisation totale. 19-21 Février 2026 à Kinshasa.',
    keywords: 'masterclass, formation, automatisation, revenus passifs, Kinshasa, MboMa, Dormez et Gagnez',
    image: '/masterclass-og.jpeg',
    imageAlt: 'Affiche officielle Masterclass Dormez & Gagnez',
    type: 'article',
    robots: 'index, follow'
  },
  '/technology-partnership-program': {
    title: 'Technology Partnership Program',
    description: 'Investisseurs, entreprises et organisations : co-créez avec MboMa & Co. des solutions technologiques impactantes et durables.',
    keywords: 'partenariat technologique, co-développement, investissement, innovation, entreprise, Afrique, MboMa',
    image: '/technology-partnership-program.png',
    imageAlt: 'Affiche officielle du Technology Partnership Program de MboMa & Co.',
    type: 'website',
    robots: 'index, follow'
  },
  '/audit-technologique': {
    title: 'Audit Technologique',
    description: 'Évaluez, sécurisez et optimisez votre infrastructure, réseau, cloud, cybersécurité, systèmes et applications avec MboMa & Co.',
    keywords: 'audit technologique, infrastructure informatique, réseau, cloud, cybersécurité, systèmes, applications, MboMa',
    image: '/audit-technologique.png',
    imageAlt: 'Affiche officielle de la campagne Audit technologique de MboMa & Co.',
    type: 'website',
    robots: 'index, follow'
  },
  '/digitalisez-votre-entreprise': {
    title: 'Digitalisez votre entreprise',
    description: 'Centralisez vos opérations dans un système conçu pour votre entreprise avec l’accompagnement technologique de MboMa & Co.',
    keywords: 'digitalisation entreprise, transformation numérique, logiciel sur mesure, centralisation opérations, tableau de bord, MboMa',
    image: '/digitalisez-votre-entreprise.png',
    imageAlt: 'Affiche officielle de la campagne Digitalisez votre entreprise de MboMa & Co.',
    type: 'website',
    robots: 'index, follow'
  },
  '/idee-application': {
    title: 'Vous avez une idée d’application ?',
    description: 'MboMa & Co. transforme votre idée d’application en produit technologique fonctionnel, de la conception au lancement.',
    keywords: 'création application, développement mobile, application web, produit technologique, prototype, startup, MboMa',
    image: '/idee-application.png',
    imageAlt: 'Affiche officielle Vous avez une idée d’application de MboMa & Co.',
    type: 'website',
    robots: 'index, follow'
  },
  '/automatisez-vos-taches-avec-ia': {
    title: 'Automatisez vos tâches avec l’IA',
    description: 'Gagnez du temps, améliorez la productivité et automatisez vos opérations avec des solutions d’intelligence artificielle conçues par MboMa & Co.',
    keywords: 'automatisation IA, intelligence artificielle entreprise, automatiser tâches, productivité, processus métier, MboMa',
    image: '/automatisation-ia.png',
    imageAlt: 'Affiche officielle Automatisez vos tâches avec l’IA de MboMa & Co.',
    type: 'website',
    robots: 'index, follow'
  },
  '/moni_offer': {
    title: 'Offre Moni.IO - Opportunite d acquisition',
    description: 'Super-app Fintech Moni.IO en vente: paiement, encaissement et transfert via email, telephone, QR code ou numero Moni, retrait Mobile Money en Afrique centrale, achat credit & forfait. Application finalisee a 100 % et prete a la commercialisation.',
    keywords: 'moni.io, moni offer, acquisition fintech, app fintech en vente, mobile money afrique centrale, paiement qr code, transfert argent',
    image: '/moni-offer-og.png',
    imageAlt: 'Affiche officielle de l offre Moni.IO',
    type: 'article',
    robots: 'index, follow'
  },
  '/verification': {
    title: 'Vérification d\'Inscription',
    description: 'Vérifiez votre inscription à la masterclass MboMa & Co. avec votre numéro de référence.',
    keywords: 'verification, inscription, masterclass, MboMa',
    image: '/og-image.png',
    imageAlt: 'Verification inscription masterclass',
    type: 'website',
    robots: 'noindex, nofollow'
  }
};

const normalizePath = (pathname: string): string => {
  if (!pathname || pathname === '/') {
    return '/';
  }

  const noTrailingSlash = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if (noTrailingSlash.startsWith('/verify/')) {
    return '/verification';
  }
  if (noTrailingSlash === '/moni-offer') {
    return '/moni_offer';
  }
  if (noTrailingSlash === '/partnership') {
    return '/technology-partnership-program';
  }
  if (noTrailingSlash === '/technology-audit') {
    return '/audit-technologique';
  }
  if (noTrailingSlash === '/digitalisation-entreprise') {
    return '/digitalisez-votre-entreprise';
  }
  if (noTrailingSlash === '/app-idea') {
    return '/idee-application';
  }
  if (noTrailingSlash === '/automatisation-ia') {
    return '/automatisez-vos-taches-avec-ia';
  }

  return noTrailingSlash;
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
  const normalizedPath = normalizePath(location.pathname);
  const currentSEO = seoData[normalizedPath] || defaultSeo;
  const fullTitle = normalizedPath === '/' 
    ? `MboMa & Co. | ${currentSEO.title}` 
    : `${currentSEO.title} | MboMa & Co.`;
  const canonicalPath = normalizedPath === '/verification' ? location.pathname : normalizedPath;
  const currentUrl = `https://www.mboma.org${location.pathname}`;
  const canonicalUrl = `https://www.mboma.org${canonicalPath}`;
  const imageUrl = currentSEO.image.startsWith('http') ? currentSEO.image : `https://www.mboma.org${currentSEO.image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={currentSEO.description} />
      <meta name="keywords" content={currentSEO.keywords} />
      <meta name="robots" content={currentSEO.robots || 'index, follow'} />
      
      {/* Open Graph */}
      <meta property="og:type" content={currentSEO.type || 'website'} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={currentSEO.description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={currentSEO.imageAlt} />
      <meta property="og:site_name" content="MboMa & Co." />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={currentSEO.description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={currentSEO.imageAlt} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
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
