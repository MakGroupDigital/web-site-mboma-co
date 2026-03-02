import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const demoVideoUrl =
  'https://res.cloudinary.com/dy73hzkpm/video/upload/v1772194655/ScreenRecording_02-27-2026_11-54-40_1_sffa4k.mov';

const showcaseImages = [
  {
    src: '/image%20moni%201%20IMG_0749.png',
    title: 'Accueil, solde et operations rapides',
    caption: 'Dashboard principal avec solde, actions directes et panneau de parametres.',
    details: [
      'Solde disponible affiche (7 200 USD) avec numero Moni du compte.',
      'Actions visibles: Depot et Retrait.',
      'Raccourcis operationnels: Envoyer, P2P, Factures, USSD.',
      'Sections Statistiques et Activites recentes sur le meme ecran.',
      'Parametres comptes: Informations personnelles, Securite & PIN, Notifications, Biometrie.',
    ],
  },
  {
    src: '/image%20moni%202%20IMG_0751.png',
    title: 'Paiement, encaissement et transfert multi-canaux',
    caption: 'Scanner integre et parcours transactionnel principal de l application.',
    details: [
      'Fonctions coeur: Payer, Recevoir, Transferer.',
      'Canaux identifies: numero de telephone, adresse mail, QR Code.',
      'Lecture QR integree via ecran Scanner.',
      'Flux adapte aux paiements marchands et transferts entre utilisateurs.',
    ],
  },
  {
    src: '/image%20moni%203%20IMG_0750.png',
    title: 'Cartes virtuelles et ecosysteme multi-plateformes',
    caption: 'Gestion des cartes, controles de securite et disponibilite sur plusieurs supports.',
    details: [
      'Module Mes Cartes avec carte virtuelle MONI.VIP.',
      'Commandes de securite visibles: Verrouiller et Voir details.',
      'Controle financier: Limite mensuelle configurable.',
      'Disponibilite affichee: iOS, Android, Watch, PC, Web.',
    ],
  },
];

const productHighlights = [
  {
    title: 'Paiement, encaissement et transfert',
    description: 'Operations effectuees depuis une adresse e-mail, un numero de telephone, un QR code ou un numero Moni.',
  },
  {
    title: 'Retrait Mobile Money',
    description: 'Retrait de fonds aupres des operateurs Mobile Money partout en Afrique centrale.',
  },
  {
    title: 'Achat credit et forfait',
    description: "Achat de credit et forfaits directement depuis l'application.",
  },
  {
    title: 'Cartes virtuelles',
    description: 'Gestion des cartes, verrouillage, details de paiement et controle des limites mensuelles.',
  },
  {
    title: 'Parcours utilisateur moderne',
    description: 'Experience mobile fluide avec navigation rapide et ecrans operationnels orientes execution.',
  },
  {
    title: 'Disponibilite deploiement',
    description: "Application finalisee a 100 % et prete pour une commercialisation immediate a grande echelle.",
  },
];

