import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { saveAuditRequest } from '../services/auditService';
import { sendCampaignLeadEmail } from '../services/campaignEmailService';

const campaignUrl = 'https://www.mboma.org/audit-technologique';

const auditDomains = [
  {
    number: '01',
    title: 'Infrastructure',
    description: 'Évaluer la fiabilité, la disponibilité et les performances de votre socle technologique.',
  },
  {
    number: '02',
    title: 'Réseau',
    description: 'Analyser la connectivité, la sécurité des échanges et la résilience de votre réseau.',
  },
  {
    number: '03',
    title: 'Cloud',
    description: 'Vérifier l’optimisation des ressources, leur gouvernance et la maîtrise des coûts.',
  },
  {
    number: '04',
    title: 'Cybersécurité',
    description: 'Identifier les risques et vulnérabilités afin de renforcer durablement votre protection.',
  },
  {
    number: '05',
    title: 'Systèmes & applications',
    description: 'Contrôler la performance, la stabilité et la conformité de vos outils numériques.',
  },
];

type AuditForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  organisationSize: string;
  environment: string;
  priorities: string[];
  message: string;
  consent: boolean;
};

const initialForm: AuditForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  role: '',
  organisationSize: '',
  environment: '',
  priorities: [],
  message: '',
  consent: false,
};

const inputClass =
  'mt-2 w-full border border-institutional-grey/15 bg-white px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-institutional-grey outline-none transition focus:border-institutional-green focus:ring-2 focus:ring-institutional-green/10';

