import React from 'react';
import { motion } from 'framer-motion';
import { ANNUAL_REPORTS } from '../constants';

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

export default RapportsPage;
