import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ContexxeCloudOfferRequest,
  sendContexxeCloudOfferRequest,
} from '../services/contexxeCloudService';

type FormData = Omit<ContexxeCloudOfferRequest, 'referenceNumber' | 'submissionDate'> & {
  consent: boolean;
};

const priorities = [
  'Sauvegarde continue',
  'Archivage & conservation',
  'OCR & numérisation',
  'Recherche intelligente',
  'Médiathèque',
  'Sécurité & audit',
];

const offerPillars = [
  ['01', 'Plateforme', 'Espaces, stockage, recherche, OCR, médias et administration dans un environnement unifié.'],
  ['02', 'Mise en service', 'Cadrage, configuration, rôles, identité visuelle et politiques de gouvernance.'],
  ['03', 'Migration', 'Inventaire, transfert contrôlé et validation de la complétude de vos données.'],
  ['04', 'Adoption', 'Formation des administrateurs, des utilisateurs et de vos ambassadeurs internes.'],
  ['05', 'Évolution', 'Capacité, automatisations et nouveaux cas d’usage au rythme de votre organisation.'],
];

const capabilities = [
  ['Sauvegarder', 'Synchronisation automatique, versions et restauration après incident.'],
  ['Comprendre', 'OCR, indexation, métadonnées et transcription de vos contenus.'],
  ['Retrouver', 'Recherche unifiée dans les documents, scans, images, audios et vidéos.'],
  ['Protéger', 'Chiffrement, accès par rôles, piste d’audit et conservation gouvernée.'],
];

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  organisation: '',
  role: '',
  sector: '',
  users: '',
  storage: '',
  priorities: [],
  migration: '',
  timeline: '',
  message: '',
  consent: false,
};

const fieldClass = 'mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#C8742A] focus:ring-2 focus:ring-[#C8742A]/15';
const shareUrl = 'https://www.mboma.org/contexxecloud';

const CloudMark = () => (
  <span className="inline-flex items-center gap-3" aria-label="Contexxe Cloud">
    <span className="relative grid h-10 w-10 place-items-center rounded-2xl border border-[#C8742A]/45 bg-[#C8742A]/10 text-[#C8742A]">
      <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M6.5 18.5h11a4 4 0 0 0 .5-7.97A6.5 6.5 0 0 0 5.55 9.2 4.7 4.7 0 0 0 6.5 18.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M12 15V8m0 0-3 3m3-3 3 3" />
      </svg>
    </span>
    <span className="text-lg font-bold tracking-[-0.06em] text-white">contexxe<span className="ml-1 font-medium text-[#C8742A]">cloud</span></span>
  </span>
);

