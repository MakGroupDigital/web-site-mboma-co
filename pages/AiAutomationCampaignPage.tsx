import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CampaignRequest, sendCampaignConfirmation } from '../services/campaignService';

const campaignUrl = 'https://www.mboma.org/automatisez-vos-taches-avec-ia';

const benefits = [
  { number: '01', title: 'Gain de temps', description: 'Confiez les tâches répétitives à des flux automatisés et recentrez les équipes sur les activités à forte valeur.' },
  { number: '02', title: 'Plus de productivité', description: 'Fluidifiez l’exécution, réduisez les manipulations manuelles et rendez vos processus plus constants.' },
  { number: '03', title: 'Plus de résultats', description: 'Exploitez les données et l’intelligence artificielle pour agir plus vite et mieux piloter vos opérations.' },
];

const automationNeeds = [
  'Saisie & traitement de données', 'Rapports & tableaux de bord', 'Service client', 'Facturation & documents',
  'Relances & notifications', 'Marketing & contenus', 'Ventes & CRM', 'Processus RH',
];

type FormState = {
  firstName: string; lastName: string; email: string; phone: string; organisation: string; role: string;
  organisationSize: string; objective: string; priorities: string[]; currentTools: string; message: string; consent: boolean;
};

const initialForm: FormState = {
  firstName: '', lastName: '', email: '', phone: '', organisation: '', role: '', organisationSize: '',
  objective: '', priorities: [], currentTools: '', message: '', consent: false,
};

const fieldClass = 'mt-2 w-full border border-institutional-grey/15 bg-white px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-institutional-grey outline-none transition focus:border-institutional-green focus:ring-2 focus:ring-institutional-green/10';

