import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { saveAuditRequest, sendAuditConfirmationEmail } from '../services/auditService';
import { AUDIT_CAMPAIGN } from '../constants';

interface AuditFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  auditType: string;
  message: string;
}

const AuditBookingPage: React.FC = () => {
  const [formData, setFormData] = useState<AuditFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    auditType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company || !formData.auditType) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const referenceNumber = `AUDIT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const submissionDate = new Date().toLocaleDateString('fr-FR');

      // 1. Save audit request to Firestore
      const auditId = await saveAuditRequest({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: 'N/A',
        company: formData.company,
        auditType: formData.auditType,
        message: formData.message,
        referenceNumber,
        submissionDate,
        status: 'new'
      });

      console.log('✅ Audit request saved to Firestore:', auditId);

      // 2. Send confirmation email via Cloud Function
      await sendAuditConfirmationEmail({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: 'N/A',
        company: formData.company,
        auditType: formData.auditType,
        message: formData.message,
        referenceNumber,
        submissionDate,
        status: 'new'
      });

      console.log('✅ Confirmation email sent successfully');

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        auditType: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="py-24 lg:py-40 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-institutional-green mb-6">Prise de Rendez-vous</h2>
            <h3 className="font-sans text-4xl lg:text-5xl text-institutional-grey leading-tight max-w-4xl mx-auto mb-8">
              Réservez votre <span className="text-institutional-green italic">audit spécialisé</span>
            </h3>
            <p className="text-institutional-grey/70 font-serif text-lg max-w-3xl mx-auto leading-relaxed">
              {AUDIT_CAMPAIGN.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {AUDIT_CAMPAIGN.audits.map((audit, i) => (
              <motion.div
                key={audit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 border border-gray-100 p-8 hover:shadow-xl transition-all group"
              >
                <div className="mb-6">
                  <h4 className="font-sans text-xl font-bold text-institutional-grey mb-3 group-hover:text-institutional-green transition-colors">
                    {audit.title}
                  </h4>
                  <p className="text-institutional-grey/70 font-serif leading-relaxed mb-4">
                    {audit.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-institutional-orange font-medium mb-4">
                    <span>⏱️ {audit.duration}</span>
                    <span>💰 {audit.price}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="text-xs uppercase tracking-widest font-bold text-institutional-grey mb-3">Points Clés</h5>
                  <ul className="space-y-2">
                    {audit.highlights.map((highlight, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-institutional-grey/80">
                        <span className="w-1 h-1 bg-institutional-green rounded-full"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h5 className="text-xs uppercase tracking-widest font-bold text-institutional-grey mb-3">Livrables</h5>
                  <ul className="space-y-2">
                    {audit.deliverables.map((deliverable, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-institutional-grey/80">
                        <span className="w-1 h-1 bg-institutional-orange rounded-full"></span>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => setFormData(prev => ({ ...prev, auditType: audit.title }))}
                  className="w-full bg-institutional-green text-white py-3 px-6 font-sans text-sm font-bold uppercase tracking-widest hover:bg-institutional-green/90 transition-all group-hover:shadow-lg"
                >
                  Sélectionner cet audit
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-institutional-grey p-12 lg:p-16 text-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h4 className="text-institutional-lightGreen text-xs uppercase font-bold tracking-[0.3em] mb-6">
                  Formulaire de Contact
                </h4>
                <h5 className="font-sans text-2xl font-bold mb-6">
                  Planifions votre audit ensemble
                </h5>
                <p className="text-white/70 font-serif leading-relaxed mb-8">
                  Remplissez ce formulaire et notre équipe vous contactera sous 24h pour planifier votre audit et répondre à vos questions.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-institutional-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Réponse garantie sous 24h</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-institutional-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm">Confidentialité absolue</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-institutional-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Devis personnalisé gratuit</span>
                  </div>
                </div>

                {submitStatus === 'success' && (
                  <div className="mt-8 p-4 bg-green-500/20 border border-green-500/30 rounded">
                    <p className="text-green-300 text-sm">
                      ✅ Votre demande a été envoyée avec succès ! Nous vous contacterons sous 24h.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-8 p-4 bg-red-500/20 border border-red-500/30 rounded">
                    <p className="text-red-300 text-sm">
                      ❌ Erreur lors de l'envoi. Veuillez réessayer ou nous contacter directement.
                    </p>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Prénom *"
                    required
                    className="bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-lightGreen focus:outline-none"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Nom *"
                    required
                    className="bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-lightGreen focus:outline-none"
                  />
                </div>
                
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email professionnel *"
                  required
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-lightGreen focus:outline-none"
                />
                
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Entreprise *"
                  required
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-lightGreen focus:outline-none"
                />
                
                <select 
                  name="auditType"
                  value={formData.auditType}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white focus:border-institutional-lightGreen focus:outline-none"
                >
                  <option value="">Type d'audit souhaité *</option>
                  <option value="Audit de Conformité RGPD">Audit de Conformité RGPD</option>
                  <option value="Audit de Sécurité Numérique">Audit de Sécurité Numérique</option>
                  <option value="Audit d'Infrastructure Cloud">Audit d'Infrastructure Cloud</option>
                  <option value="Plusieurs audits">Plusieurs audits</option>
                </select>
                
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Décrivez brièvement votre contexte et vos besoins..."
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/50 focus:border-institutional-lightGreen focus:outline-none resize-none"
                ></textarea>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-institutional-green text-white py-4 px-6 font-sans text-sm font-bold uppercase tracking-widest hover:bg-institutional-green/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
                
                <p className="text-xs text-white/50 text-center">
                  En soumettant ce formulaire, vous acceptez d'être contacté par MboMa & Co. concernant nos services d'audit.
                </p>
              </form>
            </div>
          </motion.div>

          <div className="text-center mt-16 pt-16 border-t border-gray-100">
            <h4 className="font-sans text-xl font-bold text-institutional-grey mb-4">
              Vous préférez nous appeler directement ?
            </h4>
            <p className="text-institutional-grey/70 font-serif mb-6">
              Notre équipe d'experts est disponible pour discuter de vos besoins d'audit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="mailto:co@mboma.org"
                className="flex items-center gap-3 text-institutional-green hover:text-institutional-orange transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">co@mboma.org</span>
              </a>
              <span className="text-institutional-grey/30">•</span>
              <span className="text-institutional-grey/70 font-serif">Réponse sous 24h garantie</span>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AuditBookingPage;