const ContexxeCloudPage: React.FC = () => {
  const formRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState('');
  const [priorityError, setPriorityError] = useState('');
  const [shareFeedback, setShareFeedback] = useState('');

  const scope = useMemo(() => {
    if (!formData.users && !formData.storage && !formData.priorities.length) return 'Votre périmètre apparaîtra ici';
    const parts = [formData.users, formData.storage, formData.priorities.length ? String(formData.priorities.length) + ' priorité(s)' : ''].filter(Boolean);
    return parts.join(' · ');
  }, [formData.users, formData.storage, formData.priorities]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = event.target;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
    setFormData((current) => ({ ...current, [target.name]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const togglePriority = (priority: string) => {
    setFormData((current) => ({
      ...current,
      priorities: current.priorities.includes(priority)
        ? current.priorities.filter((item) => item !== priority)
        : [...current.priorities, priority],
    }));
    setPriorityError('');
  };

  const handleShare = async () => {
    const data = {
      title: 'Contexxe Cloud — Offre entreprise',
      text: 'Sauvegarde, archivage, OCR, recherche et sécurité dans une plateforme dimensionnée pour votre organisation.',
      url: shareUrl,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(shareUrl);
      setShareFeedback(navigator.share ? 'Partage effectué' : 'Lien copié');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setShareFeedback('Lien : mboma.org/contexxecloud');
    }
    window.setTimeout(() => setShareFeedback(''), 3500);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.priorities.length) {
      setPriorityError('Sélectionnez au moins un besoin prioritaire.');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    const generatedReference = 'CXC-' + Date.now().toString().slice(-8) + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
    try {
      await sendContexxeCloudOfferRequest({
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        organisation: formData.organisation.trim(),
        role: formData.role.trim(),
        message: formData.message.trim(),
        referenceNumber: generatedReference,
        submissionDate: new Date().toLocaleDateString('fr-FR'),
      });
      setReference(generatedReference);
      setFormData(initialFormData);
      setStatus('success');
    } catch (error) {
      console.error('Unable to submit Contexxe Cloud offer request:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#3A3A3A] text-white">
      <section className="relative min-h-[92vh] overflow-hidden pt-32 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_34%,rgba(91,34,234,.36),transparent_31%),radial-gradient(circle_at_16%_82%,rgba(0,216,255,.10),transparent_28%),linear-gradient(145deg,#3A3A3A,#3A3A3A_58%,#3A3A3A)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="container relative z-10 mx-auto grid min-h-[74vh] grid-cols-1 items-center gap-14 px-6 pb-20 lg:grid-cols-[1.05fr_.95fr] lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>
            <CloudMark />
            <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.35em] text-[#C8742A]">Offre entreprise · sur mesure</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-0.07em] sm:text-6xl lg:text-8xl">
              Votre mémoire numérique. <span className="text-[#C8742A]">Vivante. Sûre.</span>
            </h1>
            <p className="mt-8 max-w-2xl font-serif text-lg leading-relaxed text-white/62">
              Contexxe Cloud réunit sauvegarde, archivage intelligent, OCR, recherche avancée et sécurité dans un espace dimensionné autour de votre organisation.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full bg-[#6E8F3A] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition hover:-translate-y-1 hover:bg-[#C8742A] hover:text-[#3A3A3A]">
                Composer mon offre
              </button>
              <a href="/Manuel_d_utilisation_Contexxe_Cloud.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] transition hover:border-[#C8742A] hover:text-[#C8742A]">
                Consulter le manuel
              </a>
              <button onClick={handleShare} className="rounded-full border border-[#C8742A]/35 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#C8742A] transition hover:bg-[#C8742A] hover:text-[#3A3A3A]">
                Partager
              </button>
            </div>
            <p aria-live="polite" className="mt-3 min-h-5 text-xs text-[#AFC18B]">{shareFeedback}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }} className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-12 rounded-full border border-[#C8742A]/10" />
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#3A3A3A]/90 shadow-2xl shadow-[#6E8F3A]/20 backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4"><i className="h-2 w-2 rounded-full bg-[#C8742A]"/><i className="h-2 w-2 rounded-full bg-[#AFC18B]"/><i className="h-2 w-2 rounded-full bg-[#AFC18B]"/><span className="ml-auto text-[10px] text-white/35">cloud.contexxe.io</span></div>
              <div className="p-6 sm:p-8">
                <div className="flex items-end justify-between"><div><small className="text-[9px] uppercase tracking-[.2em] text-white/35">Espace entreprise</small><h2 className="mt-2 text-xl font-bold">Votre mémoire numérique</h2></div><span className="grid h-14 w-14 place-items-center rounded-full border-4 border-[#6E8F3A] border-r-white/10 text-xs font-bold">48%</span></div>
                <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/10"><span className="block h-full w-[48%] rounded-full bg-gradient-to-r from-[#6E8F3A] to-[#C8742A]"/></div>
                <p className="mt-3 text-xs text-white/38">2,4 To utilisés sur 5 To</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[['Contrats','184 fichiers','#C8742A'],['Médias','2 840 fichiers','#6E8F3A'],['Archives','712 fichiers','#AFC18B']].map(([name, meta, color]) => <div key={name} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><span className="mb-7 block h-8 w-8 rounded-lg" style={{ backgroundColor: color }}/><strong className="block text-xs">{name}</strong><small className="text-[9px] text-white/35">{meta}</small></div>)}
                </div>
                <div className="mt-6 rounded-2xl border border-[#AFC18B]/20 bg-[#AFC18B]/5 p-4 text-xs text-[#AFC18B]">✓ 3 742 éléments protégés · synchronisation terminée</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#FFFFFF] py-24 text-[#3A3A3A] lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#6E8F3A]">Une plateforme. Toute votre mémoire.</p><h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-.055em] md:text-6xl">Plus qu’un stockage.<br/><span className="text-[#6E8F3A]">Une infrastructure documentaire.</span></h2></div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-[#3A3A3A]/10 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(([title, description], index) => <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="bg-white p-8"><span className="text-xs font-bold text-[#6E8F3A]">0{index + 1}</span><h3 className="mt-12 text-2xl font-bold">{title}</h3><p className="mt-4 font-serif leading-relaxed text-[#3A3A3A]/60">{description}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container mx-auto grid gap-16 px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-12">
          <div><p className="text-xs font-bold uppercase tracking-[.3em] text-[#C8742A]">Offre entreprise</p><h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-.055em] md:text-6xl">Une solution dimensionnée autour de <span className="text-[#C8742A]">votre réalité.</span></h2><p className="mt-7 font-serif text-lg leading-relaxed text-white/55">Le périmètre dépend de vos volumes, utilisateurs, exigences de sécurité, données à migrer et besoins d’accompagnement.</p></div>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[.03]">
            {offerPillars.map(([number, title, description]) => <div key={number} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-white/10 p-6 last:border-0 sm:p-8"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#6E8F3A] text-xs font-bold">{number}</span><div><h3 className="text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-white/50">{description}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 text-[#3A3A3A] lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.3em] text-[#6E8F3A]">Documentation officielle</p><h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] md:text-6xl">Explorez les 58 pages du manuel.</h2></div><a href="/Manuel_d_utilisation_Contexxe_Cloud.pdf" download className="rounded-full bg-[#3A3A3A] px-7 py-4 text-center text-xs font-bold uppercase tracking-[.2em] text-white transition hover:bg-[#6E8F3A]">Télécharger le PDF</a></div>
          <div className="overflow-hidden rounded-3xl border border-[#3A3A3A]/10 bg-[#FFFFFF] shadow-2xl shadow-[#3A3A3A]/10"><iframe title="Manuel d’utilisation Contexxe Cloud" src="/Manuel_d_utilisation_Contexxe_Cloud.pdf#view=FitH" className="h-[72vh] min-h-[560px] w-full"/></div>
        </div>
      </section>

      <section ref={formRef} className="scroll-mt-24 py-24 lg:py-32" id="offre">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#3A3A3A] shadow-2xl shadow-black/40 lg:grid lg:grid-cols-[.72fr_1.28fr]">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#6E8F3A] to-[#3A3A3A] p-8 lg:p-12">
              <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full border border-[#C8742A]/20"/>
              <CloudMark/>
              <p className="mt-14 text-xs font-bold uppercase tracking-[.3em] text-[#C8742A]">Votre configuration</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-.05em]">Construisons votre espace.</h2>
              <div className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-5"><small className="uppercase tracking-[.2em] text-white/35">Périmètre actuel</small><strong className="mt-3 block text-lg text-[#AFC18B]">{scope}</strong></div>
              <ul className="mt-10 space-y-4 text-sm text-white/65"><li>✓ Proposition adaptée à vos volumes</li><li>✓ Parcours de migration cadré</li><li>✓ Formation et accompagnement</li><li>✓ Réponse sous un jour ouvrable</li></ul>
            </div>
            <div className="p-7 sm:p-10 lg:p-12">
              {status === 'success' ? <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[42rem] flex-col justify-center"><div className="grid h-16 w-16 place-items-center rounded-full bg-[#AFC18B]/10 text-3xl text-[#AFC18B]">✓</div><p className="mt-7 text-xs font-bold uppercase tracking-[.3em] text-[#C8742A]">Demande transmise</p><h3 className="mt-4 text-4xl font-bold">Votre projet Contexxe Cloud est entre de bonnes mains.</h3><p className="mt-5 max-w-xl font-serif leading-relaxed text-white/55">Un e-mail de confirmation vient de vous être envoyé. Notre équipe examinera votre périmètre et vous contactera prochainement.</p><div className="mt-7 w-fit rounded-xl border border-[#AFC18B]/20 bg-[#AFC18B]/5 px-5 py-3 font-mono font-bold text-[#AFC18B]">{reference}</div><button onClick={() => setStatus('idle')} className="mt-8 w-fit text-xs font-bold uppercase tracking-[.2em] text-[#C8742A] underline underline-offset-8">Nouvelle demande</button></motion.div> :
              <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
                <div><p className="text-xs font-bold uppercase tracking-[.3em] text-[#C8742A]">Demande d’offre</p><h3 className="mt-3 text-3xl font-bold">Parlez-nous de votre organisation.</h3></div>
                <div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-wider text-white/55">Prénom *<input required name="firstName" autoComplete="given-name" value={formData.firstName} onChange={handleChange} className={fieldClass}/></label><label className="text-xs font-bold uppercase tracking-wider text-white/55">Nom *<input required name="lastName" autoComplete="family-name" value={formData.lastName} onChange={handleChange} className={fieldClass}/></label></div>
                <div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-wider text-white/55">E-mail professionnel *<input required type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} className={fieldClass}/></label><label className="text-xs font-bold uppercase tracking-wider text-white/55">Téléphone *<input required type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className={fieldClass}/></label></div>
                <div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-wider text-white/55">Organisation *<input required name="organisation" autoComplete="organization" value={formData.organisation} onChange={handleChange} className={fieldClass}/></label><label className="text-xs font-bold uppercase tracking-wider text-white/55">Fonction *<input required name="role" autoComplete="organization-title" value={formData.role} onChange={handleChange} className={fieldClass}/></label></div>
                <div className="grid gap-5 sm:grid-cols-3"><label className="text-xs font-bold uppercase tracking-wider text-white/55">Secteur *<select required name="sector" value={formData.sector} onChange={handleChange} className={fieldClass}><option value="" className="text-black">Sélectionner</option>{['Banque & finance','Mines, énergie & infrastructures','Administration publique','Juridique','Santé','Assurance','ONG & projets','Industrie','Autre'].map((item) => <option key={item} className="text-black">{item}</option>)}</select></label><label className="text-xs font-bold uppercase tracking-wider text-white/55">Utilisateurs *<select required name="users" value={formData.users} onChange={handleChange} className={fieldClass}><option value="" className="text-black">Sélectionner</option>{['1 à 10','11 à 50','51 à 250','251 à 1 000','Plus de 1 000'].map((item) => <option key={item} className="text-black">{item}</option>)}</select></label><label className="text-xs font-bold uppercase tracking-wider text-white/55">Stockage *<select required name="storage" value={formData.storage} onChange={handleChange} className={fieldClass}><option value="" className="text-black">Sélectionner</option>{['Jusqu’à 500 Go','1 To','5 To','10 To ou plus','À évaluer'].map((item) => <option key={item} className="text-black">{item}</option>)}</select></label></div>
                <fieldset><legend className="text-xs font-bold uppercase tracking-wider text-white/55">Besoins prioritaires *</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{priorities.map((priority) => <label key={priority} className={'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ' + (formData.priorities.includes(priority) ? 'border-[#C8742A] bg-[#C8742A]/10 text-[#C8742A]' : 'border-white/10 text-white/60 hover:border-white/25')}><input type="checkbox" className="accent-[#C8742A]" checked={formData.priorities.includes(priority)} onChange={() => togglePriority(priority)}/>{priority}</label>)}</div>{priorityError && <p role="alert" className="mt-2 text-sm text-[#C8742A]">{priorityError}</p>}</fieldset>
                <div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-wider text-white/55">Données à migrer *<select required name="migration" value={formData.migration} onChange={handleChange} className={fieldClass}><option value="" className="text-black">Sélectionner</option>{['Aucune migration','Fichiers et dossiers','Archives papier à numériser','Cloud ou serveur existant','Plusieurs sources'].map((item) => <option key={item} className="text-black">{item}</option>)}</select></label><label className="text-xs font-bold uppercase tracking-wider text-white/55">Délai souhaité *<select required name="timeline" value={formData.timeline} onChange={handleChange} className={fieldClass}><option value="" className="text-black">Sélectionner</option>{['Dès que possible','Sous 1 mois','Sous 3 mois','Sous 6 mois','Projet exploratoire'].map((item) => <option key={item} className="text-black">{item}</option>)}</select></label></div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/55">Contexte complémentaire<textarea name="message" rows={4} value={formData.message} onChange={handleChange} className={fieldClass} placeholder="Volumes actuels, contraintes, objectifs, applications existantes…"/></label>
                <label className="flex items-start gap-3 text-sm leading-relaxed text-white/48"><input required type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="mt-1 accent-[#C8742A]"/>J’accepte que MboMa & Co. utilise ces informations pour analyser ma demande et me recontacter.</label>
                {status === 'error' && <div role="alert" className="rounded-xl border border-[#C8742A]/25 bg-[#C8742A]/10 p-4 text-sm text-[#FFFFFF]">La demande n’a pas pu être transmise. Réessayez ou écrivez directement à <a className="underline" href="mailto:co@mboma.org?subject=Offre%20Contexxe%20Cloud">co@mboma.org</a>.</div>}
                <button disabled={isSubmitting} className="w-full rounded-full bg-[#6E8F3A] px-8 py-4 text-xs font-bold uppercase tracking-[.22em] transition hover:bg-[#C8742A] hover:text-[#3A3A3A] disabled:cursor-not-allowed disabled:opacity-55">{isSubmitting ? 'Transmission…' : 'Recevoir une proposition'}</button>
              </form>}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContexxeCloudPage;