const AiAutomationCampaignPage: React.FC = () => {
  const formRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState('');
  const [shareFeedback, setShareFeedback] = useState('');
  const [formError, setFormError] = useState('');

  const updateField = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = event.target;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
    setForm((current) => ({ ...current, [target.name]: value }));
    if (status !== 'idle') setStatus('idle');
    if (formError) setFormError('');
  };

  const toggleNeed = (need: string) => {
    setForm((current) => ({ ...current, priorities: current.priorities.includes(need) ? current.priorities.filter((item) => item !== need) : [...current.priorities, need] }));
    if (status !== 'idle') setStatus('idle');
    if (formError) setFormError('');
  };

  const copyLink = async () => {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(campaignUrl);
    const element = document.createElement('textarea');
    element.value = campaignUrl; element.style.position = 'fixed'; element.style.opacity = '0';
    document.body.appendChild(element); element.select(); document.execCommand('copy'); document.body.removeChild(element);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Automatisez vos tâches avec l’IA — MboMa & Co.', text: 'Des solutions intelligentes pour des entreprises performantes.', url: campaignUrl });
        setShareFeedback('Partage effectué');
      } else { await copyLink(); setShareFeedback('Lien copié'); }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      try { await copyLink(); setShareFeedback('Lien copié'); } catch { setShareFeedback('Lien : mboma.org/automatisez-vos-taches-avec-ia'); }
    }
    window.setTimeout(() => setShareFeedback(''), 3500);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.priorities.length) { setFormError('Sélectionnez au moins une tâche à automatiser.'); setStatus('error'); return; }
    if (form.message.trim().length < 20) { setFormError('Décrivez le processus à automatiser en 20 caractères minimum.'); setStatus('error'); return; }
    setIsSubmitting(true); setStatus('idle'); setFormError('');
    const referenceNumber = `AUTO-IA-${Date.now().toString().slice(-8)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const request: CampaignRequest = {
      campaignName: 'Automatisez vos tâches avec l’IA', campaignSlug: 'automatisez-vos-taches-avec-ia',
      firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim(), phone: form.phone.trim(),
      organisation: form.organisation.trim(), role: form.role.trim(), organisationSize: form.organisationSize,
      objective: form.objective, priorities: form.priorities, currentTools: form.currentTools.trim(), message: form.message.trim(),
      referenceNumber, submissionDate: new Date().toLocaleDateString('fr-FR'), status: 'new',
    };
    try {
      await sendCampaignConfirmation(request);
      setReference(referenceNumber); setForm(initialForm); setStatus('success');
    } catch (error) { console.error('AI automation request failed:', error); setFormError("La demande n’a pas pu être transmise. Vérifiez votre connexion puis réessayez, ou écrivez à co@mboma.org."); setStatus('error'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="relative overflow-hidden bg-[#f5f7f2] pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute inset-0"><div className="absolute -right-36 -top-32 h-[32rem] w-[32rem] rounded-full border border-institutional-green/10" /><div className="absolute right-0 top-0 h-full w-1 bg-institutional-green" /></div>
        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_.94fr] lg:gap-20">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-7 inline-flex items-center gap-3 border-l-2 border-institutional-orange bg-white px-4 py-2 shadow-sm"><span className="h-2 w-2 rounded-full bg-institutional-green" /><span className="text-[10px] font-bold uppercase tracking-[0.28em] text-institutional-grey">Intelligence artificielle & automatisation</span></div>
              <h1 className="mb-7 text-5xl font-light leading-[1.02] tracking-tight text-institutional-grey md:text-7xl">Automatisez vos tâches <span className="font-bold text-institutional-green">avec l’IA.</span></h1>
              <p className="mb-5 max-w-2xl font-serif text-xl leading-relaxed text-institutional-grey/70 md:text-2xl">Laissez l’intelligence artificielle travailler pour vous.</p>
              <p className="mb-9 text-lg font-semibold text-institutional-green">Même quand vous dormez, vous gagnez.</p>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <button onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })} className="bg-institutional-green px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-institutional-green/20 transition hover:-translate-y-0.5 hover:bg-institutional-grey">Identifier mes automatisations</button>
                <button onClick={handleShare} className="inline-flex items-center justify-center gap-2 border border-institutional-green/30 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-institutional-green transition hover:bg-institutional-green hover:text-white"><svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 12v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7M12 16V3m0 0L8 7m4-4 4 4" /></svg>Partager</button>
              </div>
              <p aria-live="polite" className="mt-3 min-h-5 text-xs font-medium text-institutional-green">{shareFeedback}</p>
            </motion.div>
            <motion.figure initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
              <div className="absolute -inset-4 translate-x-3 translate-y-3 border border-institutional-green/25" />
              <img src="/automatisation-ia.png" alt="Affiche officielle Automatisez vos tâches avec l’IA de MboMa & Co." className="relative w-full bg-white shadow-2xl shadow-institutional-grey/15" />
              <figcaption className="relative mt-4 text-right text-[10px] font-bold uppercase tracking-[0.25em] text-institutional-grey/45">Visuel officiel de la campagne</figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-14 max-w-4xl"><p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-institutional-orange">Pourquoi automatiser ?</p><h2 className="text-3xl font-light leading-tight text-institutional-grey md:text-5xl">Des processus intelligents au service d’une entreprise plus <span className="font-bold text-institutional-green">performante.</span></h2></div>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-gray-100 bg-gray-100 md:grid-cols-3">
            {benefits.map((benefit, index) => <motion.article key={benefit.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.09 }} className="group bg-white p-8 lg:p-10"><span className="mb-10 block text-xs font-bold text-institutional-green/45">{benefit.number}</span><h3 className="mb-4 text-2xl font-bold text-institutional-grey group-hover:text-institutional-green">{benefit.title}</h3><p className="font-serif leading-relaxed text-institutional-grey/60">{benefit.description}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section className="bg-institutional-grey text-white"><div className="container mx-auto grid grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-12 lg:py-24"><p className="text-xs font-bold uppercase tracking-[0.3em] text-institutional-lightGreen">Prêt à passer à l’action ?</p><h2 className="text-3xl font-light leading-tight md:text-5xl">Automatiser ce qui se répète pour concentrer votre énergie sur ce qui <span className="font-bold text-institutional-lightGreen">fait grandir.</span></h2></div></section>

      <section ref={formRef} className="scroll-mt-20 bg-[#f7f8f5] py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12"><div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden bg-white shadow-2xl shadow-institutional-grey/10 lg:grid-cols-[.72fr_1.28fr]">
          <div className="relative overflow-hidden bg-institutional-green p-8 text-white lg:p-12"><div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full border border-white/15" /><p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/65">Votre diagnostic</p><h2 className="mb-6 text-3xl font-bold leading-tight lg:text-4xl">Quelles tâches souhaitez-vous automatiser ?</h2><p className="mb-10 font-serif leading-relaxed text-white/75">Décrivez les opérations répétitives qui mobilisent vos équipes. Nous identifierons les opportunités d’automatisation les plus pertinentes.</p><div className="border-l border-white/30 pl-4 text-sm"><span className="block text-white/55">Contact direct</span><a href="mailto:co@mboma.org?subject=Automatisation%20avec%20l%27IA" className="font-medium hover:underline">co@mboma.org</a></div></div>
          <div className="p-7 sm:p-10 lg:p-12">
            {status === 'success' ? <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[38rem] flex-col justify-center"><div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-institutional-green/10 text-3xl text-institutional-green">✓</div><p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-institutional-green">Demande transmise</p><h3 className="mb-5 text-3xl font-bold text-institutional-grey">Votre besoin d’automatisation est enregistré.</h3><p className="mb-6 max-w-lg font-serif leading-relaxed text-institutional-grey/65">Notre équipe étudiera les processus signalés. Conservez cette référence pour vos échanges.</p><div className="mb-8 w-fit border border-institutional-green/20 bg-institutional-green/5 px-5 py-3 font-mono font-bold tracking-wider text-institutional-green">{reference}</div><button onClick={() => setStatus('idle')} className="w-fit text-xs font-bold uppercase tracking-[0.2em] text-institutional-grey underline decoration-institutional-orange underline-offset-8">Nouvelle demande</button></motion.div> :
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Prénom *<input required name="firstName" value={form.firstName} onChange={updateField} autoComplete="given-name" className={fieldClass} /></label><label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Nom *<input required name="lastName" value={form.lastName} onChange={updateField} autoComplete="family-name" className={fieldClass} /></label></div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">E-mail professionnel *<input required type="email" name="email" value={form.email} onChange={updateField} autoComplete="email" className={fieldClass} /></label><label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Téléphone *<input required type="tel" name="phone" value={form.phone} onChange={updateField} autoComplete="tel" className={fieldClass} /></label></div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Entreprise *<input required name="organisation" value={form.organisation} onChange={updateField} autoComplete="organization" className={fieldClass} /></label><label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Votre fonction *<input required name="role" value={form.role} onChange={updateField} autoComplete="organization-title" className={fieldClass} /></label></div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Taille de l’entreprise *<select required name="organisationSize" value={form.organisationSize} onChange={updateField} className={fieldClass}><option value="">Sélectionner</option><option>1–10 personnes</option><option>11–50 personnes</option><option>51–250 personnes</option><option>Plus de 250 personnes</option></select></label><label className="text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Objectif principal *<select required name="objective" value={form.objective} onChange={updateField} className={fieldClass}><option value="">Sélectionner</option><option>Gagner du temps</option><option>Réduire les erreurs</option><option>Accélérer le traitement</option><option>Améliorer le service client</option><option>Mieux exploiter les données</option><option>Réduire les coûts opérationnels</option></select></label></div>
              <fieldset><legend className="mb-3 text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Tâches à automatiser * <span className="normal-case font-normal tracking-normal">({form.priorities.length} sélectionnée{form.priorities.length > 1 ? 's' : ''})</span></legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{automationNeeds.map((need) => <label key={need} className={`cursor-pointer border px-3 py-3 text-xs font-medium transition ${form.priorities.includes(need) ? 'border-institutional-green bg-institutional-green/5 text-institutional-green' : 'border-gray-200 text-institutional-grey/60 hover:border-institutional-green/40'}`}><input type="checkbox" checked={form.priorities.includes(need)} onChange={() => toggleNeed(need)} className="mr-2 accent-institutional-green" />{need}</label>)}</div></fieldset>
              <label className="block text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Outils utilisés actuellement *<input required name="currentTools" value={form.currentTools} onChange={updateField} className={fieldClass} placeholder="Excel, CRM, messagerie, logiciel métier…" /></label>
              <label className="block text-xs font-bold uppercase tracking-wider text-institutional-grey/70">Décrivez la tâche, sa fréquence et son volume *<textarea required minLength={20} name="message" value={form.message} onChange={updateField} rows={5} className={`${fieldClass} resize-y`} placeholder="Que fait votre équipe aujourd’hui, à quelle fréquence et en quelle quantité ?" /></label>
              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-institutional-grey/60"><input required type="checkbox" name="consent" checked={form.consent} onChange={updateField} className="mt-0.5 h-4 w-4 accent-institutional-green" /><span>J’accepte que MboMa & Co. utilise ces informations pour étudier ma demande et me recontacter.</span></label>
              {status === 'error' && <div role="alert" className="border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">{formError}</div>}
              <button disabled={isSubmitting} type="submit" className="w-full bg-institutional-grey px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-institutional-green disabled:cursor-wait disabled:opacity-60">{isSubmitting ? 'Transmission en cours…' : 'Soumettre mon besoin'}</button>
            </form>}
          </div>
        </div></div>
      </section>
    </motion.div>
  );
};

export default AiAutomationCampaignPage;
