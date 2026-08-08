import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  PartnershipRequest,
  sendPartnershipConfirmationEmail,
} from '../services/partnershipService';

type FormData = Omit<PartnershipRequest, 'referenceNumber' | 'submissionDate' | 'status'> & {
  consent: boolean;
};

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  organisation: '',
  organisationType: '',
  role: '',
  partnershipGoal: '',
  projectStage: '',
  message: '',
  consent: false,
};

const benefits = [
  {
    number: '01',
    title: 'Collaborez',
    description: 'Travaillez avec nos experts en technologie, innovation et gouvernance de projets complexes.',
  },
  {
    number: '02',
    title: 'Innovez',
    description: 'Co-créez des solutions utiles, impactantes et durables, ancrées dans les réalités africaines.',
  },
  {
    number: '03',
    title: 'Développez',
    description: 'Ouvrez de nouvelles opportunités et transformez une ambition technologique en impact mesurable.',
  },
];

const audiences = ['Investisseurs', 'Entreprises', 'Organisations'];

const fieldClass =
  'w-full bg-white border border-institutional-grey/15 px-4 py-3.5 text-sm text-institutional-grey outline-none transition focus:border-institutional-green focus:ring-2 focus:ring-institutional-green/10';

const partnershipShareUrl = 'https://www.mboma.org/technology-partnership-program';