const TechnologyAuditCampaignPage: React.FC = () => {
  const formSectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<AuditForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [reference, setReference] = useState('');
  const [shareFeedback, setShareFeedback] = useState('');
  const [formError, setFormError] = useState('');

  const scrollToForm = () => formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const updateField = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = event.target;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
    setForm((current) => ({ ...current, [target.name]: value }));
    if (submitStatus !== 'idle') setSubmitStatus('idle');
    if (formError) setFormError('');
  };

  const togglePriority = (priority: string) => {
    setForm((current) => ({
      ...current,
      priorities: current.priorities.includes(priority)
        ? current.priorities.filter((item) => item !== priority)
        : [...current.priorities, priority],
    }));
    if (submitStatus !== 'idle') setSubmitStatus('idle');
    if (formError) setFormError('');
  };

  const copyLink = async () => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(campaignUrl);
      return;
    }
    const textArea = document.createElement('textarea');
    textArea.value = campaignUrl;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Audit technologique — MboMa & Co.',
          text: 'Évaluez, sécurisez et optimisez la performance de votre système d’information.',
          url: campaignUrl,
        });
        setShareFeedback('Partage effectué');
      } else {
        await copyLink();
        setShareFeedback('Lien copié');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      try {
        await copyLink();
        setShareFeedback('Lien copié');
      } catch {
        setShareFeedback('Lien : mboma.org/audit-technologique');
      }
    }
    window.setTimeout(() => setShareFeedback(''), 3500);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.priorities.length === 0) {
      setFormError('Sélectionnez au moins une priorité d’audit.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setFormError('');
    const referenceNumber = `AUDIT-TECH-${Date.now().toString().slice(-8)}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;
    const submissionDate = new Date().toLocaleDateString('fr-FR');
    const details = [
      `Fonction : ${form.role}`,
      `Taille de l'organisation : ${form.organisationSize}`,
      `Environnement : ${form.environment}`,
      `Priorités : ${form.priorities.join(', ')}`,
      `Contexte : ${form.message || 'Non précisé'}`,
    ].join('\n');

    const request = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      auditType: 'Audit technologique complet',
      message: details,
      referenceNumber,
      submissionDate,
      status: 'new' as const,
    };

    try {
      await saveAuditRequest(request);
      await sendCampaignLeadEmail({
        campaignName: 'Audit technologique',
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone,
        organisation: request.company,
        referenceNumber: request.referenceNumber,
        submissionDate: request.submissionDate,
        objective: form.priorities.join(' · '),
        details,
      }).catch((emailError) => console.error('Audit VM notification failed:', emailError));
      setReference(referenceNumber);
      setForm(initialForm);
      setSubmitStatus('success');
    } catch (error) {
      console.error('Technology audit request failed:', error);
      setFormError("La demande n’a pas pu être enregistrée. Vérifiez votre connexion puis réessayez, ou écrivez à co@mboma.org.");
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="relative overflow-hidden bg-[#f5f7f2] pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-32 h-96 w-96 rounded-full border border-institutional-green/10" />
          <div className="absolute -left-24 top-48 h-64 w-64 rounded-full border border-institutional-green/10" />
          <div className="absolute right-0 top-0 h-full w-1 bg-institutional-green" />
        </div>
        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_.92fr] lg:gap-20">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-7 inline-flex items-center gap-3 border-l-2 border-institutional-orange bg-white px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-institutional-green" />
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-institutional-grey">
                  Campagne MboMa & Co.
                </span>
              </div>
              <h1 className="mb-7 text-5xl font-light leading-[1.02] tracking-tight text-institutional-grey md:text-7xl">
                Audit <span className="font-bold text-institutional-green">technologique.</span>
              </h1>
              <p className="mb-5 font-serif text-xl leading-relaxed text-institutional-grey/75 md:text-2xl">
                Évaluez. Sécurisez. Optimisez.
              </p>
              <p className="mb-9 max-w-2xl text-base leading-relaxed text-institutional-grey/60 md:text-lg">
                Obtenez une lecture claire de votre système d’information pour améliorer ses performances, réduire les
                risques et prendre de meilleures décisions.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <button onClick={scrollToForm} className="bg-institutional-green px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-institutional-green/20 transition hover:-translate-y-0.5 hover:bg-institutional-grey">
                  Demander un audit
                </button>
                <button onClick={handleShare} className="inline-flex items-center justify-center gap-2 border border-institutional-green/30 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-institutional-green transition hover:bg-institutional-green hover:text-white">
                  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 12v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7M12 16V3m0 0L8 7m4-4 4 4" />
                  </svg>
                  Partager
                </button>
              </div>
              <p aria-live="polite" className="mt-3 min-h-5 text-xs font-medium text-institutional-green">{shareFeedback}</p>
            </motion.div>

            <motion.figure initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
              <div className="absolute -inset-4 -translate-x-3 translate-y-3 border border-institutional-green/25" />
              <img src="/audit-technologique.png" alt="Affiche officielle de la campagne Audit technologique de MboMa & Co." className="relative w-full bg-white shadow-2xl shadow-institutional-grey/15" />
              <figcaption className="relative mt-4 text-right text-[10px] font-bold uppercase tracking-[0.25em] text-institutional-grey/45">Visuel officiel de la campagne</figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-institutional-orange">Périmètre d’analyse</p>
              <h2 className="text-3xl font-light leading-tight text-institutional-grey md:text-5xl">
                Une vision complète de votre <span className="font-bold text-institutional-green">environnement numérique.</span>
              </h2>
            </div>
            <p className="font-serif text-lg leading-relaxed text-institutional-grey/65 lg:pl-10">
              L’audit relie les dimensions techniques, opérationnelles et de gouvernance afin de faire émerger des
              constats fiables et des priorités d’action cohérentes.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-gray-100 bg-gray-100 md:grid-cols-2 lg:grid-cols-5">
            {auditDomains.map((domain, index) => (
              <motion.article key={domain.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="group bg-white p-7">
                <span className="mb-9 block text-xs font-bold text-institutional-green/45">{domain.number}</span>
                <h3 className="mb-4 text-lg font-bold text-institutional-grey transition group-hover:text-institutional-green">{domain.title}</h3>
                <p className="text-sm leading-relaxed text-institutional-grey/60">{domain.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-institutional-grey text-white">
        <div className="container mx-auto px-6 py-20 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-institutional-lightGreen">Finalité de l’audit</p>
            <h2 className="text-3xl font-light leading-tight md:text-5xl">
              Prenez de meilleures décisions sur des données <span className="font-bold text-institutional-lightGreen">claires et fiables.</span>
            </h2>
          </div>
        </div>
      </section>

      <section ref={formSectionRef} className="scroll-mt-20 bg-[#f7f8f5] py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden bg-white shadow-2xl shadow-institutional-grey/10 lg:grid-cols-[.72fr_1.28fr]">
            <div className="relative overflow-hidden bg-institutional-green p-8 text-white lg:p-12">
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full border border-white/15" />
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/65">Réservation</p>
              <h2 className="mb-6 text-3xl font-bold leading-tight lg:text-4xl">Évaluons votre système d’information.</h2>
              <p className="mb-10 font-serif leading-relaxed text-white/75">
                Décrivez votre environnement et vos priorités. Notre équipe analysera votre demande avant de vous recontacter.
              </p>
              <div className="border-l border-white/30 pl-4 text-sm">
                <span className="block text-white/55">Contact direct</span>
                <a href="mailto:co@mboma.org?subject=Audit%20technologique" className="font-medium hover:underline">co@mboma.org</a>
              </div>
            </div>

            <div className="p-7 sm:p-10 lg:p-12">
              {submitStatus === 'success' ? (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[38rem] flex-col justify-center">
                  <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-institutional-green/10 text-3xl text-institutional-green">✓</div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-institutional-green">Demande enregistrée</p>
                  <h3 className="mb-5 text-3xl font-bold text-institutional-grey">Votre audit est en cours d’étude.</h3>
                  <p className="mb-6 max-w-lg font-serif leading-relaxed text-institutional-grey/65">Conservez cette référence pour vos prochains échanges avec l’équipe MboMa & Co.</p>
                  <div className="mb-8 w-fit border border-institutional-green/20 bg-institutional-green/5 px-5 py-3 font-mono font-bold tracking-wider text-institutional-green">{reference}</div>
                  <button onClick={() => setSubmitStatus('idle')} className="w-fit text-xs font-bold uppercase tracking-[0.2em] text-institutional-grey underline decoration-institutional-orange underline-offset-8">Nouvelle demande</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Prénom *<input required name="firstName" value={form.firstName} onChange={updateField} autoComplete="given-name" className={inputClass} /></label>
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Nom *<input required name="lastName" value={form.lastName} onChange={updateField} autoComplete="family-name" className={inputClass} /></label>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">E-mail professionnel *<input required type="email" name="email" value={form.email} onChange={updateField} autoComplete="email" className={inputClass} /></label>
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Téléphone *<input required type="tel" name="phone" value={form.phone} onChange={updateField} autoComplete="tel" className={inputClass} /></label>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Organisation *<input required name="company" value={form.company} onChange={updateField} autoComplete="organization" className={inputClass} /></label>
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Votre fonction *<input required name="role" value={form.role} onChange={updateField} autoComplete="organization-title" className={inputClass} /></label>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Taille de l’organisation *
                      <select required name="organisationSize" value={form.organisationSize} onChange={updateField} className={inputClass}>
                        <option value="">Sélectionner</option><option>1–10 personnes</option><option>11–50 personnes</option><option>51–250 personnes</option><option>Plus de 250 personnes</option>
                      </select>
                    </label>
                    <label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Environnement principal *
                      <select required name="environment" value={form.environment} onChange={updateField} className={inputClass}>
                        <option value="">Sélectionner</option><option>Infrastructure locale</option><option>Cloud</option><option>Environnement hybride</option><option>À déterminer</option>
                      </select>
                    </label>
                  </div>
                  <fieldset>
                    <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Priorités d’audit * <span className="normal-case font-normal tracking-normal">({form.priorities.length} sélectionnée{form.priorities.length > 1 ? 's' : ''})</span></legend>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {auditDomains.map((domain) => (
                        <label key={domain.title} className={`cursor-pointer border px-3 py-3 text-xs font-medium transition ${form.priorities.includes(domain.title) ? 'border-institutional-green bg-institutional-green/5 text-institutional-green' : 'border-gray-200 text-institutional-grey/60 hover:border-institutional-green/40'}`}>
                          <input type="checkbox" checked={form.priorities.includes(domain.title)} onChange={() => togglePriority(domain.title)} className="mr-2 accent-institutional-green" />{domain.title}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <label className="block text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Contexte ou problème rencontré
                    <textarea name="message" value={form.message} onChange={updateField} rows={4} className={`${inputClass} resize-y`} placeholder="Décrivez brièvement votre contexte technique…" />
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-institutional-grey/60">
                    <input required type="checkbox" name="consent" checked={form.consent} onChange={updateField} className="mt-0.5 h-4 w-4 accent-institutional-green" />
                    <span>J’accepte que MboMa & Co. utilise ces informations pour étudier ma demande et me recontacter.</span>
                  </label>
                  {submitStatus === 'error' && <div role="alert" className="border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">{formError}</div>}
                  <button disabled={isSubmitting} type="submit" className="w-full bg-institutional-grey px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-institutional-green disabled:cursor-wait disabled:opacity-60">{isSubmitting ? 'Transmission en cours…' : 'Soumettre la demande d’audit'}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default TechnologyAuditCampaignPage;