const MoniOfferPage: React.FC = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openVideoDemo = () => {
    setVideoOpen(true);
  };

  const closeVideoDemo = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setVideoOpen(false);
  };

  useEffect(() => {
    if (!videoOpen) {
      return;
    }

    const container = fullscreenContainerRef.current;
    const video = videoRef.current;

    if (container && container.requestFullscreen) {
      container.requestFullscreen().catch(() => {});
    }

    if (video) {
      video.play().catch(() => {});
    }
  }, [videoOpen]);

  useEffect(() => {
    if (!videoOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeVideoDemo();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [videoOpen]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="relative pt-32 pb-24 bg-institutional-grey text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-12 h-full w-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white h-full" />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 py-2 px-4 border-l border-institutional-orange bg-institutional-orange/15 mb-8"
          >
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-orange">Moni Offer</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sans font-light text-5xl md:text-7xl tracking-tight leading-[1.1] mb-8"
          >
            Opportunite d acquisition <br />
            <span className="font-bold text-institutional-lightGreen italic">Entreprises & Investisseurs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-serif text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed"
          >
            Nous mettons en vente cette super-app Fintech, prete a etre deployee a grande echelle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-bold border border-white/20 px-4 py-2">Fintech Mobile</span>
            <span className="text-xs uppercase tracking-[0.2em] font-bold border border-white/20 px-4 py-2">Acquisition Strategique</span>
            <span className="text-xs uppercase tracking-[0.2em] font-bold border border-white/20 px-4 py-2">Go-To-Market Immediat</span>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto mb-14">
            <div className="text-center mb-10">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-green mb-5">Lecture Detaillee Des Visuels</h2>
              <p className="font-serif text-institutional-grey/75 text-lg max-w-3xl mx-auto">
                Apercu des ecrans clés de moni.IO et de leurs fonctions principales.
              </p>
            </div>

            <div className="space-y-8">
              {showcaseImages.map((image, index) => (
                <motion.article
                  key={image.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-gray-50 border border-gray-100 p-4 lg:p-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                    <img
                      src={image.src}
                      alt={image.title}
                      loading="lazy"
                      className="w-full h-auto object-cover rounded-lg border border-institutional-grey/10"
                    />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-institutional-orange mb-3">
                        Reference visuelle {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="font-sans text-2xl text-institutional-grey font-bold mb-4">{image.title}</h3>
                      <p className="font-serif text-institutional-grey/75 mb-5">{image.caption}</p>
                      <ul className="space-y-3">
                        {image.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-3 text-sm text-institutional-grey/80">
                            <span className="w-1.5 h-1.5 bg-institutional-green rounded-full mt-2 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 border border-gray-100 p-8"
            >
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-green mb-6">Disponibilite</h2>
              <h3 className="font-sans text-2xl lg:text-3xl text-institutional-grey mb-5">
                Application finalisee a <span className="text-institutional-green font-bold">100 %</span>
              </h3>
              <p className="font-serif text-institutional-grey/75 text-lg leading-relaxed">
                L application est prete pour une commercialisation immediate et un deploiement a grande echelle.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-institutional-grey text-white p-8"
            >
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-lightGreen mb-6">Video demo</h3>
              <p className="font-serif text-white/80 mb-8 leading-relaxed">
                La video n est pas affichee directement sur la page. Cliquez sur le bouton pour ouvrir la demonstration en plein ecran.
              </p>
              <button
                type="button"
                onClick={openVideoDemo}
                className="w-full sm:w-auto bg-institutional-orange text-white px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-institutional-orange/90 transition-all"
              >
                Visionner la video demo de l app
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-orange mb-6">Fonctionnalités moni.IO</h2>
            <h3 className="font-sans text-3xl lg:text-5xl text-institutional-grey leading-tight mb-6">
              Super-app fintech orientee <span className="text-institutional-green italic">execution terrain</span>
            </h3>
            <p className="font-serif text-institutional-grey/70 max-w-3xl mx-auto leading-relaxed">
              Les fonctionnalites ci-dessous sont identifiees dans la demonstration et les visuels fournis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productHighlights.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="bg-white border border-institutional-grey/10 p-8 hover:shadow-xl transition-all"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-institutional-orange mb-4">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h4 className="font-sans text-xl text-institutional-grey font-bold mb-4">{feature.title}</h4>
                <p className="font-serif text-institutional-grey/70 leading-relaxed">{feature.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-institutional-green to-institutional-lightGreen text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h3 className="font-sans text-3xl lg:text-4xl font-bold mb-8">Pour plus de details sur l offre</h3>
            <div className="space-y-3 mb-9 font-serif text-lg">
              <p>Email : <a href="mailto:co@mboma.org" className="underline underline-offset-4">co@mboma.org</a></p>
              <p>WhatsApp / Tel : <a href="tel:+243835137837" className="underline underline-offset-4">+243 835 137 837</a></p>
              <p>Site web : <a href="https://www.mboma.org" target="_blank" rel="noreferrer" className="underline underline-offset-4">www.mboma.org</a></p>
            </div>
            <button
              type="button"
              onClick={openVideoDemo}
              className="inline-flex items-center justify-center bg-white text-institutional-green px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-institutional-grey hover:text-white transition-all"
            >
              Ouvrir la demo en plein ecran
            </button>
            <p className="mt-7 text-sm opacity-90 font-sans">
              Une solution signee Mboma & Co. Elever les standards. Creer l impact.
            </p>
          </motion.div>
        </div>
      </section>

      {videoOpen && (
        <div
          ref={fullscreenContainerRef}
          className="fixed inset-0 z-[90] bg-black flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={closeVideoDemo}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/10 text-white border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white/20 transition-colors"
          >
            Fermer
          </button>
          <div className="w-full max-w-6xl">
            <video
              ref={videoRef}
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto max-h-[88vh] bg-black"
              src={demoVideoUrl}
            >
              Votre navigateur ne supporte pas la lecture video.
            </video>
            <p className="text-white/70 text-xs tracking-[0.15em] uppercase mt-4 text-center">
              Appuyez sur echap pour fermer
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MoniOfferPage;