const TechnologyPartnershipPage: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [shareFeedback, setShareFeedback] = useState('');

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyShareLink = async () => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(partnershipShareUrl);
      return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = partnershipShareUrl;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Technology Partnership Program — MboMa & Co.',
      text: 'Investisseurs, entreprises et organisations : construisons ensemble les solutions de demain.',
      url: partnershipShareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareFeedback('Partage effectué');
      } else {
        await copyShareLink();
        setShareFeedback('Lien copié');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;

      try {
        await copyShareLink();
        setShareFeedback('Lien copié');
      } catch {
        setShareFeedback('Copiez le lien : mboma.org/technology-partnership-program');
      }
    }

    window.setTimeout(() => setShareFeedback(''), 3500);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
    setFormData((current) => ({ ...current, [target.name]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const generatedReference = `TPP-${Date.now().toString().slice(-8)}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;

    const request: PartnershipRequest = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      organisation: formData.organisation.trim(),
      organisationType: formData.organisationType,
      role: formData.role.trim(),
      partnershipGoal: formData.partnershipGoal,
      projectStage: formData.projectStage,
      message: formData.message.trim(),
      referenceNumber: generatedReference,
      submissionDate: new Date().toLocaleDateString('fr-FR'),
      status: 'new',
    };

    try {
      await sendPartnershipConfirmationEmail(request);
      setReferenceNumber(generatedReference);
      setFormData(initialFormData);
      setStatus('success');
    } catch (error) {
      console.error('Unable to submit partnership request:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="relative overflow-hidden bg-[#f5f7f2] pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full border border-institutional-green/15" />
          <div className="absolute -right-20 -top-28 h-[26rem] w-[26rem] rounded-full border border-institutional-green/10" />
          <div className="absolute left-0 top-0 h-full w-1 bg-institutional-green" />
        </div>

        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.04fr_.96fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-7 inline-flex items-center gap-3 border-l-2 border-institutional-orange bg-white px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-institutional-green" />
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-institutional-grey">
                  Programme de partenariat technologique
                </span>
              </div>

              <h1 className="mb-7 font-sans text-5xl font-light leading-[1.03] tracking-tight text-institutional-grey md:text-7xl">
                Ensemble, construisons les{' '}
                <span className="font-bold text-institutional-green">solutions de demain.</span>
              </h1>
              <p className="mb-9 max-w-2xl font-serif text-lg leading-relaxed text-institutional-grey/70 md:text-xl">
                Un cadre de collaboration conçu pour les investisseurs, entreprises et organisations qui souhaitent
                développer des solutions avec MboMa & Co.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <button
                  onClick={scrollToForm}
                  className="bg-institutional-green px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-institutional-green/20 transition hover:-translate-y-0.5 hover:bg-institutional-grey"
                >
                  Demander un partenariat
                </button>
                <a
                  href="mailto:co@mboma.org?subject=Technology%20Partnership%20Program"
                  className="border border-institutional-grey/20 bg-white px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-institutional-grey transition hover:border-institutional-green hover:text-institutional-green"
                >
                  Écrire à l’équipe
                </a>
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 border border-institutional-green/30 bg-transparent px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-institutional-green transition hover:bg-institutional-green hover:text-white"
                  aria-label="Partager la page Technology Partnership Program"
                >
                  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 12v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7M12 16V3m0 0L8 7m4-4 4 4" />
                  </svg>
                  Partager
                </button>
              </div>
              <p aria-live="polite" className="mt-3 min-h-5 text-xs font-medium text-institutional-green">
                {shareFeedback}
              </p>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-4 translate-x-3 translate-y-3 border border-institutional-green/25" />
              <img
                src="/technology-partnership-program.png"
                alt="Affiche officielle du Technology Partnership Program de MboMa & Co."
                className="relative w-full bg-white object-cover shadow-2xl shadow-institutional-grey/15"
              />
              <figcaption className="relative mt-4 text-right text-[10px] font-bold uppercase tracking-[0.25em] text-institutional-grey/45">
                Visuel officiel de la campagne
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-white py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-14 max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-institutional-orange">
              Une alliance orientée impact
            </p>
            <h2 className="font-sans text-3xl font-light leading-tight text-institutional-grey md:text-5xl">
              De l’intention à une solution <span className="font-bold text-institutional-green">concrète et durable.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-gray-100 bg-gray-100 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.article
                key={benefit.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white p-8 lg:p-10"
              >
                <span className="mb-10 block text-sm font-bold text-institutional-green/45">{benefit.number}</span>
                <h3 className="mb-4 text-2xl font-bold text-institutional-grey transition group-hover:text-institutional-green">
                  {benefit.title}
                </h3>
                <p className="font-serif leading-relaxed text-institutional-grey/65">{benefit.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-institutional-grey py-20 text-white lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-institutional-lightGreen">
                À qui s’adresse le programme ?
              </p>
              <h2 className="mb-8 text-3xl font-light leading-tight md:text-5xl">
                Aux acteurs prêts à <span className="font-bold text-institutional-lightGreen">co-construire.</span>
              </h2>
              <p className="max-w-xl font-serif text-lg leading-relaxed text-white/65">
                Le programme permet d’ouvrir un dialogue structuré autour d’un projet, d’un investissement, d’une
                expertise complémentaire ou d’une opportunité de développement technologique.
              </p>
            </div>
            <div className="space-y-4">
              {audiences.map((audience, index) => (
                <div key={audience} className="flex items-center gap-5 border-b border-white/10 py-5">
                  <span className="text-xs font-bold text-institutional-orange">0{index + 1}</span>
                  <span className="text-xl font-medium">{audience}</span>
                </div>
              ))}
              <p className="pt-5 text-sm leading-relaxed text-white/45">
                Chaque demande fait l’objet d’une première lecture stratégique avant la prise de contact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={formRef} className="scroll-mt-20 bg-[#f7f8f5] py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden bg-white shadow-2xl shadow-institutional-grey/10 lg:grid-cols-[.78fr_1.22fr]">
            <div className="relative overflow-hidden bg-institutional-green p-8 text-white lg:p-12">
              <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full border border-white/15" />
              <div className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full border border-white/15" />
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/65">Demande de partenariat</p>
              <h2 className="mb-6 text-3xl font-bold leading-tight lg:text-4xl">Présentez-nous votre ambition.</h2>
              <p className="mb-12 font-serif leading-relaxed text-white/75">
                Donnez-nous les éléments essentiels. L’équipe MboMa & Co. reviendra vers vous après étude de votre
                demande.
              </p>
              <div className="space-y-6 text-sm">
                <div className="border-l border-white/30 pl-4">
                  <span className="block text-white/55">Contact</span>
                  <a className="font-medium hover:underline" href="mailto:co@mboma.org">co@mboma.org</a>
                </div>
                <div className="border-l border-white/30 pl-4">
                  <span className="block text-white/55">Pôle opérationnel</span>
                  <span className="font-medium">Gombe, Kinshasa — RDC</span>
                </div>
              </div>
            </div>

            <div className="p-7 sm:p-10 lg:p-12">
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[34rem] flex-col justify-center">
                  <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-institutional-green/10 text-3xl text-institutional-green">✓</div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-institutional-green">Demande transmise</p>
                  <h3 className="mb-5 text-3xl font-bold text-institutional-grey">Merci pour votre intérêt.</h3>
                  <p className="mb-6 max-w-lg font-serif leading-relaxed text-institutional-grey/65">
                    Votre demande a bien été enregistrée. Conservez cette référence pour vos échanges avec notre équipe.
                  </p>
                  <div className="mb-8 inline-flex w-fit border border-institutional-green/20 bg-institutional-green/5 px-5 py-3 font-mono font-bold tracking-wider text-institutional-green">
                    {referenceNumber}
                  </div>
                  <button onClick={() => setStatus('idle')} className="w-fit text-xs font-bold uppercase tracking-[0.2em] text-institutional-grey underline decoration-institutional-orange underline-offset-8">
                    Envoyer une autre demande
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">
                      Prénom *
                      <input required name="firstName" value={formData.firstName} onChange={handleChange} autoComplete="given-name" className={`${fieldClass} mt-2`} />
                    </label>
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">
                      Nom *
                      <input required name="lastName" value={formData.lastName} onChange={handleChange} autoComplete="family-name" className={`${fieldClass} mt-2`} />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">
                      E-mail professionnel *
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" className={`${fieldClass} mt-2`} />
                    </label>
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">
                      Téléphone *
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" className={`${fieldClass} mt-2`} />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">
                      Organisation *
                      <input required name="organisation" value={formData.organisation} onChange={handleChange} autoComplete="organization" className={`${fieldClass} mt-2`} />
                    </label>
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">
                      Votre fonction *
                      <input required name="role" value={formData.role} onChange={handleChange} autoComplete="organization-title" className={`${fieldClass} mt-2`} />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">
                      Type d’organisation *
                      <select required name="organisationType" value={formData.organisationType} onChange={handleChange} className={`${fieldClass} mt-2`}>
                        <option value="">Sélectionner</option>
                        <option>Investisseur</option>
                        <option>Entreprise</option>
                        <option>Organisation publique</option>
                        <option>ONG / Organisation internationale</option>
                        <option>Startup</option>
                        <option>Autre</option>
                      </select>
                    </label>
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">
                      Objectif principal *
                      <select required name="partnershipGoal" value={formData.partnershipGoal} onChange={handleChange} className={`${fieldClass} mt-2`}>
                        <option value="">Sélectionner</option>
                        <option>Co-développement technologique</option>
                        <option>Investissement / Financement</option>
                        <option>Accès marché / Déploiement</option>
                        <option>Expertise / Transfert de compétences</option>
                        <option>Partenariat institutionnel</option>
                        <option>Autre opportunité</option>
                      </select>
                    </label>
                  </div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-institutional-grey/70">
                    Niveau d’avancement *
                    <select required name="projectStage" value={formData.projectStage} onChange={handleChange} className={`${fieldClass} mt-2`}>
                      <option value="">Sélectionner</option>
                      <option>Idée / Exploration</option>
                      <option>Concept défini</option>
                      <option>Prototype / Pilote</option>
                      <option>Solution opérationnelle</option>
                      <option>Passage à l’échelle</option>
                    </select>
                  </label>
                  <label className="block text-xs font-bold uppercase tracking-wider text-institutional-grey/70">
                    Présentez brièvement le projet et le partenariat recherché *
                    <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} minLength={30} className={`${fieldClass} mt-2 resize-y`} placeholder="Contexte, ambition, besoin et impact attendu…" />
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-institutional-grey/60">
                    <input required type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="mt-0.5 h-4 w-4 accent-institutional-green" />
                    <span>J’accepte que MboMa & Co. utilise ces informations pour étudier ma demande et me recontacter.</span>
                  </label>

                  {status === 'error' && (
                    <div role="alert" className="border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">
                      La demande n’a pas pu être transmise. Réessayez ou écrivez directement à co@mboma.org.
                    </div>
                  )}

                  <button disabled={isSubmitting} type="submit" className="w-full bg-institutional-grey px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-institutional-green disabled:cursor-wait disabled:opacity-60">
                    {isSubmitting ? 'Transmission en cours…' : 'Soumettre la demande'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default TechnologyPartnershipPage;
